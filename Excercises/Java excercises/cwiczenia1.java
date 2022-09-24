package com.company;

import java.util.Random;
import java.util.Scanner;

public class cwiczenia1 {
    public static void main(String[] args) {
    Random dupa = new Random();
    int randomnumber = dupa.nextInt(10) + 1;
    Scanner skaner = new Scanner(System.in);
    int i = 0;
    int usernumber;

        System.out.println("Podaj liczbę");
        do {
            i++;
            usernumber = skaner.nextInt();
            if(usernumber < randomnumber) {
                System.out.println("Twoja liczba jest za mała!");
            } else if (usernumber > randomnumber){
                    System.out.println("Twoja liczba jest za duża");
                }
            }
         while (usernumber != randomnumber);
        System.out.format("Brawo! Odgadłeś za %d razem", i);
    }
}