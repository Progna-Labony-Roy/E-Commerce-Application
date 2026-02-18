const loadProducts = () => {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json()) //promise of json data
    .then((json) => displayProduct(json));
};


const loadProductDetail = async (id) => {
  const url = `https://fakestoreapi.com/products/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayProductDetails(details);
};

const displayProductDetails = (product) => {
  console.log(product);
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `
<div class="card bg-base-100 lg:w-96 md:w-80 lg:h-[460px] md:h-[420px] shadow-sm">
        <div class="card-body">
            <p class="font-semibold mb-2">Product name:${product?.title}</p>
            <p class="font-semibold mb-2">Description:${product?.description}</p>
            <p class="font-semibold mb-2">Price:$${product?.price}</p>
            </p>
              <p class="font-semibold mb-2">Rating:${product?.rating?.rate}</p>

          
          <div class="card-actions justify-between">
            <button class="btn btn-outline w-[48%]">Buy Now</button>
            <button class="btn btn-primary w-[48%]">Add to cart</button>
          </div>
        </div>
      </div>
    `;
  document.getElementById("product_modal").showModal();
};


const displayProduct = (products) => {
  //   PRODUCTS
  //   1. get the container and empty
  const productContainer = document.getElementById("product-container");
  productContainer.innerHTML = "";
const threeProducts = products.slice(0,3);
  // 2.get into every products
  for (let product of threeProducts) {
    // 3.create element
    
    const cardDiv = document.createElement("div");
    cardDiv.innerHTML = `
  <div class="card bg-base-100 lg:w-96 md:w-80 lg:h-[460px] md:h-[420px] shadow-sm">
        <figure>
          <img class="lg:h-72 md:h-64 h-52 md:p-5"
            src=${product?.image}
            alt="Shoes"
          />
        </figure>
        <div class="card-body">
          <div class="flex justify-between">
            <div>
              <p class="text-blue-500 bg-blue-50 rounded-full px-2 text-xs">
                ${product?.category}
              </p>
            </div>
            <div class="flex">
              <i class="fa-solid fa-star text-yellow-400 pt-1"></i>
              <p class="mx-2"><span class="font-semibold">${product?.rating?.rate}</span> (${product?.rating?.count})</p>
            </div>
          </div>
          <div class="ml-2">
            <p class="font-semibold">${product?.title}</p>
            <p class="font-bold">$(${product?.price})</p>
          </div>
          <div class="card-actions justify-between">
            <button onclick="loadProductDetail(${product?.id})" id="product-details-${product?.category}" class="btn btn-outline w-[48%]">Details</button>
            <button class="btn btn-primary w-[48%]">Add</button>
          </div>
        </div>
      </div>
    `;
    //   4.append into container;
    productContainer.append(cardDiv);
  }
};

loadProducts();
