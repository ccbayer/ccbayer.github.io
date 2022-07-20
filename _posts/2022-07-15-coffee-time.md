---
layout: post
title:  "Coffee time!"
date:   2022-07-16 12:00:00 -0700
categories: posts
author: Colin Bayer
thumbnail: "/images/posts/2022/07/16/coffee-time.jpg"
excerpt: "Calcluate how much water to use when you're making coffee"
category: development
tags: [sandbox, alpine, javascript]
excerpt_separator: <!--more-->
---

I am a routine coffee drinker, and I typically make the same amount of coffee every day.  I typically use a Chemex when making coffee, and always use the same ratio of water-to-coffee.  I can't remember where I got this ratio, but it comes out to about 15:1 water-to-coffee. 

On a typical day, I use 45g of ground coffee, which comes out to 681 grams of water, or about 24oz of coffee. I'll drink one cup immediately, then put the rest into a [Zojirushi thermous](https://www.zojirushi.com/app/category/vacuum-insulated-mugs-bottles), and drink the rest throughout the morning.

On weekends I might have less - only 30g, which comes out to 454g of water.  30g/454g and 45g/681g are so ingrained in my mind over the years of coffee making with this method that I don't even really think about the ratio - I just know I need either 30g or 45g of ground coffee, and either 454g or 681g of water to make it.

But there are times when I want less or more coffee, or times where I don't have enough to make 30g. Or I might use a [fancy French Press I received as a gift](https://www.espro.com/products/coffee-french-press-p7?variant=40619332829363), which has a different ratio altogether.

So to faciliate my occasional tweaking, [I build a coffee calculator using JS](/sandbox/coffee-time).  This was a pretty easy project, since it's just simple math, but it sure beats having to whip out my calculator app every time I change my ratio.


I wanted to add some ability to modify the strength of the coffee. Now, I am no super nerd when it comes to this stuff - <a href="https://coffeeshophub.com/why-is-my-coffee-strong-or-weak/" target="_blank">if you want to dig in deeper, please do elsewhere</a> - so all my modifier does is change the ratio up or down by 10%.  It does not take into account the size of the grind, the method of brewing, or the length of brewing. All of those factors will also impact the relative "strength" of your coffee, not simply the water to coffee ratio!