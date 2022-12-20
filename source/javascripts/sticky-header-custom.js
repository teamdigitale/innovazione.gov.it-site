/**
 * sticky-header js lib
 * @ Fabio Fumis
 */
(function () {
  const elSticky = document.querySelector(".it-header-sticky");

  if (!!elSticky) {
    function isHidden(el) {
      let hidden = false;
      if (el) {
        const style = window.getComputedStyle(el);
        hidden = style.display === "none" || style.visibility === "hidden";
      }
      return hidden;
    }

    const elToggler = document.querySelector(".custom-navbar-toggler");
    const isDesktop = isHidden(elToggler);

    let isSticky = false;
    let scrollToGap = 0;

    const initSticky = (isDesktop) => {

      const toggleClonedElement = (isDesktop, toAdd = true, callback) => {
        if (isDesktop) {
          const target = document.querySelector(".menu-wrapper");

          if (toAdd) {
            const elBrand = document.querySelector(".it-brand-wrapper");
            const elSearch = document.querySelector(".it-search-wrapper");
            const elUser = document.querySelector(".it-user-wrapper");

            const clonedBrand = elBrand ? elBrand.cloneNode(true) : null;
            const clonedSearch = elSearch ? elSearch.cloneNode(true) : null;
            const clonedUser = elUser ? elUser.cloneNode(true) : null;

            if (clonedBrand)
              target
                .insertBefore(clonedBrand, target.childNodes[0])
                .classList.add("cloned");
            if (clonedSearch)
              target.appendChild(clonedSearch).classList.add("cloned");
            if (clonedUser)
              target
                .appendChild(clonedUser)
                .classList.add("cloned")
                .remove("show");
          } else {
            const clonedItems = document.getElementsByClassName("cloned");
            clonedItems &&
              Array.from(clonedItems).forEach((item) => {
                item.parentElement.removeChild(item);
              });

            if (typeof callback === "function") {
              callback();
            }
          }
        }
      };
      elSticky.addEventListener('on.bs.sticky', function () {
        isSticky = true;
        elSticky.classList.add("is-sticky");
        toggleClonedElement(isDesktop, true);
      })

      elSticky.addEventListener('off.bs.sticky', function () {
        isSticky = false;
        elSticky.classList.remove("is-sticky");
        toggleClonedElement(isDesktop, false);
      })
    };

    initSticky(isDesktop);
  }
})();
