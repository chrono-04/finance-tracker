import { renderChart } from "../scripts/transactionChart.js";
import { deleteRecord } from "../scripts/deleteRecord.js";
import { editRecord } from "../scripts/editRecord.js";
import { loadFromLocalStorage } from "../scripts/storage.js";

const expensesTotal = document.querySelector(".expenses-el");
const table = document.querySelector(".table-el");
const chartContainer = document.querySelector(".chart-container");
const incomeTotal = document.querySelector(".income-el");

function saveToLocalStorage(arr) {
  localStorage.setItem("financial-records", JSON.stringify(arr));
}

function transactionSummary() {
  const database = loadFromLocalStorage();
  const totalExpenses = database
    .filter((item) => item.type === "Expense")
    .reduce((acc, currentItem) => {
      const amount = Number(currentItem.amount);
      return acc + amount;
    }, 0);

  const totalIncome = database
    .filter((item) => item.type === "Income")
    .reduce((acc, currentItem) => {
      const amount = Number(currentItem.amount);
      return acc + amount;
    }, 0);

  expensesTotal.textContent = totalExpenses;
  incomeTotal.textContent = totalIncome;
}

function renderFromLocalStorage() {
  while (table.children.length > 1) {
    table.removeChild(table.lastChild);
  }

  while (chartContainer.firstChild) {
    chartContainer.removeChild(chartContainer.firstChild);
  }

  const database = loadFromLocalStorage();

  // iterate through the array
  database.map(({ id, ...item }) => {
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
    delBtn.classList.add("modal-btn");
    updateBtn.classList.add("modal-btn");
    delBtn.classList.add("del-btn");
    updateBtn.classList.add("save-btn");

    tr.appendChild(actionTd);
    actionTd.appendChild(updateBtn);
    actionTd.appendChild(delBtn);
    table.appendChild(tr);

    transactionSummary();

    delBtn.addEventListener("click", deleteRecord);
    updateBtn.addEventListener("click", editRecord);
  });
  renderChart(chartContainer);
}

export { saveToLocalStorage, renderFromLocalStorage };
