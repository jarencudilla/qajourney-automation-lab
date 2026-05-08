/* ═══════════════════════════════════════
   QA JOURNEY PLAYGROUND v3 — script.js
═══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

  /* ── THEME ── */
  var themeBtn = document.getElementById('themeToggle');
  var saved = localStorage.getItem('qaj-theme');
  if (saved === 'light') {
    document.body.classList.add('light-mode');
    if (themeBtn) themeBtn.textContent = '🌙';
  }
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var isLight = document.body.classList.toggle('light-mode');
      themeBtn.textContent = isLight ? '🌙' : '🌗';
      localStorage.setItem('qaj-theme', isLight ? 'light' : 'dark');
    });
  }

  /* ── SIDEBAR TOGGLE ── */
  var toggleBtn = document.getElementById('sidebarToggle');
  var sidebar   = document.getElementById('sidebar');
  var icon      = document.getElementById('toggleIcon');
  var sidebarCollapsed = localStorage.getItem('qaj-sidebar') === 'collapsed';

  function applySidebar() {
    if (!sidebar) return;
    if (sidebarCollapsed) {
      sidebar.classList.add('collapsed');
      if (icon) icon.className = 'ti ti-chevron-right';
    } else {
      sidebar.classList.remove('collapsed');
      if (icon) icon.className = 'ti ti-chevron-left';
    }
  }
  applySidebar();

  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      sidebarCollapsed = !sidebarCollapsed;
      localStorage.setItem('qaj-sidebar', sidebarCollapsed ? 'collapsed' : 'open');
      applySidebar();
    });
  }

  /* ── TABS ── */
  document.querySelectorAll('.tab-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var group = btn.dataset.group;
      document.querySelectorAll('.tab-btn[data-group="' + group + '"]').forEach(function (b) {
        b.classList.remove('active');
      });
      document.querySelectorAll('.tab-pane[data-group="' + group + '"]').forEach(function (p) {
        p.classList.remove('active');
      });
      btn.classList.add('active');
      var pane = document.getElementById(btn.dataset.tab);
      if (pane) pane.classList.add('active');
    });
  });

  /* ── TEST CASES ── */
  var tcList = document.getElementById('tc-list');
  if (tcList) {
    var pageKey = 'qaj-tc:' + window.location.pathname;
    var tcState = {};
    try { tcState = JSON.parse(localStorage.getItem(pageKey) || '{}'); } catch (e) {}

    /* Exposed globally so page JS can call it AFTER injecting TC rows */
    window.renderTC = function () {
      var rows = tcList.querySelectorAll('.tc-row');
      rows.forEach(function (row) {
        var id = row.dataset.id;
        var cb = row.querySelector('input[type="checkbox"]');
        if (!cb) return;
        var done = !!tcState[id];
        cb.checked = done;
        row.classList.toggle('done', done);
      });
      updateProgress();
    };
    var renderTC = window.renderTC;

    function updateProgress() {
      var all  = tcList.querySelectorAll('.tc-row').length;
      var done = Object.values(tcState).filter(Boolean).length;
      var el   = document.getElementById('tc-progress');
      if (el) {
        el.textContent = done + ' / ' + all + ' tested';
        el.style.color = done === all && all > 0 ? 'var(--success)' : 'var(--text-muted)';
      }
    }

    tcList.addEventListener('change', function (e) {
      if (e.target.type !== 'checkbox') return;
      var row = e.target.closest('.tc-row');
      if (!row) return;
      tcState[row.dataset.id] = e.target.checked;
      try { localStorage.setItem(pageKey, JSON.stringify(tcState)); } catch (err) {}
      row.classList.toggle('done', e.target.checked);
      updateProgress();
    });

    window.resetTC = function () {
      tcState = {};
      try { localStorage.removeItem(pageKey); } catch (e) {}
      renderTC();
    };

    renderTC();
  }

  /* ── BUG REPORT ── */
  window.clearBugReport = function () {
    document.querySelectorAll('.bug-form input, .bug-form textarea, .bug-form select').forEach(function (el) {
      if (el.tagName === 'SELECT') el.selectedIndex = 0;
      else el.value = '';
    });
  };

  /* ── NOTES ── */
  var notesArea = document.getElementById('qa-notes');
  if (notesArea) {
    var notesKey = 'qaj-notes:' + window.location.pathname;
    var savedNotes = localStorage.getItem(notesKey);
    if (savedNotes) notesArea.value = savedNotes;

    window.saveNotes = function () {
      try { localStorage.setItem(notesKey, notesArea.value); } catch (e) {}
      flash('save-status', 'Saved ✓');
    };
    window.clearNotes = function () {
      notesArea.value = '';
      try { localStorage.removeItem(notesKey); } catch (e) {}
    };
  }

  /* ── FLASH HELPER ── */
  function flash(id, text) {
    var el = document.getElementById(id);
    if (!el) return;
    el.textContent = text;
    el.style.opacity = '1';
    setTimeout(function () { el.style.opacity = '0'; }, 1800);
  }

  /* ── EXPORT: TEST CASES ── */
  window.exportTC = function (format) {
    var rows = document.querySelectorAll('#tc-list .tc-row');
    if (!rows.length) return;
    var pageKey = 'qaj-tc:' + window.location.pathname;
    var tcState = {};
    try { tcState = JSON.parse(localStorage.getItem(pageKey) || '{}'); } catch (e) {}

    var title = document.querySelector('.page-hero h1') ? document.querySelector('.page-hero h1').textContent.trim() : 'Test Cases';
    var lines = ['# Test Cases — ' + title, ''];

    rows.forEach(function (row) {
      var id    = row.dataset.id || '';
      var label = row.querySelector('.tc-label') ? row.querySelector('.tc-label').textContent.trim() : '';
      var badge = row.querySelector('.tc-badge') ? row.querySelector('.tc-badge').textContent.trim() : '';
      var done  = !!tcState[id];
      lines.push('## ' + id.toUpperCase() + ' — ' + label);
      lines.push('- **Type:** ' + badge);
      lines.push('- **Status:** ' + (done ? 'Tested ✓' : 'Pending'));
      lines.push('');
    });

    var md = lines.join('\n');
    if (format === 'copy') {
      navigator.clipboard.writeText(md).then(function () { flash('export-status', 'Copied ✓'); });
    } else {
      downloadFile('test-cases.md', md);
    }
  };

  /* ── EXPORT: BUG REPORT ── */
  window.exportBug = function (format) {
    var get = function (id) {
      var el = document.getElementById(id);
      return el ? el.value.trim() : '';
    };
    var title    = get('bug-title');
    var steps    = get('bug-steps');
    var expected = get('bug-expected');
    var actual   = get('bug-actual');
    var severity = get('bug-severity');
    var priority = get('bug-priority');
    var env      = get('bug-env');
    var notes    = get('bug-notes');

    if (!title) { alert('Add a bug title first.'); return; }

    var pageTitle = document.querySelector('.page-hero h1') ? document.querySelector('.page-hero h1').textContent.trim() : 'Bug Report';
    var md = [
      '# Bug Report — ' + pageTitle,
      '',
      '**Title:** ' + (title || '—'),
      '',
      '## Steps to Reproduce',
      steps || '—',
      '',
      '## Expected Result',
      expected || '—',
      '',
      '## Actual Result',
      actual || '—',
      '',
      '## Classification',
      '- **Severity:** ' + (severity || '—'),
      '- **Priority:** ' + (priority || '—'),
      '',
      '## Environment',
      env || '—',
      '',
      '## Additional Notes',
      notes || '—',
    ].join('\n');

    if (format === 'copy') {
      navigator.clipboard.writeText(md).then(function () { flash('bug-export-status', 'Copied ✓'); });
    } else {
      downloadFile('bug-report.md', md);
    }
  };

  /* ── EXPORT: NOTES ── */
  window.exportNotes = function (format) {
    var area = document.getElementById('qa-notes');
    if (!area || !area.value.trim()) return;
    var pageTitle = document.querySelector('.page-hero h1') ? document.querySelector('.page-hero h1').textContent.trim() : 'Notes';
    var md = '# QA Notes — ' + pageTitle + '\n\n' + area.value;
    if (format === 'copy') {
      navigator.clipboard.writeText(md).then(function () { flash('notes-export-status', 'Copied ✓'); });
    } else {
      downloadFile('qa-notes.md', md);
    }
  };

  /* ── DOWNLOAD HELPER ── */
  function downloadFile(filename, content) {
    var blob = new Blob([content], { type: 'text/markdown' });
    var url  = URL.createObjectURL(blob);
    var a    = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /* ── MODAL HELPERS ── */
  window.openModal = function (id) {
    var el = document.getElementById(id);
    if (el) el.classList.add('show');
  };
  window.closeModal = function (id) {
    var el = document.getElementById(id);
    if (el) el.classList.remove('show');
  };
  document.querySelectorAll('.modal-overlay').forEach(function (overlay) {
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) overlay.classList.remove('show');
    });
  });

});
