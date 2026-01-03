import {
  renderFromLocalStorage,
  saveToLocalStorage,
} from "../scripts/renderUi.js";
import { loadFromLocalStorage } from "../scripts/storage.js";

function deleteRecord(e) {
  const tr = e.target.closest("tr");
  const itemId = e.target.dataset.id;
  const database = loadFromLocalStorage();
  const updatedDatabase = database.filter((item) => {
    return item.id !== itemId;
  });
  tr.remove();
  saveToLocalStorage(updatedDatabase);
  renderFromLocalStorage();
}

export { deleteRecord };
