import React from "react";
import BasicChart from "./BasicChart";
import PieChart from "./PieChart";
import GeoMapChart from "./GeoMapChart";
// import Table from "./Table";
import DataTable from "./DataTable";
import { log } from "./utils/chartUtils";

import {
  dataToCSV,
  downLoadPng,
  downloadCSV,
  getPieValues,
  getBasicValues,
  getMapValues,
} from "./utils/chartUtils";

export default function ChartWrapper(props) {
  const {
    id,
    data,
    title,
    subtitle,
    info,
    source,
    labelsDownload,
    labelsShare,
    labelsSource,
    istance,
  } = props;

  const { config, chart } = data;
  const [echartInstance, setEchartInstance] = React.useState(null);

  const chartType = chart;
  const csvData = dataToCSV(data.data);

  return (
    <div className="px-3 pt-3 px-md-4 pt-md-4">
      <h3 className="mid-caption--lead fw-semibold text-black">{title}</h3>
      <p className="mid-caption">{subtitle}</p>
      <ul
        className="nav nav-tabs mid-nav-tabs lightgrey-bg-a3"
        id="myTab"
        role="tablist"
      >
        {["Grafico", "Tabella dati", "Info"].map((name, i) => (
          <li
            key={`${id}-tab_${i}-${istance}`}
            className="nav-item lightgrey-bg-a3"
            id="dataviz-tabs"
          >
            <a
              aria-controls={`tab${i + 1}-${id}-content-${istance}`}
              aria-selected="true"
              className={`nav-link ${i === 0 ? "active" : ""}`}
              data-bs-toggle="tab"
              href={`#tab${i + 1}-${id}-content-${istance}`}
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
          aria-labelledby={`tab1-${id}-${istance}`}
          className="tab-pane mid-tabs-pane my-4 fade show active"
          style={{ height: config.h ? config.h : "500px" }}
          id={`tab1-${id}-content-${istance}`}
          role="tabpanel"
        >
          {/* <div key={id} className="d-flex justify-content-center"> */}
          <div
            key={id}
            className="mid-chart"
            style={{ height: config.h ? config.h : "500px" }}
          >
            {(chartType === "bar" || chartType === "line") && (
              <BasicChart
                id={id}
                data={getBasicValues(data)}
                setEchartInstance={setEchartInstance}
              />
            )}
            {chartType === "pie" && (
              <PieChart
                id={id}
                data={getPieValues(data)}
                setEchartInstance={setEchartInstance}
              />
            )}
            {chartType === "map" && (
              <GeoMapChart
                id={id}
                data={getMapValues(data)}
                setEchartInstance={setEchartInstance}
              />
            )}
          </div>
        </div>
        <div
          aria-labelledby={`tab2-${id}-${istance}`}
          className="tab-pane mid-tabs-pane my-4 fade"
          id={`tab2-${id}-content-${istance}`}
          role="tabpanel"
        >
          {/* <Table id={id} ds={dataSource} /> */}
          <DataTable id={id} data={data.data} />
        </div>
        <div
          aria-labelledby={`tab3-${id}-${istance}`}
          className="tab-pane mid-tabs-pane my-4 fade"
          id={`tab3-${id}-content-${istance}`}
          role="tabpanel"
        >
          <div dangerouslySetInnerHTML={{ __html: `${info || " "}` }} />
        </div>
      </div>
      <div className="d-md-flex justify-content-md-between">
        <div className="pt-3">
          <span className="fw-semibold text-uppercase">
            {labelsSource || "Fonte dati"}:
          </span>
          <a
            href={source}
            className="ms-2 fw-semibold"
            target="_blank"
            aria-label={labelsSource || "Fonte dati"}
          >
            {source}
          </a>
        </div>
        <div className="pb-3 d-flex flex-wrap align-items-center">
          <span className="ps-md-2 pe-3 pe-md-0 pt-3 pb-md-0 fw-bold text-primary">
            <a
              className="mid-button-link"
              title={labelsDownload || "Scarica CSV"}
              aria-label={labelsDownload || "Scarica CSV"}
              onClick={() => downloadCSV(csvData, id)}
            >
              {labelsDownload || "Scarica"} CSV
              <svg
                className="icon icon-sm icon-primary ms-1"
                focusable="false"
                aria-label={`${labelsDownload || "Scarica"} CSV`}
                role="img"
              >
                <use href="/images/sprite.svg#it-download"></use>
              </svg>
            </a>
          </span>
          <span className="ps-md-2 pe-3 pe-md-0 pt-3 pb-md-0 fw-bold text-primary">
            <button
              className="mid-button-link"
              title={labelsDownload || "Scarica PNG"}
              aria-label={labelsDownload || "Scarica PNG"}
              onClick={() => downLoadPng(echartInstance, id)}
            >
              {labelsDownload || "Scarica"} PNG
              <svg
                className="icon icon-sm icon-primary ms-1"
                focusable="false"
                aria-label={`${labelsDownload || "Scarica"} PNG`}
                role="img"
              >
                <use href="/images/sprite.svg#it-download"></use>
              </svg>
            </button>
          </span>
          <span className="ps-md-2 pt-3 fw-bold text-primary">
            <button
              className="mid-button-link"
              title={labelsShare || "Condividi"}
              aria-label={labelsShare || "Condividi"}
            >
              {labelsShare || "Condividi"}
              <svg
                className="icon icon-sm icon-primary ms-1"
                focusable="false"
                aria-label={labelsShare || "Condividi"}
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
