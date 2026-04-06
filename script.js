/* ============================================
   CINQ ANS — Navigation & Interactions
   Mobile-first with touch support
   ============================================ */

(function () {
  'use strict';

  // --- Chapter order ---
  var CHAPTERS = [
    'couverture',
    'avant-propos',
    'chapitre-1',
    'chapitre-2',
    'chapitre-3',
    'chapitre-4',
    'chapitre-5',
    'chapitre-6',
    'chapitre-7',
    'chapitre-8'
  ];

  var currentChapter = 'couverture';

  // --- DOM refs ---
  var sidebar = document.getElementById('sidebar');
  var sidebarOverlay = document.getElementById('sidebarOverlay');
  var menuToggle = document.getElementById('menuToggle');
  var themeToggle = document.getElementById('themeToggle');
  var progressBar = document.getElementById('progressBar');
  var topBarTitle = document.getElementById('topBarTitle');
  var prevBtn = document.getElementById('prevBtn');
  var nextBtn = document.getElementById('nextBtn');
  var chapterNav = document.getElementById('chapterNav');

  // --- Navigate to a chapter ---
  window.navigateTo = function (id) {
    if (CHAPTERS.indexOf(id) === -1) return;

    // Hide all chapters
    var chapters = document.querySelectorAll('.chapter');
    for (var i = 0; i < chapters.length; i++) {
      chapters[i].classList.remove('active');
    }

    // Show target chapter
    var target = document.getElementById(id);
    if (target) {
      target.classList.add('active');
    }

    currentChapter = id;

    // Update nav links
    var links = document.querySelectorAll('.nav-link');
    for (var j = 0; j < links.length; j++) {
      var isActive = links[j].getAttribute('data-chapter') === id;
      if (isActive) {
        links[j].classList.add('active');
      } else {
        links[j].classList.remove('active');
      }
    }

    // Update URL hash
    history.replaceState(null, '', '#' + id);

    // Update top bar title
    updateTopBarTitle(id);

    // Update prev/next buttons
    updateNavButtons();

    // Update progress
    updateProgress();

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Close sidebar on mobile
    closeSidebar();
  };

  window.navigatePrev = function () {
    var idx = CHAPTERS.indexOf(currentChapter);
    if (idx > 0) {
      navigateTo(CHAPTERS[idx - 1]);
    }
  };

  window.navigateNext = function () {
    var idx = CHAPTERS.indexOf(currentChapter);
    if (idx < CHAPTERS.length - 1) {
      navigateTo(CHAPTERS[idx + 1]);
    }
  };

  function updateNavButtons() {
    var idx = CHAPTERS.indexOf(currentChapter);
    prevBtn.disabled = idx <= 0;
    nextBtn.disabled = idx >= CHAPTERS.length - 1;

    // Show/hide chapter nav on cover
    chapterNav.style.display = currentChapter === 'couverture' ? 'none' : 'flex';

    // Update button labels with chapter names
    var prevLabel = prevBtn.querySelector('.nav-btn-label');
    var nextLabel = nextBtn.querySelector('.nav-btn-label');
    if (prevLabel && idx > 0) {
      prevLabel.textContent = getChapterShortName(CHAPTERS[idx - 1]);
    }
    if (nextLabel && idx < CHAPTERS.length - 1) {
      nextLabel.textContent = getChapterShortName(CHAPTERS[idx + 1]);
    }
  }

  function getChapterShortName(id) {
    var section = document.getElementById(id);
    if (!section) return '';
    if (id === 'couverture') return 'Couverture';
    var title = section.querySelector('.chapter-title');
    if (title) {
      var text = title.textContent;
      return text.length > 25 ? text.substring(0, 25) + '...' : text;
    }
    return '';
  }

  function updateTopBarTitle(id) {
    if (id === 'couverture') {
      topBarTitle.textContent = 'CINQ ANS';
      return;
    }
    var section = document.getElementById(id);
    if (!section) return;
    var label = section.querySelector('.chapter-label');
    var title = section.querySelector('.chapter-title');
    if (label && title) {
      // On mobile, show shorter title
      if (window.innerWidth < 641) {
        topBarTitle.textContent = label.textContent;
      } else {
        topBarTitle.textContent = label.textContent + ' \u2014 ' + title.textContent;
      }
    }
  }

  // --- Progress bar ---
  function updateProgress() {
    var idx = CHAPTERS.indexOf(currentChapter);
    var chapterProgress = idx / (CHAPTERS.length - 1);

    var activeSection = document.getElementById(currentChapter);
    var scrollProgress = 0;
    if (activeSection && currentChapter !== 'couverture') {
      var rect = activeSection.getBoundingClientRect();
      var sectionHeight = activeSection.scrollHeight;
      var viewHeight = window.innerHeight;
      var scrolled = -rect.top + viewHeight;
      scrollProgress = Math.max(0, Math.min(1, scrolled / sectionHeight));
    }

    var stepSize = 1 / (CHAPTERS.length - 1);
    var totalProgress = (chapterProgress + scrollProgress * stepSize) * 100;
    totalProgress = Math.min(100, Math.max(0, totalProgress));

    progressBar.style.width = totalProgress + '%';
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', function () {
    updateTopBarTitle(currentChapter);
  });

  // --- Sidebar toggle (mobile) ---
  function openSidebar() {
    sidebar.classList.add('open');
    sidebarOverlay.classList.add('open');
    menuToggle.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('open');
    menuToggle.classList.remove('active');
    document.body.style.overflow = '';
  }

  menuToggle.addEventListener('click', function () {
    if (sidebar.classList.contains('open')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });

  sidebarOverlay.addEventListener('click', closeSidebar);

  // --- Theme toggle ---
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('tif-theme', theme);
  }

  function initTheme() {
    var saved = localStorage.getItem('tif-theme');
    if (saved) {
      setTheme(saved);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }

  themeToggle.addEventListener('click', function () {
    var current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });

  initTheme();

  // --- Keyboard navigation ---
  document.addEventListener('keydown', function (e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      navigatePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      navigateNext();
    } else if (e.key === 'Escape') {
      closeSidebar();
    }
  });

  // --- Touch swipe navigation ---
  var touchStartX = 0;
  var touchStartY = 0;
  var touchEndX = 0;
  var touchEndY = 0;
  var isSwiping = false;

  document.addEventListener('touchstart', function (e) {
    // Don't interfere with sidebar swipe or links
    if (sidebar.contains(e.target)) return;

    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
    isSwiping = true;
  }, { passive: true });

  document.addEventListener('touchend', function (e) {
    if (!isSwiping) return;
    isSwiping = false;

    if (sidebar.contains(e.target)) return;

    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;

    var deltaX = touchEndX - touchStartX;
    var deltaY = touchEndY - touchStartY;

    // Only trigger if horizontal swipe is dominant and long enough
    var minSwipe = 80;
    if (Math.abs(deltaX) > minSwipe && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      if (deltaX > 0) {
        // Swipe right -> previous chapter
        navigatePrev();
      } else {
        // Swipe left -> next chapter
        navigateNext();
      }
    }
  }, { passive: true });

  // --- Edge swipe to open sidebar ---
  document.addEventListener('touchstart', function (e) {
    var touch = e.changedTouches[0];
    // If touch starts within 20px of left edge, prepare for sidebar swipe
    if (touch.clientX < 20 && !sidebar.classList.contains('open')) {
      var startY = touch.clientY;
      var startX = touch.clientX;

      function onMove(ev) {
        var moveX = ev.changedTouches[0].clientX;
        var moveY = ev.changedTouches[0].clientY;
        if (moveX - startX > 50 && Math.abs(moveY - startY) < 50) {
          openSidebar();
          document.removeEventListener('touchmove', onMove);
          document.removeEventListener('touchend', onEnd);
        }
      }

      function onEnd() {
        document.removeEventListener('touchmove', onMove);
        document.removeEventListener('touchend', onEnd);
      }

      document.addEventListener('touchmove', onMove, { passive: true });
      document.addEventListener('touchend', onEnd, { passive: true });
    }
  }, { passive: true });

  // --- Init from URL hash ---
  function initFromHash() {
    var hash = window.location.hash.replace('#', '');
    if (hash && CHAPTERS.indexOf(hash) !== -1) {
      navigateTo(hash);
    } else {
      navigateTo('couverture');
    }
  }

  window.addEventListener('hashchange', function () {
    var hash = window.location.hash.replace('#', '');
    if (hash && CHAPTERS.indexOf(hash) !== -1 && hash !== currentChapter) {
      navigateTo(hash);
    }
  });

  // --- Copy link ---
  window.copyLink = function () {
    var url = 'https://cinqans.fr/';
    navigator.clipboard.writeText(url).then(function () {
      var btn = document.querySelector('.share-copy');
      if (btn) {
        var label = btn.querySelector('.copy-label');
        if (label) label.textContent = 'Copié !';
        btn.classList.add('copied');
        setTimeout(function () {
          if (label) label.textContent = 'Copier le lien';
          btn.classList.remove('copied');
        }, 2000);
      }
    });
  };

  // --- Start ---
  initFromHash();

})();
