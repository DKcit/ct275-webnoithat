// Lấy thẻ input và button
var searchInput = document.getElementById('searchInput');
var searchButton = document.getElementById('searchButton');
var searchResults = document.getElementById('searchResults');

function createProductListItem(product) {
    var li = document.createElement('li');

    // Tạo hình ảnh sản phẩm
    var img = document.createElement('img');
    img.src = product.photo;
    img.alt = product.name;
    img.style.width = '50px'; // Có thể điều chỉnh kích thước ảnh tùy ý
    img.style.height= '48px';
    li.appendChild(img);

    // Tạo tên sản phẩm
    var productNameElement = document.createElement('span'); // Sử dụng thẻ span thay vì p để không làm thay đổi bố cục
    productNameElement.textContent = product.name;
    li.appendChild(productNameElement);

    // Thêm sự kiện click cho mỗi phần tử danh sách
    li.addEventListener('click', function() {
        // Chuyển hướng đến trang chi tiết sản phẩm
        window.location.href = product.detail_product;
    });

    return li;
}
searchInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        searchDatabase(); // Gọi hàm tìm kiếm khi nhấn phím "Enter"
    }
});
// Hàm tìm kiếm
function searchDatabase() {
    var searchTerm = searchInput.value.toLowerCase();
    searchResults.innerHTML = ''; // Xóa kết quả trước đó

    for (var key in database) {
        var product = database[key];
        var productName = product.name.toLowerCase();

        // Kiểm tra nếu tìm thấy từ khóa trong tên sản phẩm
        if (productName.includes(searchTerm)) {
            var li = createProductListItem(product);
            searchResults.appendChild(li);
        }
    }

    if (searchResults.children.length === 0) {
        var li = document.createElement('li');
        li.textContent = 'Không tìm thấy sản phẩm nào!';
        searchResults.appendChild(li);
    }

    // Hiển thị danh sách kết quả tìm kiếm
    searchResults.style.display = 'block';
    // Hiển thị lớp overlay
    overlay.style.display = 'block';
}
overlay.addEventListener('click', function() {
    // Ẩn danh sách kết quả tìm kiếm
    searchResults.style.display = 'none';
    // Ẩn lớp overlay
    overlay.style.display = 'none';
}
);
// Sự kiện click cho nút tìm kiếm
searchButton.addEventListener('click', searchDatabase);
