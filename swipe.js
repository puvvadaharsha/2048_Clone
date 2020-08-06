// Handles all Swipe Inputs
class Swipe{
    constructor(game){

        this.game = game;

        //store X and Y coordinates
        this.x = null;
        this.y = null;

        //listen for when touch begins and ends
        document.addEventListener('touchstart', (e) => {this.handleTouchStart(e)});
        document.addEventListener('touchend', (e) => {this.handleTouchEnded(e)});
    }

    // log start position
    handleTouchStart(e){
        this.x = e.touches[0].clientX;
        this.y = e.touches[0].clientY;
    }
    
    //get end position and compare it with start position
    handleTouchEnded(e){
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;

        //compare the differences
        const diffX = this.x - endX;
        const diffY = this.y - endY;

        let oldBoxArray = this.game.makeCopy();

        // choose whichever has the highest difference
        if(Math.abs(diffX) > Math.abs(diffY)){
            if(diffX > 0){
                this.game.combineRow('left');
            }else{
                this.game.combineRow('right');
            }
        } else{
            if(diffY > 0){
                this.game.combineColumn('up');
            }else{
                this.game.combineColumn('down')
            }
        }
        this.X = null;
        this.Y = null;

        this.game.updateScore();
        this.game.beautifyBoxes();
        this.game.checkForWin();

        // Only add new box is games hasnt ended and boxes have moved
        if(!this.game.ifEmpty() && this.game.checkIfBoxesChanged(oldBoxArray)){
            this.game.addRandom();
        }
    }
}