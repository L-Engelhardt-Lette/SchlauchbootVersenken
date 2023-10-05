function getNull2DArr(width, height){ 
    //create a 2DArr where Arr[][] = null
    let Arr = []
    for (i in width){
        let karl =[] 
        for (i in height){
            karl += null
        }
        Arr += karl
    }
    return Arr
}
//char for hit = h (?)
class PlayingField{
    constructor(width, height, shipsL){
        //make playingfield in form of 2DArr
        this.field = getNull2DArr(width, height)
        this.width = width
        this.height = height
        //make list of all ships
        //shipsL used as [2,4] -> 
        //two ships, one with lenght of 2 the other of 4
        this.allShips = shipsL
        this.bluShips = shipsL
        this.redShips = shipsL
    }

    shoot(x,y){
        return this.field[x][y]
    }

    placeShip(x, y, lenght, orientation, plr){//return true when successful place
        //plr = char = r || b for red || blu
        //orientation = true when vertical
        if (orientation && y + lenght > this.height || 
            !orientation && x + lenght > this.width){
            return false
        }
        //do fancy magic
        for (i in lenght - 1){
            if (orientation){
                this.field[x][y+i] = plr
            }
            else{
                this.field[x+i][y] = plr
            }
        }
        return true
    }
}