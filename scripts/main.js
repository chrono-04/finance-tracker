const descInput = document.querySelector(".desc-input-el");
const amountInput = document.querySelector(".amount-input-el");
const categoryInput = document.querySelector(".category-el");
const dateInput = document.querySelector(".date-input-el");
const submitBtn = document.querySelector(".submit-btn-el");
const table = document.querySelector(".table-el");

let recordsDatabase = JSON.parse(
  localStorage.getItem("financial-records") || "[]",
);

function saveToLocalStorage(arr) {
  localStorage.setItem("financial-records", JSON.stringify(arr));
}

function renderFromLocalStorage() {
  while (table.children.length > 1) {
    table.removeChild(table.lastChild);
  }

  recordsDatabase = JSON.parse(
    localStorage.getItem("financial-records") || "[]",
  );

  // iterate through the array
  recordsDatabase.map(({ id, ...item }, e) => {
    const tr = document.createElement("tr");
    // distribute object values
    Object.values(item).forEach((value) => {
      const td = document.createElement("td");
      td.textContent = value;
      tr.appendChild(td);
    });
    const delBtn = document.createElement("button");
    const updateBtn = document.createElement("button");
    const actionTd = document.createElement("td");
    updateBtn.textContent = "Edit";
    delBtn.textContent = "Delete";
    delBtn.dataset.id = id;
    updateBtn.dataset.id = id;

    tr.appendChild(actionTd);
    actionTd.appendChild(updateBtn);
    actionTd.appendChild(delBtn);
    table.appendChild(tr);

    delBtn.addEventListener("click", deleteRecord);
    updateBtn.addEventListener("click", editRecord);
  });
}

function editRecord(e) {
  const itemId = e.target.dataset.id;
  console.log(itemId);
  const tr = e.target.closest("tr");
  while (tr.firstChild) {
    tr.removeChild(tr.firstChild);
  }
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

  const td1 = document.createElement("td");
  const td2 = document.createElement("td");
  const td3 = document.createElement("td");
  const td4 = document.createElement("td");
  const td5 = document.createElement("td");

  td1.appendChild(newDesc);
  td2.appendChild(newAmount);
  td3.appendChild(newCategory);
  td4.appendChild(newDate);
  td5.appendChild(saveBtn);
  td5.appendChild(cancelBtn);

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
    recordsDatabase = recordsDatabase.map((item) => {
      return item.id === itemId
        ? {
            ...item,
            desc: newDesc.value,
            amount: newAmount.value,
            category: newCategory.value,
            date: newDate.value,
          }
        : item;
    });
    saveToLocalStorage(recordsDatabase);
    renderFromLocalStorage();
  }

  saveBtn.addEventListener("click", saveRecord);
  cancelBtn.addEventListener("click", () => {
    renderFromLocalStorage();
  });
}

function deleteRecord(e) {
  const tr = e.target.closest("tr");
  const itemId = e.target.dataset.id;
  recordsDatabase = recordsDatabase.filter((item) => {
    return item.id !== itemId;
  });
  tr.remove();
  saveToLocalStorage(recordsDatabase);
  renderFromLocalStorage();
}

function clearField() {
  descInput.value = "";
  amountInput.value = "";
  dateInput.value = "";
}

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

renderFromLocalStorage();

submitBtn.addEventListener("click", addRecord);
