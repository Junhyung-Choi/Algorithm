# Kruskal Algorithm (크루스칼 알고리즘)

> 크루스칼 알고리즘은 `최소 신장 트리(MST)` 를 구할 때 사용하는 알고리즘입니다.
> 사이클 여부를 확인하기 위해 `Union-Find`를 활용해야 합니다.

## 최소 신장 트리 (MST)

`최소 신장 트리`는 그래프 내의 모든 정점을 포함하고 사이클이 없는 연결 선을 그렸을 때, 가중치의 합이 최소가 되는 그래프를 의미합니다.

아래와 같은 그래프가 존재한다고 가정해봅시다.

![예제 그래프](https://i.imgur.com/4wIFiNX.png)

이 경우의 최소 신장 트리는 아래와 같습니다.

![최소 신장 트리](https://i.imgur.com/mCywucG.png)

즉, 위와 같이 순환이 없고 모든 정점이 연결되어 있는 트리 형태를 띄면서, 가중치의 합이 최소가 되는 그래프가 바로 `최소 신장 트리`가 되는 것입니다.

<br>

`최소 신장 트리`를 구해야 하는 예제 문제는 아래와 같습니다.

- 여러 개의 네트워크 지점들이 있는데, 모든 지점들을 유선으로 연결하되 연결선의 총 길이가 최소가 되야 하는 문제
- 도시들을 모두 연결하되, 연결하는 도로의 길이 합이 최소가 되야 하는 문제

정의 그대로 _"각 정점을 모두 연결하되 최소 비용으로 연결해야하는"_ 문제가 바로 `최소 신장 트리`를 구하는 문제라고 볼 수 있습니다.

## 크루스칼 알고리즘

`크루스칼 알고리즘`은 **그리디 알고리즘** 의 일종이기 때문에 알고리즘 자체는 복잡하진 않지만, 사이클 존재 여부를 확인하는 과정에서 `Union-Find` 알고리즘을 사용해야 합니다.

적은 비용의 간선을 먼저 확인 _(-> 가중치 기준 정렬)_ 하고, 해당 간선을 채택했을 때 **사이클이 발생하지 않으면 해당 간선을 채택**하고 사이클이 발생하면 채택하지 않습니다.

즉, 정렬을 통해 매번 최선의 선택을 함으로써 `그리디`적인 접근 방식이 사용되고 있는 것을 확인할 수 있습니다.

아래는 `크루스칼 알고리즘`의 동작 과정을 정리한 것입니다.

```
1. 간선 데이터를 비용 기준 오름차순으로 정렬한다.
2. 간선을 하나씩 확인하며 현재의 간선이 사이클을 발생시키는지 확인한다.
    2-1. 사이클이 발생하지 않는 경우 최소 신장 트리에 포함시킨다.
    2-2. 사이클이 발생하는 경우 최소 신장 트리에 포함시키지 않는다.
3. 모든 간선에 대하여 2번의 과정을 반복한다.
```

2번 과정에서 사이클 여부를 판단할 때는 `Union-Find`를 사용할 수 있습니다.

## Union-Find

`유니온 파인드` 알고리즘은 서로 다른 두 노드를 합칠 때, **두 노드가 동일한 최상위 부모**를 가지고 있는지 _(= 같은 집합에 포함되어 있는지, = 사이클을 형성하는지)_ 확인할 수 있는 알고리즘입니다.

서로 같은 최상위 부모를 가진 상태에서 두 노드를 합치게 되면 사이클이 형성되기 때문에, 이러한 `Union-Find`를 통해서 사이클 여부를 확인할 수 있습니다.

관련 설명은 노션에 이미 정리가 되어 있으므로 해당 노트를 참고해주세요. 👉🏻 [[노션] Union-Find](https://temporal-candy-348.notion.site/Union-Find-c02dfe777dd94a1a8083afd17d56efaf?pvs=4)

## 예제 코드

**Python**  
[코드 출처](https://velog.io/@kimdukbae/크루스칼-알고리즘-Kruskal-Algorithm)

```python
# 특정 원소가 속한 집합을 찾기
def find(parent, x):
    if parent[x] == x:
        return x
    parent[x] = find(parent, parent[x])
    return parent[x]


# 두 원소가 속한 집합을 합치기 (간선 연결한다고 생각!)
def union(parent, a, b):
    rootA = find(parent, a)
    rootB = find(parent, b)

    if rootA < rootB:
        parent[rootB] = rootA
    else:
        parent[rootA] = rootB


import sys

input = sys.stdin.readline
# 노드의 개수와 간선(union 연산)의 개수 입력받기
v, e = map(int, input().split())
parent = [0] * (v + 1)

edges = []
result = 0

# 부모 테이블상에서, 부모를 자기 자신으로 초기화
for i in range(1, v + 1):
    parent[i] = i

# 모든 간선에 대한 정보를 입력받기
for _ in range(e):
    a, b, cost = map(int, input().split())
    # 비용순으로 오름차순 정렬하기 위해 튜플의 첫 번째 원소를 비용으로 설정
    edges.append((cost, a, b))

edges.sort()

for edge in edges:
    cost, a, b = edge
    # 사이클이 발생하지 않는 경우에만 집합에 포함(=연결한다.)
    if find(parent, a) != find(parent, b):
        union(parent, a, b)
        result += cost

print(result)

# sample input
# 7 9
# 1 2 29
# 1 6 75
# 2 3 35
# 2 6 34
# 3 4 7
# 4 6 23
# 4 7 13
# 5 6 53
# 6 7 25
```

<br>

**C++**  
[코드 출처](https://baebalja.tistory.com/317)

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int parent[10001];

int find(int x) {
	if (parent[x] == x)return x;
	else return parent[x] = find(parent[x]);
}

void uni(int x, int y) {
	x = find(x);
	y = find(y);
	parent[y] = x;
}

bool sameparent(int x, int y) {
	x = find(x);
	y = find(y);
	if (x == y) return true;
	else return false;
}

int main() {
	int vertex, e;
	cin >> vertex >> e;
	int result = 0;
	vector<pair<int, pair<int, int>>>v;
	for (int i = 0; i < e; i++) {
		int from, to, cost;
		cin >> from >> to >> cost;
		v.push_back({ cost,{from,to} });
	}
	sort(v.begin(), v.end());
	for (int i = 1; i <= vertex; i++)parent[i] = i;
	for (int i = 0; i < v.size(); i++) {
		if (!sameparent(v[i].second.first, v[i].second.second)) {
			uni(v[i].second.first, v[i].second.second);
			result += v[i].first;
		}
	}
	cout << result;
}
```
