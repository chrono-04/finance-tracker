import { renderFromLocalStorage, saveToLocalStorage } from "./renderUi.js";
import { loadFromLocalStorage } from "../scripts/storage.js";

function editRecord(e) {
  const itemId = e.target.dataset.id;
  console.log(itemId);
  const tr = e.target.closest("tr");
  while (tr.firstChild) {
    tr.removeChild(tr.firstChild);
  }
  const newType = document.createElement("select");
  const typeSelection = ["Expense", "Income"];
  typeSelection.forEach((item) => {
    const option = document.createElement("option");
    option.setAttribute("value", item);
    option.textContent = item;
    newType.appendChild(option);
  });
  const newDesc = document.createElement("input");
  newDesc.setAttribute("placeholder", "Enter new description...");
  const newAmount = document.createElement("input");
  newAmount.setAttribute("type", "number");
  newAmount.setAttribute("placeholder", "Enter new amount...");
  const newCategory = document.createElement("select");
  const categoryColleciton = [
    "Food & Drink",
    "Transporation",
    "Utilities",
    "Personal",
  ];
  categoryColleciton.forEach((item) => {
    const option = document.createElement("option");
    option.setAttribute("value", item);
    option.textContent = item;
    newCategory.appendChild(option);
  });

  const newDate = document.createElement("input");
  newDate.setAttribute("type", "date");

  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Save";

  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Cancel";

  newType.classList.add("modal-input");
  newDesc.classList.add("modal-input");
  newAmount.classList.add("modal-input");
  newCategory.classList.add("modal-input");
  newDate.classList.add("modal-input");
  saveBtn.classList.add("modal-btn");
  cancelBtn.classList.add("modal-btn");
  saveBtn.classList.add("save-btn");
  cancelBtn.classList.add("cancel-btn");

  const td0 = document.createElement("td");
  const td1 = document.createElement("td");
  const td2 = document.createElement("td");
  const td3 = document.createElement("td");
  const td4 = document.createElement("td");
  const td5 = document.createElement("td");

  td0.appendChild(newType);
  td1.appendChild(newDesc);
  td2.appendChild(newAmount);
  td3.appendChild(newCategory);
  td4.appendChild(newDate);
  td5.appendChild(saveBtn);
  td5.appendChild(cancelBtn);

  tr.appendChild(td0);
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  tr.appendChild(td5);

  function saveRecord() {
    newDesc.value = newDesc.value.trim();
    newAmount.value = newAmount.value.trim();
    if (
      newDesc.value === "" ||
      newAmount.value === "" ||
      newDate.value === ""
    ) {
      alert("Invalid input. Try again");
      return;
    }

    const database = loadFromLocalStorage();
    const updatedDatabase = database.map((item) => {
      return item.id === itemId
        ? {
            ...item,
            type: newType.value,
            desc: newDesc.value,
            amount: newAmount.value,
            category: newCategory.value,
            date: newDate.value,
          }
        : item;
    });
    saveToLocalStorage(updatedDatabase);
    renderFromLocalStorage();
  }

  saveBtn.addEventListener("click", saveRecord);
  cancelBtn.addEventListener("click", () => {
    renderFromLocalStorage();
  });
}

export { editRecord };
