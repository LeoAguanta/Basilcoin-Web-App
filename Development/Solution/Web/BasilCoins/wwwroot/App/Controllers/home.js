angular.module('app')
.controller('Home', ['$scope', '$state', '$rootScope','$controller', function ($s, $st, $rs,$c) {
    $c('BaseController', { $scope: $s });

    new WOW().init();
    
    $('#crsl').carousel();

    $s.deals = [
        { title: 'Deal of the day', image: 'deal_4.jpg', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
        { title: 'Gift Ideas', image: 'deal_2.jpg', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
        { title: 'Blowout Specials', image: 'deal_1.jpg', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
        { ID: 1, Name: 'One of a kind 20 OFF SALE', title: 'One of a kind 20% OFF Sale', image: 'deal_3.jpg', description: 'Every day @7:00 PM EST' },
    ]

    $s.collections = [
        { ID: 1, name: 'World Coins', image: 'world_coin.png', count: 4 },
        { ID: 2, name: 'Canadian Coins', image: 'canadian_coin.png', count: 4 },
        { ID: 3, name: 'USA Coins', image: 'usa_coin.png', count: 4 },
        { ID: 4, name: 'Royal Mint Coins', image: 'royal_mint.png', count: 4 },
        { ID: 5, name: 'Gold, Silver, and Copper', image: 'gold_silver.png', count: 4 },
        { ID: 6, name: 'Bullion', image: 'bullion.png', count: 4 },
        { ID: 7, name: 'Paper Money', image: 'paper_money.png', count: 4 },
        { ID: 8, name: 'Coin Supplies', image: 'coin_supplies.png', count: 4 },
    ]

    $s.UniqueDeals = [
        { ID: 1, name: 'New Unique Listed This Week', image: 'uq_1.jpg', count: 4 },
        { ID: 2, name: 'Deals on Canadian Paper Money', image: 'uq_2.jpg', count: 4 },
        { ID: 3, name: 'World Coins, Paper Money, and Sets', image: 'uq_3.jpg', count: 4 },
        { ID: 4, name: 'Miscellaneous (Including Silver/Gold Bullion)', image: 'uq_4.jpg', count: 4 },
        { ID: 5, name: 'Tokens, Medals, and Medallions', image: 'uq_5.jpg', count: 4 },
        { ID: 6, name: 'USA Coins, Paper Money and Sets', image: 'uq_6.jpg', count: 4 },
        { ID: 7, name: 'Eestate/Bulk Lots', image: 'uq_7.jpg', count: 4 },
        { ID: 8, name: 'Rolls of Coins', image: 'uq_8.jpg', count: 4 },
        { ID: 9, name: 'Coin Supplies', image: 'uq_9.jpg', count: 4 },
        { ID: 10, name: 'Supplies', image: 'uq_10.jpg', count: 4 },
        { ID: 11, name: 'Canadian Coins', image: 'uq_10.jpg', count: 4 },
    ]

    $s.recommended = [
        { name: '1999 USA Statehood Quarter', image: 'coin_1.png', stock: 28, price: 9.99 },
        { name: '1999-D USA Statehood Quarter - Connecticut', image: 'coin_2.png', stock: 28, price: 9.99 },
        { name: '1999-D USA Statehood Quarter - Delaware', image: 'coin_3.png', stock: 28, price: 9.99 },
        { name: '1999-D USA Statehood Quarter - Georgia', image: 'coin_4.png', stock: 28, price: 9.99 },
        { name: '1999-D USA Statehood Quarter - Maryland', image: 'coin_5.png', stock: 28, price: 9.99 },
        { name: '1999-D USA Statehood Quarter - New Jersey', image: 'coin_6.png', stock: 0, price: 9.99 },
        { name: '2000-D USA Statehood Quarter - Maryland', image: 'coin_7.png', stock: 28, price: 9.99 },
        { name: '2000-D USA Statehood Quarter - Massachusetts', image: 'coin_8.png', stock: 28, price: 9.99 },
        { name: '2000-D USA Statehood Quarter - New Hampshire', image: 'coin_9.png', stock: 28, price: 9.99 },
        { name: '2000-D USA Statehood Quarter - Virginia', image: 'coin_10.png', stock: 0, price: 9.99 },
        { name: '1999 USA Statehood Quarter - Delaware', image: 'coin_1.png', stock: 28, price: 9.99 },
        { name: '1999 USA Statehood Quarter - Connecticut', image: 'coin_2.png', stock: 28, price: 9.99 },
    ]

    $s.Show = function () {
        $s.Prompt('', 'Prompt Dialog', 'error');
    }

    $s.GoToCategory = function () {
        $st.go('Main.Categories');
    }

    $s.Deals = function (_deal) {

        $st.go('Main.UniqueDeals');

    }

    $s.Login = function () {
        $st.go('Login');
    }

    $s.TestMethod = function () {

        var param = {
            ID: 1,
            Name: 'TestName'
        }

        $s.GETRequest('Test', param).then(function (r) {

            console.log('result', r);

            $s.ComputerUsers = r.result;
            $s.$apply();
        });

    }

   //$s.TestMethod()

    $s.login = function () {


        $st.go('login');
    }

}]);
//'use strict'
//define(['app'], function (app) {
//    app.register.controller('Home', ['$scope', '$state', '$rootScope', function ($s,$st, $rs) {

//        new WOW().init();

//        $('#crsl').carousel();

//        $s.deals = [
//            //{ title: 'Deal of the day', image: 'deal_4.jpg', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
//            //{ title: 'Gift Ideas', image: 'deal_2.jpg', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
//            //{ title: 'Blowout Specials', image: 'deal_1.jpg', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
//            { ID: 1, Name: 'One of a kind 20 OFF SALE', title: 'One of a kind 20% OFF Sale', image: 'deal_3.jpg', description: 'Every day @7:00 PM EST' },
//        ]

//        $s.collections = [
//            { ID: 1,name: 'World Coins', image: 'world_coin.png', count: 4 },
//            { ID: 2,name: 'Canadian Coins', image: 'canadian_coin.png', count: 4 },
//            { ID: 3,name: 'USA Coins', image: 'usa_coin.png', count: 4 },
//            { ID: 4,name: 'Royal Mint Coins', image: 'royal_mint.png', count: 4 },
//            { ID: 5,name: 'Gold, Silver, and Copper', image: 'gold_silver.png', count: 4 },
//            { ID: 6,name: 'Bullion', image: 'bullion.png', count: 4 },
//            { ID: 7,name: 'Paper Money', image: 'paper_money.png', count: 4 },
//            { ID: 8,name: 'Coin Supplies', image: 'coin_supplies.png', count: 4 },
//        ]

//        $s.UniqueDeals = [
//            { ID: 1, name: 'NEW UNIQUE LISTED THIS WEEK', image: 'uq_1.jpg', count: 4 },
//            { ID: 2, name: 'DEALS ON CANADIAN PAPER MONEY', image: 'uq_2.jpg', count: 4 },
//            { ID: 3, name: 'WORLD COINS, PAPER MONEY, AND SETS', image: 'uq_3.jpg', count: 4 },
//            { ID: 4, name: 'MISCELLANEOUS (INCLUDING SILVER/GOLD BULLION)', image: 'uq_4.jpg', count: 4 },
//            { ID: 5, name: 'TOKENS, MEDALS, AND MEDALLIONS', image: 'uq_5.jpg', count: 4 },
//            { ID: 6, name: 'USA COINS, PAPER MONEY AND SETS', image: 'uq_6.jpg', count: 4 },
//            { ID: 7, name: 'ESTATE/BULK LOTS', image: 'uq_7.jpg', count: 4 },
//            { ID: 8, name: 'ROLLS OF COINS', image: 'uq_8.jpg', count: 4 },
//            { ID: 9, name: 'Coin Supplies', image: 'uq_9.jpg', count: 4 },
//            { ID: 10, name: 'SUPPLIES', image: 'uq_10.jpg', count: 4 },
//            { ID: 11, name: 'Canadian Coins', image: 'uq_10.jpg', count: 4 },

//        ]

//        $s.recommended = [
//            { name: '1999 USA Statehood Quarter', image: 'coin_1.png', stock: 28, price: 9.99 },
//            { name: '1999-D USA Statehood Quarter - Connecticut', image: 'coin_2.png', stock: 28, price: 9.99 },
//            { name: '1999-D USA Statehood Quarter - Delaware', image: 'coin_3.png', stock: 28, price: 9.99 },
//            { name: '1999-D USA Statehood Quarter - Georgia', image: 'coin_4.png', stock: 28, price: 9.99 },
//            { name: '1999-D USA Statehood Quarter - Maryland', image: 'coin_5.png', stock: 28, price: 9.99 },
//            { name: '1999-D USA Statehood Quarter - New Jersey', image: 'coin_6.png', stock: 0, price: 9.99 },
//            { name: '2000-D USA Statehood Quarter - Maryland', image: 'coin_7.png', stock: 28, price: 9.99 },
//            { name: '2000-D USA Statehood Quarter - Massachusetts', image: 'coin_8.png', stock: 28, price: 9.99 },
//            { name: '2000-D USA Statehood Quarter - New Hampshire', image: 'coin_9.png', stock: 28, price: 9.99 },
//            { name: '2000-D USA Statehood Quarter - Virginia', image: 'coin_10.png', stock: 0, price: 9.99 },
//            { name: '1999 USA Statehood Quarter - Delaware', image: 'coin_1.png', stock: 28, price: 9.99 },
//            { name: '1999 USA Statehood Quarter - Connecticut', image: 'coin_2.png', stock: 28, price: 9.99 },
//        ]


//        $s.Deals = function (_deal) {

//            $st.go('Main.UniqueDeals');
            
//        }

//        $s.Login = function () {


//            $st.go('Login');
//        }

//        $s.TestMethod = function () {
            
//            $s.request('Test', { ID_Persona: 135 }).then(function (r) {

//                if (r.status == 3) {
//                    console.log('res', r);
//                    return;
//                }
//            });

//        }

//        $s.login = function () {

            
//            $st.go('login');
//        }

//    }]);
//});