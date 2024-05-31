angular.module('app')
.controller('CheckOut', ['$scope', '$rootScope', '$controller', function ($s, $rs, $c) {
    $c('BaseController', { $scope: $rs });
    $s.CartItems = [
        {
            ID: 1, name: '2016 Canada $20 Four-Leaf Clover Fine Silver Coin (TAX Exempt)', image: 'uq_item_1.jpg', stock: 28, price: 79.95, priceBefore: 106.60,
            gallery: [
                { ID: 1, FileName: 'uq_item_1.jpg' },
                { ID: 2, FileName: 'uq_item_2.jpg' },
                { ID: 3, FileName: 'uq_item_3.jpg' },
                { ID: 4, FileName: 'uq_item_4.jpg' },
            ]
        },
        {
            ID: 2, name: '2016 Australia $30 Year of the Monkey Kilo Fine Silver (No Tax) Impaired Capsule', image: 'uq_item_2.jpg', stock: 1, price: 801.40, priceBefore: 106.60,
            gallery: [
                { ID: 1, FileName: 'uq_item_1.jpg' },
                { ID: 2, FileName: 'uq_item_2.jpg' },
                { ID: 3, FileName: 'uq_item_3.jpg' },
                { ID: 4, FileName: 'uq_item_4.jpg' },
            ]
        },
        {
            ID: 3, name: '2017 Australia $30 Kookaburra Kilo Fine Silver (No Tax) Impaired Capsule', image: 'uq_item_3.jpg', stock: 3, price: 43.00, priceBefore: 106.60,
            gallery: [
                { ID: 1, FileName: 'uq_item_1.jpg' },
                { ID: 2, FileName: 'uq_item_2.jpg' },
                { ID: 3, FileName: 'uq_item_3.jpg' },
                { ID: 4, FileName: 'uq_item_4.jpg' },
            ]
        }
    ]
    $s.Products = [
        {
            ID: 1, name: '2016 Canada $20 Four-Leaf Clover Fine Silver Coin (TAX Exempt)', image: 'uq_item_1.jpg', stock: 28, price: 79.95, priceBefore: 106.60,
            gallery: [
                { ID: 1, FileName: 'uq_item_1.jpg' },
                { ID: 2, FileName: 'uq_item_2.jpg' },
                { ID: 3, FileName: 'uq_item_3.jpg' },
                { ID: 4, FileName: 'uq_item_4.jpg' },
            ]
        },
        {
            ID: 2, name: '2016 Australia $30 Year of the Monkey Kilo Fine Silver (No Tax) Impaired Capsule', image: 'uq_item_2.jpg', stock: 1, price: 801.40, priceBefore: 106.60,
            gallery: [
                { ID: 1, FileName: 'uq_item_1.jpg' },
                { ID: 2, FileName: 'uq_item_2.jpg' },
                { ID: 3, FileName: 'uq_item_3.jpg' },
                { ID: 4, FileName: 'uq_item_4.jpg' },
            ]
        },
        {
            ID: 3, name: '2017 Australia $30 Kookaburra Kilo Fine Silver (No Tax) Impaired Capsule', image: 'uq_item_3.jpg', stock: 3, price: 43.00, priceBefore: 106.60,
            gallery: [
                { ID: 1, FileName: 'uq_item_1.jpg' },
                { ID: 2, FileName: 'uq_item_2.jpg' },
                { ID: 3, FileName: 'uq_item_3.jpg' },
                { ID: 4, FileName: 'uq_item_4.jpg' },
            ]
        },
        {
            ID: 4, name: 'Pair of 2018 & 2019 Zombucks Animals 1oz .999 Silver Coins, 2Pcs (No Tax) Scuffed', image: 'uq_item_4.jpg', stock: 0, price: 69.95, priceBefore: 106.60,
            gallery: [
                { ID: 1, FileName: 'uq_item_1.jpg' },
                { ID: 2, FileName: 'uq_item_2.jpg' },
                { ID: 3, FileName: 'uq_item_3.jpg' },
                { ID: 4, FileName: 'uq_item_4.jpg' },
            ]
        },
        {
            ID: 5, name: 'Group Lot of 2019 Zombucks Figures 1oz .999 Silver Coins, 3PCs (No Tax) Scuffed', image: 'uq_item_5.jpg', stock: 0, price: 99.95, priceBefore: 106.60,
            gallery: [
                { ID: 1, FileName: 'uq_item_1.jpg' },
                { ID: 2, FileName: 'uq_item_2.jpg' },
                { ID: 3, FileName: 'uq_item_3.jpg' },
                { ID: 4, FileName: 'uq_item_4.jpg' },
            ]
        },
        {
            ID: 6, name: 'Lot of 2017 & 2018 Zombucks Effigies 1oz .999 Silver Coins, 3Pcs (No Tax) Scuffed', image: 'uq_item_6.jpg', stock: 1, price: 99.95, priceBefore: 106.60,
            gallery: [
                { ID: 1, FileName: 'uq_item_1.jpg' },
                { ID: 2, FileName: 'uq_item_2.jpg' },
                { ID: 3, FileName: 'uq_item_3.jpg' },
                { ID: 4, FileName: 'uq_item_4.jpg' },
            ]
        },
        {
            ID: 7, name: 'PAMP Suisse 1g .9995 Platinum Lady Fortuna Bar in Original Package (No Tax)', image: 'uq_item_7.jpg', stock: 0, price: 79.00, priceBefore: 106.60,
            gallery: [
                { ID: 1, FileName: 'uq_item_1.jpg' },
                { ID: 2, FileName: 'uq_item_2.jpg' },
                { ID: 3, FileName: 'uq_item_3.jpg' },
                { ID: 4, FileName: 'uq_item_4.jpg' },
            ]
        },
        {
            ID: 8, name: 'Turkey Istanbul Refinery 5g .999 Gold Bar in Original Package (No Tax)', image: 'uq_item_8.jpg', stock: 0, price: 371.75, priceBefore: 106.60,
            gallery: [
                { ID: 1, FileName: 'uq_item_1.jpg' },
                { ID: 2, FileName: 'uq_item_2.jpg' },
                { ID: 3, FileName: 'uq_item_3.jpg' },
                { ID: 4, FileName: 'uq_item_4.jpg' },
            ]
        },
        {
            ID: 9, name: '2011 China 1/10oz .999 Gold Panda (No Tax)', image: 'uq_item_9.jpg', stock: 0, price: 244.34, priceBefore: 106.60,
            gallery: [
                { ID: 1, FileName: 'uq_item_1.jpg' },
                { ID: 2, FileName: 'uq_item_2.jpg' },
                { ID: 3, FileName: 'uq_item_3.jpg' },
                { ID: 4, FileName: 'uq_item_4.jpg' },
            ]
        },
        {
            ID: 10, name: '1986 Canada $10 1/4oz .999 Gold Maple Leaf (No Tax)', image: 'uq_item_10.jpg', stock: 0, price: 578.36, priceBefore: 106.60,
            gallery: [
                { ID: 1, FileName: 'uq_item_1.jpg' },
                { ID: 2, FileName: 'uq_item_2.jpg' },
                { ID: 3, FileName: 'uq_item_3.jpg' },
                { ID: 4, FileName: 'uq_item_4.jpg' },
            ]
        },
        {
            ID: 11, name: 'Pair of Gold Nuggets, Approximately 1.22g Total', image: 'uq_item_11.jpg', stock: 0, price: 109.00, priceBefore: 106.60,
            gallery: [
                { ID: 1, FileName: 'uq_item_1.jpg' },
                { ID: 2, FileName: 'uq_item_2.jpg' },
                { ID: 3, FileName: 'uq_item_3.jpg' },
                { ID: 4, FileName: 'uq_item_4.jpg' },
            ]
        },
        {
            ID: 12, name: '1859 Canada Large Cent, Narrow 9, Rotated Die 45 Degrees, Very Fine (VF-20)', image: 'uq_item_12.jpg', stock: 0, price: 25.00, priceBefore: 106.60,
            gallery: [
                { ID: 1, FileName: 'uq_item_1.jpg' },
                { ID: 2, FileName: 'uq_item_2.jpg' },
                { ID: 3, FileName: 'uq_item_3.jpg' },
                { ID: 4, FileName: 'uq_item_4.jpg' },
            ]
        },
    ]

    $s.UseDiff = false;

    $s.OtherAddress = function () {
        $s.UseDiff = !$s.UseDiff;
    }
}]);