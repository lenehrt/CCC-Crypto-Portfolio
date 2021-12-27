const vm = new Vue({
    el: "#app",
    delimiters: ['[[', ']]'],

    data: {
        newsArt: [],
    },

    methods: {

        loadNews: function() {
                axios({
                method: 'get',
                url: 'https://cryptonews-api.com/api/v1?tickers=BTC&items=50&token=vefhozbuea8mqx3ehlr4wjkr2i1hmwwpyffkgseb',
            }).then(response => {
                this.newsArt = this.newsArt.concat(response.data.data)
                
            })
        },

    },

    created: function(){
        this.loadNews()
    },

})
