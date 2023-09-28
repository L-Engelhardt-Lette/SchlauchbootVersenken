function initializeBoard() {
  // creates a <table> element and a <tbody> element
  const tbl = document.createElement("table");
  const tblBody = document.createElement("tbody");

  // creating all cells
  for (let i = 1; i < 26; i++) {
    // creates a table row
    const row = document.createElement("tr");

    for (let j = 1; j < 26; j++) {
      // Create a <td> element
      const cell = document.createElement("td");
      
      // Set the width and height of the cell to 2em
      cell.style.width = "2em";
      cell.style.height = "2em";
      
      // Add a border to the cell
      cell.style.border = "1px solid black"; // You can adjust the border style as needed
      
      // Create a text node and set it as the contents of the <td>
      //const cellText = document.createTextNode(`${i}, ${j}`);
      //cell.appendChild(cellText);
      
      // Add the <td> to the current row
      row.appendChild(cell);
    }

    // Add the row to the table body
    tblBody.appendChild(row);
  }
  
  // Set the border attribute of the table body to '2' (optional)
  tblBody.setAttribute("border", "2");
  
  // Put the <tbody> in the <table>
  tbl.appendChild(tblBody);
  
  // Appends <table> into the element with the id "table"
  const tableDiv = document.getElementById("table");
  tableDiv.appendChild(tbl);
  
  // Set the border attribute of the table to '2' (optional)
  tbl.setAttribute("border", "2");
}




function resetBoard() {

}