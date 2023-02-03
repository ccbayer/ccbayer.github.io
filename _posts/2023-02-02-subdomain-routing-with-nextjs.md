---
layout: post
title:  "Subdomain Routing with NextJS"
date:   2023-02-02 12:00:00 -0700
categories: posts
author: Colin Bayer
thumbnail: "/images/posts/2023/02/02/traffic.jpg"
excerpt: "Serving up two domains to one single NextJS project"
category: development
tags: [routing, nextjs, middleware, javascript]
excerpt_separator: <!--more-->
---

## Problem 

On the latest project I worked on, we had an interesting business challenge:

* Serving up a both a two separate sites...
* ...resolved by two separate subdomains...
* ...that needed to share resources (views, styles, components, etc)...
* ...and be wired up to the same CMS (Contentful)...
* ...and be hosted on the same server...
* ...but the two subdomains should be treated as two separate servers altogether.

So, primary.client.com and secondary.client.com needed to resolve to essentially the same place from a DNS perspective, but all the routing would need to treat these as entirely different environments, with no crossover.

With a LAMP or LEMP stack, this would be essentially a blip. Could be handled with a creative use of virtual hosts, or .htaccess or other configuraiton. But, this was a NextJS solution hosted on GCP, so it introduced some challenages. Had I known this requirement from the start, I might have architected the NextJS solution differently to handle this, but it turns out this news was sprung on us mid-project, and we had been building a solution assuming it would always only serve up a single site.

While we worked on the "microsite", I essentially stashed it as a folder in the main project (e.g, primary.client.com/secondary/ - located in `src/public/pages/secondary/`) just so we had something to review & work against, but knew that this was a non-starter for what ended up being the final solution.

## Solution...?

We explored a few ideas - including setting up a custom express server to handle the subdomain routing, but we weren't sure how that would play with GCP as the host.  Fortunately the logic written there by [my talented and awesome colleague Nuno](https://nrgribeiro.medium.com/) as a proof of concept, would serve as the groundwork for the ultimate solution:

Turns out, using `middleware.ts` in [NextJS](https://nextjs.org/docs/advanced-features/middleware) was the way to go! We could essentially intercept all traffic and "forward" it to the right directory in the solution.  This even meant that my poor directory structure could stay in place for the time being, without having to rip everything apart.

We already had middleware in place, which was handling basic authentication - there is a way to utilize NextJS to intercept traffic to request for a basic auth header which would keep prying eyes away from our site as we were building it.  All that was needed was to add the "routing" layer, to forward requests to the right directory on the front end.  That way users would think they are visiting the home page, even if they were actually viewing a route that was buried in some subdirectory in the solution.

The magic all comes down to the function that intercepts the request, determines if the magic keyword (in this case, call it "secondary") exists in the request's domain somewhere - and if it does, do a rewrite to forward traffic to the right directory.

The first iteration of this - a proof of concept if you will, was very ugly, but functional:

```
export function middleware(req: NextRequest) {
  
  const url = req.nextUrl;
  let path = url.pathname;
  let hostname = req.headers.get('host') || localHost;
  // forward any requests to the secondary site into the secondary folder if the hostname includes 'secondary' - this should catch subdomains
  if (hostname.includes('secondary') {
    let p = path.split('/');
    // inject secondary - assumes [p1] is the locale
    path = p[1] + 'secondary/' + p.slice(2).join('/');
    return NextResponse.rewrite(
        new URL(`/${path}`, req.url)
    );
  }
  return NextResponse.next();
}

```

OK, so not super elegant for a few reasons but it worked:

* ✅ we are making a `rewrite` header response, which will rewrite to the right location *but will not change the request url* - this is different from a `redirect` response
* 👎 we are hard coding the subdomain ("secondary")
* 🤷‍♂️ what about other Middlewares?

* * *

The challenge I ran into next was involving the other middleware in place.  I still needed to enforce basic authentication, potentially handle authentication, localization, and other "pre-rendering" requirements.  

My first attempt at this was to abstract these individual middlewares into functions, and simply reference them once. In pseudocode:

```
if basicAuthEnabled {
    doBasicAuth.then(() => {
        ... routing();
        ... locale();
        ... otherMiddleWareJunk();
    }
} else {
    ... routing();
    ... locale();
    ... otherMiddleWareJunk();
}
```

It turns out this strategy did not work for...well now obvious reasons.  We are dealing with requests on the server level, which means that conditions get executed as they are met, so even if i could check for basic auth first, it would only run the first subfunction without running the rest.  In the example above, it would execute `routing()` and skip anything below it.

This meant I had to define the same logic in multiple places in the same file, which was hacky as fuck.  The intirim middleware file in its entirety looked like this:

```
import { NextRequest, NextResponse } from 'next/server';
const localHost = 'localhost:3005';
export const config = {
  matcher: ['/', '/en-US/:path*', '/[locale]:path*'],
};

export function middleware(req: NextRequest) {
  
  const url = req.nextUrl;
  let path = url.pathname;
  let hostname = req.headers.get('host') || localHost;

  // BASIC AUTH for non-public routes
  if(process.env.NEXT_PUBLIC_ENVIRONMENT !== 'LOCALHOST') {
    const basicAuth = req.headers.get('authorization');
    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      const [user, pwd] = atob(authValue).split(':');
      if (user === '{basicauthuser}' && pwd === '{basicauthpassword}') {
        // no locale was set, add one and redirect
        // @@TODO: need to get the locale from somewhere legit instead of hard-coding `en-US`
        if(path === '/' ) {
          return NextResponse.redirect(
            new URL(`/en-US/${path}`, req.url)
          );
        }
        // forward any requests to the secondary site into the secondary folder if the hostname includes 'secondary' - this should catch subdomains
        if (hostname.includes('secondary')) {
          let p = path.split('/');
          // inject secondary - assumes [p1] is the locale
          path = p[1] + '/secondary/' + p.slice(2).join('/');
          return NextResponse.rewrite(
            new URL(`/${path}`, req.url)
          );
        }
        return NextResponse.next();
      }
    }
    url.pathname = '/api/auth';
    return NextResponse.rewrite(url);
  }

  // no locale was set, add one and redirect
  // @@TODO: need to get the locale from somewhere legit
  if(path === '/' ) {
    return NextResponse.redirect(
      new URL(`/en-US/${path}`, req.url)
    );
  }
  // @@TODO: this is the same logic in the auth check; find a way to centralize if possible
  // forward any requests to the secondary site into the secondary folder if the hostname includes 'secondary' - this should catch subdomains
  if (hostname.includes('secondary')) {
    let p = path.split('/');
    // inject secondary - assumes [p1] is the locale
    path = p[1] + '/secondary/' + p.slice(2).join('/');
    return NextResponse.rewrite(
    new URL(`/${path}`, req.url)
    );
  }
  return NextResponse.next();
```

Yeesh. Duplicated logic was the only way I could reliably get this to work - abstraction into functions simply did not work.  So, while this solved the primary problem, it felt very ugly.

## Stacking Middleware

Thankfully, Nuno had found [this article](https://reacthustle.com/blog/how-to-chain-multiple-middleware-functions-in-nextjs) describing a tactic of "stacking middleware" into a series of seperate async functions, that can be nested as arrays.  It's still a bit hacky but much less hacky than my original solution, and would allow me to deliver the proper amount of abstraction that was necessary to allow me to sleep at night.

The premise here is somewhat straight forward:

* Each "middleware function" can be isolated into a higher-order functions, or functions that return functions so they can be excuted by a "middleware handler"
* This way middleware is independent from one another, yet executes in the order you specify.

I will not reiterate the article, you should read it yourself, but after following along and some additional abstraction, my middleware file looks like this:

```
import stackMiddlewares from './middleware/stackMiddleware';
import { basicAuth } from './middleware/basicAuth';
import { addLocale } from './middleware/addLocale';
import { routing } from './middleware/routing';
export const config = {
  matcher: ['/', '/en-US/:path*', '/[locale]:path*'],
};
// array of middleware
const middlewares = [
  basicAuth,
  addLocale,
  routing,
];
export default stackMiddlewares(middlewares);
```

* Each "middleware function" gets its own file function and is imported into an array;
* The array is passed through to the higher-order function which loops over the array an executes the passed functions

The order does matter here still, we are still dealing with requests and responses, but it's much cleaner to manage this way.

Our "routing" middleware function imported from `./middleware/routing` looks like this:

```
import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from 'next/server';
import { MiddlewareFactory } from './types';
import { subdomains } from '@/lib/constants';

export const routing: MiddlewareFactory = (next: NextMiddleware) => {

  return async(req: NextRequest, _next: NextFetchEvent) => {
    const url = req.nextUrl;
    let path = url.pathname;
    const localHost = 'localhost:3005';
    const res = await next(req, _next);
    if(res) {
      const hostname = req.headers.get('host') || localHost;
      // loop over subdomains
      for (const subdomain of subdomains) {
        // is this hostname included in any of the patterns
        const hostnameInPattern = subdomain.patterns.filter((pattern) => {
          return hostname.includes(pattern);
        });
        if(hostnameInPattern.length) {
          let p = path.split('/');
          // inject path into the response - assumes [p1] is the locale
          path = p[1] + '/'+ subdomain.directory +'/' + p.slice(2).join('/');
          return NextResponse.rewrite(
            new URL(`/${path}`, req.url)
          );
        }
      };
      return next(req, _next);
    }
  };
};
```

* This only deals with the subdomain routing, nothing more and nothing else.
* You'll see that I've also moved the magic subdomains to match against into a constant; this in theory could be handled via config or env variable.

## Conclusion

Ultimately, I'm not convinced this is a long-term scalable solution, but it does work, shockingly, on both localhost and on GCP. I did observe that it did *not* work when trying to run Cypress tests against the local subdomain.

The weak points here are how I'm handling the locale, and the structure of the solution. Given the chance to do this again, I might retain the routing technique but handle *all* incoming requests and stash directories accordingly.

Part two of this post will dig into how we handled the subdomain portion from the Contentful / CMS side!