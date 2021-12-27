const vm = new Vue({
    el: "#app",
    delimiters: ['[[', ']]'],
    
    data: {
        walletAddress: '',
        userWallet: '',
        zapperAPIkey : '96e0cc51-a62e-42ca-acee-910ea7d2a241',
        listOfsupporteProtocals : [],
        stakedCoins : [],
        walletCoins : [],
        historyTransactions : [],
        allCoins: [],
        netWorth: 0,
        networkImages : {
            'arbitrum' : 'https://zapper.fi/images/networks/arbitrum-icon.png',
            'avalanche' : 'https://zapper.fi/images/networks/avalanche-icon.png',
            'binance-smart-chain' : 'https://zapper.fi/images/networks/binance-smart-chain-icon.png',
            'celo' : 'https://zapper.fi/images/networks/celo-icon.png',
            'ethereum' : 'https://zapper.fi/images/networks/ethereum-icon.png',
            'fantom' : 'https://zapper.fi/images/networks/fantom-icon.png',
            'harmony' : 'https://zapper.fi/images/networks/harmony-icon.png',
            'optimism' : 'https://zapper.fi/images/networks/optimism-icon.png',
            'polygon' : 'https://zapper.fi/images/networks/polygon-icon.png',
        },
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

                                    if ( app != 'tokens' && app != 'the-graph') {

                                        this.listOfsupporteProtocals.push({

                                            'network' : network,
                                            'app' : app,
                                            'balance' : 0,
                                            'img': this.networkImages[network],                   
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
                            this.historyTransactions.push(...each.value.data.data)
                            }
                    }) 
            }) 
        },

        loadCoins: function() {
            let i = 0
            while (i < 1) {
            i++ 
                axios({
                method: 'get',
                url: 'https://api.coingecko.com/api/v3/coins/markets?',
                params: {
                    vs_currency : 'usd',
                    order : 'market_cap_desc',
                    per_page : '250',
                    page : i,
                    sparkline: 'false',
                }
            }).then(response => this.allCoins = this.allCoins.concat(response.data))
            }
        },

        updateWallet: function() {
            
        ethereum.request({ method: 'eth_requestAccounts' }).then(response=>{
            this.walletAddress = response
        }).then( response => {
                let url = 'https://api.zapper.fi/v1/balances?addresses[0]=' + this.walletAddress + '&nonNilOnly=true&network[0]=Ethereum&network[1]=polygon&network[2]=optimism&network[3]=xdai&network[4]=binance-smart-chain&network[5]=fantom&network[6]=avalanche&network[7]=arbitrum&network[8]=celo&network[9]=harmony&api_key=96e0cc51-a62e-42ca-acee-910ea7d2a241'
                let es = new EventSource(url);
                es.addEventListener('balance', event => {
                let data = JSON.parse(event.data);
                console.log(data)
                this.coinsList = data
                }, false);
        })
        },

    },
    
    created: function(){
        
        // this.getWallet()
    },

})
