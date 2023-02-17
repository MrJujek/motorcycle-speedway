export default class Track {
    constructor() {
        this.ctx = document.getElementById("speedway").getContext("2d")
        this.canvasHeight = document.getElementById("speedway").height
        this.canvasWidth = document.getElementById("speedway").width
        this.grassPattern
        this.pathPattern
        this.init()
    };
    init() {
        this.makeImagesAndPatterns();
    };
    makeImagesAndPatterns() {
        let grassImg = new Image()
        grassImg.src = './img/grass.png'
        grassImg.onload = () => {
            this.grassPattern = this.ctx.createPattern(grassImg, "repeat");

            let pathImg = new Image()
            pathImg.src = './img/path.png'

            pathImg.onload = () => {
                this.pathPattern = this.ctx.createPattern(pathImg, "repeat");
                this.makeSpeedway();
            }
        };

    };
    makeSpeedway() {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.grassPattern;
        this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.strokeStyle = "#000";
        this.ctx.lineWidth = 5;
        this.ctx.arc(this.canvasWidth / 4 * 1, this.canvasHeight / 2, 200, Math.PI / 2, Math.PI / 2 * 3);
        this.ctx.arc(this.canvasWidth / 4 * 3, this.canvasHeight / 2, 200, Math.PI / 2 * 3, Math.PI / 2);
        this.ctx.closePath();
        this.ctx.fillStyle = this.pathPattern;
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.strokeStyle = "#000";
        this.ctx.lineWidth = 5;
        this.ctx.arc(this.canvasWidth / 4 * 1, this.canvasHeight / 2, 50, Math.PI / 2, Math.PI / 2 * 3);
        this.ctx.arc(this.canvasWidth / 4 * 3, this.canvasHeight / 2, 50, Math.PI / 2 * 3, Math.PI / 2);
        this.ctx.closePath();
        this.ctx.fillStyle = this.grassPattern;
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();
    }
}