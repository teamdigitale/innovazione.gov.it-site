import React from 'react';
import ReactEcharts from 'echarts-for-react';


function PieChart({ id, config, dataSource }) {
    const options = {
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
      <ReactEcharts
        option={options}
        style={{
          width: config.w,
          height: config.h,
          maxWidth: '100%',
        }}
      />
    );
  }

  export default PieChart;

