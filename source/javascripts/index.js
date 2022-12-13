import React from 'react';
import ReactDOM from 'react-dom';
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
import * as echarts from 'echarts';

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

// Charts per dataviz
const chartDom = document.getElementById('chart1');
const chartDom2 = document.getElementById('chart2');
const chartDom3 = document.getElementById('chart3');

}

// Bar chart
if (chartDom) {
  var myChart = echarts.init(chartDom);
  const labelOption = {
    show: true,
    // rotate: 90,
    formatter: '{c}  {name|{a}}',
    fontSize: 12,
    rich: {
      name: {},
    },
  };

  const options = {
    textStyle: {
      fontFamily: 'Roboto Mono',
      fontWeight: 'bold',
      fontSize: 13,
    },
    grid: { top: 40, bottom: 60, right: 40, left: 50 },
    yAxis: {
      type: 'category',
      data: ['1.4.5', '1.4.4', '1.2', '1.3.1', '1.4.1', '1.4.3'],
    },
    xAxis: {
      type: 'value',
    },
    series: [
      {
        name: '',
        baseline: 'bottom',
        color: 'white',
        data: [
          { name: '1.4.5 Digitalizzazione degli avvisi pubblici', value: 0 },
          { name: '1.4.4 Adozione identità digitale', value: 0 },
          {
            name: '1.2 Abilitazione e facilitazione migrazione al Cloud',
            value: 0,
          },
          { name: '1.3.1 Piattaforma Digitale Nazionale Dati', value: 0 },
          {
            name: '1.4.1 Esperienza del cittadino nei servizi pubblici',
            value: 0,
          },
          { name: '1.4.3 Adozione PagoPa e AppIo', value: 0 },
        ],
        type: 'bar',
        label: {
          show: true,
          position: 'insideLeft',
          formatter: '{b}',
          offset: [5, 0],
        },
      },
      {
        name: 'stanziati',
        baseline: 'bottom',
        color: '#94c4f5',
        data: [200, 400, 500, 360, 200, 280],
        type: 'bar',
        smooth: true,
        // barWidth: "40%",
        // label: labelOption,
        itemStyle: {
          borderRadius: [0, 10, 10, 0],
        },
      },
      {
        name: 'spesi',
        color: '#0066cc',
        data: [150, 280, 300, 350, 250, 320],
        type: 'bar',
        smooth: true,
        // barWidth: "20%",
        // label: labelOption,
        itemStyle: {
          borderRadius: [0, 10, 10, 0],
        },
      },
    ],
    legend: {
      left: 'center',
      top: 'bottom',
    },
    toolbox: {
      show: true,
      left: 'center',
      top: 'top',
      feature: {
        dataView: {},
        // restore: {},
        saveAsImage: {},
      },
    },
    tooltip: {},
  };
  options && myChart.setOption(options);
}

// Pie chart
if (chartDom2) {
  var myChart = echarts.init(chartDom2);
  //PIE CHART
  const options = {
    color: ['#5c6f82', '#BFDFFF', '#207BD6', '#004D99', '#6AAAEB'],
    textStyle: {
      fontFamily: 'Roboto Mono',
      fontWeight: 'bold',
      fontSize: 10,
    },
    tooltip: {},
    legend: {
      bottom: '5%',
      left: 'center',
    },
    title: {
      text: `Total 47000\n 100%`,
      left: 'center',
      top: 'center',
    },
    toolbox: {
      show: true,
      left: 'center',
      top: '5%',
      feature: {
        dataView: {},
        //restore: {},
        saveAsImage: {},
      },
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: 'inside',
        },
        // emphasis: {
        //   label: {
        //     show: true,
        //     fontSize: "40",
        //     fontWeight: "bold"
        //   }
        // },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' },
        ],
      },
    ],
  };
  options && myChart.setOption(options);
}

if (chartDom3) {
  var myChart = echarts.init(chartDom3);
  //TREE-MAP
  const options = {
    textStyle: {
      fontFamily: 'monospace',
      fontWeight: 'normal',
      fontSize: 12,
    },
    toolbox: {
      show: true,
      left: 'center',
      top: 'top',
      feature: {
        dataView: {},
        restore: {},
        saveAsImage: {},
      },
    },
    series: [
      {
        type: 'treemap',
        roam: false,
        label: {
          show: true,
          formatter: '{b}',
          normal: {
            textStyle: {
              ellipsis: true,
            },
          },
        },
        visualMin: -100,
        visualMax: 100,
        visualDimension: 3,
        data: [
          {
            name: 'Abilitazione cloud',
            value: 34,
            itemStyle: {
              color: '#5c6f82',
            },
          },
          {
            name: 'Adozione PagoPa e AppIo',
            value: 32,
            itemStyle: {
              color: '#BFDFFF',
            },
          },
          {
            name: 'Esperienza cittadino',
            value: 26,
            itemStyle: {
              color: '#207BD6',
            },
          },
          {
            name: 'Adozione identità digitale',
            value: 7,
            itemStyle: {
              color: '#004D99',
            },
            children: [
              {
                name: 'Adozione identità digitalo',
                value: 5,
              },
              {
                name: 'Esperienza cittadino',
                value: 2,
                itemStyle: {
                  color: '#6AAAEB',
                },
              },
            ],
          },
        ],
      },
    ],
    legend: {
      show: false,
      left: 'auto',
      top: 0,
    },
    tooltip: {},
  };
  options && myChart.setOption(options);
}


const chartWrap = document.getElementById('chartWrap');
function ChartSample() {
  return <div>Hello</div>;
}

if (chartWrap) {
  // const { summaryBottomText } = checkoutWrapper.dataset;
  ReactDOM.render(<ChartSample />, chartWrap);
