/* =====================================================================
   BOOKESE — VÉ MÁY BAY · HÀNH VI DÙNG CHUNG
   Bản prototype giao diện. Không gọi API thật — dữ liệu mẫu ở data.js
   ===================================================================== */
(function () {
  'use strict';

  var BK = window.BK = window.BK || {};

  /* ------------------------------------------------------------------
     §5.1 — ĐỊNH DẠNG BẮT BUỘC (RB1)
     Tiền: `VND` đứng trước, cách một dấu cách, dấu CHẤM phân cách nghìn.
     ❌ 1.252.181đ   ❌ 1,252,181 VND   ❌ 1.252.181 VNĐ
     ------------------------------------------------------------------ */
  BK.money = function (n) {
    return 'VND ' + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };
  /* Giá rút gọn cho dải ngày và lịch: 1,2tr */
  BK.moneyShort = function (n) {
    return (Math.round(n / 100000) / 10).toString().replace('.', ',') + 'tr';
  };
  /* 🔴 §14.1 · RB32 — KHU QUẢN TRỊ dùng định dạng HẬU TỐ `160.000 VND`,
     trái với `VND 160.000` của trang khách hàng. Đây là NGOẠI LỆ CÓ CHỦ ĐÍCH:
     nhân viên vận hành đã quen mắt với định dạng hiện tại, đổi chỉ gây nhầm. */
  BK.moneyAdmin = function (n) {
    return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' VND';
  };

  BK.coin = function (n) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' Xu';
  };

  var DOW = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  BK.DOW = DOW;
  var pad = function (n) { return n < 10 ? '0' + n : '' + n; };

  BK.dateFull  = function (d) { return pad(d.getDate()) + '/' + pad(d.getMonth() + 1) + '/' + d.getFullYear(); };
  BK.dateShort = function (d) { return DOW[d.getDay()] + ', ' + pad(d.getDate()) + '/' + pad(d.getMonth() + 1); };
  /* Kiểu Bookese: `T5, 20 tháng 8` */
  BK.dateBookese = function (d) { return DOW[d.getDay()] + ', ' + d.getDate() + ' tháng ' + (d.getMonth() + 1); };
  BK.monthTitle  = function (y, m) { return 'Tháng ' + (m + 1) + ', ' + y; };

  /* Giá mẫu ổn định theo ngày (chỉ dùng cho prototype) */
  BK.priceOfDay = function (d) {
    var k = (d.getDate() * 37 + (d.getMonth() + 1) * 91) % 13;
    var w = (d.getDay() === 0 || d.getDay() === 6) ? 420000 : 0;
    return 1050000 + k * 45000 + w;
  };

  /* ------------------------------------------------------------------
     THANH ĐẦU TRANG — §3.4 / §8.2 (dựng bằng JS để 7 trang dùng chung)
     ------------------------------------------------------------------ */
  var NAV = [
    { id: 'luu-tru', label: 'Lưu trú',    icon: '🏠', href: '#' },
    { id: 'vmb',     label: 'Vé máy bay', icon: '✈',  href: 'index.html' },
    { id: 'kham-pha',label: 'Khám phá',   icon: '🧭', href: '#' },
    { id: 'doi-qua', label: 'Đổi quà',    icon: '🎁', href: '#' }
  ];

  BK.mountHeader = function (activeId) {
    var el = document.querySelector('[data-header]');
    if (!el) return;
    var pills = NAV.map(function (n) {
      var cls = 'navpill' + (n.id === activeId ? ' navpill--active' : '');
      return '<a class="' + cls + '" href="' + n.href + '"><span aria-hidden="true">' + n.icon + '</span>' + n.label + '</a>';
    }).join('');
    el.className = 'site-header';
    el.innerHTML =
      '<div class="container">' +
        '<a class="brand" href="index.html"><span class="brand__mark">B</span>bookese</a>' +
        '<nav class="navpills" aria-label="Dòng sản phẩm">' + pills + '</nav>' +
        '<div class="header-right">' +
          '<button class="btn btn--link" type="button">VND</button>' +
          '<span class="sep"></span>' +
          '<button class="btn btn--link" type="button">VN</button>' +
          '<span class="sep"></span>' +
          '<a class="btn btn--link" href="#">Đăng nhập</a>' +
          '<a class="btn btn--secondary" href="#" style="min-width:96px">Đăng ký</a>' +
        '</div>' +
      '</div>';
  };

  /* ------------------------------------------------------------------
     THANH ĐIỀU HƯỚNG PROTOTYPE (không thuộc sản phẩm)
     ------------------------------------------------------------------ */
  var SCREENS = [
    { f: 'index.html',        t: 'M1 · Tìm kiếm chuyến bay' },
    { f: 'ket-qua.html',      t: 'M2 + M3 · Kết quả & hạng vé' },
    { f: 'thanh-toan.html',   t: 'M4 · Thanh toán' },
    { f: 'xac-nhan.html',     t: 'M5 · Xác nhận (3 biến thể)' },
    { f: 'lich-su.html',      t: 'M6 · Lịch sử đặt chỗ' },
    { f: 'van-hanh.html',     t: 'M7 · Vận hành nội bộ' },
    { f: 'he-thong-thiet-ke.html', t: '★ Hệ thống thiết kế' }
  ];

  BK.mountProto = function (states) {
    var here = (location.pathname.split('/').pop() || 'index.html');
    var links = SCREENS.map(function (s) {
      return '<a href="' + s.f + '"' + (s.f === here ? ' class="is-here"' : '') + '>' + s.t + '</a>';
    }).join('');
    var st = (states || []).map(function (s) {
      return '<button type="button" data-proto-state="' + s.id + '">' + s.label + '</button>';
    }).join('');
    var box = document.createElement('div');
    box.className = 'proto';
    box.innerHTML =
      '<div class="proto__panel">' +
        '<h4>Màn hình</h4><div class="proto__links">' + links + '</div>' +
        (st ? '<h4>Trạng thái màn này</h4><div class="proto__states">' + st + '</div>' : '') +
      '</div>' +
      '<button class="proto__toggle" type="button">◧ Prototype</button>';
    document.body.appendChild(box);
    box.querySelector('.proto__toggle').addEventListener('click', function () {
      box.classList.toggle('proto--open');
    });
    box.addEventListener('click', function (e) {
      var b = e.target.closest('[data-proto-state]');
      if (b && typeof BK.onProtoState === 'function') BK.onProtoState(b.getAttribute('data-proto-state'));
    });
  };

  /* ------------------------------------------------------------------
     §13.3 — DÒNG CHUYẾN BAY, BIẾN THỂ CHỈ ĐỌC
     Dùng lại ở M5 (xác nhận) và M6 (lịch sử) để hai màn đó không vẽ lại
     một dòng chuyến bay kiểu khác. Không có nút Chọn, không có bộ chọn hạng vé.
     Bao gồm: tên hạng vé (RB16) · ghi chú hãng khai thác (RB30) · giá chặng (RB27).
     ------------------------------------------------------------------ */
  BK.legRow = function (lg, opts) {
    opts = opts || {};
    var al = BK.AIRLINES[lg.al] || { name: lg.al, color: '#575764', short: '??' };
    var chk = lg.checked === null ? '<span class="fl-amen__unknown">🧳 Hãng chưa công bố</span>'
            : lg.checked === 0 ? '<span class="fl-amen__none">🧳 Không kèm ký gửi</span>'
            : '🧳 Ký gửi ' + lg.checked;
    return '<div class="legro">' +
      '<span class="airline__logo" style="background:' + al.color + '">' + al.short + '</span>' +
      '<div class="legro__b">' +
        '<b>' + lg.label + ' · ' + lg.city + '</b>' +
        '<span>' + lg.date + ' · ' + lg.dep + ' – ' + lg.arr + (lg.nextDay ? '<sup class="plus1">+1</sup>' : '') +
          ' · ' + lg.dur + '</span>' +
        /* Tên hãng theo hãng BÁN VÉ; hãng khai thác chỉ là ghi chú (§9.4.2 · RB30) */
        '<span>' + al.name + ' · ' + lg.no + ' · ' + lg.craft + '</span>' +
        (lg.operatedBy ? '<span class="opnote">(điều hành bởi ' + lg.operatedBy + ')</span>' : '') +
        '<span><span class="fare-name-line">' + lg.fareName + '</span> · ' + (lg.stopText || 'Bay thẳng') + '</span>' +
        '<span class="u-text-secondary">🎒 Xách tay ' + lg.cabin + ' · ' + chk +
          (lg.seat ? ' · 💺 ' + lg.seat : '') + '</span>' +
        (lg.refundable ? '<span class="u-text-secondary">Hoàn được</span>'
                       : '<span class="fl-amen__norefund">Không hoàn</span>') +
      '</div>' +
      /* RB27 — giá của RIÊNG chặng đó, cho một khách */
      '<div class="legro__r">' +
        (opts.price === false ? '' :
          '<span class="legprice">' + BK.money(lg.price) + '</span> <span class="price__per">/khách</span>') +
        (opts.action || '') +
      '</div>' +
    '</div>';
  };

  /* ------------------------------------------------------------------
     THÔNG BÁO NỔI — §17.1 · góc trên phải · 312×64 · ~1,5 giây
     Kèm TỰ ĐỘNG CUỘN tới khối bị lỗi nếu truyền selector
     ------------------------------------------------------------------ */
  BK.toast = function (msg, opts) {
    opts = opts || {};
    var host = document.querySelector('.toaster');
    if (!host) { host = document.createElement('div'); host.className = 'toaster'; document.body.appendChild(host); }
    var t = document.createElement('div');
    t.className = 'toast' + (opts.type === 'error' ? ' toast--error' : '');
    t.setAttribute('role', 'status');
    t.innerHTML = '<span aria-hidden="true">' + (opts.type === 'error' ? '⚠️' : 'ℹ️') + '</span><span>' + msg + '</span><span class="toast__bar"></span>';
    host.appendChild(t);
    setTimeout(function () { t.remove(); }, 1500);
    if (opts.scrollTo) {
      var target = document.querySelector(opts.scrollTo);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  /* ------------------------------------------------------------------
     HỘP THOẠI
     ------------------------------------------------------------------ */
  BK.openDialog  = function (sel) { var d = document.querySelector(sel); if (d) { d.hidden = false; document.body.style.overflow = 'hidden'; } };
  BK.closeDialog = function (sel) { var d = document.querySelector(sel); if (d) { d.hidden = true;  document.body.style.overflow = ''; } };

  /* ------------------------------------------------------------------
     KHỞI TẠO HÀNH VI CHUNG (chạy trên mọi trang)
     ------------------------------------------------------------------ */
  function initGlobal() {

    /* Khối gấp mở M4 — mặc định MỞ HẾT (§11.1) */
    document.addEventListener('click', function (e) {
      var h = e.target.closest('.acc__head');
      if (!h) return;
      var acc = h.closest('.acc');
      acc.setAttribute('data-open', acc.getAttribute('data-open') === 'false' ? 'true' : 'false');
    });

    /* Khối bung/thu (giấy tờ tùy thân, hóa đơn…) */
    document.addEventListener('click', function (e) {
      var b = e.target.closest('.disclosure__btn');
      if (!b) return;
      var d = b.closest('.disclosure');
      d.setAttribute('data-open', d.getAttribute('data-open') === 'false' ? 'true' : 'false');
    });

    /* Tooltip tách chi tiết giá — §9.5 */
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.pricepop__btn');
      document.querySelectorAll('.pricepop__panel').forEach(function (p) {
        if (!btn || p !== btn.parentElement.querySelector('.pricepop__panel')) p.hidden = true;
      });
      if (btn) {
        var panel = btn.parentElement.querySelector('.pricepop__panel');
        panel.hidden = !panel.hidden;
        e.stopPropagation();
      }
    });

    /* Đóng popover khi bấm ra ngoài / bấm Esc */
    document.addEventListener('click', function (e) {
      if (e.target.closest('[data-pop]') || e.target.closest('[data-pop-panel]')) return;
      BK.closeAllPops();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      BK.closeAllPops();
      document.querySelectorAll('.overlay:not([hidden])').forEach(function (d) { d.hidden = true; });
      document.body.style.overflow = '';
      document.querySelectorAll('.pricepop__panel').forEach(function (p) { p.hidden = true; });
    });

    /* Đóng hộp thoại bằng nút ✕ / nền mờ / [data-close] */
    document.addEventListener('click', function (e) {
      if (e.target.classList && e.target.classList.contains('overlay')) {
        e.target.hidden = true; document.body.style.overflow = '';
      }
      var c = e.target.closest('[data-close]');
      if (c) { var ov = c.closest('.overlay'); if (ov) { ov.hidden = true; document.body.style.overflow = ''; } }
    });

    /* Ô nhiều dòng có chip đếm ký tự — §4.4 */
    document.querySelectorAll('.textarea[maxlength]').forEach(function (ta) {
      var chip = ta.parentElement.querySelector('.charcount');
      if (!chip) return;
      var max = ta.getAttribute('maxlength');
      var upd = function () {
        chip.textContent = ta.value.length + ' / ' + max;
        chip.classList.toggle('charcount--full', ta.value.length >= max * 1);
      };
      ta.addEventListener('input', upd); upd();
    });

    /* Ô đồng ý điều khoản mở khóa nút thanh toán — §11.8 */
    document.querySelectorAll('[data-gate]').forEach(function (cb) {
      var btn = document.querySelector(cb.getAttribute('data-gate'));
      if (!btn) return;
      var sync = function () { btn.disabled = !cb.checked; };
      cb.addEventListener('change', sync); sync();
    });
  }

  BK.closeAllPops = function () {
    document.querySelectorAll('[data-pop-panel]').forEach(function (p) { p.hidden = true; });
    document.querySelectorAll('[data-pop]').forEach(function (b) { b.classList.remove('sfield--open'); });
  };

  /* Bật/tắt một popover neo vào nút [data-pop="tênPanel"] */
  BK.togglePop = function (name, force) {
    var btn = document.querySelector('[data-pop="' + name + '"]');
    var panel = document.querySelector('[data-pop-panel="' + name + '"]');
    if (!panel) return;
    var willOpen = (force === undefined) ? panel.hidden : force;
    BK.closeAllPops();
    panel.hidden = !willOpen;
    if (btn) btn.classList.toggle('sfield--open', willOpen);
  };

  /* ------------------------------------------------------------------
     LỊCH CÓ GIÁ — §8.7 · hai tháng cạnh nhau · giá thấp nhất từng ngày
     Ba ràng buộc: không chọn quá khứ · tối đa 365 ngày · về sau đi
     ------------------------------------------------------------------ */
  BK.renderCalendar = function (host, state) {
    var today = new Date(); today.setHours(0, 0, 0, 0);
    var maxDate = new Date(today); maxDate.setDate(maxDate.getDate() + 365);

    function month(y, m) {
      var first = new Date(y, m, 1);
      var lead = (first.getDay() + 6) % 7;              /* tuần bắt đầu T2 */
      var days = new Date(y, m + 1, 0).getDate();
      var cells = '';
      for (var i = 0; i < lead; i++) cells += '<span></span>';
      for (var d = 1; d <= days; d++) {
        var dt = new Date(y, m, d);
        var dis = dt < today || dt > maxDate;
        var cls = 'cal-day';
        if (dt.getDay() === 0) cls += ' cal-day--sun';
        var iso = dt.getFullYear() + '-' + pad(dt.getMonth() + 1) + '-' + pad(dt.getDate());
        if (state.go && iso === state.go) cls += ' cal-day--sel';
        if (state.back && iso === state.back) cls += ' cal-day--sel';
        if (state.go && state.back && iso > state.go && iso < state.back) cls += ' cal-day--in';
        cells += '<button type="button" class="' + cls + '" data-day="' + iso + '"' + (dis ? ' disabled' : '') + '>' +
          '<span class="cal-day__n">' + d + '</span>' +
          (dis ? '' : '<span class="cal-day__p">' + BK.moneyShort(BK.priceOfDay(dt)) + '</span>') +
        '</button>';
      }
      return '<div class="cal-month"><div class="cal-month__title">' + BK.monthTitle(y, m) + '</div>' +
        '<div class="cal-grid">' + DOW.slice(1).concat(DOW[0]).map(function (n) {
          return '<div class="cal-dow' + (n === 'CN' ? ' cal-dow--sun' : '') + '">' + n + '</div>';
        }).join('') + cells + '</div></div>';
    }

    var base = state.cursor || new Date(today.getFullYear(), today.getMonth(), 1);
    var y = base.getFullYear(), m = base.getMonth();
    var n = new Date(y, m + 1, 1);
    host.innerHTML =
      '<div class="cal-nav">' +
        '<button class="btn btn--icon" type="button" data-cal-prev aria-label="Tháng trước">‹</button>' +
        '<span class="text-body-small-medium u-text-label">Giá hiển thị là giá thấp nhất cho 1 khách</span>' +
        '<button class="btn btn--icon" type="button" data-cal-next aria-label="Tháng sau">›</button>' +
      '</div>' +
      '<div class="cal-months">' + month(y, m) + month(n.getFullYear(), n.getMonth()) + '</div>';
  };

  /* ------------------------------------------------------------------
     ĐỒNG HỒ GIỮ CHỖ — §11.9
     Bình thường #D6EEFF → dưới 5 phút vàng → hết hạn đỏ + hộp thoại §17.6
     ------------------------------------------------------------------ */
  BK.startHold = function (el, totalSec, onExpire) {
    var left = totalSec;
    var fill = el.querySelector('.holdbar__fill');
    var out  = el.querySelector('[data-hold-left]');
    var abs  = el.querySelector('[data-hold-until]');
    if (abs) {
      var end = new Date(Date.now() + totalSec * 1000);
      abs.textContent = pad(end.getHours()) + ':' + pad(end.getMinutes());
    }
    var tick = function () {
      if (out) out.textContent = pad(Math.floor(left / 60)) + ':' + pad(left % 60);
      if (fill) fill.style.width = Math.max(0, (left / totalSec) * 100) + '%';
      el.classList.toggle('holdbar--warn', left <= 300 && left > 0);
      el.classList.toggle('holdbar--danger', left <= 0);
      if (left <= 0) { clearInterval(id); if (onExpire) onExpire(); return; }
      left--;
    };
    tick();
    var id = setInterval(tick, 1000);
    return { stop: function () { clearInterval(id); }, set: function (s) { left = s; } };
  };

  /* ------------------------------------------------------------------
     SƠ ĐỒ CHỖ NGỒI — §11.6 · 7 trạng thái màu (§3.1)
     Cột lối đi là KHOẢNG TRỐNG. Ghế ≥ 44×44px.
     ------------------------------------------------------------------ */
  BK.SEAT_LEGEND = [
    { k: 'free',     label: 'Ghế miễn phí',            v: 'var(--seat-free)' },
    { k: 'standard', label: 'Ghế tiêu chuẩn có phí',   v: 'var(--seat-standard)' },
    { k: 'infant',   label: 'Phù hợp bế em bé',        v: 'var(--seat-infant)' },
    { k: 'window',   label: 'Cạnh cửa sổ',             v: 'var(--seat-window)' },
    { k: 'aisle',    label: 'Cạnh lối đi',             v: 'var(--seat-aisle)' },
    { k: 'exit',     label: 'Gần cửa thoát hiểm',      v: 'var(--seat-exit)' },
    { k: 'taken',    label: 'Đã có người',             v: 'var(--seat-taken-bd)' }
  ];

  BK.renderSeatmap = function (host, rows) {
    rows = rows || 22;
    var cols = ['A', 'B', 'C', 'D', 'E', 'F'];
    var html = '';
    for (var r = 1; r <= rows; r++) {
      html += '<div class="seat-row"><span class="seat-row__n">' + r + '</span>';
      cols.forEach(function (c, i) {
        if (i === 3) html += '<span class="seat-aisle-gap"></span>';
        var id = r + c;
        var taken = ((r * 7 + c.charCodeAt(0)) % 5) === 0;
        var kind = 'standard', price = 80000;
        if (c === 'A' || c === 'F') { kind = 'window'; price = 120000; }
        else if (c === 'C' || c === 'D') { kind = 'aisle'; price = 100000; }
        if (r === 12 || r === 13) { kind = 'exit'; price = 180000; }
        if (r >= 18) { kind = 'free'; price = 0; }
        if (r === 4 || r === 5) { kind = 'infant'; price = 60000; }
        if (taken) kind = 'taken';
        html += '<button type="button" class="seat seat--' + kind + '"' +
                ' data-seat="' + id + '" data-kind="' + kind + '" data-price="' + price + '"' +
                (taken ? ' disabled aria-label="Ghế ' + id + ' đã có người"' : ' aria-label="Ghế ' + id + '"') +
                '>' + id + '</button>';
      });
      html += '</div>';
    }
    host.innerHTML = html;
  };

  document.addEventListener('DOMContentLoaded', initGlobal);
})();
