# 본인이 선택한 언어로 풀이해주세요.
# https://www.acmicpc.net/problem/2293
import sys
input = sys.stdin.readline

coin_type_num, target_sum = map(int,input().split())
coin_types = []
for _ in range(coin_type_num):
    coin_types.append(int(input()))

dp = [0] * (target_sum + 1)
dp[0] = 1
for coin in coin_types:
    for value in range(1, target_sum + 1):
        if(value - coin >= 0):
            dp[value] += dp[value - coin]

print(dp[target_sum])