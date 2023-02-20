export default class UI {
    constructor(startGame) {
        this.players = [];
        this.startGame = startGame;
    }
    createUI() {
        let playerInputs = document.querySelectorAll(".menu-option");
        for (let i = 0; i < playerInputs.length; i++) {
            let playerInput = playerInputs[i];
            let inputLeft = playerInput.querySelector(".left-input");
            let inputRight = playerInput.querySelector(".right-input");
            let addPlayerButton = playerInput.querySelector(".add-remove-button");
            inputLeft.onkeydown = (e) => {
                e.preventDefault();
                inputLeft.value = e.key;
                if (this.players.find((player) => player.controls.left === e.keyCode ||
                    player.controls.right === e.keyCode)) {
                    inputLeft.value = "";
                    window.alert("This key is already in use");
                    return;
                }
                if (!this.players.find((player) => player.number === i)) {
                    this.players.push({
                        number: i,
                        controls: {
                            left: -1,
                            right: -1,
                        },
                        active: false,
                    });
                }
                let index = this.players.findIndex((player) => player.number === i);
                this.players[index].controls.left = e.keyCode;
            };
            inputRight.onkeydown = (e) => {
                e.preventDefault();
                inputRight.value = e.key;
                if (this.players.find((player) => player.controls.right === e.keyCode ||
                    player.controls.left === e.keyCode)) {
                    inputRight.value = "";
                    window.alert("This key is already in use");
                    return;
                }
                if (!this.players.find((player) => player.number === i)) {
                    this.players.push({
                        number: i,
                        controls: {
                            left: -1,
                            right: -1,
                        },
                        active: false,
                    });
                }
                let index = this.players.findIndex((player) => player.number === i);
                this.players[index].controls.right = e.keyCode;
            };
            addPlayerButton.onclick = () => {
                if (this.players.find((player) => player.number === i)) {
                    let index = this.players.findIndex((player) => player.number === i);
                    if (this.players[index].controls.left === -1 ||
                        this.players[index].controls.right === -1) {
                        window.alert("Please select both controls");
                        return;
                    }
                    this.players[index].active = !this.players[index].active;
                    if (this.players[index].active) {
                        addPlayerButton.innerHTML = "Remove";
                    }
                    else {
                        addPlayerButton.innerHTML = "Add";
                    }
                }
            };
        }
        // Start button
        let startButton = document.getElementById("start-game");
        startButton.onclick = () => {
            let activePlayers = this.players.filter((player) => player.active);
            if (activePlayers.length < 2) {
                window.alert("Please select 2 or more players");
                return;
            }
            this.startGame(activePlayers);
        };
    }
}
//# sourceMappingURL=UI.js.map