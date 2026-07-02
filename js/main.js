/* ========================================
   欧夏佚作品集 — 交互逻辑 v4
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {

  // ==================== 泡泡导航 ====================
  var bubbles = document.querySelectorAll('.bubble');
  bubbles.forEach(function(b) {
    b.addEventListener('click', function(e) {
      e.preventDefault();
      var t = document.getElementById(this.getAttribute('data-target'));
      if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // ==================== 滚动渐入 ====================
  var revealEls = document.querySelectorAll('.about-card, .vibe-card, .comp-card, .door-wrapper');
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        obs.unobserve(e.target);
      }
    });
  }, { rootMargin: '0px 0px -60px 0px', threshold: 0.12 });

  revealEls.forEach(function(el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    obs.observe(el);
  });

  // ==================== 门交互 ====================
  var stage = document.querySelector('.doors-stage');
  var wrappers = document.querySelectorAll('.door-wrapper');
  var fronts = document.querySelectorAll('.door-front');
  var pinnedWrapper = null; // 当前被点击固定的 wrapper

  // 关闭所有门（保留被 pin 的）
  function closeAllDoors() {
    wrappers.forEach(function(w) {
      if (w !== pinnedWrapper) {
        w.classList.remove('door-open');
      }
    });
  }

  // 打开指定门
  function openDoor(wrapper) {
    if (wrapper === pinnedWrapper) return; // 已经 pin 了就不动
    closeAllDoors();
    wrapper.classList.add('door-open');
  }

  // Hover：鼠标进入门面 → 打开
  fronts.forEach(function(front) {
    front.addEventListener('mouseenter', function() {
      if (pinnedWrapper) return; // 有 pin 的门时 hover 不切换
      openDoor(this.parentElement);
    });
  });

  // 鼠标离开整个舞台 → 全部关闭（除非有 pin）
  if (stage) {
    stage.addEventListener('mouseleave', function() {
      closeAllDoors();
    });
  }

  // Click：固定/取消固定
  fronts.forEach(function(front) {
    front.addEventListener('click', function(e) {
      e.stopPropagation();
      var wrapper = this.parentElement;

      if (pinnedWrapper === wrapper) {
        // 再次点击同一个 → 取消固定
        pinnedWrapper = null;
        wrapper.classList.remove('door-open');
      } else {
        // 固定当前门
        if (pinnedWrapper) pinnedWrapper.classList.remove('door-open');
        pinnedWrapper = wrapper;
        wrapper.classList.add('door-open');
      }
    });
  });

  // 点击页面空白处 → 取消所有固定
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.door-front') && !e.target.closest('.door-gallery')) {
      if (pinnedWrapper) {
        pinnedWrapper.classList.remove('door-open');
        pinnedWrapper = null;
      }
    }
  });

  // ==================== 二维码 ====================
  var qr = document.getElementById('qrcode');
  if (qr && typeof QRCode !== 'undefined') {
    new QRCode(qr, {
      text: 'https://milletsoo.github.io/portfolio',
      width: 160, height: 160,
      colorDark: '#1B2A4A', colorLight: '#FFFFFF',
      correctLevel: QRCode.CorrectLevel.M
    });
  } else if (qr) {
    qr.innerHTML = '<span style="font-size:0.8rem;color:#8B95A5;">二维码<br>待生成</span>';
  }

});
