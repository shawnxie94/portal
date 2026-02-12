/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-35010ecc'], (function (workbox) { 'use strict';

  self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
  });
  workbox.clientsClaim();

  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "logo.svg",
    "revision": "1a8e6bd1f66927a7dcfeb4b22f33ffde"
  }, {
    "url": "assets/tcp-fast-open.html-Bmt0o2C4.js",
    "revision": "11fbf9948ae4f5281fa3e1389ad0a820"
  }, {
    "url": "assets/style-D2uQfNRt.css",
    "revision": "5e837e72af909281cc7858a331d86bb6"
  }, {
    "url": "assets/regex-vis.html-Crue1LC5.js",
    "revision": "4bc0d6eab9a7ef149eb4ce6013a3cec4"
  }, {
    "url": "assets/read-flow.html-CXugQzCk.js",
    "revision": "4ee9f1b668e93452deabb429efb66d73"
  }, {
    "url": "assets/read-code-tools.html-CDPXLG1f.js",
    "revision": "15785723da7210b71241394de8536025"
  }, {
    "url": "assets/plugin-vue_export-helper-DlAUqK2U.js",
    "revision": "25e3a5dcaf00fb2b1ba0c8ecea6d2560"
  }, {
    "url": "assets/picture-manage.html-CrZHOkXK.js",
    "revision": "cdf0d5d561ccf6c48ec1da58ee2d173f"
  }, {
    "url": "assets/photoswipe.esm-BXDdABy_.js",
    "revision": "6c0bf54cf1322dab242c5bb14307d57a"
  }, {
    "url": "assets/one-cmd-web-to-app.html-BFnPIMFV.js",
    "revision": "fde4477a8a036d68b9ad06aec283cefd"
  }, {
    "url": "assets/mac-terminal.html-BoApTKsE.js",
    "revision": "d8d97b726b158d68c2f91035d2d8996d"
  }, {
    "url": "assets/kimi.html-CUe9Lczy.js",
    "revision": "2b0ffed059fa6c7b73cc4b26f29af942"
  }, {
    "url": "assets/ip-exploration.html-ClX9wwtc.js",
    "revision": "42408e44ee39bfd0abfa43a06893b538"
  }, {
    "url": "assets/index.html-z0DOYcPv.js",
    "revision": "ac59c5bc8cc456295bc3eafe185147ae"
  }, {
    "url": "assets/index.html-uq6w6wDF.js",
    "revision": "b161f4e0a373da92ca057595844549f0"
  }, {
    "url": "assets/index.html-mbhYu32J.js",
    "revision": "7078edecddab48e865fff6b8aef56953"
  }, {
    "url": "assets/index.html-hzUJ8osg.js",
    "revision": "09577f1a57e09fe43d091efc847cf320"
  }, {
    "url": "assets/index.html-_blTwhcF.js",
    "revision": "36dff2167adc9aadf42a40e268d5c340"
  }, {
    "url": "assets/index.html-XsUMtq8B.js",
    "revision": "8099c939586c1c20ce0074c2398ecc70"
  }, {
    "url": "assets/index.html-LkbXRSBR.js",
    "revision": "b0a6508cfd33e051d3775dc756255e33"
  }, {
    "url": "assets/index.html-Kk2NFFM-.js",
    "revision": "829f283f5bb2cf48f1a809209e3d2580"
  }, {
    "url": "assets/index.html-FE0Z3tHX.js",
    "revision": "0e86c2997abe874469a3929a53e2b9fb"
  }, {
    "url": "assets/index.html-EVznKwsa.js",
    "revision": "4bd04393f4fa7bfdd42a7cabe060ea41"
  }, {
    "url": "assets/index.html-DpEn4BCl.js",
    "revision": "8372331698560abcfd90723af047c486"
  }, {
    "url": "assets/index.html-D_doGfLp.js",
    "revision": "46f4d3a7e295726dc47c14432fc9f705"
  }, {
    "url": "assets/index.html-DF7N8fHm.js",
    "revision": "64066c21d394b14aed06d452ca82b8a9"
  }, {
    "url": "assets/index.html-D6SFc194.js",
    "revision": "d478eb4cbbbda4e74482bc9568dc8d48"
  }, {
    "url": "assets/index.html-D3b24yLM.js",
    "revision": "b243ad528b8076c492d8b9c76c8a70fb"
  }, {
    "url": "assets/index.html-D17N8Fot.js",
    "revision": "ad7d8366fcb2a9b3be9cd8a182fb8033"
  }, {
    "url": "assets/index.html-CzSbT4eE.js",
    "revision": "09d30c2f1bc1055046eb6571b6351b1f"
  }, {
    "url": "assets/index.html-CpnfOjCu.js",
    "revision": "4cfe84dea65a5dfcc889886a66cb16f4"
  }, {
    "url": "assets/index.html-Cmy2yMNm.js",
    "revision": "ce19e9e1ba48c7f2f9d2ff39e7d830db"
  }, {
    "url": "assets/index.html-ClgAbUs4.js",
    "revision": "459cb2e02d380d7791e8ea8a63e3b83e"
  }, {
    "url": "assets/index.html-ChtsTppg.js",
    "revision": "6e5d008e1db88cc7d34cf988771ea195"
  }, {
    "url": "assets/index.html-C_tBZlry.js",
    "revision": "1141074a70268ab3e7d0be48c6f8ca62"
  }, {
    "url": "assets/index.html-CVhBqoUb.js",
    "revision": "ec96cbd8ad51e7603e272c7e805be380"
  }, {
    "url": "assets/index.html-CV-2Duxy.js",
    "revision": "601f506a8ce5d3b68a66e51af47e8e9f"
  }, {
    "url": "assets/index.html-CTaQoQbz.js",
    "revision": "9ab36969bed14c1bd38319b829812a4a"
  }, {
    "url": "assets/index.html-CRvusbcM.js",
    "revision": "1594e1192dd08a738df37e58c57a4413"
  }, {
    "url": "assets/index.html-CI5mF9Vh.js",
    "revision": "9c21446230b88a5adb5fd49699d5b412"
  }, {
    "url": "assets/index.html-CEQYgL-W.js",
    "revision": "67a6e8978d310a6ff1a257511f20417c"
  }, {
    "url": "assets/index.html-CBlOxmUS.js",
    "revision": "6c236e356b72479be940395f9477224e"
  }, {
    "url": "assets/index.html-C0hNwvdN.js",
    "revision": "69da0af5d03ffb997473536e1672e22f"
  }, {
    "url": "assets/index.html-C07vJmnY.js",
    "revision": "002055fbde0beb2c16682b25d0bc7c53"
  }, {
    "url": "assets/index.html-BwhycVZA.js",
    "revision": "f74624c7fb8b42050b9a2a07c3ff33d5"
  }, {
    "url": "assets/index.html-Bu6bdlDz.js",
    "revision": "27cb4e0fb680900375c4855766f797fd"
  }, {
    "url": "assets/index.html-Btlb1UPv.js",
    "revision": "75d37d052fde431690406c1ca56c8d6d"
  }, {
    "url": "assets/index.html-BqMkXXUG.js",
    "revision": "8f2a364358c626f0f996ee503d223b3a"
  }, {
    "url": "assets/index.html-BoQaKX9r.js",
    "revision": "a2216d5f877e191e008c03d26b4360b8"
  }, {
    "url": "assets/index.html-BltY-e5-.js",
    "revision": "90218dcd8864f7921556a960f97f0cfe"
  }, {
    "url": "assets/index.html-BdpBMvib.js",
    "revision": "140a5fe023e6aa32da7413a293b20455"
  }, {
    "url": "assets/index.html-BdhnmBNq.js",
    "revision": "c694a0d1b5ee50781a51dba4b3bfd850"
  }, {
    "url": "assets/index.html-BbXr8STH.js",
    "revision": "bda16c3c5cec411eb464631616deafd3"
  }, {
    "url": "assets/index.html-BZeDi-CG.js",
    "revision": "6dd3b582fbc0d69fe5bb7af7e73a9492"
  }, {
    "url": "assets/index.html-BVKLekB4.js",
    "revision": "0df69af470f498b3efaf6929af4e5429"
  }, {
    "url": "assets/index.html-BUskaKk5.js",
    "revision": "a0993d15c5032603b52e41aea1e7b9b0"
  }, {
    "url": "assets/index.html-BKfaTbUv.js",
    "revision": "b9e93b5a644c2bf3adb4ae1c72a8922b"
  }, {
    "url": "assets/index.html-BD93F-YP.js",
    "revision": "4f3f6f98025e9d3a4f5350e596465f98"
  }, {
    "url": "assets/index.html-BAQ2iFqI.js",
    "revision": "b2bc689e4f05dded209551f2f5f0a28d"
  }, {
    "url": "assets/index.html-B9_mior6.js",
    "revision": "0937f905b95bf5a1213ebe8d66f0fefa"
  }, {
    "url": "assets/index.html-B7oJpP-x.js",
    "revision": "6fdfc1176a90696f773546f0f4c2c6d5"
  }, {
    "url": "assets/index.html-B6mEnd3f.js",
    "revision": "d7601e5623506a900a74aeb931c999aa"
  }, {
    "url": "assets/index.html-B4IsHnd9.js",
    "revision": "d78cfacdfc5424d9a646915b3de54a38"
  }, {
    "url": "assets/index.html-B1ATyA9K.js",
    "revision": "fd18aa64e7250ece4e02a2267aa7ed14"
  }, {
    "url": "assets/index.html-B-nis0D0.js",
    "revision": "4c172bd82e204eacb89927678a8159b3"
  }, {
    "url": "assets/index.html-Atyx5i3X.js",
    "revision": "df07fcb5b4b03400a0069214e19fd9c7"
  }, {
    "url": "assets/index.html-7qaKKVMx.js",
    "revision": "fdf018250c17be721502a4c59d020d2c"
  }, {
    "url": "assets/index.html-2wJEYzqJ.js",
    "revision": "778b947f7561186688c03b336e0ad331"
  }, {
    "url": "assets/index.html--XJR1J7E.js",
    "revision": "9f995a7b5f41fff301957c481203f958"
  }, {
    "url": "assets/index-DTEEl-sV.js",
    "revision": "46a193641571106d3b7b43f9bc2a2735"
  }, {
    "url": "assets/how-llm-know-mcp-params.html-BorYeoqo.js",
    "revision": "a7433baf5ddcc82ca565acc959e4045b"
  }, {
    "url": "assets/giscus-BAf4_9qv.js",
    "revision": "6bba63cc83e1b2b20cd115e60344dde7"
  }, {
    "url": "assets/docker-proxy.html-BSQgQnP3.js",
    "revision": "aee4d3db5a5660457bc6f558dcc09144"
  }, {
    "url": "assets/compiler.html-eBvJ02uA.js",
    "revision": "2748f8284d1221b1c0e5f50e7c572ba5"
  }, {
    "url": "assets/code-visualization-intro.html-CIhSFaUR.js",
    "revision": "a523a2e357581edb819b4a74828ca45d"
  }, {
    "url": "assets/code-funny.html-wbpi4tFf.js",
    "revision": "9cc44277f22290e464c5dfcf9fc3a2bb"
  }, {
    "url": "assets/cg-diff.html-DK6gfZhP.js",
    "revision": "a2fa3b94cda768a35ab03c2176939214"
  }, {
    "url": "assets/auto-lock.html-CCXutKH-.js",
    "revision": "b8f86445beaabe4ff6e0f42539a8f27b"
  }, {
    "url": "assets/app-B5ucBNxs.js",
    "revision": "f3b89fae1d5e231f4fdb21db5dd64fe9"
  }, {
    "url": "assets/ai-unit-test.html-BPvx-kJE.js",
    "revision": "138589fd1f1012b825e095b97fe5cd25"
  }, {
    "url": "assets/ai-search.html-zDJZtrKq.js",
    "revision": "53d6f22b0ab6cd0d3382d1def1d1973e"
  }, {
    "url": "assets/ai-hotspot.html-Cjv1e_2x.js",
    "revision": "e6b7073765538e65796c31d5d5ba9c21"
  }, {
    "url": "assets/ai-article-database.html-CQ6gSkpz.js",
    "revision": "64142d488bf60e772cb3cf0830e8dbc2"
  }, {
    "url": "assets/ai-agent.html-Bul-q896.js",
    "revision": "32f68227bc88a275e6292562500993b0"
  }, {
    "url": "assets/SearchResult-rXxKpWMb.js",
    "revision": "71b2435fd01560fe612007058685bff3"
  }, {
    "url": "assets/5-years-summarize.html-DHPYOIgv.js",
    "revision": "3522698a909b7592168d29a8832d86d3"
  }, {
    "url": "assets/404.html-DdKz36qP.js",
    "revision": "962ff0cafbf3f5f933be68ea3c1e4617"
  }, {
    "url": "assets/2025-end.html-DURPZB9X.js",
    "revision": "a8714183f957ae3ce491d332d0c4a75b"
  }, {
    "url": "assets/2024-end.html-D1bR6MHY.js",
    "revision": "15e8125688e351f3f88f5fb03ae48a92"
  }, {
    "url": "index.html",
    "revision": "7e5874dc7395428ee3a237eb89e78f9b"
  }, {
    "url": "404.html",
    "revision": "749b9769485d0b1c4e1ec4f219607d15"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(/\/fonts\/.*\.ttf$/i, new workbox.CacheFirst({
    "cacheName": "local-fonts",
    plugins: [new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    }), new workbox.ExpirationPlugin({
      maxEntries: 2,
      maxAgeSeconds: 31536000
    })]
  }), 'GET');
  workbox.registerRoute(/^https:\/\/cdn\.jsdelivr\.net\/gh\/shawnxie94\/images\/.*\.(?:png|jpe?g|gif|webp|svg)$/i, new workbox.StaleWhileRevalidate({
    "cacheName": "cdn-images",
    plugins: [new workbox.CacheableResponsePlugin({
      statuses: [0, 200]
    }), new workbox.ExpirationPlugin({
      maxEntries: 400,
      maxAgeSeconds: 2592000
    })]
  }), 'GET');

}));
