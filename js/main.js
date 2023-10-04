let tableGenerated = false;
let originalPositions = {}; // Store original positions of draggable elements

function initializeBoard() {
    if (tableGenerated) return;
    tableGenerated = true;

    const tbl = document.createElement("table");
    const tblBody = document.createElement("tbody");

    for (let i = 1; i <= 25; i++) {
        const row = document.createElement("tr");

        for (let j = 1; j <= 25; j++) {
            const cell = document.createElement("td");

            cell.setAttribute("ondragover", "allowDrop(event)");
            cell.setAttribute("ondrop", "drop(event)");

            cell.style.width = "2em";
            cell.style.height = "2em";
            cell.style.border = "1px solid white";

            row.appendChild(cell);
        }

        tblBody.appendChild(row);
    }

    tbl.appendChild(tblBody);

    const tableContainer = document.getElementById("table");
    tableContainer.appendChild(tbl);

    // Store the original positions of draggable elements
    const draggableElements = document.querySelectorAll(".draggable-boat");
    draggableElements.forEach(element => {
        originalPositions[element.id] = { x: element.style.left, y: element.style.top };
    });
}

function resetBoard() {
    const tableContainer = document.getElementById("table");
    tableContainer.innerHTML = "";

    // Reset the tableGenerated flag
    tableGenerated = false;

    // Reset draggable elements to their original positions
    const draggableElements = document.querySelectorAll(".draggable-boat");
    draggableElements.forEach(element => {
        const originalPosition = originalPositions[element.id];
        element.style.left = originalPosition.x;
        element.style.top = originalPosition.y;
    });
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  const data = event.dataTransfer.getData("text");
  const boatSize = parseInt(data);
  const cell = event.target;

  if (!cell.hasAttribute("data-occupied")) {
      cell.setAttribute("data-occupied", "true");

      // Determine the team (red or blue) based on the data-team attribute
      const team = cell.getAttribute("data-team");
      
      // Create an image element and set its source based on the team color
      const img = document.createElement("img");
      img.src = `/img/ships_new/ship-${boatSize}-${team}.png`;

      // Append the image to the cell
      cell.appendChild(img);
  }

  // Hide the dragged image
  const draggedElement = document.getElementById(boatSize.toString());
  draggedElement.style.display = "none";
}