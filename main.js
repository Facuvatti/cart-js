let url = 'https://fakestoreapi.com/products';
let ctn = document.querySelector('.products');
let cart = JSON.parse(localStorage.getItem('cart')) || [];
console.log(cart)
loadProducts();
updateCart();

function loadProducts() {
  fetch(url)
    .then(res => res.json())
    .then(products => {
      for (let product of products)
        createProduct(product);
    });
}


function createProduct(product) {
  // asignacion desestructurante, equivalente a 
  // las lineas 18 a 20
  let { title, price, image } = product;
  /*
  let title = product.title;
  let price = product.price;
  let image   = product.image;
  */
  let div = document.createElement('div');
  let  h3 = document.createElement('h3');
  let   p = document.createElement('p');
  let img = document.createElement('img');
  let btn = document.createElement('button');
  let btnDel = document.createElement('button');
  let container = document.createElement("div");
  let qty = document.createElement('p');
  div.classList.add('product-card');
  h3.textContent = title;
  p.textContent  = '$ ' + price;
  img.src        = image;
  btn.textContent = "+"
  btn.onclick = addToCart;
  btnDel.onclick = deleteOfCart;
  btnDel.textContent = "-";
  container.style.display = "flex";
  container.style.flexDirection = "row";
  container.append(btn,btnDel,qty)
  div.append(h3,img,p,container);
  ctn.append(div);
}

function addToCart(e) {
  let btn = e.currentTarget;         // el button
  let btnContainer = btn.parentElement; // el div
  let qty = btnContainer.children[2];
  let btnFather = btnContainer.parentElement;
  let title = btnFather.children[0].textContent; // el h3
  let price = btnFather.children[2].textContent; // el p
  price = price.split(' ')[1]; // split divide strings
  let item = { title, price }; // un objeto para agregar
  item.qty = 1;
  // buscar si ya esta en el carrito y sumarle uno si esta
  let found = false;
  for (let product of cart) {
    if (product.title == item.title) {
      product.qty += 1;
      qty.textContent = product.qty;
      found = true;
    } 
  }
  // si no esta agregar el objeto item
  if (!found) cart.push(item);
  // guardar en localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();
}
function deleteOfCart(e) {
  let btn = e.currentTarget;         // el button
  let btnContainer = btn.parentElement;
  let qty = btnContainer.children[2];
  let btnFather = btnContainer.parentElement;
  let title = btnFather.children[0].textContent; // el h3

  // buscar si ya esta en el carrito y sumarle uno si esta
  i = 0;
  for (let product of cart) {
    
    if (product.title == title) {
       if (product.qty> 0){
      product.qty -= 1;
      qty.textContent = product.qty;
      }
      if (product.qty == 0) cart.splice(i,1);
    }
    i = i + 1;
  }
  
  // guardar en localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();  
}
function createCartRow(product) {
  let { title, price, qty } = product;
  let p = document.createElement('p');
  p.textContent = `${title} $ ${price} Cant: ${qty}`;
  return p;
}

function updateCart() {
  let cartDrawer = document.querySelector('.cart');
  cartDrawer.innerHTML = '';
  let suma = 0;
  if (cart.length == 0) {
    let h3 = document.createElement('h3');
    h3.textContent = 'Tu carrito está vacío'
    cartDrawer.append(h3);
  } else {
    for (let product of cart) {
      suma += product.price * product.qty;
      let row = createCartRow(product);
      cartDrawer.append(row);
    }
  }
  let hr = document.createElement('hr');
  cartDrawer.append(hr);
  // mostrar total
  let h2 = document.createElement('h2');
  h2.textContent = `TOTAL: $ ${suma}`;
  cartDrawer.append(h2);

  let btn = document.createElement('button');
  btn.onclick = toggleCart;
  btn.textContent = 'Cerrar';
  cartDrawer.append(btn);
}

function toggleCart() {
  let cartDrawer = document.querySelector('.cart');
  cartDrawer.classList.toggle('closed');
}
