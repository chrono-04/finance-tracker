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
    updateBtn.textContent = "Update";
    delBtn.textContent = "Delete";
    delBtn.dataset.id = id;
    updateBtn.dataset.id = id;

    tr.appendChild(actionTd);
    actionTd.appendChild(updateBtn);
    actionTd.appendChild(delBtn);
    table.appendChild(tr);

    delBtn.addEventListener("click", deleteItem);
  });
}

function deleteItem(e) {
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
