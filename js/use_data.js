let listProducts = [];

for (a in database) {
  listProducts.push(database[a]);
}

var bestSeller = [
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
];

const formatter = new Intl.NumberFormat("vi-VN", {
  currency: 'VND',
  style:'currency'
});
let test = "";
const container = document.querySelector(".product-container");

for (var i = 0; i < bestSeller.length; i++) {
  const product = database[bestSeller[i]];
  const pricesale = product.price * 0.75;
  const formattedPrice = formatter.format(pricesale); // Định dạng với dấu chấm phân cách hàng nghìn
  const price=formatter.format(product.price);
  test += `
    <a class="hang link" href="${product.detail_product}">
      <div class="product" id="${bestSeller[i]}">
        <div ><img class="img" src="${product.photo}" alt="Ảnh ${product.name}"></div>
        <h2 class="tensp">${product.name}</h2>
        <h3 class="giasp"><del>${price}</del></h3>
        <h3 class="giasp">${formattedPrice}</h3>
      </div>
    </a>
  `;
}

container.innerHTML = test;







