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
