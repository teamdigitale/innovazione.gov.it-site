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
      fontWeight: '600',
      fontSize: 14,
    },
    tooltip: {
      show: config.tooltip,
    },
    legend: {
      left: 'center',
      top: 'top',
      show: config.legend,
    },
    toolbox: {
      show: config.toolbox,
      left: 'right',
      top: 'top',
      feature: {
        // dataView: {},
        // restore: {},
        saveAsImage: {},
      },
    },
  };
  return (
    <>
      <ReactEcharts
        option={options}
        ref={refCanvas}
        style={{
          width: config.w,
          height: config.h,
          maxWidth: '100%',
        }}
      />
      {/* <button onClick={() => getImage()}>Download</button> */}
    </>
  );
}

export default PieChart;
