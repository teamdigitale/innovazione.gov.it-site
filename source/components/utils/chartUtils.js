import { saveAs } from 'file-saver';

export async function downLoadPng(echartInstance, name) {
  const dataUrl = echartInstance.getDataURL();
  try {
    const blob = await fetch(dataUrl).then((res) => res.blob());
    saveAs(blob, `${name}.png`);
  } catch (error) {
    console.log('error', error);
  }
}

export async function downloadCSV(data, name) {
  try {
    const blob = new Blob([data], {
      type: 'text/csv;charset=utf-8',
    });
    saveAs(blob, `${name}.csv`);
  } catch (error) {
    console.log('error', error);
  }
}

export function generateCSV(dataSource) {
  const columns = '_,' + dataSource.categories.join(',');
  const rows = dataSource.series.map((serie) => {
    const { name = '', data = [] } = serie;
    return [name, ...data].join(',');
  });
  return [columns, ...rows].join('\n');
}

export function generateCSVPie(serie) {
  console.log('generateCSVPie', serie);
  if (!serie) {
    return null;
  }

  let columns = 'name,value';
  if (typeof serie.data[0] !== 'object') {
    columns = serie.name || '_';
  }

  const rows = serie.data.map((v) => {
    if (typeof v === 'object') {
      return [v.name, v.value].join(',');
    } else {
      return v;
    }
  });

  return [columns, ...rows].join('\n');
}

export function getBarValues(data) {
  return {
    ...data,
    dataSource: {
      categories: data.dataSource.categories,
      series: data.dataSource.series.map((s) => {
        return { ...s, type: 'bar' };
      }),
    },
  };
}

export function getLineValues(data) {
  return {
    ...data,
    dataSource: {
      categories: data.dataSource.categories,
      series: data.dataSource.series.map((s) => {
        return { ...s, type: 'line' };
      }),
    },
  };
}

export function getPieValues(data) {
  return {
    ...data,
    dataSource: {
      categories: [],
      series: {
        type: 'pie',
        radius: ['50%', '85%'],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: 'inside',
        },
        labelLine: {
          show: false,
        },
        data: data.dataSource.series.map((row) => {
          return { name: row.name, value: row.data[0] };
        }),
      },
    },
  };
}

function getFormattedData(payload) {
  const { chart } = payload;
  const formatted =
    chart === 'pie'
      ? getPieValues(payload)
      : chart === 'line'
      ? getLineValues(payload)
      : getBarValues(payload);

  return formatted;
}
