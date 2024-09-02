function showListOrderProduct() {
    var list_product = document.querySelector(".order__list-product");
    var content_order = "";
    for(var id in current_cart) {
        content_order += `<div class="order__product-group-item" id="${id}">`;
        var src_img = database[id].photo;
        var name_product = database[id].name;
        var color = current_cart[id].color;
        var new_price = database[id].price;
        for(var size_product in current_cart[id].size) {
            var quantity = (current_cart[id].size)[size_product];
            if(sale_off_product.list_product.includes(id, 0)){
                new_price = new_price - new_price*sale_off_product.discount;
            }
            content_order += `
                            <div class="order__product" id="${id}">
                                <div class="order__product-view">
                                    <div class="order__product-img">
                                        <a href="#">
                                            <img src="${src_img}" alt="">
                                        </a>
                                        <div class="order__product-notification">${quantity}</div>
                                    </div>
    
                                    <div class="order__product-info">
                                        <div class="order__product-desc-heading">${name_product}</div>
    
                                        <div class="order__product-color">
                                            Màu: <span>${color}</span>
                                        </div>
    
                                        <div class="order__product-size">
                                            Size: <span>${size_product}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="order__product-price">${VND.format(new_price)}</div>
                            </div>
                            `;
        }
        
    }
    list_product.innerHTML = content_order;
    var total_price_Element = document.querySelector(".order-bill__summary-price");

    var sub_total = calc_sub_total();
    var amount_sales = 0;
    if(session.apply_promo_code) {
        var amount_sales = total_price_with_promo_code(promo_code[session.id_user].discount, sub_total);
    }
    var total_price = sub_total - amount_sales;
    total_price_Element.innerHTML = VND.format(total_price);
}

showListOrderProduct();
show_quantity_in_icon_cart();