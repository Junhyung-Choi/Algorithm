// https://www.acmicpc.net/problem/15723

#include <stdio.h>

char floydWarshall(int arr[][26]){
    for(int k = 0; k < 26; k++){
        for(int i = 0; i < 26; i++){
            for(int j = 0; j < 26; j++){
                if(arr[i][k] == 1 && arr[k][j] == 1){
                    arr[i][j] = 1;
                }
            }
        }
    }
}

int main(){
    int N = 0;
    int M = 0;
    scanf("%d", &N);

    int arr[26][26] = {0,};
    for(int i =0; i < N; i++){
        char a, b;
        scanf(" %c is %c", &a, &b);
        arr[a-'a'][b-'a'] = 1;
    }

    floydWarshall(arr);
    scanf("%d", &M);
    for(int i = 0; i < M; i++){
        char a, b;
        scanf(" %c is %c", &a, &b);
        if(arr[a-'a'][b-'a'] == 1){
            printf("T\n");
        }else{
            printf("F\n");
        }
    }
}




