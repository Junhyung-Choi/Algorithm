# 본인이 선택한 언어로 풀이해주세요.
# https://www.acmicpc.net/problem/2293
n,k = map(int, input().split())
coin = []
for i in range(n):
    coin.append(int(input()))

coin.sort() # 오름차순 정렬

dp = [0 for i in range(k+1)]
dp[0] = 1   # 동전을 1개만 쓴 경우

for i in coin:
    for j in range(i, k+1):
        if j-i >= 0:
            dp[j] = dp[j] + dp[j-i]

print(dp[k])