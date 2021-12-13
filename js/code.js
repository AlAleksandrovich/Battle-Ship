document.addEventListener('DOMContentLoaded', () => {
    const userGrid = document.querySelector('.grid-user');

    const computerGrid = document.querySelector('.grid-computer');
    const displayGrid = document.querySelector('.grid-display');
    const ships = document.querySelectorAll('.ship');

    const ship1 = document.querySelector('.ship1—container');
    const ship2 = document.querySelector('.ship2-container');
    const ship3 = document.querySelector('.ship3-container');
    const ship4 = document.querySelector('.ship4-container');

    const startButton = document.querySelector('#start');
    const rotateButton = document.querySelector('#rotate');
    const turnDisplay = document.querySelector('#whose-go');
    const infoDisplay = document.querySelector('#info');
    const userSquares = [];
    const computerSquares = [];
    let isHorizontal = true;
    let isGameOver = false;
    let currentPlayer = 'user';

    const width = 10;

    //Create Board
    function createBoard(grid, squares) {
        for (let i = 0; i < width * width; i++) {
            const square = document.createElement('div');
            square.dataset.id = i;
            grid.appendChild(square);
            squares.push(square);
        }
    }
    createBoard(userGrid, userSquares);
    createBoard(computerGrid, computerSquares);

    // Ships
    const shipArray = [
        {
            name: 'ship1',
            directions: [
                [0, 0],
                [0, 0]
            ]
        },
        {
            name: 'ship2',
            directions: [
                [0, 1],
                [0, width]
            ]
        },
        {
            name: 'ship3',
            directions: [
                [0, 1, 2],
                [0, width, width * 2]
            ]
        },
        {
            name: 'ship4',
            directions: [
                [0, 1, 2, 3],
                [0, width, width * 2, width * 3]
            ]
        }];

    // Draw the computers ships in random locations
    function generate(ship) {
        let randomDirection = Math.floor(Math.random() * ship.directions.length);
        let current = ship.directions[randomDirection];
        if (randomDirection === 0) direction = 1;
        if (randomDirection === 1) direction = 10;
        let randomStart = Math.abs(Math.floor(Math.random() * computerSquares.length - (ship.directions[0].length * direction)));


        const isTaken = current.some(index => computerSquares[randomStart + index].classList.contains('taken'));
        const isAtRightEdge = current.some(index => (randomStart + index) % width === width - 1);
        const isAtLeftEdge = current.some(index => (randomStart + index) % width === 0);
           
        if (!isTaken && !isAtRightEdge && !isAtLeftEdge) current.forEach(index => computerSquares[randomStart + index].classList.add('taken', ship.name));

        else generate(ship);
    }
    generate(shipArray[0]);
    generate(shipArray[1]);
    generate(shipArray[2]);
    generate(shipArray[3]);
    //rotate the ships
    function rotate() {

        if (isHorizontal) {
            //ship1.classList.toggle('ship1-container-vertical');
            ship2.classList.toggle('ship2-container-vertical');
            ship3.classList.toggle('ship3-container-vertical');
            ship4.classList.toggle('ship4-container-vertical');
            isHorizontal = false;
            console.log(isHorizontal);
            return;
        }
        if (!isHorizontal) {
           // ship1.classList.toggle('ship1-container-vertical');
            ship2.classList.toggle('ship2-container-vertical');
            ship3.classList.toggle('ship3-container-vertical');
            ship4.classList.toggle('ship4-container-vertical');
            isHorizontal = true;
            console.log(isHorizontal);
            return;
        }
    }
    rotateButton.addEventListener('click', rotate);

    //move around user ships
    ships.forEach(ship => ship.addEventListener('dragstart', dragStart));
    userSquares.forEach(square => square.addEventListener('dragstart', dragStart));
    userSquares.forEach(square => square.addEventListener('dragover', dragOver));
    userSquares.forEach(square => square.addEventListener('dragenter', dragEnter));
    userSquares.forEach(square => square.addEventListener('dragleave', dragLeave));
    userSquares.forEach(square => square.addEventListener('drop', dragDrop));
    userSquares.forEach(square => square.addEventListener('dragend', dragEnd));

    let selectedShipNameWithIndex;
    let draggedShip;
    let draggedShipLength;


    ships.forEach(ship => ship.addEventListener('mousedown', (e) => {
        selectedShipNameWithIndex = e.target.id;
        console.log(selectedShipNameWithIndex + `${' Это я не записываю ничего'}`)
    }));


    function dragStart() {
        draggedShip = this;
        draggedShipLength = draggedShip.length;
        draggedShipLength == this.childNodes.length;
        console.log(draggedShip);

    }

    function dragOver(e) {
        e.preventDefault();
    }


    function dragEnter(e) {
        e.preventDefault();
    }


    function dragLeave() {
        console.log('перемещаю');
    }


    function dragDrop() {
        let shipNameWithLastId = draggedShip.lastChild.id;
        let shipClass = shipNameWithLastId.slice(0, -2);
        console.log(shipClass);
        let lastShipIndex = parseInt(shipNameWithLastId.substr(-1));
        let shipLastId = lastShipIndex + parseInt(this.dataset.id);
        console.log(shipLastId);

        //     let notAllowedHorizontal = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 1, 11, 21, 31, 41, 51, 61, 71, 81, 91, 2,  12, 22, 32, 42, 52, 62, 72, 82, 92, 3, 13, 23, 33, 43, 53, 63, 73, 83, 93];
        //   let notAllowedVertical = [99, 98, 97, 96, 95, 94, 93, 92, 91, 90, 89, 88, 87, 86, 85, 84, 83, 82, 80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 70, 69, 68, 67, 66, 65, 64, 63, 62, 61, 60, 59];

        //    notAllowedHorizontal = notAllowedHorizontal.splice (0, 10 * lastShipIndex);
        //   notAllowedVertical = notAllowedVertical.splice (0, 10 * lastShipIndex);


        selectedShipIndex = parseInt(selectedShipNameWithIndex.substr(-1));
        shipLastId = shipLastId - selectedShipIndex;
        console.log(shipLastId);

        if (isHorizontal) {
            for (let i = 0; i < draggedShipLength; i++) {
                userSquares[parseInt(this.dataset.id) - selectedShipIndex + i].classList.add('taken', shipClass);
            }
        } else if (!isHorizontal) {
            for (let i = 0; i < draggedShipLength; i++) {
                userSquares[parseInt(this.dataset.id) - selectedShipIndex + width * i].classList.add('taken', shipClass);
            }
        } else return;

        displayGrid.removeChild(draggedShip);
        console.log(draggedShipLength);
    }

    function dragEnd() {
        console.log('dragend');
    }

    //Game Logic

    function playGame() {
        if (isGameOver) return;
        if (currentPlayer === 'user') {
            turnDisplay.innerHTML = 'Ваш Ход';
            computerSquares.forEach(square => square.addEventListener('click', function (e) {
                revealSquare(square);
            }));
        }
        if (currentPlayer === 'computer') {
            turnDisplay.innerHTML = 'Компьютер Ходит';
            setTimeout(computerGo(), 1000);

            //function computerGo
        }
    }
    startButton.addEventListener('click', playGame);

    var ship1Count = 0;
    var ship2Count = 0;
    var ship3Count = 0;
    var ship4Count = 0;

    function revealSquare(square) {
        if (!square.classList.contains('boom')) {
            if (square.classList.contains('ship1')) ship1Count++;
            if (square.classList.contains('ship2')) ship2Count++;
            if (square.classList.contains('ship3')) ship3Count++;
            if (square.classList.contains('ship4')) ship4Count++;
        }
        if (square.classList.contains('taken')) {
            square.classList.add('boom');
        } else {
            square.classList.add('miss');
        }

        currentPlayer = 'computer';
        playGame();
    }


    var cpship1Count = 0;
    var cpship2Count = 0;
    var cpship3Count = 0;
    var cpship4Count = 0;


    function computerGo() {
        let random = (Math.random() * userSquares.length)
        if (!userSquares[random].classList.contains('boom')) {
            userSquares[random].classList.add('boom');
            if (userSquares[random].classList.contains('ship1')) cpship1Count++;
            if (userSquares[random].classList.contains('ship2')) cpship2Count++;
            if (userSquares[random].classList.contains('ship3')) cpship3Count++;
            if (userSquares[random].classList.contains('ship4')) cpship4Count++;
        } else computerGo();
        currentPlayer = 'user';
        turnDisplay = 'Ваш Ход';
    }

    function checkForWins() {
        if (ship1Count == 1) {
            infoDispaly.innerHTML = 'Вы потопили одиночный корабль компьютера';
            ship1Count = 10;
        }
        if (ship2Count == 2) {
            infoDispaly.innerHTML = 'Вы потопили 2-ух палубный корабль компьютера';
            ship2Count = 10;
        }
        if (ship3Count == 3) {
            infoDispaly.innerHTML = 'Вы поторили 3-х палубный корабль компьютера';
            ship3Count = 10;
        }

        if (ship4Count == 4) {
            infoDispaly.innerHTML = 'Вы потопили 4-х палубный корабль компьютера';
            ship4Count = 10;
        }
        if (cpship1Count == 1) {
            infoDispaly.innerHTML = 'Вы потопили одиночный корабль компьютера';
            cpship1Count = 10;
        }
        if (cpship2Count == 2) {
            infoDispaly.innerHTML = 'Вы потопили 2-ух палубный корабль компьютера';
            cpship2Count = 10;
        }
        if (cpship3Count == 3) {
            infoDispaly.innerHTML = 'Вы поторили 3-х палубный корабль компьютера';
            cpship3Count = 10;
        }

        if (cpship4Count == 4) {
            infoDispaly.innerHTML = 'Вы потопили 4-х палубный корабль компьютера';
            cpship4Count = 10;
        }
        if ((ship1Count + ship2Count + ship3Count + ship4Count) === 50) {
            infoDisplay.innerHTML = 'Вы выйграли!';
            gameOver();
        }
        if ((cpship1Count + cpship2Count + cpship3Count + cpship4Count) === 50) {
            infoDisplay.innerHTML = 'Компьютер выйграл!';
            gameOver();
        }
    }

    function gameOver() {
        isGameOver = true;
        startButton.removeEventListener('click', playGame);
    }

});


