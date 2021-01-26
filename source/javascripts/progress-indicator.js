export function updateProgress() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  $('._progress-indicator').each(function() {
    this.style.width = scrolled + "%";
    setActiveSection()
  })
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
  $('#_top-menu .nav-item').each(function(i, obj) {
    if ($(obj).children().attr('href') === `#${id}` && !$(obj).children().hasClass('active')) {
      $(obj).children().addClass('active')
    }
  })
}