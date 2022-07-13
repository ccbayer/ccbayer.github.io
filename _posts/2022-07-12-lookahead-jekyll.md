---
layout: post
title:  "Creating a pseudo-search lookahead function with JS and Jekyll"
date:   2022-07-12 12:00:00 -0700
categories: posts
author: Colin Bayer
thumbnail: "/images/posts/2022/07/12/post-thumbnail.jpg"
excerpt: "Making a static site seem less static with some fun JS"
category: development
tags: [jekyll, development, javascript]
excerpt_separator: <!--more-->
---

What does a blog with a handful posts and zero traffic need? Why, it needs a fancy search function, of course! The people demand it!


## Step 1: Get JSON Data of Posts

Jekyll allows you to specify the file type to be compiled simply by giving it a file extension. So I created a json "feed" of my posts and put it in `api/posts.json` - now I can run JS functions against this feed. [This article helped point me in the right direction](https://linguinecode.com/post/how-to-convert-jekyll-data-into-json) - I simply modified the data feed to reflect what I wanted my "API" to return.

The file itself simply loops over my posts and renders it in an array of objects. You can see that it is mixing both JSON / JS formatting and Liquid template tags, but the compiler is able to navigate this just fine:

```
{% raw  %}
---
title: List of all posts
permalink: /api/posts
---
[
  {% for post in site.posts %}
    {
      "date": "{{ post.date }}",
      "title": "{{ post.title }}",
      "excerpt": "{{ post.excerpt }}",
      "url": "{{ post.url }}",
      "slug": "{{ post.slug }}"
    }{% unless forloop.last %},{% endunless %}
  {% endfor %}
]
{% endraw %}
```
<a href="/api/posts.json">Output here</a>.  This functions *just like a real API*, because the JSON is constructed on build. As I add new posts, it will automatically add them to the feed. Pretty sweet!

The cool part here is that since this is a public endpoint, in theory, anybody could query it and do what they wanted with the results, like make me look like a murderer or something!

## Step 2: Read JSON from front end

We can treat this next step as though we are querying the results from a public API via GraphQL or REST, or simply reading a local JSON file - all that matters is that my script can read the output of the feed.

To accomplish this, I need to read the data from the json feed; convert it to json, then push the results into an array.  I am using the browser's <a href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch" target="_blank">Fetch API in its simplest form</a>, so this won't work if you're on IE11 but if you're on IE11 you've got bigger problems.

To recap Fetch - 
* The Browser's Fetch API returns a promise that resolves with a Response Object.
* The Response Object is not the actual JSON - even though the API endpoint is JSON formatted. It's a representation of the entire HTTP response, including its headers, etc...
* So, we pass the response to the `json()` function to read the `body` of the response into JSON. This returns a SECOND promise... who resolvess with the result of parsing response body into JSON :)
* In this example, i'm using the `...` <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax" target="_blank">spread operator</a>. This is because I don't know how many results my feed will return, and push expects each item in the array to be appended individually. the `...` operator gets around this!

```
  const endpoint = '/api/posts.json'; // the endpoint; this could also point to a function that returns JSON
  const posts = []; // an empty array to hold my posts
  fetch(endpoint) // Fetch API returns a promise that resolves with a Response object
    .then(response => response.json()) // response object's body parsed with json
    .then(data => posts.push(...data)); // pushing the data returned from the second promise into my array
```

## Step 3: Add search form

Coming soon...