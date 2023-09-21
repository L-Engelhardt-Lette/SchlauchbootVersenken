const numRows = 25;
const numCols = 25;


function initializeBoard() {
  // creates a <table> element and a <tbody> element
  const tbl = document.createElement("table");
  const tblBody = document.createElement("tbody");

  // creating all cells
  for (let i = 1; i < 26; i++) {
    // creates a table row
    const row = document.createElement("tr");

    for (let j = 1; j < 26; j++) {
      // Create a <td> element and a text node, make the text
      // node the contents of the <td>, and put the <td> at
      // the end of the table row
      const cell = document.createElement("td");
      const cellText = document.createTextNode(`${i}, ${j}`);
      cell.appendChild(cellText);
      row.appendChild(cell);
    }

    // add the row to the end of the table body
    tblBody.appendChild(row);
  }
  tblBody.setAttribute("border","2")
  // put the <tbody> in the <table>
  tbl.appendChild(tblBody);
  // appends <table> into <body>
  const tableDiv = document.getElementById("table");
  tableDiv.appendChild(tbl);
  // sets the border attribute of tbl to '2'
  tbl.setAttribute("border", "2");
  
}




function resetBoard() {
  const tabledelete = document.getElementById("table");
  tabledelete.remove();
}
