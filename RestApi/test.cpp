#include <stdio.h>
void test()
{
    int a = -1, b = -a;
    int x = (a > 0) && (b < 0) || (a < 0) && (b > 0);
    int y = (a >= 0) || (b <= 0) && (a >= 0) || (b <= 0);
    printf("%d", x == y);
}

int main (void)
{
    test();
}

for(i = n/2; i <=n ;++i)
{
    for (j = 2; j <= n; j = j*2)
    {
        
    }
}