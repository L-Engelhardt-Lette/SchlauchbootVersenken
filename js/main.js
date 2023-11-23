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
            cell.setAttribute("data-row", i);
            cell.setAttribute("data-col", j);

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

        // Set the size of the image to match the cell size
        img.style.width = "100%";
        img.style.height = "100%";

        // Append the image to the cell
        cell.appendChild(img);

        // Set the ship's position data attributes
        cell.setAttribute("data-ship-row", cell.getAttribute("data-row"));
        cell.setAttribute("data-ship-col", cell.getAttribute("data-col"));
    }

    // Hide the dragged image
    const draggedElement = document.getElementById(boatSize.toString());
    draggedElement.style.display = "none";
}
// Diese Funktion wird aufgerufen, wenn der Schussbutton gedrückt wird
function onSchussButtonClicked() {
    const schussFormelInput = document.getElementById("schussFormel");
    const schussFormel = schussFormelInput.value;

    // Beispiel: Schuss auf das Spielfeld mit der eingegebenen Formel
    fireShot(schussFormel);
}

// Füge einen Event Listener zum Schussbutton hinzu
const schussButton = document.getElementById("schussButton");
schussButton.addEventListener("click", onSchussButtonClicked);
function fireShot(formula) {
    const schussFormelInput = document.getElementById("schussFormel");
    const schussFormel = formula || schussFormelInput.value;

    try {
        const parsedFormel = new Function('x', `return ${schussFormel}`);
        
        // Iterate through each cell to check for hits
        for (let i = 1; i <= 10; i++) {
            for (let j = 1; j <= 10; j++) {
                const x = j;
                const y = parsedFormel(x);
                
                // Check if the shot hits a ship
                if (checkHit(x, y)) {
                    console.log(`Hit at position (${x}, ${y})!`);
                    // Additional logic for a hit, e.g., marking the cell as hit
                }
            }
        }

        schussFormelInput.value = ""; // Zurücksetzen der Eingabe

    } catch (error) {
        console.error("Fehler beim Auswerten der Formel:", error);
        // Handle den Fehler, wenn die Formel nicht korrekt ist
    }
}

function checkHit(x, y) {
    // Check each ship for a hit
    const ships = document.querySelectorAll(".draggable-boat");
    for (const ship of ships) {
        const shipRow = parseInt(ship.getAttribute("data-ship-row"));
        const shipCol = parseInt(ship.getAttribute("data-ship-col"));

        if (x === shipCol && y === shipRow) {
            return true; // Hit!
        }
    }

    return false; // No hit
}

// Beispiel: Schuss auf das Spielfeld mit der Formel "2*x+1"
fireShot("2*x+1");
