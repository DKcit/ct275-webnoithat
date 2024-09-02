
function showListDetailProduct() {
    var detail_cart = document.querySelector(".detail__cart");
    var detail_cart_empty = document.querySelector(".detail__cart-empty");
    
    if(Object.keys(current_cart).length != 0 ) {
        detail_cart.classList.remove("detail__cart--hidden");
        detail_cart_empty.classList.add("detail__cart-empty--hidden");

        var list_product = document.querySelector(".my-cart__list-product");
        var content_cart = "";
    
        for(var id in current_cart) {
            content_cart += `<div class="my-cart__product-group-item" id="${id}">`;
            var src_img = database[id].photo;
            var name_product = database[id].name;
            var color = current_cart[id].color;

            for(var size_product in current_cart[id].size) {
                content_cart += `
                                <div class="my-cart__product">
                                    <div class="my-cart__product-view">
                                        <div class="my-cart__product-img">
                                            <a href="#">
                                                <img src="${src_img}" alt="">
                                            </a>
                                        </div>
        
                                        <div class="my-cart__product-info">
                                            <div class="my-cart__product-desc-heading">${name_product}</div>
                                `;
                var old_price;
                var new_price;
                if(sale_off_product.list_product.includes(id, 0)){
                    old_price = database[id].price;
                    new_price = old_price - old_price*sale_off_product.discount;
                    content_cart += `
                                    <div class="my-cart__product-group-price">
                                        <span class="my-cart__product-old-price">${VND.format(old_price)}</span>
                                        <span class="my-cart__product-new-price">${VND.format(new_price)}</span>
                                    </div>
                                    `
                } else {
                    new_price = database[id].price;
                    content_cart += `
                                    <div class="my-cart__product-group-price">
                                        <span class="my-cart__product-new-price">${VND.format(new_price)}</span>
                                    </div>
                                    `
                }
                var priceDetailProduct = (current_cart[id].size)[size_product] * new_price;
                content_cart += `
                                            <div class="my-cart__product-color">
                                                Màu: <span>${color}</span>
                                            </div>
        
                                            <div class="my-cart__product-size">
                                                Size: <span>${size_product}</span>
                                            </div>

                                            <div class="my-cart__product-quantity my-cart__product-quantity--tablet">
                                                <span class="minus">-</span>
                                                <span class="number">1</span>
                                                <span class="plus">+</span>
                                            </div>
                                        </div>
                                    </div>
        
                                    <div class="my-cart__product-selection">
                                        <div class="my-cart__product-quantity">
                                            <span class="minus">-</span>
                                            <span class="number">1</span>
                                            <span class="plus">+</span>
                                        </div>
        
                                        <div class="my-cart__product-price">${VND.format(priceDetailProduct)}</div>
        
                                        <div class="my-cart__product-delete">
                                            <i class="fa-solid fa-xmark my-cart__product-delete-icon"></i>
                                        </div>
                                    </div>
                                </div>
                                `;
            }
            content_cart += "</div>";
        }

        list_product.innerHTML = content_cart;
        updateInfoListDetailProduct();
    } else {
        detail_cart.classList.add("detail__cart--hidden");
        detail_cart_empty.classList.remove("detail__cart-empty--hidden");
    }
    
}

function showQuantityDetailProduct() {
    var my_cart_product_quantity = document.querySelectorAll(".my-cart__product-quantity .number");
    for(var i = 0; i < my_cart_product_quantity.length; i++) {
        var my_cart_product_element =  my_cart_product_quantity[i].closest(".my-cart__product");
        var my_cart_product_price = my_cart_product_element.querySelector(".my-cart__product-price");
        var id = my_cart_product_element.closest(".my-cart__product-group-item").id;
        var size_product = my_cart_product_element.querySelector(".my-cart__product-size span").innerText;
        my_cart_product_quantity[i].innerHTML = (current_cart[id].size)[size_product];
        my_cart_product_price.innerHTML = VND.format((current_cart[id].size)[size_product] * database[id].price);
    }
}

function showTotalPriceDetailProduct() {
    var sub_total_Element = document.querySelector(".order-summary__subtotal-heading-price");
    var sub_total = calc_sub_total();
    var total_price_Element = document.querySelector(".order-summary__total-heading-price");
    var amountSalesElement = document.querySelector(".order-summary__subtotal-discount-amount");
    var amount_sales = 0;
    if(session.apply_promo_code) {
        if(promo_code[session.id_user]) {
            var amount_sales = total_price_with_promo_code(promo_code[session.id_user].discount, sub_total);
            amountSalesElement.innerHTML = VND.format(amount_sales);
        }
    } else {
        amountSalesElement.innerHTML = "";
    }
    sub_total_Element.innerHTML =  VND.format(sub_total);
    total_price_Element.innerHTML = VND.format(sub_total - amount_sales);
}

function updateInfoListDetailProduct() {
    showQuantityDetailProduct();
    showTotalPriceDetailProduct();
}

function updatePositionDetailProduct() {
    choose_quantity_of_detail_product();
    click_icon_delete_detail_product();
}

function choose_quantity_of_detail_product() {
    var listPlus = document.querySelectorAll(".my-cart__product-quantity .plus");
    for(var i = 0; i < listPlus.length; i++) {
        listPlus[i].onclick = function(e) {
            var my_cart_product_element = e.target.closest(".my-cart__product");
            var size = my_cart_product_element.querySelector(".my-cart__product-size span").innerText;
            var id = e.target.closest(".my-cart__product-group-item").id;
            add_one_product(id, size);
        }
    }

    var listMinus = document.querySelectorAll(".my-cart__product-quantity .minus");
    for(var i = 0; i < listMinus.length; i++) {
        listMinus[i].onclick = function(e) {
            var my_cart_product_element = e.target.closest(".my-cart__product");
            var size = my_cart_product_element.querySelector(".my-cart__product-size span").innerText;
            var id = e.target.closest(".my-cart__product-group-item").id;
            minus_one_product(id, size);
        }
    }
}

function click_icon_delete_detail_product() {
    var delete_icon = document.querySelectorAll(".my-cart__product-delete");
    for(var i = 0; i < delete_icon.length; i++) {
        delete_icon[i].onclick = function(e) {
            var my_cart_product_element = e.target.closest(".my-cart__product");
            var size = my_cart_product_element.querySelector(".my-cart__product-size span").innerText;
            var id = e.target.closest(".my-cart__product-group-item").id;
            delete_product(id, size);
        }
    }
}

function show_promo_and_show_note() {
    var promo_heading_title = document.querySelector(".my-cart__promo-heading-title");
    var promo_input_code = document.querySelector(".my-cart__promo-input-code-group");
    promo_heading_title.onclick = function() {
        promo_input_code.classList.toggle("my-cart__promo-input-code-group--hidden");
    }
    check_valid_promo_code(session.id_user);

    var note_heading_title = document.querySelector(".my-cart__note-heading-title");
    var note_input_code = document.querySelector(".my-cart__note-input");
    note_heading_title.onclick = function() {
        note_input_code.classList.toggle("my-cart__note-input--hidden");
    }
}

function check_valid_promo_code() {
    var buttonElement = document.querySelector(".my-cart__promo-btn");
    var inputElement = document.querySelector(".my-cart__promo-input");
    var groupInputElement = document.querySelector(".my-cart__promo-input-code-group");
    inputElement.oninput = function() {
        if(groupInputElement.classList.contains("my-cart__promo-invalid")){
            groupInputElement.classList.remove("my-cart__promo-invalid");
        }
        session.apply_promo_code = false;
        showTotalPriceDetailProduct();
    }

    buttonElement.onclick = function() {
        var messageElement = document.querySelector(".my-cart__promo-message");
        if(inputElement.value) {
            if(promo_code[session.id_user]){
                if(promo_code[session.id_user].code.localeCompare(inputElement.value) == 0){
                    session.apply_promo_code = true;
                    localStorage.setItem("session", JSON.stringify(session));
                    showTotalPriceDetailProduct();
                } else {
                    groupInputElement.classList.add("my-cart__promo-invalid");
                    messageElement.innerHTML = '*Mã khuyến mãi không tồn tại';
                    session.apply_promo_code = false;
                    inputElement.value = '';
                }
                
            } else {
                groupInputElement.classList.add("my-cart__promo-invalid");
                messageElement.innerHTML = '*Mã khuyến mãi không tồn tại';
                session.apply_promo_code = false;
                inputElement.value = '';
            }
        } else {
            groupInputElement.classList.add("my-cart__promo-invalid");
            messageElement.innerHTML = 'Vui lòng nhập mã khuyến mãi';
        }
    }
    
}

showListDetailProduct();
updatePositionDetailProduct();
show_promo_and_show_note();