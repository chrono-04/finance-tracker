import { addRecord } from "../scripts/addRecord.js";
import { editRecord } from "../scripts/editRecord.js";
import { deleteRecord } from "../scripts/deleteRecord.js";
import { Chart } from "chart.js/auto";

const descInput = document.querySelector(".desc-input-el");
const amountInput = document.querySelector(".amount-input-el");
const categoryInput = document.querySelector(".category-el");
const dateInput = document.querySelector(".date-input-el");
const submitBtn = document.querySelector(".submit-btn-el");
const table = document.querySelector(".table-el");
const expensesTotal = document.querySelector(".expenses-el");
const chartContainer = document.querySelector(".chart-container");

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

  while (chartContainer.firstChild) {
    chartContainer.removeChild(chartContainer.firstChild);
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
  renderChart();
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

function renderChart() {
  const expensesSummaryChart = recordsDatabase.reduce((acc, currentItem) => {
    const date = new Date(currentItem.date);
    const month = date.toLocaleString("en-US", { month: "long" });

    acc[month] = (acc[month] || 0) + Number(currentItem.amount);
    return acc;
  }, {});

  const expensesPerMonth = Object.keys(expensesSummaryChart);
  const expensesAmount = Object.values(expensesSummaryChart);

  function summaryBarChart(ctx) {
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: expensesPerMonth,
        datasets: [
          {
            label: "Prices",
            data: expensesAmount,
            borderWidth: 1,
            backgroundColor: "#B1E5F2",
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: { color: "white" },
          },
          x: {
            ticks: { color: "white" },
          },
        },
      },
    });
  }

  console.log(expensesSummaryChart);

  console.log(expensesPerMonth);
  console.log(expensesAmount);

  const expensesChart = document.createElement("canvas");
  expensesChart.setAttribute("id", "expensesChart");
  summaryBarChart(expensesChart);
  chartContainer.appendChild(expensesChart);
}

function clearField() {
  descInput.value = "";
  amountInput.value = "";
  dateInput.value = "";
}

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
