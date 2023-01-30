import React from 'react';
import BasicChart from './BasicChart';
import PieChart from './PieChart';
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

  const csvData = `a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z\n1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26`;

  return (
    <div className="px-4 pt-4 pb-2">
      <h3 className="mid-caption--lead fw-semibold text-black">{title}</h3>
      <p className="mid-caption">{subtitle}</p>
      <ul className="nav nav-tabs lightgrey-bg-a3" id="myTab" role="tablist">
        <li className="nav-item lightgrey-bg-a3" id="dataviz-tabs">
          <a
            aria-controls={`tab1-${id}-content`}
            aria-selected="true"
            className="nav-link active"
            data-bs-toggle="tab"
            href={`#tab1-${id}-content`}
            id={`tab1-${id}`}
            role="tab"
          >
            Grafico
          </a>
        </li>
        <li className="nav-item">
          <a
            aria-controls={`tab2-${id}-content`}
            aria-selected="false"
            className="nav-link"
            data-bs-toggle="tab"
            href={`#tab2-${id}-content`}
            id={`tabtab1-${id}`}
            role="tab"
          >
            Tabella dati
          </a>
        </li>
        <li className="nav-item">
          <a
            aria-controls={`tab3-${id}-content`}
            aria-selected="false"
            className="nav-link"
            data-bs-toggle="tab"
            href={`#tab3-${id}-content`}
            id={`tab3-${id}`}
            role="tab"
          >
            Info
          </a>
        </li>
      </ul>

      <div className="tab-content" id="myTabContent">
        <div
          aria-labelledby={`tab1-${id}`}
          className="tab-pane py-4 fade show active"
          id={`tab1-${id}-content`}
          role="tabpanel"
        >
          <div key={id} className="d-flex justify-content-center">
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
          className="tab-pane py-4 fade"
          id={`tab2-${id}-content`}
          role="tabpanel"
        >
          {/* <table className="table table-hover table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row"></th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th scope="row"></th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table> */}
        </div>
        <div
          aria-labelledby={`tab3-${id}`}
          className="tab-pane py-4 fade"
          id={`tab3-${id}-content`}
          role="tabpanel"
        >
          <div dangerouslySetInnerHTML={{ __html: `${info || ' '}` }} />
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <div className="py-2">
          <span className="fw-semibold text-uppercase">
            {labelsSource || 'Fonte dati'}:
          </span>
          <a
            href="https://padigitale2026.gov.it/"
            className="ms-2 fw-semibold"
            target="_blank"
            aria-label={labelsSource || 'Fonte dati'}
          >
            {source}
          </a>
        </div>
        <div className="py-2 d-flex align-items-center">
          <span className="ps-2 fw-bold text-primary">
            <a
              href="#"
              aria-label={labelsDownload || 'Scarica CSV'}
              onClick={() => downloadCSV(csvData, id)}
            >
              {labelsDownload || 'Scarica'} CSV
            </a>
          </span>
          <span className="ps-2 fw-bold text-primary">
            <a
              href="#"
              aria-label={labelsDownload || 'Scarica PNG'}
              onClick={() => downLoadPng(echartInstance, id)}
            >
              {labelsDownload || 'Scarica'} PNG
            </a>
          </span>
          <span className="ps-2 fw-bold text-primary">
            <a href="#" aria-label={labelsShare || 'Condividi'}>
              {labelsShare || 'Condividi'}
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
