/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package tictactoe;
import javax.swing.JOptionPane;



/*
Important notes

The y valule is first in the array, then the x.

board[0][1] is actually the coordinate (0, 1)




0
x??
???
???

1
xx?
???
???


2
xxx
???
???


*/



/**
 *
 * @author Kozik.A052
 */
public class TicTacToeGameTwoPlayer {
   
    protected String[][] board = {{"?", "?", "?"}, {"?", "?", "?"}, {"?", "?", "?"}};
    protected JOptionPane pane;
    protected int turn;
    protected int move;
    protected boolean playerOneWin;
    protected boolean playerTwoWin;
    protected boolean finished;
   
   
    public TicTacToeGameTwoPlayer() {
        turn = 0;
        pane = new JOptionPane();
        playerOneWin = false;
        playerTwoWin = false;
        finished = false;
    }
   
    public void play() {
        while (true) { // game loop
            getMove();
            update();
            if (turn >= 4) checkWin(); // only start checking after turn 3 (represented by int turn = 2)
            turn++;
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
   
   
    public void checkWin() {
        /*
        If at anypoint a win is found, the method returns and
        finished, playerOneWin,
        and playerTwo win are set accordingly.
       
        Steps:
        check horizontal layers
        check vertical layers
        check diagonals
        check if the board is full - tie
       
        */
       

        // check each horizontal layer
        for (int i = 0; i <= 2; i++) {
            if (isWinningCombo(board[i][0], board[i][1], board[i][2])) {
            finished = true;
            if (turn % 2 == 0) playerOneWin = true;
            else playerTwoWin = true;
            return;
            }
           
        }
        // check each vertical layer
        for (int i = 0; i <= 2; i++) {
            if (isWinningCombo(board[0][i], board[1][i], board[2][i])) {
            finished = true;
            if (turn % 2 == 0) playerOneWin = true;
            else playerTwoWin = true;
            return;
            }
           
        }
       
        // check the diagonals
        if (isWinningCombo(board[0][0], board[1][1], board[2][2])) {
            finished = true;
            if (turn % 2 == 0) playerOneWin = true;
            else playerTwoWin = true;
            return;
        }
       
        if (isWinningCombo(board[2][0], board[1][1], board[0][2])) {
            finished = true;
            if (turn % 2 == 0) playerOneWin = true;
            else playerTwoWin = true;
            return;
        }  
       
        /*
        check is the board is full. If it is, the game is finished
        and there's a tie
       
        set finished to true then change it back to
            false if there is an empty spot
        */
        finished = true;
        for (String[] col: board) {
            for (String slot: col) {
                if (slot.equals("?")) {
                    finished = false;
                    return;
                }
            }
        }
       
    }
   
    protected void update() {
        // adds the player's move to board
        int row = move / 3;
        int col = move % 3;
       
        String player;
        if (turn % 2 == 0) player = "X";
        else player = "O";
        // DEBUG: switched row and col
        board[row][col] = player;
    }
   
    protected String stringBoard() {
        String boardStr = "   1 2 3\n";
        for (int i = 0; i < board.length; i++) {
            boardStr += i + 1 + " ";
            for (int j = 0; j < board.length; j++) {
                boardStr += board[i][j] + " ";
            }
            boardStr += "\n";
        }

        return boardStr;
    }
   
    protected boolean isValidMove(int move) {
        int row = move % 3;
        int col = move / 3;
       
        if (!board[col][row].equals("X") && !board[col][row].equals("O")) return true;
        else return false;
    }
   
    private void getMove() {
       
        Object[] pos = {"1, 1", "1, 2", "1, 3", "2, 1", "2, 2", "2, 3", "3, 1", "3, 2", "3, 3"};
       
       while (true) {
           String prompt = "\n\nEnter your move";
           if (turn % 2 == 0) prompt += ", Player 1 (X)";
           else prompt += ", Player 2 (O)";
           
        move = JOptionPane.showOptionDialog(null, stringBoard() + prompt, "Tic-Tac-Toe Java",
                JOptionPane.DEFAULT_OPTION, JOptionPane.PLAIN_MESSAGE, null, pos, null);  
       
        if (isValidMove(move)) break; // if the move is valid, we can continue
        else JOptionPane.showMessageDialog(null, "Location is already taken!", "Invalid Move", JOptionPane.ERROR_MESSAGE);
       }
       
    }
   
    protected boolean isWinningCombo(String slot1, String slot2, String slot3) {
        // checks if three slots are all X or all O. returns the result
        if (slot1.equals("?"))
            return false;
        else
            return (slot1.equals(slot2) && slot2.equals(slot3));
    }
}