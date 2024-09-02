var sell_ProductP1={
  "discount": 0.25,
  "list-product": ["sp003","sp004","sp005","sp006","sp009","sp011","sp012"]
}


var ProductP1 = ["sp001", "sp002", "sp003", "sp004", "sp005", "sp006","sp007", "sp008","sp009", "sp010","sp011", "sp012"];
let test = "";
const container = document.querySelector('.product-container')

for (var i = 0; i < ProductP1.length; i++) {

    const product = database[ProductP1[i]]
    var price = VND.format(product.price);
    var sell_price= VND.format(product.price*(1-sell_ProductP1.discount));
    if(ProductP1[i] == sell_ProductP1["list-product"][0] || ProductP1[i] == sell_ProductP1["list-product"][1] || ProductP1[i] == sell_ProductP1["list-product"][2] || ProductP1[i] == sell_ProductP1["list-product"][3] || ProductP1[i] == sell_ProductP1["list-product"][4] || ProductP1[i] == sell_ProductP1["list-product"][5] || ProductP1[i] == sell_ProductP1["list-product"][6]){
      test += ` 
      <div class="hang">
            <div class="product" id="${ProductP1[i]}">
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
            <div class="product" id="${ProductP1[i]}">
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