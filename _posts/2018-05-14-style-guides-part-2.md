---
layout: post
title:  "Creating Useful Style Guides for Web Projects - Part 2"
date:   2018-05-14 12:00:00 -0700
original: https://www.ampagency.com/blog/creating-useful-style-guides-for-web-projects-part-2
categories: posts
author: Colin Bayer
thumbnail: "/images/posts/2018/05/14/post-thumbnail.jpg"
excerpt: "In part two of two, we'll explore different ways to create styleguides and what works and doesn't about each method."
category: development
tags: [front-end, styleguides, development, smalltalk]
excerpt_separator: <!--more-->
---

{% if page.original %}
<p><i>This post was originally posted on <a href="{{ page.original }}" target="_blank">SmallTalk's website (Now AMP Agency).</a></i></p>
{% endif %}

<p>In part two of two, we'll explore different ways to create styleguides and what works and doesn't about each method. Throughout, we'll look at examples. If you haven't read the first part of this series from last month, or need a refresher, <a href="/posts/">click here.</a></p>

<!--more-->
<p>We have already defined what a styleguide is, and what types of visual definitions need to be in them - and I've made recommendations about when to create them. This post will dive into the different ways 
of actually creating the styleguide.</p>

<h2>Method One: Static Old School</h2>
<p>I'm calling this the Static Old School method: A designer or production artist lays out a styleguide based on the design system for 
the project in Illustrator or Photoshop. They export it as a PDF, get client approval, and move on to layout.  The PDF is handed off to the developers to begin their baseline work.</p>

<p><strong>Pros:</strong></p>
<ul>
    <li>Gets the job done</li>
    <li>Gives designer complete control over formatting and layout, which may be useful for client presentations</li>
</ul>

<p><strong>Cons:</strong></p>
<ul>
    <li>Not easily updated - requires a designer to maintain</li>
    <li>Does not keep designers honest - a label <em>indicates</em> that this blue color is <code>#3c89bf</code> — but is it actually?</li>
    <li>Not interactive - cannot demonstrate rollover states or add code snippets</li>
    <li>Developers cannot easily highlight text to inspect additional properties that may not be defined, such as line height</li>
</ul>

<p><strong>Verdict and Recommendation:</strong></p>
<p>On a small project or one with a short timeline, this approach will suffice. There are enough "cons" to avoid it if you can though.</p>

<h2>Method Two: Use a Plugin!</h2>
<p>Since a designer has her layout in a design program like Photoshop or Sketch already, wouldn't it be really convenient if a magic button 
could be pressed and a styleguide is automatically created? Fear not, this magic button exists.</p>

<p>The most well-known style guide generator is Craft by Invision. Invision is an online collaborative prototyping tool that allows designers to upload their layouts, request reviews or comments from other team members or clients, and simulate interaction by creating clickable hotspots.</p>

<p>If a layout is uploaded correctly, developers can interact directly with the app to inspect fonts, measurements, and CSS properties: </p>

<p><img src="images/mockup-inspect.png" alt="Invision Inspect functionality" class="img-fluid"></p>
<p>Invision has created a plugin called Craft that allows designers to 
automatically generate a styleguide based on all of the existing 
properties in their layout.  The plugin will analyze all of the font 
properties and colors used in your various page layouts and generate a 
separate static styleguide for you.  This can then be exported as a PDF /
 static styleguide and shared, or uploaded to Invision for review and 
for developer inspection.</p>
<p>I created a demo of the plugin in action which you can view below:</p>
<div class="embed-responsive embed-responsive-16by9">
<iframe src="https://www.youtube.com/embed/BzENA_cibds" allow="autoplay; encrypted-media"></iframe>
</div>
<hr/>
<p>Craft is not the only game in town - <a rel="noopener noreferrer" href="https://www.zeroheight.com/" target="_blank">zeroheight</a>
 uses a Sketch or Photoshop plugin to generate a styleguide based on a layout as well.  There are additional steps and control given to this tool, since zeroheight lets you create products with technical specs as parameters (such as the design and screen resolution). In this way, this solution is a combination of a local design plugin and an online management tool.</p>
<p>Unlike Craft, the designer has more control about what ends up in the layout to begin with - avoiding the scenario where every single color or font on the layout ends up in the styleguide that later has to be 
removed. Zeroheight will also allow designers to define entire component definitions, which make for a much more robust styleguide.</p>
<p>Once the designer defines the parameters and what layers should be included, zeroheight will export the generated guide to its server, where the interactive styleguide is automatically created based on the 
export.  This is where your living styleguide is put for further editing, viewing and sharing with other team members.  Unlike Craft, where the generated styleguide is just another page in your layout, the 
zeroheight styleguide is managed within its website.</p>
<p>A risk I see with this approach is if a design changes but the 
styleguide is not synced, there's no guarantee a developer is seeing the
 latest changes. Deciding on a proper workflow can help mitigate that 
risk.</p>
<p>zeroheight has other bells &amp; whistles, such as JIRA and Slack 
integration, that can notify team members when the styleguide defintion 
is updated.</p>
<p>It's unclear how much this service costs, but since it's more than 
just a plugin, I am guessing there is a subscription model involved. The
 website provides no pricing model, no demo (I found a few on YouTube) 
and no trial version, so you don't really know what you're getting 
without having to go through a sales call and presentation. Likely, the 
people making the decision to purchase the product aren't the people who
 are sussing out whether the tool works for them or not, which can 
require a lot of legwork for the team just to find out whether the tool 
is going to do what they want or not.</p>
<p><strong>Pros:</strong></p>
<ul>
    <li>Reduces the amount of work required by designers to create the styleguide</li>
    <li>May help keep designers honest - in the Craft demo video above, 
you can see I had multiple similar shades of grey and orange that were 
not intended.  In a real-world example, I'd need to decide whether those
 colors are still required, or remove them from my layout.</li>
    <li>Removes any ambiguity in the definitions - yes, that really is 60pt font, and yes that really is <code>#3c89bf</code></li>
    <li>Excellent Sketch support</li>
    <li>Can be easily re-exported as your design changes to capture more definitions</li>
</ul>
<p><strong>Cons:</strong></p>
<ul>
    <li>Requires the layout to be defined first</li>
    <li>While it may keep designers honest, they may not go back to 
actually address duplicates or ambiguous definitions in their primary 
layout, leading to more ambiguity.</li>
    <li>Outputted result is still static unless you use Invision or zeroheight, which is not free</li>
    <li>Not sure if it works as well for Photoshop, unknown whether it exists for other layout tools at all.</li>
    <li>No way to make Craft interactive</li>
    <li>Craft only captures colors and fonts; doesn't capture button 
styles or any additional design language components that should be in a 
complete styleguide (zeroheight is more comprehensive)</li>
</ul>
<p><strong>Verdict and Recommendation:</strong></p>
<p>This is better than doing it entirely by hand if you're using Sketch 
(and even moreso if your team is using Invision anyway), but the output 
result of Craft is not enough to be considered a complete styleguide, 
and there's no real way to make it interactive.</p>
<p>zeroheight shows more promise, but without the ability to try the 
product out, you have to hope that that it does everything I think it 
does. I can't make a strong recommendation for or against it at this 
point without knowing more or having some hands-on time with it.</p>
<h2>Method Three: Generators Upon Generators!</h2>
<p><a rel="noopener noreferrer" href="https://github.com/davidhund/styleguide-generators" target="_blank">David Hund was kind enough to compile an enormous</a> list of code-driven generators, of which ... there are many:</p>

<p>Without the luxury of going through each individual tool and testing it out, these are very cool for a few reasons - they can live in your existing code projects which means you are not creating these based on 
the prototype layout, but actually basing it on production code. The end result is an interactive styleguide based on code you've already written. Some of the tools will automatically generate the styleguide, meaning you can continue writing the code for your project and the styleguide gets continuously updated; others require more input from the developer.</p>
<p>A few examples and demos for some selected items are below:</p>
<ul>
    <li>Stylemark, which will generate a nice page for you based on markdown format; </li>
    <li><a rel="noopener noreferrer" href="http://patternlab.io/" target="_blank">Patternlab</a></li>
    <li><a href="https://react-styleguidist.js.org/">React Styleguidist</a></li>
    <li><a rel="noopener noreferrer" href="http://warpspire.com/kss" target="_blank">KSS</a>, which generates a styleguide based on <code>/* comments */</code>
 developers put into their CSS and HTML templates. The comments are 
parsed by the tool, which outputs a HTML file with visuals and code 
snippets.</li>
    <li><a rel="noopener noreferrer" href="https://storybook.js.org/" target="_blank">Storybook.js</a>, a UI development environment for JS projects (React, Vue Angular)</li>
</ul>
<p>Many of these tools have the same or similar functionality as their 
counterparts, and many of them won't apply to your specific project 
based on the platform it is living on.  That said, there are many to 
choose from for a variety of platforms - and additional research and 
trial &amp; error is likely the only way to find the one with the right 
feature set for you.</p>
<p>While these are pretty slick and ultimately devs like me are easily 
impressed by any tool that "automagically" does something, the big 
unspoken issue here to me is that these tools cut out the designer from 
the process, and developers don't just make up the styles from scratch 
in the development phase. Thus, these tools are not a replacement for a 
styleguide, since a designer is going to need something to even start 
the project - they are likely going to *still* need the designer to hand
 something off statically at the start.</p>
<p>So, that means these tools are likely a way to convert the styleguide
 from its initial form to a living form - but are not a replacement or 
the only styleguide to be created on the project.</p>
<p><strong>Pros:</strong></p>
<ul>
    <li>Reduces the amount of work required by developers to create an interactive styleguide</li>
    <li>Can be integrated with source control so there's never a disparity between the core site code and the generated styleguide</li>
    <li>Generates something that can be pushed to a public (or 
protected) URL and visited / referred to easily - eliminating the "Which
 is the the latest styleguide PDF?" question</li>
    <li>Since the styleguides are based on existing code, what is in them accurately represents the current state of the project.</li>
    <li>Can be continuously updated to reflect the latest styles and code</li>
</ul>
<p><strong>Cons:</strong></p>
<ul>
    <li>An overwhelming number of choices</li>
    <li>A lot of these options are open-source and/or undermaintained - meaning no support if something doesn't work</li>
    <li>Ability to implement may require developer resources and hours that aren't available</li>
    <li>The tool you like may not be compatible with your framework or project platform</li>
    <li>Learning curve range depending on which tool is used and how involved it is.</li>
    <li>Often dependent upon learning and installing additional technology (various node packages, third-party dependencies, etc)</li>
    <li>Totally cuts out the designers from the process, unless they are also writing the code.</li>
    <li>Since the styleguides are based on existing code, what is in 
them may not *accurately* represent what the design was *supposed* to 
be!</li>
</ul>
<p><strong>Verdict and Recommendation:</strong></p>
<p><a rel="noopener noreferrer" href="https://www.smashingmagazine.com/2015/04/an-in-depth-overview-of-living-style-guide-tools/" target="_blank">Smashing Magazine has a nice, more in-depth review of some of these tools - though it's a few years old</a> - worth checking out if you are compelled to move in the generator direction.</p>
<h2>Other Web Applications</h2>
<p>We've already briefly talked about Invision, which is more of an 
online prototyping tool. It becomes more than just that when using the 
Craft plugin.  However, there are also online services tailored 
specifically for generating styleguides, for a fee. Two additional 
examples are Frontify and Patternry; zeroheight would also fit into this
 category as outlined above.</p>
<h3>Frontify</h3>
<p>The approach for Frontify is to allow users to upload or add 
specifications via WYSIWYG editor. This could be done before, during, or
 after high-fidelity design by a designer, and can easily be updated as 
code snippets become available by the developer. It appears to allow for
 a collaborative approach that could be integrated at various points 
along the phase of a project.</p>
<div class="embed-responsive embed-responsive-16by9">
<iframe src="https://player.vimeo.com/video/205023281?h=11f2fbccae&title=0&byline=0&portrait=0" frameborder="0"></iframe></div>
<p><a href="https://vimeo.com/205023281">Frontify Style Guide</a> from <a href="https://vimeo.com/frontify">Frontify</a> on <a href="https://vimeo.com/">Vimeo</a>.</p>
<p>Frontify offers additional services, such as a media library for 
storing image assets, and what they call a Brand Portal, for entire 
brand identity suite.  The product aims to be a central repository for 
any given brand or product's guidelines, to be shared by designers, 
marketers, and developers alike.</p>
<h3>Patternry</h3>
<p>If Frontify is trying to be everything to everyone, Patternry narrows
 its range of services and its target user. In Patternry, building a 
style guide requires a developer to write code that is hosted within 
Patternry. The target user for this product is a UI designer / developer
 - the product does not run off of drag-and-drop or WYWIWYG tools.  The 
end result is more control.</p>
<p>The component definitions inside Patternry seem to depend upon 
production-ready CSS and JS to function, introducing some concern about 
keeping code in sync between your code repository and Patternry. This 
also limits the collaboration aspect, as a designer without code 
experience can't dive in to make adjustments.</p>
<p><strong>Verdict and Recommendation:</strong></p>
It's clear that these types of services wish to make the creation of 
sharable and maintainable style guides quite easy, but also wants to 
hitch users into a subscription model where they are dependent upon them
 as part of their workflow. That may not be in your budget, and may be 
yet another thing to track (along with GitHub, JIRA, Basecamp, etc).
<p>Some of the features are fairly robust, though, and the idea of not 
having to create any code from scratch is appealing.  The feature set of
 Frontify seems pretty broad, so if your team can define a workflow that
 works for everyone, it may be a very useful suite of tools that act as a
 central repository for your style guides and brand standards.  With 
Patternry, it seems to be more of a framework for an online styleguide 
than an actual generator or creator. That may be okay, but keep in mind 
that it's likely going to introduce code disparity between your 
repository and styleguide. Using a code-based generator tool as 
described above may be more useful.</p>
<h2>Some More Online Styleguide Examples</h2>
<h3>Frontify</h3>
<p>Frontify - covered above - used their own tool to generate their 
styleguide.  Always nice to see a company pracitcing what they preach 
and using their own tools. I like how it mixes both visual definitions, 
when to use what, and provides code samples. They also categorize the 
sections into Design, Identity and Communication. Very thorough, but 
goes beyond a styleguide for a website and into the brand identity / 
pattern library for the entire product. <a href="https://brand.frontify.com/d/VwGBH5fyYyqH/texts#/feature-descriptions/style-guide">View it here.</a></p>
<figure>
<img alt="" src="/images/posts/2018/05/14/frontify-1.png" class="img-fluid">
<figcaption>Frontify Colors</figcaption>
</figure>
<figure>
<img alt="" src="/images/posts/2018/05/14/frontify-2.png" class="img-fluid">
<figcaption>Frontify Typography</figcaption>
</figure>
<figure>
<img alt="" src="/images/posts/2018/05/14/frontify-3.png" class="img-fluid">
<figcaption></figcaption>
</figure>
<hr>
<h3>Yelp</h3>
<p>Yelp provides its styleguide online publically, which provides nice 
code-toggle ability. The visual layout of the styleguide is less 
engaging than the previous example, which is perhaps emphasises the 
utilitarian nature of it. <a rel="noopener noreferrer" href="http://www.yelp.com/styleguide" target="_blank">View it here.</a></p>
<figure>
<img alt="" src="/images/posts/2018/05/14/yelp-1.png" class="img-fluid">
<figcaption>Yelp Islands</figcaption>
</figure>
<figure>
<img alt="" src="/images/posts/2018/05/14/yelp-2.png" class="img-fluid">
<figcaption>Yelp Color - including SASS variables</figcaption>
</figure>
<figure>
<img alt="" src="/images/posts/2018/05/14/yelp-3.png" class="img-fluid">
<figcaption>Yelp Typography - Including utility class definintions for front-end developers or content editors</figcaption>
</figure>
<hr>
<h3>PageUp People</h3>
<p>This is a styleguide that clearly took a lot of time to build. I like
 how this styleguide includes code samples for each component along with
 usage notes to remind authors how to utilize each component.  I think 
their foundation area could use some more baseline code samples 
(typography, for example) but it possible that is baked into their 
global stylesheet, and developers would not have to touch it. <a rel="noopener noreferrer" href="http://styleguide.pageuppeople.com/" target="_blank">View it here.</a></p>
<figure>
<img alt="" src="/images/posts/2018/05/14/pageup-1.png" class="img-fluid">
<figcaption>PageUp color - nicely designed color blobs, though users have to hover above them to view the hex value.</figcaption>
</figure>
<figure>
<img alt="" src="/images/posts/2018/05/14/pageup-2.png" class="img-fluid">
<figcaption>PageUp Buttons - Very thorough with helpful do's and don'ts and code samples.</figcaption>
</figure>
<figure>
<img alt="" src="/images/posts/2018/05/14/pageup-3.png" class="img-fluid">
<figcaption>PageUp Component example - includes code sample and usage guide</figcaption>
</figure>
<figure>
<img alt="" src="/images/posts/2018/05/14/pageup-4.png" class="img-fluid">
<figcaption>PageUp Typography - This section looks nice but is lacking 
for more detail around the values (line spacing / letter spacing, 
weights, etc)</figcaption>
</figure>
<p>More examples:</p>
<ul>
    <li><a rel="noopener noreferrer" href="https://www.creativebloq.com/web-design/style-guides-that-do-it-right-31619497" target="_blank">via CreativeBloq</a> — Three Online Style Guides That Do It Right</li>
    <li><a href="https://blog.hubspot.com/marketing/web-design-style-guide-examples">via Hubspot</a> — Apple, Google &amp; Starbucks: Inside the Web Design Style Guides of 10 Famous Companies</li>
</ul>
<h2>Conclusion</h2>
<p>The takeaways here are that there will not likely be a single tool 
for solving the styleguide portion of the project. Nor should the 
responsibility of creating styleguide be assigned to only the designer 
or developer — it should be a collaborative process between technology 
and creative. We have found out that in some cases, two styleguides will
 need to be created - one static, perhaps for client approval and tech 
handoff; and one dynamic / interactive that will be the evergreen and 
living document to be referenced.</p>
<p>It's also clear that everyone has their own definition of the right 
order of operations for creating styleguides.  In my previous post, I 
had recommended starting with the styleguide, but also recognize that 
this workflow is not possible for everyone or for every project. Some of
 the tools outlined above will be more flexibile than others to fit your
 approval process and work style.</p>
<p>I would suggest that an important criteria for selection is the 
ability for the tool or methodology to be flexible enough to work with 
you, rather than one that forces you to change your workflow in order to
 use.  Hopefully this post has given you a good overview on the types of
 methods available and the pros and cons of each.</p>
<h2>Resources and Citations</h2>
<ul>
    <li><a rel="noopener noreferrer" href="http://styleguides.io/" target="_blank">Styleguides.io</a></li>
    <li><a rel="noopener noreferrer" href="https://github.com/davidhund/styleguide-generators" target="_blank">List of Styleguide Generators</a></li>
    <li><a rel="noopener noreferrer" href="https://www.smashingmagazine.com/2015/04/an-in-depth-overview-of-living-style-guide-tools/" target="_blank">An In-Depth Overview of Living Style Guide Tools</a></li>
    <li><a rel="noopener noreferrer" href="https://www.creativebloq.com/web-design/style-guides-that-do-it-right-31619497" target="_blank">Three Online Style Guides That Do It Right</a></li>
    <li><a href="https://blog.hubspot.com/marketing/web-design-style-guide-examples">Apple, Google &amp; Starbucks: Inside the Web Design Style Guides of 10 Famous Companies</a>
    </li>
</ul>