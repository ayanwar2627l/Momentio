class TrieNode{
    public:
    bool isEnd;
    TrieNode* child[26];
    TrieNode(){
        isEnd=false;
        for(int i=0;i<26;i++){
            child[i]=NULL;
        }
    }
};
class Trie{
    public:
    TrieNode* root=new TrieNode();
    void insert(string &word){
        TrieNode* curr=root;
        for(char ch:word){
            int index=ch-'a';
            if(curr->child[index]==NULL){
                curr->child[index]=new TrieNode();
            }
            curr=curr->child[index];
        }
        curr->isEnd=true;
    }
    void search(string &word){
        TrieNode* curr=root;
        string res="";
        for(int i=0;i<word.size();i++){
            char ch=word[i];
            int index=ch-'a';
            if(curr->child[index]==NULL&&curr->isEnd!=true){
                return;
            }
            curr=curr->child[index];//do this before checking isEnd other wise it will check parent
            res+=ch;//add to result when travesing through child as root is a vacant 
            if(curr->isEnd==true){
                word=res;
                return ;
            }
        }
    }
};
class Solution {
public:
    string replaceWords(vector<string>& dictionary, string s) {
        Trie* ROOT=new Trie();//trie class ka object

        vector<string> words;
        int start=0;
        int len=0;
        for(int i=0;i<s.size();i++){
            if(s[i]==' '||i==s.size()-1){
                if(i==s.size()-1){
                    len++;
                }
                words.push_back(s.substr(start,len));
                start=i+1;
                len=0;
            }else{
                len++;
            }
        }
        // for(int i=0;i<words.size();i++){
        //     cout<<words[i]<<endl;
        // }
        // return "";
        for(int i=0;i<dictionary.size();i++){
            ROOT->insert(dictionary[i]);
        }
        for(int i=0;i<words.size();i++){
            ROOT->search(words[i]);
        }
        string ans="";
        for(int i=0;i<words.size()-1;i++){
            ans+=words[i];
            ans+=" ";
        }
        ans+=words[words.size()-1];
        return ans;
    }
};