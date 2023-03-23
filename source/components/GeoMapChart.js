import React from "react";
import ReactEcharts from "echarts-for-react";
import { useRef, useEffect, useState } from "react";
import * as echarts from "echarts";
import { formatTooltip, log } from "./utils/chartUtils";

function GeoMapChart({ data, id, setEchartInstance }) {
  const [geoData, setGeoData] = useState(null);
  const refCanvas = useRef();

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

  function getOptions(data, geoData) {
    echarts.registerMap(id, geoData);
    const config = data.config;

    const tooltip = {
      trigger: "item",
      valueFormatter: (value) => {
        return formatTooltip(value, config);
      },
      show: config.tooltip,
      // formatter: (params) => {},
    };

    const min = Math.min(...data.dataSource.series[0].data.map((d) => d.value));
    const max = Math.max(...data.dataSource.series[0].data.map((d) => d.value));

    console.log("min", min);
    console.log("max", max);
    const options = {
      backgroundColor: config.background ? config.background : "#F2F7FC",
      color: config.colors,
      textStyle: {
        fontFamily: "Titillium Web, sans-serif",
        fontSize: 12,
      },
      tooltip,
      visualMap: {
        left: "right",
        min,
        max,
        text: ["Max", "Min"],
        calculable: true,
        inRange: {
          color: config.colors,
        },
        show: config.visualMap || false,
      },
      series: data.dataSource.series.map((serie) => {
        return {
          ...serie,
          roam: true,
          emphasis: {
            itemStyle: {
              areaColor: "#F2F7FC",
            },
          },
          name: config.serieName || "",
          map: id,
          nameProperty: config.nameProperty ? config.nameProperty : "NAME",
          // data: serie.data,
        };
      }),
    };
    return options;
  }

  async function getGeoData() {
    if (data) {
      const config = data.config;
      const url = config?.geoJsonUrl || "";
      if (url) {
        const response = await fetch(url);
        console.log("response", response.status);
        const raw = await response.json();
        setGeoData(raw);
      }
    }
  }

  useEffect(() => {
    getGeoData();
  }, [data]);

  if (!data) return <div>Caricamento...</div>;
  if (!geoData) return <div>In attesa dei dati geo...</div>;

  const config = data.config || null;
  const chartHeight = data.config?.h || "500px";

  return (
    <div key={id} id={"chart_" + id}>
      <ReactEcharts
        option={getOptions(data, geoData)}
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

export default GeoMapChart;
