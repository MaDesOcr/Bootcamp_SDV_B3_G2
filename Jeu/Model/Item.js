import ElementJeu from "./ElementJeu.js"

class Item extends ElementJeu{
    constructor(posX, posY){
        super(posX, posY)
        this.pickUp = false
    }
}

export default Item