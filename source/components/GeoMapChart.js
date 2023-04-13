import React from "react";
import ReactEcharts from "echarts-for-react";
import { useRef, useEffect, useState } from "react";
import * as echarts from "echarts";
import { formatTooltip } from "./utils/chartUtils";

function GeoMapChart({ data, id, setEchartInstance, isMobile = false }) {
  const refCanvas = useRef(null);
  const [geoData, setGeoData] = useState(null);
  const [weDoNotHaveInstance, setWeDoNotHaveInstance] = useState(true);

  function getOptions(data, geoData) {
    echarts.registerMap(id, geoData);
    const config = data.config;

    const tooltip = {
      trigger: "item",
      valueFormatter: (value) => {
        return formatTooltip(value, config);
      },
      show: config.tooltip ?? true,
    };

    const min = Math.min(...data.dataSource.series[0].data.map((d) => d.value));
    const max = Math.max(...data.dataSource.series[0].data.map((d) => d.value));

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
          label: {
            show: config.showMapLabels ? true : false,
            color: "inherit",
          },
          zoom: 1.2,
          roam: true,
          select: { disabled: true },
          emphasis: {
            label: {
              show: config.showMapLabels,
              color: "inherit",
            },
            itemStyle: {
              areaColor: config.areaColor || "#F2F7FC",
            },
          },
          name: config.serieName || "",
          map: id,
          nameProperty: config.nameProperty ? config.nameProperty : "NAME",
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
        try {
          const response = await fetch(url);
          const raw = await response.json();
          setGeoData(raw);
        } catch (error) {
          console.log(error);
          setGeoData(null);
        }
      }
    }
  }

  useEffect(() => {
    getGeoData();
  }, [data]);

  useEffect(() => {
    if (refCanvas.current && weDoNotHaveInstance) {
      const echartInstance = refCanvas.current.getEchartsInstance();
      setEchartInstance(echartInstance);
      setWeDoNotHaveInstance(false);
    }
  });

  const chartHeight = data.config?.h || "500px";
  const options = data && geoData ? getOptions(data, geoData) : null;
  return (
    <div key={id} id={"chart_" + id}>
      {!data && <div>Caricamento...</div>}
      {!geoData && <div>In attesa dei dati geo...</div>}
      {options && (
        <ReactEcharts
          id={id}
          option={options}
          ref={refCanvas}
          style={{
            width: "100%",
            height: chartHeight,
            maxWidth: "100%",
          }}
        />
      )}
    </div>
  );
}

export default GeoMapChart;
