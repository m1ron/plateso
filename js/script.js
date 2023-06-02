jQuery(document).ready(function ($) {
  initGenerator();
  initEmail();
});

function initGenerator() {
  $('.generator').each(function () {

    function generate() {

      const DEFAULT_VENDOR = 'protetox';

      let link = '', url_params = {}, vendor = DEFAULT_VENDOR;

      // my_id
      let my_id = $('#myid', form).val() || 'yourid';

      // track_id
      let track_id = $('#trackid', form).val();
      if (track_id) {
        url_params.tid = escape(track_id);
      }

      // landing
      let landing = $('#landing', form).val();
      if (landing === 'vslpage') {
        url_params.lpg = 1;
      } else if (landing === 'textpage') {
        url_params.lpg = "txt";
      } else if (landing === 'newpage') {
        url_params.lpg = 1;
        url_params.ver = 2;
      }

      // autoplay
      if ($('#autoplay', form).val() === 'no') {
        url_params.ap = 1;
      }

      // exitpopup
      if ($('#exitpopup', form).val() === 'yes') {
        url_params.ep = 1;
      }

      // headline
      if ($('#headline', form).val() === 'no') {
        url_params.ttl = 'no';
      }

      // references
      if ($('#references', form).val() === 'yes') {
        url_params.rf = 1;
      }

      // controls
      if ($('#controls', form).val() === 'yes') {
        url_params.vc = 1;
      }

      // advertisement
      if ($('#advertisement', form).val() === 'yes') {
        url_params.ad = 1;
      }

      var la = [];
      $.each(url_params, function (key, val) {
        if (val !== undefined && val !== '') {
          la.push(key + '=' + val);
        }
      });

      link = 'https://hop.clickbank.net/?affiliate=' + escape(my_id) + '&vendor=' + vendor;
      if (la.length !== 0) {
        link += "&" + la.join('&');
      }

      $('.form-result', form).text(link);
      $('.form-results',form).removeClass('hidden');
    }

    var form = $(this);

    $('.form-more', form).click(function () {
      let more = $('#more');
      if (more.hasClass('hidden')) {
        more.removeClass('hidden');
        $('span', this).text('Hide');
      } else {
        more.addClass('hidden');
        $('span', this).text('Show');
      }
      return false;
    });

    $('.form-copy', form).click(function (event) {
      event.preventDefault();
      let text = $('.form-result', form).html();
      text = htmlDecode(text);
      copyContent(text);
    });

    form.submit(function (event) {
      event.preventDefault();

      if (!$('#agree', form).is(':checked')) {
        alert('You must first check the box that you have read and that you agree to all of our affiliate terms.');
        return;
      }

      generate();

      $("#generated-section").slideDown(500);
    });
  });
}

function initEmail() {
  $('.emails .email').each(function () {
    let text = $('.email__content', this).html().replace(/[<]br[^>]*[>]/gi, '');
    $('.email__copy', this).click(function (event) {
      event.preventDefault();
      copyContent(text);
    });
  });
}

const copyContent = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Content copied to clipboard');
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
}

function htmlDecode(input) {
  var doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
}