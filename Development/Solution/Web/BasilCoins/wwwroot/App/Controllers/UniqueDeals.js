angular.module('app')
    .controller('UniqueDeals', ['$scope', '$state', '$rootScope', function ($s, $st, $rs) {
        $s.ShowFilter = false;
        new WOW().init();

        //$s.MainTitle = 'Basils Coins';
        $('.main-header').addClass('scrolled-down')
        $('.mhl-menu-container').addClass('scrolled-down')

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

        $s.DetailName = $s.UniqueDeals[0].name; 0


        $s.Products = [
            { ID: 1, name: '2016 Canada $20 Four-Leaf Clover Fine Silver Coin (TAX Exempt)', image: 'uq_item_1.jpg', stock: 28, price: 79.95 },
            { ID: 2, name: '2016 Australia $30 Year of the Monkey Kilo Fine Silver (No Tax) Impaired Capsule', image: 'uq_item_2.jpg', stock: 1, price: 801.40 },
            { ID: 3, name: '2017 Australia $30 Kookaburra Kilo Fine Silver (No Tax) Impaired Capsule', image: 'uq_item_3.jpg', stock: 3, price: 43.00 },
            { ID: 4, name: 'Pair of 2018 & 2019 Zombucks Animals 1oz .999 Silver Coins, 2Pcs (No Tax) Scuffed', image: 'uq_item_4.jpg', stock: 0, price: 69.95 },
            { ID: 5, name: 'Group Lot of 2019 Zombucks Figures 1oz .999 Silver Coins, 3PCs (No Tax) Scuffed', image: 'uq_item_5.jpg', stock: 0, price: 99.95 },
            { ID: 6, name: 'Lot of 2017 & 2018 Zombucks Effigies 1oz .999 Silver Coins, 3Pcs (No Tax) Scuffed', image: 'uq_item_6.jpg', stock: 1, price: 99.95 },
            { ID: 7, name: 'PAMP Suisse 1g .9995 Platinum Lady Fortuna Bar in Original Package (No Tax)', image: 'uq_item_7.jpg', stock: 0, price: 79.00 },
            { ID: 8, name: 'Turkey Istanbul Refinery 5g .999 Gold Bar in Original Package (No Tax)', image: 'uq_item_8.jpg', stock: 0, price: 371.75 },
            { ID: 9, name: '2011 China 1/10oz .999 Gold Panda (No Tax)', image: 'uq_item_9.jpg', stock: 0, price: 244.34 },
            { ID: 10, name: '1986 Canada $10 1/4oz .999 Gold Maple Leaf (No Tax)', image: 'uq_item_10.jpg', stock: 0, price: 578.36 },
            { ID: 11, name: 'Pair of Gold Nuggets, Approximately 1.22g Total', image: 'uq_item_11.jpg', stock: 0, price: 109.00 },
            { ID: 12, name: '1859 Canada Large Cent, Narrow 9, Rotated Die 45 Degrees, Very Fine (VF-20)', image: 'uq_item_12.jpg', stock: 0, price: 25.00 },
        ]

        $s.Detail = function (c) {

            $s.DetailName = c.name;
            $s.Products = [];

            $s.Products = [
                { ID: 1, name: '2016 Canada $20 Four-Leaf Clover Fine Silver Coin (TAX Exempt)', image: 'uq_item_1.jpg', stock: 28, price: 79.95 },
                { ID: 2, name: '2016 Australia $30 Year of the Monkey Kilo Fine Silver (No Tax) Impaired Capsule', image: 'uq_item_2.jpg', stock: 1, price: 801.40 },
                { ID: 3, name: '2017 Australia $30 Kookaburra Kilo Fine Silver (No Tax) Impaired Capsule', image: 'uq_item_3.jpg', stock: 3, price: 43.00 },
                { ID: 4, name: 'Pair of 2018 & 2019 Zombucks Animals 1oz .999 Silver Coins, 2Pcs (No Tax) Scuffed', image: 'uq_item_4.jpg', stock: 0, price: 69.95 },
                { ID: 5, name: 'Group Lot of 2019 Zombucks Figures 1oz .999 Silver Coins, 3PCs (No Tax) Scuffed', image: 'uq_item_5.jpg', stock: 0, price: 99.95 },
                { ID: 6, name: 'Lot of 2017 & 2018 Zombucks Effigies 1oz .999 Silver Coins, 3Pcs (No Tax) Scuffed', image: 'uq_item_6.jpg', stock: 1, price: 99.95 },
                { ID: 7, name: 'PAMP Suisse 1g .9995 Platinum Lady Fortuna Bar in Original Package (No Tax)', image: 'uq_item_7.jpg', stock: 0, price: 79.00 },
                { ID: 8, name: 'Turkey Istanbul Refinery 5g .999 Gold Bar in Original Package (No Tax)', image: 'uq_item_8.jpg', stock: 0, price: 371.75 },
                { ID: 9, name: '2011 China 1/10oz .999 Gold Panda (No Tax)', image: 'uq_item_9.jpg', stock: 0, price: 244.34 },
                { ID: 10, name: '1986 Canada $10 1/4oz .999 Gold Maple Leaf (No Tax)', image: 'uq_item_10.jpg', stock: 0, price: 578.36 },
                { ID: 11, name: 'Pair of Gold Nuggets, Approximately 1.22g Total', image: 'uq_item_11.jpg', stock: 0, price: 109.00 },
                { ID: 12, name: '1859 Canada Large Cent, Narrow 9, Rotated Die 45 Degrees, Very Fine (VF-20)', image: 'uq_item_12.jpg', stock: 0, price: 25.00 },
            ]

            setTimeout(function () {


                $s.$apply();
            }, 50)

        }

        $s.ViewProduct = function (ID_Products) {
            $st.go('Main.ProductDetail', { id: ID_Products });
        }

        $s.ToggleFilter = function () {
            $s.ShowFilter = !$s.ShowFilter;
        }

        $s.CloseFilter = function () {
            $s.ShowFilter = false;
        }

    }]);