/* ================================================================
   STACKBASE SYSTEMS — INTERACTIVE MAIN ENGINE
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // 1. GATEWAY COMPARISON TOGGLE (With Stackbase vs Without Stackbase)
  const btnWith = document.getElementById('btnWith');
  const btnWithout = document.getElementById('btnWithout');
  const iframeWith = document.getElementById('iframeWith');
  const iframeWithout = document.getElementById('iframeWithout');
  const vhTitle = document.getElementById('vhTitle');
  const vhBadge = document.getElementById('vhBadge');
  const vhStatusDot = document.getElementById('vhStatusDot');

  if (btnWith && btnWithout && iframeWith && iframeWithout) {
    btnWith.addEventListener('click', () => {
      btnWith.classList.add('active');
      btnWithout.classList.remove('active');
      iframeWith.classList.add('active');
      iframeWithout.classList.remove('active');

      if (vhTitle) vhTitle.textContent = "WITH STACKBASE — GOVERNED EXECUTION ENGINE";
      if (vhBadge) vhBadge.textContent = "ACTIVE MCP GATEWAY";
      if (vhStatusDot) {
        vhStatusDot.className = "vh-dot green";
      }
    });

    btnWithout.addEventListener('click', () => {
      btnWithout.classList.add('active');
      btnWith.classList.remove('active');
      iframeWithout.classList.add('active');
      iframeWith.classList.remove('active');

      if (vhTitle) vhTitle.textContent = "WITHOUT STACKBASE — UNCONNECTED / BLOCKED STATE";
      if (vhBadge) vhBadge.textContent = "GATEWAY MISSING";
      if (vhStatusDot) {
        vhStatusDot.className = "vh-dot red";
      }
    });
  }

  // 2. SPOTLIGHT EFFECT ON HOVER FOR .spotlight-card
  const spotlightCards = document.querySelectorAll('.spotlight-card');
  spotlightCards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // 3. CURSOR FOLLOWER
  const cursorBlob = document.getElementById('cursor-blob');
  const cursorDot = document.getElementById('cursor-dot');
  const scrollProgress = document.getElementById('scroll-progress');

  window.addEventListener('mousemove', e => {
    if (cursorBlob) {
      cursorBlob.style.left = `${e.clientX}px`;
      cursorBlob.style.top = `${e.clientY}px`;
    }
    if (cursorDot) {
      cursorDot.style.left = `${e.clientX}px`;
      cursorDot.style.top = `${e.clientY}px`;
    }
  });

  // 4. SCROLL PROGRESS
  window.addEventListener('scroll', () => {
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalScroll);
    if (scrollProgress) {
      scrollProgress.style.transform = `scaleX(${progress})`;
    }

    const siteNav = document.getElementById('siteNav');
    if (siteNav) {
      if (window.scrollY > 50) {
        siteNav.classList.add('scrolled');
      } else {
        siteNav.classList.remove('scrolled');
      }
    }
  });

  // 5. INTERSECT OBSERVER FOR REVEAL ANIMATIONS
  const revealElements = document.querySelectorAll('[data-reveal]');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => revealObserver.observe(el));

  // 6. HERO TERMINAL STREAMING LOGS
  const termOutput = document.getElementById('termOutput');
  if (termOutput) {
    const logs = [
      "> stackbase-gateway init --env production",
      "[INFO] Connected to Core Banking API (Mainframe COBOL 3270)",
      "[AUTH] Validating SSO OAuth2 bearer token for analyst maria.chen@tier1bank.com",
      "[RBAC] Enforcing Entitlements: READ_SETTLEMENT_BREAKS, EXECUTE_SSI_RECON",
      "[MCP] Exposing 14 Verified Capabilities via Model Context Protocol...",
      "[AUDIT] Session TXN-99481 logged to immutable ledger -> STATUS 200 OK"
    ];

    let lineIdx = 0;
    function typeNextLine() {
      if (lineIdx < logs.length) {
        const line = document.createElement('div');
        line.style.marginBottom = "6px";
        line.style.color = lineIdx === logs.length - 1 ? "var(--a)" : "var(--t1)";
        line.textContent = logs[lineIdx];
        termOutput.appendChild(line);
        lineIdx++;
        setTimeout(typeNextLine, 800);
      }
    }
    setTimeout(typeNextLine, 500);
  }

  // 7. TICKER TRACK POPULATION
  const tickerTrack = document.getElementById('tickerTrack');
  if (tickerTrack) {
    const tickerItems = [
      "Tier 1 Global Banks",
      "Zero Legacy Code Changes",
      "Model Context Protocol (MCP)",
      "Fail-Closed Governance",
      "Immutable Audit Lineage",
      "Just-In-Time Vaulted Secrets",
      "Columbia CS ARiSE Lab Research"
    ];
    const fullText = tickerItems.concat(tickerItems).map(item => `<span>✦ ${item}</span>`).join(' ');
    tickerTrack.innerHTML = fullText + ' ' + fullText;
  }
});
