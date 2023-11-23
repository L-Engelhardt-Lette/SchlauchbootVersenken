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

    // Create a second table for player 2
    const tbl2 = tbl.cloneNode(true);
    const tableContainer2 = document.getElementById("table-player2");
    tableContainer2.appendChild(tbl2);

    // Store the original positions of draggable elements
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

        const img = document.getElementById(data);

        /* Create an image element and set its source based on the team color
        const img = document.createElement("img");
        img.src = `/img/ships_new/ship-${boatSize}-${team}.png`;
        */
        
        // Set the size of the image to match the cell size
        img.style.width = "100%";
        img.style.height = "100%";

        // Append the image to the cell
        cell.appendChild(img);
    }

    // Hide the dragged image
    const draggedElement = document.getElementById(boatSize.toString());
    draggedElement.style.display = "none";
}

// Gleichungen
let m = 0;

let b = 0;

let schuss = function f(x){
    return m*x+0;
} 
let schiff = function g(x){
    return 0*x+b;
}

function showShot(x){
    const y = f(x);
}
function checkIntersection() {
    const xIntersection = (b-0)/(m-0);
    const yIntersection1 = schuss(xIntersection);
    const yIntersection2 = schiff(xIntersection);

    console.log(`Die Funktionen schneiden sich bei (${xIntersection}, ${yIntersection1}) und (${xIntersection}, ${yIntersection2}).`);
}
function fireShot(){
    const schussFormelInput = document.getElementById("schussFormel");
    const schussFormel = schussFormelInput.value;
    try {
        const parsedFormel = new Function('x', `return ${schussFormel}`);
        const x = 3; // Beispielwert für x, du kannst dies anpassen
        const y = parsedFormel(x);

        // Hier fügst du den Code ein, um den Schuss auf dem Spielfeld anzuzeigen
        console.log(`Schuss abgefeuert auf Position (${x}, ${y})`);

        // Vergleiche die Gleichungen
        if (schuss.toString() === schiff.toString()) {
            console.log("Die Gleichungen sind gleich.");
        } else {
            console.log("Die Gleichungen sind nicht gleich.");
        }

        schussFormelInput.value = ""; // Zurücksetzen der Eingabe

    } catch (error) {
        console.error("Fehler beim Auswerten der Formel:", error);
        // Handle den Fehler, wenn die Formel nicht korrekt ist
    }
}


