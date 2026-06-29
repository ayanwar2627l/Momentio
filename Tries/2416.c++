class TrieNode {
public:
    int count;
    TrieNode* child[26];

    TrieNode() {
        count=0;
        for(int i = 0; i < 26; i++) {
            child[i] = NULL;
        }
    }
};

class Trie {
public:
    TrieNode* root;

    Trie() {
        root = new TrieNode();
    }

    void insert(string &word) {
        TrieNode* curr = root;

        for(char ch : word) {
            int index = ch - 'a';

            if(curr->child[index] == NULL) {
                curr->child[index] = new TrieNode();
            }

            curr = curr->child[index];
            curr->count++;
        }
    }
    int search(string &word){
        TrieNode* curr=root;
        int prefixsum=0;
        for(int i=0;i<word.size();i++){
            char ch=word[i];
            int index=ch-'a';
            if(curr->child[index]==NULL){
                return prefixsum;
            }else{
                curr=curr->child[index];
                prefixsum+=curr->count;
            }
        }
        return prefixsum;
    }
};
class Solution {
public:
    vector<int> sumPrefixScores(vector<string>& words) {
        Trie* ROOT=new Trie();
        for(string word:words){
            ROOT->insert(word);
        }
        vector<int> ans;
        for(string word:words){
            ans.push_back(ROOT->search(word));
        }
        return ans;
    }
};