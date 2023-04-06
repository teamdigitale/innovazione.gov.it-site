import { saveAs } from "file-saver";

export function log(...args) {
  console.log(args);
}

export async function downLoadPng(echartInstance, name) {
  if (!echartInstance) return;
  const dataUrl = echartInstance.getDataURL();
  try {
    const blob = await fetch(dataUrl).then((res) => res.blob());
    saveAs(blob, `${name}.png`);
  } catch (error) {
    console.log("error", error);
  }
}

export async function downloadCSV(data, name) {
  try {
    const blob = new Blob([data], {
      type: "text/csv;charset=utf-8",
    });
    saveAs(blob, `${name}.csv`);
  } catch (error) {
    console.log("error", error);
  }
}

export function generateCSV(dataSource) {
  const columns = "_," + dataSource.categories.join(",");
  const rows = dataSource.series.map((serie) => {
    const { name = "", data = [] } = serie;
    return [name, ...data].join(",");
  });
  return [columns, ...rows].join("\n");
}

export function dataToCSV(data) {
  const rows = data.map((r) => {
    return r.join(",");
  });
  return rows.join("\n");
}

export function generateCSVPie(serie) {
  console.log("generateCSVPie", serie);
  if (!serie) {
    return null;
  }

  let columns = "name,value";
  if (typeof serie.data[0] !== "object") {
    columns = serie.name || "_";
  }

  const rows = serie.data.map((v) => {
    if (typeof v === "object") {
      return [v.name, v.value].join(",");
    } else {
      return v;
    }
  });

  return [columns, ...rows].join("\n");
}

// function to get values for basic charts
export function getBasicValues({ config, data, chart }) {
  const categories = data[0].slice(1) || [];
  const series = data.slice(1).map((row) => {
    const [name, ...data] = row;
    return {
      type: chart,
      name,
      data,
    };
  });
  return {
    config,
    data,
    chart,
    dataSource: {
      categories,
      series: series.map((s) => {
        return { ...s, type: chart };
      }),
    },
  };
}

// function to get values for pie charts
export function getPieValues({ config, data, chart }) {
  const series = data.slice(1).map((row) => {
    const [name, ...data] = row;
    return {
      type: chart,
      name,
      data,
    };
  });
  return {
    config,
    data,
    chart,
    dataSource: {
      categories: [],
      series: {
        type: "pie",
        radius: ["45%", "75%"],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: "inside",
        },
        labelLine: {
          show: false,
        },
        data: series.map((row) => {
          return {
            name: row.name,
            value: row.data[0],
            itemStyle: { borderColor: "white", borderWidth: 1 },
          };
        }),
      },
    },
  };
}

// function to get values for map charts
export function getMapValues({ config, data, chart }) {
  const objectData = data.slice(1).map((row) => {
    return {
      name: row[0],
      value: row[1],
    };
  });
  return {
    config,
    data,
    chart,
    dataSource: {
      categories: [],
      series: [
        {
          type: "map",
          data: objectData,
        },
      ],
    },
  };
}

export function formatTooltip(value, config) {
  const formatter = config.tooltipFormatter;
  const valueFormatter = config.valueFormatter;
  let valueFormatted = value;
  if (formatter) {
    if (formatter === "percentage") {
      valueFormatted = `${value}%`;
    } else if (formatter === "currency") {
      valueFormatted = new Intl.NumberFormat("it-IT", {
        style: "currency",
        currency: "EUR",
      }).format(value);
    } else if (formatter === "number") {
      valueFormatted = new Intl.NumberFormat("it-IT", {
        style: "decimal",
      }).format(value);
    }
  }
  return `${valueFormatted} ${valueFormatter ? valueFormatter : ""}\n`;
}
