import React, { useEffect, useRef } from "react";
import ReactEcharts from "echarts-for-react";
import { formatTooltip } from "./utils/chartUtils";

function BasicChart({ id, data, setEchartInstance, isMobile = false }) {
  const refCanvas = useRef(null);

  useEffect(() => {
    if (refCanvas.current) {
      const echartInstance = refCanvas.current.getEchartsInstance();
      // const base64DataUrl = echartInstance.getDataURL();
      setEchartInstance(echartInstance);
    }
  }, [refCanvas.current]);

  function getOptions(data) {
    const config = data.config;
    const isLine = data.dataSource?.series[0]?.type === "line" ? true : false;
    const responsive = config.responsive || true;
    let grid = {
      left: isMobile && responsive ? 10 : config.gridLeft || "10%",
      right: config.gridRight || "10%",
      height: config.gridHeight || "auto",
      width: config.gridWidth || "auto",
      bottom: config.gridBottom || 60,
      top: config.gridTop || 60,
    };
    const zoom = config.zoom || "none";
    let dataZoom = [];
    if (zoom !== "none") {
      const x = [
        {
          show: true,
          start: 1,
          end: 100,
          xAxisIndex: [0],
          type: "inside",
        },
        {
          show: true,
          start: 1,
          end: 100,
          xAxisIndex: [0],
          type: "slider",
        },
      ];
      const y = [
        {
          show: true,
          start: 1,
          end: 100,
          yAxisIndex: [0],
          type: "inside",
        },
        {
          show: true,
          start: 1,
          end: 100,
          yAxisIndex: [0],
          type: "slider",
        },
      ];

      if (zoom === "both_axis") {
        dataZoom = [...x, ...y];
      } else if (zoom === "x_axis") {
        dataZoom = [...x];
      } else if (zoom === "y_axis") {
        dataZoom = [...y];
      }
    }

    let dataZoomOpt = ["both_axis", "x_axis", "y_axis"].includes(zoom)
      ? { dataZoom }
      : {};

    let xName = config.xLabel
      ? {
          name: config.xLabel,
          nameLocation: "middle",
          nameGap: 50,
        }
      : {};
    let yName = config.yLabel
      ? {
          name: config.yLabel,
          nameLocation: "middle",
          nameGap: 50,
        }
      : {};

    const axis =
      config.direction === "vertical"
        ? {
            xAxis: {
              ...xName,
              type: "category",
              data: data.dataSource.categories,
              axisTick: { show: false },
              axisLabel: {
                hideOverlap: true,
              },
            },
            yAxis: {
              ...yName,
              nameRotate: 90,
              type: "value",
              axisTick: { show: false },
              axisLabel: {
                show: responsive ? !isMobile : true,
              },
            },
          }
        : {
            yAxis: {
              ...xName,
              nameRotate: 90,
              type: "category",
              data: data.dataSource.categories,
              axisTick: { show: false },
              axisLabel: {
                show: responsive ? !isMobile : true,
              },
            },
            xAxis: {
              ...yName,
              type: "value",
              axisTick: { show: false },
              axisLabel: {
                hideOverlap: true,
              },
            },
          };

    const tooltip = {
      trigger: config.tooltipTrigger || "item",
      confine: true,
      extraCssText: "z-index:1000;max-width:90%;white-space:pre-wrap;",
      textStyle: {
        overflow: "breakAll",
        width: 150,
      },
      axisPointer: {
        type: isLine ? "cross" : "shadow",
      },
      valueFormatter: (value) => {
        return formatTooltip(value, config);
      },
      show: config.tooltip,
    };

    const options = {
      backgroundColor: config.background ? config.background : "#F2F7FC",
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
      ...axis,
      grid,
      series: data.dataSource.series.map((serie) => {
        let rest = {};
        if (serie.type === "bar" && config.stack) {
          let stack = config.stack
            ? config.direction === "vertical"
              ? "x"
              : "y"
            : false;
          rest = {
            ...rest,
            stack,
            itemStyle: { borderColor: "white", borderWidth: 0.25 },
          };
        }

        // if (
        //   serie.type === "bar" &&
        //   isMobile &&
        //   config.direction === "horizontal"
        // ) {
        //   rest = {
        //     ...rest,
        //     label: {
        //       show: true,
        //       formatter: "{b}",
        //       position: "insideLeft",
        //       verticalAlign: "top",
        //     },
        //     barWidth: "20%",
        //     itemStyle: {
        //       borderRadius: [0, 10, 10, 0],
        //     },
        //   };
        // }

        if (serie.type === "line") {
          if (config.smooth) {
            let smooth = config.smooth ? parseFloat(config.smooth) : false;
            rest = { ...rest, smooth };
          }
          if (config.showArea) {
            const area = { areaStyle: {} };
            rest = { ...rest, ...area };
          }
          if (config.showAllSymbol) {
            const symbols = { showAllSymbol: true || "auto" };
            rest = { ...rest, ...symbols };
          }
        }
        return {
          ...serie,
          ...rest,
        };
      }),
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
      ...dataZoomOpt,
    };
    return options;
  }

  if (!data) return <div>...</div>;
  const chartHeight = data.config?.h || "300px";
  return (
    <div key={id} id={"chart_" + id}>
      <ReactEcharts
        id={id}
        option={getOptions(data)}
        ref={refCanvas}
        style={{
          width: "100%",
          height: chartHeight,
          maxWidth: "100%",
        }}
      />
    </div>
  );
}

export default BasicChart;
