import React from "react";
import { generatePagePath } from "./utils/JobPositionsUtils";

export default function JobPosition({ jobPosition = {}, translations = {} }) {
  const statusText = jobPosition?.announcement_status?.name === "APERTO" ? "APERTA" : "CHIUSA";
  const statusClass = jobPosition?.announcement_status?.name === "APERTO" ? "text-open" : "text-closed";

  return (
    <div className="col-lg-8">
      <div className="d-lg-flex mb-lg-4">
        <div className="card mb-2 m-lg-0 p-lg-0">
          <div className="card-body px-0 py-2 p-lg-0 m-lg-0 lightgrey-bg-a3 rounded">
            <div className="col-12 ps-4 pt-4 pe-4 pb-2">
              <div className="category pb-2 card-text">
                <div className="d-flex justify-content-between">
                  <div className="pe-2 text-uppercase fw-semibold">{translations.workPosition}</div>
                  <div>
                    <div>
                      <div className="d-none d-md-inline-block pe-2">{translations.searchState}</div>
                      <span className={`fw-bold ${statusClass}`}>{statusText}</span>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="h5 fw-semibold">
                <a href={generatePagePath(jobPosition)} className="text-primary text-decoration-none">
                  {jobPosition?.title}
                </a>
              </h3>
              <p className="mid-caption--large pb-0 mb-0 text-secondary">
                {jobPosition?.subtitle}
              </p>
              <div className="py-3 pt-md-3">
                <a href={generatePagePath(jobPosition)} className="text-primary text-uppercase mid-caption fw-bold text-decoration-none">
                  <div className="d-flex align-items-center">
                    {translations.discover}
                    <span>
                      <svg className="icon icon-sm icon-primary ms-2">
                        <use xlinkHref="/images/sprite-b5182491.svg#it-arrow-right"></use>
                      </svg>
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 