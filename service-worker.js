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
    "url": "assets/tcp-fast-open.html-C8hKaVl5.js",
    "revision": "111067354f3c142178660d32bdf773bd"
  }, {
    "url": "assets/style-D2uQfNRt.css",
    "revision": "5e837e72af909281cc7858a331d86bb6"
  }, {
    "url": "assets/regex-vis.html-CY8wSHRH.js",
    "revision": "3019c0b3d2f2da5327f2ff21cd094995"
  }, {
    "url": "assets/read-flow.html-BeqNJi_e.js",
    "revision": "b9a2ee31e5d5f5fdeca0b624d6f78857"
  }, {
    "url": "assets/read-code-tools.html-DEbgAP3h.js",
    "revision": "be4999343d4c87210395aabde5ada144"
  }, {
    "url": "assets/plugin-vue_export-helper-DlAUqK2U.js",
    "revision": "25e3a5dcaf00fb2b1ba0c8ecea6d2560"
  }, {
    "url": "assets/picture-manage.html-DcSjrpE0.js",
    "revision": "aed12be9f14cdbe5d2b05fc2b7633937"
  }, {
    "url": "assets/photoswipe.esm-BXDdABy_.js",
    "revision": "6c0bf54cf1322dab242c5bb14307d57a"
  }, {
    "url": "assets/one-cmd-web-to-app.html-DjtaJgAK.js",
    "revision": "687d14a07d8a0ade69ae98b740f7b784"
  }, {
    "url": "assets/mac-terminal.html-BbTzk56n.js",
    "revision": "34c08fd9360d5c628cc19a35c0c1e52b"
  }, {
    "url": "assets/kimi.html-BPCyFWTW.js",
    "revision": "bd575d923dae16e9d18f1bbd3b49f92e"
  }, {
    "url": "assets/ip-exploration.html-BYWz8qSe.js",
    "revision": "023f29a35d00b13bab03ed1e765b7574"
  }, {
    "url": "assets/index.html-unyONPJD.js",
    "revision": "bc41fdfba30ec1332098b4721b62d4e5"
  }, {
    "url": "assets/index.html-rzYdV27A.js",
    "revision": "28f2ca21640bf8c57f6d9cb566dc8a8d"
  }, {
    "url": "assets/index.html-lvV5liMg.js",
    "revision": "454edb53a1a70e6d35ce68ab4e17cbe3"
  }, {
    "url": "assets/index.html-jgv_exEt.js",
    "revision": "1750e82ceff4401f6640ae1f73d61dc8"
  }, {
    "url": "assets/index.html-gWATmusz.js",
    "revision": "ee5d6f59f4255d21fad01c29fb45f841"
  }, {
    "url": "assets/index.html-bBxBNmdY.js",
    "revision": "ab5bac5fa204a749d4e5c05d8ddd6d73"
  }, {
    "url": "assets/index.html-ZlJPhPzh.js",
    "revision": "75aac4c9db35b93ce506bafda2989634"
  }, {
    "url": "assets/index.html-VKmdYc63.js",
    "revision": "3809ac0b30b12fe4003961b5636b0c00"
  }, {
    "url": "assets/index.html-H7iirdGW.js",
    "revision": "054ae6eaa58dbd23f9dbdce4796c80dd"
  }, {
    "url": "assets/index.html-GaSqnF6J.js",
    "revision": "6d8df51e8a6340bdf9133837af645bbd"
  }, {
    "url": "assets/index.html-DxN_36HS.js",
    "revision": "19adde7d7cf4a18912350216fb6dae21"
  }, {
    "url": "assets/index.html-DtRdHSxc.js",
    "revision": "eaa262fc84a87e29828c7d7c1e4394ef"
  }, {
    "url": "assets/index.html-Dr1g3718.js",
    "revision": "6705774b9fa81dd5da68dec91d400d28"
  }, {
    "url": "assets/index.html-Dpk-XKiB.js",
    "revision": "dcad31474c61f57e0ff639f1cff63b5a"
  }, {
    "url": "assets/index.html-Dog27ww8.js",
    "revision": "67c1ea5dff7e39a0993257ab969fe4e4"
  }, {
    "url": "assets/index.html-DdDoGQAO.js",
    "revision": "b022b641c264ce54364746b85c8c82e5"
  }, {
    "url": "assets/index.html-Dbb0pQS2.js",
    "revision": "295a3c3d850c01a292cb83be0fcf835d"
  }, {
    "url": "assets/index.html-DaX0ozY0.js",
    "revision": "dd1040e9f5375f778d684b981baf76c1"
  }, {
    "url": "assets/index.html-DZDFk8oz.js",
    "revision": "56c86b4afaf46ef0da8e4e1499f07c5c"
  }, {
    "url": "assets/index.html-DXIbls69.js",
    "revision": "2169544c58d1d71890c4a616456e6f1a"
  }, {
    "url": "assets/index.html-DW8grKQJ.js",
    "revision": "d4556f169a7325197a898c60270f0d08"
  }, {
    "url": "assets/index.html-DW4oEwC0.js",
    "revision": "262895080e4e30c3ca4749a8a3b3ffbc"
  }, {
    "url": "assets/index.html-DJuQwHQA.js",
    "revision": "781d4ee3c59bcd12bc9146c658f88d3a"
  }, {
    "url": "assets/index.html-DFfE9i4U.js",
    "revision": "249fd013817726102764354ccf1387fe"
  }, {
    "url": "assets/index.html-DAXWAbgn.js",
    "revision": "84f59c4607e2b8ec9ba6ca71fcf2f9be"
  }, {
    "url": "assets/index.html-D8Jz3-7a.js",
    "revision": "b1149c717e0aedf03ea071b34d1354c9"
  }, {
    "url": "assets/index.html-D1saAeOR.js",
    "revision": "78dff4be1ebf89068c3910ce084c6265"
  }, {
    "url": "assets/index.html-D0dPerg_.js",
    "revision": "1174398d248fc0f5aa4da2fc4ab99532"
  }, {
    "url": "assets/index.html-CzdFA1rN.js",
    "revision": "ca7b94a6752d0e2a7613853152842771"
  }, {
    "url": "assets/index.html-CyuKw3nv.js",
    "revision": "0c747a2e39685d314ee88d0f36514ebf"
  }, {
    "url": "assets/index.html-Cu9_Bzn1.js",
    "revision": "533e7dcea29bfe905f06451eab21e973"
  }, {
    "url": "assets/index.html-Crxdq_eC.js",
    "revision": "e4a86396bcf78f43b2d6d51d18a51c39"
  }, {
    "url": "assets/index.html-CpdLZURi.js",
    "revision": "c9f73b8bb677d7aed786ab47b15db2c1"
  }, {
    "url": "assets/index.html-ClSz3Qkb.js",
    "revision": "1773b48d6cbf4bc7c3903aece3122264"
  }, {
    "url": "assets/index.html-CiWU3fVf.js",
    "revision": "bc466d4c5f55808b677dc5ba40e39f5b"
  }, {
    "url": "assets/index.html-Cf1m7Ae5.js",
    "revision": "f39265fc422f8d324ae3aca1190972e9"
  }, {
    "url": "assets/index.html-CdgBnno6.js",
    "revision": "070b09894ac19ed95b76b80b9a026759"
  }, {
    "url": "assets/index.html-CatnW0I2.js",
    "revision": "c596c5174922e1e564cb3be2f7bca242"
  }, {
    "url": "assets/index.html-CVA4IyjJ.js",
    "revision": "c40d70d2b43b556668bd58d069fae7fc"
  }, {
    "url": "assets/index.html-CPEUXMbO.js",
    "revision": "4aa363f7b8e716c0f64bef7cf8a4d146"
  }, {
    "url": "assets/index.html-CLDJlTsa.js",
    "revision": "2ad880746eebc7b40aeaf77fae3e6dbb"
  }, {
    "url": "assets/index.html-CIihub8M.js",
    "revision": "319210f098ec5cf0e765a7b635088a7c"
  }, {
    "url": "assets/index.html-CGBN-KD-.js",
    "revision": "f9a6b3beb5a35ff52e6aad56167ce60f"
  }, {
    "url": "assets/index.html-CFzW4g6T.js",
    "revision": "1559b5f760c34114859b6791fa813c16"
  }, {
    "url": "assets/index.html-C5mv96tu.js",
    "revision": "a605a56d29c95b112eb19bd7cf40ad28"
  }, {
    "url": "assets/index.html-C4uvlyCF.js",
    "revision": "2378eefdb234824872c63e9e768df237"
  }, {
    "url": "assets/index.html-C4jghAsT.js",
    "revision": "e90ad510694804f4a2bf1f21e9148e6c"
  }, {
    "url": "assets/index.html-BuhyH1TB.js",
    "revision": "ae79e303de5370f61068f7e193cf9588"
  }, {
    "url": "assets/index.html-BudVV8wI.js",
    "revision": "e53698dfa1584eb49778ec35864378fc"
  }, {
    "url": "assets/index.html-Btin8owG.js",
    "revision": "b7aeabedc7fbbd0c6744a6e2acc7c9b0"
  }, {
    "url": "assets/index.html-BkFvqCMm.js",
    "revision": "eacee5e0e641c89986744763ff0612dc"
  }, {
    "url": "assets/index.html-BjQ0UWi2.js",
    "revision": "fbac57ee0f4e85e4ac824dcedeee08f8"
  }, {
    "url": "assets/index.html-BhyegJ9_.js",
    "revision": "8209164945c4d4ffe32a77f30fa47a99"
  }, {
    "url": "assets/index.html-BgOjR9np.js",
    "revision": "c6c6ba0108f27aea6558ca1c7133afe3"
  }, {
    "url": "assets/index.html-Bfg0XLWj.js",
    "revision": "4536aac88a4121f17e5d16cf6d538c95"
  }, {
    "url": "assets/index.html-BYSCHYCV.js",
    "revision": "92d2415949e07c1ca14b10ce58d4c775"
  }, {
    "url": "assets/index.html-BPDNUA9X.js",
    "revision": "6a3fa6b3f9ff34c8eac33408876f8a14"
  }, {
    "url": "assets/index.html-BGweVsA6.js",
    "revision": "15101f53d17560fd11ec6422bf676de7"
  }, {
    "url": "assets/index.html-BFLQza9t.js",
    "revision": "8ccc3b5c621f821626915503514b6a28"
  }, {
    "url": "assets/index.html-BCcHRhS5.js",
    "revision": "4b32ec525a3a572a653023b315263bb7"
  }, {
    "url": "assets/index.html-9nc4oZfp.js",
    "revision": "12f3c751742d9e89edd6fce0ab77e778"
  }, {
    "url": "assets/index.html-8usg35Ae.js",
    "revision": "3ab184dcab3a6bb39e6d1ab8154dc54a"
  }, {
    "url": "assets/index.html-6paoiH9i.js",
    "revision": "b59b62ee743af0b19dafc4b7c642b78a"
  }, {
    "url": "assets/index.html-3uDSmDIM.js",
    "revision": "81ed8fc90e348a54b85878ac63ab8c2c"
  }, {
    "url": "assets/index-DTEEl-sV.js",
    "revision": "46a193641571106d3b7b43f9bc2a2735"
  }, {
    "url": "assets/how-llm-know-mcp-params.html-CChegvXp.js",
    "revision": "26994bd9816644ba748802db979db622"
  }, {
    "url": "assets/giscus-BAf4_9qv.js",
    "revision": "6bba63cc83e1b2b20cd115e60344dde7"
  }, {
    "url": "assets/docker-proxy.html-B5_OngNT.js",
    "revision": "2ea559b3162cd6ead56ad6e73adb8477"
  }, {
    "url": "assets/compiler.html-l-klnaq3.js",
    "revision": "15e10423c98780defc43b0beb3256cfb"
  }, {
    "url": "assets/code-visualization-intro.html-Coc13uUy.js",
    "revision": "89f04c3c761169012524aa699fc3ba28"
  }, {
    "url": "assets/code-funny.html-CZ2lqBvL.js",
    "revision": "db3299485e8677568112ff3eb4fd5573"
  }, {
    "url": "assets/cg-diff.html-2Z00kUae.js",
    "revision": "441290cb7eb93f48cbeaf3e4c335e719"
  }, {
    "url": "assets/auto-lock.html-C9Ytv59N.js",
    "revision": "99f33ab6c897fbb7e6612acc96feebb4"
  }, {
    "url": "assets/app-B1sc4WvC.js",
    "revision": "a3dace22b592e9e0eee649e3f488343e"
  }, {
    "url": "assets/ai-unit-test.html-4rlGXXrC.js",
    "revision": "b23ca5ab37a27c30547851895c735770"
  }, {
    "url": "assets/ai-search.html-CTU7HJ3e.js",
    "revision": "f4e939f52ea456dcb191a2624276caf7"
  }, {
    "url": "assets/ai-hotspot.html-CyJFCF5R.js",
    "revision": "49db176eb82b5315a02dd7818d411143"
  }, {
    "url": "assets/ai-article-database.html-BZw_yGEH.js",
    "revision": "10728a65506370949517409559ffc7f2"
  }, {
    "url": "assets/ai-agent.html-D5jVrzWY.js",
    "revision": "722978b6432974bd4ba05edb8139465a"
  }, {
    "url": "assets/SearchResult-B79XuCfJ.js",
    "revision": "bdacff5c74847132c783b959622bee7e"
  }, {
    "url": "assets/5-years-summarize.html-Bg7NitLJ.js",
    "revision": "43ab1ba02799e801499c127be018a820"
  }, {
    "url": "assets/404.html-ByU5eyhc.js",
    "revision": "3d43c84e78f9dff261712a67c264f3de"
  }, {
    "url": "assets/2026-3-6.html-BatcVIec.js",
    "revision": "72c9be0894256597dd6990745fe3d9a3"
  }, {
    "url": "assets/2026-3-4.html-Du-GIZal.js",
    "revision": "17ebe7141ec578ea6f3c2990e675bf6b"
  }, {
    "url": "assets/2026-3-3.html-CuMR6XQu.js",
    "revision": "1a7605f259203b32ad2a6755b5f90ad1"
  }, {
    "url": "assets/2025-end.html-K0Gw7_05.js",
    "revision": "253819030ffc4151c5ec8511d0cd2d04"
  }, {
    "url": "assets/2024-end.html-FvRe7Y3Q.js",
    "revision": "11e1864fd100fa86e7e88d8c2b17fe4f"
  }, {
    "url": "index.html",
    "revision": "741e23ac3b16eb98402deed28df32bd4"
  }, {
    "url": "404.html",
    "revision": "b18152fd0c373c5bf1b8127c559375ab"
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
