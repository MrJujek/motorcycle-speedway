import Game from "./Game.js";
import UI from "./UI.js";
let ui = new UI(startGame);
ui.createUI();
function startGame(players) {
    let game = new Game(players);
    game.startGame();
}
//# sourceMappingURL=main.js.map