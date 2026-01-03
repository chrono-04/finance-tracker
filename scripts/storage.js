function loadFromLocalStorage() {
  return JSON.parse(localStorage.getItem("financial-records") || "[]");
}

export { loadFromLocalStorage };
