let recordsDatabase = JSON.parse(
  localStorage.getItem("financial-records") || "[]",
);

export { recordsDatabase };
