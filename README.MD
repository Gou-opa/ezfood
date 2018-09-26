# Hệ thống quản lý nhà hàng EasyFood
#### Vấn đề thực tế và giải pháp thực tiễn:
 - Thời đại 4.0 thời đại của vạn vật kết nối, AI và Bigdata phần mềm (đặc biệt là website) chất lượng là mũi tên để thấy được trái tim của khách hàng . Tuy nhiên nhiều hộ kinh doanh nhà hàng vs doanh nghiệp chưa ứng dụng công nghệ đồng bộ trong quản lý, hiệu quả quản lý thấp, khó chạy các chương trình khách hàng trên tập dữ liệu rời rạc, ko chuẩn hóa.Dẫn đến khó khăn trong cả việc quản lý và bán hàng lẫn trải nghiệm người dùng .Ứng dụng Easy Food được phát triển để giải quyết vấn đề này .Từ quản lý dữ liệu kho , công nhân cho đến người dùng đều được lưu trữ và đồng bộ .
 - Ứng dụng là giải pháp thực tiễn để quản lý mô hình kinh doanh các cửa hàng và chuỗi cửa hàng ăn uống với mọi quy mô, từ cửa hàng gia đình cho đến các chuỗi cửa hàng lớn như KFC, MC Donald, …. 
 - Áp dụng số hóa vào kỹ thuật quản lý sẽ giúp cho nhân viên nhà hàng ở mọi chức vụ có thể kiểm soát và theo dõi các thống số của nhà hàng một cách chính xác nhất - một trong những giải pháp tối ưu dành cho các cửa hàng truyền thống, ứng dụng cung cấp rất nhiều các chức năng về mặt thống kê: số lượng sản phẩm bán ra, nhập vào, doanh thu trên ngày, ….
--------------------------------
##### Người phát triển:
 - Nguyễn Ngọc Tiến
 - Nguyễn Quang Hà
 - Phùng Đình Xuân
 - Lê Lương Tuấn Anh
 - Nguyễn Văn Long
 --------------------------------
##### Phase 1A: t2 24/09 - hết t4
###### Front dùng bootstrap 4
 - Tuấn Anh: promo, menu 
 - Xuân: store manage, order
##### Back: node
 - Long: routing, connect DB và tạo các bảng mysql, mongo  (tối thứ 5 deliver)
 - Hà: login dùng mysql nhận vào username và password đổ ra info của user = json 
 - Tiến: api về order món ăn, định nghĩa object order