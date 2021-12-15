
const vm = new Vue({
    el: "#app",
    delimiters: ['[[', ']]'],
    data: {
        walletAddress: '',
        zapperAPIkey : '96e0cc51-a62e-42ca-acee-910ea7d2a241',
        listOfsupporteProtocals : [],
        stakedCoins : [],
        walletCoins : [],
        netWorth: 0,
        userWallet: '',
        networkBalance: [],
    },
    methods: {

        
        getWallet: function() {
            
            if (ethereum.request()){
            ethereum.request({ method: 'eth_requestAccounts' }).then(response=>{ 
                this.walletAddress = response
                this.userWallet = this.walletAddress[0]
                this.checkProtocal()
            }) }
            
            else {
                alert('No MetaMask extension deteted')
            }

        },
        checkProtocal: function() {
            axios({
                method: 'get',
                url: 'https://api.zapper.fi/v1/protocols/balances/supported',
                params: {
                    addresses : this.walletAddress,
                    api_key: '96e0cc51-a62e-42ca-acee-910ea7d2a241',
                },
                }).then(response => {
                    try {

                    
                        let listOfProtocals = response.data
                        listOfProtocals.forEach( protocal => {
                        
                            let network = protocal.network
                            let each = protocal.apps

                                each.forEach(appObject => {
                                    
                                    let app = appObject.appId

                                    if ( app != 'tokens') {

                                        this.listOfsupporteProtocals.push({

                                            'network' : network,
                                            'app' : app,
                                            'balance' : 0,
                                            
                                        })
                                    }
                                })
                        })
                    } catch (error) {}
                    this.getWalletBalance()
                    this.getStakedBalance()
                })
        },
        getWalletBalance: function() {
            
            this.listOfsupporteProtocals.forEach( protocal => {
                axios({
                    method: 'get',
                    url: 'https://api.zapper.fi/v1/protocols/tokens/balances',
                    params: {
                        addresses : this.walletAddress,
                        network : protocal.network,
                        api_key: '96e0cc51-a62e-42ca-acee-910ea7d2a241',
                        },
                        }).then(response => {
                        try {
                            let walletCoin = response.data[ this.walletAddress[0] ].products[0].assets
                            
                            
                            if (walletCoin.length > 1) {
                                walletCoin.forEach( obj => {
                                    
                                    if (!obj.symbol.startsWith('s')) {
                                        this.walletCoins.push(obj)
                                        this.netWorth += obj.balanceUSD
                                        this.listOfsupporteProtocals.forEach( prot => {
                                            if (prot.network === obj.network) {
                                                prot.balance += obj.balanceUSD
                                            }
                                        })
                                    }
                            
                                })
                            }
                            else {
                                if (!walletCoin[0].symbol.startsWith('s')) {
                                    
                                    this.walletCoins.push(walletCoin[0])
                                    this.netWorth += walletCoin[0].balanceUSD
                                }
                            }

                        } catch (error) {}
                        
                        })
            })

        },
        getStakedBalance: function() {
            
            this.listOfsupporteProtocals.forEach( protocal => {
                
                axios({
                    method: 'get',
                    url: `https://api.zapper.fi/v1/protocols/${protocal.app}/balances`,
                    params: {
                        addresses : this.walletAddress,
                        network : protocal.network,
                        api_key: '96e0cc51-a62e-42ca-acee-910ea7d2a241',
                    },
                    }).then(response => {               
                        try {
                        let vaultCoin = response.data[ this.walletAddress[0] ].products[0].assets[0]
                        this.stakedCoins.push(vaultCoin) 
                        this.netWorth += vaultCoin.balanceUSD

                        this.listOfsupporteProtocals.forEach( prot => {
                            if (prot.network === vaultCoin.network) {
                                prot.balance += vaultCoin.balanceUSD
                            }
                        })
                    }
                        catch (error) {}
                    
                    })
            })
        },




























        // loadCoins: function() {
            
        //     //Ethereum Network
        //     axios({
        //     method: 'get',
        //     url: 'https://api.zapper.fi/v1/protocols/tokens/balances',
        //     params: {
        //         addresses : this.walletAddress,
        //         network : 'ethereum',
        //         api_key: '96e0cc51-a62e-42ca-acee-910ea7d2a241',
        //         },
        //         }).then(response => {
        //         try {
        //             this.EthereumCoins = response.data[ this.walletAddress[0] ].products[0].assets
        //         } catch (error) {}
        //         }),  


        //     //Polygon Network
        //     axios({
        //     method: 'get',
        //     url: 'https://api.zapper.fi/v1/protocols/tokens/balances',
        //     params: {
        //         addresses : this.walletAddress,
        //         network : 'polygon',
        //         api_key: '96e0cc51-a62e-42ca-acee-910ea7d2a241',
        //     },
        //     }).then(response => {
        //         try {
        //             this.PolygonCoins = response.data[ this.walletAddress[0] ].products[0].assets
        //         } catch (error) {}
        //     }),
            
        //     //Optimism Network
        //     axios({
        //     method: 'get',
        //     url: 'https://api.zapper.fi/v1/protocols/tokens/balances',
        //     params: {
        //         addresses : this.walletAddress,
        //         network : 'optimism',
        //         api_key: '96e0cc51-a62e-42ca-acee-910ea7d2a241',
        //     },
        //     }).then(response => {
        //         try {
        //             this.OptimismCoins = response.data[ this.walletAddress[0] ].products[0].assets
        //         } catch (error) {}    
        //     }),

        //     //Xdai Network
        //     axios({
        //     method: 'get',
        //     url: 'https://api.zapper.fi/v1/protocols/tokens/balances',
        //     params: {
        //         addresses : this.walletAddress,
        //         network : 'xdai',
        //         api_key: '96e0cc51-a62e-42ca-acee-910ea7d2a241',
        //     },
        //     }).then(response => {
        //         try {
        //             this.XdaiCoins = response.data[ this.walletAddress[0] ].products[0].assets
        //         } catch (error) {}
        //     }),

        //     //Binance Smart Chain Network
        //     axios({
        //     method: 'get',
        //     url: 'https://api.zapper.fi/v1/protocols/tokens/balances',
        //     params: {
        //         addresses : this.walletAddress,
        //         network : 'binance-smart-chain',
        //         api_key: '96e0cc51-a62e-42ca-acee-910ea7d2a241',
        //     },
        //     }).then(response => {
        //         try {
        //             this.BinanceCoins = response.data[ this.walletAddress[0] ].products[0].assets
        //         } catch (error) {}
        //     }),

        //     //Fantom Network
        //     axios({
        //     method: 'get',
        //     url: 'https://api.zapper.fi/v1/protocols/tokens/balances',
        //     params: {
        //         addresses : this.walletAddress,
        //         network : 'fantom',
        //         api_key: '96e0cc51-a62e-42ca-acee-910ea7d2a241',
        //         },
        //         }).then(response => {
        //             try {
        //                 this.FantomCoins = response.data[ this.walletAddress[0] ].products[0].assets
        //             } catch (error) {}
        //         }),  

        //     //Avalanche Network
        //     axios({
        //     method: 'get',
        //     url: 'https://api.zapper.fi/v1/protocols/tokens/balances',
        //     params: {
        //         addresses : this.walletAddress,
        //         network : 'avalanche',
        //         api_key: '96e0cc51-a62e-42ca-acee-910ea7d2a241',
        //     },
        //     }).then(response => {
        //         try {
        //             this.AvalancheCoins = response.data[ this.walletAddress[0] ].products[0].assets
        //         } catch (error) {}         
        //     }),
            
        //     //Arbitrum Network
        //     axios({
        //     method: 'get',
        //     url: 'https://api.zapper.fi/v1/protocols/tokens/balances',
        //     params: {
        //         addresses : this.walletAddress,
        //         network : 'arbitrum',
        //         api_key: '96e0cc51-a62e-42ca-acee-910ea7d2a241',
        //     },
        //     }).then(response => {
        //         try {
        //             this.ArbitrumCoins = response.data[ this.walletAddress[0] ].products[0].assets
        //         } catch (error) {} 
        //     }),

        //     //Celo Network
        //     axios({
        //     method: 'get',
        //     url: 'https://api.zapper.fi/v1/protocols/tokens/balances',
        //     params: {
        //         addresses : this.walletAddress,
        //         network : 'celo',
        //         api_key: '96e0cc51-a62e-42ca-acee-910ea7d2a241',
        //     },
        //     }).then(response => {
        //         try {
        //             this.CeloCoins = response.data[ this.walletAddress[0] ].products[0].assets
        //         } catch (error) {} 
        //     }),

        //     //Harmony Network
        //     axios({
        //     method: 'get',
        //     url: 'https://api.zapper.fi/v1/protocols/tokens/balances',
        //     params: {
        //         addresses : this.walletAddress,
        //         network : 'harmony',
        //         api_key: '96e0cc51-a62e-42ca-acee-910ea7d2a241',
        //     },
        //     }).then(response => {
        //         try {
        //             this.HarmonyCoins = response.data[ this.walletAddress[0] ].products[0].assets
        //         } catch (error) {} 
        //     }) 

        // },



        // getListOfProtocals: function(listOfProtocals) {
        //     listOfProtocals.forEach( protocal => {
        //         let network = protocal.network
        //         let each = protocal.apps
        //         each.forEach(appObject => {
        //             let app = appObject.appId
        //             if ( app != 'tokens') {
        //                 this.listOfsupporteProtocals.push({
        //                     'network' : network,
        //                     'app' : app
        //                 })
        //             }
        //         })
        //     } )
        // },


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

    }
})
