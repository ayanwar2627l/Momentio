class TrieNode{
public:
    TrieNode* child[2];
    int cnt;

    TrieNode(){
        child[0]=child[1]=NULL;
        cnt=0;
    }
};

class Trie{
public:
    TrieNode* root;

    Trie(){
        root=new TrieNode();
    }

    void insert(int num){
        TrieNode* curr=root;
        for(int i=31;i>=0;i--){
            int bit=(num>>i)&1;

            if(curr->child[bit]==NULL)
                curr->child[bit]=new TrieNode();

            curr=curr->child[bit];
            curr->cnt++;
        }
    }

    void erase(int num){
        TrieNode* curr=root;
        for(int i=31;i>=0;i--){
            int bit=(num>>i)&1;
            curr=curr->child[bit];
            curr->cnt--;
        }
    }

    int compare(int num){
        TrieNode* curr=root;
        int ans=0;

        for(int i=31;i>=0;i--){
            int bit=(num>>i)&1;

            if(curr->child[1-bit]!=NULL && curr->child[1-bit]->cnt>0){
                ans |= (1<<i);
                curr=curr->child[1-bit];
            }
            else{
                curr=curr->child[bit];
            }
        }

        return ans;
    }
};

class Solution {
public:
    int maximumStrongPairXor(vector<int>& nums) {

        sort(nums.begin(), nums.end());

        Trie trie;

        int n=nums.size();
        int si=0;
        int ans=0;

        for(int ei=0;ei<n;ei++){

            while(nums[ei] > 2LL*nums[si]){
                trie.erase(nums[si]);
                si++;
            }

            if(si!=ei){
                ans=max(ans,trie.compare(nums[ei]));
            }

            trie.insert(nums[ei]);
        }

        return ans;
    }
};