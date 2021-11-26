package tictactoe;
import javax.swing.JOptionPane;

/**
 * @author Kozik.A052
 */
public class TicTacToeGameSinglePlayer extends TicTacToeGameTwoPlayer {
    private CPU cpu;
    private String difficulty;
    

    public TicTacToeGameSinglePlayer(int difficulty) {
        super();
        cpu = new CPU(this, difficulty); // represents the computer

        if (difficulty == 0) this.difficulty = "Easy";  
        else if (difficulty == 1) this.difficulty = "Medium";
        else if (difficulty == 2) this.difficulty = "Hard";
        else if (difficulty == 3) this.difficulty = "Impossible";  
    }
   
    @Override
    public void play() {
        while (true) { // game loop
            getMove();
            update();

            checkWin(); // only start checking after turn 3 (represented by int turn = 2)
            System.out.println("Turn: " + turn);
            turn++;
            if (finished) break;
            ///////////////////////////////////////////
            move = cpu.getMove();
            update();
            checkWin(); // only start checking after turn 3 (represented by int turn = 2)
            turn++;
            System.out.println("Turn: " + turn);
            if (finished) break; 

        }
        displayEndGame();
   
    }

    private void displayEndGame() {
        // displays who won, or die
        if (playerOneWin) JOptionPane.showMessageDialog(null, "Player 1 wins!\n\n" + stringBoard());
        else if (playerTwoWin) JOptionPane.showMessageDialog(null, "Player 2 wins!\n\n" + stringBoard());
        else JOptionPane.showMessageDialog(null, "Tie!\n\n" + stringBoard());
    }

    private void getMove() {
       
        Object[] pos = {"1, 1", "1, 2", "1, 3", "2, 1", "2, 2", "2, 3", "3, 1", "3, 2", "3, 3"};
       
       while (true) {
            String prompt = "\n\nEnter your move";
            move = JOptionPane.showOptionDialog(null, "Difficulty: " + difficulty + "\n\n" + stringBoard() + prompt, "Tic-Tac-Toe Java",
                JOptionPane.DEFAULT_OPTION, JOptionPane.PLAIN_MESSAGE, null, pos, null);  
       
            if (isValidMove(move)) break; // if the move is valid, we can continue
            else JOptionPane.showMessageDialog(null, "Location is already taken!", "Invalid Move", JOptionPane.ERROR_MESSAGE);

       }
       
    }
}