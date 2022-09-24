package com.company;

public class tablice {
    public static void main (String[] args){

        int[] arr = new int[200];
        int i = 0;

        for(i = 0 ; i <= 199 ; i++) {
            if (i % 2 == 0) {
                continue;
            }
            arr[(i/2)] = i;
        }

        for(i = 0 ; i <= 99 ; i++) {
            System.out.println(arr[i]);
        }
    }
}