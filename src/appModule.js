export const ship = (shipLength, shipHit = 0, shipStatus = true) => {
    let length = shipLength;
    let hit = shipHit;
    let status = shipStatus;

    const checkStatus = () => {
        return status;
    }

    let isSunk = () => {
        if(length <= hit) {
            status = false;
        } 
        return !status;
    }

    let hit_ship = () => {
        hit += 1;
        isSunk();
    }

    let getLength = () => {
        return length;
    }

    

    return {
        checkStatus,
        hit_ship,
        isSunk,
        getLength
    }
}

export const Gameboard = () => {
    let totalShips = 0;

    let tileMaker = () => {
        return {
            status : "water",
            ship : null,
            isHit : function () { if(this.status === "ship") {this.status = "hit"} },
            isMiss : function () { if(this.status === "water") {this.status = "miss"} },
            placeShip : function (ship) { if(this.status === "water") { this.status = "ship", this.ship = ship } },
            getShip : function () { return this.ship },
            getStatus : function () { return this.status },
        }
    }

    let board = Array.from({length : 10}, () => Array.from({length: 10}, () => tileMaker()));

    function boundaryCheck(x,y) {
        if(x <= 10 && x >= 0 && y <= 10 && y >= 0) {
            return true;
        } else {
            return false;
        }
    }

    let placeShip = (x,y,ship) => {
        if(boundaryCheck(x,y) && boundaryCheck(x+ship.getLength(), y+ship.getLength())) {
            for(let i = 0; i<ship.getLength(); i++) {
                board[x][y+i].placeShip(ship);
            }
            totalShips++;
        }
    }

    let receiveAttack = (x,y) => {
        console.log("Before attack:", JSON.stringify(board[x][y]));
        let cell = board[x][y];
        if(cell.status === "ship") {
            let ship = cell.getShip();
            ship.hit_ship();
            cell.isHit();
            if(ship.isSunk() === true) {
                totalShips--;
            }
        } else if (cell.status === "water") {
            cell.isMiss();
        }
        console.log("After attack:", JSON.stringify(board[x][y]));
        return cell.status;
    }

    let printBoard = () => {
        console.table(board);
    }

    let checkTotal = () => {
        return totalShips;
    }

    let allSunk = () => {
        return (totalShips === 0);
    }

    return {
        placeShip,
        printBoard,
        receiveAttack,
        checkTotal,
        allSunk,
        board
    }
}

export const player = (playerName) => {
    let playerBoard = Gameboard();

    let shipCounter = 0;

    let name = playerName;

    let ship1 = ship(3);
    let ship2 = ship(4);
    let ship3 = ship(3);
    
    playerBoard.placeShip(3,3,ship1);
    playerBoard.placeShip(1,1,ship2);
    playerBoard.placeShip(6,7,ship3);

    let checkPlayerStatus = () => {
        if(playerBoard.allSunk() === true) {
            return false;
        } else {
            return true;
        }
    }

    let playerReceiveAttack = (x,y) => {
        playerBoard.receiveAttack(x,y);
    } 

    let playerPlaceShip = (x,y,len = 4) => {
        playerBoard.placeShip(x,y,ship(len));
        shipCounter++;
    }

    let playerPrintBoard = () => {
        playerBoard.printBoard();
    }


    return {
        name, 
        playerBoard,
        checkPlayerStatus,
        playerReceiveAttack,
        playerPlaceShip,
        playerPrintBoard
    }
}

export function sum(a,b) {
    return a + b;
}

