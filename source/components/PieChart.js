import React, { useRef, useEffect } from "react";
import ReactEcharts from "echarts-for-react";
import { formatTooltip } from "./utils/chartUtils";

function PieChart({ id, data, setEchartInstance }) {
  const refCanvas = useRef(null);
  useEffect(() => {
    if (refCanvas.current) {
      try {
        const echartInstance = refCanvas.current.getEchartsInstance();
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
      trigger: "item",
      extraCssText: "z-index:1000;width:250px;",
      valueFormatter: (value) => {
        return formatTooltip(value, config);
      },
      show: config.tooltip,
    };
    let total = "";
    try {
      const serie = dataSource.series;
      let serieData;
      if (typeof serie === "object" && !Array.isArray(serie)) {
        serieData = serie.data;
      } else if (Array.isArray(serie)) {
        serieData = serie[0].data;
      }
      const totale = getTotal(serieData);
      total = formatTooltip(totale, config);
    } catch (error) {}

    let options = {
      backgroundColor: config.background ? config.background : "#F2F7FC",
      title: {
        text: `${config?.totalLabel || "Totale"}\n${total ? total : "0"}`,
        left: "center",
        top: "center",
      },
      color: config.colors || [
        "#5470c6",
        "#91cc75",
        "#fac858",
        "#ee6666",
        "#73c0de",
        "#3ba272",
        "#fc8452",
        "#9a60b4",
        "#ea7ccc",
      ],
      series: {
        ...dataSource.series,
        labelLine: {
          show: config.labeLine,
        },
        label: {
          show: true,
          position: config.labeLine ? "outside" : "inside",
        },
      },
      textStyle: {
        fontFamily: "Titillium Web",
        fontSize: 12,
      },
      tooltip,
      legend: {
        type: "scroll",
        left: "center",
        top: config?.legendPosition || "bottom",
        show: config.legend ?? true,
      },
    };
    return options;
  }

  if (!data) return <div>...</div>;
  const chartHeight = data.config?.h || "350px";
  return (
    <div key={id} id={"chart_" + id}>
      <ReactEcharts
        option={getOptions(data)}
        ref={refCanvas}
        style={{
          height: chartHeight,
          width: "100%",
          maxWidth: "100%",
        }}
      />
    </div>
  );
}

export default PieChart;
