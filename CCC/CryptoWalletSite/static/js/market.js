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
                axios({
                method: 'get',
                url: 'https://api.coingecko.com/api/v3/coins/markets?',
                params: {
                    vs_currency : 'usd',
                    order : 'market_cap_desc',
                    per_page : '250',
                    page : 1,
                    sparkline: 'false',
                    price_change_percentage: '24h,7d,30d',
                }
            }).then(response => {
                this.allCoins = this.allCoins.concat(response.data)
                this.loadCoins2()
            })
        },

        loadCoins2: function() {
                axios({
                method: 'get',
                url: 'https://api.coingecko.com/api/v3/coins/markets?',
                params: {
                    vs_currency : 'usd',
                    order : 'market_cap_desc',
                    per_page : '250',
                    page : 2,
                    sparkline: 'false',
                    price_change_percentage: '24h,7d,30d',
                }
            }).then(response => {
                this.allCoins = this.allCoins.concat(response.data)
                this.loadCoins3()
            })
        },

        loadCoins3: function() {
                axios({
                method: 'get',
                url: 'https://api.coingecko.com/api/v3/coins/markets?',
                params: {
                    vs_currency : 'usd',
                    order : 'market_cap_desc',
                    per_page : '250',
                    page : 3,
                    sparkline: 'false',
                    price_change_percentage: '24h,7d,30d',
                }
            }).then(response => {
                this.allCoins = this.allCoins.concat(response.data)
                this.loadCoins4()
            })
        },

        loadCoins4: function() {
                axios({
                method: 'get',
                url: 'https://api.coingecko.com/api/v3/coins/markets?',
                params: {
                    vs_currency : 'usd',
                    order : 'market_cap_desc',
                    per_page : '250',
                    page : 4,
                    sparkline: 'false',
                    price_change_percentage: '24h,7d,30d',
                }
            }).then(response => {
                this.allCoins = this.allCoins.concat(response.data)
                this.loadmoreCoins()
            })
        },

        loadmoreCoins: function() {
            let i = 4
            while (i < 6) {
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
            }
        },

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
            }
        },


    }, //end of methods

}) // end of vue app
