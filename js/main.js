function initializeBoard() {
  const tbl = document.createElement("table");
  const tblBody = document.createElement("tbody");

  for (let i = 1; i < 26; i++) {
    const row = document.createElement("tr");

    for (let j = 1; j < 26; j++) {
      const cell = document.createElement("td");
      cell.style.width = "2em";
      cell.style.height = "2em";
      cell.style.border = "1px solid white";
      
      //const cellText = document.createTextNode(`${i}, ${j}`);
      //cell.appendChild(cellText);
      
      row.appendChild(cell);
    }

    tblBody.appendChild(row);
  }
  
  tblBody.setAttribute("border", "2");
  tbl.appendChild(tblBody);
  const tableDiv = document.getElementById("table");
  tableDiv.appendChild(tbl);
  tbl.setAttribute("border", "2");
}




function resetBoard() {

}