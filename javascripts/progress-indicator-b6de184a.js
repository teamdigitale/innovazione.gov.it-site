export function updateProgress() {
  const contentBlocks = document.querySelectorAll("._content")
  for (let i = 0; i < contentBlocks.length; i++) {
    const obj = contentBlocks[i];
    const winScroll = Math.abs(obj.getBoundingClientRect().top);
    const height = obj.getBoundingClientRect().height;
    const scrolled = (winScroll / height) * 100;
    if (obj.getBoundingClientRect().top <= 0) {
      const indicators = document.querySelectorAll("._progress-indicator")
      for (let index = 0; index < indicators.length; index++) {
        const element = indicators[index];
        element.style.width = valueLimit(scrolled, 0, 100) + "%";
        setActiveSection();
      }
    } else {
      const indicators = document.querySelectorAll("._progress-indicator")
      for (let index = 0; index < indicators.length; index++) {
        const element = indicators[index];
        element.style.width = 0 + "%";
      }
    }
  }
}

function valueLimit(val, min, max) {
  return Math.min(max, Math.max(min, val));
}

function setActiveSection() {
  const anchors = document.querySelectorAll("._anchor")
  for (let i = 0; i < anchors.length; i++) {
    const obj = anchors[i];
    if (obj.getBoundingClientRect().top <= 10) {
      clearAllActives();
      setActive($(obj).children().attr("id"));
    }
  }
}

function clearAllActives() {
  const navItems = document.querySelectorAll(".nav-item")
  for (let i = 0; i < navItems.length; i++) {
    const obj = navItems[i];
    const objChildren = obj.children
    for (let index = 0; index < objChildren.length; index++) {
      const element = objChildren[index];
      element.classList.remove("active")
    }
  }
}

function setActive(id) {
  const elements = document.querySelectorAll("._top-menu .nav-item")
  for (let i = 0; i < elements.length; i++) {
    const obj = elements[i];
    const objChild = obj.children[0]
    if (
      objChild.getAttribute("href") ===  `#${id}` &&
      !objChild.classList.contains("active")
    ) {
      objChild.classList.add("active")
    }
  }
}
