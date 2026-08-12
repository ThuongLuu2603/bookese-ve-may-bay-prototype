# Giao diện Vé máy bay — Bookese.com

Bản dựng giao diện (prototype chạy được trên trình duyệt) theo
**ĐẶC TẢ GIAO DIỆN SẢN PHẨM VÉ MÁY BAY · Bookese.com v1.0** (07/08/2026).

Mở bằng cách bấm đúp vào `index.html`. Không cần cài đặt gì.

---

## 1. Các trang

| Tệp | Màn hình | Nội dung theo đặc tả |
|---|---|---|
| `index.html` | **M1** Tìm kiếm chuyến bay | §8 — hộp tìm kiếm, bộ chọn sân bay, lịch có giá, popover số khách |
| `ket-qua.html` | **M2 + M3** Kết quả và chọn hạng vé | §9, §10 — **khứ hồi chọn tuần tự §9.9**, **huy hiệu §9.4.1**, **hãng khai thác §9.4.2**, bộ chọn hạng vé trên dòng §10.4.3, điều kiện vé theo từng hạng §10.4.5 |
| `thanh-toan.html` | **M4** Thanh toán | §11 — một trang, 4 khối gấp mở, cột tóm tắt vé xé, **ma trận dịch vụ thêm §11.5**, **kiểm soát lượt gọi §11.6**, sơ đồ ghế theo từng hành khách, đồng hồ giữ chỗ |
| `xac-nhan.html` | **M5** Xác nhận | §12 — cả ba biến thể A (đã xuất vé) / B (đang xuất vé) / C (cần hỗ trợ) |
| `lich-su.html` | **M6** Lịch sử đặt chỗ | §13 — bám **trang đang chạy** `/booking-history`: **bốn tab** + dải chip loại dịch vụ, thẻ đơn theo khung thẻ đơn phòng, chi tiết **tám khối** |
| `van-hanh.html` | **M7** Vận hành nội bộ | §14 — 🔴 **hệ thiết kế RIÊNG** (`assets/admin.css`), bảng 8 cột, 7 thẻ chi tiết, nhật ký kỹ thuật, dùng lại `/manager-operation` |
| `he-thong-thiet-ke.html` | Tham chiếu | §3–§5, §20–§22 — màu, chữ, kích thước, quy cách giá, 33 thành phần, 36 điều cấm |

Góc dưới bên trái mỗi trang có nút **◧ Prototype** — chuyển nhanh giữa các màn hình
và bật/tắt **từng trạng thái** của màn hình đang xem (đang tải, rỗng, lỗi, hết hạn…).
Thanh này chỉ phục vụ trình bày, **không thuộc sản phẩm**.

## 2. Tệp dùng chung

| Tệp | Vai trò |
|---|---|
| `assets/tokens.css` | Biến màu, kiểu chữ, bo góc, đổ bóng, kích thước — toàn bộ §3 |
| `assets/components.css` | 33 thành phần, mỗi khối có chú thích trỏ về mục trong đặc tả |
| `assets/app.js` | Định dạng tiền/ngày, lịch có giá, đồng hồ giữ chỗ, sơ đồ ghế, **dòng chuyến bay chỉ đọc** (`BK.legRow`), thông báo nổi, hộp thoại |
| `assets/data.js` | Dữ liệu mẫu — cố ý bao phủ các trường hợp khó (xem §4 dưới đây) |
| `assets/admin.css` | 🔴 **Hệ thiết kế riêng của khu quản trị** (RB32) — Bootstrap 5 + BEM. `van-hanh.html` **không** nạp `tokens.css`/`components.css` |

## 3. Những gì bản dựng này bảo đảm

**36 ràng buộc §20** đều được thể hiện trong mã và có chú thích tại chỗ:

- `VND 1.252.181` — đơn vị đứng trước, dấu chấm phân cách nghìn (RB1)
- Không thanh tiến trình; M4 là một trang, bốn khối gấp mở, mặc định mở hết (RB2)
- Cột tóm tắt 286px kiểu vé xé: hai thẻ trắng + đường đứt nét + hai hình tròn 20px `#F2F4F8` (RB3)
- Thẻ và dòng danh sách **không đổ bóng**; bóng chỉ cho hộp tìm kiếm, hộp thoại, tooltip, thông báo nổi (RB4)
- Nhãn đặt trên ô nhập, viền chuyển đen khi được chọn (RB5)
- Không có chế độ tối — không có `prefers-color-scheme: dark` trong toàn bộ CSS (RB6)
- Màu giá tiền là đen `#121314` (RB7)
- Nút bo 8px cao 48px, chỉ dãy điều hướng đầu trang được bo tròn (RB8)
- Giá hiển thị là giá cho **một khách**, kèm hậu tố `/khách` (RB9)
- Giá gộp hai dòng; phí dịch vụ Bookese **chỉ** tách ra trong bảng tách chi tiết (RB10, RB13)
- Xu nằm ngoài khối tính tiền, không dấu trừ, luôn kèm "sau chuyến bay" (RB12)
- Không ô nào tích sẵn cho dịch vụ có phí; ô đồng ý dữ liệu cá nhân riêng biệt (RB14, RB15)
- Tên hạng vé dựng từ **bảng ánh xạ**, dạng `Tên hạng vé (mã)`, đủ 3 trạng thái dự phòng, ô co giãn (RB16)
- Hành lý có hai trạng thái rỗng khác nhau; không có thanh trượt lọc theo kg (RB17)
- Điều kiện vé là vùng văn bản tự do, chiều cao thay đổi (RB18)
- Dữ liệu dịch vụ thêm **chỉ tải khi khách bấm nút**, theo chặng bay, có đệm phiên (RB19)
- Dịch vụ thêm chọn được cho **từng hành khách** — ma trận hành khách × chặng bay, sơ đồ ghế có dãy thẻ hành khách (RB20)
- Mọi màn hình **chịu được 1 đến 6 chặng** — dữ liệu là mảng chặng, không phải "đi/về" cố định (RB21)
- Cột tóm tắt **tách ba dòng dịch vụ thêm**, dòng bằng 0 ẩn hẳn (RB22)
- Điều kiện vé **thuộc về TỪNG HẠNG VÉ**, mỗi hạng một liên kết đặt cạnh hạng đó (RB25)
- **Đổi hạng vé ngay trên dòng kết quả**, 0 lượt gọi; nút Chọn đặt thẳng hạng đang hiển thị (RB26)
- M4 khối ① **hiện giá từng chặng** + hai dòng cộng dồn, khớp tuyệt đối với cột tóm tắt (RB27)
- Thẻ hành khách là **lưới ba cột ba hàng**, không khối gấp mở lồng nhau (RB28)
- Huy hiệu **kiểm chứng được**, tối đa 1 huy hiệu so sánh mỗi dòng, tính lại sau mỗi lần lọc (RB29)
- Hãng khai thác khác hãng bán vé thì **ghi rõ** — Pacific hiện thành Vietnam Airlines kèm dòng ghi chú (RB30)
- Có **bảng hướng dẫn nhập họ tên** kèm ảnh hộ chiếu mẫu tự dựng (RB31)
- Dòng chuyến bay **cao tối đa 108px**, ba hàng, cả dòng bấm được (RB36)
- Khối giấy tờ có **bốn ô**: loại · số · ngày hết hạn · quốc tịch (RB23)
- Có **ô thẻ hội viên hãng bay** — MỘT ô trong lưới, bổ sung được sau khi đặt ở M5 · M6 (RB24)

### Giấy tờ tùy thân và thẻ hội viên (§11.4 – §11.4.3)

Thẻ hành khách giờ là **lưới ba cột, ba hàng** — không còn khối gấp mở lồng bên trong (RB28):

| Hàng | Ô 1 | Ô 2 | Ô 3 |
|---|---|---|---|
| 1 | Danh xưng * | Họ * | Tên đệm & tên * |
| 2 | Ngày sinh | Quốc tịch * | Số thẻ hội viên |
| 3 *(chỉ khi khai giấy tờ)* | Loại giấy tờ * | Số giấy tờ * | Ngày hết hạn * |

| Thao tác ở M4 | Kết quả |
|---|---|
| Chặng nội địa | Ẩn hàng 3 và ô quốc tịch; thay bằng **liên kết** `+ Thêm giấy tờ tùy thân` — không phải khối gấp mở |
| Bấm `+ Thêm giấy tờ tùy thân` | Hiện đủ ba hàng ngay trong lưới |
| Trạng thái **"Chặng quốc tế"** | Hiện đủ ba hàng từ đầu, **Quốc tịch** thành bắt buộc |
| Chọn **Căn cước công dân** | Ẩn ô ngày hết hạn · số chỉ nhận **12 chữ số** |
| Chọn **Hộ chiếu** | Hiện ô ngày hết hạn; ghi chú cuối thẻ thêm mốc *"sau 20/02/2027"* |

❌ **Không có** ô *Nơi cấp* (hệ thống tự đặt bằng quốc tịch), ô *Ngày cấp*,
và ô *"tên trên giấy tờ khác tên đặt vé"* (§21-22 — tên trên vé bắt buộc trùng giấy tờ).
🔴 **Một dòng ghi chú duy nhất** ở cuối thẻ, gộp cảnh báo tên và cảnh báo hạn hộ chiếu.

**Thẻ hội viên là MỘT Ô** trong lưới (§11.4.2), không phải khối gấp mở. Hành trình một hãng
thì nhãn ghi thẳng tên hãng (`Số thẻ Vietravel`); nhiều hãng thì hộp chọn hãng **gắn liền**
bên trái ô số thẻ, kèm ghi chú phạm vi áp dụng.

**Bổ sung sau khi đặt.** M5 có dải nhắc *"Bạn có thẻ hội viên hãng bay?"*; M6 có nút
**Thêm / sửa thẻ hội viên** và **Bổ sung giấy tờ** ở từng hành khách. Sau khi gửi, giao diện
chỉ nói **"đã gửi cho hãng"** — không dấu tích xanh, không hứa "đã cộng dặm" (§21-17).
Trạng thái **"Đã qua giờ bay"** ở M5 cho thấy nút bị ẩn.

⚠️ Khối thẻ hội viên (dặm bay của hãng) và khối xu (hạng thành viên Bookese) **cố ý tách xa nhau**
trên M5 — §21-18 cấm đặt cạnh nhau vì khách sẽ hiểu nhầm hai thứ là một.

### Dòng chuyến bay — dựng lại còn 108px (§9.4 · RB36)

§9.4 được viết lại sau khi dựng thử: bản trước cao **~570px**, màn 1080px chỉ thấy hai chuyến.
Đã gói lại còn **ba hàng, 108px** (127px khi có dòng *điều hành bởi*) — đo trực tiếp trên trình duyệt.

| Hàng | Nội dung | Cao |
|---|---|---|
| 1 | Logo 32px · hãng · số hiệu · tàu bay · huy hiệu · số chỗ *(chỉ khi ≤5)* | 20px |
| 2 | Giờ đi — dải thời lượng — giờ đến · giá 20/700 + ▾ bên phải | 36px |
| 3 | Hạng vé · xách tay · ký gửi · hoàn vé · chip xu · nút **Chọn** 36×96 | 20px |

**Đã bỏ khỏi dòng** theo §21-33…36: hàng sáu biểu tượng tiện ích · thanh *"Xem hành trình và các
hạng vé"* · logo khối 82px · *"Còn 32 chỗ"* · dòng *"Giá người lớn — xem chi tiết…"* · viền trái.
Không mất thông tin: bảng nổi hạng vé nay mở bằng cách bấm **tên hạng vé** ở hàng 3, và
giải thích giá nằm trong tooltip **ⓘ**.

**Cả dòng bấm được** để mở panel; bốn vùng con (nút Chọn · giá ▾ · ⓘ · tên hạng vé) chặn sự kiện
lan lên dòng cha — đã kiểm chứng từng vùng. Khoảng cách hai dòng còn **8px**, dòng đang mở
đổi viền `#0064FD` nhưng nền vẫn trắng.

Điện thoại: ~102px, logo 28px, ẩn tàu bay và nút Chọn, tên hãng rút gọn.

### Khứ hồi — chọn tuần tự ở M2 (§9.9)

Khứ hồi chiếm ~60% lượt đặt nên M2 dựng cho nó trước. Không dùng hai cột song song:
ở 1280px mỗi cột chỉ còn ~620px, không đủ cho dòng chuyến bay ở §9.4.

| Trạng thái | Màn hình có gì |
|---|---|
| **1 · Đang chọn chiều đi** | Thanh chỉ báo dính ở đầu (`● Chiều đi` / `○ Chiều về`) + danh sách chiều đi |
| **2 · Đã chọn chiều đi** | Dòng thu gọn nền `#F5F9FF` viền trái 3px kèm nút `Đổi` · dải nhắc `ⓘ Chọn chuyến bay chiều về` · danh sách chiều về · **thanh dính đáy 76px** hiện ra |
| **3 · Đã chọn cả hai** | Thanh đáy đổi thành `Tổng VND 1.690.581 /khách × 3 khách`, nút `Tiếp tục` bật |

🔴 Ba điều đã kiểm chứng bằng thao tác thật: khách luôn biết đang chọn chiều nào ·
**sửa chiều đi KHÔNG xóa chiều về** (lỗi hay gặp nhất của luồng khứ hồi) ·
chỉ gọi kiểm tra giá **một lần** sau khi chọn đủ hai chiều.

### Huy hiệu và hãng khai thác ở M2 (§9.4.1 – §9.4.2)

Huy hiệu tính từ **tập kết quả hiện có**, 0 lượt gọi, tính lại khi đổi hạng vé và khi lọc lại.
Nhóm A tối đa **1** huy hiệu mỗi dòng, xét theo thứ tự ưu tiên. Bảy loại nhãn áp lực giả
(*giá sắp tăng*, *12 người đang xem*, đồng hồ đếm ngược ở dòng kết quả…) bị **cấm** — xem
trang hệ thống thiết kế mục 9c.

**Pacific Airlines**: tên và logo hiển thị là **Vietnam Airlines** (hãng bán vé), kèm dòng
**(điều hành bởi Pacific Airlines)**. Xem chuyến `VN6025` ở danh sách chiều về của M2,
và trạng thái **"Chặng liên danh"** ở thanh Prototype của M4. Chuyến không liên danh thì
dòng này **ẩn hẳn** — đúng quy tắc.

### Hướng dẫn nhập họ tên ở M4 (§11.4.2 · RB31)

Liên kết `ⓘ Hướng dẫn nhập họ, tên đệm và tên.` nằm ngay dưới cặp ô Họ / Tên đệm & tên.
🔴 **Không bao giờ tự mở** — đây là hướng dẫn, không phải cảnh báo.
Bảng nền tối 420px có 4 gạch đầu dòng và **ảnh hộ chiếu mẫu vẽ bằng SVG** với mũi tên nối
từ *Family (Last name)* → **Họ** và *Given name* → **Tên đệm và tên**.

🔴 §21-28 — ảnh hộ chiếu là **ảnh mẫu Bookese tự dựng**, không dùng hộ chiếu người thật.

Bốn quy tắc kiểm tra đi kèm, đã đo bằng thao tác thật:

| Gõ vào ô Họ | Kết quả |
|---|---|
| `Nguyễn` | → `Nguyen`, ghi chú *"Đã bỏ dấu theo yêu cầu của hãng"* — **tự sửa êm, không báo lỗi** |
| `Tran@#` | → `Tran`, báo *"Họ và tên chỉ được chứa chữ cái."* |
| `tran` rồi rời ô | → `TRAN` — tự viết hoa, không báo lỗi |
| Để trống ô Tên | Báo *"Nếu tên chỉ có một chữ, điền MR hoặc MRS vào ô Họ."* |

### Chọn và đổi hạng vé ở M2 (§10.4 · RB25 · RB26)

| Thao tác | Lượt gọi | Kết quả |
|---|---|---|
| Bấm vào **giá có mũi ▾** | **0** | Danh sách hạng vé: tên · mã hạng chỗ · giá · số chỗ còn |
| Chọn một hạng khác | **0** | Giá, tên hạng, hành lý, nhãn hoàn vé, số chỗ trên dòng **đổi ngay** |
| Chạm **hàng biểu tượng tiện ích** | **0** | Bảng nổi "Thông tin hạng vé" + câu miễn trừ bắt buộc |
| Mở panel chi tiết | **0** | Bảng hạng vé, hạng đang chọn có viền trái và nút *Đã chọn* |
| Bấm **ⓘ Điều kiện vé** của một hạng | **+1** | Hộp thoại toàn văn, tiêu đề ghi rõ tên hạng vé |
| Mở lại hạng đã xem | **0** | Đệm theo phiên |
| Xem điều kiện của **3 hạng** cùng chuyến | **3** | Mỗi hạng một lượt |

🔴 Nút **Chọn chuyến** đặt thẳng hạng đang hiển thị — khách **không cần** mở panel chi tiết (§21-20).

### Tên hạng vé (§10.3) — ba trạng thái đều có mẫu thật

| Chuyến | Dữ liệu | Hiển thị |
|---|---|---|
| VN213 | hạng đặt chỗ `T`, có trong bảng ánh xạ | **Phổ thông tiết kiệm (T)** |
| VU102 | mã `W9`, **thiếu** trong bảng ánh xạ | **Hạng W9** + dòng thuộc tính bên dưới |
| VJ199 | **không có cả mã** | chỉ còn dòng thuộc tính |

Bảng ánh xạ nằm ở `assets/data.js` → `BK.FARE_NAMES`. Bàn giao thật cần bảng này
cho đủ 5 hãng nội địa (§23.2-2b).

### Chi phí gọi dữ liệu — hai bộ đếm để đối chiếu

Cả hai màn tốn lượt gọi đều có bộ đếm hiện trên trang.

**M2/M3 — điều kiện vé.** Bộ đếm nằm trên danh sách kết quả; chi tiết ở bảng mục trên.

**M4 — dịch vụ thêm (§11.6.2 · RB19).** Bộ đếm nằm cuối khối ③:

| Thao tác | Bộ đếm |
|---|---|
| Mở trang, cuộn tới khối ③ | **0** |
| Bấm `Xem gói hành lý` / `Chọn ghế` / `Xem dịch vụ` | +1 (chỉ chặng đang xem) |
| Chuyển sang chặng khác | +1 |
| Quay lại chặng đã xem | **+0** |
| Đóng khối rồi mở lại · bấm `Sửa` | **+0** |
| Đổi hộp chọn · tích `Áp dụng cho tất cả` | **+0** |

Trần lượt gọi **co giãn theo số chặng** (§7.4): 3 loại × N chặng.
Bấm trạng thái **"Hành trình 4 chặng"** ở thanh Prototype để thấy trần đổi thành 12
và tab ngang tự chuyển thành **hộp chọn chặng có tiến độ** (§11.5.7).

> **Lưu ý khi đối chiếu số.** Cột tóm tắt mở trang với *Dịch vụ thêm* ẩn hẳn và
> *Tổng giá = `VND 5.941.743`*, vì theo RB19 chưa có dịch vụ nào được tải hay chọn.
> Bấm `Xem gói hành lý` → chọn **Thêm 23kg** cho một hành khách để thấy dòng con hiện ra.

### M6 — bám trang `/booking-history` đang chạy (§13)

§13 được viết lại từ **khảo sát trực tiếp trang đang chạy**, nên M6 dựng theo hiện trạng chứ không theo đề xuất:

| Hạng mục | Theo §13 | Đã dựng |
|---|---|---|
| Thanh tab | 🔴 **Đúng bốn** tab `BOOKED · PENDING · FINISHED · CANCELLED` (§21-30 cấm tab thứ năm) | 4 tab, nhãn `BOOKED` đổi *"Đã đặt phòng"* → **"Đã đặt"** |
| Phân loại dịch vụ | **Dải chip** phía trên thanh tab, không phải tab | `[Tất cả] [🏨 Lưu trú] [✈ Vé máy bay (6)]`, ẩn cả dải nếu chưa có đơn vé |
| Chín trạng thái | Ánh xạ vào bốn tab, phân biệt bằng **nhãn trên thẻ** | `⏳ Đang xuất vé` · `✓ Đã xuất vé` · `⚠ Đang xử lý` · `Đã đổi vé` · `Đã hủy · đang hoàn tiền`… |
| Tiêu đề trang | `h3-bold`, **ẩn trên điện thoại** | ✓ |
| Thẻ đơn | Bám đúng khung thẻ đơn phòng: ảnh 82×82 · tên + mã · **hai hộp ngày có mũi tên** · giá + `Xem →` | ✓ — ảnh thành **logo hãng** trên nền `surface-10`, hộp ngày cao 98px từ `xl` |
| Một chiều | 🔴 **Chỉ một hộp** toàn chiều ngang, nhãn `Khởi hành`, ẩn mũi tên | ✓ |
| Đa chặng | Hộp trái `Bắt đầu` · hộp phải `Kết thúc` | ✓ |
| Trang chi tiết | **Tám khối** theo đúng thứ tự trang đơn phòng | ✓ |
| Khối 7 | 🔴 Liên hệ **Bookese**, không phải hãng bay | ✓ *"Bookese chịu trách nhiệm tuyến đầu"* |
| Khối 8 | 🔴 Bản điều kiện vé **lưu lúc đặt**, không gọi lại nguồn cung | ✓ ghi rõ ngày đặt trong ghi chú |
| Hoàn vé (§13.7) | Tiền vé · phí hoàn hãng · **phí xử lý Bookese** · Nhận lại + hai cảnh báo | ✓ `Nhận lại VND 652.181`, có cảnh báo **xu bị thu hồi** |

### M7 — khu quản trị dùng hệ thiết kế RIÊNG (§14 · RB32)

🔴 Đây là phát hiện quan trọng nhất của §14: **khu quản trị không dùng hệ thiết kế của trang khách hàng.**
`van-hanh.html` vì vậy **không nạp** `tokens.css` và `components.css` — nó nạp `assets/admin.css`.

| | Trang khách | Trang quản trị |
|---|---|---|
| Nền tảng | Tailwind | **Bootstrap 5** — `row` · `col-xxl-6` · `form-control` · `btn btn-outline-primary` |
| Bộ chọn ngày | Tự dựng | **Ant Design DatePicker** |
| Đặt tên lớp | Tiện ích | **BEM** — `Table__Body__Row__Content` · `Tab__Header__Tab__Item` |
| Phông | Inter + Manrope | Phông mặc định khung quản trị |
| Màu chính | `#0064FD` | `#0d6efd` (Bootstrap) |
| **Giá** | `VND 5.071.743` | 🔴 **`5.071.743 VND`** — hậu tố, ngoại lệ có chủ đích |

Đã dựng theo §14.2–§14.7:

- **Trình đơn**: `Quản lý đơn hàng` → `Đơn lưu trú` / `Đơn vé máy bay` (phương án A)
- **Bảng danh sách**: ô tìm kiếm *"mã đặt chỗ, **số vé**, tên khách hoặc email"* · ba bộ lọc · **đúng 8 cột** (§21-31 cấm cột thứ chín) · dòng đếm · phân trang
- **Tab** `Đã thu tiền, chưa có vé (3)` hiện **số đơn ngay trên nhãn** và **chuyển đỏ** khi > 0
- **Chi tiết**: 7 thẻ — thêm *Danh sách hành khách*, *Hành trình*, và **Nhật ký kỹ thuật**
- **Nhật ký kỹ thuật**: thông điệp gốc **nguyên văn, không dịch** (§21-32), có nút **sao chép cả dòng**
- **§14.5**: dùng lại `/manager-operation` — bấm *Quản lý thao tác* ở trình đơn để xem; mọi thao tác chạm tiền/vé đều ghi vết vào đó ngay khi bấm

## 4. Dữ liệu mẫu cố ý "khó"

`assets/data.js` chứa 6 chuyến bay bao phủ mọi trường hợp phải vẽ:

| Chuyến | Trường hợp nó thử |
|---|---|
| VJ125 | Hành lý ký gửi = **0** → *"Không kèm hành lý ký gửi"* (không có) |
| VN213 | Đầy đủ nhất · 3 mức giá để thử quy tắc gộp tối đa 3 dòng |
| VU102 | Hành lý ký gửi = **null** → *"Hãng chưa công bố"* (không biết) |
| VN255 | Nối chuyến + **cảnh báo đổi sân bay** + *"Khai thác bởi Pacific Airlines"* |
| SC201 | **Hết chỗ** — dòng đỏ trong thẻ, nút vô hiệu |
| VJ199 | Hạ cánh hôm sau → nhãn **`+1`** màu đỏ · và **không có mã hạng vé** |

## 4b. 🔴 Một mâu thuẫn trong tài liệu cần bạn chốt

**§13.3** (bảng "Nội dung một đơn vé máy bay") vẫn ghi:

> *Điều kiện vé — ⭐ Đây là màn hình **DUY NHẤT** có tên hạng vé thương hiệu, vì dữ liệu đó chỉ có sau khi đã đặt.*

Câu này còn sót từ bản trước và **trái với §10.3 mới**, vốn nói tên hạng vé dựng được
ngay từ bước tìm kiếm và phải hiển thị ở **cả sáu màn hình**. §10.3 được xác nhận lại ở
RB16, §21-1, §22.1 và §22.2-①, nên bản dựng đi theo §10.3.
Nếu §13.3 mới là ý đúng thì phải gỡ tên hạng vé khỏi M2, M3, M4, M5 — báo lại để tôi sửa.

**Hai chỗ khác đã suy ra từ ràng buộc chung, không có trong khung màn hình:**

| Chỗ | Khung màn hình | Bản dựng làm theo | Căn cứ |
|---|---|---|---|
| Biểu tượng ⓘ trong **bảng hạng vé** (M3) | §10.2 vẽ cột giá không có ⓘ | **Có ⓘ** ở mỗi dòng hạng vé | §5.2 điều kiện 1 — *"bảng tách chi tiết luôn mở được **từ mọi chỗ có giá**"* · §4.1-5 liệt kê tooltip dùng ở **M2 · M3 · M4** |
| Dòng phụ dưới tiêu đề M1 | §8.3 vẫn còn *"Giá đúng bằng giá hãng · không phát sinh ở bước cuối"* | **Đã bỏ** theo yêu cầu trực tiếp | — |
| Giá vé ở M4 | §11.3 ghi giá từng chặng cộng lại là **`VND 5.071.743`**, nhưng khung §11.8 vẫn ghi *Giá vé* = **`VND 5.075.000`** — lệch 3.257đ | Dùng **`5.071.743`** ở cả hai chỗ | RB27 nói *"lệch một đồng là khách mất tin"*, nên phải khớp. Nếu 5.075.000 mới đúng thì §11.3 phải sửa lại giá từng chặng |

## 5. Còn thiếu để bàn giao đầy đủ (§23.2)

Những mục sau **không nằm trong phạm vi bản dựng giao diện** và cần bổ sung trước khi lập trình:

- [ ] **Bộ logo hãng hàng không** chuẩn hóa cùng chiều cao 48px, nền trong suốt
      *(bản dựng đang dùng ô màu + mã hãng thay chỗ)*
- [ ] **Ảnh nền hero** cho M1 và dải tìm kiếm M2 *(đang dùng dải màu thay chỗ)*
- [ ] 🔴 **Bảng ánh xạ tên hạng vé cho 5 hãng nội địa** (§23.2-2b) — bản dựng mới có mẫu
      cho VN · VJ · VU · SC · BL trong `assets/data.js`, cần đội nghiệp vụ rà và bổ sung đủ
- [ ] **Ba hình minh họa trạng thái rỗng** theo phong cách linh vật Bookese (§19.2)
- [ ] **Nội dung email và tin nhắn** cho 6 mốc (§23.2-7)
- [ ] **Vé điện tử bản PDF** — bố cục và nội dung
- [ ] Kiểm tra **tương phản màu** đạt chuẩn tiếp cận
- [ ] 🔴 **Đối chiếu song song với luồng đặt phòng đang chạy** — mở hai màn hình cạnh nhau,
      xác nhận cùng màu, cùng cỡ chữ, cùng bo góc, cùng cách hiển thị giá (§23.1-9)

## 6. Ba quyết định sản phẩm còn chờ (§24.1)

Bản dựng này chọn phương án như sau; đổi quyết định thì sửa ở đâu:

| # | Câu hỏi | Bản dựng đang làm | Nếu đổi quyết định |
|---|---|---|---|
| **A** | Có cho đặt vé không cần đăng nhập? | **Có** — M4 hiện lời mời đăng nhập chứ không chặn; M5 có khối mời tạo tài khoản | Nếu bắt buộc đăng nhập: bỏ khối mời ở `xac-nhan.html`, đổi nhãn nút M4 |
| **B** | Có hiển thị số xu trong luồng đặt? | **Có** — khối xu ở M2, M4, M5 | Nếu không: xóa `.coin` khỏi 3 trang, phần CSS giữ lại |
| **C** | Ô mã giảm giá và khối hóa đơn làm cho luồng nào? | Đã dựng ở M4 dạng **thành phần dùng chung** | Không phải sửa gì nếu dùng chung cho cả lưu trú |
| **D** | Bản 1 có làm hành trình nhiều chặng không? | **Có dựng** — M1 có hàng chặng (§8.11), M4 có hộp chọn chặng (§11.5.7); dữ liệu là mảng chặng nên chịu được 1–6 chặng (RB21) | Nếu chốt phương án A (§7.5 khuyến nghị): ẩn nút chọn `Nhiều chặng` ở `index.html`. **Không phải gỡ gì khác** — M2 và M4 vẫn cần chịu được N chặng |

## 7. Ghi chú kỹ thuật

- Chữ dùng **Inter** (nội dung) và **Manrope** (khung sườn, giá tiền) tải từ Google Fonts.
  Khi không có mạng, trình duyệt sẽ dùng phông hệ thống — bố cục không vỡ.
- Lớp `tw-text-lable-medium-regular` **cố ý viết sai chính tả** (`lable`) để khớp mã nguồn
  Bookese đang chạy. Viết đúng chính tả sẽ không ăn style. Đây không phải lỗi.
- Không dùng thư viện ngoài, không có bước build.
