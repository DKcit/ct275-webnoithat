var href_cart = window.location.pathname;
var isDetailCart;
if(href_cart.includes("detail_cart.html")) {
    isDetailCart = true;
} else {
    isDetailCart = false;
}


function openAndCloseCart() {
    var cart_icon = document.querySelector("header .cart-icon");
    var modal = document.querySelector(".modal-cart--hidden");
    var cart = document.querySelector(".modal__body .cart");
    var icon_close_cart = document.querySelector(".cart .cart__heading-arrow");

    cart_icon.onclick = function() {
        modal.classList.toggle("modal-cart--hidden");
        cart.classList.add("cart--appear");
    }
    
    modal.onclick = function(e){
        if(cart.classList.contains("cart--appear"))
            cart.classList.remove("cart--appear");
        cart.classList.add("cart--disappear");
        setTimeout( function(){
            modal.classList.toggle("modal-cart--hidden");
            cart.classList.remove("cart--disappear");
        }, 1000);
    }
    
    cart.onclick = function(e) {
        cart.classList.remove("cart--appear");
        e.stopPropagation();
    }
    
    icon_close_cart.onclick = function(){
        cart.classList.add("cart--disappear");
        setTimeout( function(){
            modal.classList.toggle("modal-cart--hidden");
            cart.classList.remove("cart--disappear");
        }, 1000);
    }
}

function showListProduct() {
    var cart_list_product = document.querySelector(".cart__content .cart__list-product");
    var cart_sub_total = document.querySelector(".cart__sub-total");
    var cart_content = document.querySelector(".cart__content");
    var cart_empty_img = document.querySelector(".cart-empty-img");
    var btn_shopping = document.querySelector(".cart__footer-btn");
    
    if(Object.keys(current_cart).length != 0){
        cart_sub_total.classList.remove("cart__sub-total--hidden");
        cart_list_product.classList.remove("cart__list-product--hidden");
        cart_content.classList.remove("cart__content--hidden");
        cart_empty_img.classList.add("cart-empty-img--hidden");
        btn_shopping.innerHTML = "Xem giỏ hàng";
        var content_cart = "";

        for(var id in current_cart) {
            content_cart += `<div class="cart__product-group-item" id="${id}">`;
            var src_img = database[id].photo;
            var name_product = database[id].name;
            var color = current_cart[id].color;
            for(var size in current_cart[id].size) {
                content_cart += `
                            <li class="cart__product-item">
                                <div class="cart__product-info">
                                    <div class="cart__product-img">
                                        <img src="${src_img}">
                                    </div>
    
                                    <div class="cart__product-desc">
                                        <div class="cart__product-desc-heading">${name_product}</div>
                            `;
                var old_price;
                var new_price;
                if(sale_off_product.list_product.includes(id, 0)){
                old_price = database[id].price;
                new_price = old_price - old_price*sale_off_product.discount;
                content_cart += `
                                <div class="cart__product-price">
                                    <span class="cart__product-old-price"><b>${VND.format(old_price)}</b></span>
                                    <span class="cart__product-new-price"><b>${VND.format(new_price)}</b></span>
                                </div>
                                `
                } else {
                new_price = database[id].price;
                content_cart += `
                                <div class="cart__product-price">
                                    <span class="cart__product-new-price"><b>${VND.format(new_price)}</b></span>
                                </div>
                                `
                }
                content_cart += `
                                    <div class="cart__product-size-and-color">
                                        <div class="cart__product-color">${color}</div>
                                        <span>,</span>
                                        <div class="cart__product-size">${size}</div>
                                    </div>
    
                                    <div class="cart__product-quantity">
                                                    <span class="minus">-</span>
                                                    <span class="number">1</span>
                                                    <span class="plus">+</span>
                                                </div>
                                            </div>
                                        </div>
    
                                        <div class="cart__product-delete">
                                            <i class="fa-regular fa-circle-xmark cart__product-delete-icon"></i>
                                        </div>
                                    </li>
                                `;
            }
            content_cart += "</div>";
        }
        cart_list_product.innerHTML = content_cart;
        updateInfoListProduct();
    } else {
        cart_sub_total.classList.add("cart__sub-total--hidden");
        cart_list_product.classList.add("cart__list-product--hidden");
        cart_content.classList.add("cart__content--hidden");
        cart_empty_img.classList.remove("cart-empty-img--hidden");
        btn_shopping.innerHTML = "Thêm vào giỏ hàng ngay !";
        show_quantity_in_icon_cart();
    }
}


function showTotalPrice() {
    var total = 0;
    for (var id in current_cart){
        for(size_product in current_cart[id].size) {
            var price = database[id].price * (current_cart[id].size)[size_product];
            if(sale_off_product.list_product.includes(id)){
                price = price - price*sale_off_product.discount;
            }
            total += price;
        }
    }
    var total_number  = document.querySelector(".cart__sub-total-number");
    total_number.innerHTML = VND.format(total);
}

function show_quantity_of_product() {
    var quantity_product_element = document.querySelectorAll(".cart__product-quantity .number");
    for(var i = 0; i < quantity_product_element.length; i++) {
        var cart_product_item_element = quantity_product_element[i].closest(".cart__product-item");
        var id = cart_product_item_element.closest(".cart__product-group-item").id;
        var size_product = cart_product_item_element.querySelector(".cart__product-size").innerText;
        quantity_product_element[i].innerHTML = (current_cart[id].size)[size_product];
    }
}

function updateInfoListProduct() {
    show_quantity_of_product();
    showTotalPrice();
    show_quantity_in_icon_cart();
}

function updatePositionProduct() {
    choose_quantity_of_product();
    click_icon_delete_product();
}

function choose_quantity_of_product() {
    var listPlus = document.querySelectorAll(".cart__product-quantity .plus");
    for(var i = 0; i < listPlus.length; i++) {
        listPlus[i].onclick = function(e) {
            var cart_product_item_element = e.target.closest(".cart__product-item");
            var size = cart_product_item_element.querySelector(".cart__product-size").innerText;
            var id = e.target.closest(".cart__product-group-item").id;
            add_one_product(id, size);
        }
    }
    var listMinus = document.querySelectorAll(".cart__product-quantity .minus");
    for(var i = 0; i < listMinus.length; i++) {
        listMinus[i].onclick = function(e) {
            var cart_product_item_element = e.target.closest(".cart__product-item");
            var size = cart_product_item_element.querySelector(".cart__product-size").innerText;
            var id = e.target.closest(".cart__product-group-item").id;
            minus_one_product(id, size);
        }
    }
} 

function click_icon_delete_product() {
    var delete_icon = document.querySelectorAll(".cart__product-delete");
    for(var i = 0; i < delete_icon.length; i++) {
        delete_icon[i].onclick = function(e) {
            var cart_product_item_element = e.target.closest(".cart__product-item");
            var size = cart_product_item_element.querySelector(".cart__product-size").innerText;
            var id = e.target.closest(".cart__product-group-item").id;
            delete_product(id, size);
        }
    }
}

function delete_product (id, size_product) {
    delete (current_cart[id].size)[size_product];
    if(Object.keys(current_cart[id].size).length == 0){
        delete current_cart[id];
    }
    localStorage.setItem("current_cart", JSON.stringify(current_cart));
    showListProduct();
    updatePositionProduct();
    if(isDetailCart) {
        showListDetailProduct();
        updatePositionDetailProduct();
    }
}

function add_one_product(id, size_product) {
    if((current_cart[id].size)[size_product] < (database[id].size)[size_product]) {
        (current_cart[id].size)[size_product] += 1;
        localStorage.setItem("current_cart", JSON.stringify(current_cart));
        updateInfoListProduct();
        if(isDetailCart) {
            updateInfoListDetailProduct();
        }
    }
}

function minus_one_product(id, size_product) {
    (current_cart[id].size)[size_product] -= 1;
    localStorage.setItem("current_cart", JSON.stringify(current_cart));
    if((current_cart[id].size)[size_product] > 0) {
        updateInfoListProduct();
        if(isDetailCart) {
            updateInfoListDetailProduct();
        }
    } else {
        delete_product(id, size_product);
    }
}

openAndCloseCart();
showListProduct();
updatePositionProduct();
