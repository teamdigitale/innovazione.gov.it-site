import React from 'react';
import BasicChart from './BasicChart';
import PieChart from './PieChart';
import Table from './Table';
import { saveAs } from 'file-saver';

async function downLoadPng(echartInstance, name) {
  const dataUrl = echartInstance.getDataURL();
  try {
    const blob = await fetch(dataUrl).then((res) => res.blob());
    saveAs(blob, `${name}.png`);
  } catch (error) {
    console.log('error', error);
  }
}

async function downloadCSV(data, name) {
  try {
    const blob = new Blob([data], {
      type: 'text/csv;charset=utf-8',
    });
    saveAs(blob, `${name}.csv`);
  } catch (error) {
    console.log('error', error);
  }
}

function generateCSV(dataSource) {
  const columns = '_,' + dataSource.categories.join(',');
  const rows = dataSource.series.map((serie) => {
    const { name = '', data = [] } = serie;
    return [name, ...data].join(',');
  });
  return [columns, ...rows].join('\n');
}

function generateCSVPie(serie) {
  if (!serie) {
    return null;
  }
  const columns = 'name,value';
  const rows = serie.data.map(({ name, value }) => {
    return [name, value].join(',');
  });
  return [columns, ...rows].join('\n');
}

export default function ChartWrapper(props) {
  const {
    id,
    config,
    dataSource,
    title,
    subtitle,
    info,
    source,
    labelsDownload,
    labelsShare,
    labelsSource,
  } = props;

  const [echartInstance, setEchartInstance] = React.useState(null);

  const type = dataSource.series.type
    ? dataSource.series.type
    : dataSource.series[0].type;

  const csvData =
    type === 'pie'
      ? generateCSVPie(dataSource.series)
      : generateCSV(dataSource);

  return (
    <div className="p-2 p-md-4">
      <h3 className="mid-caption--lead fw-semibold text-black">{title}</h3>
      <p className="mid-caption">{subtitle}</p>

      <ul className="nav nav-tabs mid-nav-tabs lightgrey-bg-a3" id="myTab" role="tablist">
        {['Grafico', 'Tabella dati', 'Info'].map((name, i) => (
          <li
            key={`${id}-tab_${i}`}
            className="nav-item lightgrey-bg-a3"
            id="dataviz-tabs"
          >
            <a
              aria-controls={`tab${i + 1}-${id}-content`}
              aria-selected="true"
              className={`nav-link ${i === 0 ? 'active' : ''}`}
              data-bs-toggle="tab"
              href={`#tab${i + 1}-${id}-content`}
              id={`tab${i + 1}-${id}`}
              role="tab"
            >
              {name}
            </a>
          </li>
        ))}
      </ul>

      <div className="tab-content mid-tabs-content" id="myTabContent">
        <div
          aria-labelledby={`tab1-${id}`}
          className="tab-pane mid-tabs-pane py-4 fade show active"
          id={`tab1-${id}-content`}
          role="tabpanel"
        >
          {/* <div key={id} className="d-flex justify-content-center"> */}
          <div key={id} className="mid-chart">
            {type === 'pie' ? (
              <PieChart
                id={id}
                config={config}
                dataSource={dataSource}
                setEchartInstance={setEchartInstance}
              />
            ) : (
              <BasicChart
                id={id}
                config={config}
                dataSource={dataSource}
                setEchartInstance={setEchartInstance}
              />
            )}
          </div>
        </div>
        <div
          aria-labelledby={`tab2-${id}`}
          className="tab-pane mid-tabs-pane py-4 fade"
          id={`tab2-${id}-content`}
          role="tabpanel"
        >
          <Table id={id} ds={dataSource} />
        </div>
        <div
          aria-labelledby={`tab3-${id}`}
          className="tab-pane mid-tabs-pane py-4 fade"
          id={`tab3-${id}-content`}
          role="tabpanel"
        >
          <div dangerouslySetInnerHTML={{ __html: `${info || ' '}` }} />
        </div>
      </div>

      <div className="d-md-flex justify-content-md-between">
        <div className="py-2">
          <span className="fw-semibold text-uppercase">
            {labelsSource || 'Fonte dati'}:
          </span>
          <a
            href={source}
            className="ms-2 fw-semibold"
            target="_blank"
            aria-label={labelsSource || 'Fonte dati'}
          >
            {source}
          </a>
        </div>
        <div className="py-2 d-flex align-items-center">
          <span className="ps-md-2 pe-3 pe-md-0 fw-bold text-primary">
            <a
              className="mid-button-link"
              title={labelsDownload || 'Scarica CSV'}
              aria-label={labelsDownload || 'Scarica CSV'}
              onClick={() => downloadCSV(csvData, id)}
            >
              {labelsDownload || 'Scarica'} CSV
              <svg className="icon icon-sm icon-primary ms-1"
                focusable="false"
                aria-label={`${labelsDownload || 'Scarica'} CSV`}
                role="img"
              >
                <use href="/images/sprite.svg#it-download"></use>
              </svg>
            </a>
          </span>
          <span className="ps-md-2 pe-3 pe-md-0 fw-bold text-primary">
            <button
              className="mid-button-link"
              title={labelsDownload || 'Scarica PNG'}
              aria-label={labelsDownload || 'Scarica PNG'}
              onClick={() => downLoadPng(echartInstance, id)}
            >
              {labelsDownload || 'Scarica'} PNG
              <svg className="icon icon-sm icon-primary ms-1"
                focusable="false"
                aria-label={`${labelsDownload || 'Scarica'} PNG`}
                role="img"
              >
                <use href="/images/sprite.svg#it-download"></use>
              </svg>
            </button>
          </span>
          <span className="ps-md-2 fw-bold text-primary">
            <button
              className="mid-button-link"
              title={labelsShare || 'Condividi'}
              aria-label={labelsShare || 'Condividi'}
            >
              {labelsShare || 'Condividi'}
              <svg className="icon icon-sm icon-primary ms-1"
                focusable="false"
                aria-label={labelsShare || 'Condividi'}
                role="img"
              >
                <use href="/images/sprite.svg#it-share"></use>
              </svg>
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}
