---
layout: default
title: Blog | Jordan Waxman
description: Notes on AI, automation, and operations.
---

<div class="page-content">
  <div class="container">
    <h1>Blog</h1>
    <p>Notes on AI, automation, and operations.</p>

    {% if site.posts.size == 0 %}
      <p class="blog-empty">Updates land on my <a href="https://linkedin.com/in/waxmanjordan" target="_blank" rel="noopener">LinkedIn</a> first.</p>
    {% else %}
      <ul class="blog-list">
        {% for post in site.posts %}
          <li class="blog-item">
            <p class="blog-item-date">{{ post.date | date: "%B %-d, %Y" }}</p>
            <a class="blog-item-title" href="{{ post.url }}">{{ post.title }}</a>
            {% if post.excerpt %}
            <p class="blog-item-excerpt">{{ post.excerpt | strip_html | truncate: 160 }}</p>
            {% endif %}
          </li>
        {% endfor %}
      </ul>
    {% endif %}
  </div>
</div>
