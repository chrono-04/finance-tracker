import {
  renderFromLocalStorage,
  saveToLocalStorage,
  clearField,
  descInput,
  amountInput,
  categoryInput,
  dateInput,
  recordsDatabase,
} from "./main.js";

function addRecord() {
  // input validation
  descInput.value = descInput.value.trim();
  amountInput.value = amountInput.value.trim();
  if (
    descInput.value === "" ||
    amountInput.value === "" ||
    dateInput.value === ""
  ) {
    alert("Invalid input. Try again");
    return;
  }

  const data = {
    id: crypto.randomUUID(),
    desc: descInput.value,
    amount: amountInput.value,
    category: categoryInput.value,
    date: dateInput.value,
  };
  recordsDatabase.push(data);
  saveToLocalStorage(recordsDatabase);
  renderFromLocalStorage();
  clearField();
  console.log(recordsDatabase);
}

export { addRecord };
