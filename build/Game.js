import Track from "./Track.js";
import Player from "./Player.js";
export default class Game {
    constructor(players) {
        this.players = [];
        this.activePlayers = [];
        this.deadPlayers = [];
        this.laps = 3;
        this.gameInterval = 0;
        this.players = players;
        this.canvas = document.querySelector("canvas");
        this.context = this.canvas.getContext("2d");
        this.track = new Track(this.canvas, this.context);
    }
    startGame() {
        for (let i = 0; i < this.players.length; i++) {
            const player = this.players[i];
            this.activePlayers.push(new Player(player, this.canvas, this.context));
        }
        this.gameInterval = setInterval(() => {
            this.gameLoop();
        }, 1000 / 60);
    }
    gameLoop() {
        let winner = -1;
        this.track.makeSpeedway();
        for (let i = 0; i < this.activePlayers.length; i++) {
            const player = this.activePlayers[i];
            player.update();
            if (player.dead) {
                this.deadPlayers.push(player);
                this.activePlayers.splice(i, 1);
            }
            if (player.currentLap === this.laps) {
                winner = player.player.number;
            }
            document.getElementById(`player${player.player.number + 1}-laps`).innerText = `${player.currentLap}/${this.laps}`;
        }
        for (let i = 0; i < this.deadPlayers.length; i++) {
            const player = this.deadPlayers[i];
            player.draw();
        }
        if (winner > -1) {
            const player = this.activePlayers[0];
            player.draw();
            this.context.fillStyle = "white";
            this.context.font = "50px Arial";
            this.context.textAlign = "center";
            this.context.fillText(`Player ${winner + 1} wins!`, this.canvas.width / 2, this.canvas.height / 2);
            clearInterval(this.gameInterval);
            return;
        }
        if (this.activePlayers.length === 1) {
            const player = this.activePlayers[0];
            player.draw();
            this.context.fillStyle = "white";
            this.context.font = "50px Arial";
            this.context.textAlign = "center";
            this.context.fillText(`Player ${this.activePlayers[0].player.number + 1} wins!`, this.canvas.width / 2, this.canvas.height / 2);
            clearInterval(this.gameInterval);
            return;
        }
    }
}
//# sourceMappingURL=Game.js.map