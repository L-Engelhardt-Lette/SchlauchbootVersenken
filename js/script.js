// Alle Schiffe auf der Seite auswählen
const schiffe = document.querySelectorAll('.schiff-container .schiff');

// Jedes Schiff für das Drag-and-Drop-Ereignis vorbereiten
schiffe.forEach(schiff => {
    // Das 'dragstart'-Ereignis wird ausgelöst, wenn das Ziehen eines Schiffs beginnt
    schiff.addEventListener('dragstart', (e) => {
        // Daten über das Schiff für den Drag-and-Drop-Vorgang festlegen
        e.dataTransfer.setData('schiffId', schiff.id);
    });

    // Schiffe als 'ziehbar' markieren
    schiff.setAttribute('draggable', 'true');
});

// Alle Rasterzellen auf der Seite auswählen
const rasterzellen = document.querySelectorAll('.raster-zelle');

// Rasterzellen für Drag-and-Drop vorbereiten
rasterzellen.forEach(zelle => {
    // Das 'dragover'-Ereignis wird ausgelöst, wenn ein Element über einer Zelle gezogen wird
    zelle.addEventListener('dragover', (e) => {
        // Das Standardverhalten des Browsers verhindern, um das Ziehen zu ermöglichen
        e.preventDefault();
    });

    // Das 'drop'-Ereignis wird ausgelöst, wenn ein Element in eine Zelle gezogen wird
    zelle.addEventListener('drop', (e) => {
        // Das Standardverhalten des Browsers verhindern, um das Ablegen zu ermöglichen
        e.preventDefault();

        // Die ID des gezogenen Schiffs aus den übertragenen Daten abrufen
        const schiffId = e.dataTransfer.getData('schiffId');
        // Das zugehörige Schiffelement anhand der ID finden
        const schiff = document.getElementById(schiffId);

        // Überprüfen, ob das Schiff bereits in dieser Zelle vorhanden ist
        if (zelle.contains(schiff)) {
            // Das Schiff befindet sich bereits in dieser Zelle
            return;
        }

        // Das Schiff zur Zelle hinzufügen
        zelle.appendChild(schiff);
    });
});
