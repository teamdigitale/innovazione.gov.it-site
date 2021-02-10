export function updateProgress() {
  $('._content').each(function(i, obj) {
    var winScroll = Math.abs(obj.getBoundingClientRect().top);
    var height = obj.getBoundingClientRect().height;
    var scrolled = (winScroll / height) * 100;
    if (obj.getBoundingClientRect().top <= 0) {
      $('._progress-indicator').each(function() {
        this.style.width = valueLimit(scrolled, 0, 100) + "%";
        setActiveSection()
      })
    } else {
      $('._progress-indicator').each(function() {
        this.style.width = 0 + "%";
      })
    }
  })
}

function valueLimit(val, min, max) {
  return (Math.min(max, Math.max(min, val)));
}

function setActiveSection() {
  $('._anchor').each(function(i, obj) {
    if (obj.getBoundingClientRect().top <= 10 ) {
      clearAllActives()
      setActive($(obj).children().attr('id'))
    }
  });
}

function clearAllActives() {
  $('.nav-item').each(function(i, obj) {
    $(obj).children().removeClass('active')
  })
}

function setActive(id) {
  $('._top-menu .nav-item').each(function(i, obj) {
    if ($(obj).children().attr('href') === `#${id}` && !$(obj).children().hasClass('active')) {
      $(obj).children().addClass('active')
    }
  })
}