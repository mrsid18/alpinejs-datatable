import dataTable from "./dataTable.js";

 document.addEventListener("alpine:init", () => {
   window.Alpine.data("dataTable", dataTable);
 });
