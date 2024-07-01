(function () {
  let FPS = 10;
  const SIZE = 40;
  let board, snake, food, score, gameInterval, paused = false, running = false, frameCount = 0;

  alert('Snake Game! Tecla de P pausa o game; Tecla S starta um novo game. Ok?')
  function init() {
    board = new Board(SIZE);
    snake = new Snake([[4, 4], [4, 5], [4, 6]]);
    score = 0;
    frameCount = 0;
    FPS = 10;
    updateScore();
    spawnFood();
    clearInterval(gameInterval);
    gameInterval = setInterval(run, 1000 / FPS);
  }

  function startGame() {
    if (!running) {
      frameCount = 0;
      FPS = 10;
      clearInterval(gameInterval);
      running = true;
      init();
    }
  }

  function pauseGame() {
    paused = !paused;
  }

  function resetGame() {
    document.getElementById('board').innerHTML = '';
    clearInterval(gameInterval);
    running = false;
    paused = false;
    init();
  }

  window.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowUp":
        snake.changeDirection(0);
        break;
      case "ArrowRight":
        snake.changeDirection(1);
        break;
      case "ArrowDown":
        snake.changeDirection(2);
        break;
      case "ArrowLeft":
        snake.changeDirection(3);
        break;
      case "p":
        pauseGame();
        break;
      case "S":
      case "s":
          resetGame();
        break;
      default:
        break;
    }
  });

  class Board {
    constructor(size) {
      this.element = document.getElementById("board");
      this.color = "#ccc";
      for (let i = 0; i < size; i++) {
        const row = document.createElement("tr");
        this.element.appendChild(row);
        for (let j = 0; j < size; j++) {
          const field = document.createElement("td");
          row.appendChild(field);
        }
      }
    }
  }

  class Snake {
    constructor(body) {
      this.body = body;
      this.color = "#222";
      this.direction = 1; // 0 para cima, 1 para direita, 2 para baixo, 3 para esquerda
      this.body.forEach(field => document.querySelector(`#board tr:nth-child(${field[0] + 1}) td:nth-child(${field[1] + 1})`).style.backgroundColor = this.color);
    }

    walk() {
      const head = this.body[this.body.length - 1];
      let newHead;
      switch (this.direction) {
        case 0:
          newHead = [head[0] - 1, head[1]];
          break;
        case 1:
          newHead = [head[0], head[1] + 1];
          break;
        case 2:
          newHead = [head[0] + 1, head[1]];
          break;
        case 3:
          newHead = [head[0], head[1] - 1];
          break;
        default:
          break;
      }

      // Check for collision with walls or self
      if (this.isCollision(newHead)) {
        gameOver();
        return;
      }

      this.body.push(newHead);
      const oldTail = this.body.shift();

      document.querySelector(`#board tr:nth-child(${newHead[0] + 1}) td:nth-child(${newHead[1] + 1})`).style.backgroundColor = this.color;
      document.querySelector(`#board tr:nth-child(${oldTail[0] + 1}) td:nth-child(${oldTail[1] + 1})`).style.backgroundColor = board.color;

      // Check if food is eaten
      if (newHead[0] === food.position[0] && newHead[1] === food.position[1]) {
        this.body.unshift(oldTail); // Add the tail back to grow the snake
        updateScore(food.type === 'black' ? 1 : 2);
        spawnFood();
      }
    }

    changeDirection(direction) {
      if (Math.abs(this.direction - direction) !== 2) {
        this.direction = direction;
      }
    }

    isCollision(position) {
      // Check if collision with walls
      if (position[0] < 0 || position[0] >= SIZE || position[1] < 0 || position[1] >= SIZE) {
        return true;
      }
      // Check if collision with self
      return this.body.some(part => part[0] === position[0] && part[1] === position[1]);
    }
  }

  class Food {
    constructor() {
      this.position = [];
      this.type = 'black';
    }

    generate() {
      let validPosition = false;
      while (!validPosition) {
        const x = Math.floor(Math.random() * SIZE);
        const y = Math.floor(Math.random() * SIZE);
        if (!snake.body.some(part => part[0] === x && part[1] === y)) {
          this.position = [x, y];
          this.type = Math.random() < 0.67 ? 'black' : 'red'; // 2/3 chance for black, 1/3 for red
          validPosition = true;
        }
      }
      document.querySelector(`#board tr:nth-child(${this.position[0] + 1}) td:nth-child(${this.position[1] + 1})`).style.backgroundColor = this.type === 'black' ? 'black' : 'red';
    }
  }

  function spawnFood() {
    food = new Food();
    food.generate();
  }

  function updateScore(points = 0) {
    score += points;
    document.getElementById('score').innerText = score.toString().padStart(5, '0');
  }

  function gameOver() {
    clearInterval(gameInterval);
    running = false;
    alert('Fim do jogo! Pressione a tecla S para começar um novo jogo.');
  }

  function run() {
    if (!paused) {
      snake.walk();
      frameCount++;
      if (frameCount % 60 === 0) {
        FPS++;
        clearInterval(gameInterval);
        gameInterval = setInterval(run, 1000 / FPS);
      }
    }
  }

  init();
})();