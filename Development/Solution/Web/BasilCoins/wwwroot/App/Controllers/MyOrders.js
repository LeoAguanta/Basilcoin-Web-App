angular.module('app')
    .controller('MyOrders', ['$scope', '$rootScope', '$controller', function ($s, $rs, $c) {
        $c('BaseController', { $scope: $rs });

        $s.MyOrders = [
            {
                ID: 1, OrderRef: 'OR-13257A45768', Date: 'Apr. 05, 2020', PaymentRef: 'P-0012323', Status: 'Shipped', DeliveryAddress: '1010 Easy St., Ottawa City, Ontario, K1A 0B1', PaymentMethod: 'Paypal', ShippingFee: 0, Subtotal: 123, Total: 900,
                Products: [
                    { name: '2016 Canada $20 Four-Leaf Clover Fine Silver Coin (TAX Exempt)', image: 'uq_item_1.jpg', stock: 28, price: 79.95, priceBefore: 106.60, qty: 1 },
                    { name: '2016 Australia $30 Year of the Monkey Kilo Fine Silver (No Tax) Impaired Capsule', image: 'uq_item_2.jpg', stock: 1, price: 801.40, priceBefore: 106.60, qty: 1 },
                    { name: '2016 Australia $30 Year of the Monkey Kilo Fine Silver (No Tax) Impaired Capsule', image: 'uq_item_3.jpg', stock: 1, price: 801.40, priceBefore: 106.60, qty: 1 },
                    { name: '2016 Australia $30 Year of the Monkey Kilo Fine Silver (No Tax) Impaired Capsule', image: 'uq_item_4.jpg', stock: 1, price: 801.40, priceBefore: 106.60, qty: 1 }
                ]
            },
            {
                ID: 2, OrderRef: 'OR-45567A45763', Date: 'Apr. 01, 2020', PaymentRef: 'P-0015534', Status: 'Shipped', DeliveryAddress: '1010 Easy St., Ottawa City, Ontario, K1A 0B1', PaymentMethod: 'Paypal', ShippingFee: 0, Subtotal: 123, Total: 900,
                Products: [
                    { name: '2017 Australia $30 Kookaburra Kilo Fine Silver (No Tax) Impaired Capsule', image: 'uq_item_5.jpg', stock: 3, price: 43.00, priceBefore: 106.60, qty: 1 },
                    { name: '2017 Australia $30 Kookaburra Kilo Fine Silver (No Tax) Impaired Capsule', image: 'uq_item_6.jpg', stock: 3, price: 43.00, priceBefore: 106.60, qty: 1 }
                ]
            }
        ]

        $s.Init = function () {
            //Initialize
        }

        $s.Init();

    }]);