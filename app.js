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
        boxes[random].style.background = 'white';
        //highlight the new block added
        setTimeout(() => {
            boxes[random].style.background = '';
        }, 300);
    } else{addRandom();}
}

// process key press
function processKeyPress(e){
    // check if theres any empty slots left
    if(checkIfEmpty()){
        let code = e.keyCode;
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
        addRandom();
    } else{
        // Play Again?
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
        document.querySelector('#statusMessage').textContent = "You Lose!";
        document.removeEventListener('keyup',(e) => {processKeyPress(e)})
        return false;
    } else{
        return true;
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

                //create a row of missing 0's according to the filtered row length
                let missingZeros = Array(4 - filteredRow.length).fill(0);

                // create a new row with the zeros added according to direction
                filteredRow = missingZeros.concat(filteredRow);


            } else{

                // left key pressed
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

            //create a row of missing 0's according to the filtered row length
            let missingZeros = Array(4 - filteredColumn.length).fill(0);

            // create a new row with the zeros added according to direction
            filteredColumn = filteredColumn.concat(missingZeros);


        } else{

            // left key pressed
            //create a row of missing 0's according to the filtered row length
            let missingZeros = Array(4 - filteredColumn.length).fill(0);

            // create a new row with the zeros added according to direction
            filteredColumn = missingZeros.concat(filteredColumn);
        }

        // add the new calculated row back to the grid
        boxes[i].textContent = `${filteredColumn[0]}`;
        boxes[i+4].textContent = `${filteredColumn[1]}`;
        boxes[i+8].textContent = `${filteredColumn[2]}`;
        boxes[i+12].textContent = `${filteredColumn[3]}`;
    }
}
