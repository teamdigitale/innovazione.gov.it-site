import React, { useRef, useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';

function PieChart({ id, config, dataSource, setEchartInstance }) {
  const refCanvas = useRef(null);
  useEffect(() => {
    if (refCanvas.current) {
      try {
        const echartInstance = refCanvas.current.getEchartsInstance();
        // const base64DataUrl = echartInstance.getDataURL();
        if (setEchartInstance) {
          setEchartInstance(echartInstance);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [refCanvas.current]);

  const serie = Array.isArray(dataSource.series)
    ? dataSource.series[0]
    : dataSource.series;
  const options = {
    backgroundColor: config.background ? config.background : '#F2F7FC',

    color: config.colors,
    textStyle: {
      fontFamily: 'Titillium Web, sans-serif',
      fontWeight: 'bold',
      fontSize: 12,
    },
    tooltip: {
      show: config.tooltip,
    },
    legend: {
      left: 'center',
      top: 'bottom',
      show: config.legend,
    },
    title: {
      text: config?.titles?.join('\n') || 'PIE CHART',
      left: 'center',
      top: 'center',
    },
    series: {
      type: 'pie',
      radius: ['50%', '85%'],
      avoidLabelOverlap: false,
      label: {
        show: true,
        position: 'inside',
      },
      labelLine: {
        show: false,
      },
      name: serie.name || '',
      data: serie.data,
    },
  };
  const chartHeight = config.h ? config.h : '500px';
  return (
    <ReactEcharts
      option={options}
      ref={refCanvas}
      style={{
        height: chartHeight,
        width: '100%',
        maxWidth: '100%',
      }}
    />
  );
}

export default PieChart;
