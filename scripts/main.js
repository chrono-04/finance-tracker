import { addRecord } from "../scripts/addRecord.js";
import { renderFromLocalStorage } from "../scripts/renderUi.js";

const descInput = document.querySelector(".desc-input-el");
const amountInput = document.querySelector(".amount-input-el");
const categoryInput = document.querySelector(".category-el");
const dateInput = document.querySelector(".date-input-el");
const submitBtn = document.querySelector(".submit-btn-el");

renderFromLocalStorage();

submitBtn.addEventListener("click", () => {
  addRecord(descInput, amountInput, categoryInput, dateInput);
});
