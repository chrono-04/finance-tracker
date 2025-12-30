import {
  renderFromLocalStorage,
  saveToLocalStorage,
} from "../scripts/renderUi.js";
const recordsDatabase = JSON.parse(
  localStorage.getItem("financial-records") || "[]",
);

function deleteRecord(e) {
  const tr = e.target.closest("tr");
  const itemId = e.target.dataset.id;
  const updatedDatabase = recordsDatabase.filter((item) => {
    return item.id !== itemId;
  });
  tr.remove();
  saveToLocalStorage(updatedDatabase);
  renderFromLocalStorage();
}

export { deleteRecord };
