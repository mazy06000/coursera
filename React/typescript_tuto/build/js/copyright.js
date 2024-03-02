"use strict";
// let year: HTMLElement | null
// year = document.getElementById('year');
// let thisYear: string
// thisYear = new Date().getFullYear().toString();
// if (year) {
//     year.setAttribute('value', thisYear);
//     year.textContent = thisYear;
// }
const year = document.getElementById('year');
const thisYear = new Date().getFullYear().toString();
year.setAttribute('value', thisYear);
year.textContent = thisYear;
