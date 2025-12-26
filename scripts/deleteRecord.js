import {
  renderFromLocalStorage,
  saveToLocalStorage,
  recordsDatabase,
} from "../scripts/main.js";

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
