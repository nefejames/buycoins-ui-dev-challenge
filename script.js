//DOM Elements
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const tableBody = document.querySelector("tbody");
let start = 0;

//hide previous button
prevBtn.classList.add("hide-btn");

const fetchCrypto = async () => {
  const response = await fetch(
    `https://api.coinlore.com/api/tickers/?start=${start}&limit=10`
  );
  const data = await response.json();
  let tableRowData = "";
  data.data.forEach(crypto => {
    tableRowData += `
       <tr>
         <td class="crypto-name">${crypto.name}</td>
         <td class="crypto-symbol">${crypto.symbol}</td>
         <td class="crypto-price">${crypto.price_usd}</td>
         <td class="crypto-total">${crypto.tsupply}</td>
       </tr>
     `;
  });
  return (tableBody.innerHTML = tableRowData);
};

window.onload = () => {
  fetchCrypto();
};

//fetch next 10 cryptos
const showNextTenCrypto = () => {
  start += 10;

  fetchCrypto();
  toggleButtonDisplay();
};

//fetch previous 10 cryptos
const showPrevTenCrypto = () => {
  start -= 10;

  fetchCrypto();
  toggleButtonDisplay();
};

prevBtn.addEventListener("click", showPrevTenCrypto);
nextBtn.addEventListener("click", showNextTenCrypto);

//conditionally display prev btn
const toggleButtonDisplay = () => {
  start >= 10
    ? prevBtn.classList.remove("hide-btn")
    : prevBtn.classList.add("hide-btn");
};
