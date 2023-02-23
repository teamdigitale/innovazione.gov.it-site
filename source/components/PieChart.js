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

  const options = {
    backgroundColor: config.background ? config.background : '#F2F7FC',
    title: {
      text: config?.titles?.join('\n') || 'PIE CHART',
      left: 'center',
      top: 'center',
    },
    color: config.colors,
    series: dataSource.series,
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
  };
  const height = config.h || 550;
  return (
    <ReactEcharts
      option={options}
      ref={refCanvas}
      style={{
        height,
        width: '100%',
        maxWidth: '100%',
      }}
    />
  );
}

export default PieChart;
