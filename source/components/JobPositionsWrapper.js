import React, { useState, useEffect, useRef } from "react";
import JobPosition from "./JobPosition";
import {
  filterJobPositions,
  calculatePagination,
} from "./utils/JobPositionsUtils";

export default function JobPositionsWrapper(props) {
  const { jobPositions = [], existingHTML = "", translations = {} } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [showClosed, setShowClosed] = useState(false);
  const itemsPerPage = 10;
  const containerRef = useRef(null);

  const filteredJobPositions = filterJobPositions(
    jobPositions,
    searchTerm,
    showClosed
  );
  const { totalPages, startIndex, endIndex } = calculatePagination(
    filteredJobPositions.length,
    currentPage,
    itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, showClosed]);

  useEffect(() => {
    if (containerRef.current) {
      const allItems = containerRef.current.querySelectorAll(".col-lg-8");

      allItems.forEach((item, index) => {
        if (index >= startIndex && index < endIndex) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });

      updateExistingPagination();
    }
  }, [currentPage, startIndex, endIndex, totalPages, filteredJobPositions]);

  const handlePageChange = (page) => {
    setCurrentPage(page);

    // Smooth scroll to the container with offset
    if (containerRef.current) {
      const containerTop = containerRef.current.offsetTop;
      const offset = 100;

      window.scrollTo({
        top: containerTop - offset,
        behavior: "smooth",
      });
    }
  };

  const updateExistingPagination = () => {
    if (!containerRef.current) return;

    const paginationNav = containerRef.current.querySelector(
      ".pagination-wrapper"
    );
    if (!paginationNav) return;

    const paginationUl = paginationNav.querySelector(".pagination");
    if (!paginationUl) return;

    paginationUl.innerHTML = "";

    if (currentPage > 1) {
      const prevLi = document.createElement("li");
      prevLi.className = "page-item";

      const prevButton = document.createElement("button");
      prevButton.className = "page-link";
      prevButton.setAttribute("aria-label", "Pagina precedente");
      prevButton.onclick = () => handlePageChange(currentPage - 1);

      prevButton.innerHTML = `
        <svg class="icon icon-primary">
          <use xlink:href="/images/sprite.svg#it-chevron-left"></use>
        </svg>
      `;

      prevLi.appendChild(prevButton);
      paginationUl.appendChild(prevLi);
    }

    const maxVisiblePages = 9;
    let startPage, endPage, dynamicLastPage;

    if (totalPages <= maxVisiblePages) {
      startPage = 1;
      endPage = totalPages;
      dynamicLastPage = null;
    } else {
      const halfVisible = Math.floor(maxVisiblePages / 2);
      
      if (currentPage <= halfVisible) {
        startPage = 1;
        endPage = maxVisiblePages;
        dynamicLastPage = maxVisiblePages + 1;
      } else if (currentPage + halfVisible >= totalPages) {
        startPage = totalPages - maxVisiblePages + 1;
        endPage = totalPages;
        dynamicLastPage = null;
      } else {
        startPage = currentPage - halfVisible;
        endPage = currentPage + halfVisible;
        dynamicLastPage = endPage + 1;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      const pageLi = document.createElement("li");
      pageLi.className = "page-item";

      const pageButton = document.createElement("button");
      pageButton.className = `page-link ${i === currentPage ? "active" : ""}`;
      pageButton.onclick = () => handlePageChange(i);
      if (i === currentPage) {
        pageButton.setAttribute("aria-current", "page");
      }
      pageButton.textContent = i;

      pageLi.appendChild(pageButton);
      paginationUl.appendChild(pageLi);
    }

    if (dynamicLastPage && dynamicLastPage <= totalPages) {
      const ellipsisLi = document.createElement("li");
      ellipsisLi.className = "page-item disabled";
      const ellipsisSpan = document.createElement("span");
      ellipsisSpan.className = "page-link";
      ellipsisSpan.textContent = "...";
      ellipsisLi.appendChild(ellipsisSpan);
      paginationUl.appendChild(ellipsisLi);

      const dynamicLastLi = document.createElement("li");
      dynamicLastLi.className = "page-item";
      const dynamicLastButton = document.createElement("button");
      dynamicLastButton.className = "page-link";
      dynamicLastButton.onclick = () => handlePageChange(dynamicLastPage);
      dynamicLastButton.textContent = dynamicLastPage;
      dynamicLastLi.appendChild(dynamicLastButton);
      paginationUl.appendChild(dynamicLastLi);
    }

    if (currentPage < totalPages) {
      const nextLi = document.createElement("li");
      nextLi.className = "page-item";

      const nextButton = document.createElement("button");
      nextButton.className = "page-link";
      nextButton.setAttribute("aria-label", "Pagina successiva");
      nextButton.onclick = () => handlePageChange(currentPage + 1);

      nextButton.innerHTML = `
        <svg class="icon icon-primary">
          <use xlink:href="/images/sprite.svg#it-chevron-right"></use>
        </svg>
      `;

      nextLi.appendChild(nextButton);
      paginationUl.appendChild(nextLi);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <div className="form-group col-lg-8">
          <input
            type="text"
            className="form-control"
            id="searchInput"
            placeholder={translations.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="form-check form-check-inline d-flex mt-3">
            <div className="toggles">
              <label htmlFor="reactToggle">
                {translations.toggle}
                <input
                  type="checkbox"
                  id="reactToggle"
                  checked={showClosed}
                  onChange={(e) => setShowClosed(e.target.checked)}
                />
                <span className="lever"></span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div ref={containerRef}>
        {filteredJobPositions.length > 0 ? (
          <>
            <div className="row">
              <h2 className="visually-hidden">Lista posizioni lavorative</h2>
              {filteredJobPositions.map((jobPosition, index) => (
                <JobPosition
                  key={jobPosition?.id || index}
                  jobPosition={jobPosition}
                  translations={translations}
                />
              ))}
            </div>
            <div dangerouslySetInnerHTML={{ __html: existingHTML }} />
          </>
        ) : (
          <div className="text-center py-4">
            <p className="text-muted">
              {searchTerm
                ? translations.noResultsFound
                : translations.noPositions}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
