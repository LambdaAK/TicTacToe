package tictactoe;

import javax.swing.UIManager;
import java.awt.Color;

public class EntryPoint {
    public static void main(String[] args) {
		UIManager.put("OptionPane.messageForeground", Color.GREEN);
		UIManager.put("Panel.background", Color.decode("222222"));
        UIManager.put("OptionPane.background", Color.decode("222222"));
        UIManager.put("Button.background", Color.GREEN);
        TicTacToeMenu menu = new TicTacToeMenu();
        menu.play();
        
    }
}