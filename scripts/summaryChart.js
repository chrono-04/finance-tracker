import { Chart } from "chart.js/auto";
import { expensesAmount, expensesPerMonth } from "../scripts/main.js";

export function summaryBarChart(ctx) {
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: expensesPerMonth,
      datasets: [
        {
          label: "Expenses",
          data: expensesAmount,
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
