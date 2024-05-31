const CACHE_NAME = 'b-cache-[[CacheVersion]]';

const staticAssets = [
    "./",
    [[StaticFiles]]

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
