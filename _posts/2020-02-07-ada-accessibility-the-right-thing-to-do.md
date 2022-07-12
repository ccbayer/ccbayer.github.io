---
layout: post
title: "Ada Accessibility: The Right Thing To Do"
date:   2020-02-07 12:00:00 -0700
original: https://www.ampagency.com/blog/ada-accessibility-the-right-thing-to-do
categories: posts
author: Colin Bayer
thumbnail: "/images/posts/2020/02/07/post-thumbnail.jpg"
excerpt: "Why should we care about WCAG Compliance on the web?"
category: development
tags: [front-end, accessibility, development, smalltalk]
excerpt_separator: <!--more-->
---

{% if page.original %}
<p><i>This post was originally posted on <a href="{{ page.original }}" target="_blank">SmallTalk's website (Now AMP Agency).</a></i></p>
{% endif %}

<p>In my neighborhood in Portland, Oregon, many of the sidewalks are original - built when the neighborhood was coming together in the early part of the 20th century.  You can locate stamps at 
intersections that have both obsolete street names - Sprague Street is now known as Rosemont; Margarette is now 34th Ave - and the names the contractors who poured the cement, along with the year they were poured.
  These small reminders of the recent past are fun to find, but point out a glaring inequity in their construction: These old sidewalks are not accessible, and not safe.</p>

<figure class="text-center">
    <img src="/images/posts/2020/02/07/unimproved.jpg" alt="" class="img-fluid">
  <figcaption>An unimproved intersection</figcaption>
</figure>
<hr>

<p>The city is in the process of converting each of the city’s 
intersections into curb cutouts that are friendlier to those who may 
require assistance (wheelchairs, kneeling scooters, crutches, probing 
canes) getting up and onto sidewalks from the street.  The brand new 
curb cutouts include a yellow rubberized traction pad that signals the 
transition between street and sidewalk, and there are eight on each 
improved intersection - two on each corner of a standard intersection.</p>

<figure class="text-center">
  <img src="/images/posts/2020/02/07/improved.jpg" alt="" class="img-fluid">
  <figcaption>An improved intersection.</figcaption>
</figure>
<hr>

<p>This effort is happening not because the improvements and bright 
yellow traction pads are attractive, or because the contrast between the
 fresh cement and the old cement is nice to look at - but because it is 
the right thing to do for the citizens of Portland and those who have 
mobility issues who might otherwise need to be in the street in order to
 avoid the curb.  This abides by the <a href="https://www.eeoc.gov/eeoc/history/35th/1990s/ada.html" target="_blank">regulations set forth in American with Disabilities Act of 1990 (ADA)</a>.
  The benefits go beyond supporting only people who have disabilities, 
though - anyone who has tried to use a rolling suitcase on the sidewalk,
 pushed a baby stroller over a curb, or can’t ollie on a skateboard can 
attest to that.  By doing the right thing, <a href="https://www.portlandoregon.gov/transportation/article/431130" target="_blank">Portland has chosen to make their city more accessible to more of its citizens</a>.</p>

<p>In our web development projects, we often support clients who need to
 do the equivalent curb-cutout improvements. Their sites may have been 
beautifully designed, but fall short in visual and technical areas that 
would help make their site more accessible.  By bringing the site up to a
 <a href="https://www.w3.org/WAI/standards-guidelines/wcag/" target="_blank">baseline of accessibility standards set forth by the WCAG</a>,
 the site becomes more equitable, inclusive, and usable for more people.
 The add-on effect for the client is that they have just widened their 
potential customer base by not excluding people who may consume web 
information in different ways. The improvement process also helps shake 
out other technical issues around markup structure, meaning the site may
 become more <a href="https://www.eresources.com/2019/04/22/ada-compliance-seo/">SEO-friendly</a>
 and may render better in a wider range of devices after the 
improvements are implemented. While these efforts may be initially 
driven by legal justification (avoiding ADA lawsuits), or for marketing 
reasons (reaching more customers), improving your site’s accessibility 
is the just and correct thing to do.</p>

<p>Our process begins by using a suite of tools that analyze the website to identify problem areas. This includes using voice-reader to read the website’s content - not everyone who browses your website will use 
their eyes to do so.  We also see how the site renders without styles applied, validate the markup of the site to ensure the proper document structure &amp; hierarchy is established, and closely scrutinize how interactive elements work. Particularly complex interactive elements like carousels or interactive navigation menus may require an entire rebuild in order to be accessible, but the goal is to maintain the current design or as close to it as possible.</p>

<p>The end result of such an effort should not sacrifice visual design or interactivity, nor should it even be noticeable to those users who use standard means to interact with websites.  But for those who need assistance, the improvements are welcome and appreciated.  </p>

<p>For sites that we build from scratch, we design and develop with this equity in mind from the beginning. By starting off with a requirement of accessibility, the new site enters the digital world already with accessibility in place. The level of accessibility, <a href="https://digitalaccessibilitycentre.org/index.php/blog/20-diary/187-the-icing-on-the-cake-the-difference-between-aa-and-aaa-compliance" target="_blank">set forth by WCAG standards - “A”  to “AAA”</a>, with the latter being the most strict - may be dictated by the customer’s requirements. Projects for larger clients, non-profits, or government clients typically have a minimum accessibility level mandate for digital properties. But even for those without the mandate, doing the right thing results in a site that behaves nicely across different input types and allows for a wider audience to engage with the site. </p>

