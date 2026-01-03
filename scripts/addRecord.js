import { renderFromLocalStorage, saveToLocalStorage } from "./renderUi.js";
import { loadFromLocalStorage } from "../scripts/storage.js";

function addRecord(transacInput, descEl, amountEl, categoryEl, dateEl) {
  // input validation
  descEl.value = descEl.value.trim();
  amountEl.value = amountEl.value.trim();
  if (descEl.value === "" || amountEl.value === "" || dateEl.value === "") {
    alert("Invalid input. Try again");
    return;
  }

  const data = {
    id: crypto.randomUUID(),
    type: transacInput.value,
    desc: descEl.value,
    amount: amountEl.value,
    category: categoryEl.value,
    date: dateEl.value,
  };

  const database = loadFromLocalStorage();
  database.push(data);
  saveToLocalStorage(database);
  renderFromLocalStorage();
  descEl.value = "";
  amountEl.value = "";
  dateEl.value = "";
  console.log(database);
}

export { addRecord };
