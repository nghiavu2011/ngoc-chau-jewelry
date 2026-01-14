---
description: Chạy test tự động cho website Ngọc Châu Jewelry
---
Workflow này sẽ thực hiện chụp ảnh màn hình và kiểm tra giao diện website trên Desktop và Mobile.

1. Đảm bảo bạn đã cài đặt Node.js và Puppeteer:
   ```bash
   npm install puppeteer
   ```

2. Tạo thư mục kết quả nếu chưa có:
   ```bash
   mkdir -p test_results
   ```

3. Chạy script test:
   ```bash
   node test.js
   ```

4. Kiểm tra các file ảnh đã chụp trong thư mục `test_results/`:
   - `desktop_full.png`
   - `mobile_view.png`
   - `mobile_menu_open.png`
   - `contact_form_filled.png`
