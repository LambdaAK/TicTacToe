#include <stdio.h>
#include <windows.h>

int main(void) {
    system("cls");
    printf("%s", "[Compiling Project]\n");
    system("tsc --outdir out");
    printf("%s", "[Executing index.js]\n");
    system("node out/index.js");

    return 0;
}