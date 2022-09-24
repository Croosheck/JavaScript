package com.company;
import java.util.Scanner;
public class nowe3 {

    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.println("Podaj swoje imię");
        String a = input.nextLine();

        System.out.println("Podaj swoje nazwisko");
        String b = input.nextLine();

        String nazwa = imieNazwisko(a, b);
        System.out.format("Nazywasz się: %s", nazwa);

    }
    public static String imieNazwisko(String a, String b){

        return a + " " + b;
    }
}