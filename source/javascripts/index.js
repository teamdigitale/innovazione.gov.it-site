import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/js/bootstrap';
//import CarouselBI from "bootstrap-italia/src/js/plugins/carousel-bi";
import CarouselBI from './carousel';
import CarouselCalendar from './carousel-custom-calendar';
import NavBarCollapsible from 'bootstrap-italia/src/js/plugins/navbar-collapsible';
import Sticky from 'bootstrap-italia/src/js/plugins/sticky';
import 'calendar-dropdown.js';
import 'sticky-header-custom.js';
import 'lazysizes';
import 'lazysizes/plugins/respimg/ls.respimg';
import 'focus-visible/src/focus-visible.js';
import Sharer from 'sharer.js/sharer.js';
import ChartWrapper from '../components/ChartWrapper';
import JobPositionsWrapper from '../components/JobPositionsWrapper';

import VideoPlayer from 'bootstrap-italia/src/js/plugins/videoplayer';
import AcceptOverlay from 'bootstrap-italia/src/js/plugins/accept-overlay';
import { cookies } from 'bootstrap-italia/src/js/plugins/util/cookies';
import NavScroll from 'bootstrap-italia/src/js/plugins/navscroll';

const progressIndicator = require('progress-indicator.js');
const DatoCmsSearch = require('datocms-search.widget.js');
const searchClient = new DatoCmsSearch(
  '7bc02ea800b5526cd655912c1b6cfa',
  'production'
);

const initSearch = () => {
  if (searchClient === null) {
    return null;
  }
  const lang = document.documentElement.lang;
  return searchClient.addWidget('#search-container', {
    initialLocale: document.documentElement.lang,
    initialQuery: '',
  });
};

initSearch();
progressIndicator.updateProgress();
window.onscroll = function () {
  progressIndicator.updateProgress();
};

// initiate navscroll
document.addEventListener('DOMContentLoaded', () => {
  document
    .querySelectorAll('nav.it-navscroll-wrapper[data-bs-navscroll]')
    .forEach((el) => {
      const navscroll = new NavScroll(el, {
        scrollspy: true,
        scrollspyOptions: {
          offset: 100
        }
      });
    });
});

// initiate navbar
const navbarcollapsible = new NavBarCollapsible(
  document.getElementById('nav02')
);

// initiate sticky header
const stickyHeaders = document.getElementsByClassName('it-header-sticky');
for (let index = 0; index < stickyHeaders.length; index++) {
  const header = stickyHeaders[index];
  const stickyInstances = [];
  stickyInstances[index] = new Sticky(header);
}

// Hide nav links after a click in mobile view of navscroll
const navscrollLinks = document.querySelectorAll('a.navscroll_link');
for (let index = 0; index < navscrollLinks.length; index++) {
  const element = navscrollLinks[index];
  element.addEventListener('click', function () {
    document.getElementById('accordion-button').classList.add('collapsed');
    document.getElementById('accordion-aside').classList.remove('show');
  });
}

// initiate carousel
const carouselList = document.querySelectorAll('[data-bs-carousel-splide]');
for (let index = 0; index < carouselList.length; index++) {
  const carousel = carouselList[index];
  const carouselInstances = [];
  carouselInstances[index] = new CarouselBI(carousel);
}

// initiate custom calendar carousels
const carouselCalendarList = document.querySelectorAll(
  '[data-calendar-splide]'
);
for (let index = 0; index < carouselCalendarList.length; index++) {
  const carousel = carouselCalendarList[index];
  const carouselInstances = [];
  carouselInstances[index] = new CarouselCalendar(carousel);
}

// setup yt videos
const YT_SERVICE = 'youtube.com';
const loadYouTubeVideo = (videoId) => {
  const videoEl = document.getElementById(videoId);
  const url = videoEl.dataset.url;
  const video = VideoPlayer.getOrCreateInstance(videoEl);
  video.setYouTubeVideo(url);
};

const manageVideo = (overlay) => {
  const videoLoadButton = overlay.querySelector('button');
  const videoId = videoLoadButton.dataset.videoid;
  if (cookies.isChoiceRemembered(YT_SERVICE)) {
    loadYouTubeVideo(videoId);
    const overlayAccept = new AcceptOverlay(overlay, {
      service: YT_SERVICE,
    });
    overlayAccept.hide();
  } else {
    videoLoadButton.addEventListener('click', () => {
      const checkbox = overlay.querySelector('input');
      if (checkbox.checked) {
        cookies.rememberChoice(YT_SERVICE, true);
      }
      loadYouTubeVideo(videoId);
      const overlayAccept = new AcceptOverlay(overlay, {
        service: YT_SERVICE,
      });
      overlayAccept.hide();
    });
  }
};

const overlay = document.querySelector('[data-bs-accept-overlay]');
if (overlay) {
  manageVideo(overlay);
}

//setup charts
const chartWrap = document.getElementsByClassName('chartWrap');
if (chartWrap) {
  for (let i = 0; i < chartWrap.length; i++) {
    try {
      const chartTemplate =
        chartWrap[i].parentNode.getElementsByTagName('template')[0].innerHTML;
      const infoTemplate =
        chartWrap[i].parentNode.getElementsByClassName('info')[0].innerHTML;
      const domNode = chartWrap[i];
      const chartData = JSON.parse(chartTemplate);
      const data = JSON.parse(chartData); //double parse ?
      const infoData = JSON.parse(infoTemplate);
      const info = JSON.parse(infoData); //double parse ?
      const root = createRoot(domNode);
      root.render(
        <ChartWrapper
          id={domNode.id}
          data={data}
          info={info}
          {...domNode.dataset}
        />
      );
    } catch (error) {
      console.log('error', error);
    }
  }
}

// setup job positions
const jobPositionsWrapper = document.getElementsByClassName('jobPositionsWrapper');
if (jobPositionsWrapper) {
  for (let i = 0; i < jobPositionsWrapper.length; i++) {
    const wrapper = jobPositionsWrapper[i];
    console.log('wrapper', wrapper.dataset.jobPositions);
    const jobPositionData = JSON.parse(wrapper.dataset.jobPositions);
    console.log('jobPositionData', jobPositionData);
    
    const translationsData = JSON.parse(wrapper.dataset.translations);
    console.log('translationsData', translationsData);
    
    const paginationElement = wrapper.querySelector('.pagination-wrapper');
    const existingHTML = paginationElement ? paginationElement.outerHTML : '';
    console.log('existingHTML (pagination only)', existingHTML);
    
    // Store original HTML for static rendering
    const originalHTML = wrapper.innerHTML;
    
    // setup toggle functionality
    const toggle = document.getElementById('reactToggle');
    if (toggle) {
      toggle.addEventListener('change', function() {
        if (this.checked) {
          const root = createRoot(wrapper);
          root.render(
            <JobPositionsWrapper 
              jobPositions={jobPositionData} 
              existingHTML={existingHTML}
              translations={translationsData}
            />
          );
        } else {
          wrapper.innerHTML = originalHTML;
        }
      });
    }
  }
}

const hookDiv = document.getElementById('cookies-management');
function CookieManager({ onRevoke }) {
  return (
    <div>
      <span>YouTube per la visualizzazione di video</span>
      <button
        type="button"
        className="btn btn-outline-primary ms-5"
        onClick={() => onRevoke()}
      >
        Revoca consenso
      </button>
    </div>
  );
}

if (hookDiv) {
  const hasYtCookies = cookies.isChoiceRemembered(YT_SERVICE);
  let content = 'Non hai installato cookie di terze parti.';
  const root = createRoot(hookDiv);
  if (hasYtCookies) {
    content = (
      <CookieManager
        services={[YT_SERVICE]}
        onRevoke={() => {
          cookies.clearAllRememberedChoices();
          window.location.reload();
        }}
      />
    );
  }
  root.render(content);
}
