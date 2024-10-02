
import Personnage from "../Model/Personnage.js"
import Item from "../Model/Item.js"
import Enemy from "../Model/Enemy.js"
import Wall from "../Model/Wall.js"
import {RATIO} from "../Config/Configuration.js"
//import fs from "fs"

//const fr = require('fs') 
//fs.readFile("../Config/Map.txt")


let body = document.querySelector("body")
let divPerso = document.createElement("div")
let perso
//const???
let divMap = document.createElement("div")
let divNbItems = document.createElement("p")
let listeItems = []
let listeEnemies = [] 
let listeWall = []
let mapJeu = []
let illustrations


async function readMap(){
    const result = await fetch("./Config/Map.txt")
        .then(response => response.text())
    return result
} 

async function readIllustration(){
    const result = await fetch("./Config/Illustrations.json")
    illustrations = await result.json()
}

async function lectureConfigMap(){

    let map = await readMap()
    await readIllustration()

    let mapTemp = map.split("\n")

//ne doit pas être modifier

    mapTemp.forEach(element => {
        mapJeu.push(element.split(""))
    })
    console.log(mapJeu)
    
    mapJeu.forEach((element1, index1) => {
        element1.forEach((element2, index2)=>{
            switch(element2){
                case "P" :
                    perso = new Personnage(index2, index1)
                    break
                case "I" :
                    listeItems.push(new Item(index2, index1))
                    break
                case "E":
                    listeEnemies.push(new Enemy(index2, index1))
                    break
                case "1":
                    listeWall.push(new Wall(index2, index1))
                    break
            }
        })
    })
}

function displayPerso(){
    divPerso.style.marginLeft = (perso.posX*RATIO) + "px"
    divPerso.style.marginTop = (perso.posY*RATIO) + "px"
    divPerso.style.backgroundImage = `url(${illustrations["perso"]})`
    divPerso.style.backgroundSize = "cover"
}

function displayWalls() {
    listeWall.forEach((element, index) => {
        let divWall = document.createElement("div")
        divWall.id = "divWall" + index
        divWall.className = "divWallClassName"
        divWall.style.marginLeft = (element.posX * RATIO) + "px"
        divWall.style.marginTop = (element.posY * RATIO) + "px"
        divWall.style.backgroundImage = `url(${illustrations["wall"]})`
        divWall.style.backgroundSize = "cover"
        divMap.appendChild(divWall)

    });
}

function displayItems() {
    listeItems.forEach((element, index) => {
        if(!element.pickUp){
            let divItem = document.createElement("div")
            divItem.id = "divItem" + index
            divItem.className = "divItemClassName"
            divItem.style.marginLeft = (element.posX * RATIO) + "px"
            divItem.style.marginTop = (element.posY * RATIO) + "px"
            divItem.style.backgroundImage = `url(${illustrations["item"]})`
            divItem.style.backgroundSize = "cover"
            divMap.appendChild(divItem)
        }
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

function createElements() {

    divMap.id = "divMapId"
    divMap.className = "divMapClassName"

    divMap.style.width = (mapJeu[0].length-1)*RATIO+"px"
    divMap.style.height = mapJeu.length*RATIO+"px"

    divPerso.id = "divPerso"
    divPerso.className = "divPersoClassName"

    divNbItems.id = "divNbItemsId"
    divNbItems.className = "divNbItemsClassName"
    divNbItems.innerHTML = perso.nbItemPickUp
    body.append(divNbItems)
   /* for (let i = 0; i < 3; i++) {
        listeItems.push(new Item(generateRandomValue(), generateRandomValue()))
    }*/

   /* for(let i = 0; i < 3; i++){
        listeEnemies.push(new Enemy(generateRandomValue(), generateRandomValue()))
    }*/
}

function handleEnemiesCollision(){
    listeEnemies.forEach((enemy, index)=>{
        if(enemy.posX==perso.posX && enemy.posY == perso.posY){
            alert("perdu")
            clearMap()
            loadMap()
        }
    })
   
}

function clearMap(){
    listeEnemies = []
    listeItems = []
    listeWall = []
    perso = null
    mapJeu = []

    document.getElementById("divMapId").replaceChildren("")
}

function handleItems(){
    listeItems.forEach((item, index)=>{
        if (!item.pickUp && item.posX==perso.posX && item.posY==perso.posY){
            perso.nbItemPickUp++
            item.pickUp = true
            document.getElementById("divItem"+index).remove()
        }
    })
    if(listeItems.length == perso.nbItemPickUp){
        alert("Vitoire")
        clearMap()
        loadMap()
    }
    divNbItems.innerHTML = perso.nbItemPickUp

}

function changePosition(posX, posY){
    mapJeu[perso.posY][perso.posX]="0"
    perso.posX = posX
    perso.posY = posY
    mapJeu[perso.posY][perso.posX]="P"
    handleEnemiesCollision()
    handleItems()
}

function mouvementAllowed(x, y){
    const listeAuthorise = ["0", "I", "E"]
    return listeAuthorise.includes(mapJeu[y][x])
    //return mapJeu[y][x]=="0" || mapJeu[y][x]=="I" 
}

function miseEnPlaceDesEvent(){

    document.addEventListener("keydown", event => {
        switch (event.key) {
            case "ArrowUp":
                // future position : perso.posX, perso.posY-1
                if(mouvementAllowed(perso.posX, perso.posY-1)){
                    changePosition(perso.posX, perso.posY-1)
                }
                break
            case "ArrowDown":
                if(mouvementAllowed(perso.posX, perso.posY+1)){
                    changePosition(perso.posX, perso.posY+1)
                }
                break
            case "ArrowLeft":
                if(mouvementAllowed(perso.posX-1, perso.posY)){
                    changePosition(perso.posX-1, perso.posY)
                }
                break
            case "ArrowRight":
                if(mouvementAllowed(perso.posX+1, perso.posY)){
                    changePosition(perso.posX+1, perso.posY)
                }
                break
            default:
                console.log("MAUVAIS CHOIX")
            }
            
            displayPerso()

    }
    )
}

function displayMapAndPerso(){
    body.append(divMap)
    divMap.appendChild(divPerso)
}

async function loadMap(){
    
    await lectureConfigMap()
    createElements()
    displayItems()
    displayPerso()
    displayEnemies()
    displayWalls()
    displayMapAndPerso()
}






//axe d'amélioration : ne pas faire avec un prompt :
//utiliser un vrai formulaire avec un event sur un boutton
//mettre une image de fond

let divFirstEcran = document.createElement("div")
divFirstEcran.id = "divFirstEcranId"
divFirstEcran.className = "divFirstEcranClassName"
body.append(divFirstEcran)
let name = prompt("Give a name")

if(name!=null){
    body.removeChild(divFirstEcran)
    loadMap()
    miseEnPlaceDesEvent()
    console.log(name)
}



//A faire
//mouvement random des ennemies
//affichage item
//map multiple?






/*
//display wall sans liste
mapJeu.forEach((element1, index1) => {
    element1.forEach((element2, index2)=>{
        if(element2 == "1"){
            let divWall = document.createElement("div")
            divWall.id = "divWall" + index2+ "-" + index1
            divWall.className = "divWallClassName"
            divWall.style.marginLeft =(index2 * RATIO) + "px"
            divWall.style.marginTop = (index1 * RATIO) + "px"
            divMap.appendChild(divWall)
        }
    })
})
*/