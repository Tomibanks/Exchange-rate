const moneyEl_one = document.getElementById("money-one");
const moneyEl_two = document.getElementById("money-two");
const amountEl_one = document.getElementById("amount-one");
const amountEl_two = document.getElementById("amount-two");

const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

function calculate() {
  const money_one = moneyEl_one.value;
  const money_two = moneyEl_two.value;

  fetch(
    `https://v6.exchangerate-api.com/v6/7fd01307d9d6ca694b22923d/latest/${money_one}`
  )
    .then((res) => res.json())
    .then((data) => {
      //console.log(data);
      const rate = data.conversion_rates[money_two];

      rateEl.innerText = `1 ${money_one} = ${rate} ${money_two}`;

      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    });
}

moneyEl_one.addEventListener("change", calculate);
moneyEl_two.addEventListener("change", calculate);
amountEl_one.addEventListener("input", calculate);
amountEl_two.addEventListener("input", calculate);

swap.addEventListener("click", () => {
  const dave = moneyEl_one.value;
  moneyEl_one.value = moneyEl_two.value;
  moneyEl_two.value = dave;
  calculate();
});

calculate();
