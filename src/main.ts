import Game from "./Game.js";
import UI from "./UI.js";

interface PlayerInterface {
    number: number;
    controls: {
        left: number;
        right: number;
    };
}

let ui = new UI(startGame);
ui.createUI();

function startGame(players: PlayerInterface[]) {
    let game = new Game(players);
    game.startGame();
}
