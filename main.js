import Track from './track.js';
import Menu from './menu.js';

let players = [];
let deadPlayers = [];
let track, menu

window.onload = () => {
    createGame();
    showMenu();
}

function showMenu() {
    menu = new Menu();
    menu.createMenu();
}

function createGame() {
    players = [];
    deadPlayers = [];

    track = new Track();
    track.makeSpeedway();
}