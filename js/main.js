document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
    });
  }

  document.querySelectorAll('.has-dropdown > a').forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (window.innerWidth <= 900) {
        var parent = link.parentElement;
        var isOpen = parent.classList.contains('open');
        if (!isOpen) {
          e.preventDefault();
          document.querySelectorAll('.has-dropdown.open').forEach(function (el) {
            el.classList.remove('open');
          });
          parent.classList.add('open');
        }
      }
    });
  });

  document.querySelectorAll('.nav-links a:not(.has-dropdown > a)').forEach(function (link) {
    link.addEventListener('click', function () {
      links.classList.remove('open');
    });
  });

  initYouTubeLooping();
});

/**
 * Belt-and-suspenders looping for embedded YouTube videos.
 * The loop=1&playlist=<id> URL trick doesn't reliably loop Shorts, so this
 * uses the real IFrame Player API to explicitly restart playback on end.
 */
function initYouTubeLooping() {
  var iframes = Array.prototype.slice.call(
    document.querySelectorAll('.video-wrap iframe[src*="youtube"]')
  );
  if (!iframes.length) return;

  iframes.forEach(function (iframe, i) {
    if (!iframe.id) iframe.id = 'yt-player-' + i;
  });

  window.onYouTubeIframeAPIReady = function () {
    iframes.forEach(function (iframe) {
      new YT.Player(iframe.id, {
        events: {
          onStateChange: function (event) {
            if (event.data === YT.PlayerState.ENDED) {
              event.target.seekTo(0);
              event.target.playVideo();
            }
          }
        }
      });
    });
  };

  var tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  document.head.appendChild(tag);
}

/**
 * Conversion tracking hook. Every tel: link carries data-conversion="call",
 * every sms: link data-conversion="text", and any quote form submit button
 * data-conversion="quote-form". Clicks fire a "dhi:conversion" event on
 * document. Once the OpenAI Ads pixel is pasted into each <head>, listen for
 * this event and forward event.detail.type to the pixel's event method.
 */
document.addEventListener('click', function (e) {
  var el = e.target.closest ? e.target.closest('[data-conversion]') : null;
  if (!el) return;
  document.dispatchEvent(new CustomEvent('dhi:conversion', { detail: { type: el.getAttribute('data-conversion') } }));
});

/**
 * Lazy, muted, looping YouTube videos that play only while on screen.
 * Markup: <div class="video-short" data-yt="ID" data-title="..."> with a plain
 * "Watch on YouTube" link inside as the no-JS fallback.
 */
(function () {
  var boxes = document.querySelectorAll('.video-short');
  if (!('IntersectionObserver' in window) || !boxes.length) return;
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function send(frame, func, args) {
    try {
      frame.contentWindow.postMessage(JSON.stringify({ event: 'command', func: func, args: args || [] }), '*');
    } catch (e) {}
  }

  // Restart a video when it ends (loop=1 alone is unreliable for Shorts).
  window.addEventListener('message', function (e) {
    if (!/youtube(-nocookie)?\.com$/.test(e.origin.replace(/^https?:\/\//, ''))) return;
    var data;
    try { data = JSON.parse(e.data); } catch (err) { return; }
    if (data && data.event === 'onStateChange' && data.info === 0) {
      boxes.forEach(function (box) {
        var frame = box.querySelector('iframe');
        if (frame && frame.contentWindow === e.source) {
          send(frame, 'seekTo', [0, true]);
          send(frame, 'playVideo');
        }
      });
    }
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var box = entry.target;
      var frame = box.querySelector('iframe');
      if (entry.isIntersecting) {
        if (!frame) {
          var id = box.getAttribute('data-yt');
          frame = document.createElement('iframe');
          frame.src = 'https://www.youtube-nocookie.com/embed/' + id +
            '?autoplay=' + (reduceMotion ? 0 : 1) +
            '&mute=1&loop=1&playlist=' + id +
            '&playsinline=1&controls=1&rel=0&enablejsapi=1';
          frame.title = box.getAttribute('data-title') || 'Window cleaning video';
          frame.allow = 'autoplay; encrypted-media; picture-in-picture';
          frame.referrerPolicy = 'strict-origin-when-cross-origin';
          frame.addEventListener('load', function () {
            try { frame.contentWindow.postMessage(JSON.stringify({ event: 'listening', id: id }), '*'); } catch (err) {}
          });
          box.innerHTML = '';
          box.appendChild(frame);
        } else if (!reduceMotion) {
          send(frame, 'playVideo');
        }
      } else if (frame) {
        send(frame, 'pauseVideo');
      }
    });
  }, { threshold: 0.5 });

  boxes.forEach(function (box) { observer.observe(box); });
})();
