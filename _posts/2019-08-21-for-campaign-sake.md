---
layout: post
title:  "For campaign's sake"
date:   2019-08-21 12:00:00 -0700
categories: posts
author: Colin Bayer
thumbnail: "/images/posts/2019/08/21/campaign-sake-hero.jpg"
excerpt: "How can a marketing team prepare their digital properties for a large campaign?"
category: development
tags: [front-end, testing, performance, development, smalltalk]
excerpt_separator: <!--more-->
---
<p>Imagine you are on a marketing team. You’ve spent months preparing for your company’s latest new product launch. You’ve gone through the design phases to hone in the campaign’s look and feel, 
created content on the website to support the announcement and worked with various channel owners to prepare the world for the big reveal of your new product. The launch day finally comes - and what was at first emotions of nervous anticipation (“Will this product be a flop?”) transforms very quickly to elation (“the product announcement has gone completely viral!”) and then soon afterwards is replaced with dread: the website is down.</p>

<p>There are so many interconnected pieces to a marketing campaign: Social posts, email blasts, online and offline advertising, live and in-person events. Each one of these pieces are labored over intensely, 
aligning strategy and messaging to ensure a unified message, and coordinating timing in order to flood the market with the announcement - and often these different channels all funnel down to one place: the 
website.  The website must be able to handle the traffic coming from these various locations, and in an age of social media where every marketer wishes to become viral, is your site ready to handle the load? 
 After all, the curse of a too-popular campaign can leave your server choked and <a href="https://httpstatuses.com/503" target="_blank">serving up 503 errors to your users</a>, leaving them confused or annoyed, and undermining all of the work you and your team has put in place for the campaign.</p>

<p>A campaign can only be as successful as the technical infrastructure set up to support it. How can you be proactive and plan ahead in order to avoid catastrophe when your campaign launches?</p>

<h2>Critical Infrastructure Planning</h2>

<p>Messaging, design, and timing are all critical aspects of a campaign but the final pillar of technical infrastructure and preparation is as critical as the rest. </p>

<p>It is important to consider before launching a campaign:</p>

<ul>
<li>What is my web server’s current traffic capacity?</li>
<li>Does my web server have the ability to scale in order to accommodate
 spikes in traffic? If so, what are the cost implications to this?</li>
<li>Is the infrastructure of the server and the quality of the code prepared to serve up high quantities of traffic?</li>
<li>Has the marketing team connected with the technical partner or team 
to ensure that campaigns can be served successfully, or that the links 
sent in the campaign can be supported?</li>
</ul>

<p>Planning can be done to avoid the nightmare scenario, and usually that involves talking with your technical partner before campaigns are released to the wild.  These conversations should occur during the 
initial phases of the campaign to ensure enough time to implement technical testing or upgrades.</p>

<h2>Capacity &amp; Load Testing</h2>

<p>Find out what the current server’s capacity based on your current plan by contacting your host or reviewing your contract. Depending on 
your web host, they may have a hard cap on bandwidth or page views. If you are using cloud services such as <a href="https://azure.microsoft.com/" target="_blank">Azure</a>, <a href="https://www.digitalocean.com/" target="_blank">Digital Ocean</a> or <a href="https://aws.amazon.com/" target="_blank">AWS</a>, review your account to see whether there are hard caps or if additional
 bandwidth and CPU usage is simply served up at a higher rate and automatically scaled. </p>

<p>Perform load testing on your server using <a href="https://www.blazemeter.com/" target="_blank">BlazeMeter</a>, <a href="https://flood.io/" target="_blank">Flood.io</a> or another tool.  These services allow developers to write load scripts to simulate traffic, behaving similar to actual users.  A standard load test will ramp up requests to the point of failure, capturing valuable 
data such as the number of concurrent users, the response time and server latency.  The point of load tests is to push servers to their breaking point - and should not be done on a live site if at all possible. Doing this first will give you a baseline for your server’s capacity - if the number is low based on the predicted reach of your campaign, you risk experiencing this in real time when the stakes are higher.</p>

<p>Based on your load test results, the best option may be to preemptively scale up your server’s capacity. You can do some back-of-the-envelope math to calculate how much to scale. If your email 
and ad campaign is expected to have 1M impressions, with a 1% conversion rate, that translates a potential of 10,000 concurrent users. That may still be too much for your server to handle.</p>


<h2>Caching &amp; CDN</h2>

<p>A cost-effective way to increase capacity, even without scaling is by using a cache layer to serve up content to visitors.  This means that if 10,000 users are hitting the website at the same time, the server is not required to serve up 10,000 simultaneous requests - but instead, the cache layer is serving up non-dynamic content to these users from memory.   Many servers, hosts and platforms automatically include a cache, including <a href="https://wpengine.com/more/specialoffer/?w_agcid=WxoLaySE" target="_blank">WPEngine</a> - but some hosts or hand-built solutions may not.  In this case, consider a third party cache such as Cloudflare, or Akamai.</p>

<p>There are ways the cache can be bypassed - on purpose or inadvertently.  Notably, if there are unique query string URLs in your marketing campaign, the cache layer interprets these requests as unique 
and will make a new request back to the server to get “fresh” content that is no different than the cached response.</p>

<p>For example:</p>

<p><code>https://www.yourwebsite.com/campaign?id=1</code> and <code>https://www.yourwebsite.com/campaign?id=3</code> may actually return the same page, but pass through the <code>id</code>
 parameter to tracking code.  If each request to the site is unique based on some ID, this may allow traffic to skip the cache layer entirely, thus taxing the server.</p>

<p>So, it may be necessary to find other ways of tracking this data so that dynamic query string variables are not skipping the cache, or configuring the cache to ignore certain name-value pairs in order to 
support the campaign.</p>

<p>Offloading static content to a CDN like <a href="https://aws.amazon.com/cloudfront/" target="_blank">AWS Cloudfront</a> or <a href="https://jetpack.com/" target="_blank">Jetpack for WordPress</a> can help deliver content faster to your users. Images and other media should still be optimized for best-case scenario web use, but by using a CDN, you are reaping at least two benefits: offloading delivery of non-dynamic files away from your server, thus saving bandwidth and CPU power, and taking advantage of the distributed nature of a CDN which can deliver faster content than a standard single web server.  Your hosting plan may already come with a CDN - <a href="https://wpengine.com/more/specialoffer/?w_agcid=WxoLaySE" target="_blank">our WordPress hosting partner WPEngine offers this as part of their standard hosting plans</a>, for example. </p>


<h2>Performance &amp; Content Optimization</h2>

<p>While the load tests are running, take advantage of this simulated traffic to evaluate how performant the code is.  By running diagnostic tools such as <a href="https://newrelic.com/" target="_blank">New Relic</a> during the load test, developers can evaluate the results to determine where chokepoints or non-performant code is.  If the server is able to handle a massive amount of throughput, but the code it is executing is poorly written - maxing out CPU or RAM is a good indicator - it can still take down the site! Developers will look for signs of memory leaks, non-performant database calls, uncached requests and more and address these items. Real-time diagnostics during a load test gives an opportunity for developers to refactor code ahead of large campaigns so that increased capacity is paired with optimal code.  Subsequent load testing and performance evaluation will validate improvements.</p>

<p>Depending on the platform you’re on, you may need multiple delivery servers behind a load balancer to spread out the traffic amongst multiple servers. However, this a more advanced infrastructure change that requires investment and often is not suited for a short-term campaign support.</p>

<p>Content optimization should be done regardless, and can be proactively addressed outside the context of a load test.  A common issue we assist our clients with is with image optimization. Images that
 are prepared for web and scaled properly in the browser can rapidly reduce page load time.  Taking advantage of proper image formats and responsive image techniques can ensure you’re serving up quality images at the size your user needs without penalizing them is especially important on image-heavy marketing sites.  Content optimization is often a collaboration between technical implementation and pre-production, coupled with hands-on author training and education.  Periodic content audits can be implemented to ensure continued adherence to content rules
 and best practices.</p>

<h2>Recap &amp; Recommendations</h2>

<p>The overall goal here is to be proactive instead of reactive. No developer or marketer wants to be scrambling to address downtime during a critical campaign. To avoid disaster, we recommend:</p>

<ul>
<li>Planning with your technical partner to assist supporting the campaign</li>
<li>Developing a pre-flight checklist:</li>
<ul>
    <li>How much traffic is predicted?</li>
    <li>Where will the traffic be pointed to?</li>
    <li>What is our current capacity?</li>
    <li>What is our ability to scale?</li>
</ul>
<li>Investing in performance monitoring and load testing</li>
<li>Optimizing code and content</li>
<li>Investigating in scaling options with the hosting partner</li>
</ul>

<p>Happy campaigning! I hope these tips will help you feel prepared for your next big campaign push.</p>