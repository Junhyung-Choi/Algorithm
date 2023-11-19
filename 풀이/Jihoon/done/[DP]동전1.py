# 본인이 선택한 언어로 풀이해주세요.
# https://www.acmicpc.net/problem/2293
n,k = map(int, input().split())
coins = []
for i in range(n):
    coins.append(int(input()))

coins.sort() # 오름차순 정렬

dp = [0 for i in range(k+1)]
dp[0] = 1   # 동전을 1개만 쓴 경우

for coin in coins:
    for j in range(coin, k+1):
        if j-coin >= 0:
            dp[j] = dp[j] + dp[j-coin]
            print(dp)
    print("\n")

print(dp[k])