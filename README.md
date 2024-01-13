# library_management
+ Tạo 1 website đọc báo, sử dụng angular + boostrap hoặc tailwindcss, các bài báo kéo dưới cùng sẽ load theo dạng lazy load more
+ BE sử dụng Java swagger làm document, tạo cronjob để crawl data các bài báo mới từ https://tuoitre.vn/ 
+ DB thiết kế phù hợp chứa danh mục và các bài báo
+ Cronjob chạy 30ph 1 lần, không crawl dữ liệu cũ
+ BE và FE chia làm 2 project khác nhau,
+ BE sử dụng log để lưu lại những request or exception khi code xảy ra lỗi
