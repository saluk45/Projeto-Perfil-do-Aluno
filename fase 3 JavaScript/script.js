//validador de cpf
let cpfdigitado = prompt("digite o seu cpf para continuar:");

function TestaCPF(cpfdigitado) {
  var Soma;
  var Resto;
  Soma = 0;
if (cpfdigitado == "00000000000") return false;

for (i=1; i<=9; i++) Soma = Soma + parseInt(cpfdigitado.substring(i-1, i)) * (11 - i);
Resto = (Soma * 10) % 11;

  if ((Resto == 10) || (Resto == 11))  Resto = 0;
  if (Resto != parseInt(cpfdigitado.substring(9, 10)) ) return false;

Soma = 0;
  for (i = 1; i <= 10; i++) Soma = Soma + parseInt(cpfdigitado.substring(i-1, i)) * (12 - i);
  Resto = (Soma * 10) % 11;

  if ((Resto == 10) || (Resto == 11))  Resto = 0;
  if (Resto != parseInt(cpfdigitado.substring(10, 11) ) ) return false;
  return true;
}
if (TestaCPF(cpfdigitado)){
  alert("CPF valido")
} else {
  alert("CPF invalido")
}






const table = document.getElementById("draggable-table");
const tableBody = document.getElementById("table-body");
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

    if (targetColumnIndex === dragColumnIndex && targetCell !== draggedCell) {
      const draggedContent = draggedCell.innerHTML;
      draggedCell.innerHTML = targetCell.innerHTML;
      targetCell.innerHTML = draggedContent;
    }
  }
  if (targetCell) {
    targetCell.classList.remove("drag-over");
  }
});

function exibirCampoEntrada() {
  const opcao = document.getElementById("opcoes").value;
  const campoContainer = document.getElementById("campo-container");

  campoContainer.innerHTML = "";

  if (opcao) {
    const campoEntrada = document.createElement("input");
    campoEntrada.type = "text";
    campoEntrada.id = "campoEntrada";
    campoEntrada.placeholder = `Digite seu ${opcao}`;
    campoContainer.appendChild(campoEntrada);
  }
}

function armazenarValor() {
  const opcao = document.getElementById("opcoes").value;
  const campoEntrada = document.getElementById("campoEntrada");

  if (campoEntrada && opcao) {
    const valor = campoEntrada.value;
    let columnIndex;

    switch (opcao) {
      case "email":
        columnIndex = 0;
        break;
      case "telefone":
        columnIndex = 1;
        break;
      case "habilidades":
        columnIndex = 2;
        break;
      case "interesses":
        columnIndex = 3;
        break;
      case "ucsCursadas":
        columnIndex = 4;
        break;
      default:
        return;
    }

    const newRow = document.createElement("tr");
    for (let i = 0; i < 5; i++) {
      const newCell = document.createElement("td");
      newCell.className = "draggable";
      newCell.draggable = true;

      if (i === columnIndex) {
        newCell.textContent = valor;
      }
      newRow.appendChild(newCell);
    }
    tableBody.appendChild(newRow);
    campoEntrada.value = "";
  }
}

