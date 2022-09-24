package com.company;
import java.util.Scanner;
public class Main {

    public static void main(String[] args) {
        /*
        char zmChar;
        String zmString = "dup2ko";
        zmChar = zmString.charAt(3);
        System.out.format("Dupsko ma %s dziur(y)", zmChar);
        */

        Scanner scanner = new Scanner(System.in);
        int age;

        System.out.println("Jak masz na imię?");
        String name = scanner.nextLine();

        System.out.println("Jak masz na nazwisko?");
        String surname = scanner.nextLine();

        System.out.println("Ile masz lat?");
        age = Integer.parseInt(scanner.nextLine());
        if(age < 18) {
            System.out.println("To nie impreza dla Ciebie!");
        } else {
            System.out.format("Witaj %s %s", name, surname);
        }
    }
}