package tictactoe;

import javax.swing.JOptionPane;

public class CPU {
    private int move;
    private int difficulty;
    TicTacToeGameSinglePlayer game;

    public CPU(TicTacToeGameSinglePlayer game, int difficulty) {
        this.game = game;
        this.difficulty = difficulty;
    }

    public int getMove() {
        getCPUMove();
        return move;
    }

    
    // repeat until a move is found
    private void getRandomCPUMove() {
        // generate a random valid move
        // set this.move equal to that move
        while (true) {
            move = (int) (Math.random() * 9);
            if (isValidMove(move)) break;
        }                                            
                      
    }

    private String numberToCoordinates(int number) {
        int col = number / 3 + 1;
        int row = number % 3 + 1;
        return "(" + col + ", " + row + ")";
    }

    private int coordinatesToNumber(int col, int row) {
        // convert the coordinates of a move to a number
        // 0 1 2
        // 3 4 5
        // 6 7 8
        return col* 3 + row;
    }


    private boolean checkPossibleWins(String symbol) {
        // iterate through col
        String[][] board = game.board; // create an alias for more readable code
        for (int i = 0; i <= 2; i++) {
            if (board[i][0].equals(symbol) && board[i][1].equals(symbol)) 
                {
                    if (board[i][2].equals("?")) {
                        move = coordinatesToNumber(i, 2);
                        return true;
                    }
                }
                if (board[i][1].equals(symbol) && board[i][2].equals(symbol)) 
                {
                    if (board[i][0].equals("?")) {
                        move = coordinatesToNumber(i, 0);
                        return true;
                    }
                }
                if (board[i][0].equals(symbol) && board[i][2].equals(symbol)) 
                {
                    if (board[i][1].equals("?")) {
                        move = coordinatesToNumber(i, 1);
                        return true;
                    }
                }
        }
        // iterate through row
        // do the same as the previous for loop
        for (int i = 0; i <= 2; i++) {
            if (board[0][i].equals(symbol) && board[1][i].equals(symbol)) 
                {
                    if (board[2][i].equals("?")) {
                        move = coordinatesToNumber(2, i);
                        return true;
                    }
                }
                if (board[1][i].equals(symbol) && board[2][i].equals(symbol)) 
                {
                    if (board[0][i].equals("?")) {
                        move = coordinatesToNumber(0, i);
                        return true;
                    }
                }
                if (board[0][i].equals(symbol) && board[2][i].equals(symbol)) 
                {
                    if (board[1][i].equals("?")) {
                        move = coordinatesToNumber(1, i);
                        return true;
                    }
                }
        }

        // check diagonals
        if (board[0][0].equals(symbol) && board[1][1].equals(symbol) && board[2][2].equals("?")) {
            move = coordinatesToNumber(2, 2);
            return true;
        }
        if (board[0][0].equals(symbol) && board[1][1].equals("?") && board[2][2].equals(symbol)) {
            move = coordinatesToNumber(1, 1);
            return true;
        }
        if (board[0][0].equals("?") && board[1][1].equals(symbol) && board[2][2].equals(symbol)) {
            move = coordinatesToNumber(0, 0);
            return true;
        }

        if (board[0][2].equals(symbol) && board[1][1].equals(symbol) && board[2][0].equals("?")) {
            move = coordinatesToNumber(2, 0);
            return true;
        }
        if (board[0][2].equals(symbol) && board[1][1].equals("?") && board[2][0].equals(symbol)) {
            move = coordinatesToNumber(1, 1);
            return true;
        }
        if (board[0][2].equals("?") && board[1][1].equals(symbol) && board[2][0].equals(symbol)) {
            move = coordinatesToNumber(0, 2);
            return true;
        }



        return false;
    }

    private boolean checkPossibleAdvancementsTowardWinning() {
        /*
        Search for a line with the following two conditions
        1. There is an "O"
        2. The other two spaces are "?"
        By taking one of these two spaces, the CPU advances closer to a win, forcing the player to block or lose the game

        ** If the line is a diagonal line and the middle space is "O", and the other two spaces are "?", at least one of the 
        available slots will have adjacent edges that are ?. The CPU must take one that has a ? on one of the edges, or else
        a fork can be created by X on the following moves
        */

        String[][] board = game.board; // create an alias for more readable code
        // iterate throught the colums, and check if one of the columns has two "?" and one "O"
        // if it does, set this.move to the number of the "?"
        for (int i = 0; i <= 2; i++) {
            if (board[i][0].equals("?") && board[i][1].equals("O") && board[i][2].equals("?")) {
                move = coordinatesToNumber(i, 0);
                return true;
            }
            if (board[i][0].equals("O") && board[i][1].equals("?") && board[i][2].equals("?")) {
                move = coordinatesToNumber(i, 2);
                return true;
            }
            if (board[i][0].equals("?") && board[i][1].equals("?") && board[i][2].equals("O")) {
                move = coordinatesToNumber(i, 1);
                return true;
            }
        }

        // use the same method to check the rows
        for (int i = 0; i <= 2; i++) {
            if (board[0][i].equals("?") && board[1][i].equals("O") && board[2][i].equals("?")) {
                move = coordinatesToNumber(0, i);
                return true;
            }
            if (board[0][i].equals("O") && board[1][i].equals("?") && board[2][i].equals("?")) {
                move = coordinatesToNumber(2, i);
                return true;
            }
            if (board[0][i].equals("?") && board[1][i].equals("?") && board[2][i].equals("O")) {
                move = coordinatesToNumber(1, i);
                return true;
            }
        }

        // check the first diagonal
        if (board[0][0].equals("?") && board[1][1].equals("O") && board[2][2].equals("?")) {
            move = coordinatesToNumber(0, 0);
            // check if any of the adjacent piece are "?"
            if (board[0][1].equals("?") || board[1][0].equals("?")) 
                move = coordinatesToNumber(0, 0);
            else move = coordinatesToNumber(2, 2);
            return true;
        }
        if (board[0][0].equals("O") && board[1][1].equals("?") && board[2][2].equals("?")) {
            move = coordinatesToNumber(2, 2);
            return true;
        }
        if (board[0][0].equals("?") && board[1][1].equals("?") && board[2][2].equals("O")) {
            move = coordinatesToNumber(1, 1);
            return true;
        }
        //////////////////////////////////////////////////////////////
        // check the second diagonal
        if (board[0][2].equals("?") && board[1][1].equals("O") && board[2][0].equals("?")) {
            move = coordinatesToNumber(0, 2);
            // check if the two edges near 0 2 are "?"
            if (board[0][1].equals("?") || board[1][2].equals("?")) 
                move = coordinatesToNumber(0, 2);
            else move = coordinatesToNumber(2, 0);
            return true;
        }
        if (board[0][2].equals("O") && board[1][1].equals("?") && board[2][0].equals("?")) {
            move = coordinatesToNumber(2, 0);
            return true;
        }
        if (board[0][2].equals("?") && board[1][1].equals("?") && board[2][0].equals("O")) {
            move = coordinatesToNumber(1, 1);
            return true;
        }

        return false;
    }

    private void getCPUMoveEasy() {
        getRandomCPUMove();
    }

    private void getCPUMoveMedium() {
        if (Math.random() < 0.4) getRandomCPUMove();
        else getCPUMoveImpossible();
    }

    private void getCPUMoveHard() {
        if (Math.random() < 0.7) getRandomCPUMove();
        else getCPUMoveImpossible();
    }

    private void getCPUMoveImpossible() {
            /*
            1 (first scenario). If the player's first move is not in the center, take the center This prevents forks.

            1 (second scenario). Check if the CPU can win in the next move, then take that move
            2. Check if the player can win in the next move, then block
            3. Check if the CPU can advance towards a winning move, then take that move
            4. Pick a random move if all conditions fail
            */
            String[][] board = game.board; // create an alias for more readable code

            if (game.getTurn() == 1) {
                if (board[1][1].equals("?")) {
                    move = coordinatesToNumber(1, 1);
                }
            }
                
            else {
            if (!checkPossibleWins("O")) {
                    if (!checkPossibleWins("X")) {
                        if (!checkPossibleAdvancementsTowardWinning()) {
                            getRandomCPUMove();
                        } 
                    }     
                } 
            }

            
    }

    private void getCPUMove() {
        if (difficulty == 0) getCPUMoveEasy();
        else if (difficulty == 1) getCPUMoveMedium();
        else if (difficulty == 2) getCPUMoveHard();
        else getCPUMoveImpossible(); 

        JOptionPane.showMessageDialog(null, this.game.stringBoard() + "\n\n\n\nCPU answers with the move: " + numberToCoordinates(move));
    }

    private boolean isValidMove(int move) {
        int row = move % 3;
        int col = move / 3;
       
        if (!game.board[col][row].equals("X") && !game.board[col][row].equals("O")) return true;
        else return false;
    }

    
}



