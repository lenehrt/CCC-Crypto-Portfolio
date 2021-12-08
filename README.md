Crypto CopyCat

My project is a website application where Users can create personalized accounts connecting their Smart Contract Wallets. The app will allow users to see all crypto coins associated with each connected wallet in their account and compare their investments with other crypto wallets. The goal is to help users compare their investments with other crypto wallets and copy professional traders' strategies. 

The project will use Django Rest Framework to create a database allowing the user to create a user interface account and save/recycle information on the database. With Vue.js, the web app will send API requests to the database and connect users to their accounts. Using the power of Web3, the Vue.js will collect data from the web browser ETH wallet (MetaMask) and allow users to enter wallet addresses manually. The Vue.js will send API requests to ZAPPER.fi and download data from the user imputed wallet with the wallet address. An API request to CoinGecko the app will collect USD prices for each coin. The HTML will display all coins available in the wallet multiplied by the USD dollar value.  The same process will happen to all wallets addresses requested by the user.

The website will start with a Login page. The user will need to log in or create an account. A MetaMask wallet connects button will appear if it is the first-time user access page.

Dashboard:
displays user's coins (choice of blockchain)
displays user's net worth
drop drow menu

Compare wallets:
allow the user to choose wallets to compare
input wallets address filled
displays coins and transactions 

Coins news:
displays data graph information about each coin user chooses

Stake:
displays stake and links websites options to stake coins
