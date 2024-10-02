
import Personnage from "../Model/Personnage.js"
import Item from "../Model/Item.js"
import Enemy from "../Model/Enemy.js"
import Wall from "../Model/Wall.js"
import {RATIO, map} from "../Config/Configuration.js"

let body = document.querySelector("body")
let divPerso = document.createElement("div")
let perso
//const???
let divMap = document.createElement("div")
let listeItems = []
let listeEnemies = [] 
let listeWall = []
let mapJeu = []



function lectureConfigMap(){
    let mapTemp = map.split("\n")
    mapTemp.forEach(element => {
        mapJeu.push(element.split(""))
    })
    
    
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
}


function displayWalls() {
    listeWall.forEach((element, index) => {
        let divWall = document.createElement("div")
        divWall.id = "divWall" + index
        divWall.className = "divWallClassName"
        divWall.style.marginLeft = (element.posX * RATIO) + "px"
        divWall.style.marginTop = (element.posY * RATIO) + "px"
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

// parcourir notre mapJeu 
//et visuellement représenter le mur (rouge) sur la carte


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
}

function changePosition(posX, posY){
    mapJeu[perso.posY][perso.posX]="0"
    perso.posX = posX
    perso.posY = posY
    mapJeu[perso.posY][perso.posX]="P"
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
            handleEnemiesCollision()
            handleItems()
            displayPerso()

    }
    )
}

function displayMapAndPerso(){
    body.append(divMap)
    divMap.appendChild(divPerso)
}

function loadMap(){
    lectureConfigMap()
    createElements()
    displayItems()
    displayPerso()
    displayEnemies()
    displayWalls()
    displayMapAndPerso()
}


loadMap()
miseEnPlaceDesEvent()



//display map et perso





// ++++gestion des collisions mur
//gestion des collisions enemies
//authoriser le mouvement
//checker les positions , si position commune, alert et reboot



//+++ pickup les items -> compteur d'item
//-> + authorisation des mouvements vers item
//-> check si on arrive sur un item
//-> on arrive sur un item :
//       on doit enlever l'item de mapJeu et trouver une facon de gérer la listeItems
//       on doit enlever l'item du display (par son identifiant)
//      on doit incrémenter le nbItem du perso


//A faire
//mouvement random des ennemies
//illustrations
//affichage item
//condition de fin
//page de lancement
//lecture fichier pour map
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