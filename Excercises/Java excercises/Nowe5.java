package com.company;
import java.util.Scanner;
public class Nowe5 {
    public static void main(String[] args){
        Scanner skanowanko = new Scanner(System.in);
        int a, b;
        System.out.format("Dawaj numerek: ");
        a = Integer.parseInt(skanowanko.nextLine());

        System.out.format("No to tera drugi: ");
        b = Integer.parseInt(skanowanko.nextLine());

        System.out.format("Podaj d: ");
        int d = Integer.parseInt(skanowanko.nextLine());

        System.out.format("Podaj e: ");
        int e = Integer.parseInt(skanowanko.nextLine());

        int oblicz = dupsko(d, e);
        int obliczone = oblicz - b;

        if (a < b) {
            System.out.format("Wyniczek: %d", oblicz);
        } else {
            System.out.format("No i gra: %d", obliczone);
        }
    }
    public static int dupsko(int d, int e){
        return d*e;
    }
}