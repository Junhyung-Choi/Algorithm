# 본인이 선택한 언어로 풀이해주세요.
# https://www.acmicpc.net/problem/16236

# 1. 공간의 크기를 입력받는다.
N = int(input())

# 2. 공간의 상태를 입력받는다.
space = []
for _ in range(N):
    space.append(list(map(int, input().split())))

shark_size = 2   # 상어의 크기
shark_location = [0, 0] # 상어의 위치
shark_eat = 0   # 상어가 먹은 먹이의 수

# 3. 먹이의 위치를 찾는다.

def find_prey():
    prey_location = []
    for x in space:
        for y in space[x]:
            if space[x][y] < shark_size and space[x][y] != 0:
                prey_location.append([x, y])
            elif space[x][y] == 9:
                shark_location[0] = x
                shark_location[1] = y
    if prey_location == []:
        return 0
    else:
        return prey_location
    
def find_path(shark, prey):
    times = 0
    if(prey[0] >= shark[0] and prey[1] >= shark[1]):
        if(shark)
        

while(True):
    prey_location = find_prey()
    if prey_location == 0:
        break
    if len(prey_location) == 1:
        shark_location[0] = prey_location[0][0]
        shark_location[1] = prey_location[0][1]
        space[shark_location[0]][shark_location[1]] = 9    
    
    



