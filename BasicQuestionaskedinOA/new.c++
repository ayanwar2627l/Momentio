#include <bits/stdc++.h>
using namespace std;
int main(){
    string s;
    cin>>s;
    unordered_map<char,int> mapp;
    for(int i=0;i<s.length();i++){
        mapp[s[i]]++;
    }
    unordered_map<char,int> mapp2;
    for(int i=0;i<s.length();i++){
        if(!mapp2.count(s[i])){
            cout<<s[i]<<mapp[s[i]]<<" ";
        }
        mapp2[s[i]]++;
    }
    return 0;
}
