//ith bit check int bit=n>>i&1;
//N>>K=N/2^K
//N<<K=N*2^K
//3<<2=3*(2^2);^to the power
//n<<k=n*(2 to the power k)

class TrieNode{
    public:
    TrieNode* child[2];
    TrieNode(){
        for(int i=0;i<2;i++){
            child[i]=NULL;
        }
    }
};
class Trie{
    public:
    TrieNode* root;
    Trie(){
        root=new TrieNode();
    }
    void insert(int n){
        TrieNode* curr=root;
        for(int i=31;i>=0;i--){
            int bit=(n>>i)&1;//tells about the bit at ith pos
            if(curr->child[bit]==NULL){
                curr->child[bit]=new TrieNode();
            }
            curr=curr->child[bit];
        }
    }
    int compare(int n){
        TrieNode* curr=root;
        int ans=0;
        for(int i=31;i>=0;i--){
            int bit=(n>>i)&1;
            if(curr->child[bit]!=NULL){
                curr=curr->child[bit];
            }else{
                ans+=(1<<i);
                curr=curr->child[1-bit];
            }
        }
        return ans;
    }
};
class Solution {
  public:
    int minXor(vector<int> &arr) {
        // code here
        Trie* ROOT=new Trie();
        ROOT->insert(arr[0]);
        int ans=INT_MAX;
        for(int i=1;i<arr.size();i++){
            ans=min(ROOT->compare(arr[i]),ans);
            ROOT->insert(arr[i]);
        }
        return ans;
    }
};