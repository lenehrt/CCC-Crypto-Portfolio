CryptoWallet
by Leonardo De Oliveira (Lenehrt)

My project is a website application where users can access their Etherium Wallets. The app will allow users to see all crypto coins and transactions associated with each connected Etherium based wallet in their account. The app will also provide data and information about the top crypto markets. The goal is to help users access updated investments information in one place, allowing them to make their investment decisions based on the latest trends and news.

The project will use Django Rest Framework to create a database allowing the user to create a user interface account. Using Vue.js, the application will collect data from the web browser ETH wallet (MetaMask). The Vue.js will send API requests to ZAPPER.fi and download data from the user imputed wallet with the wallet address. The HTML will display all coins available in the wallet multiplied by the USD dollar value. An API request to CoinGecko will collect updated USD prices for each currency.

The website will start with a Login page. The user will need to log in or create an account. A MetaMask wallet connects button will appear on the first-time user access page.

Website Display:

	Enter Page:
		* Users have the option to log in or sign up;
		* If logged in already, skip to the homepage.

	Homepage (Dashboard):
		* Displays logged in user name;
		* Drop drow menu with logout option;
		* Displays user's total net worth;

			Before wallet Connected
				* Display navbar: 
					* Button to connect ETH wallet;
					* Link to Dashboard;
					* Link to Market;
					* Link to News.

			After wallet Connected
				* Display navbar: 
					* Disable button to connect ETH wallet;
					* Link to Dashboard;
					* Link to Market;
					* Link to News.
				* Display user wallet address;
				* Display Coins available in ETH wallet;
				* Display Skated coins in vaults;
				* Display total value in each network;
				* Display history transactions recorded in ETH wallet.

	Market:
		* Display a list of the top 2000 coins;
		* Linked to each token on CoinGecko for more information;
		* Search bar;
		* Display a list of the top 7 trending coins in the past 24h.

	News:
		* Display trending recent blog news on Bitcoins and other cryptos.
		* Linked to articles.

Production Schedule:

	Week 1
		* Start a project with Django;
		* Create user login/sign-up using Rest;
		* Research on MetaMask relation with browsers;
		* Research on Zapper API requests and responses;
		* Write methods to get and store user wallet address from MetaMask.

	Week 2
		* Write methods to get API responses from Zapper API using AXIUS.
		* Flatting data from Zapper and organized into arrays to display on the application.
		* Build the HTML for the homepage.
		* Build user and login argument statements on the homepage.
		* Build the design CSS using BootStrap;
		* Test, Improve, and consolidate JavaScript and HMTL;

	Week 3
		* Build market page;
		* Use AXIUS to get API calls from CoinGecko;
		* Build search engine for the website.
		* CSS and BootStrap Market page;
		* Build News page;
		* Use AXIUS to get API calls from Crypto news;
		* CSS and BootStrap News page;
		* Test and upload application to Heroku.