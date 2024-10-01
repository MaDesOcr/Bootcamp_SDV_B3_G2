import ElementJeu from "./ElementJeu.js"

class Personnage extends ElementJeu{
    constructor(posX, posY){
        super(posX, posY)
        this.nbItemPickUp = 0
    }
}

export default Personnage