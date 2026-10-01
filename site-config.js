// site-config.js — single source for the current release.
// On each release, edit only the CONFIG block below.
(function () {
  // ── EDIT ON EACH RELEASE ─────────────────────────────
  var CONFIG = {
    version: 'v1.2.0',
    downloads: {
      windows: 'https://github.com/Neucrotic/writelite-release/releases/download/v1.2.0/WriteLite_1.2.0_x64-setup.exe',
      mac:     'https://github.com/Neucrotic/writelite-release/releases/download/v1.2.0/WriteLite_1.2.0_aarch64.dmg'
    }
  };
  // ─────────────────────────────────────────────────────

  var SPLITFORMS_ENDPOINT = 'https://splitforms.com/api/submit';
  var DOWNLOADS_ACCESS_KEY = 'a64cf333975141a1a5ef2e75bc8f90da';

  // Discord invite — kept out of CONFIG on purpose: it changes on its own
  // cadence, not per release. Edit here when the invite changes.
  var DISCORD_URL = 'https://discord.gg/fWFMe76Dv';

  function isMobile() {
    return /Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  // 'windows' | 'mac' | null  (null → fallback card, used from stage 4 on)
  function detectPlatform() {
    var uad = navigator.userAgentData && navigator.userAgentData.platform;
    if (uad) {
      if (/^mac/i.test(uad)) return 'mac';
      if (/^win/i.test(uad)) return 'windows';
    }
    var np = navigator.platform;
    if (np) {
      if (/^Mac/i.test(np)) return 'mac';
      if (/^Win/i.test(np)) return 'windows';
    }
    var ua = navigator.userAgent;
    if (/Mac/.test(ua) && !/iPhone|iPad|iPod/.test(ua)) return 'mac';
    if (/Windows/.test(ua)) return 'windows';
    return null;
  }

  function platformFromUrl(url) {
    if (!url) return null;
    if (/\.dmg(\?|$)/i.test(url)) return 'mac';
    if (/\.exe(\?|$)/i.test(url)) return 'windows';
    return null;
  }

  function postDownloadPlatform(platform) {
    fetch(SPLITFORMS_ENDPOINT, {
      method: 'POST',
      keepalive: true,
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        access_key: DOWNLOADS_ACCESS_KEY,
        botcheck: '',
        platform: platform
      })
    }).catch(function () {});
  }

  // Shared download-button handler. Desktop: start installer, then post platform.
  // Mobile: block, show the desktop-only notice if the page has one.
  function handleDownloadClick(e, platform) {
    if (!isMobile()) {
      e.preventDefault();
      var url = CONFIG.downloads[platform];
      if (url) {
        var a = document.createElement('a');
        a.href = url;
        a.setAttribute('download', ''); // matches existing markup; ignored cross-origin, harmless
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
      var posted = platformFromUrl(url) || platform;
      if (posted === 'windows' || posted === 'mac') {
        postDownloadPlatform(posted);
      }
      return;
    }
    e.preventDefault();
    var notice = document.getElementById('mobile-notice');
    if (!notice) return;
    var pl = document.getElementById('mobile-notice-platform');
    if (pl) pl.textContent = (platform === 'windows' ? 'a Windows' : 'a Mac') + ' computer';
    notice.classList.remove('visible');
    void notice.offsetWidth;
    notice.classList.add('visible');
    clearTimeout(window._noticeTimer);
    window._noticeTimer = setTimeout(closeMobileNotice, 6000);
  }

  function closeMobileNotice() {
    var notice = document.getElementById('mobile-notice');
    if (notice) notice.classList.remove('visible');
    clearTimeout(window._noticeTimer);
  }

  // Declarative fill on load:
  //   data-wl-version                → textContent = version
  //   data-wl-download="windows|mac" → href = that platform's URL
  function hydrate() {
    document.querySelectorAll('[data-wl-version]').forEach(function (el) {
      el.textContent = CONFIG.version;
    });
    document.querySelectorAll('[data-wl-download]').forEach(function (el) {
      var p = el.getAttribute('data-wl-download');
      if (CONFIG.downloads[p]) el.href = CONFIG.downloads[p];
    });
    document.querySelectorAll('[data-wl-discord]').forEach(function (el) {
      el.href = DISCORD_URL;
    });
  }

  // Shared API — one namespace instead of many loose globals.
  window.WriteLite = {
    config:              CONFIG,
    discordUrl:          DISCORD_URL,
    isMobile:            isMobile,
    detectPlatform:      detectPlatform,
    postDownloadPlatform: postDownloadPlatform,
    handleDownloadClick: handleDownloadClick,
    closeMobileNotice:   closeMobileNotice,
    hydrate:             hydrate
  };

  // Markup onclick="" resolves to these globals.
  window.handleDownloadClick = handleDownloadClick;
  window.closeMobileNotice   = closeMobileNotice;

  document.addEventListener('DOMContentLoaded', hydrate);
})();
