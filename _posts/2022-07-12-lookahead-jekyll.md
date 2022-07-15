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

The file itself simply loops over my posts using Liquid for loop and renders it in a JS array of JSON objects. You can see that it is mixing both JSON / JS formatting and Liquid template tags, but the compiler is able to navigate this just fine:

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
      "tags": {{ post.tags | jsonify }},
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

To accomplish this, I need to read the data from the json feed, and push the results into an array.

To get the first part done, I am using the browser's <a href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch" target="_blank">Fetch API in its simplest form</a>, so this won't work if you're on IE11 but if you're on IE11 you've got bigger problems.

To recap Fetch - 

* The Browser's Fetch API returns a promise that resolves with a Response Object.
* The Response Object is not the actual JSON - even though the API endpoint is JSON formatted. It's a representation of the entire HTTP response, including its headers, etc...
* So, we pass the response to the `json()` function to read the `body` of the response into JSON. 
* Using `json()` function returns a SECOND promise... who resolves with the result of parsing response body into JSON 🤯 

To get the second part done - pushing these results into the array - I'm using the `...` <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax" target="_blank">spread syntax</a>. This is because I don't know how many results my feed will return, and `push` expects each item in the array to be appended individually. Using the `...` syntax gets around this, because it represents an indefinite number and will apply each result automatically.

```
  const endpoint = '/api/posts.json'; // the endpoint; this could also point to a function that returns JSON, an external URL, whatever...
  const posts = []; // an empty array to hold my posts. I'll use this later.
  fetch(endpoint) // Fetch API returns a promise that resolves with a Response object
    .then(response => response.json()) // response object's body parsed with json
    .then(data => posts.push(...data)); // pushing the data returned from the second promise into my array
```

## Step 3: Add search form, attach event listeners to field

This is really just adding the input that the user types into. The form doesn't submit, but we do need to add JavaScript event listeners so that we know when to fire the look ahead function:

* When user types into on the field (event name - `keyup`) - do something.
* When the field value changes (event name - `change`) - do something.


```
  const searchInput = document.getElementById('search');
  searchInput.addEventListener('change', () => { console.log('change fired!'); });
  searchInput.addEventListener('keyup', () => { console.log('keyup fired!'); });
```

If we *only* fired it when the field value changed, it would require the user to tab away or otherwise blur the field to fire the change method, so we'll attach the event listener to both events.

## Step 4: read what the user typed in

With our event listeners firing, we need to capture the actual text the user has put into the field.
To do this, let's first abstract a single function to attach to both event listeners:

```
  function displayMatches() {
    console.log('fired!');
  }
  const searchInput = document.getElementById('search');
  searchInput.addEventListener('change', displayMatches);
  searchInput.addEventListener('keyup', displayMatches);
```

Now, every time either event fires, the console gets logged. The nice part about setting event listeners with a callback - the callback being `displayMatches` - is that the callback function accepts a single parameter representing the event, and `this` in the context of the callback refers to the *element that fired the callback* - in our case, the input field

```
  function displayMatches(e) {
    console.log(e); // callback accepts one parameter, representing the event object
    console.log(this); // this refers to the element that fired the event - our search input
    console.log(this.value) // thus, we can get the input's value
  }
  const searchInput = document.getElementById('search');
  searchInput.addEventListener('change', displayMatches);
  searchInput.addEventListener('keyup', displayMatches);
```
.

We can utlize `this`, then, to directly get the value of the field when the event fires - in other words, what the user typed in.

## Step 5: Find in the feed

Now that we have the value of the input available, we want to:

* See if `this.value` value matches either a Title, Excerpt or Tag of any post within the JSON feed;
* if it does, display it.

We know that what someone types in could represent more than one post, so the best way to think of this is that the "matching results" is going to be an array of posts, not just one post, so let's just declare one:

```
  function displayMatches(e) {
    const matchingPosts = [];
    console.log(this.value) // thus, we can get the input's value
  }
  const searchInput = document.getElementById('search');
  searchInput.addEventListener('change', displayMatches);
  searchInput.addEventListener('keyup', displayMatches);
```

Knowing that `matchingPosts` needs to be representative of all posts _contain_ the input value, we can use <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter">Array Filter</a> for that.

Array Filter allows you to iterate over each array member and returns another array that fits the test criteria passed to it.  In other words, by passing it a string, we can _filter_ the results of the posts array to the input that the user types in.  If the result of the test is true, the element is added to the return array ; if the result of the test is false, then the array element is not added to the return array.

We already have an array of posts thanks to our Fetch function above, so we can filter directly against it:

```
  const matchingPosts = posts.filter(post => {
    // does this post have the input value in it?
  })
```

The best way of checking to see if a value is contained in a string is by using the string method <a hre="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match">Match</a> with a <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp" target="_blank">Regular Expression</a>.  

`match()` will return the result of testing a string against a regular expression.

We want to match globally, so we can define our regex thusly:

```
const regex = new RegExp(this.value, 'gi');
```

This test will return true if the text the user typed in - `this.value` - is globally found within the test string. We can use this regex as the test function in our `filter`:

```
  const matchingPosts = posts.filter(post => {
    const regex = new RegExp(this.value, 'gi'); // g - search globally; i - case insensitive
    return post.title.match(regex) // we are applying the match string method to the title of the post, testing the input string against the text the user typed in
  })
```

We need to expand this to also check against the post's excerpt, so we can use an `||` operator, meaning if it's in the title or in the excerpt, return this post to the matchingPosts array:

```
  const matchingPosts = posts.filter(post => {
    const regex = new RegExp(this.value, 'gi');
    return post.title.match(regex) || post.excerpt.match(regex)
  })
```

Finally, we want to also see if this matches any of the tags the posts have - but since tags are in an array, we need to test them differently. Fortunately, we have a way of doing this already - `filter`.

We will run another filter against each tag - and if any of the tags within the tag array match, we'll add it to the resulting array. 

```
post.tags.filter(tag => tag.match(regex)).length 
```

Since all we are really interested here is the `length` of the array - does it have any matches - we can append that to the end.

Putting this all together, our filter looks like this:

```
  const matchingPosts = posts.filter(post => {
    const regex = new RegExp(this.value, 'gi');
    return post.title.match(regex) || post.excerpt.match(regex) || post.tags?.filter(tag => tag.match(regex)).length 
  })
```

* For each post in the posts feed...
* See if either the title, excerpt contains the text input by the user...
* or if the string is contained in one of the tags in the tag array...
* if it does, we will set it to matchingPosts


Note: I added the `?` operator after `tags` because it is possible a post has no tags, and if that's the case, we don't want an error to fire:

The net result of all of this means that if I were to type in `asdfasdf` - then `matchingPosts` is going to be empty, because `posts.filter` cannot find that string in the title, excerpt or in the tags of *any* post - but if were to type in `a` - I would likely get all results back since each post has the letter `a` in a title or excerpt or tag.

## Step 6: Display the results

Now that we have our results, how can we display them so the user can see which posts fit their search criteria?

We can use the <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map" target="_blank">Array Map</a> method to loop over each item in the results array and construct html:


```
const html = matchArray.map(post => {
  return `<a href="${post.url}">${post.title}</a>`;
}).join('');
```

That last `.join('')` is a clever trick: 
* Since Map will return an array ...
* and what we actually want is a string of html to inject onto the page...
* using `.join('')` will quickly convert the array returned from the map into a concatonated string of html.

A nice thing to add is to highlight the results so that we are pointing out just why this search result matches their query.  We already have all the knowledge to do this, we just need to think about the three things we are searching against: Post Titles, Post Excerpts and Post Tags.

For each one of these items, we want to find our search term again and highlight it visually.  But instead of `match`, we want to `replace` the result, so we can surround it with the tag. Forunately, `replace` also accepts a regular expression as a parameter, along with what we want to replace it with as a second parameter:

```
      const regex = new RegExp(this.value, 'gi');
      const title = post.title.replace(regex, `<span class="text-hilight">${this.value}</span>`);
      const excerpt = post.excerpt.replace(regex, `<span class="text-hilight">${this.value}</span>`);
      const tags = post.tags.join(', ').replace(regex, `<span class="text-hilight">${this.value}</span>`);
```

Again, since Tags come out of the API as an array, i'm using `join` to convert it to a comma-separated string before I run the `replace`.

Now we can make our output html a bit more robust with the highlighted text:

```
const html = matchArray.map(post => {
  const regex = new RegExp(this.value, 'gi');
  const title = post.title.replace(regex, `<span class="text-hilight">${this.value}</span>`);
  const excerpt = post.excerpt.replace(regex, `<span class="text-hilight">${this.value}</span>`);
  const tags = post.tags.join(', ').replace(regex, `<span class="text-hilight">${this.value}</span>`);
  return `<a href="${post.url}">
    <strong>${title}</strong>
    <p><small>${excerpt}</small></p>
    <p class="taglist">${tags}</p>
  </a>`;
}).join('');
```

All that's left is to take the joined `html` and render it to the page wherever we want!

In my case, I am appending it to a unordered list. My final code abstracts the matching function into a separate function too, for more clarity, as well as handling empty results.

The final results are below - all and all, not bad for 50 lines of code that should run in any modern browser natively!

```

<script>
  const endpoint = '/api/posts.json';
  const posts = [];
  fetch(endpoint)
    .then(blob => blob.json())
    .then(data => posts.push(...data));
  const searchInput = document.getElementById('search');
  const suggestions = document.querySelector('.suggestions');

  function findMatches(wordToMatch, posts) {
    return posts.filter(post => {
      // here we need to figure out if the post's title, exceerpt or tag matches what was searched
      const regex = new RegExp(wordToMatch, 'gi');
      return post.title.match(regex) || post.excerpt.match(regex) || post.tags?.filter(tag => tag.match(regex)).length
    });
  }
  
  function displayMatches() {
  const matchArray = findMatches(this.value, posts);
  if(this.value.length) {
    const html = matchArray.map(post => {
      const regex = new RegExp(this.value, 'gi');
      const title = post.title.replace(regex, `<span class="text-info">${this.value}</span>`);
      const excerpt = post.excerpt.replace(regex, `<span class="text-info">${this.value}</span>`);
      const tags = post.tags.join(', ').replace(regex, `<span class="text-info">${this.value}</span>`);
      return `
        <li class="list-group">
          <a href="${post.url}">
            <h5 class="title">${title}</h5>
            <span class="excerpt">${excerpt}</span>
            <div class="taglist">Tags: ${tags}</div>
          </a>
        </li>
      `;
    }).join('');
      if(html) {
        suggestions.innerHTML = html;
      } else {
        suggestions.innerHTML = '<li class="list-group">No matches for <span class="text-info">' + this.value + '</span></li>';
      }
    } else {
      suggestions.innerHTML = `<li class="list-group"></li>`;
    }
}
  
  searchInput.addEventListener('change', displayMatches);
  searchInput.addEventListener('keyup', displayMatches);
  
  </script>
  ```

Massive credit due to <a href="https://wesbos.com" target="_blank">Wes Bos</a>, who wrote the lookahead functionality in his excellent <a href="https://javascript30.com/" target="_blank">JavaScript in 30 days course</a>. I used that for the majority of the lookahad functionality here, and modified it slightly to work with my dom structure and the different data source, as well as the tag array.