---
layout: page
title: Lavora con noi
description:
lang: it
ref: lavora-con-noi
order: 13
child_of_ref: reclutamento-del-personale
redirect_from:
  - /lavora-con-noi
  - /it/lavora-con-noi
layout_wide: true
---

{% include lavora-con-noi.html %}

## Posizioni aperte
{: .mt-4}

{% assign jobs_pages = site.pages | where: "lang", page.lang | where: "layout", "page-job" | where_exp: "item", "item.hidden == nil" | sort: "title" %}
{% assign open_jobs_pages = jobs_pages | where_exp: "item", "item.archived == nil" %}
{% assign closed_jobs_pages = jobs_pages | where: "archived", true %}

{% if open_jobs_pages.size == 0 %}
In questo momento non ci sono posizioni aperte.
{% else %}

<div class="jobpositions">
{% for one_page in open_jobs_pages %}
    <hr>
    <div>
    <a href="{{ one_page.url }}" title="{{ one_page.title }}"><span class="font-weight-bold">{{ one_page.title }}</span></a>
    {% if one_page.is_new %}
        <span class="small">&nbsp;Nuova posizione</span>
    {% endif %}
    </div>
{% endfor %}
</div>
{% endif %}

{% if closed_jobs_pages.size > 0 %}
## Posizioni chiuse
{: .mt-4}

<a class="btn btn-primary btn-sm" role="button" data-toggle="collapse" href="#jobsarchive" aria-expanded="false"
  aria-controls="jobsarchive" id="jobsarchive-collapse">
  <span class="seeall">{{ site.data.t.collapse-btn-show[page.lang] }}</span>
  <span class="hideall">{{ site.data.t.collapse-btn-hide[page.lang] }}</span>
</a>
<div class="jobpositions archived collapse" id="jobsarchive">
  {% for one_page in closed_jobs_pages %}
  <div>
    <a href="{{ one_page.url }}" title="{{ one_page.title }}"><span class="font-weight-bold">{{ one_page.title }}</span></a>
    <span class="small">&nbsp;Posizione chiusa</span>
  </div>
  <hr>
  {% endfor %}
</div>
{% endif %}

## Esito Selezioni
{: .mt-4}

<a class="btn btn-primary btn-sm" href="http://presidenza.governo.it/AmministrazioneTrasparente/BandiConcorso/index.html" target="_blank">
  <span class="seeall">{{ site.data.t.collapse-btn-show[page.lang] }}</span>
</a>
