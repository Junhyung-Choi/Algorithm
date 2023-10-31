# 본인이 선택한 언어로 풀이해주세요.
#  https://www.acmicpc.net/problem/1043
import sys
from collections import deque
input = sys.stdin.readline

people,party = map(int,input().split())
matrix = [[0]*(people+1) for _ in range(people+1)]

tmp =  list(map(int,input().split()))
truth = []
if tmp[0] != 0:
    truth = tmp[1:]

data = []
for _ in range(party):
    tmpparty = list(map(int,input().split()))
    for i in range(1,tmpparty[0]+1):
        for j in range(i + 1,tmpparty[0]+1):
            matrix[tmpparty[i]][tmpparty[j]] = 1
            matrix[tmpparty[j]][tmpparty[i]] = 1
    data.append(tmpparty[1:])

queue = deque()
for knowperson in truth:
    queue.append(knowperson)

while queue:
    knowperson = queue.popleft()
    for i in range(1,people+1):
        if matrix[knowperson][i] == 1 and (i not in truth):
            queue.append(i)
            truth.append(i)

result = 0
for p in data:
    isFalse = True
    for tperson in truth:
        if tperson in p:
            isFalse = False
            continue
    if isFalse:
        result += 1

print(result)
