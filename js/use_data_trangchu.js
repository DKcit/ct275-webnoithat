var HostPage = ["sp026", "sp035", "sp019", "sp022"];
let test = "";
const container = document.querySelector('.product-container')
  for (var i = 0; i < HostPage.length; i++) {
    const product = database[HostPage[i]]
    var price = VND.format(product.price);
    test += ` 
      <div class="hang">
            <div class="product" id="${HostPage[i]}">
              <a href="${product.detail_product}"><img class="img" src="${product.photo}"
                  alt="${product.name}"></a>
              <h2 class="tensp">${product.name}</h2>
              <h3 class="giasp">${price}</h3>
            </div>
          </div>
          `;
  }
  container.innerHTML = test;