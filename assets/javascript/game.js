//4 buttons, 1 for each crystal
//create random number for target score between 19-120
//create random number for each crystal 1-12
//create variable to track user score
//possible states: news, ingame, game_over_win, game_over_loss
//create variable for wins, losses
//create variable for gamestate

var crystal_collector_game = {
    target_score: 0, 
    current_score: 0,
    wins: 0,
    losses: 0,
    crystal_values: [0,0,0,0],
    game_state: "new",  
    init_game: function() {
        this.wins = 0;
        this.losses = 0;
        this.reset_game();
        //setup the click handlers for the crystal buttons

    },
    update_ui: function() {
        $("span#target_score").text(this.target_score);
        $("div#current_score_value").text(this.current_score);
        $("span#total_wins").text(this.wins);
        $("span#total_losses").text(this.losses);
        var game_state_indicator = $("div#game_state_indicator");
        switch(this.game_state) {
            case "new":
                game_state_indicator.text("Click a crystal to begin.");
                break;
            case "ingame":
                game_state_indicator.text("Click a crystal to continue.");
                break;
              
            case "game_over_win":
                game_state_indicator.text("You Won! New Game has started.");
                $("span#total_wins").text = this.wins;          
                break;

            case "game_over_loss":
                game_state_indicator.text("You lost! New Game has started.");
                break;

            default:
            this.game_state = "new";

        }
    },
    reset_game: function() {
        this.target_score = Math.floor(Math.random() *120) + 19;
        this.current_score = 0;
        for (var x=0; x < this.crystal_values.length(); x++) {
            this.crystal_values[x] = Math.floor(Math.random() *12) +1;
        }
        this.game_state = "new";
    },
    handle_crystal_button(crystal_number) {

    }
}
