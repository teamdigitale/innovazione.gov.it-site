import React, { useState, useEffect, useRef } from "react";

export default function JobPositionsWrapper(props) {
  const { jobPositions, existingHTML } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const containerRef = useRef(null);

  const totalPages = Math.ceil(jobPositions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

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
  }, [currentPage, startIndex, endIndex, totalPages]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    
    // Smooth scroll to the container with offset
    if (containerRef.current) {
      const containerTop = containerRef.current.offsetTop;
      const offset = 100; // 100px above the container
      
      window.scrollTo({
        top: containerTop - offset,
        behavior: 'smooth'
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

    // Add page numbers
    for (let i = 1; i <= totalPages; i++) {
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

    // Add next button
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
      <div
        ref={containerRef}
        dangerouslySetInnerHTML={{ __html: existingHTML }}
      />
    </div>
  );
}
