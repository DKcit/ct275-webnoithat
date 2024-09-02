var sell_ProductP2={
  "discount": 0.25,
  "list-product": ["sp014","sp017","sp019","sp020","sp022"]
}
  
  var ProductP2 = ["sp013", "sp014", "sp015", "sp016", "sp017", "sp018","sp019", "sp020","sp021", "sp022","sp023", "sp024"];
  let test = "";
   const container = document.querySelector('.product-container')
  for (var i = 0; i < ProductP2.length; i++) {
  
      const product = database[ProductP2[i]]
      var price = VND.format(product.price);
      var sell_price= VND.format(product.price*(1-sell_ProductP2.discount));
      if(ProductP2[i] == sell_ProductP2["list-product"][0] || ProductP2[i] == sell_ProductP2["list-product"][1] || ProductP2[i] == sell_ProductP2["list-product"][2] || ProductP2[i] == sell_ProductP2["list-product"][3] || ProductP2[i] == sell_ProductP2["list-product"][4]){
        test += ` 
        <div class="hang">
              <div class="product" id="${ProductP2[i]}">
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
              <div class="product" id="${ProductP2[i]}">
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