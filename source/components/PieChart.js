import React, { useRef, useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';

function PieChart({ id, data, setEchartInstance }) {
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

  function getTotal(data) {
    return data.reduce((acc, v) => {
      return acc + Number(v.value);
    }, 0);
  }

  function getOptions(data) {
    const { dataSource } = data;
    const config = data.config;

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
      // formatter: (params: any) => {},
    };

    console.log('dataSource', dataSource);
    let total = 0;
    try {
      const serie = dataSource.series;
      let serieData;
      if (typeof serie === 'object' && !Array.isArray(serie)) {
        serieData = serie.data;
      } else if (Array.isArray(serie)) {
        serieData = serie[0].data;
      }
      total = getTotal(serieData);
    } catch (error) {}

    const options = {
      backgroundColor: config.background ? config.background : '#F2F7FC',
      title: {
        text: `${config?.totalLabel || 'Total'}\n${total} ${
          config.valueFormatter || ''
        }`,
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
      tooltip,
      legend: {
        left: 'center',
        top: 'bottom',
        show: config.legend,
      },
    };
    return options;
  }

  if (!data) return <div>...</div>;
  const chartHeight = data.config?.h || '550px';
  return (
    <div key={id} id={'chart_' + id}>
      <ReactEcharts
        option={getOptions(data)}
        ref={refCanvas}
        style={{
          height: chartHeight,
          width: '100%',
          maxWidth: '100%',
        }}
      />
    </div>
  );
}

export default PieChart;
