
import Personnage from "../Model/Personnage.js"
import Item from "../Model/Item.js"
import {RATIO} from "../Config/Configuration.js"

let body = document.querySelector("body")
let divPerso = document.createElement("div")
let perso = new Personnage(8, 8)

function displayPerso(){
    divPerso.style.marginLeft = (perso.posX*RATIO) + "px"
    divPerso.style.marginTop = (perso.posY*RATIO) + "px"
}


//const???
let divMap = document.createElement("div")
let listeItems = []

createElements()
displayItems()
displayPerso()

//display map et perso
body.append(divMap)
divMap.appendChild(divPerso)

function displayItems() {
    listeItems.forEach((element, index) => {
        let divItem = document.createElement("div")
        divItem.id = "divItem" + index
        divItem.className = "divItemClassName"
        divItem.style.marginLeft = (element.posX * RATIO) + "px"
        divItem.style.marginTop = (element.posY * RATIO) + "px"
        divMap.appendChild(divItem)
    });
}

function generateRandomValue() {
    return Math.floor(Math.random() * 25)
}

//create maps perso, items
function createElements() {

    divMap.id = "divMapId"
    divMap.className = "divMapClassName"

    divPerso.id = "divPerso"
    divPerso.className = "divPersoClassName"

    for (let i = 0; i < 3; i++) {
        listeItems.push(new Item(generateRandomValue(), generateRandomValue()))
    }
}



document.addEventListener("keydown", event => {
    switch (event.key) {
        case "ArrowUp":
            perso.posY--
            break
        case "ArrowDown":
            perso.posY++
            break
        case "ArrowLeft":
            perso.posX--
            break
        case "ArrowRight":
            perso.posX++
            break
        default:
            console.log("MAUVAIS CHOIX")
        }
        displayPerso()

}
)

