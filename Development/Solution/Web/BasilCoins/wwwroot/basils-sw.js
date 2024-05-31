const CACHE_NAME = 'b-cache-_v1.0.0.0';

const staticAssets = [
    "./",
    './index.html','./Dialogs/Confirm.tmpl.html','./Dialogs/Prompt.tmpl.html','./Templates/EmailVerification.tmpl.html','./Templates/footer.tmpl.html','./Templates/OrderSummary.tmpl.html','./Templates/overlayLoading.tmpl.html','./App/Views/CartItems.html','./App/Views/Categories.html','./App/Views/CheckOut.html','./App/Views/home.html','./App/Views/Login.html','./App/Views/Main.html','./App/Views/MyAccount.html','./App/Views/MyOrders.html','./App/Views/ProductDetail.html','./App/Views/UniqueDeals.html','./Assets/banners/banner_1.jpg','./Assets/banners/banner_2.jpg','./Assets/banners/banner_3.jpg','./Assets/banners/banner_4.jpg','./Assets/Images/coins_bg.jpg','./Assets/Images/coins_bgxx.jpg','./Assets/Images/Categories/uq_1.jpg','./Assets/Images/Categories/uq_10.jpg','./Assets/Images/Categories/uq_2.jpg','./Assets/Images/Categories/uq_3.jpg','./Assets/Images/Categories/uq_4.jpg','./Assets/Images/Categories/uq_5.jpg','./Assets/Images/Categories/uq_6.jpg','./Assets/Images/Categories/uq_7.jpg','./Assets/Images/Categories/uq_8.jpg','./Assets/Images/Categories/uq_9.jpg','./Assets/Images/Deals/deal_1.jpg','./Assets/Images/Deals/deal_2.jpg','./Assets/Images/Deals/deal_3.jpg','./Assets/Images/Deals/deal_4.jpg','./Assets/Images/Products/uq_item_1.jpg','./Assets/Images/Products/uq_item_10.jpg','./Assets/Images/Products/uq_item_11.jpg','./Assets/Images/Products/uq_item_12.jpg','./Assets/Images/Products/uq_item_2.jpg','./Assets/Images/Products/uq_item_3.jpg','./Assets/Images/Products/uq_item_4.jpg','./Assets/Images/Products/uq_item_5.jpg','./Assets/Images/Products/uq_item_6.jpg','./Assets/Images/Products/uq_item_7.jpg','./Assets/Images/Products/uq_item_8.jpg','./Assets/Images/Products/uq_item_9.jpg','./Assets/Images/SubCategories/sc_1.jpg','./Assets/Images/SubCategories/sc_2.jpg','./Assets/Images/SubCategories/sc_3.jpg','./Assets/Images/SubCategories/sc_4.jpg','./Assets/Images/SubCategories/sc_5.jpg','./Assets/Images/SubCategories/sc_6.jpg','./Assets/Images/SubCategories/sc_7.jpg','./Assets/Images/logo.png','./Assets/Images/logo_2.png','./Assets/Images/logo_white.png','./Assets/Images/logo_white_4x.png','./Assets/Images/Collections/bullion.png','./Assets/Images/Collections/canadian_coin.png','./Assets/Images/Collections/coin_supplies.png','./Assets/Images/Collections/gold_silver.png','./Assets/Images/Collections/paper_money.png','./Assets/Images/Collections/royal_mint.png','./Assets/Images/Collections/usa_coin.png','./Assets/Images/Collections/world_coin.png','./Assets/Images/Footer/bbb_logo.png','./Assets/Images/Footer/mastercard_logo.png','./Assets/Images/Footer/paypal_logo.png','./Assets/Images/Footer/visa_logo.png','./Assets/Images/icons/icon-128x112.png','./Assets/Images/icons/icon-144x126_old.png','./Assets/Images/icons/icon-144x144.png','./Assets/Images/icons/icon-152x133.png','./Assets/Images/icons/icon-192x168.png','./Assets/Images/icons/icon-384x336.png','./Assets/Images/icons/icon-512x448.png','./Assets/Images/icons/icon-72x63.png','./Assets/Images/icons/icon-96x84.png','./Assets/Images/Products/coin_1.png','./Assets/Images/Products/coin_10.png','./Assets/Images/Products/coin_2.png','./Assets/Images/Products/coin_3.png','./Assets/Images/Products/coin_4.png','./Assets/Images/Products/coin_5.png','./Assets/Images/Products/coin_6.png','./Assets/Images/Products/coin_7.png','./Assets/Images/Products/coin_8.png','./Assets/Images/Products/coin_9.png','./favicon.ico'

]


self.addEventListener('install', async event => {

    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(staticAssets);

        })
        .then(function (e) {
            return self.skipWaiting();
        })
    );
});

self.addEventListener('fetch', async event => {

    event.respondWith(
        caches.open(CACHE_NAME).then(function (cache) {

            return cache.match(event.request).then(function (cacheResponse) {
                var fetchPromise = fetch(event.request).then(function (netResponse) {

                    cache.put(event.request, netResponse.clone());
                    return netResponse;

                })

                return cacheResponse || fetchPromise;

            })

           
        })
    );
});

self.addEventListener('activate', function (event) {

    event.waitUntil(

        caches.keys().then(function (names) {

            return Promise.all(
                names.filter(function (name) {

                    if (name !== CACHE_NAME) {

                        return true
                    } else {

                        return false
                    }

                }).map(function (name) {

                    return caches.delete(name)
                })
            )


        })

    );

});



//self.addEventListener('message', function (event) {
//    if (event.data.action === 'skipWaiting') {
//        console.log('updatating service worker..');
//        self.skipWaiting();
//    }
//});
