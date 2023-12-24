const productDOM = document.querySelector('.product');

const url = 'https://course-api.com/javascript-store-single-product';

const fetchProduct = async () => {
  try {
    productDOM.innerHTML = '<h4 class="product-loading">Loading...<h4>';

    //window.location.search

    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    //console.log(id);
    const respose = await fetch(`${url}?id=${id}`);
    const data = await respose.json();
    return data;
  } catch (error) {
    productDOM.innerHTML =
      '<p class="error">There was an error loading the product.<p>';
  }
};

const displayProduct = (product) => {
  //company, colors, description, name:title, price, image(url:img)

  const {
    company,
    colors,
    description,
    name: title,
    price,
    image,
  } = product.fields;

  const { url: img } = image[0];

  document.title = title.toUpperCase();

  console.log(colors);

  const colorsList = colors
    .map((color) => {
      console.log(color);
      return `<span class="product-color" style="background: ${color}"></span>`;
    })
    .join('');

  productDOM.innerHTML = `
    
    <div class="product-wrapper">
        <img src="${img}" alt="${title}" class="img" />
        <div class="product-info">
          <h3>${title}</h3>
          <h5>${company}</h5>
          <span>$${price / 100}</span>
          <div class="colors">
            ${colorsList}
          </div>
          <p>
        ${description}
          </p>
          <button class="btn">add to cart</button>
        </div>
      </div>

    `;

  console.log(product);
};

const start = async () => {
  const data = await fetchProduct();
  displayProduct(data);
};

start();
