// List to store boxes
let boxes = [];

//store the score
let score = 0;

document.addEventListener('DOMContentLoaded', ()=>{
    //start empty grid and place one '2'
    initializeGrid();
    addRandom();

    //listen for keyPresses
    document.addEventListener('keyup',(e) =>{processKeyPress(e)})

})

// initializes Grid with '0' boxes
function initializeGrid(){
    const grid = document.querySelector(".grid");
    for(let i = 0; i < 16; i++){
        // create new div with class of box and value of 0
        let box = document.createElement('div');
        box.classList.add('box');
        box.textContent = '0';

        // store the box in list
        boxes.push(box);

        // add the box to the grid
        grid.appendChild(box);
    }
}

// adds random box of value 2
function addRandom(){
    // pick random number between 0 and 15
    let random = Math.floor(Math.random() * 16);

    //Add 2 only if box value is 0
    if(boxes[random].textContent === "0"){
        boxes[random].textContent = "2";
        boxes[random].classList.add("flash");
        //highlight the new block added
        setTimeout(() => {
            boxes[random].classList.remove("flash");
            boxes[random].classList.add("box2");
        }, 300);
        checkIfEmpty();
    } else{addRandom();}
}

// process key press
function processKeyPress(e){

    let code = e.keyCode;
    let oldBoxArray = makeCopy(boxes);

    if([38,39,40,37].includes(code)){
        switch (code){
            case 38:
                combineColumn('up');
                break;
            case 39:
                combineRow('right');
                break;
            case 40:
                combineColumn('down');
                break;
            case 37:
                combineRow('left');
                break;
        }
        updateScore();
        beautifyBoxes();

        // add a new box only if something has moved
        if(checkIfBoxesChanged(oldBoxArray)){
            addRandom();
        }
    }
}

// create an integer list of the old array
function makeCopy(oldBoxArray){
    let copy = [];
    for(box of oldBoxArray){
        copy.push(parseInt(box.textContent));
    }
    return copy;
}

// checks if the boxes array changed
function checkIfBoxesChanged(oldBoxArray){
    let change = 0;
    for(let i = 0; i < oldBoxArray.length; i++){
        if(oldBoxArray[i] !== parseInt(boxes[i].textContent)){
            change++;
        }
    }
    if(change > 0){
        return true;
    }else{
        return false;
    }
}

// checks if theres any '0' in the boxes
function checkIfEmpty(){
    let zeroCounter = 0;
    for(box of boxes){
        if(box.textContent === '0'){
            zeroCounter++;
        }
    }
    //no space to add a random '2' anymore
    if(zeroCounter === 0){
        // game over
        document.querySelector('#statusMessage').textContent = `You Lose! Your score was ${score}!`;
        document.removeEventListener('keyup', ()=>{});
    }
}

function combineRow(direction){
    // get the rows
    for(let i = 0; i < boxes.length; i++){
        if(i % 4 === 0){

            // Get the box values of each row
            const firstElement = parseInt(boxes[i].textContent);
            const secondElement = parseInt(boxes[i+1].textContent);
            const thirdElement = parseInt(boxes[i+2].textContent);
            const fourthElement = parseInt(boxes[i+3].textContent);

            let row = [firstElement, secondElement, thirdElement,fourthElement];

            // filter through to get only the nonzero items
            let filteredRow = row.filter(item => item > 0);
            
            if(direction === 'right'){
                // process the filteredrow for two similar values and start from the right
                for(let j = filteredRow.length - 1; j > 0; j--){
                    if(filteredRow[j] === filteredRow[j-1]){

                        filteredRow[j] += filteredRow[j-1];
                        filteredRow[j-1] = 0;

                        // On combination add the new tile's values to the score
                        score += filteredRow[j];

                    }else if(filteredRow[j] === 0){

                        filteredRow[j] = filteredRow[j-1];
                        filteredRow[j-1] = 0

                    }
                }
                //create a row of missing 0's according to the filtered row length
                let missingZeros = Array(4 - filteredRow.length).fill(0);

                // create a new row with the zeros added according to direction
                filteredRow = missingZeros.concat(filteredRow);
            } else{

                // left key pressed

                // process the filteredrow for two similar values and start from the left
                for(let j = 0; j < filteredRow.length - 1; j++){
                    if(filteredRow[j] === filteredRow[j+1]){

                        filteredRow[j] += filteredRow[j+1];
                        filteredRow[j+1] = 0;

                        // On combination add the new tile's values to the score
                        score += filteredRow[j];

                    }else if(filteredRow[j] === 0){
                        filteredRow[j] = filteredRow[j+1];
                        filteredRow[j+1] = 0
                    }
                }
                //create a row of missing 0's according to the filtered row length
                let missingZeros = Array(4 - filteredRow.length).fill(0);

                // create a new row with the zeros added according to direction
                filteredRow = filteredRow.concat(missingZeros);
            }

            // add the new calculated row back to the grid
            boxes[i].textContent = `${filteredRow[0]}`;
            boxes[i+1].textContent = `${filteredRow[1]}`;
            boxes[i+2].textContent = `${filteredRow[2]}`;
            boxes[i+3].textContent = `${filteredRow[3]}`;
        }
    }
}

function combineColumn(direction){
    for(let i = 0; i < 4; i++){

        const firstElement = parseInt(boxes[i].textContent);
        const secondElement = parseInt(boxes[i+4].textContent);
        const thirdElement = parseInt(boxes[i+8].textContent);
        const fourthElement = parseInt(boxes[i+12].textContent);

        let column = [firstElement, secondElement, thirdElement,fourthElement];

        // filter through to get only the nonzero items
        let filteredColumn = column.filter(item => item > 0);

            
        if(direction === 'up'){
            // process the filteredColumn for two similar values and start from the left
            for(let j = 0; j < filteredColumn.length - 1; j++){
                if(filteredColumn[j] === filteredColumn[j+1]){

                    filteredColumn[j] += filteredColumn[j+1];
                    filteredColumn[j+1] = 0;

                    // On combination add the new tile's values to the score
                    score += filteredColumn[j];

                }else if(filteredColumn[j] === 0){

                    filteredColumn[j] = filteredColumn[j+1];
                    filteredColumn[j+1] = 0

                }
            }

            //create a row of missing 0's according to the filtered column length
            let missingZeros = Array(4 - filteredColumn.length).fill(0);

            // create a new column with the zeros added according to direction
            filteredColumn = filteredColumn.concat(missingZeros);


        } else{
            // down key pressed
            // process the filteredColumn for two similar values and start from the right
            for(let j = filteredColumn.length - 1; j > 0; j--){
                if(filteredColumn[j] === filteredColumn[j-1]){

                    filteredColumn[j] += filteredColumn[j-1];
                    filteredColumn[j-1] = 0;

                    // On combination add the new tile's values to the score
                    score += filteredColumn[j];
                    
                }else if(filteredColumn[j] === 0){

                    filteredColumn[j] = filteredColumn[j-1];
                    filteredColumn[j-1] = 0

                }
            }
            //create a column of missing 0's according to the filtered row length
            let missingZeros = Array(4 - filteredColumn.length).fill(0);

            // create a new column with the zeros added according to direction
            filteredColumn = missingZeros.concat(filteredColumn);
        }

        // add the new calculated row back to the grid
        boxes[i].textContent = `${filteredColumn[0]}`;
        boxes[i+4].textContent = `${filteredColumn[1]}`;
        boxes[i+8].textContent = `${filteredColumn[2]}`;
        boxes[i+12].textContent = `${filteredColumn[3]}`;
    }
}

// function to update score on the UI
function updateScore(){
    document.querySelector("#playerScore").textContent = `${score}`;
}

function checkForWin(){
    for(box of boxes){
        if(box.textContent === '2048'){
            document.querySelector('#statusMessage').textContent = "You Win!";
            document.removeEventListener('keyup', ()=>{});
        }
    }
}

// Adds color according to the value in the box
function beautifyBoxes(){
    for(box of boxes){
        box.classList.remove('flash','box2','box4','box8', 'box16', 'box32','box64','box128','box256','box512','box1024','box2048');
        switch(box.textContent){
            case '2':
                box.classList.add('box2');
                break;
            case '4':
                box.classList.add('box4');
                break;
            case '8':
                box.classList.add('box8');
                break;
            case '16':
                box.classList.add('box16');
                break;
            case '32':
                box.classList.add('box32');
                break;
            case '64':
                box.classList.add('box64');
                break;
            case '128':
                box.classList.add('box128');
                break;
            case '256':
                box.classList.add('box256');
                break;
            case '512':
                box.classList.add('box512');
                break;
            case '1024':
                box.classList.add('box1024');
                break;
            case '2056':
                box.classList.add('box2056');
                break;
        }
    }
}