interface PlayerInterface {
  number: number;
  controls: {
    left: number;
    right: number;
  };
}

const images = [
  "./img/red.png",
  "./img/green.png",
  "./img/blue.png",
  "./img/yellow.png",
];

export default class Player {
  player: PlayerInterface;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  position: number[];
  angle: number;
  speed: number;
  controls: {
    left: number;
    right: number;
  };
  dead: boolean = false;
  tracks: number[][] = [];
  activeKeys = {
    left: false,
    right: false,
  };
  color: string;
  image: HTMLImageElement;
  currentLap: number = 0;
  checkFinishLine: boolean = false;
  constructor(
    player: PlayerInterface,
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ) {
    this.player = player;
    this.canvas = canvas;
    this.context = context;
    this.position = [
      this.canvas.width / 2,
      this.canvas.height / 2 + 75 + 30 * player.number,
    ];
    this.angle = 0;
    this.speed = 3;
    this.controls = {
      left: this.player.controls.left,
      right: this.player.controls.right,
    };
    this.color = this.playerColor(this.player.number, 1);
    this.addListeners();
    this.image = new Image();
    this.image.src = images[this.player.number];
  }

  addListeners() {
    window.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.keyCode === this.controls.left) {
        this.activeKeys.left = true;
      }

      if (e.keyCode === this.controls.right) {
        this.activeKeys.right = true;
      }
    });

    window.addEventListener("keyup", (e: KeyboardEvent) => {
      if (e.keyCode === this.controls.left) {
        this.activeKeys.left = false;
      }

      if (e.keyCode === this.controls.right) {
        this.activeKeys.right = false;
      }
    });
  }

  playerColor(playerNumber: number, opacity: number) {
    switch (playerNumber) {
      case 0:
        return `rgba(255, 0, 0, ${opacity})`;
      case 1:
        return `rgba(0, 255, 0, ${opacity})`;
      case 2:
        return `rgba(0, 0, 255, ${opacity})`;
      case 3:
        return `rgba(255, 255, 0, ${opacity})`;
      default:
        return `rgba(255, 255, 255, ${opacity})`;
    }
  }

  move() {
    let currentPosition = this.position;
    this.position = [
      currentPosition[0] + Math.cos(this.angle) * this.speed,
      currentPosition[1] + Math.sin(this.angle) * this.speed,
    ];
    this.tracks.unshift([
      currentPosition[0],
      currentPosition[1],
      this.position[0],
      this.position[1],
    ]);
    if (this.tracks.length > 100) {
      this.tracks.pop();
    }
  }

  draw() {
    this.context.strokeStyle = this.color;
    this.context.lineWidth = 5;

    if (this.dead) {
      for (let i = 0; i < this.tracks.length; i++) {
        const alpha = (this.tracks.length - i) / this.tracks.length;
        this.context.strokeStyle = this.playerColor(this.player.number, alpha);
        this.context.beginPath();
        this.context.moveTo(this.tracks[i][0], this.tracks[i][1]);
        this.context.lineTo(this.tracks[i][2], this.tracks[i][3]);
        this.context.stroke();
      }
    } else {
      for (let i = 0; i < this.tracks.length; i++) {
        if (i < this.tracks.length) {
          const alpha = (this.tracks.length - i) / (this.tracks.length / 2);
          this.context.strokeStyle = this.playerColor(
            this.player.number,
            alpha
          );
        } else {
          this.context.strokeStyle = this.playerColor(this.player.number, 1);
        }

        this.context.beginPath();
        this.context.moveTo(this.tracks[i][0], this.tracks[i][1]);
        this.context.lineTo(this.tracks[i][2], this.tracks[i][3]);
        this.context.stroke();
      }
    }

    this.context.save();
    this.context.translate(this.position[0], this.position[1]);
    this.context.rotate(this.angle + Math.PI / 2);
    this.context.rotate(Math.PI / 2);
    this.context.rotate(Math.PI);
    this.context.drawImage(this.image, -50, -25, 100, 50);
    this.context.restore();
  }

  update() {
    if (this.activeKeys.left) {
      this.angle -= 0.05;
    }
    if (this.activeKeys.right) {
      this.angle += 0.05;
    }

    this.move();
    this.draw();
    this.checkFinish();
    this.checkCollision();
  }

  checkFinish() {
    if (
      this.position[1] >= this.canvas.height - this.canvas.height / 4 - 50 &&
      this.position[1] < this.canvas.height
    ) {
      if (
        this.checkFinishLine &&
        this.position[0] >= this.canvas.width / 2 &&
        this.position[0] < this.canvas.width / 2 + 20
      ) {
        this.currentLap++;
        this.checkFinishLine = false;
      } else if (
        this.position[0] >= this.canvas.width / 2 + 30 &&
        !this.checkFinishLine
      ) {
        this.checkFinishLine = true;
      }
    }
  }
  checkCollision() {
    if (this.position[0] < 0 || this.position[0] > this.canvas.width) {
      this.dead = true;
      return;
    }
    if (this.position[1] < 0 || this.position[1] > this.canvas.height) {
      this.dead = true;
      return;
    }
    if (this.position[0] < this.canvas.width / 4) {
      let distance = Math.sqrt(
        Math.pow(this.position[0] - this.canvas.width / 4, 2) +
        Math.pow(this.position[1] - this.canvas.height / 2, 2)
      );
      if (distance < 50) {
        this.dead = true;
        return;
      }
      if (distance > this.canvas.height / 2) {
        this.dead = true;
        return;
      }
    }

    if (this.position[0] > this.canvas.width - this.canvas.width / 4) {
      let distance = Math.sqrt(
        Math.pow(
          this.position[0] - this.canvas.width + this.canvas.width / 4,
          2
        ) + Math.pow(this.position[1] - this.canvas.height / 2, 2)
      );
      if (distance < 50) {
        this.dead = true;
        return;
      }
      if (distance > this.canvas.height / 2) {
        this.dead = true;
        return;
      }
    }

    if (
      this.position[0] >= this.canvas.width / 4 &&
      this.position[0] <= this.canvas.width - this.canvas.width / 4
    ) {
      if (
        this.position[1] > this.canvas.height / 2 - 50 &&
        this.position[1] < this.canvas.height / 2 + 50
      ) {
        this.dead = true;
        return;
      }
    }
  }
}
