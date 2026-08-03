// site-config.js — single source for the current release.
// On each release, edit only the CONFIG block below.
(function () {
  // ── EDIT ON EACH RELEASE ─────────────────────────────
  var CONFIG = {
    version: 'v1.0.3',
    downloads: {
      windows: 'https://github.com/Neucrotic/writelite-release/releases/download/v1.0.3/WriteLite_1.0.3_x64-setup.exe',
      mac:     'https://github.com/Neucrotic/writelite-release/releases/download/v1.0.3/WriteLite_1.0.3_aarch64.dmg'
    }
  };
  // ─────────────────────────────────────────────────────

  var COUNTER_URL = 'https://shiny-pond-7f70writelite-downloads-counter.nelsonhain.workers.dev/count';

  // Discord invite — kept out of CONFIG on purpose: it changes on its own
  // cadence, not per release. Edit here when the invite changes.
  var DISCORD_URL = 'https://discord.gg/hxxdt8tP5';

  function isMobile() {
    return /Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  // 'windows' | 'mac' | null  (null → fallback card, used from stage 4 on)
  function detectPlatform() {
    var ua = navigator.userAgent;
    if (/Mac/.test(ua) && !/iPhone|iPad|iPod/.test(ua)) return 'mac';
    if (/Windows/.test(ua)) return 'windows';
    return null;
  }

  function countDownload(platform) {
    fetch(COUNTER_URL + '?platform=' + platform, { method: 'POST' }).catch(function () {});
  }

  // Shared download-button handler. Desktop: count + let it download.
  // Mobile: block, show the desktop-only notice if the page has one.
  function handleDownloadClick(e, platform) {
    if (!isMobile()) { countDownload(platform); return; }
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
    countDownload:       countDownload,
    handleDownloadClick: handleDownloadClick,
    closeMobileNotice:   closeMobileNotice,
    hydrate:             hydrate
  };

  // Markup onclick="" resolves to these globals.
  window.handleDownloadClick = handleDownloadClick;
  window.closeMobileNotice   = closeMobileNotice;

  document.addEventListener('DOMContentLoaded', hydrate);
})();
