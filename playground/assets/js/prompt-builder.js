/* QAJ Prompt Builder — embedded from qajourney.net/qaj-prompt-builder */
(function () {
  var sel = { test: null, framework: null, output: null };
  var AUTO_FW = ['Cypress', 'Playwright', 'Selenium'];

  function init() {
    document.querySelectorAll('.qajpb-pill').forEach(function (pill) {
      pill.addEventListener('click', function () {
        var group = pill.dataset.group;
        document.querySelectorAll('.qajpb-pill[data-group="' + group + '"]').forEach(function (p) { p.classList.remove('active'); });
        pill.classList.add('active');
        sel[group] = pill.dataset.val;
        qajpbAdvisory();
      });
    });
  }

  function getConflict(test, fw) {
    if (fw === 'Postman' && test !== 'API') return 'postman-non-api';
    if (test === 'Manual' && AUTO_FW.indexOf(fw) > -1) return 'manual-auto';
    return null;
  }

  function qajpbAdvisory() {
    var el = document.getElementById('qajpb-advisory');
    if (!el || !sel.test || !sel.framework) { if (el) el.classList.remove('visible'); return; }
    var c = getConflict(sel.test, sel.framework);
    if (c === 'postman-non-api') {
      el.innerHTML = '<strong>Note:</strong> Postman is primarily an API tool. Prompt adjusted for manual API inspection within your selected test type.';
      el.classList.add('visible');
    } else if (c === 'manual-auto') {
      el.innerHTML = '<strong>Note:</strong> ' + sel.framework + ' is built for automation. Prompt adjusted for manual reference and test planning.';
      el.classList.add('visible');
    } else { el.classList.remove('visible'); }
  }

  var BASE = {
    Manual: "You are a senior QA engineer with 5+ years testing production systems. Think like a frustrated user, not a happy demo scenario.",
    Automation: "You are a senior automation engineer. Write clean, maintainable test code. Avoid brittle selectors. Prefer data-testid attributes and explicit waits over hardcoded timeouts.",
    Regression: "You are a senior QA engineer running regression validation. Confirm existing functionality is unbroken after changes. Focus on critical paths.",
    Smoke: "You are a QA engineer running a smoke test. Validate only core flows that confirm the build is testable. Flag blockers immediately.",
    E2E: "You are a senior QA engineer designing end-to-end tests. Cover the full user journey. Include happy path, error states, and recovery flows.",
    API: "You are a senior QA engineer specializing in API testing. Validate status codes, response schemas, headers, auth, error handling, and edge case payloads."
  };

  var FW = {
    Cypress: "Use Cypress. Prefer cy.get('[data-testid]') selectors. Use cy.intercept() for network stubbing.",
    Playwright: "Use Playwright. Use page.getByRole() and page.getByTestId() locators. Handle async with await throughout.",
    Selenium: "Use Selenium WebDriver. Use explicit waits with WebDriverWait. Avoid Thread.sleep(). Use Page Object Model.",
    Postman: "Use Postman. Write pm.test() assertions covering status code, response time, schema, and field values.",
    Postman_manual: "Use Postman as a manual inspection tool. Validate responses by eye against expected status codes and response bodies.",
    Manual_auto: "Use this as a reference for manual test planning. Do not write code. Describe what a tester should manually verify.",
    Generic: ""
  };

  function resolveBase(test, fw) {
    if (getConflict(test, fw) === 'manual-auto') return BASE['Manual'];
    return BASE[test];
  }
  function resolveFw(test, fw) {
    var c = getConflict(test, fw);
    if (c === 'postman-non-api') return FW['Postman_manual'];
    if (c === 'manual-auto') return FW['Manual_auto'];
    if (fw === 'Generic') return '';
    return FW[fw];
  }

  function buildPrompt(test, fw, output, ctx) {
    var base = resolveBase(test, fw);
    var framework = resolveFw(test, fw);
    var ctxLine = ctx ? '\nScenario context: ' + ctx + '\n' : '';
    var fwLine = framework ? '\n' + framework : '';
    var t = {
      "Test case generation": base + fwLine + ctxLine + '\nGenerate test cases for the scenario above.\n\nFor each test case provide:\n- Test Case ID\n- Title\n- Preconditions\n- Steps to reproduce\n- Expected result\n- Severity (Critical / High / Medium / Low)\n- Test type (Positive / Negative / Edge case)\n\nCover: happy path, error states, boundary values, and UX friction points.',
      "Bug report": base + ctxLine + '\nAnalyze the following and produce structured bug reports.\n\nFor each issue:\n\nBug ID: [leave blank]\nTitle: [one-line summary]\nSeverity: [Critical / High / Medium / Low] — explain why\nSteps to reproduce:\n1.\nExpected result:\nActual result:\nEnvironment: [Browser / OS / Build]\nType: [Functional / UI / UX / Performance]\n\nFlag anything that would frustrate a real user even if it technically works.',
      "Regression suite": BASE['Regression'] + fwLine + ctxLine + '\nBuild a regression suite.\n\n1. Critical path tests\n2. Core feature tests\n3. Integration checkpoints\n4. Known fragile areas\n\nFor each: title, what it validates, pass condition.',
      "Edge case discovery": base + ctxLine + '\nIdentify edge cases.\n\nThink across:\n- Boundary values (min, max, zero, null, empty)\n- Unexpected user behavior (typos, fast clicks, double submit)\n- State transitions (mid-flow interruptions, session expiry)\n- Data variations (special chars, long strings, injection attempts)\n- Device differences (slow network, small screen, old browser)\n\nFor each: scenario, expected behavior, risk level.',
      "Acceptance criteria review": base + ctxLine + '\nReview against acceptance criteria.\n\nFor each criterion:\n- Status: Pass / Fail / Unclear\n- Evidence\n- Gaps\n\nAfter: list UX issues that pass technically but frustrate users. Flag ambiguous criteria.'
    };
    return t[output] || '';
  }

  window.qajpbGenerate = function () {
    var test = sel.test, fw = sel.framework, output = sel.output;
    var ctxEl = document.getElementById('qajpb-ctx');
    var ctx = ctxEl ? ctxEl.value.trim() : '';
    var area = document.getElementById('qajpb-output');
    var cards = document.getElementById('qajpb-cards');
    if (!area || !cards) return;

    if (!test || !fw || !output) {
      cards.innerHTML = '<p class="qajpb-empty">Select a test type, framework, and output type first.</p>';
      area.classList.add('visible'); return;
    }

    var promptText = buildPrompt(test, fw, output, ctx);
    var conflict = getConflict(test, fw);
    var tag = test + ' · ' + fw + ' · ' + output + (conflict ? ' · adjusted' : '');
    cards.innerHTML = '';
    var card = document.createElement('div');
    card.className = 'qajpb-card';
    card.innerHTML =
      '<div class="qajpb-card-header">' +
        '<span class="qajpb-tag">' + tag + '</span>' +
        '<button class="qajpb-copy" onclick="qajpbCopy(this)">Copy</button>' +
      '</div>' +
      '<div class="qajpb-prompt">' + esc(promptText) + '</div>';
    cards.appendChild(card);
    area.classList.add('visible');
    area.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  window.qajpbCopy = function (btn) {
    var text = btn.closest('.qajpb-card').querySelector('.qajpb-prompt').innerText;
    navigator.clipboard.writeText(text).then(function () {
      btn.textContent = 'Copied ✓'; btn.classList.add('copied');
      setTimeout(function () { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
    });
  };

  function esc(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
})();
