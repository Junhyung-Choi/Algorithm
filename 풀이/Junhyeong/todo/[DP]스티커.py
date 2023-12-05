# https://www.acmicpc.net/problem/9465

#BOJ 9465 - 스티커
import sys
input = sys.stdin.readline

T = int(input())
for test_case in range(T):
    datalen = int(input())
    data = []

    data.append([0] + list(map(int,input().split())))
    data.append([0] + list(map(int,input().split())))
    
    for index in range(2,datalen+1):
        data[0][index] = max(data[1][index-1],data[1][index-2]) + data[0][index]
        data[1][index] = max(data[0][index-1],data[0][index-2]) + data[1][index]
    
    print(max(data[0][datalen],data[1][datalen]))