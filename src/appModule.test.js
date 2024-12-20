import {ship, Gameboard} from "./appModule.js";

describe("Testing Starts here", () => {

    let Ship = ship(4);

    it("Ship Default Status: ", () => {
        expect(Ship.checkStatus()).toBe(true);
    })

    it("Ship Sink: ", () => {
        for(let i = 0; i<4; i++) Ship.hit_ship();
        expect(Ship.isSunk()).toBe(true);
    })

    it("Check Status: ", () => {
        expect(Ship.checkStatus()).toBe(false);
    })
})

describe("Testing Battlefied: ", () => {
    let battlefield = Gameboard();
    
    let ship1 = ship(3);
    let ship2 = ship(4);
    let ship3 = ship(3);
    
    battlefield.placeShip(3,3,ship1);
    battlefield.placeShip(1,1,ship2);
    battlefield.placeShip(6,7,ship3);
    
    battlefield.receiveAttack(3,4);
    // battlefield.receiveAttack(3,5);
    battlefield.receiveAttack(4,4);
    
    battlefield.receiveAttack(3,3);


    it("Battlefield Hit", () => {
        expect(battlefield.receiveAttack(3,5)).toBe("hit");
    })

    it("Battlefield Miss", () => {
        expect(battlefield.receiveAttack(4,4)).toBe("miss");
    })

    it("Battlefield Report All Hit", () => {
        expect(battlefield.allSunk()).toBe(false);
    })

    it("Battlefield Report Some Miss", () => {
        expect(battlefield.allSunk()).toBe(false);
    })
})

describe("Testing Battlefied but all sunk: ", () => {
    let battlefield = Gameboard();
    
    let ship1 = ship(3);
    
    battlefield.placeShip(3,3,ship1);
    
    battlefield.receiveAttack(3,4);
    battlefield.receiveAttack(3,3);


    it("Battlefield Hit", () => {
        expect(battlefield.receiveAttack(3,5)).toBe("hit");
    })

    it("Battlefield Report All Hit", () => {
        expect(battlefield.allSunk()).toBe(true);
    })
})