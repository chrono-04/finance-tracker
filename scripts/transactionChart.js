import { Chart } from "chart.js/auto";
import { recordsDatabase } from "../scripts/database.js";

function renderChart(chartContainerEl) {
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
  chartContainerEl.appendChild(expensesChart);
}

export { renderChart };
