package tictactoe;

import javax.swing.JOptionPane;

public class TicTacToeMenu {
 
    public void play() {
        Object[] options1 = {"Single Player", "Two Player", "Quit"};
        Object[] options2 = {"Easy", "Medium", "Hard", "Impossible", "Menu"};

        while (true) {
            int choice = JOptionPane.showOptionDialog(null, "Tic Tac Toe\n\n"
                    + "Select Gamemode", "Tic Tac Toe",
                    JOptionPane.DEFAULT_OPTION, JOptionPane.PLAIN_MESSAGE,
                    null, options1, options1[0]);
                    
            if (choice == 0) {
                int difficulty = JOptionPane.showOptionDialog(null, "Tic Tac Toe\n\n"
                    + "Select Difficulty", "Tic Tac Toe",
                    JOptionPane.DEFAULT_OPTION, JOptionPane.PLAIN_MESSAGE,
                    null, options2, options2[0]);
                
                if (difficulty != 4) {
                    TicTacToeGameSinglePlayer game = new TicTacToeGameSinglePlayer(difficulty);
                    game.play();
                }
            } 

            else if (choice == 1) {
                TicTacToeGameTwoPlayer game = new TicTacToeGameTwoPlayer();
                game.play();
            } 

            else return;  
        }
        

        
    }
    
    
}
