var stockPrice = document.querySelector('#stock-price');
var stockQty = document.querySelector('#stock-qty');
var currentPrice = document.querySelector('#current-price');
var submitBtn = document.querySelector('#submit-btn');
var result = document.querySelector('#result');

submitBtn.addEventListener('click', handleSubmit);

function handleSubmit() {
    var sp = Number(stockPrice.value);
    var qty = Number(stockQty.value);
    var curr = Number(currentPrice.value);
    if(isNaN(sp) || isNaN(qty) || isNaN(curr)){
        errorInfo("Please enter numerical inputs !!");
        document.body.style.background = "red";
    }
    else if (stockPrice.value=='' || stockQty.value=='' || currentPrice.value=='') {
        errorInfo("Please fill out the empty fields !!");
        document.body.style.background = "red";
    }
    else if (sp<0 || qty<0 || curr<0) {
        errorInfo("Please enter positive inputs !!");
        document.body.style.background = "red";
    }
    else {
        calculateProfitLoss(sp, qty, curr);
    }
}

function calculateProfitLoss(price, quantity, current) {
    if (price < current) {
        calculate(price, current, quantity, 0);
        document.body.style.background = "rgb(144, 238, 144)";
    } else if (price > current) {
        calculate(price, current, quantity, 1);
        document.body.style.background = "#ff00009a";
    } else {
        calculate(current, price, quantity, 2);
        document.body.style.background = "red";
    }
}

function calculate(price, current, quantity, status) {
    var temp = (status === 0) ? ((current - price) * quantity) : ((price - current) * quantity);
    var per = temp / price * 100;
    switch (status) {
        case 0:
            displayInfo("Profit", temp.toFixed(2), per.toFixed(2));
            break;
        case 1:
            displayInfo("Loss", temp.toFixed(2), per.toFixed(2));
            break;
        case 2:
            errorInfo("No Profit No Loss !!");
            break;
        default:
            errorInfo("Invalid status");
            break;
    }
}

function displayInfo(txt, val1, val2){
    result.innerHTML= txt+ " is " + val1 + " and " + txt.toLowerCase() + " percentage is " + val2 + "%";
}

function errorInfo(text){
    result.innerHTML = text;
}
