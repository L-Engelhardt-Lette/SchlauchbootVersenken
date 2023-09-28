let tableGenerated = false;

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

            //const cellText = document.createTextNode(`${i}, ${j}`);
            //cell.appendChild(cellText);

            row.appendChild(cell);
        }

        tblBody.appendChild(row);
    }

    tbl.appendChild(tblBody);

    const tableContainer = document.getElementById("table");
    tableContainer.appendChild(tbl);
}

function resetBoard() {
    const tableContainer = document.getElementById("table");
    tableContainer.innerHTML = "";

    tableGenerated = false;
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
        cell.style.backgroundColor = "blue";
        cell.textContent = boatSize;
    }
}
