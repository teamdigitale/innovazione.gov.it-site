import React, { useRef, useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';

function PieChart({ id, config, dataSource, setEchartInstance }) {
  const refCanvas = useRef(null);
  useEffect(() => {
    if (refCanvas.current) {
      const echartInstance = refCanvas.current.getEchartsInstance();
      // const base64DataUrl = echartInstance.getDataURL();
      setEchartInstance(echartInstance);
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
    grid: {
      // top: 0,
      // bottom: "50px",
      left: 0,
      right: 0,
    },
    tooltip: {
      show: config.tooltip,
    },
    legend: {
      left: 'center',
      top: 'bottom',
      show: config.legend,
    },
    // toolbox: {
    //   show: config.toolbox,
    //   left: 'right',
    //   top: 'top',
    //   feature: {
    //     // dataView: {},
    //     // restore: {},
    //     saveAsImage: {},
    //   },
    // },
  };
  const chartHeight = config.h ? config.h : '550px'
  return (
    <>
      <ReactEcharts
        option={options}
        ref={refCanvas}
        style={{
          width: '100%',
          height: '550px',
          maxWidth: '100%',
          maxHeight: '550px',
        }}
      />
      {/* <button onClick={() => getImage()}>Download</button> */}
    </>
  );
}

export default PieChart;
