
let tableGenerated = false;
let originalPositions = {}; // Store original positions of draggable elements

function initializeBoard() {
    if (tableGenerated) return;
    tableGenerated = true;

    const tbl = document.createElement("table-player1");
    const tblBody = document.createElement("tbody");

    for (let i = 1; i <= 10; i++) {
        const row = document.createElement("tr");

        for (let j = 1; j <= 10; j++) {
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
    const tableContainer = document.getElementById("table-player1");
    tableContainer.appendChild(tbl);

    const tbl2 = tbl.cloneNode(true);
    const tableContainer2 = document.getElementById("table-player2");
    tableContainer2.appendChild(tbl2);

    const draggableElements = document.querySelectorAll(".draggable-boat");
    draggableElements.forEach(element => {
        originalPositions[element.id] = { x: element.style.left, y: element.style.top };
    });
}

function resetBoard() {
    const tableContainer1 = document.getElementById("table-player1");
    const tableContainer2 = document.getElementById("table-player2");
    tableContainer1.innerHTML = "";
    tableContainer2.innerHTML = "";
    tableGenerated = false;

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
        const team = cell.getAttribute("data-team");
        const img = document.getElementById(data);
        cell.appendChild(img);
    }
    const draggedElement = document.getElementById(boatSize.toString());
    draggedElement.style.display = "none";
}

function schiessen(x, y, brettId) {
    let zielZelle = document.querySelector(`#${brettId} .zelle[data-x='${x}'][data-y='${y}']`);
    if (zielZelle) {
        zielZelle.style.backgroundColor = 'red'; // Mark as targeted
    }
}

function pruefeTreffer(x, y, brettId) {
    let getroffeneSchiffe = document.querySelectorAll(`#${brettId} .schiff`);
    getroffeneSchiffe.forEach(schiff => {
        if (schiff.dataset.x == x && schiff.dataset.y == y) {
            schiff.style.backgroundColor = 'black'; // Schiff getroffen
        }
    });
}

const schiffe = document.querySelectorAll('.schiff-container .schiff');
schiffe.forEach(schiff => {
    schiff.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('schiffId', schiff.id);
    });
    schiff.setAttribute('draggable', 'true');
});

const rasterzellen = document.querySelectorAll('.raster-zelle');
rasterzellen.forEach(zelle => {
    zelle.addEventListener('dragover', (e) => {
        e.preventDefault();
    });
    zelle.addEventListener('drop', (e) => {
        e.preventDefault();
        alert("drop");
        const schiffId = e.dataTransfer.getData('schiffId');
        const schiff = document.getElementById(schiffId);
        if (!zelle.contains(schiff)) {
            zelle.appendChild(schiff);
        }
    });
});
