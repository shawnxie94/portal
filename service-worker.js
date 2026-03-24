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
    "url": "assets/tcp-fast-open.html-DVw5ljot.js",
    "revision": "cb1da8031528e6811c853dfaa45a6907"
  }, {
    "url": "assets/style-D2uQfNRt.css",
    "revision": "5e837e72af909281cc7858a331d86bb6"
  }, {
    "url": "assets/regex-vis.html-BjpO5OUK.js",
    "revision": "a6ce11e604dd45dcc4e0b9826fc4c211"
  }, {
    "url": "assets/read-flow.html-BHowsgyj.js",
    "revision": "849147c31fd937bee256c6dd5da5d6c4"
  }, {
    "url": "assets/read-flow-2026.html-vPPwaiX7.js",
    "revision": "442e2cc1980f4e2a6b8103e82b198d19"
  }, {
    "url": "assets/read-code-tools.html-BpGmI83R.js",
    "revision": "c8d3ca85ed8f16c9e96ce71a55605ba8"
  }, {
    "url": "assets/plugin-vue_export-helper-DlAUqK2U.js",
    "revision": "25e3a5dcaf00fb2b1ba0c8ecea6d2560"
  }, {
    "url": "assets/picture-manage.html-4SwsQ5XS.js",
    "revision": "e94ee24f3e13c2188af3a08a690237a6"
  }, {
    "url": "assets/photoswipe.esm-BXDdABy_.js",
    "revision": "6c0bf54cf1322dab242c5bb14307d57a"
  }, {
    "url": "assets/one-cmd-web-to-app.html-CUZ_AcYK.js",
    "revision": "1e2e020f13a3a1470a1756879973d58c"
  }, {
    "url": "assets/mac-terminal.html-Dsz4NHHH.js",
    "revision": "777bd26b829474a95bcafe8fe3ac3dcc"
  }, {
    "url": "assets/kimi.html-Ick9crjl.js",
    "revision": "26143e3bcac7f4ec200b20cb277903c9"
  }, {
    "url": "assets/ip-exploration.html-Dk4CTBnh.js",
    "revision": "0994759805e1d4b7e9cb09fdfc90f3f0"
  }, {
    "url": "assets/index.html-rK3p4use.js",
    "revision": "3be281246c088f3a4eba995e384f7e93"
  }, {
    "url": "assets/index.html-oYg7EvkB.js",
    "revision": "9b7a96cbecfa541bff49ffa58c2cc47a"
  }, {
    "url": "assets/index.html-kQLyEIoB.js",
    "revision": "3d63bad291422b51349da16e5fde2b46"
  }, {
    "url": "assets/index.html-X7M0lp-G.js",
    "revision": "491a493fa38babda54ffda2d20a5b934"
  }, {
    "url": "assets/index.html-VwANnTPa.js",
    "revision": "88ab5c973f34682d1a24502495707e17"
  }, {
    "url": "assets/index.html-UY_jyCcd.js",
    "revision": "48b60544c930322348fe135ae44859ec"
  }, {
    "url": "assets/index.html-TN4u7rdT.js",
    "revision": "7a28e95e13dcca10457c104fe76b535d"
  }, {
    "url": "assets/index.html-SCX_duDy.js",
    "revision": "ca892035b1d580e5abd7f5443f00b2b3"
  }, {
    "url": "assets/index.html-S7lupxJW.js",
    "revision": "49026875679087edb821aba8995fc237"
  }, {
    "url": "assets/index.html-NuHihIqo.js",
    "revision": "9b6715c486bcb1f9cab6c8724be1ff82"
  }, {
    "url": "assets/index.html-JCuGqMqJ.js",
    "revision": "793836d37211d64c5730d075db39c269"
  }, {
    "url": "assets/index.html-Gc52JJUM.js",
    "revision": "8ffe9c25020c6eed09ffa462cace0e3a"
  }, {
    "url": "assets/index.html-DyCJOA41.js",
    "revision": "93efcd09876c9f8e72eeb83bb39c999c"
  }, {
    "url": "assets/index.html-DvcbK00S.js",
    "revision": "d4afb655916a5560f3edd63ace7803b1"
  }, {
    "url": "assets/index.html-DpRxmY7N.js",
    "revision": "51d889dc3f56df8a6bf9e5c979d305a5"
  }, {
    "url": "assets/index.html-DozPVqlJ.js",
    "revision": "9505a08f72b033848ccf903071e1a989"
  }, {
    "url": "assets/index.html-DjwtOPNp.js",
    "revision": "ae60504fb6b51fff8117b0566d4f44d5"
  }, {
    "url": "assets/index.html-DeEHQQog.js",
    "revision": "1a10d765d24e23ecbfec6ccc4cd3de1e"
  }, {
    "url": "assets/index.html-DacPaCZh.js",
    "revision": "a5546184c811a54c88a79f7215c77dac"
  }, {
    "url": "assets/index.html-DU9W161u.js",
    "revision": "4ac24cf5389512f35e5d1c362e45e1f1"
  }, {
    "url": "assets/index.html-DTuDbdyX.js",
    "revision": "855b7ce7908708fba909abd01ea83e34"
  }, {
    "url": "assets/index.html-DQ0tDi3y.js",
    "revision": "2b45af55cce1ab5831df0ddfb0859235"
  }, {
    "url": "assets/index.html-DO0_a2YA.js",
    "revision": "a6267b412c595249d9c5ebe61a2e9957"
  }, {
    "url": "assets/index.html-DKlA7QEg.js",
    "revision": "1922e6db802d337e683576875c451a05"
  }, {
    "url": "assets/index.html-DEaFlEfF.js",
    "revision": "2fe388cb2b521a3de7adb50efd3218f1"
  }, {
    "url": "assets/index.html-D5RkVbvj.js",
    "revision": "9a10076c5ce4e62817e61866d52710e8"
  }, {
    "url": "assets/index.html-D1WPsLzy.js",
    "revision": "9aa1d853cd4c66228310a1edb0912933"
  }, {
    "url": "assets/index.html-CsIaf0jo.js",
    "revision": "99ef1febc834bc0741b020cce8f77abe"
  }, {
    "url": "assets/index.html-Cr5WfsLG.js",
    "revision": "83b1898e9b00cc376fb298c07703ab89"
  }, {
    "url": "assets/index.html-CptSdv1q.js",
    "revision": "edd74d1a3c294b581b0de2c7bb0c2ac8"
  }, {
    "url": "assets/index.html-Cog889st.js",
    "revision": "e98a45cf32456fca9efacab8e214fe1e"
  }, {
    "url": "assets/index.html-Ci8nYD8c.js",
    "revision": "35cc63778ce0fd6974bdbdf59314757b"
  }, {
    "url": "assets/index.html-CbycvQGM.js",
    "revision": "7d02279b05cd96fb2fd31ff57272446c"
  }, {
    "url": "assets/index.html-Ca7zS0Bf.js",
    "revision": "f95d389f018bd8e26019c5cdaf321fc7"
  }, {
    "url": "assets/index.html-CCndLtOY.js",
    "revision": "9a8666fccf5dbc963fb6c4b3cc56388d"
  }, {
    "url": "assets/index.html-C6rkBKOr.js",
    "revision": "d0cee246547751992ffa70bc39269adb"
  }, {
    "url": "assets/index.html-C088eMNQ.js",
    "revision": "f0d3ccbee5f85cf3d25590f2120fb98c"
  }, {
    "url": "assets/index.html-BosvDeaq.js",
    "revision": "ec408c41a3a8bca92672c8435e0b4dc6"
  }, {
    "url": "assets/index.html-Bj1j_tX5.js",
    "revision": "034c4012d39a03f8dc304e8355b79a9e"
  }, {
    "url": "assets/index.html-BaAkiUTF.js",
    "revision": "87c88d3200e3622273957ac4f6756873"
  }, {
    "url": "assets/index.html-B_XpFgTT.js",
    "revision": "7570f288de57bc8d55418fbcdfa45b88"
  }, {
    "url": "assets/index.html-BO-YwNNe.js",
    "revision": "5c426a4621eb6eef2df6d638b329921a"
  }, {
    "url": "assets/index.html-BKPN_PfD.js",
    "revision": "7f2e0329be61d0e44e669c3bbe8c6c7c"
  }, {
    "url": "assets/index.html-BHLv3k8A.js",
    "revision": "5bcf0014149c71f79d6e8a94492cb9c1"
  }, {
    "url": "assets/index.html-BBtB84dT.js",
    "revision": "18e048ef90ab90da7ba16d6785e022d7"
  }, {
    "url": "assets/index.html-BB19nw91.js",
    "revision": "d0303a6212e4076d6a20dbe98bb1b2d7"
  }, {
    "url": "assets/index.html-B21BdHjI.js",
    "revision": "55fcf6901d8c10a055591233cd223268"
  }, {
    "url": "assets/index.html-9wApNxnr.js",
    "revision": "b0d81694733256b607a533250e68be53"
  }, {
    "url": "assets/index.html-8uHw4t1N.js",
    "revision": "8fa366de98b6c839c6971721508858db"
  }, {
    "url": "assets/index-DTEEl-sV.js",
    "revision": "46a193641571106d3b7b43f9bc2a2735"
  }, {
    "url": "assets/how-llm-know-mcp-params.html-Cn_hWFAN.js",
    "revision": "263137fba270901bd51842d2521bc128"
  }, {
    "url": "assets/giscus-BAf4_9qv.js",
    "revision": "6bba63cc83e1b2b20cd115e60344dde7"
  }, {
    "url": "assets/docker-proxy.html-CXu_XQGj.js",
    "revision": "1031bcc51358e9f01cbac2920f988912"
  }, {
    "url": "assets/compiler.html-OtVUmMKA.js",
    "revision": "9abd615f81edd0598b31611c51b6845d"
  }, {
    "url": "assets/code-visualization-intro.html-CpNbGtxT.js",
    "revision": "a2c8fe283e33d2bd7619bb4152370192"
  }, {
    "url": "assets/code-funny.html-LSjWa5B1.js",
    "revision": "b392033fc0548db2475ca71d1bf93066"
  }, {
    "url": "assets/cg-diff.html-fgC7TGTU.js",
    "revision": "026a8fd4204b2076f69b22f4673e9ebb"
  }, {
    "url": "assets/auto-lock.html-CjmTbzCT.js",
    "revision": "72f3711adcc5ca90915db427ecf27282"
  }, {
    "url": "assets/app-DCahkL0E.js",
    "revision": "105719f3b58c37bd569bc7dc0c3ae6d9"
  }, {
    "url": "assets/ai-unit-test.html-Di3Lsgk9.js",
    "revision": "bc8f68082641cd7386a70a556c260b8c"
  }, {
    "url": "assets/ai-search.html-DSQlt6q_.js",
    "revision": "044abe11c21faa70dd4a785d8ad9a53f"
  }, {
    "url": "assets/ai-hotspot.html-OUsPeyIW.js",
    "revision": "5221bf8e3ce1929c28d196442e543a12"
  }, {
    "url": "assets/ai-article-database.html-dmdXEROI.js",
    "revision": "a320d40ece1670654edc5413e62944fd"
  }, {
    "url": "assets/ai-agent.html-zko98Tf6.js",
    "revision": "3bdfc1f97df7353062e496d2432e175a"
  }, {
    "url": "assets/SearchResult-DLH12mz8.js",
    "revision": "e1e4c97b13ee92208d5b2ada607c3d6d"
  }, {
    "url": "assets/5-years-summarize.html-BuzEEMFC.js",
    "revision": "4e0cb34dfe95c8078f4ec1482bfff527"
  }, {
    "url": "assets/404.html-BzebLmjj.js",
    "revision": "838b9ca5b89727d3d1cf73e226c35d94"
  }, {
    "url": "assets/2026-3-6.html-BlmLE1qm.js",
    "revision": "e28068a2b4a4f0a96e26c76bef031cd6"
  }, {
    "url": "assets/2026-3-4.html-CRzC2wTW.js",
    "revision": "321bf4320e3c04d665a68b89ef830826"
  }, {
    "url": "assets/2026-3-3.html-BjB3lcwi.js",
    "revision": "ab546c4d9bc0d865bdb3632fc2868cee"
  }, {
    "url": "assets/2026-3-24.html-D2h5ru2H.js",
    "revision": "ceacfb6f88119da715e84d1434bf6fde"
  }, {
    "url": "assets/2026-3-22.html-CzYbB80Q.js",
    "revision": "a46515b960f50652d77632969043115f"
  }, {
    "url": "assets/2026-3-17.html-K_m0G_xF.js",
    "revision": "74a71dd8f73b5365d19cc179ed3281ea"
  }, {
    "url": "assets/2026-3-16.html-DIdl7O8q.js",
    "revision": "c0935656ecf7a764fc45e16d59548f20"
  }, {
    "url": "assets/2025-end.html-DOaUavVF.js",
    "revision": "a1a5e25d879b91ed4938d3c23d6976f7"
  }, {
    "url": "assets/2024-end.html-Do6O17wa.js",
    "revision": "05a2d946865e4b6fd79184e29141d5e0"
  }, {
    "url": "index.html",
    "revision": "1b2cfe080ab97d00cf47054b295fb633"
  }, {
    "url": "404.html",
    "revision": "6be681d0fc5fe1db0e95cf80c3eefd3a"
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
