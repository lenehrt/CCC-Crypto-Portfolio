
const vm = new Vue({
    el: "#app",
    delimiters: ['[[', ']]'],
    data: {
        ETHwalletAddress: '',
        zapperAPIkey : '96e0cc51-a62e-42ca-acee-910ea7d2a241',
        coinsList: '',
    },

    methods: {
        
        loadWallet: function() {
            
        
            ethereum.request({ method: 'eth_requestAccounts' }).then(response=>{
                this.ETHwalletAddress = response
            })
        
        },
        
 ''' you need to figure out how to get other networks wallet address from metamask'''

        loadCoins: function() {
                axios({
                method: 'get',
                url: 'https://api.zapper.fi/v1/protocols/tokens/balances',
                params: {
                    addresses : this.ETHwalletAddress,
                    api_key: '96e0cc51-a62e-42ca-acee-910ea7d2a241',
                },
            }).then(response => {
                console.log(response)
                this.coinsList = response
            })
        },
    }

})

