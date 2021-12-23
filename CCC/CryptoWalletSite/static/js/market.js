const vm = new Vue({
    el: "#app",
    delimiters: ['[[', ']]'],
    data: {
        allCoins: [],
        trending: [],
    },
    
    created: function(){
        
        this.loadCoins()
    },
    
    methods: {

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
                    price_change_percentage: '24h,7d,30d',
                }
            }).then(response => this.allCoins = this.allCoins.concat(response.data))
        }},

        trendingCoins: function() {
            this.trending = []
                axios({
                method: 'get',
                url: 'https://api.coingecko.com/api/v3/search/trending',

            }).then(response => {
                this.trending = this.trending.concat(response.data.coins)
                this.trending.forEach( each => {
                    let usdprice = each.item.price_btc * this.allCoins[0].current_price
                    if (usdprice > 500 ) {
                        each.item['usd_price'] = usdprice.toLocaleString(undefined, { minimumFractionDigits: 0,  maximumFractionDigits: 0 })
                    }
                    else if (usdprice >= 0.10 ) {
                        each.item['usd_price'] = usdprice.toLocaleString(undefined, { minimumFractionDigits: 2,  maximumFractionDigits: 2 })
                    }
                    else if (usdprice >= 0.010 ) {
                        each.item['usd_price'] = usdprice.toFixed(3)
                    }
                    else if (usdprice >= 0.0010 ) {
                        each.item['usd_price'] = usdprice.toFixed(4)
                    }
                    else if (usdprice >= 0.00010 ) {
                        each.item['usd_price'] = usdprice.toFixed(5)
                    }
                    else if (usdprice >= 0.000010 ) {
                        each.item['usd_price'] = usdprice.toFixed(6)
                    }
                    else if (usdprice >= 0.0000010 ) {
                        each.item['usd_price'] = usdprice.toFixed(7)
                    }
                    else if (usdprice >= 0.00000010 ) {
                        each.item['usd_price'] = usdprice.toFixed(8)
                    }
                    else if (usdprice >= 0.000000010 ) {
                        each.item['usd_price'] = usdprice.toFixed(9)
                    }
                    else if (usdprice >= 0.0000000010 ) {
                        each.item['usd_price'] = usdprice.toFixed(10)
                    }
                    else {
                        each.item['usd_price'] = usdprice
                    }
                })
            }

            
            
            )
        },



        // {
        //     "coins": [
        //       {
        //         "item": {
        //           "id": "lcx",
        //           "coin_id": 9985,
        //           "name": "LCX",
        //           "symbol": "LCX",
        //           "market_cap_rank": 428,
        //           "thumb": "https://assets.coingecko.com/coins/images/9985/thumb/zRPSu_0o_400x400.jpg?1574327008",
        //           "small": "https://assets.coingecko.com/coins/images/9985/small/zRPSu_0o_400x400.jpg?1574327008",
        //           "large": "https://assets.coingecko.com/coins/images/9985/large/zRPSu_0o_400x400.jpg?1574327008",
        //           "slug": "lcx",
        //           "price_btc": 0.0000042042951764603675,
        //           "score": 0
        //         }
        //       },
        //       {
        //         "item": {
        //           "id": "insure",
        //           "coin_id": 10354,
        //           "name": "inSure DeFi",
        //           "symbol": "SURE",
        //           "market_cap_rank": 271,
        //           "thumb": "https://assets.coingecko.com/coins/images/10354/thumb/logo-grey-circle.png?1614910406",
        //           "small": "https://assets.coingecko.com/coins/images/10354/small/logo-grey-circle.png?1614910406",
        //           "large": "https://assets.coingecko.com/coins/images/10354/large/logo-grey-circle.png?1614910406",
        //           "slug": "insure-defi",
        //           "price_btc": 1.969106306413391e-7,
        //           "score": 1
        //         }
        //       },
        //       {
        //         "item": {
        //           "id": "terra-luna",
        //           "coin_id": 8284,
        //           "name": "Terra",
        //           "symbol": "LUNA",
        //           "market_cap_rank": 9,
        //           "thumb": "https://assets.coingecko.com/coins/images/8284/thumb/luna1557227471663.png?1567147072",
        //           "small": "https://assets.coingecko.com/coins/images/8284/small/luna1557227471663.png?1567147072",
        //           "large": "https://assets.coingecko.com/coins/images/8284/large/luna1557227471663.png?1567147072",
        //           "slug": "terra-luna",
        //           "price_btc": 0.0018279367936136753,
        //           "score": 2
        //         }
        //       },
        //       {
        //         "item": {
        //           "id": "wonderland",
        //           "coin_id": 18126,
        //           "name": "Wonderland",
        //           "symbol": "TIME",
        //           "market_cap_rank": 123,
        //           "thumb": "https://assets.coingecko.com/coins/images/18126/thumb/time.PNG?1630621941",
        //           "small": "https://assets.coingecko.com/coins/images/18126/small/time.PNG?1630621941",
        //           "large": "https://assets.coingecko.com/coins/images/18126/large/time.PNG?1630621941",
        //           "slug": "wonderland",
        //           "price_btc": 0.08147313324877384,
        //           "score": 3
        //         }
        //       },
        //       {
        //         "item": {
        //           "id": "matic-network",
        //           "coin_id": 4713,
        //           "name": "Polygon",
        //           "symbol": "MATIC",
        //           "market_cap_rank": 14,
        //           "thumb": "https://assets.coingecko.com/coins/images/4713/thumb/matic-token-icon.png?1624446912",
        //           "small": "https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png?1624446912",
        //           "large": "https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png?1624446912",
        //           "slug": "polygon",
        //           "price_btc": 0.00005241185171507934,
        //           "score": 4
        //         }
        //       },
        //       {
        //         "item": {
        //           "id": "qanplatform",
        //           "coin_id": 15977,
        //           "name": "QANplatform",
        //           "symbol": "QANX",
        //           "market_cap_rank": 450,
        //           "thumb": "https://assets.coingecko.com/coins/images/15977/thumb/qanx.png?1637574290",
        //           "small": "https://assets.coingecko.com/coins/images/15977/small/qanx.png?1637574290",
        //           "large": "https://assets.coingecko.com/coins/images/15977/large/qanx.png?1637574290",
        //           "slug": "qanplatform",
        //           "price_btc": 0.0000022058489561141168,
        //           "score": 5
        //         }
        //       },
        //       {
        //         "item": {
        //           "id": "binancecoin",
        //           "coin_id": 825,
        //           "name": "Binance Coin",
        //           "symbol": "BNB",
        //           "market_cap_rank": 3,
        //           "thumb": "https://assets.coingecko.com/coins/images/825/thumb/binance-coin-logo.png?1547034615",
        //           "small": "https://assets.coingecko.com/coins/images/825/small/binance-coin-logo.png?1547034615",
        //           "large": "https://assets.coingecko.com/coins/images/825/large/binance-coin-logo.png?1547034615",
        //           "slug": "binance-coin",
        //           "price_btc": 0.010995781200197598,
        //           "score": 6
        //         }
        //       }
        //     ],
        //     "exchanges": []
        //   }























        searchBar: function() {
            
            let input, filter, table, tr, td, i, txtValue;
            input = document.getElementById("myInput");
            filter = input.value.toUpperCase();
            table = document.getElementById("myTable");
            tr = table.getElementsByTagName("tr");
            
            for (i = 0; i < tr.length; i++) {
                td = tr[i].getElementsByTagName("td")[0];
                
                if (td) {
                    txtValue = td.textContent || td.innerText;
                    if (txtValue.toUpperCase().indexOf(filter) > -1) {
                        tr[i].style.display = "";
                    } 
                    else {
                        tr[i].style.display = "none";
                    }
                }       
            }},


    }, //end of methods

}) // end of vue app
