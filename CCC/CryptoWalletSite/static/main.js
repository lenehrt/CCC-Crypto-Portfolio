
const vm = new Vue({
    el: "#app",
    delimiters: ['[[', ']]'],
    data: {
        walletAddress: '',
        zapperAPIkey : '96e0cc51-a62e-42ca-acee-910ea7d2a241',
        
        EthereumCoins : '',
        PolygonCoins : '',
        OptimismCoins: '',
        XdaiCoins : '',
        BinanceCoins : '',
        FantomCoins : '',
        AvalancheCoins : '',
        ArbitrumCoins : '',
        CeloCoins : '',
        HarmonyCoins : '',
    },
    methods: {
        
        loadWallet: function() {
            
            ethereum.request({ method: 'eth_requestAccounts' }).then(response=>{ 
                this.walletAddress = response
                this.loadCoins()
            })
        },
        loadCoins: function() {
            
            //Ethereum Network
            axios({
            method: 'get',
            url: 'https://api.zapper.fi/v1/protocols/tokens/balances',
            params: {
                addresses : this.walletAddress,
                network : 'ethereum',
                api_key: '96e0cc51-a62e-42ca-acee-910ea7d2a241',
                },
                }).then(response => {
                    
                    this.EthereumCoins = response.data[ this.walletAddress[0] ].products[0].assets
                
                }),  


            //Polygon Network
            axios({
            method: 'get',
            url: 'https://api.zapper.fi/v1/protocols/tokens/balances',
            params: {
                addresses : this.walletAddress,
                network : 'polygon',
                api_key: '96e0cc51-a62e-42ca-acee-910ea7d2a241',
            },
            }).then(response => {
                
                this.PolygonCoins = response.data[ this.walletAddress[0] ].products[0].assets
            
            }),
            
            //Optimism Network
            axios({
            method: 'get',
            url: 'https://api.zapper.fi/v1/protocols/tokens/balances',
            params: {
                addresses : this.walletAddress,
                network : 'optimism',
                api_key: '96e0cc51-a62e-42ca-acee-910ea7d2a241',
            },
            }).then(response => {
                
                this.OptimismCoins = response.data[ this.walletAddress[0] ].products[0].assets
            
            }),

            //Xdai Network
            axios({
            method: 'get',
            url: 'https://api.zapper.fi/v1/protocols/tokens/balances',
            params: {
                addresses : this.walletAddress,
                network : 'xdai',
                api_key: '96e0cc51-a62e-42ca-acee-910ea7d2a241',
            },
            }).then(response => {
                
                this.XdaiCoins = response.data[ this.walletAddress[0] ].products[0].assets
            
            }),

            //Binance Smart Chain Network
            axios({
            method: 'get',
            url: 'https://api.zapper.fi/v1/protocols/tokens/balances',
            params: {
                addresses : this.walletAddress,
                network : 'binance-smart-chain',
                api_key: '96e0cc51-a62e-42ca-acee-910ea7d2a241',
            },
            }).then(response => {
                
                this.BinanceCoins = response.data[ this.walletAddress[0] ].products[0].assets
            
            }),

            //Fantom Network
            axios({
            method: 'get',
            url: 'https://api.zapper.fi/v1/protocols/tokens/balances',
            params: {
                addresses : this.walletAddress,
                network : 'fantom',
                api_key: '96e0cc51-a62e-42ca-acee-910ea7d2a241',
                },
                }).then(response => {
                    
                    this.FantomCoins = response.data[ this.walletAddress[0] ].products[0].assets
                
                }),  

            //Avalanche Network
            axios({
            method: 'get',
            url: 'https://api.zapper.fi/v1/protocols/tokens/balances',
            params: {
                addresses : this.walletAddress,
                network : 'avalanche',
                api_key: '96e0cc51-a62e-42ca-acee-910ea7d2a241',
            },
            }).then(response => {
                
                this.AvalancheCoins = response.data[ this.walletAddress[0] ].products[0].assets
            
            }),
            
            //Arbitrum Network
            axios({
            method: 'get',
            url: 'https://api.zapper.fi/v1/protocols/tokens/balances',
            params: {
                addresses : this.walletAddress,
                network : 'arbitrum',
                api_key: '96e0cc51-a62e-42ca-acee-910ea7d2a241',
            },
            }).then(response => {
                
                this.ArbitrumCoins = rresponse.data[ this.walletAddress[0] ].products[0].assets
            
            }),

            //Celo Network
            axios({
            method: 'get',
            url: 'https://api.zapper.fi/v1/protocols/tokens/balances',
            params: {
                addresses : this.walletAddress,
                network : 'celo',
                api_key: '96e0cc51-a62e-42ca-acee-910ea7d2a241',
            },
            }).then(response => {
                
                this.CeloCoins = response.data[ this.walletAddress[0] ].products[0].assets
            
            }),

            //Harmony Network
            axios({
            method: 'get',
            url: 'https://api.zapper.fi/v1/protocols/tokens/balances',
            params: {
                addresses : this.walletAddress,
                network : 'harmony',
                api_key: '96e0cc51-a62e-42ca-acee-910ea7d2a241',
            },
            }).then(response => {
                
                this.HarmonyCoins = response.data[ this.walletAddress[0] ].products[0].assets
            
            }) 

            }
        }
})





    // loadWallet: function() {
            
    //     ethereum.request({ method: 'eth_requestAccounts' }).then(response=>{
    //         this.walletAddress = response
    //     }).then( response => {
    //             let url = 'https://api.zapper.fi/v1/balances?addresses[0]=' + this.walletAddress + '&nonNilOnly=true&network[0]=Ethereum&network[1]=polygon&network[2]=optimism&network[3]=xdai&network[4]=binance-smart-chain&network[5]=fantom&network[6]=avalanche&network[7]=arbitrum&network[8]=celo&network[9]=harmony&api_key=96e0cc51-a62e-42ca-acee-910ea7d2a241'
    //             let es = new EventSource(url);
    //             es.addEventListener('balance', event => {
    //             let data = JSON.parse(event.data);
    //             console.log(data)
    //             this.coinsList = data
    //             }, false);
    //     })
    // },