/*
 * ✅ Use the Coinlore API (Coins)
 *    https://www.coinlore.com/cryptocurrency-data-api
 *
 *    Get 10 coins per "page"
 */

//DOM Elements
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const tableBody = document.querySelector("tbody");
let start = 0;

//hide previous button
prevBtn.classList.add("hide-btn");

const fetchCrypto = () => {
  fetch(`https://api.coinlore.com/api/tickers/?start=${start}&limit=10`)
    .then(res => res.json())
    .then(data => {
      data.data.forEach(crypto => {
        let tableRowData = `
        <tr>
          <td class="crypto-name">${crypto.name}</td>
          <td class="crypto-symbol">${crypto.symbol}</td>
          <td class="crypto-price">${crypto.price_usd}</td>
          <td class="crypto-total">${crypto.tsupply}</td>
        </tr>
      `;
        tableBody.insertAdjacentHTML("beforeend", tableRowData);
      });
    })
    .catch(err => console.log(err));
};

window.onload = () => {
  fetchCrypto();
};

const showNextTenCrypto = () => {
  tableBody.innerHTML = "";
  start += 10;

  fetchCrypto();
  toggleButtonDisplay();
};

const showPrevTenCrypto = () => {
  tableBody.innerHTML = "";
  start -= 10;

  fetchCrypto();
  toggleButtonDisplay(count);
};

prevBtn.addEventListener("click", showPrevTenCrypto);
nextBtn.addEventListener("click", showNextTenCrypto);

const toggleButtonDisplay = () => {
  start >= 10
    ? prevBtn.classList.remove("hide-btn")
    : prevBtn.classList.add("hide-btn");

  start < 10
    ? prevBtn.classList.add("hide-btn")
    : prevBtn.classList.remove("hide-btn");
};
