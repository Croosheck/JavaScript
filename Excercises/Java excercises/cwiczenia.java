package com.company;

import java.util.Scanner;

public class cwiczenia {
    public static int dodawanie (int a, int b){
        return a + b;

    }
    public static void main(String[] args) {
        Scanner skaner = new Scanner(System.in);

        System.out.println("Podaj pierwszą liczbę: ");
        int x = Integer.parseInt(skaner.nextLine());

        System.out.println("Podaj drugą liczbę: ");
        int y = Integer.parseInt(skaner.nextLine());

        System.out.println("Wynik to: " + dodawanie(x, y));
    }
}
