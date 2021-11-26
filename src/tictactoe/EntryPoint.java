package tictactoe;

import javax.swing.UIManager;
import java.awt.Color;

public class EntryPoint {
    public static void main(String[] args) {
		UIManager.put("OptionPane.messageForeground", Color.decode("3229"));
		UIManager.put("Panel.background", Color.LIGHT_GRAY);
        UIManager.put("OptionPane.background", Color.LIGHT_GRAY);
        UIManager.put("Button.background", Color.LIGHT_GRAY);
        TicTacToeMenu menu = new TicTacToeMenu();
        menu.play();
        
    }
}