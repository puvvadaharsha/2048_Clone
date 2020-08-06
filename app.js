

document.addEventListener('DOMContentLoaded', ()=>{

    //create a new game object to start game
    let game = new Game();
    
    //start empty grid and place two tiles
    game.initializeGrid();
    game.addRandom();
    game.addRandom();

    // create new swipe object to start detecting touch gestures
    let swiper = new Swipe(game);

    // create new object to listen for key press
    let keyPresser = new Keys(game);
})
