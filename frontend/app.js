let cart = JSON.parse(localStorage.getItem("cart")) || [];

const products = [
  {
    name: "DESTROYER HOODIE",
    price: 8900,
    img: "img/hoodie.jpg"
  },
  {
    name: "DESTROYER JERSEY",
    price: 5500,
    img: "img/jersey.jpg"
  }
];

// показать товары
function renderProducts() {
  const container = document.getElementById("products");
  container.innerHTML = "";

  products.forEach(p => {
    container.innerHTML += `
      <div class="product">
        <img src="${p.img}">
        <h3>${p.name}</h3>
        <p>${p.price} руб</p>
        <button onclick="addToCart('${p.name}', ${p.price})">Купить</button>
      </div>
    `;
  });
}

// добавить в корзину
function addToCart() {
  if (!selectedSize) {
    alert("Выбери размер");
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push({
    name: currentProduct.name,
    price: currentProduct.price,
    size: selectedSize
  });

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("Добавлено в корзину 🔥");
}

// отрисовать корзину
function renderCart() {
  const div = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");

  let total = 0;
  div.innerHTML = "";

  cart.forEach((item, index) => {
    total += item.price;

    div.innerHTML += `
      <p>
        ${item.name} - ${item.price}
        <button onclick="removeFromCart(${index})">❌</button>
      </p>
    `;
  });

  totalEl.innerText = "Итого: " + total + " руб";

  localStorage.setItem("cart", JSON.stringify(cart));
}
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}
  });

  totalEl.innerText = "Итого: " + total + " руб";
}

// скролл к товарам
function scrollToProducts() {
  document.getElementById("products").scrollIntoView({
    behavior: "smooth"
  });
}

// кнопка оплаты (пока заглушка)
function checkout() {
  if (cart.length === 0) {
    alert("Корзина пустая");
    return;
  }

  fetch("http://localhost:3001/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      cart: cart
    })
  })
  .then(res => res.json())
  .then(data => {
    alert("Заказ отправлен 🔥");

    cart = [];
    renderCart();
  })
  .catch(err => {
    alert("Ошибка 😢");
    console.log(err);
  });
}
  .then(res => res.json())
  .then(data => {
    alert("Заказ отправлен 🔥");
    cart = [];
    renderCart();
  })
  .catch(err => {
    console.error(err);
    alert("Ошибка");
  });

// запуск при загрузке
renderProducts();

function renderProducts() {
  fetch("http://localhost:3001/products")
    .then(res => res.json())
    .then(products => {
      const container = document.getElementById("products");
      container.innerHTML = "";

      products.forEach(p => {
        container.innerHTML += `
          <div class="product" onclick="openProduct('${p._id}')">
            <img src="${p.img}">
            <h3>${p.name}</h3>
            <p>${p.description || ""}</p>
            <p>${p.price} руб</p>
            <button onclick="addToCart('${p.name}', ${p.price})">Купить</button>
          </div>
        `;
      });
    });
}

function addToCart(name, price) {
  cart.push({ name, price });
  renderCart();
}

function renderCart() {
  const div = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");

  let total = 0;
  div.innerHTML = "";

  cart.forEach(item => {
    total += item.price;
    div.innerHTML += `<p>${item.name} (${item.size || "-"}) - ${item.price}</p>`;
  });

  totalEl.innerText = "Итого: " + total + " руб";
}

function scrollToProducts() {
  document.getElementById("products").scrollIntoView({
    behavior: "smooth"
  });
}

renderProducts();

function openProduct(id) {
  window.location.href = "product.html?id=" + id;
}

function renderProducts() {
  fetch("http://localhost:3001/products")
    .then(res => res.json())
    .then(products => {
      const container = document.getElementById("products");
      container.innerHTML = "";

      products.forEach(p => {
        container.innerHTML += `
          <div class="product">
            <img src="${p.img}" width="200">
            <h3>${p.name}</h3>
            <p>${p.price} руб</p>
            <button onclick="addToCart('${p.name}', ${p.price})">
              Купить
            </button>
          </div>
        `;
      });
    });
}
renderProducts();
renderCart();

window.onload = () => {
  document.body.classList.add("loaded");

  const loader = document.getElementById("loader");
  if (loader) {
    loader.style.display = "none";
  }
};

app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.get("/add-products", async (req, res) => {
  await Product.deleteMany();

  await Product.insertMany([
    {
      name: "DESTROYER HOODIE",
      price: 8900,
      img: "hoodie.jpg"
    },
    {
      name: "DESTROYER JERSEY",
      price: 5500,
      img: "jersey.jpg"
    }
  ]);

  res.send("products added");
});