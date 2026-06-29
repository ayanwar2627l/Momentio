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
            if(curr->child[1-bit]==NULL){//phele opposite check karenge kyuki maximise karna 
                curr=curr->child[bit];
            }else{
                ans+=(1<<i);//add karenge 
                curr=curr->child[1-bit];
            }
        }
        return ans;
    }
};
class Solution {
public:
    int findMaximumXOR(vector<int>& nums) {
        Trie* ROOT=new Trie();
        ROOT->insert(nums[0]);
        int ans=0;
        for(int i=1;i<nums.size();i++){
            ans=max(ROOT->compare(nums[i]),ans);
            ROOT->insert(nums[i]);
        }
        return ans;
    }
};