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

    // Initialize the Canvas elements
    initializeCanvas();
}

function resetImages() {
    // Get all images with the CSS class "draggable-boat"
    var images = document.getElementsByClassName("draggable-boat");

    // Iterate through all images and reset the source
    for (var i = 0; i < images.length; i++) {
        images[i].style.display = "block"; // Make the image visible again
    }
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

    // Reset the images by calling the resetImages function
    resetImages();

    // Clear the Canvas elements
    resetCanvas();
}

function initializeCanvas() {
    const canvas = document.createElement("canvas");
    const canvasContainer = document.getElementById("canvas-container");

    canvas.id = "schussCanvas";
    canvas.width = canvasContainer.offsetWidth;
    canvas.height = canvasContainer.offsetHeight;
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.zIndex = "1";
    canvas.style.pointerEvents = "none"; // Prevents the canvas from intercepting user interactions

    canvasContainer.appendChild(canvas);
}

function resetCanvas() {
    const canvas = document.getElementById("schussCanvas");
    const canvasContainer = document.getElementById("canvas-container");

    if (canvas) {
        canvasContainer.removeChild(canvas);
    }
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

        //clone image to drop
        const clone = img.cloneNode(true);
         // Set the size of the image to match the cell size
        clone.style.width = "100%";
        clone.style.height = "100%";
       
        //set original image to invisible
        img.classList.add("hide");
        
       


        // Append the cloned image to the cell
        cell.appendChild(clone);

        // Set the ship's position data attributes
        cell.setAttribute("data-ship-row", cell.getAttribute("data-row"));
        cell.setAttribute("data-ship-col", cell.getAttribute("data-col"));
    }

    // Hide the dragged image
    const draggedElement = document.getElementById(boatSize.toString());
    draggedElement.style.display = "none";
}

const schussButton = document.querySelector(".schussbutton");
schussButton.addEventListener("click", onSchussButtonClicked);

function onSchussButtonClicked() {
    console.log("Schussbutton wurde gedrückt!");

    const schussEingabeM = document.getElementById("schussEingabeM").value;
    const schussEingabeB = document.getElementById("schussEingabeB").value;

    // Übergebe die eingegebenen Werte für m und b an die fireShot-Funktion
    fireShot(schussEingabeM, schussEingabeB);
}

function fireShot(m, b) {
    const schussFormelInput = document.getElementById("schussFormel");

    try {
        // Erstelle die Formel basierend auf den eingegebenen Werten für m und b
        const parsedFormel = new Function('x', `return ${m}*x + ${b}`);

        // Draw the line on the Canvas
        drawLine(parsedFormel);

        // Beispiel: Schieße auf das Spielfeld mit der eingegebenen Formel
        for (let i = 1; i <= 10; i++) {
            const x = i;
            const y = parsedFormel(x);

            // Überprüfe, ob der Schuss ein Schiff getroffen hat
            if (checkHit(x, y)) {
                console.log(`Hit at position (${x}, ${y})!`);
                // Zusätzliche Logik für einen Treffer, z. B. Markieren der Zelle als getroffen
            }
        }

        schussFormelInput.value = ""; // Setze das Input-Feld zurück

    } catch (error) {
        console.error("Error evaluating formula:", error);
        // Handle the error if the formula is not correct
    }
}

function drawLine(equation) {
    const canvas = document.getElementById("schussCanvas");
    if (canvas) {
        const context = canvas.getContext("2d");

        context.clearRect(0, 0, canvas.width, canvas.height);

        context.beginPath();
        context.moveTo(0, equation(0));
        for (let x = 0; x <= canvas.width; x += 5) {
            const y = equation(x);
            context.lineTo(x, y);
        }

        context.strokeStyle = "red";
        context.lineWidth = 4;
        context.stroke();
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


