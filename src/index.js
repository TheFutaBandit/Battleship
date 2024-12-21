import {ship, Gameboard, player} from "./appModule.js";

import "./styles.css";

let bootGame = (() => {
    let player1 = player("dave");
    let computer = player("computer");

    const implementTile = function (tileObject, rowIndex, colIndex) {
        const tile = document.createElement("div");

        tile.classList.add("tile");
        let defaultTileStatus = tileObject.status;
        
        let changeTile = (defaultTileStatus) => {
            let tileColor = "blue";

            switch (defaultTileStatus) {
                case "water":
                    break;
                case "ship":
                    tileColor = "grey";
                    break;
                case "hit":
                    tileColor = "red";
                    break;
                case "miss":
                    tileColor = "black";
                    break;
            }

            return tileColor;
        }

        let tileColor = changeTile(defaultTileStatus);
        
        tile.setAttribute("style", `background-color:${tileColor}`);  

        tile.setAttribute("data-row", rowIndex);
        tile.setAttribute("data-col", colIndex);
        
        const parentBoard = document.querySelector(".player1");
        
        parentBoard.appendChild(tile);

    }

    const toggleTile = function(tileNode, status) {

        let changeTile = (defaultTileStatus) => {
            let tileColor = "blue";

            switch (defaultTileStatus) {
                case "water":
                    break;
                case "ship":
                    tileColor = "grey";
                    break;
                case "hit":
                    tileColor = "red";
                    break;
                case "miss":
                    tileColor = "aqua";
                    break;
            }

            return tileColor;
        }

        let newColor = changeTile(status);

        tileNode.setAttribute("style", `background-color:${newColor}`);
    }

    //intialize game
    let loadBoard = (() => {
        const board = document.querySelector(".player1")

        for(let i = 0; i < 10; i++) {
            for(let j = 0; j < 10; j++) {
                implementTile(player1.playerBoard.board[i][j],i,j);
            }
        }

        board.addEventListener("click", (event) => {
            let tile = event.target;
            let row = tile.getAttribute("data-row");
            let col = tile.getAttribute("data-col");
            let status = player1.playerBoard.receiveAttack(+row,+col);
            toggleTile(tile,status);
            console.log(tile);
        })
    })();

    //start game
})();

let gamebattle = (player1, player2) => {
    let turnFlag = 0;

    

    while(player1.checkPlayerStatus() === true && player2.checkPlayerStatus() === true) {
        if(turnFlag === 0) {
            //intiatePlayerTurn(player1);
        } else {
            intiatePlayerTurn(player2);
        }
        turnFlag = !turnFlag;
    }

    if(player1.checkPlayerStatus() === false) {
        console.log("player2 wins");
    } else {
        console.log("player1 wins");
    }
}


//game dom



let battlefield = Gameboard();

let ship1 = ship(3);
let ship2 = ship(4);
let ship3 = ship(3);

battlefield.placeShip(3,3,ship1);
battlefield.placeShip(1,1,ship2);
battlefield.placeShip(6,7,ship3);

battlefield.receiveAttack(3,4);
battlefield.receiveAttack(3,5);
battlefield.receiveAttack(4,4);

console.log(battlefield.checkTotal());

battlefield.printBoard();

battlefield.receiveAttack(3,3);

console.log(battlefield.checkTotal());