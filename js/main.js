/* ========================================
   欧夏佚作品集 — 交互逻辑
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {

  // ==================== 泡泡导航：点击平滑滚动 ====================
  const bubbles = document.querySelectorAll('.bubble');

  bubbles.forEach(bubble => {
    bubble.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('data-target');
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ==================== 滚动渐入动画 ====================
  const revealElements = document.querySelectorAll(
    '.about-card, .vibe-card, .comp-card, .door-wrapper'
  );

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.12
  };

  const revealObserver = new IntersectionObserver(function(entries) {
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

  // ==================== 门动画：点击扩展画廊 ====================
  const doors = document.querySelectorAll('.door');

  doors.forEach(function(door) {
    // Hover 时门的旋转动画由 CSS :hover 处理

    // Click：保持门打开状态，显示完整画廊
    door.addEventListener('click', function(e) {
      e.stopPropagation();

      // 如果已经打开，就关闭
      if (this.classList.contains('door-open')) {
        this.classList.remove('door-open');
        return;
      }

      // 关闭其他门
      doors.forEach(function(d) { d.classList.remove('door-open'); });

      // 打开当前门
      this.classList.add('door-open');
    });
  });

  // 点击空白区域关闭所有门
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.door')) {
      doors.forEach(function(d) { d.classList.remove('door-open'); });
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
    // 如果 QRCode 库未加载，显示提示
    qrContainer.innerHTML = '<span style="font-size:0.8rem;color:#8B95A5;">二维码<br>待生成</span>';
  }

  // ==================== 泡泡 hover 预览的触摸支持 ====================
  bubbles.forEach(function(bubble) {
    bubble.addEventListener('touchstart', function() {
      this.classList.add('bubble-touch');
    }, { passive: true });

    bubble.addEventListener('touchend', function() {
      var self = this;
      setTimeout(function() {
        self.classList.remove('bubble-touch');
      }, 1500);
    });
  });

});
