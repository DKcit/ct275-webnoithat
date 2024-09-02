let listProducts = [];

var saleproduct = {
  discount: 0.25,
  list_sale: [
    "sp003",
    "sp004",
    "sp005",
    "sp006",
    "sp009",
    "sp011",
    "sp012",
    "sp014",
    "sp017",
    "sp019",
    "sp020",
    "sp022",
    "sp025",
    "sp029",
    "sp031",
    "sp033",
  ],
};

const products = []; //mảng sale

saleproduct.list_sale.forEach((product) => {
  products.push(database[product]);
});
function checkProductSale(product) {
  if (products.includes(product)) {
    return true;
  } else {
    return false;
  }
}

for (a in database) {
  listProducts.push(database[a]);
}
const formatter = new Intl.NumberFormat("vi-VN", {
  currency: 'VND',
  style:'currency'
});
checkHref(window.location.pathname);
function checkHref(href) {
  listProducts.forEach((product, index) => {
    if (href.includes(product.detail_product)) {
      const isSale = checkProductSale(product);
      const price =  formatter.format(product.price)
      const pricesale = formatter.format(product.price - product.price * saleproduct.discount)
      const sizes = Object.keys(product.size)
      let td = ''
      sizes.forEach((size) => {
        td += `
           <td><button class="nut">${size}</button></td>`
      })
      const element = `
<div class="lon">
      <section class="noidung" id="${Object.keys(database)[index]}">
        <section class="left">
          <img src="${product.photo}" alt="Ảnh ${product.name}" height="400px">
          <div style="font-size: 25px;" class="chiase">Chia sẻ:
            <a href="" class="gachchanlogo">
              <img style="height: 25px; width: 25px; margin-left: 5px;" src="img/logo/Facebook_Messenger_logo_2020.svg.png"
                alt="Ảnh Logo Messenger">
            </a>
            <a href="" class="gachchanlogo">
              <img style="height: 25px; width: 25px; margin-left: 5px;" src="img/logo/Facebook_Logo_(2019).png"
                alt="Ảnh Logo Facebook">
            </a>
            <a href="" class="gachchanlogo">
              <img style="height: 25px; width: 25px; margin-left: 5px;" src="img/logo/Pinterest-logo.png"
                alt="Ảnh Logo Pinterest">
            </a>
            <a href="" class="gachchanlogo">
              <img style="height: 25px; width: 25px; margin-left: 5px;" src="img/logo/Logo_of_Twitter.svg.png"
                alt="Ảnh Logo Twitter">
            </a>
            <span> | </span>
            <input type="checkbox" id="heartCheckbox">
            <label for="heartCheckbox"></label>
            <span class="yeuthich">Yêu thích </span>
          </div>
        </section>
        <section class="right">
          <div>
            <div class="ten">${product.name}</div>
          </div>
          <div>5.0 <div class="stars">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
            </div>| 4 Đánh Giá | 19 Đã Bán</div>
          <br>
        <div class="gia" style="color: #d0011b;font-size: 2rem;font-weight: 500; text-decoration: ${isSale ? 'line-through' : 'none'};">${isSale ?price :''}</div>
          <div class="gia" style="color: #d0011b;font-size: 2.5rem;font-weight: 500;"> ${isSale ? pricesale : price  }</div>
          <table>
            <tr>
              <td class="chu">Chính Sách Trả Hàng</td>
              <td class="chu1">Trả hàng 15 ngày</td>
            </tr>
            <br>
          </table>
          <table>
            <tr>
              <td class="chu">Vận Chuyển</td>
              <td class="chu1">Miễn Phí Vận Chuyển</td>
            </tr>
            <br>
          </table>
          <table>
            <tr>
              <td class="chu">COLOR</td>
              <td><button class="nut1">${product.color}</button></td>
            </tr> 
            <tr>
              <td class="chu">SIZE</td>
              ${td}
            </tr>
            <br>
          </table>
          <table>
            <tr>
              <td class="chu">Số Lượng</td>
              <td>
                <div class="quantity">
                  <button class="btn decrease-btn">-</button>
                  <input type="text" class="quantity-input" value="1">
                  <button class="btn increase-btn">+</button>
                </div>
                <br>
              </td>
            </tr>
          </table>
          <table>
            <tr>
              <td><button class="add-to-cart-btn">Thêm vào giỏ hàng</button></td>
              <td><button class="order">Mua Ngay</button></td>
            </tr>
          </table>
        </section>
      </section>
      <div class="chitiet1">
        <section class="trai">
          <div class="chitiet">
            <b>
              CHI TIẾT SẢN PHẨM
            </b>
          </div>
          <img style="width: 540px;" src="${product.detail_photo}" alt="">
        </section>
        <section class="phai">
          <div class="mota" style="text-align: center;">
            <b>
              MÔ TẢ SẢN PHẨM
            </b>
          </div>
          <table>
            <ul>
              <li>Áo thun cotton 2 chiều</li>
              <li>Chất liệu hình in kéo lụa</li>
              <li>Form oversize</li>
            </ul>
          </table>
          <div class="mota" style="text-align: center;">
            <b>
              CHÍNH SÁCH BẢO HÀNH
            </b>
          </div>
          <table>
            <ul>
              <li>HỖ TRỢ BẢO HÀNH ĐỔI HÀNG 7 NGÀY</li>
              <li>Khi lỗi do nhà sản xuất- Khi giao sai màu/ Sai mẫu khách đã đặt hàng</li>
              <li>Khi giao thiếu hàng- Hỗ Trợ đổi trả nếu sản phẩm không đúng hình</li>
              <li>BẢO HÀNH 1 THÁNG KỂ TỪ NGÀY BÁN</li>
            </ul>
          </table>
        </section>
      </div>
    </div>
`;

      const main = document.querySelector(".main_detail");
      main.innerHTML = element;
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const decreaseBtn = document.querySelector(".decrease-btn");
  const increaseBtn = document.querySelector(".increase-btn");
  const quantityInput = document.querySelector(".quantity-input");

  decreaseBtn.addEventListener("click", function () {
    let currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
      quantityInput.value = currentValue - 1;
    }
  });

  increaseBtn.addEventListener("click", function () {
    let currentValue = parseInt(quantityInput.value);
    quantityInput.value = currentValue + 1;
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const nutButtons = document.querySelectorAll(".nut");

  nutButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      // Loại bỏ lớp 'selected' từ tất cả các nút
      nutButtons.forEach(function (btn) {
        btn.classList.remove("selected");
      });
      // Thêm lớp 'selected' cho nút được nhấp vào
      this.classList.add("selected");
      const quantityInput = document.querySelector(".quantity-input");
      quantityInput.value = 1;
    });
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const nutButtons = document.querySelectorAll(".nut1");

  nutButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      // Loại bỏ lớp 'selected' từ tất cả các nút
      nutButtons.forEach(function (btn) {
        btn.classList.remove("selected");
      });
      // Thêm lớp 'selected' cho nút được nhấp vào
      this.classList.add("selected");

    });
  });
});

function add_to_cart() {
  var btn_add_element = document.querySelector(".add-to-cart-btn");
  btn_add_element.onclick = function() {
    var btn_color_element = document.querySelector(".nut1.selected");
    var btn_size_element = document.querySelector(".nut.selected");
    if(btn_color_element) {
      if(btn_size_element)  {
        var quantity_Element = document.querySelector(".quantity-input");
        var color = btn_color_element.innerText.trim();
        var size_product = btn_size_element.innerText.trim();
        var quantity = Number(quantity_Element.value.trim());
        var id = btn_add_element.closest(".noidung").id;
        if(current_cart[id]) {
          if(current_cart[id].size[size_product]){
            (current_cart[id].size)[size_product] += quantity;
          } else {
            (current_cart[id].size)[size_product] = quantity;
          }
        } else {
          var size = {};
          size[size_product] = quantity;
          current_cart[id] = {
            size: size,
            color: color
          }
        }

        if((current_cart[id].size)[size_product] > (database[id].size)[size_product]) {
            (current_cart[id].size)[size_product] = (database[id].size)[size_product];
        }

        showListProduct();
        updatePositionProduct();
        localStorage.setItem("current_cart", JSON.stringify(current_cart));

        var modal = document.querySelector(".modal-cart--hidden");
        var cart = document.querySelector(".modal__body .cart");
        modal.classList.remove("modal-cart--hidden");
        cart.classList.add("cart--appear");
      } else {
        alert("Vui lòng chọn size");
      }
    } else {
      alert("Vui lòng chọn màu sắc");
    }
  }
}

function order_now() {
  var btn_order = document.querySelector(".order");
  btn_order.onclick = function() {
    var btn_color_element = document.querySelector(".nut1.selected");
    var btn_size_element = document.querySelector(".nut.selected");
    if(btn_color_element) {
      if(btn_size_element)  {
        var quantity_Element = document.querySelector(".quantity-input");
        var color = btn_color_element.innerText.trim();
        var size_product = btn_size_element.innerText.trim();
        var quantity = Number(quantity_Element.value.trim());
        var id = btn_order.closest(".noidung").id;
        if(current_cart[id]) {
          if(current_cart[id].size[size_product]){
            (current_cart[id].size)[size_product] += quantity;
          } else {
            (current_cart[id].size)[size_product] = quantity;
          }
        } else {
          var size = {};
          size[size_product] = quantity;
          current_cart[id] = {
            size: size,
            color: color
          }
        }

        if((current_cart[id].size)[size_product] > (database[id].size)[size_product]) {
            (current_cart[id].size)[size_product] = (database[id].size)[size_product];
        }

        localStorage.setItem("current_cart", JSON.stringify(current_cart));
        window.location.href = "detail_cart.html";
      } else {
        alert("Vui lòng chọn size");
      }
    } else {
      alert("Vui lòng chọn màu sắc");
    }
  }
}

add_to_cart();
order_now();