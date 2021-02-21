var FIELD_SIZE_X = 20;// строки
var FIELD_SIZE_Y = 20;//столбцы
var SNAKE_SPEED = 300;//Интервал между перемещения змейки
var isGameStarted = false;// Запущена ли игра
var snakeTimer;// Таймер змейки
var score = 0; //Рузультат 
var direction = 'top';//Направление движение змейки 
var snake = []; // Сама змея 
var hindrance = [];
var hindranceInterval;
var snakeCoordX;
var snakeCoordY;

function init() {
    prepareGameField();// Генерация поля


    document.getElementById('snake-start').addEventListener('click', startGameHandler);
    
    document.getElementById('snake-renew').addEventListener('click', refreshGameHandler);
    
    window.addEventListener('keydown', changeDirectionHandler);
}
// Функция генерации игрового поля
function prepareGameField() {
    // Создаём таблицу
    var gameTable = document.createElement('table');
    gameTable.classList.add('game-table');
    gameTable.id = 'game-table';
    
    // Генерация ячеек игровой таблицы
    for(var i = 0; i < FIELD_SIZE_X; i++) {
         // Создание строки
        var row = document.createElement('tr');
        row.classList.add('game-table-row');
        
        for(var j = 0; j < FIELD_SIZE_Y; j++) {
            // Создание ячейки
            var cell = document.createElement('td');
            cell.classList.add('game-table-cell');
            
            row.appendChild(cell);// Добавление ячейки
        } 
        
        gameTable.appendChild(row);// Добавление строки
    }
    
    document.getElementById('snake-field').appendChild(gameTable); // Добавление таблицы
}
/**
 * Старт игры
 */
function startGameHandler() {
    isGameStarted = true;
    respawn();//создали змейку
    
    snakeTimer = setInterval(move, SNAKE_SPEED);
    
    setTimeout(createFood, 500);
    hindranceInterval = setInterval(hindranceCreat, 5000);
}

function refreshGameHandler() {
    window.location.reload();
}
function changeDirectionHandler(event) {
    switch(event.keyCode) {
        case 37:
            if(direction != 'right') direction = 'left';
            break;
        case 38:
            if(direction != 'bottom') direction = 'top';
            break;
        case 39:
            if(direction != 'left') direction = 'right';
            break;
        case 40:
            if(direction != 'top') direction = 'bottom';
            break;
    }
}
/**
 * Функция расположения змейки на игровом поле
 */
function respawn() {
    snakeCoordX = Math.floor(FIELD_SIZE_X / 2);
    snakeCoordY = Math.floor(FIELD_SIZE_Y / 2);
    
    var gameTable = document.getElementById('game-table');
    // голова
    var snakeHead = gameTable.children[snakeCoordX].children[snakeCoordY];
    snakeHead.classList.add('snake-unit');
    // хвост
    var snakeTail = gameTable.children[snakeCoordX + 1].children[snakeCoordY];
    snakeTail.classList.add('snake-unit');
    snake.push(snakeTail);
    snake.push(snakeHead);
}

/**
 * Движение змейки
 */
function move() {
    var gameTable = document.getElementById('game-table');
    var newUnit;
    
    switch(direction) {
        case 'top':
            newUnit = gameTable.children[--snakeCoordX].children[snakeCoordY];
            break;
        case 'bottom':
            newUnit = gameTable.children[++snakeCoordX].children[snakeCoordY];
            break;
        case 'right':
            newUnit = gameTable.children[snakeCoordX].children[++snakeCoordY];
            break;
        case 'left':
            newUnit = gameTable.children[snakeCoordX].children[--snakeCoordY];
            break;
    }

      if(!isSnakeUnit(newUnit) && !isHindranceUnit(newUnit) && inBounds()) {
        newUnit.classList.add('snake-unit');
        snake.push(newUnit);
        if(!isFood(newUnit)) {
            var snakeRemoved = snake.shift();
            snakeRemoved.classList.remove('snake-unit');   
        }
    } else {
        gameOver();
    }
}

function isSnakeUnit(unit) {
    return snake.includes(unit);
}

function isHindranceUnit(unit) {
    return hindrance.includes(unit);
}

function isFood(unit) {

    if(unit.classList.contains('food-unit')) {
        unit.classList.remove('food-unit');
        score++;
        document.getElementById('scoreView').innerHTML = score;
        createFood();
        return true;
    } else {
        return false;
    }
}

/**
 * Создание еды
 */
function createFood() {
    var foodCreated = false;
    var gameTable = document.getElementById('game-table');
    
    while(!foodCreated) {
        var foodX = Math.floor(Math.random() * FIELD_SIZE_X);
        var foodY = Math.floor(Math.random() * FIELD_SIZE_Y);
        
        var foodCell = gameTable.children[foodX].children[foodY];
        
        if(!foodCell.classList.contains('snake-unit')) {
            foodCell.classList.add('food-unit');
            
            foodCreated = true;
        }
    }
}

  function hindranceCreat() {
    var hindranceCreated = false;
    var gameTable = document.getElementById('game-table');

    while (!hindranceCreated) {
      var hindranceX = Math.floor(Math.random() * FIELD_SIZE_X);
      var hindranceY = Math.floor(Math.random() * FIELD_SIZE_Y);

      var hindranceCell = gameTable.children[hindranceX].children[hindranceY];

      if (!hindranceCell.classList.contains('snake-unit') && !hindranceCell.classList.contains('food-unit')) {
        hindranceCell.classList.add('hindrance-unit');
        hindranceCreated = true;
        hindrance.push(hindranceCell);

        if (hindrance.length = 2){
          var a = hindrance.shift();
          a.classList.remove('hindrance-unit');
        }
      }
    }
  }

function inBounds() {
    return snakeCoordX >= 0 && snakeCoordX < FIELD_SIZE_X && snakeCoordY >= 0 && snakeCoordY < FIELD_SIZE_Y;

}

function gameOver() {
    isGameStarted = false;
    clearInterval(hindranceInterval);
    clearInterval(snakeTimer);
    alert('GAME OVER');
}

window.onload = init;
