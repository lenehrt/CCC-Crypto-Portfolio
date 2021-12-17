
const vm = new Vue({
    el: "#app",
    delimiters: ['[[', ']]'],
    data: {
        walletAddress: '',
        zapperAPIkey : '96e0cc51-a62e-42ca-acee-910ea7d2a241',
        listOfsupporteProtocals : [],
        stakedCoins : [],
        walletCoins : [],
        history1 : [],
        history2 : [],
        history3 : [],
        history4 : [],
        netWorth: 0,
        userWallet: '',
        networkBalance: [],
    },

    created: function(){
        
        this.getWallet()
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
                    this.getHistoryNetwork()
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

        
        
        
        
        // getHistoryNetwork: function() {
            
        //     this.history1 = []

        //     this.listOfsupporteProtocals.forEach( protocal => {
                
        //         axios({
        //             method: 'get',
        //             url: `https://api.zapper.fi/v1/transactions`,
        //             params: {
        //                 address : this.walletAddress[0],
        //                 addresses : this.walletAddress,
        //                 network : protocal.network,
        //                 api_key: '96e0cc51-a62e-42ca-acee-910ea7d2a241',
        //             },
        //             }).then(response => {
        //                 this.history1.push(...response.data.data)
        //             }).catch(error => {})
        //     })

        //     console.log('done....')


        // },
        getHistoryNetwork: function() {
            
            this.history1 = []
            let promises = []

            this.listOfsupporteProtocals.forEach( protocal => {
                promises.push(
                axios({
                    method: 'get',
                    url: `https://api.zapper.fi/v1/transactions`,
                    params: {
                        address : this.walletAddress[0],
                        addresses : this.walletAddress,
                        network : protocal.network,
                        api_key: '96e0cc51-a62e-42ca-acee-910ea7d2a241',
                    },
                    }) 
                )                
            })

            Promise.allSettled(promises)
            .then(results => {
                
                results.forEach( each => {
                
                    if ( each.value ) {
                    this.history1.push(...each.value.data.data)
                    }
            })

            })


        },


        
        // getHistoryTransactions: function() {
        //     this.history3 = []

        //     for(var i = 0; i < this.history2.length; i++) {
        //         for(var j = 0; j < this.history2[i].length; j++) {
        //             this.history3.push(this.history2[i][j]);
        //         }
        //     }

        //     // this.history2.forEach ( network => {
        //     //     let transaction = network.data
        //     //     this.history3.push(transaction)
        //     // })
        //     // this.history3.forEachg ( netnet => {
        //     //     let transtrans = netnet
        //     //     this.history4.push(transtrans)
        //     // })

        // }


        




























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

    },

})
