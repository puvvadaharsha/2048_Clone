// Handles all key inputs
class Keys{
    constructor(game){

        this.game = game;
        //listen for keyPresses
        document.addEventListener('keyup', (e) =>{this.processKeyPress(e)});
    }
    // process key press
    processKeyPress(e){
        
        let code = e.keyCode;
        let oldBoxArray = this.game.makeCopy();
    
        if([37,38,39,40,65,68,83,87].includes(code)){
            switch (code){
                case 38:
                case 87:
                    this.game.combineColumn('up');
                    break;
                case 39:
                case 68:
                    this.game.combineRow('right');
                    break;
                case 40:
                case 83:
                    this.game.combineColumn('down');
                    break;
                case 37:
                case 65:
                    this.game.combineRow('left');
                    break;
            }
            this.game.updateScore();
            this.game.beautifyBoxes();
            this.game.checkForWin();

            // Only add new box is games hasnt ended and boxes have moved
            if(!this.game.ifEmpty() && this.game.checkIfBoxesChanged(oldBoxArray)){
                this.game.addRandom();
            }
        }
    }
}