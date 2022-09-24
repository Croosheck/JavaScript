package com.company;
import java.util.Random;
import java.util.Scanner;

public class GraLosowanieLiczby {
    public static void main(String[] args){
        Scanner skaner = new Scanner (System.in);
        Random rnd = new Random();

        int i = 0;
        int rndNumber;
        int userNumber;
        rndNumber = rnd.nextInt(10) + 1;
            System.out.print("Podaj liczbę od 1 do 10: ");
        do {
            i++;
            userNumber = Integer.parseInt(skaner.nextLine());
                if (rndNumber == userNumber) {
                    System.out.print("Brawo! ");
                } else if (rndNumber > userNumber) {
                    System.out.print("Wylosowana liczba jest większa od Twojej! Spróbuj ponownie: ");
                } else if (rndNumber < userNumber) {
                    System.out.print("Wylosowana liczba jest mniejsza od Twojej! Spróbuj ponownie: ");
                }

            }
        while (rndNumber != userNumber);
        System.out.format("Odgadłeś za %d razem!", i);
    }
}