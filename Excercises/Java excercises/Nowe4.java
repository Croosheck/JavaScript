package com.company;
import java.util.Scanner;
public class Nowe4 {
    public static void main(String[] args){
        Scanner input = new Scanner(System.in);

        System.out.println("Wprowadz nazwe dla swojego prostokąta:");
        String nazwa = input.nextLine();

        System.out.println("Podaj jego wysokosc:");
        int a = Integer.parseInt(input.nextLine());

        System.out.println("Podaj jego szerokosc:");
        int b = Integer.parseInt(input.nextLine());

        int pole = obliczPole(a, b);
        System.out.format("Pole Twojego prostokata %s wynosi: %d", nazwa, pole);
    }
    public static int obliczPole(int a, int b){

        return a*b;
    }
}