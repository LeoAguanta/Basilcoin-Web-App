angular.module('app')

.provider('services', function () {

    var _ = this;

    _.Encryption = {
        Key: null, Salt: null, IP: null, Epoch: null, UID: null
    }


    _.GenerateToken = function () {

        var ticks = new Date().getTime() / 1e3 | 0;

        var enc1 = [_.Encryption.UID, _.Encryption.IP, ticks].join(':');
        var hash = NickCrypt.Encrypt(enc1, _.Encryption.Key, _.Encryption.Salt);

        return _.Base64Encode(hash);
    }

    _.EncryptData = function (name, obj) {

        var k = JSON.stringify(obj || {});
        k = NickCrypt.Encrypt(k, _.Encryption.Key, _.Encryption.Salt);

        var j = _.GenerateToken();

        return {
            Key: j,
            Data: k
        }
    };

    _.Base64Decode = function (str, encoding) {
        if (encoding == null || encoding == undefined) { encoding = 'utf-8' }
        var bytes = base64js.toByteArray(str);
        return new (TextDecoder || TextDecoderLite)(encoding).decode(bytes);
    }

    _.Base64Encode = function (str, encoding) {
        if (encoding == null || encoding == undefined) { encoding = 'utf-8' }
        var bytes = new (TextEncoder || TextEncoderLite)(encoding).encode(str);
        return base64js.fromByteArray(bytes);
    }



    return {
        $get: ['$http', '$q', function ($http, $q) {
            return {

                SetEncryption: function (token) {
                    var ndec = _.Base64Decode(token);
                    var jdec = ndec.split(':');
                    var nKey = LZString.decompressFromUTF16(jdec[2]);
                    var nPass = LZString.decompressFromUTF16(jdec[3]);

                    //test token if valid
                    var nData = NickCrypt.Decrypt(jdec[4], nKey, nPass);

                    if (nData == null)
                        throw new Error('Invalid Token');

                    var gData = nData.split(':');

                    _.Encryption = {
                        Key: nKey,
                        Salt: nPass,
                        IP: gData[0],
                        Epoch: gData[1],
                        UID: jdec[0]
                    }
                },
                Post: (function (name, param, disableInterceptor) {
                    var def = $.Deferred();

                    var hash = _.EncryptData(name, param);

                    var req = {

                        url: '/api/Action/' + name,
                        method: "POST",
                        data: encodeURI(LZString.compressToBase64(hash.Data)),
                        disableInterceptor: (disableInterceptor == undefined ? false : disableInterceptor),
                        dataType: "application/json",
                        headers: { "api-key": hash.Key }
                    }

                    $http(req).then(function (d) {
                        try {
                            def.resolve(d.data);

                        } catch (e) {
                            def.reject(e);

                        }
                    });

                    return def.promise();
                }),
                Get: (function (name, param, disableInterceptor) {
                    var def = $.Deferred();

                    var urlParam = [];


                    Enumerable.From(param).ForEach(function (d,i) {

                        urlParam.push(d.Key + "=" + encodeURI(LZString.compressToBase64(_.EncryptData(name, d.Value).Data)));

                    });

                    console.log('param', urlParam.join("&"));
                    
                    var req = {

                        url: '/api/Action/' + name + "?" + urlParam.join("&"),
                        method: "GET",
                        data: null,
                        disableInterceptor: (disableInterceptor == undefined ? false : disableInterceptor),
                        dataType: "application/json",
                        headers: { "api-key": _.Encryption.Key }
                    }

                    $http(req).then(function (d) {
                        try {
                            def.resolve(d.data);

                        } catch (e) {
                            def.reject(e);

                        }
                    });

                    return def.promise();
                })

            }
        }]
    }
});



//(function () {

//    'use strict';
//    define(['app'], function (app) {

//        app.provider('services', function () {

//            var _ = this;

//            _.Encryption = {
//                Key: null, Salt: null, IP: null, Epoch: null, UID: null
//            }


//            _.GenerateToken = function () {

//                var ticks = new Date().getTime() / 1e3 | 0;

//                var enc1 = [_.Encryption.UID, _.Encryption.IP, ticks].join(':');
//                var hash = NickCrypt.Encrypt(enc1, _.Encryption.Key, _.Encryption.Salt);

//                return _.Base64Encode(hash);
//            }

//            _.EncryptData = function (name, obj) {

//                var k = JSON.stringify(obj || {});
//                k = NickCrypt.Encrypt(k, _.Encryption.Key, _.Encryption.Salt);

//                var j = _.GenerateToken();

//                return {
//                    Key: j,
//                    Data: k
//                }
//            };

//            _.Base64Decode = function (str, encoding) {
//                if (encoding == null || encoding == undefined) { encoding = 'utf-8' }
//                var bytes = base64js.toByteArray(str);
//                return new (TextDecoder || TextDecoderLite)(encoding).decode(bytes);
//            }

//            _.Base64Encode = function (str, encoding) {
//                if (encoding == null || encoding == undefined) { encoding = 'utf-8' }
//                var bytes = new (TextEncoder || TextEncoderLite)(encoding).encode(str);
//                return base64js.fromByteArray(bytes);
//            }

            

//            return {
//                $get: ['$http', '$q', function ($http, $q) {
//                    return {

//                        SetEncryption: function (token) {
//                            var ndec = _.Base64Decode(token);
//                            var jdec = ndec.split(':');
//                            var nKey = LZString.decompressFromUTF16(jdec[2]);
//                            var nPass = LZString.decompressFromUTF16(jdec[3]);

//                            //test token if valid
//                            var nData = NickCrypt.Decrypt(jdec[4], nKey, nPass);

//                            if (nData == null)
//                                throw new Error('Invalid Token');

//                            var gData = nData.split(':');

//                            _.Encryption = {
//                                Key: nKey,
//                                Salt: nPass,
//                                IP: gData[0],
//                                Epoch: gData[1],
//                                UID: jdec[0]
//                            }
//                        },
//                        Post: (function (name, param, disableInterceptor) {
//                            var def = $.Deferred();

//                            var hash = _.EncryptData(name, param);

//                            var req = {

//                                url: '/api/Action/' + name,
//                                method: "POST",
//                                data: encodeURI(LZString.compressToBase64(hash.Data)),
//                                disableInterceptor: (disableInterceptor == undefined ? false : disableInterceptor),
//                                dataType: "application/json",
//                                headers: { "api-key": hash.Key }
//                            }

//                            $http(req).then(function (d) {
//                                try {
//                                    def.resolve(d.data);

//                                } catch (e) {
//                                    def.reject(e);

//                                }
//                            });

//                            return def.promise();
//                        })
                        
//                    }
//                }]
//            }
//        });
//    });
//}());

