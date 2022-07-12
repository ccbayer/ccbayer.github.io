---
layout: post
title:  "Why I used Jekyll to build this website"
date:   2022-07-11 12:00:00 -0700
categories: posts
author: Colin Bayer
thumbnail: "/images/posts/2022/07/11/post-thumbnail.jpg"
excerpt: "Am I practical, pragmatic and prescient? Or perhaps perpetually behind the curve? Yes. Some thoughts on Jekyll and what I might do different next time."
category: development
tags: [jekyll, development]
excerpt_separator: <!--more-->
---

Am I practical, pragmatic and prescient? Or perhaps perpetually behind the curve? Probably both, but let's explore this a bit.

<!--more-->

Why did I choose to build this site in Jekyll? Why didn't I build it in [Gastby](https://www.gatsbyjs.com/), [NextJS](https://nextjs.org/) Or [Hugo](https://gohugo.io/)?  Or any other darn thing?


A few immediate, dumb reasons are:

* <a href="#hosting-was-free-with-github">Hosting was free with Github.</a>
* <a href="#quickstart">It allowed enough flexibility to get things done</a>, but I wasn't shackled by so much setup that I couldn't get going with *something* - note that this site has been "under construction" since 2018 🙃
* <a href="#neophobia">I have (had?)</a> an aversion to all-JavaScript solutions.
* <a href="#markdown-mania">I love Markdown.</a>

## Money Ain't Free

Way back when, I was shackled - like nearly everybody else - to a run-of-the-mill cPanel-based hosting plan just like everybody else on the 'net.  If you wanted a website and you didn't want to host it yourself from some old Power Mac G4 hidden in your basement utility closet - assuming you had a static IP - you pretty much *had* to sign up with one of the dinosaurs of hosting. I'm talking Bluehost, Network Solutions, 1 & 1, GoDaddy, Fatcow, etc.  If you got into web development at any point post-2012, this probably sounds like your grandpa talking about all the old jazz hits he used to see down at the cafe or something. 

I did like the host I had - the plan I used allowed me to spin off as many domains as i could buy, and resolve them to a directory on the virtual private server.  It came with a handful of free domains too, which allowed me to create joke sites like Endless Blockades* or a wedding site for a good friend of mine. It also allowed me to spin off staging sites for side projects I was working on - seeing that I mostly did WordPress Projects, I could create separate databases for the various installs.

But over time, as my freelance time got more and more limited, I found I was paying $30 / month for something I barely used. While I knew I needed a web presence, I also felt that for the amount of traffic I get and the type of site I needed, I shouldn't have to pay...well, hardly anything.

## Quickstart

I toyed around with creating a pure HTML site and serving it out of S3. I would have to determine how to compile the project though, because I wasn't about to write pure CSS and HTML from scratch like a n00b - I had to grab some efficiencies somewhere.  Normally, I would have reached for a prototypical JS-based static site generator, like [Gulp Web app](https://github.com/yeoman/generator-webapp), but that would have left me with having to run local builds and get the compiled code over to S3 somehow.

Having the ability to host on github pages with essentially continous integration out of the box was a huge attraction for me. Barely any setup, and an infrastructure that forces me to check code in was very appealing. I vowed never to "deploy" website changes again using SFTP nor never not check anything in.  While I have done it, my desire to burn time trying to write scripts to compile and copy code to S3 when a merge is triggered just wasn't in my ability to focus on.

Having recently worked on some VMWare sites based on Jekyll, I was familiar enough with it to get started.  I knew I could create post-like objects with efficiency, and even define my own - data-modelling right out of the box using mere front matter allowed me to get things up and running with little forethought - something I could iterate on as needed, but not have to think several steps ahead felt less daunting.

While I'm proudly a WordPress guy through and through, I did not feel compelled to wire this up to a CMS.  I think if I were to do that, I'd attempt a headless solution and render the front end on Next or Gatsby, which brings me to...

## Neophobia

It has taken me longer than many to get on board with JS frameworks, and not without reason. My avoidance comes from a few things -  mostly around JSX and styling within JS. At the risk of dating and aging myself again, all these felt like a munging of seperation of concerns! My old way of thought was that styling belonged in CSS or in SCSS files and was served up at the top of the file in the `<head>`; JavaScript was for functionality on the page, and markup was...well, semantic, HTML markup! None of these wacky `<Components>` !

As I learned more, particularly about Gatsby and NextJS, I began to understand how building out these sites could actually benefit users by automatically splitting out page- or component-specific CSS and JS - only serving what is needed.  Smart JS architects can still utilize the tools they love and need, still provide a maintainable, fast, HTML markup valid, and ADA-complient site. I am not a smart JS architect, but I'm getting there.


## Markdown Mania

Translating the developer's love for writing read me files into long form blog content just makes sense to me, and allows me to focus on creating content in one place, and styling it in another - with CSS, no less.

Side note - One of the things we've struggled with in my company is how to allow developers to write formatting-agnostic content without driving account folks crazy.  They want to see pretty layouts and formatting, we want to see content on the page.  If we had our druthers, entire SOWs would be written in markdown. Certainly, documentation for clients has been mostly written in markdown and somewhat prettified if needed using Stackedit.io to export as a PDF and using Adobe Acrobat to add watermark logos and footers. 

For internal notes and documents, the closest point of nirvana came during a period in which we were using Dropbox Paper. It allowed for markdown syntax, but also had enough formatting options for non-markdown writers to use without too much complaint.  It was not overwrought - and was not pretending to be anything more than essentially a basic editor.  Our feeling is that battling layout or providing too many options for formatting like in Word or Google Docs was just slowing us down, and Confluence's fake markdown and weird editing / roles are somewhat limiting.


## No Ragrets (except some)

Honestly, the whole Ruby / Gems thing feels so archiac compared to managing packages with NPM / Yarn - every time I crack open this site I have to remember how to run it, and how to get the dependencies installed. I have to deal with Homebrew and all these things that make me feel like it's 2012 all over again. So that part, is not great.

And, all those VMWare sites are now on Hugo instead of Jekyll. I'm not quite sure what the future of Jekyll is, frankly. If I was starting this site fresh in 2022, I would probably do it in headless NextJs with a WordPress backend; or I might try it with Hugo just to see how much faster it builds.  This Jekyll experiment has been fun but I also feel like the ship has sailed.

---
\* EndlessBlockades.com resolved to single page that said "For The Pussyfooter" in huge a font and that's it. [It's a reference to this song](https://www.youtube.com/watch?v=IztmJRegmCQ). Someone on [Tumblr](https://endlessblockades.tumblr.com/) once asked me if they could have the domain but I refused - because clearly *I was using it for important things*. Now both the domain is available and Tumblr is in the dustbin of the Internet, so whatever.