angular.module('app')

.controller('ProductDetail', ['$scope', '$rootScope', '$stateParams', '$controller', function ($s, $rs, $param, $c) {
    $c('BaseController', { $scope: $rs });
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

    $s.Init = function () {
        $s.Product = Enumerable.From($s.Products).Where(function (x) { return x.ID == $param.id; }).SingleOrDefault();

        $(document).ready(function () {
            angular.forEach($s.Product.gallery, function (key, value) {
                $('#ci-' + value + ' img')
                    .wrap('<span style="display:inline-block"></span>')
                    .css('display', 'block')
                    .parent()
                    .zoom({
                        url: '../../Assets/Images/Products/' + key.FileName,
                        magnify: 3,
                        touch: true
                    });
            })
        });

    }

    $s.SetActiveThumb = function (idx) {
        $('.thumb').removeClass('active');
        $('#thumb-' + idx).addClass('active');
    }

    $s.Init();

    $s.AddToCart = function () {
        $s.CartAnimate();
    }

    $s.CartAnimate = function () {
        var img_drag = $('.carousel-item.active img').eq(0);
        var cart_icon = $('.mh-menu-item.cart');
        var img_clone = img_drag.clone()
            .offset({
                top: img_drag.offset().top,
                left: img_drag.offset().left
            })
            .css({
                'opacity': '0.5',
                'position': 'absolute',
                'height': '330px',
                'width': '330px',
                'z-index': '999',
                'background-repeat': 'no-repeat',
                'object-fit': 'contain',
                'object-position': 'center'
            })
            .appendTo($('body'))
            .animate({
                'top': cart_icon.offset().top + 10,
                'left': cart_icon.offset().left + 10,
                'width': 16,
                'height': 16,
                'z-index': '999',
                'background-repeat': 'no-repeat',
                'object-fit': 'contain',
                'object-position': 'center'
            }, 1000);
        img_clone.animate({
            'width': 0,
            'height': 0
        }, function () {
            $(this).detach()
        });
    }

}]);