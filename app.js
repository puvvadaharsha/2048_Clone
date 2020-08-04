// List to store boxes
let boxes = [];

document.addEventListener('DOMContentLoaded', ()=>{
    initializeGrid();
    addRandom();
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
    } else{addRandom();}
}