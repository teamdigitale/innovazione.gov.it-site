import React, { useRef, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import BasicChart from "./BasicChart";
import PieChart from "./PieChart";
import GeoMapChart from "./GeoMapChart";
import DataTable from "./DataTable";

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
    labelsUpdated,
    istance,
    updated,
  } = props;

  const { config, chart } = data;
  const [echartInstance, setEchartInstance] = useState(null);
  // const [wrapRef, { width, height }] = useElementSize();

  const chartType = chart;
  const csvData = dataToCSV(data.data);

  const dateOptions = { year: "numeric", month: "numeric", day: "numeric" };
  const updatedAt = new Date(updated);
  const formatUpdatedAt = updatedAt.toLocaleDateString("it-IT", dateOptions);

  const infoClean = info.replaceAll("&gt;", ">");

  const defaultHeight =
    chartType === "map" ? "500px" : chartType === "pie" ? "350px" : "300px";

  const sharableSocials = ["facebook", "twitter", "linkedin", "whatsapp"];

  if (window) {
    window.Sharer.init();
  }
  const sharedUrl = window.location.href.replace(window.location.hash, "");

  function LinkRenderer(props) {
    return (
      <a
        href={props.href}
        className="fw-semibold"
        target="_blank"
        aria-label={`${labelsSource || "Fonte dati"}`}
        rel="noreferrer"
      >
        {props.children}
      </a>
    );
  }

  const MarkdownRenderer = ({ children }) => {
    return (
      <ReactMarkdown
        components={{ a: LinkRenderer }}
        remarkPlugins={[remarkGfm]}
      >
        {children}
      </ReactMarkdown>
    );
  };

  const wrapRef = useRef(null);
  const [width, setWidth] = useState(null);
  const isMobile = width && width <= 700;

  function setDimension() {
    setWidth(wrapRef?.current?.clientWidth);
  }

  // useEffect(() => {
  //   if (wrapRef.current && !width) {
  //     setDimension();
  //   }
  // }, [wrapRef.current]);

  useEffect(() => {
    window.addEventListener("resize", setDimension);
    setDimension();
    return () => {
      window.removeEventListener("resize", setDimension);
    };
  }, []);

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
          style={{ height: config.h ? config.h : defaultHeight }}
          id={`tab1-${id}-content-${istance}`}
          role="tabpanel"
        >
          <div
            key={id}
            className="mid-chart"
            style={{ height: config.h ? config.h : defaultHeight }}
            ref={wrapRef}
          >
            {(chartType === "bar" || chartType === "line") && (
              <BasicChart
                id={id}
                data={getBasicValues(data)}
                setEchartInstance={setEchartInstance}
                isMobile={isMobile}
              />
            )}
            {chartType === "pie" && (
              <PieChart
                id={id}
                data={getPieValues(data)}
                setEchartInstance={setEchartInstance}
                isMobile={isMobile}
              />
            )}
            {chartType === "map" && (
              <GeoMapChart
                id={id}
                data={getMapValues(data)}
                setEchartInstance={setEchartInstance}
                isMobile={isMobile}
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
          <DataTable id={id} data={data.data} />
        </div>
        <div
          aria-labelledby={`tab3-${id}-${istance}`}
          className="tab-pane mid-tabs-pane my-4 fade"
          id={`tab3-${id}-content-${istance}`}
          role="tabpanel"
        >
          <div className="mid-tabs-pane-inner">
            {info && <MarkdownRenderer>{infoClean}</MarkdownRenderer>}
            <div className="mt-5 mid-caption">
              {labelsUpdated || "Dati aggiornati al"}{" "}
              <span className="fw-semibold">{formatUpdatedAt}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="d-lg-flex justify-content-lg-between mid-caption ">
        <div className="pt-2 d-flex">
          <span className="fw-semibold text-uppercase me-2">
            {labelsSource || "Fonte dati"}:
          </span>
          {source && <MarkdownRenderer>{source}</MarkdownRenderer>}
        </div>
        <div className="pb-3 d-flex flex-wrap align-items-center">
          <span className="ps-lg-2 pe-3 pe-lg-0 pt-2 pb-lg-0 fw-bold text-primary">
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
          <span className="ps-lg-2 pe-3 pe-lg-0 pt-2 pb-lg-0 fw-bold text-primary">
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
          <span className="ps-lg-2 pt-2 fw-bold text-primary">
            <div className="dropdown">
              <button
                aria-expanded="false"
                aria-haspopup="true"
                className="mid-button-link dropdown-toggle"
                data-bs-toggle="dropdown"
                id="dropdownMenuLink"
                type="button"
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

              <div aria-labelledby="dropdownMenuLink" className="dropdown-menu">
                <div className="link-list-wrapper">
                  <ul className="link-list px-4">
                    {sharableSocials.map((social) => {
                      return (
                        <li key={social}>
                          <button
                            className="mid-button-link text-capitalize text-primary fw-normal social-share"
                            data-width="800"
                            data-height="600"
                            data-sharer={social}
                            data-title={title}
                            data-url={`${sharedUrl}#chart-${id}`}
                          >
                            {social}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </span>
        </div>
      </div>
    </div>
  );
}
