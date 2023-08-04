#include<stdio.h>

int t;
int main() {
    for ( scanf("%d", &t); t-- ; ) {
        int n, m, x, p = 0, q = 0;
        scanf("%d%d", &n, &m);
        while (n--) {
            scanf("%d", &x);
            p = x > p ? x : p;
        }
        while (m--){
            scanf("%d", &x);
            q = x > q ? x : q;
        }
        puts(p < q ? "B" : "S");
    }
    return 0;
}