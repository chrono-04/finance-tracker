import { Chart } from "chart.js/auto";
import { loadFromLocalStorage } from "../scripts/storage.js";

function renderChart(chartContainerEl) {
  const database = loadFromLocalStorage();

  const expensesSummaryChart = database.reduce((acc, currentItem) => {
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
            label: "Expenses",
            data: expensesAmount,
            borderWidth: 1,
            backgroundColor: "#B1E5F2",
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

  console.log(expensesSummaryChart);

  console.log(expensesPerMonth);
  console.log(expensesAmount);

  const expensesChart = document.createElement("canvas");
  expensesChart.setAttribute("id", "expensesChart");
  summaryBarChart(expensesChart);
  chartContainerEl.appendChild(expensesChart);
}

export { renderChart };
