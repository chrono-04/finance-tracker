import { addRecord } from "../scripts/addRecord.js";
import { editRecord } from "../scripts/editRecord.js";
import { deleteRecord } from "../scripts/deleteRecord.js";
import { Chart } from "chart.js/auto";
import sampleData from "../data/sampleData.json" assert { type: "json" };

const descInput = document.querySelector(".desc-input-el");
const amountInput = document.querySelector(".amount-input-el");
const categoryInput = document.querySelector(".category-el");
const dateInput = document.querySelector(".date-input-el");
const submitBtn = document.querySelector(".submit-btn-el");
const table = document.querySelector(".table-el");
const expensesTotal = document.querySelector(".expenses-el");
const chartContainer = document.querySelector(".chart-container");
let expensesPerMonth = null;
let expensesAmount = null;

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
    delBtn.classList.add("modal-btn");
    updateBtn.classList.add("modal-btn");
    delBtn.classList.add("del-btn");
    updateBtn.classList.add("save-btn");

    tr.appendChild(actionTd);
    actionTd.appendChild(updateBtn);
    actionTd.appendChild(delBtn);
    table.appendChild(tr);

    expensesSummary();

    delBtn.addEventListener("click", deleteRecord);
    updateBtn.addEventListener("click", editRecord);
  });

  const expensesSummaryChart = recordsDatabase.reduce((acc, currentItem) => {
    const date = new Date(currentItem.date);
    const month = date.toLocaleString("en-US", { month: "long" });

    acc[month] = (acc[month] || 0) + currentItem.amount;
    return acc;
  }, {});

  function summaryBarChart(ctx) {
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: monthData,
        datasets: [
          {
            label: "Prices",
            data: amountData,
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  console.log(expensesSummaryChart);

  expensesPerMonth = Object.keys(expensesSummaryChart);
  expensesAmount = Object.values(expensesSummaryChart);

  console.log(expensesPerMonth);
  console.log(expensesAmount);

  const expensesChart = document.createElement("canvas");
  expensesChart.setAttribute("id", "expensesChart");
  summaryBarChart(expensesChart);
  chartContainer.appendChild(expensesChart);
}

function expensesSummary() {
  recordsDatabase = JSON.parse(
    localStorage.getItem("financial-records") || "[]",
  );

  const updatedDatabase = recordsDatabase.reduce((acc, currentItem) => {
    const amount = Number(currentItem.amount);
    return acc + amount;
  }, 0);
  expensesTotal.textContent = updatedDatabase;
}

function clearField() {
  descInput.value = "";
  amountInput.value = "";
  dateInput.value = "";
}

function addSampleData() {
  recordsDatabase.push(...sampleData);
  saveToLocalStorage(recordsDatabase);
}

console.log(typeof recordsDatabase);

renderFromLocalStorage();

submitBtn.addEventListener("click", addRecord);

export {
  saveToLocalStorage,
  renderFromLocalStorage,
  clearField,
  recordsDatabase,
  descInput,
  amountInput,
  categoryInput,
  dateInput,
  submitBtn,
  table,
};
