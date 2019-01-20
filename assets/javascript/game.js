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
    previous_target_score: 0,
    previous_score: 0,   
    init_game: function() {
        this.wins = 0;
        this.losses = 0;
        this.reset_game();
       
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
                var previous_target = this.previous_target;
                var previous_score = this.previous_score;
                game_state_indicator.text("You lost! Your target was " + previous_target + "but you scored " + previous_score + ". New Game has started.");
                break;
            default:
            this.game_state = "new";
            game_state_indicator.text("Click a crystal to begin.")

        }
    },
    reset_game: function() {
        this.target_score = Math.floor(Math.random() *120) + 19;
        this.current_score = 0;
        for (var x=0; x < this.crystal_values.length; x++) {
            this.crystal_values[x] = Math.floor(Math.random() *12) +1;
        }
        this.game_state = "new";
    },
    handle_crystal_button(crystal_number) {
        console.log("Clicked crystal number " + crystal_number);
        this.current_score += this.crystal_values[crystal_number -1];
        if(this.current_score > this.target_score) {
            //game over - LOSS
            this.game_state = "game_over_loss";
            this.losses++;
            this.previous_score = this.current_score;
            this.previous_target_score = this.target_score;
            this.reset_game();
        }
        if(this.current_score == this.target_score) {
            //game over - WIN
            this.game_state = "game_over_win";
            this.wins++;
            this.previous_score = this.current_score;
            this.previous_target_score = this.target_score;
            this.reset_game();
        }    
        if(this.current_score < this.target_score) {
            this.game_state = "ingame"
        }
        this.update_ui();

    }
}

$(document).ready(function() {
    crystal_collector_game.init_game();
    $("span#button_1").click(function() {
        crystal_collector_game.handle_crystal_button(1);
    });
    $("span#button_2").click(function() {
        crystal_collector_game.handle_crystal_button(2);
    });
    $("span#button_3").click(function() {
        crystal_collector_game.handle_crystal_button(3);
    });
    $("span#button_4").click(function() {
        crystal_collector_game.handle_crystal_button(4);
    });
});
