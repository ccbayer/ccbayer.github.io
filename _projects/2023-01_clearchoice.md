---
layout: project
sidebar: false
title: Patient Portal
slug: clearchoice
client: ClearChoice
link: https://connect.clearchoice.com
description: A portal with a logged-in experience. Headless CMS (contentful) with NextJS front end.
date: 2023-02-01 12:00:00 -0700
active: true
showdetails: true
techstack:
  - "<strong>Platform</strong>: NextJS"
  - "<strong>CMS</strong>: Contentful"
  - "<strong>Integrations</strong>: Custom SFDC / Mulesoft API integrations"
  - "<strong>Frameworks / Languages</strong>: React, Tailwind, TypeScript"
roles: 
  - Tech Lead
  - Front-End Architect
gallery: ['/images/portfolio/clearchoice/home.png', '/images/portfolio/clearchoice/treatment-path.png', '/images/portfolio/clearchoice/messages.png', '/images/portfolio/clearchoice/profile.png', '/images/portfolio/clearchoice/location-detail.png']
---

## Overview

ClearChoice runs a chain of dental centers and wanted to bring the patient's treatment journey to life to allow patients to find out more about their dental procedures.  The web app integrates with their existing Salesforce data for each patient, so users can see past, future and current appointments and treatment stages.  They have the ability to message their Center and customize their profile, as well as reschedule and confirm appointments.

## Technology

The user-facing experience runs on NextJS.  In searching for a platform, we knew that we wanted to utilize JAM-stack architecture to optimize the front-end experience in terms of speed, but wanted also to utlize a framework that was trusted, had good support, and plenty of baked-in features.  We landed on NextJS because of its localization features, built-in routing, and its server-side rendering capabilities.  Using Contentful meant that we had the freedom to choose whether we were going to utilize Contentful's REST JS library or GraphQL; and could make calls on both the server-side and the front-end.  This flexibility allowed us to capture content in the most efficient way needed for the client.

We were able to utilize TypeScript to enforce code quality, and React Hooks & Context to easily pass state around the various pages and components.

Much of the non-static content is handled by a customized API layer that integrates into both the CRM for patient data, and an authentication layer that deals with user log ins and profiles.

## My Role

- Lead a team of front-end developers who were responsible for the API integrations and for the UI integration
- Architected a design system based in SCSS that utilized Tailwind
- Collaborated with our back-end team to ensure the shape of the data was matching UI / UX designs
- Contributed to content modelling in Contentful
- Devised mechanism by which we could serve a marketing microsite out of the same NextJS site on the same server, with a different subdomain. [See more here](http://127.0.0.1:4000/blog/2023/02/02/subdomain-routing-with-nextjs).