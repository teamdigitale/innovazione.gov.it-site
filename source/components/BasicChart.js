import React, { useEffect, useRef } from 'react';
import ReactEcharts from 'echarts-for-react';

function BasicChart({ id, data, setEchartInstance }) {
  const refCanvas = useRef(null);
  // useEffect(() => {
  //   console.log('MOUNT');
  //   return () => {
  //     console.log('UNMOUNT');
  //   };
  // }, []);

  useEffect(() => {
    if (refCanvas.current) {
      const echartInstance = refCanvas.current.getEchartsInstance();
      // const base64DataUrl = echartInstance.getDataURL();
      setEchartInstance(echartInstance);
    }
  }, [refCanvas.current]);

  function getOptions(data) {
    const config = data.config;
    const zoom = config.zoom;
    let dataZoom = [];
    if (zoom !== 'none') {
      const x = [
        {
          show: true,
          start: 1,
          end: 100,
          xAxisIndex: [0],
          type: 'inside',
        },
        {
          show: true,
          start: 1,
          end: 100,
          yAxisIndex: [0],
          type: 'inside',
        },
      ];
      const y = [
        {
          show: true,
          start: 1,
          end: 100,
          xAxisIndex: [0],
          type: 'slider',
        },
        {
          show: true,
          start: 1,
          end: 100,
          yAxisIndex: [0],
          type: 'slider',
        },
      ];

      if (zoom === 'both_axis') {
        dataZoom = [...x, ...y];
      } else if (zoom === 'x_axis') {
        dataZoom = [...x];
      } else if (zoom === 'y_axis') {
        dataZoom = [...y];
      }
    }

    let xName = config.xLabel
      ? {
          name: config.xLabel,
          nameLocation: 'middle',
          nameGap: 30,
        }
      : {};
    let yName = config.yLabel
      ? {
          name: config.yLabel,
          nameLocation: 'middle',
          nameGap: 30,
        }
      : {};

    const axis =
      config.direction === 'vertical'
        ? {
            xAxis: {
              ...xName,
              type: 'category',
              data: data.dataSource.categories,
              alignTicks: true,
              // axisLabel: {
              //   rotate: 30,
              //   inside: false,
              //   // margin: 8,
              // },
            },
            yAxis: {
              ...yName,
              nameRotate: 90,
              type: 'value',
              alignTicks: true,
            },
          }
        : {
            yAxis: {
              ...xName,
              nameRotate: 90,
              type: 'category',
              data: data.dataSource.categories,
              alignTicks: true,
            },
            xAxis: {
              ...yName,
              type: 'value',
              alignTicks: true,
              // axisLabel: {
              //   rotate: 90,
              //   inside: true,
              //   margin: 0,
              // },
            },
          };

    const tooltip = {
      trigger: config.tooltipTrigger || 'item',
      axisPointer: {
        type: config.axisPointer,
      },
      valueFormatter: (value) => {
        const formatter = config.tooltipFormatter;
        const valueFormatter = config.valueFormatter;
        let valueFormatted = value;
        if (formatter) {
          if (formatter === 'percentage') {
            valueFormatted = `${value}%`;
          } else if (formatter === 'currency') {
            valueFormatted = new Intl.NumberFormat('it-IT', {
              style: 'currency',
              currency: 'EUR',
            }).format(value);
          } else if (formatter === 'number') {
            valueFormatted = new Intl.NumberFormat('it-IT', {
              style: 'decimal',
            }).format(value);
          }
        }
        return `${valueFormatted} ${valueFormatter ? valueFormatter : ''}`;
      },
      show: config.tooltip,
      // formatter: (params) => {},
    };

    const options = {
      backgroundColor: config.background ? config.background : '#F2F7FC',
      color: config.colors,
      ...axis,
      series: data.dataSource.series.map((serie) => {
        let rest = { stack: false, smooth: false };
        if (config.stack) {
          let stack = config.stack
            ? config.direction === 'vertical'
              ? 'x'
              : 'y'
            : false;
          rest = { ...rest, stack };
        }
        if (serie.type === 'line' && config.smooth) {
          let smooth = config.smooth ? parseFloat(config.smooth) : false;
          rest = { ...rest, smooth };
        }

        // console.log('rest', rest);
        return {
          ...serie,
          ...rest,
        };
      }),
      textStyle: {
        fontFamily: 'Titillium Web, sans-serif',
        fontWeight: 'semibold',
        fontSize: 12,
      },
      tooltip,
      legend: {
        left: 'center',
        top: 'tbottomp',
        show: config.legend,
      },
      dataZoom,
    };
    return options;
  }

  if (!data) return <div>...</div>;
  const chartHeight = data.config?.h || '550px';
  return (
    <div key={id} id={'chart_' + id}>
      <ReactEcharts
        id={id}
        option={getOptions(data)}
        ref={refCanvas}
        style={{
          width: '100%',
          height: chartHeight,
          maxWidth: '100%',
        }}
      />
    </div>
  );
}

export default BasicChart;
