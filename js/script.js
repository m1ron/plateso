document.addEventListener('DOMContentLoaded', function (event) {
  initForms();
  initCountdown();
  initGallery();
});

function initForms() {
  document.querySelectorAll('.validate').forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }
      form.classList.add('was-validated')
    }, false)
  })
}

function initGallery() {
  var gallery = document.querySelector('.gallery');
  if (gallery) {
    var big = gallery.querySelector('.gallery-big');
    gallery.querySelectorAll('.gallery-small-item').forEach(item => {
      item.addEventListener('click', event => {
        event.preventDefault();
        document.querySelector('.gallery-small-item.active').classList.remove('active');
        item.classList.add('active');
        big.dataset.number = item.dataset.number;
      }, false)
    })
  }
}

function initCountdown() {
  var countdown = document.querySelector('.countdown');

  if (countdown) {
    var d = new Date(),
      start = d.getTime(),
      time = 599;

    var min = countdown.querySelector('.minutes'),
      sec = countdown.querySelector('.seconds');

    const intervalID = setInterval(function () {
      d = new Date();
      var timeleft = time - Math.floor((d.getTime() - start) / 1000);
      var mins = parseInt(timeleft / 60);
      mins = ('0' + mins).slice(-2);
      var secs = parseInt(timeleft % 60);
      secs = ('0' + secs).slice(-2);
      if (timeleft > 0) {
        min.innerHTML = '<span>' + mins[0] + '</span><span>' + mins[1] + '</span>';
        sec.innerHTML = '<span>' + secs[0] + '</span><span>' + secs[1] + '</span>';
      } else {
        min.innerHTML = '<span>0</span><span>0</span>';
        sec.innerHTML = '<span>0</span><span>0</span>';
        clearInterval(intervalID);
      }
    }, 1000);
  }
}