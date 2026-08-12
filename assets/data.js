/* =====================================================================
   DỮ LIỆU MẪU CHO PROTOTYPE
   Mỗi trường ở đây tương ứng một dòng trong "Bảng nguồn dữ liệu" §9.4.
   Các trường đánh dấu `null` là để thử TRẠNG THÁI RỖNG (§16.3):
     baggage.checked = null   → "Hãng chưa công bố"  (không biết)
     baggage.checked = 0      → "Không kèm hành lý ký gửi" (không có)
   ===================================================================== */
(function () {
  'use strict';
  var BK = window.BK = window.BK || {};

  /* Logo hãng do BOOKESE TỰ QUẢN (§19.1) — ở đây dùng ô màu + mã hãng thay chỗ.
     Bàn giao thật cần bộ logo chuẩn hoá CÙNG CHIỀU CAO 48px, nền trong suốt. */
  BK.AIRLINES = {
    VN: { name: 'Vietnam Airlines',    color: '#1B3A6B', short: 'VN' },
    VJ: { name: 'Vietjet Air',         color: '#E1122E', short: 'VJ' },
    VU: { name: 'Vietravel Airlines',  color: '#008C4A', short: 'VU' },
    SC: { name: 'Sun PhuQuoc Airways', color: '#C8901F', short: 'SC' },
    QH: { name: 'Bamboo Airways',      color: '#0B7285', short: 'QH' },
    BL: { name: 'Pacific Airlines',    color: '#F5A623', short: 'BL' }
  };

  /* ------------------------------------------------------------------
     §10.3 — BẢNG ÁNH XẠ TÊN HẠNG VÉ (RB16)
     Hệ thống nguồn cung KHÔNG có trường riêng "tên hạng vé". Nó trả về:
       · Hạng đặt chỗ — một ký tự:  T · R · U · B
       · Mã giá — chuỗi, thường NHÚNG tên thương hiệu: T6VNRF · U1_DLX · B1_Skyboss
     Bookese tự quản bảng dưới đây và dựng tên hiển thị theo công thức:
       Tên hạng vé (mã)
     🔴 Luôn để mã trong ngoặc: bảng ánh xạ có thể sai/thiếu khi hãng đổi mã,
     mã trong ngoặc là phần LUÔN ĐÚNG vì đến thẳng từ hệ thống hãng.
     ⚠️ Bàn giao thật cần bảng này cho đủ 5 hãng nội địa (§23.2-2b).
     ------------------------------------------------------------------ */
  BK.FARE_NAMES = {
    VN: { T: 'Phổ thông tiết kiệm', R: 'Phổ thông tiết kiệm', K: 'Phổ thông tiết kiệm',
          M: 'Phổ thông linh hoạt', S: 'Phổ thông linh hoạt',
          D: 'Phổ thông đặc biệt linh hoạt', J: 'Thương gia' },
    VJ: { E: 'Eco', U1_DLX: 'Deluxe', B1_Skyboss: 'SkyBoss' },
    VU: { P: 'Phổ thông tiêu chuẩn', E: 'Eco' },
    SC: { Y: 'Phổ thông', W: 'Phổ thông đặc biệt' },
    BL: { A: 'Phổ thông' }
  };

  /* §10.3 — BA TRẠNG THÁI PHẢI THIẾT KẾ. Giao diện phải chịu được cả ba. */
  BK.fareLabel = function (al, code) {
    if (!code) return { state: 'none', text: '' };                        /* không có cả mã */
    var name = (BK.FARE_NAMES[al] || {})[code];
    if (name) return { state: 'mapped', text: name + ' (' + code + ')' }; /* có trong bảng */
    return { state: 'code', text: 'Hạng ' + code };                       /* không có trong bảng */
  };

  BK.AIRPORTS = {
    'Việt Nam': [
      ['HAN', 'Hà Nội', 'Sân bay Nội Bài'],
      ['SGN', 'TP. Hồ Chí Minh', 'Sân bay Tân Sơn Nhất'],
      ['DAD', 'Đà Nẵng', 'Sân bay Đà Nẵng'],
      ['PQC', 'Phú Quốc', 'Sân bay Phú Quốc'],
      ['CXR', 'Nha Trang', 'Sân bay Cam Ranh'],
      ['HUI', 'Huế', 'Sân bay Phú Bài'],
      ['VCA', 'Cần Thơ', 'Sân bay Cần Thơ'],
      ['HPH', 'Hải Phòng', 'Sân bay Cát Bi'],
      ['DLI', 'Đà Lạt', 'Sân bay Liên Khương'],
      ['UIH', 'Quy Nhơn', 'Sân bay Phù Cát'],
      ['VII', 'Vinh', 'Sân bay Vinh'],
      ['THD', 'Thanh Hóa', 'Sân bay Thọ Xuân']
    ],
    'Đông Dương': [
      ['PNH', 'Phnom Penh', 'Sân bay Phnom Penh'],
      ['REP', 'Siem Reap', 'Sân bay Siem Reap Angkor'],
      ['VTE', 'Viêng Chăn', 'Sân bay Wattay']
    ],
    'Đông Nam Á': [
      ['BKK', 'Bangkok', 'Sân bay Suvarnabhumi'],
      ['SIN', 'Singapore', 'Sân bay Changi'],
      ['KUL', 'Kuala Lumpur', 'Sân bay quốc tế Kuala Lumpur'],
      ['CGK', 'Jakarta', 'Sân bay Soekarno–Hatta'],
      ['MNL', 'Manila', 'Sân bay Ninoy Aquino']
    ],
    'Đông Bắc Á': [
      ['ICN', 'Seoul', 'Sân bay Incheon'],
      ['NRT', 'Tokyo', 'Sân bay Narita'],
      ['TPE', 'Đài Bắc', 'Sân bay Đào Viên'],
      ['HKG', 'Hồng Kông', 'Sân bay Hồng Kông']
    ],
    'Châu Âu': [
      ['CDG', 'Paris', 'Sân bay Charles de Gaulle'],
      ['FRA', 'Frankfurt', 'Sân bay Frankfurt'],
      ['LHR', 'London', 'Sân bay Heathrow']
    ]
  };

  /* ------------------------------------------------------------------
     Chuyến bay mẫu HAN → SGN · T5, 20 tháng 8, 2026
     Bộ dữ liệu này cố ý bao phủ mọi trường hợp khó phải vẽ:
       · nhãn +1 (hạ cánh hôm sau)      · nối chuyến + đổi sân bay
       · hành lý rỗng "không có"         · hành lý rỗng "không biết"
       · hết chỗ                         · hãng vận chuyển thực tế khác
       · đủ BA trạng thái tên hạng vé (§10.3):
           VN213 · VJ125 → có trong bảng ánh xạ  → "Phổ thông tiết kiệm (T)"
           VU102         → mã lạ, thiếu ánh xạ   → "Hạng W9" + dòng thuộc tính
           VJ199         → không có cả mã        → chỉ còn dòng thuộc tính

     `code`  = hạng đặt chỗ hoặc mã giá do hệ thống nguồn cung trả về
     `attrs` = dòng mô tả thuộc tính, dùng làm dự phòng khi thiếu tên ánh xạ
     ------------------------------------------------------------------ */
  BK.FLIGHTS = [
    {
      id: 'VJ125', al: 'VJ', no: 'VJ125', craft: 'Airbus A320',
      dep: '06:00', arr: '08:15', from: 'HAN', to: 'SGN', dur: "2h15'",
      stops: 0, seats: 4,
      code: 'E',
      cabin: '7kg', checked: 0,                 /* 0 = hãng thật sự không cho */
      refundable: false, changeable: false, changeFee: 470000,
      base: 900000, tax: 199000,
      fares: [
        { code: 'E',       attrs: 'Không ký gửi · Không hoàn', cabin: '7kg', checked: 0, refund: 'Không hoàn · Không đổi', seats: 4, base: 900000, tax: 199000 },
        { code: 'U1_DLX',  attrs: 'Ký gửi 20kg · Đổi được',    cabin: '7kg', checked: '20kg', refund: 'Không hoàn · Đổi 470.000', seats: 9, base: 1180000, tax: 199000 }
      ]
    },
    {
      id: 'VN213', al: 'VN', no: 'VN213', craft: 'Airbus A321',
      dep: '07:00', arr: '09:10', from: 'HAN', to: 'SGN', dur: "2h10'",
      stops: 0, seats: 9,
      code: 'T',
      cabin: '10kg', checked: '23kg',
      refundable: false, changeable: true, changeFee: 360000,
      base: 900000, tax: 352181,
      terminalFrom: 'Nhà ga 1', terminalTo: 'Nhà ga 3',
      fares: [
        { code: 'T', attrs: 'Ký gửi 23kg · Không hoàn', cabin: '10kg', checked: '23kg', refund: 'Không hoàn · Đổi 360.000', seats: 9, base: 900000, tax: 352181 },
        { code: 'M', attrs: 'Ký gửi 23kg · Đổi được',   cabin: '10kg', checked: '23kg', refund: 'Không hoàn · Đổi 250.000', seats: 5, base: 1008000, tax: 352181 },
        { code: 'D', attrs: 'Ký gửi 32kg · Hoàn được',  cabin: '10kg', checked: '32kg', refund: 'Hoàn được · Đổi miễn phí',  seats: 2, base: 1690000, tax: 352181 }
      ]
    },
    {
      id: 'VU102', al: 'VU', no: 'VU102', craft: 'Airbus A321',
      dep: '09:40', arr: '11:55', from: 'HAN', to: 'SGN', dur: "2h15'",
      stops: 0, seats: 12,
      code: 'W9',                               /* KHÔNG có trong bảng ánh xạ → "Hạng W9" */
      cabin: '7kg', checked: null,              /* null = HÃNG CHƯA CÔNG BỐ */
      refundable: false, changeable: true, changeFee: 400000,
      base: 986000, tax: 199000,
      fares: [
        { code: 'W9', attrs: 'Hãng chưa công bố ký gửi · Không hoàn', cabin: '7kg', checked: null, refund: 'Không hoàn · Đổi 400.000', seats: 12, base: 986000, tax: 199000 }
      ]
    },
    {
      id: 'VN255', al: 'VN', no: 'VN255 · VN1402', craft: 'Airbus A321 · ATR72',
      dep: '12:00', arr: '17:30', from: 'HAN', to: 'SGN', dur: "5h30'",
      stops: 1, stopAt: 'Đà Nẵng (DAD)', layover: "1h20'",
      changeAirport: 'Đổi sân bay tại Đà Nẵng — bạn cần tự di chuyển giữa hai nhà ga',
      seats: 6, cabin: '10kg', checked: '23kg',
      code: 'K',
      operatedBy: 'Pacific Airlines',
      refundable: false, changeable: true, changeFee: 360000,
      base: 820000, tax: 352181,
      fares: [
        { code: 'K', attrs: 'Ký gửi 23kg · Không hoàn', cabin: '10kg', checked: '23kg', refund: 'Không hoàn · Đổi 360.000', seats: 6, base: 820000, tax: 352181 }
      ]
    },
    {
      id: 'SC201', al: 'SC', no: 'SC201', craft: 'Boeing 737',
      dep: '15:20', arr: '17:35', from: 'HAN', to: 'SGN', dur: "2h15'",
      stops: 0, seats: 0, soldout: true,
      code: 'Y',
      cabin: '7kg', checked: '20kg',
      refundable: false, changeable: false,
      base: 1040000, tax: 199000, fares: []
    },
    {
      id: 'VJ199', al: 'VJ', no: 'VJ199', craft: 'Airbus A321neo',
      dep: '21:50', arr: '00:05', nextDay: true, from: 'HAN', to: 'SGN', dur: "2h15'",
      stops: 0, seats: 23,
      code: null,                               /* KHÔNG có cả mã → chỉ còn dòng thuộc tính */
      cabin: '7kg', checked: 0,
      refundable: false, changeable: false, changeFee: 470000,
      base: 690000, tax: 199000,
      fares: [
        { code: null, attrs: 'Không ký gửi · Không hoàn', cabin: '7kg', checked: 0, refund: 'Không hoàn · Không đổi', seats: 23, base: 690000, tax: 199000 }
      ]
    }
  ];

  /* ------------------------------------------------------------------
     §9.9 — CHIỀU VỀ SGN → HAN · T7, 22 tháng 8
     Khứ hồi chiếm ~60% lượt đặt (§7.2) nên đây là trường hợp phổ biến nhất,
     không phải ngoại lệ. Khách chọn TUẦN TỰ: xong chiều đi mới tới chiều về.
     ------------------------------------------------------------------ */
  BK.FLIGHTS_BACK = [
    {
      id: 'VU302', al: 'VU', no: 'VU302', craft: 'Airbus A321',
      dep: '05:35', arr: '07:50', from: 'SGN', to: 'HAN', dur: "2h15'",
      stops: 0, seats: 14, code: 'E',
      cabin: '7kg', checked: 0,
      refundable: false, changeable: false,
      base: 290000, tax: 148400,
      fares: [
        { code: 'E', attrs: 'Không ký gửi · Không hoàn', cabin: '7kg', checked: 0, refund: 'Không hoàn · Không đổi', seats: 14, base: 290000, tax: 148400 },
        { code: 'P', attrs: 'Ký gửi 20kg · Đổi được',    cabin: '7kg', checked: '20kg', refund: 'Không hoàn · Đổi 400.000', seats: 6, base: 520000, tax: 148400 }
      ]
    },
    {
      id: 'VN246', al: 'VN', no: 'VN246', craft: 'Airbus A321',
      dep: '09:00', arr: '11:10', from: 'SGN', to: 'HAN', dur: "2h10'",
      stops: 0, seats: 21, code: 'T',
      cabin: '10kg', checked: '23kg',
      refundable: false, changeable: true,
      base: 860000, tax: 352181,
      fares: [
        { code: 'T', attrs: 'Ký gửi 23kg · Không hoàn', cabin: '10kg', checked: '23kg', refund: 'Không hoàn · Đổi 360.000', seats: 21, base: 860000, tax: 352181 },
        { code: 'M', attrs: 'Ký gửi 23kg · Đổi được',   cabin: '10kg', checked: '23kg', refund: 'Không hoàn · Đổi 250.000', seats: 8, base: 990000, tax: 352181 }
      ]
    },
    {
      /* §9.4.2 · RB30 — Pacific khai thác nhưng BÁN dưới tên Vietnam Airlines,
         số hiệu mang mã VN. Hiển thị tên + logo VNA, kèm dòng "(điều hành bởi …)". */
      id: 'VN6025', al: 'VN', no: 'VN6025', craft: 'Airbus A320',
      dep: '13:25', arr: '15:35', from: 'SGN', to: 'HAN', dur: "2h10'",
      stops: 0, seats: 4, code: 'K',
      operatedBy: 'Pacific Airlines',
      cabin: '7kg', checked: 0,
      refundable: false, changeable: false,
      base: 420000, tax: 199000,
      fares: [
        { code: 'K', attrs: 'Không ký gửi · Không hoàn', cabin: '7kg', checked: 0, refund: 'Không hoàn · Không đổi', seats: 4, base: 420000, tax: 199000 }
      ]
    },
    {
      id: 'VJ168', al: 'VJ', no: 'VJ168', craft: 'Airbus A321neo',
      dep: '19:40', arr: '21:55', from: 'SGN', to: 'HAN', dur: "2h15'",
      stops: 0, seats: 32, code: 'E',
      cabin: '7kg', checked: 0,
      refundable: false, changeable: false,
      base: 355000, tax: 199000,
      fares: [
        { code: 'E', attrs: 'Không ký gửi · Không hoàn', cabin: '7kg', checked: 0, refund: 'Không hoàn · Không đổi', seats: 32, base: 355000, tax: 199000 }
      ]
    }
  ];

  /* §9.9 — hai chặng của hành trình khứ hồi mẫu */
  BK.TRIP_LEGS = [
    { id: 'go',   label: 'Chiều đi', route: 'HAN → SGN', city: 'Hà Nội → TP. Hồ Chí Minh', date: 'T5, 20 tháng 8' },
    { id: 'back', label: 'Chiều về', route: 'SGN → HAN', city: 'TP. Hồ Chí Minh → Hà Nội', date: 'T7, 22 tháng 8' }
  ];

  /* Phí dịch vụ Bookese — §1.1
     Nội địa 50.000đ / khách / chặng · Quốc tế 150.000đ / khách / chiều
     🔴 KHÔNG hiển thị thành dòng riêng trên màn bán hàng (RB10) — chỉ trong bảng tách giá. */
  BK.SERVICE_FEE_DOMESTIC = 50000;
  BK.SERVICE_FEE_INTL = 150000;

  /* Định mức xu — §1.2 · nội địa / khách / chặng */
  BK.COIN_TIERS = {
    guest:  { label: 'Khách vãng lai', dom: 0 },
    member: { label: 'Thành viên',     dom: 6000 },
    trav:   { label: 'Du khách',       dom: 12000 },
    agent:  { label: 'Đại lý',         dom: 15000 },
    amb:    { label: 'Đại sứ',         dom: 15000 }
  };

  BK.total = function (f) { return f.base + f.tax; };

  /* ------------------------------------------------------------------
     §11.5 — DỊCH VỤ THÊM · dữ liệu mẫu cho ma trận hành khách × chiều bay
     ⚠️ RB19 — trong sản phẩm thật, `PACKAGES` chỉ được lấy về KHI KHÁCH BẤM NÚT
     của đúng loại dịch vụ đó, và chỉ cho CHIỀU ĐANG XEM. Xem §11.6.
     ------------------------------------------------------------------ */
  /* 🔴 RB21 — MẢNG CHẶNG, không phải "chiều đi / chiều về" cố định.
     Khứ hồi = 2 phần tử · đa chặng = tới 6 (§7.2). Giao diện đọc mảng này,
     nên đổi số chặng không phải sửa bố cục. */
  BK.DIRECTIONS = [
    { id: 'go',   label: 'Chiều đi HAN→SGN',  date: 'T5 20/8', al: 'VN', cabin: '10kg', checked: '23kg' },
    { id: 'back', label: 'Chiều về SGN→HAN',  date: 'T7 22/8', al: 'VU', cabin: '7kg',  checked: 0 }
  ];

  /* Hành trình 4 chặng — dùng cho trạng thái trình bày §11.5.7 / §7.4 */
  BK.DIRECTIONS_MULTI = [
    { id: 'l1', label: 'HAN → SGN', date: 'T5 20/8', al: 'VN', cabin: '10kg', checked: '23kg' },
    { id: 'l2', label: 'SGN → DAD', date: 'T7 22/8', al: 'VJ', cabin: '7kg',  checked: 0 },
    { id: 'l3', label: 'DAD → HUI', date: 'CN 24/8', al: 'VU', cabin: '7kg',  checked: null },
    { id: 'l4', label: 'HUI → HAN', date: 'T3 26/8', al: 'VN', cabin: '10kg', checked: '23kg' }
  ];

  /* §11.4.1 — Quốc tịch và Nơi cấp đều là HỘP CHỌN QUỐC GIA, mặc định Việt Nam.
     Bàn giao thật cần danh mục quốc gia đầy đủ theo chuẩn hai ký tự. */
  BK.COUNTRIES = [
    'Việt Nam', 'Hoa Kỳ', 'Nhật Bản', 'Hàn Quốc', 'Trung Quốc', 'Đài Loan',
    'Thái Lan', 'Singapore', 'Malaysia', 'Indonesia', 'Philippines',
    'Campuchia', 'Lào', 'Úc', 'Pháp', 'Đức', 'Anh', 'Canada', 'Nga'
  ];

  BK.PASSENGERS = [
    { n: 1, name: 'NGUYEN VAN A', type: 'Người lớn', kind: 'adt' },
    { n: 2, name: 'TRAN THI B',   type: 'Trẻ em',    kind: 'chd' },
    { n: 3, name: 'LE VAN C',     type: 'Em bé',     kind: 'inf' }
  ];

  var BAG_A = [ { v: 0, t: 'Không mua thêm' }, { v: 216000, t: 'Thêm 15kg' }, { v: 302400, t: 'Thêm 23kg' }, { v: 453600, t: 'Thêm 32kg' } ];
  var BAG_B = [ { v: 0, t: 'Không mua thêm' }, { v: 189000, t: 'Thêm 15kg' }, { v: 259000, t: 'Thêm 20kg' } ];

  BK.PACKAGES = {
    bag: { go: BAG_A, back: BAG_B, l1: BAG_A, l2: BAG_B, l3: BAG_B, l4: BAG_A },
    svc: {}
  };

  /* Mỗi hành khách có NHIỀU dòng dịch vụ thay vì một (§11.5.4) */
  var SVC_FULL = [
    { key: 'meal',  icon: '🍽', label: 'Suất ăn', opts: [ { v: 0, t: 'Không chọn' }, { v: 145000, t: 'Cơm gà nướng' }, { v: 145000, t: 'Mì xào hải sản' }, { v: 99000, t: 'Suất chay' } ] },
    { key: 'wheel', icon: '♿', label: 'Xe lăn',  opts: [ { v: 0, t: 'Không cần' }, { v: 0, t: 'Cần hỗ trợ xe lăn' } ] },
    { key: 'prio',  icon: '⚡', label: 'Ưu tiên', opts: [ { v: 0, t: 'Không chọn' }, { v: 120000, t: 'Ưu tiên làm thủ tục' } ] }
  ];
  BK.PACKAGES.svc.go = SVC_FULL;
  BK.PACKAGES.svc.l1 = SVC_FULL;
  BK.PACKAGES.svc.l3 = SVC_FULL;
  /* Chiều về / chặng 2 · 4: hãng CHƯA MỞ BÁN → trạng thái rỗng, khác "đang tải" (§11.6.4) */
  BK.PACKAGES.svc.back = [];
  BK.PACKAGES.svc.l2 = [];
  BK.PACKAGES.svc.l4 = [];
})();
