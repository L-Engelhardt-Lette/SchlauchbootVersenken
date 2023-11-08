/* Start HTML
*/
const originalTitle = "Schlauchboot Versenken";

function changeTitle() {
    document.title = originalTitle;
}

setInterval(changeTitle, 3000);

/* Game HTML
*/

const Parser = require('expr-eval').Parser;
// f(x) = 3x + 4
// y = 3x + 2

function generateFunction(input) {
    string = string.replaceAll(" ", "")
    karls = string.split("=")
    karls.forEach(boi =>{
        try{
            Parser.evaluate(boi, {x: 1})
        }catch(error){
            print("invalid Function")
        }
    })
}

function drawGraf(input, color) {
    f = generateFunction(input)
}