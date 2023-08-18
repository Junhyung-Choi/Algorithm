n = int(input()) # 전제의 수 input
graph = [[1e9 for i in range(26)] for i in range(26)] # 2차원 리스트를 생성하고 무한으로 초기화(알파벳이 26개)

for i in range(n):
    inList = input().split() # 전제 input
    start = ord(inList[0]) - ord('a') # 전제의 앞부분을 숫자 형태로 변환
    end = ord(inList[2]) - ord('a') # 전제의 뒷부분을 숫자 형태로 변환
    graph[start][end] = 1 # 해당 부분에 graph 리스트에 무한으로 되어 있는 걸 1로 변경

# 플로이드 워셜 알고리즘
for k in range(26):
    for a in range(26):
        for b in range(26):
            graph[a][b] = min(graph[a][b], graph[a][k] + graph[k][b])

m = int(input()) # 결론의 수
for i in range(m):
    inList = input().split() # 결론 input
    start = ord(inList[0]) - ord('a') # 결론의 앞부분을 숫자 형태로 변환
    end = ord(inList[2]) - ord('a') # 결론의 뒷부분을 숫자 형태로 변환
    if graph[start][end] < 1e9: # 갈 수 있는 거리라면 (값이 무한만 아니라면)
        print('T')
    else:
        print('F')
