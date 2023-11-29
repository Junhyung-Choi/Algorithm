# 본인이 선택한 언어로 풀이해주세요.
# https://www.acmicpc.net/problem/2166 백준 - 다각형의 면적

import sys
input = sys.stdin.readline

dot_num = int(input())
dots = []
for _ in range(dot_num):
    dots.append(tuple(map(int,input().split())))

def get_tri_area(a,b,c):
    res =    a[0] * b[1] + b[0] * c[1] + c[0] * a[1]
    res += -(a[1] * b[0] + b[1] * c[0] + c[1] * a[0])

    return res/2

result = 0
for index, dot in enumerate(dots,0):
    if(index == 0) : continue
    result += get_tri_area(dots[0], dots[index-1], dots[index])
result = abs(result)

print("%.1f"%result)
