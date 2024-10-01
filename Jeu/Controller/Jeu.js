
import Personnage from "../Model/Personnage.js"
import Item from "../Model/Item.js"
import Enemy from "../Model/Enemy.js"
import {RATIO, map} from "../Config/Configuration.js"

let body = document.querySelector("body")
let divPerso = document.createElement("div")
let perso
//const???
let divMap = document.createElement("div")
let listeItems = []
let listeEnemies = [] 
let mapJeu = []

let mapTemp = map.split("\n")
mapTemp.forEach(element => {
    mapJeu.push(element.split(""))
})

mapJeu.forEach((element1, index1) => {
    element1.forEach((element2, index2)=>{
        switch(element2){
            case "P" :
                perso = new Personnage(index1, index2)
                break
            case "I" :
                listeItems.push(new Item(index1, index2))
                break
            case "E":
                listeEnemies.push(new Enemy(index1, index2))
                break
        }
    })
})



function displayPerso(){
    divPerso.style.marginLeft = (perso.posX*RATIO) + "px"
    divPerso.style.marginTop = (perso.posY*RATIO) + "px"
}



createElements()
displayItems()
displayPerso()
displayEnemies()

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

function displayEnemies(){
    listeEnemies.forEach((element, index) => {
        let divEnemy = document.createElement("div")
        divEnemy.id = "divEnemy" + index
        divEnemy.className = "divEnemyClassName"
        divEnemy.style.marginLeft = (element.posX * RATIO) + "px"
        divEnemy.style.marginTop = (element.posY * RATIO) + "px"
        divMap.appendChild(divEnemy)
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

   /* for (let i = 0; i < 3; i++) {
        listeItems.push(new Item(generateRandomValue(), generateRandomValue()))
    }*/

   /* for(let i = 0; i < 3; i++){
        listeEnemies.push(new Enemy(generateRandomValue(), generateRandomValue()))
    }*/
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

