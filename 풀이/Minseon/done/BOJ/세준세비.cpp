#include <iostream>
#include <algorithm>
#include <deque>

using namespace std;

// * 세준이는 N명의 병사를 키웠고, 세비는 M명의 병사를 키웠다.
// * 각 전투에서 살아있는 병사중 제일 약한 병사가 죽는다.
// * - 제일 약한 병사가 여러 명이고, 제일 약한 병사가 모두 같은 편에 있다면, 그 중에 한 명이 임의로 선택되어 죽는다.
// * - 제일 약한 병사가 여러 명이고, 양 편에 모두 있다면, 세비의 제일 약한 병사 중 한 명이 임의로 선택되어 죽는다.

// ? 각 병사에 대해 vector에 입력을 받고, 각각 오름차순으로 정렬한다.
// ? 남은 병사가 1명일 때까지 반복

int main() {
    cin.tie(nullptr);
    ios::sync_with_stdio(false);

    int T;
    cin >> T;

    int n, m, input_num;
    while (T--)
    {
        cin >> n >> m;
        deque<long long int> sejun;
        for (int i = 0; i < n; ++i) {
            cin >> input_num;
            sejun.push_back(input_num);
        }
        deque<long long int> sebi(m);
        for (int i = 0; i < m; ++i) {
            cin >> input_num;
            sebi.push_back(input_num);
        }

        sort(sejun.begin(), sejun.end());
        sort(sebi.begin(), sebi.end());

        while (sebi.size() + sejun.size() > 1) {
            if (sejun.empty() || !sebi.empty() && sebi[0] <= sejun[0]) {
                sebi.pop_front();
            }
            else if (sebi.empty() || !sejun.empty() && sejun[0] < sebi[0]) {
                sejun.pop_front();
            }
        }

        if (sebi.empty() && sejun.size() == 1) cout << "S\n";
        else if (sejun.empty() && sebi.size() == 1) cout << "B\n";
        else cout << "C\n";
    }
    

    return 0;
}