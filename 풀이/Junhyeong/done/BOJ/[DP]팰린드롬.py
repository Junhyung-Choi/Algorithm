# 본인이 선택한 언어로 풀이해주세요.
# https://www.acmicpc.net/problem/10942 백준 - 팰린드롬?
import sys
input = sys.stdin.readline

length = int(input())
numbers = list(map(int, input().split()))
TC = int(input())
dp = [[0]*length for _ in range(length)]

for index in range(length):
    for start in range(length-index):
        end = start + index 
        if start == end : 
            dp[start][end] = 1 
        elif numbers[start] == numbers[end] :
            if start + 1 == end: 
                dp[start][end] = 1 
            elif dp[start+1][end-1] == 1: 
                dp[start][end] = 1 

for _ in range(TC):
    S, E = map(int, sys.stdin.readline().split())
    print(dp[S-1][E-1])