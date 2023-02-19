export default class Track {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  canvasHeight: number;
  canvasWidth: number;
  grassPattern: CanvasPattern | null = null;
  pathPattern: CanvasPattern | null = null;

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.ctx = context;
    this.canvasHeight = this.canvas.height;
    this.canvasWidth = this.canvas.width;

    let grassImg = new Image();
    grassImg.src = "./img/grass.png";
    grassImg.onload = () => {
      this.grassPattern = this.ctx.createPattern(
        grassImg,
        "repeat"
      ) as CanvasPattern;
      
      let pathImg = new Image();
      pathImg.src = "./img/path.png";
      pathImg.onload = () => {
        this.pathPattern = this.ctx.createPattern(
          pathImg,
          "repeat"
        ) as CanvasPattern;
        this.makeSpeedway();
      };
    };
  }

  makeSpeedway() {
    // tlo ze trawa
    this.ctx.beginPath();
    this.ctx.fillStyle = this.grassPattern!;
    this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.ctx.closePath();

    //sciezka
    this.ctx.beginPath();
    this.ctx.strokeStyle = "#000";
    this.ctx.lineWidth = 5;
    //pierwsza polowa kolka zewnetrznego
    this.ctx.arc(
      (this.canvasWidth / 4) * 1,
      this.canvasHeight / 2,
      200,
      Math.PI / 2,
      (Math.PI / 2) * 3
    );
    //druga polowa kolka zewnetrznego
    this.ctx.arc(
      (this.canvasWidth / 4) * 3,
      this.canvasHeight / 2,
      200,
      (Math.PI / 2) * 3,
      Math.PI / 2
    );
    this.ctx.closePath();
    this.ctx.fillStyle = this.pathPattern!;
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.closePath();

    //pierwsza polowa kolka srodkowego
    this.ctx.beginPath();
    this.ctx.strokeStyle = "#000";
    this.ctx.lineWidth = 5;
    this.ctx.arc(
      (this.canvasWidth / 4) * 1,
      this.canvasHeight / 2,
      50,
      Math.PI / 2,
      (Math.PI / 2) * 3
    );
    //druga polowa kolka srodkowego
    this.ctx.arc(
      (this.canvasWidth / 4) * 3,
      this.canvasHeight / 2,
      50,
      (Math.PI / 2) * 3,
      Math.PI / 2
    );
    this.ctx.closePath();
    this.ctx.fillStyle = this.grassPattern!;
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.closePath();
  }
}
