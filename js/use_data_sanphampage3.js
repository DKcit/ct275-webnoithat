var sell_ProductP3={
  "discount": 0.25,
  "list-product": ["sp025","sp029","sp031","sp033"]
}
  var ProductP3 = ["sp025", "sp026", "sp027", "sp028", "sp029", "sp030","sp031", "sp032","sp033", "sp034","sp035", "sp036"];
 let test = "";
  const container = document.querySelector('.product-container')
  for (var i = 0; i < ProductP3.length; i++) {
  
      const product = database[ProductP3[i]]
      var price = VND.format(product.price);
      var sell_price= VND.format(product.price*(1-sell_ProductP3.discount));
    if(ProductP3[i] == sell_ProductP3["list-product"][0] || ProductP3[i] == sell_ProductP3["list-product"][1] || ProductP3[i] == sell_ProductP3["list-product"][2] || ProductP3[i] == sell_ProductP3["list-product"][3] || ProductP3[i] == sell_ProductP3["list-product"][4] || ProductP3[i] == sell_ProductP3["list-product"][5] || ProductP3[i] == sell_ProductP3["list-product"][6]){
      test += ` 
      <div class="hang">
            <div class="product" id="${ProductP3[i]}">
              <a href="${product.detail_product}"><img class="img" src="${product.photo}"
                  alt="${product.name}"></a>
              <h2 class="tensp">${product.name}</h2>
              <h3 class="giasp"><del>${price}</del></h3>
              <h3 class="giasp">${sell_price}</h3>
            </div>
          </div>
          `;
    }
    else{
      test += ` 
      <div class="hang">
            <div class="product" id="${ProductP3[i]}">
              <a href="${product.detail_product}"><img class="img" src="${product.photo}"
                  alt="${product.name}"></a>
              <h2 class="tensp">${product.name}</h2>
              <h3 class="giasp">${price}</h3>
            </div>
          </div>
          `;
    }
  }
  container.innerHTML = test;