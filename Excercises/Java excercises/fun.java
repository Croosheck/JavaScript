package com.company;

import java.util.Scanner;

public class fun {
    public static void main(String[] args){
        Scanner skaner = new Scanner(System.in);

        System.out.println();
        System.out.println("Podaj kolejno liczby, aby obliczyć ich 77% wartości. Wpisz \"stop\" aby przerwać");
        System.out.println();

            for (int i = 1; i <= 10; i++) {
                System.out.print("Podaj" + " " + i + "." + " " + "liczbę: ");
                String j = skaner.nextLine();
                if (j.equals("stop")) {
                    break;
                }

                int k = Integer.parseInt(j);
                System.out.println("77% Twojej liczby wynosi: " + k*0.77);
                System.out.println();
            }
    }
}