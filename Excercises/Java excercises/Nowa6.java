package com.company;
import java.util.Scanner;
public class Nowa6 {

    public static void main(String[] args) {
    /*
    int age = 19;
    String result = age >= 18 ? "Pełnoletni" : "Niepełnoletni";
        System.out.println(result);

     */

      /*  int day;

        Scanner skaner = new Scanner(System.in);

        System.out.println("Podaj numer dnia tygodnia");
        day = Integer.parseInt(skaner.nextLine());


        switch (day) {
            case 1:
                System.out.println("Poniedziałek");
                break;
            case 2:
                System.out.println("Wtorek");
                break;
            case 3:
                System.out.println("Środa");
                break;
        }
       */
        /*
        for (int i = 1 ; i <= 10 ; i++){
            for(int j = 1 ; j<=10 ; j++){
                System.out.println(Integer.toString(i) + "*" + Integer.toString(j) + "=" + (i*j));
            }
        }
         */ /* tabliczka mnożenia */

        int i = 0;
        while(true){
            i++;
            if (i % 2 == 0){
                continue;
            }
            System.out.println(i);
            if(i >= 19){
                break;
            }
        }
    }
}
