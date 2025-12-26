import {
  renderFromLocalStorage,
  saveToLocalStorage,
  recordsDatabase,
} from "./main.js";

function deleteRecord(e) {
  const tr = e.target.closest("tr");
  const itemId = e.target.dataset.id;
  recordsDatabase = recordsDatabase.filter((item) => {
    return item.id !== itemId;
  });
  tr.remove();
  saveToLocalStorage(recordsDatabase);
  renderFromLocalStorage();
}

export { deleteRecord };
