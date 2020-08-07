class Game{
    constructor(){
        // List to store boxes
        this.boxes = [];

        //store the score
        this.score = 0;
    }

    // initializes 4x4 grid
    initializeGrid(){
        const grid = document.querySelector(".grid");
        grid.innerHTML = '';
        for(let i = 0; i < 16; i++){

            // create new div with class of box and value of 0
            let box = document.createElement('div');
            box.classList.add('box');
            box.textContent = '0';

            // store the box in list
            this.boxes.push(box);

            // add the box to the grid
            grid.appendChild(box);
        }
    }

    // adds random box of value 2
    addRandom(){
        // pick random number between 0 and 15
        let random = Math.floor(Math.random() * 16);

        //Add 2 only if box value is 0
        if(this.boxes[random].textContent === "0"){
            this.boxes[random].textContent = "2";
            this.boxes[random].classList.add("flash");
            //highlight the new block added
            setTimeout(() => {
                this.boxes[random].classList.remove("flash");
                this.boxes[random].classList.add("box2");
            }, 200);
        } else{this.addRandom();}
    }

    // checks if theres any '0' in the boxes
    ifEmpty(){
        let zeroCounter = 0;
        for(let box of this.boxes){
            if(box.textContent === '0'){
                zeroCounter++;
            }
        }
        //no space to add a random '2' anymore
        if(zeroCounter === 0){
            // game over
            document.querySelector('#statusMessage').textContent = `You Lose! Your score was ${document.querySelector('#playerScore').textContent}!`;
            this.endGame();
            return true;
        }else{
            return false;
        }
    }
    checkForWin(){
        for(let box of this.boxes){
            if(box.textContent === '2048'){
                document.querySelector('#statusMessage').textContent = `You Win! Your Score was ${document.querySelector('#playerScore').textContent}!`;
                this.endGame();
            }
        }
    }

    endGame(){
        const grid = document.querySelector(".grid");
        if(document.querySelector('#playAgainButton') == null){

            let htmlString = "<div id='overlay'><button id='playAgainButton'>Play Again?</button></div>";

            grid.innerHTML += htmlString;

            document.querySelector('#playAgainButton').addEventListener('click',()=>{
                location.reload();
            });
        }
    }

    combineRow(direction){
        // get the rows
        for(let i = 0; i < this.boxes.length; i++){
            if(i % 4 === 0){
    
                // Get the box values of each row
                const firstElement = parseInt(this.boxes[i].textContent);
                const secondElement = parseInt(this.boxes[i+1].textContent);
                const thirdElement = parseInt(this.boxes[i+2].textContent);
                const fourthElement = parseInt(this.boxes[i+3].textContent);
    
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
                            this.score += filteredRow[j];
    
                            // filter out the middle zero's again
                            filteredRow = filteredRow.filter(item => item > 0);
    
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
                            this.score += filteredRow[j];
    
                            // filter out the zero's again
                            filteredRow = filteredRow.filter(item => item > 0);
    
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
                this.boxes[i].textContent = `${filteredRow[0]}`;
                this.boxes[i+1].textContent = `${filteredRow[1]}`;
                this.boxes[i+2].textContent = `${filteredRow[2]}`;
                this.boxes[i+3].textContent = `${filteredRow[3]}`;
            }
        }
    }

    combineColumn(direction){
        for(let i = 0; i < 4; i++){
    
            const firstElement = parseInt(this.boxes[i].textContent);
            const secondElement = parseInt(this.boxes[i+4].textContent);
            const thirdElement = parseInt(this.boxes[i+8].textContent);
            const fourthElement = parseInt(this.boxes[i+12].textContent);
    
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
                        this.score += filteredColumn[j];
    
                        // filter out the zero's again
                        filteredColumn = filteredColumn.filter(item => item > 0);
    
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
                        this.score += filteredColumn[j];
    
    
                        // filter out the zero's again
                        filteredColumn = filteredColumn.filter(item => item > 0);
    
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
            this.boxes[i].textContent = `${filteredColumn[0]}`;
            this.boxes[i+4].textContent = `${filteredColumn[1]}`;
            this.boxes[i+8].textContent = `${filteredColumn[2]}`;
            this.boxes[i+12].textContent = `${filteredColumn[3]}`;
        }
    }

    // function to update score on the UI
    updateScore(){
        if(document.querySelector('#playAgainButton') == null){
            document.querySelector("#playerScore").textContent = `${this.score}`;
        }
    }

    // Adds color according to the value in the box
    beautifyBoxes(){
        for(let box of this.boxes){
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

    // create an integer list of the old array
    makeCopy(){
        let copy = [];
        for(let box of this.boxes){
            copy.push(parseInt(box.textContent));
        }
        return copy;
    }

    // checks if the boxes array changed
    checkIfBoxesChanged(oldBoxArray){
        let change = 0;
        for(let i = 0; i < oldBoxArray.length; i++){
            if(oldBoxArray[i] !== parseInt(this.boxes[i].textContent)){
                change++;
            }
        }
        return (change > 0) ? true :  false;
    }
}