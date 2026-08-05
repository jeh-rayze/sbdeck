/* ================================================================
   STACKBASE SYSTEMS — CLEAN INTERACTIVE ENGINE
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // Enhanced Interactive Grid Canvas Animation
  const gridCanvas = document.getElementById('grid-canvas');
  if (gridCanvas) {
    const ctx = gridCanvas.getContext('2d');
    let animationId;
    let hoveredCells = new Map(); // Track hovered cells
    
    function resizeCanvas() {
      gridCanvas.width = gridCanvas.offsetWidth;
      gridCanvas.height = gridCanvas.offsetHeight;
    }
    
    const gridSize = 60; // Size of each grid cell
    const fadeSpeed = 0.05; // How fast cells fade out
    
    // Mouse tracking
    let mouseX = -1000;
    let mouseY = -1000;
    
    gridCanvas.addEventListener('mousemove', (e) => {
      const rect = gridCanvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      
      // Calculate which cell is hovered
      const cellX = Math.floor(mouseX / gridSize);
      const cellY = Math.floor(mouseY / gridSize);
      const cellKey = `${cellX},${cellY}`;
      
      // Add or update hovered cell
      if (!hoveredCells.has(cellKey)) {
        hoveredCells.set(cellKey, 1.0); // Full brightness
      }
    });
    
    gridCanvas.addEventListener('mouseleave', () => {
      mouseX = -1000;
      mouseY = -1000;
    });
    
    function drawGrid() {
      ctx.clearRect(0, 0, gridCanvas.width, gridCanvas.height);
      
      // Draw grid lines
      ctx.strokeStyle = 'rgba(232, 146, 60, 0.08)';
      ctx.lineWidth = 1;
      
      // Vertical lines
      for (let x = 0; x < gridCanvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, gridCanvas.height);
        ctx.stroke();
      }
      
      // Horizontal lines
      for (let y = 0; y < gridCanvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(gridCanvas.width, y);
        ctx.stroke();
      }
      
      // Draw lit cells
      hoveredCells.forEach((brightness, key) => {
        const [cellX, cellY] = key.split(',').map(Number);
        const x = cellX * gridSize;
        const y = cellY * gridSize;
        
        // Draw glowing cell background with amber/yellow theme
        const gradient = ctx.createRadialGradient(
          x + gridSize / 2, y + gridSize / 2, 0,
          x + gridSize / 2, y + gridSize / 2, gridSize * 0.7
        );
        gradient.addColorStop(0, `rgba(232, 146, 60, ${brightness * 0.4})`);
        gradient.addColorStop(0.5, `rgba(245, 168, 85, ${brightness * 0.25})`);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, gridSize, gridSize);
        
        // Draw bright border
        ctx.strokeStyle = `rgba(232, 146, 60, ${brightness * 0.8})`;
        ctx.lineWidth = 2;
        ctx.strokeRect(x + 1, y + 1, gridSize - 2, gridSize - 2);
        
        // Fade out
        hoveredCells.set(key, brightness - fadeSpeed);
        if (brightness <= 0) {
          hoveredCells.delete(key);
        }
      });
      
      animationId = requestAnimationFrame(drawGrid);
    }
    
    resizeCanvas();
    drawGrid();
    
    window.addEventListener('resize', () => {
      cancelAnimationFrame(animationId);
      resizeCanvas();
      drawGrid();
    });
  }

  // Enhanced Aurora Canvas Animation
  const auroraCanvas = document.getElementById('aurora-canvas');
  if (auroraCanvas) {
    const ctx = auroraCanvas.getContext('2d');
    let particles = [];
    
    function resizeAurora() {
      auroraCanvas.width = window.innerWidth;
      auroraCanvas.height = window.innerHeight;
    }
    
    class Particle {
      constructor() {
        this.x = Math.random() * auroraCanvas.width;
        this.y = Math.random() * auroraCanvas.height;
        this.size = Math.random() * 120 + 60;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.25 + 0.1;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > auroraCanvas.width) this.x = 0;
        if (this.x < 0) this.x = auroraCanvas.width;
        if (this.y > auroraCanvas.height) this.y = 0;
        if (this.y < 0) this.y = auroraCanvas.height;
      }
      
      draw() {
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
        gradient.addColorStop(0, `rgba(232, 146, 60, ${this.opacity})`);
        gradient.addColorStop(0.5, `rgba(139, 92, 246, ${this.opacity * 0.6})`);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
      }
    }
    
    function initParticles() {
      particles = [];
      for (let i = 0; i < 4; i++) {
        particles.push(new Particle());
      }
    }
    
    function animateAurora() {
      ctx.clearRect(0, 0, auroraCanvas.width, auroraCanvas.height);
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      requestAnimationFrame(animateAurora);
    }
    
    resizeAurora();
    initParticles();
    animateAurora();
    
    window.addEventListener('resize', () => {
      resizeAurora();
      initParticles();
    });
  }

  // Enhanced Email Copy Functionality
  document.querySelectorAll('[data-copy-email]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (btn.href && btn.href.startsWith('mailto:')) {
        e.preventDefault();
        const email = btn.href.replace('mailto:', '');
        navigator.clipboard.writeText(email).then(() => {
          const originalText = btn.textContent || btn.innerText;
          const originalBg = btn.style.background;
          const originalBorder = btn.style.borderColor;
          const originalColor = btn.style.color;
          
          btn.textContent = '✓ Email copied!';
          btn.style.background = 'rgba(16, 185, 129, 0.2)';
          btn.style.borderColor = 'rgba(16, 185, 129, 0.5)';
          btn.style.color = '#10B981';
          
          setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = originalBg;
            btn.style.borderColor = originalBorder;
            btn.style.color = originalColor;
          }, 2500);
        });
      }
    });
  });

  // Enhanced Smooth Scroll with Offset
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href !== '#' && href !== '#top') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const offset = 80;
          const targetPosition = target.offsetTop - offset;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

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

  // 4. SCROLL PROGRESS
  window.addEventListener('scroll', () => {
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalScroll);
    const scrollProgress = document.getElementById('scroll-progress');
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
        line.style.opacity = "0";
        line.style.transform = "translateX(-10px)";
        
        // Enhanced color coding for different log types
        if (logs[lineIdx].includes('[INFO]')) {
          line.style.color = "var(--t-muted)";
        } else if (logs[lineIdx].includes('[AUTH]') || logs[lineIdx].includes('[RBAC]')) {
          line.style.color = "var(--amber-bright)";
        } else if (logs[lineIdx].includes('[AUDIT]') || logs[lineIdx].includes('STATUS 200 OK')) {
          line.style.color = "var(--emerald)";
          line.style.fontWeight = "600";
        } else if (logs[lineIdx].includes('[MCP]')) {
          line.style.color = "var(--amber)";
        } else {
          line.style.color = "var(--t-main)";
        }
        
        line.textContent = logs[lineIdx];
        termOutput.appendChild(line);
        
        // Enhanced animate in
        requestAnimationFrame(() => {
          line.style.transition = "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
          line.style.opacity = "1";
          line.style.transform = "translateX(0)";
        });
        
        lineIdx++;
        setTimeout(typeNextLine, 850);
      }
    }
    setTimeout(typeNextLine, 600);
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
    const fullText = tickerItems.concat(tickerItems).map(item => `<span style="display:inline-block;transition:color 0.3s ease;">✦ ${item}</span>`).join(' ');
    tickerTrack.innerHTML = fullText + ' ' + fullText;
    
    // Enhanced: Highlight on hover
    tickerTrack.querySelectorAll('span').forEach(span => {
      span.addEventListener('mouseenter', () => {
        span.style.color = 'var(--amber-bright)';
      });
      span.addEventListener('mouseleave', () => {
        span.style.color = '';
      });
    });
  }

});
