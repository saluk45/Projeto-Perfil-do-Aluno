const table = document.getElementById("draggable-table");
let draggedCell = null;
let dragColumnIndex = null;

table.addEventListener("dragstart", function (event) {
  draggedCell = event.target;
  dragColumnIndex = Array.from(draggedCell.parentNode.children).indexOf(draggedCell);
  event.target.style.opacity = "0.5";
});

table.addEventListener("dragend", function (event) {
  event.target.style.opacity = "1";
});

table.addEventListener("dragover", function (event) {
  event.preventDefault();
  const targetCell = event.target.closest("td");
  const targetRow = event.target.closest("tr");
  
  // Verifica se estamos na mesma coluna
  if (targetCell && targetRow) {
    const targetColumnIndex = Array.from(targetRow.children).indexOf(targetCell);
    
    if (targetColumnIndex === dragColumnIndex && targetCell !== draggedCell) {
      targetCell.classList.add("drag-over");
    }
  }
});

table.addEventListener("dragleave", function (event) {
  const targetCell = event.target.closest("td");
  if (targetCell) {
    targetCell.classList.remove("drag-over");
  }
});

table.addEventListener("drop", function (event) {
  event.preventDefault();
  const targetCell = event.target.closest("td");
  const targetRow = event.target.closest("tr");
  
  if (targetCell && targetRow) {
    const targetColumnIndex = Array.from(targetRow.children).indexOf(targetCell);

    // Move a célula apenas se ela estiver na mesma coluna
    if (targetColumnIndex === dragColumnIndex && targetCell !== draggedCell) {
      const draggedRow = draggedCell.parentNode;
      const targetRowIndex = Array.from(table.rows).indexOf(targetRow);
      
      // Reorganiza a célula na coluna arrastada
      const draggedContent = draggedCell.innerHTML;
      draggedCell.innerHTML = targetCell.innerHTML;
      targetCell.innerHTML = draggedContent;
    }
  }
  if (targetCell) {
    targetCell.classList.remove("drag-over");
  }
});
