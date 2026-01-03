import { Chart } from "chart.js/auto";
import { loadFromLocalStorage } from "../scripts/storage.js";

function renderChart(chartContainerEl) {
  const database = loadFromLocalStorage();

  const totalExpenses = database
    .filter((item) => item.type === "Expense")
    .reduce((acc, currentItem) => {
      return acc + Number(currentItem.amount);
    }, 0);

  const totalIncome = database
    .filter((item) => item.type === "Income")
    .reduce((acc, currentItem) => {
      return acc + Number(currentItem.amount);
    }, 0);

  console.log(totalExpenses, totalIncome);

  function summaryBarChart(ctx) {
    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Expenses", "Income"],
        datasets: [
          {
            label: "Transactions",
            data: [totalExpenses, totalIncome],
            borderWidth: 1,
            backgroundColor: ["#6493EB", "#D54D4D"],
            color: "white",
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
        plugins: {
          legend: {
            labels: {
              color: "white",
            },
          },
        },
      },
    });
  }

  const expensesChart = document.createElement("canvas");
  expensesChart.setAttribute("id", "expensesChart");
  summaryBarChart(expensesChart);
  chartContainerEl.appendChild(expensesChart);
}

export { renderChart };
