import React from 'react';
import ReactEcharts from 'echarts-for-react';

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

export default function SampleChart(chartId, data, dataUrl, dataChart) {
  const {id} = chartId
  console.log('id', id)
  //fetch
  return (
    <>
      <ReactEcharts id={id} option={options} style={{ width: '100%', height: 300 }} />
    </>
  );
}
