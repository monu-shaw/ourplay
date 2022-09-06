import React from 'react'

function Tester() {
  return (
    <div>
        <iframe src="https://m.youtube.com/" frameBorder="0"></iframe>
    </div>
  )
}

export default Tester
/* 

//{ Driver Code Starts
#include <bits/stdc++.h>
using namespace std;

// } Driver Code Ends


class Solution{
  public:
    int minDist(int a[], int n, int x, int y) {
        
        int cp = -1;
        int ep = 0;
        for(int i= 0; i<n;i++){
            if(a[i] == x){
                cp = i;
            }
            if(cp>-1){
                if(a[i] == y){
                break;
            }
            if(i == n-1 && a[i] != y){
                ep = 1;
                break;
            }
            ep++;
            }
            
        }if(cp == -1){
            return -1;
        }else{
            return ep;    
        }
        
        
    }
};

//{ Driver Code Starts.
int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        int a[n];
        for (int i = 0; i < n; i++) cin >> a[i];
        int x, y;
        cin >> x >> y;
        Solution obj;
        cout << obj.minDist(a, n, x, y) << endl;
    }
    return 0;
}

// } Driver Code Ends

*/