import {ship, Gameboard, player} from "./appModule.js";

import "./styles.css";

let loadPlayerDOM = (player,playerBoardNode) => {
    let changeTile = (defaultTileStatus, flag) => {
        if (defaultTileStatus === "water") {
            return "#5463FF";
        } else if (defaultTileStatus === "ship" && flag === 0) {
            return "#ECECEC";
        } else if (defaultTileStatus === "miss") {
                return "#1d6d86";
        } else if (defaultTileStatus === "hit") {
            return "#FF1818";
        } 
    
        return "#5463FF"; 
    };

    const implementTile = function (tileObject, rowIndex, colIndex, parentBoardNode, flag) {
        const tile = document.createElement("div");

        tile.classList.add("tile");
        let defaultTileStatus = tileObject.status;
        
        let tileColor = changeTile(defaultTileStatus, flag);
        
        tile.setAttribute("style", `background-color:${tileColor}`);  

        tile.setAttribute("data-row", rowIndex);
        tile.setAttribute("data-col", colIndex);
        
        const parentBoard = document.querySelector(parentBoardNode);
        
        parentBoard.appendChild(tile);
    }

    const toggleTile = function(tileNode, status) {
        let newColor = changeTile(status);
        tileNode.setAttribute("style", `background-color:${newColor}`);
    }

    let loadBoard = (flag = 0) => {
        //selects board node
        const board = document.querySelector(playerBoardNode) 

        //implements tile, ties them to the ship object
        for(let i = 0; i < 10; i++) {
            for(let j = 0; j < 10; j++) {
                implementTile(player.playerBoard.board[i][j],i,j,playerBoardNode,flag);
            }
        }

        //checkBoard function to test results
        let checkBoard = () => {
            return player.playerBoard.allSunk();
        }

        //Event delegation to the board using target event to trigger hit or miss
        board.addEventListener("click", (event) => {
            let tile = event.target;
            let row = tile.getAttribute("data-row");
            let col = tile.getAttribute("data-col");
            let status = player.playerReceiveAttack(+row,+col);
            toggleTile(tile,status);
            // if(checkBoard() === true) {
            //     alert("you lost");
            // }
        })
    };

    let clearBoard = () => {
        const board = document.querySelector(playerBoardNode);
        board.innerHTML = "";
    }

    return {
        loadBoard,
        clearBoard
    }
}

let bootGame = (async () => {
    let player1 = player("dave");
    let player2 = player("ella");
    let d1 = loadPlayerDOM(player1,".player1");
    let d2 = loadPlayerDOM(player2,".player2");

    let turnFlag = 0;

    let triggerTurn = function (turnFlag) {
        if(turnFlag === 0) {
            d1.loadBoard(0);
            d2.loadBoard(1);
        } else {
            d1.loadBoard(1);
            d2.loadBoard(0);
        }
    }

    let triggerAlarm = () => {
        let p1 = document.querySelector(".player1");
        let p2 = document.querySelector(".player2");
        p1.addEventListener("click", () => {
            d1.clearBoard();
            d2.clearBoard();
            triggerTurn(0);
        })
        p2.addEventListener("click", () => {
            d1.clearBoard();
            d2.clearBoard();
            triggerTurn(1);
        })
    }

    if(player1.checkPlayerStatus() === true && player2.checkPlayerStatus() === true) {
        triggerTurn(turnFlag);
        triggerAlarm();
    }
})();


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