const TOTAL_ITEMS = 700000;
const TOTAL_DAYS = 366;

const mDates = [];
const mCounter = {};

for (let i = 0; i < TOTAL_DAYS; i++) {
    const mDate = new Date(2020, 0, i + 1);
    mDates.push(`${mDate.getMonth() + 1}-${mDate.getDate()}`);
}


let seed = 0xABCD;
function seededRandom() {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

function randomRange(min, max) {
    return seededRandom() * (max - min) + min;
}


let itemsLeft = TOTAL_ITEMS;
for (let i = 0; i < TOTAL_DAYS; i++) {
    const today = mDates[i];
    const yesterday = (i == 0) ? '' : mDates[i - 1];
    const counterYesterday = (i == 0) ? 0 : mCounter[yesterday];

    const daysLeft = (TOTAL_DAYS - i);
    const itemsToday = Math.floor(randomRange(0.7, 1.2) * (itemsLeft / daysLeft));

    mCounter[today] = counterYesterday + itemsToday;

    itemsLeft = itemsLeft - itemsToday;
}

mCounter[mDates[TOTAL_DAYS - 1]] = TOTAL_ITEMS;

function today() {
    const mDate = new Date();
    return `${mDate.getMonth() + 1}-${mDate.getDate()}`;
}

function setCounter() {
    document.getElementById('my-counter').value = mCounter[today()];
    setInterval(setCounter, 60 * 60 * 1000);
}

window.addEventListener('DOMContentLoaded', () => {
    setCounter();
});
