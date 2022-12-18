"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// // Data
// const account1 = {
//   owner: 'Jonas Schmedtmann',
//   movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//   interestRate: 1.2, // %
//   pin: 1111,
// };

// const account2 = {
//   owner: 'Jessica Davis',
//   movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//   interestRate: 1.5,
//   pin: 2222,
// };

// const account3 = {
//   owner: 'Steven Thomas Williams',
//   movements: [200, -200, 340, -300, -20, 50, 400, -460],
//   interestRate: 0.7,
//   pin: 3333,
// };

// const account4 = {
//   owner: 'Sarah Smith',
//   movements: [430, 1000, 700, 50, 90],
//   interestRate: 1,
//   pin: 4444,
// };

// const accounts = [account1, account2, account3, account4];

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2022-12-14T14:43:26.374Z",
    "2022-12-17T18:49:59.371Z",
    "2022-12-18T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

//functions

const formatMovementDate = function (date) {
  const day = `${date.getDate()}`.padStart(2, 0);
  const month = `${date.getMonth() + 1}`.padStart(2, 0);
  const year = date.getFullYear();
 const calcDisplaydates = (date1, date2) => Math.round(Math.abs(date1 - date2)/(1000*60*60*24));
const daysPassed = calcDisplaydates(new Date(), date);
console.log(daysPassed);
if(daysPassed === 0) return "Today";
if(daysPassed === 1) return "Yesterday";
if(daysPassed <=7) return `${daysPassed} days ago`;
else{

  const day = `${date.getDate()}`.padStart(2, 0);
  const month = `${date.getMonth() + 1}`.padStart(2, 0);
  const year = date.getFullYear();
  return    `${day}/${month}/${year}`;
}
};

// setting the date part--
const now = new Date();
const day = `${now.getDate()}`.padStart(2, 0);
const month = `${now.getMonth() + 1}`.padStart(2, 0);
const year = now.getFullYear();
const hour = `${now.getHours()}`.padStart(2, 0);
const min = `${now.getMinutes()}`.padStart(2, 0);
labelDate.textContent = `${day}/${month}/${year} ${hour}:${min}`;

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = " ";

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const date = new Date(acc.movementsDates[i]);

    const displayDate = formatMovementDate(date);

   

    const html = `
  <div class="movements__row">
  <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
  <div class="movements__date">${displayDate}</div>
  <div class="movements__value">${mov}€</div>
</div>
`;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

// displaying total balance
const calcdisplaybalance = function (acc) {
  acc.balance = acc.movements.reduce(function (acc, mov) {
    return acc + mov;
  }, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

// displaying total income and outgoing balance
const calcSummary = function (acc) {
  const income = acc.movements
    .filter((mov) => mov > 0)
    .reduce(function (acc, curr) {
      return acc + curr;
    }, 0);
  labelSumIn.textContent = `${income}€`;

  const outMoney = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, curr) => {
      return acc + curr;
    }, 0);
  labelSumOut.textContent = `${Math.abs(outMoney)}€`;

  const interestt = acc.movements
    .filter((mov) => mov > 0)
    .map((mov) => (mov * acc.interestRate) / 100)
    .filter((mov) => mov >= 1)
    .reduce((acc, curr) => {
      return acc + curr;
    }, 0);

  labelSumInterest.textContent = `${interestt}€`;
};

const updateUI = function (acc) {
  // display movements
  displayMovements(acc);

  // display balance
  calcdisplaybalance(acc);

  // display summary
  calcSummary(acc);
};
// event handlers--------

let currentAccount;
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;
    // clearing input field
    inputLoginUsername.value = inputLoginPin.value = "";
    // inputLoginPin.blur();
    // updatig UI
    updateUI(currentAccount);
  } else {
    alert("hey!you entered wrong id or password or Account doesn't exist");
  }
});
// transferring amount

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    (acc) => acc.username == inputTransferTo.value
  );
  console.log(amount, receiverAcc);

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // console.log("transfer valid");
    //adding transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());
    // doing the transferr
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    inputTransferTo.value = "";
    inputTransferAmount.value = "";
    // updating the ui
    updateUI(currentAccount);
  }
});

// taking loan
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const loanAmount = Number(inputLoanAmount.value);
  // console.log("passed");
  currentAccount.movements.push(loanAmount);
  currentAccount.movementsDates.push(new Date());
  updateUI(currentAccount);
  inputLoanAmount.value = "";
});
//sorting transcations
let sortedState = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sortedState);
  sortedState = !sortedState;
});

// closing account--
// let token = true;
// btnClose.addEventListener('click', function(e){
//   e.preventDefault();
//   if(inputCloseUsername.value == currentAccount.username && inputClosePin.value == currentAccount.pin){
//     token = false;
//     alert("ARE YOU SURE");
//     const search = accounts.splice(accounts.find((acc)=>
//     acc.username == inputCloseUsername.value),1);
//     labelBalance.textContent = 0;
//     inputCloseUsername.value = '';
//     inputClosePin.value      = '';
//     labelSumIn.textContent = 0;
//     labelSumOut.textContent = 0;
//     labelSumInterest.textContent = '0.0€'
//   }

// })

// computing username
const createUsername = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map(function (name) {
        return name[0];
      })
      .join("");
  });
};
createUsername(accounts);
console.log(accounts);

// // creating fake login ----
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;


