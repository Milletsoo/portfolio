/* ========================================
   欧夏佚作品集 — 交互逻辑
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {

  // ==================== 泡泡导航 ====================
  var bubbles = document.querySelectorAll('.bubble');

  bubbles.forEach(function(bubble) {
    bubble.addEventListener('click', function(e) {
      e.preventDefault();
      var targetId = this.getAttribute('data-target');
      var target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ==================== 滚动渐入动画 ====================
  var revealElements = document.querySelectorAll(
    '.about-card, .vibe-card, .comp-card, .door-wrapper'
  );

  var observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.12
  };

  var revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(function(el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    revealObserver.observe(el);
  });

  // ==================== 门：点击保持打开 ====================
  var doorFronts = document.querySelectorAll('.door-front');

  doorFronts.forEach(function(dfront) {
    dfront.addEventListener('click', function(e) {
      e.stopPropagation();

      // 如果已经打开，就关闭
      if (this.classList.contains('door-open')) {
        this.classList.remove('door-open');
        return;
      }

      // 关闭其他门
      doorFronts.forEach(function(d) { d.classList.remove('door-open'); });

      // 打开当前门（全开）
      this.classList.add('door-open');
    });
  });

  // 点击空白关闭所有门
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.door-front')) {
      doorFronts.forEach(function(d) { d.classList.remove('door-open'); });
    }
  });

  // ==================== 二维码生成 ====================
  var qrContainer = document.getElementById('qrcode');
  if (qrContainer && typeof QRCode !== 'undefined') {
    new QRCode(qrContainer, {
      text: 'https://milletsoo.github.io/portfolio',
      width: 160,
      height: 160,
      colorDark: '#1B2A4A',
      colorLight: '#FFFFFF',
      correctLevel: QRCode.CorrectLevel.M
    });
  } else if (qrContainer) {
    qrContainer.innerHTML = '<span style="font-size:0.8rem;color:#8B95A5;">二维码<br>待生成</span>';
  }

});
