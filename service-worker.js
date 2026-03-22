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
    "url": "assets/tcp-fast-open.html-C0-OVZQ8.js",
    "revision": "ec038a7b461a3df1c95df6bc8af2a408"
  }, {
    "url": "assets/style-D2uQfNRt.css",
    "revision": "5e837e72af909281cc7858a331d86bb6"
  }, {
    "url": "assets/regex-vis.html-CviDX1Ah.js",
    "revision": "6463c5bea4dbb5837ba6eecbbcc6d855"
  }, {
    "url": "assets/read-flow.html-v3vHanY1.js",
    "revision": "b318e8c86fada28a96875521f892e14b"
  }, {
    "url": "assets/read-flow-2026.html-CiKcEqlh.js",
    "revision": "1066ccf7e713e4d4b611e0404632a394"
  }, {
    "url": "assets/read-code-tools.html-CBJYyzK0.js",
    "revision": "148b03f9d100fcb0f27c72da68f87290"
  }, {
    "url": "assets/plugin-vue_export-helper-DlAUqK2U.js",
    "revision": "25e3a5dcaf00fb2b1ba0c8ecea6d2560"
  }, {
    "url": "assets/picture-manage.html-BE9fU6VE.js",
    "revision": "32751ddd2fdae79c189021db81c7bced"
  }, {
    "url": "assets/photoswipe.esm-BXDdABy_.js",
    "revision": "6c0bf54cf1322dab242c5bb14307d57a"
  }, {
    "url": "assets/one-cmd-web-to-app.html-peeTCxsV.js",
    "revision": "a939bbf4a052a371f4941a5b74cd26d7"
  }, {
    "url": "assets/mac-terminal.html-BlvOjKcN.js",
    "revision": "3404215720f59413a0255acf0e0a79a2"
  }, {
    "url": "assets/kimi.html-ByIQILRo.js",
    "revision": "fcbfc7ea0aa98f8051176f5bdee2be32"
  }, {
    "url": "assets/ip-exploration.html-lAakQypk.js",
    "revision": "013a506ac2a8a22c3f4e91cfd669a60e"
  }, {
    "url": "assets/index.html-zYC1QnZk.js",
    "revision": "4d7e523bd2c78b8520029d286fa7bcd0"
  }, {
    "url": "assets/index.html-pjy_1x01.js",
    "revision": "80319deccf3f3597218066b0785d3557"
  }, {
    "url": "assets/index.html-m0RPXuob.js",
    "revision": "72ab1b88097ad5a9ec4936ea45e4e375"
  }, {
    "url": "assets/index.html-k9RqTPxe.js",
    "revision": "9c0a057f5d733c8eb524bd700e92e467"
  }, {
    "url": "assets/index.html-j8_o3e8Z.js",
    "revision": "bc9453ec6abb02d5fa35e3174be65ab9"
  }, {
    "url": "assets/index.html-iK0NhaBR.js",
    "revision": "492b2c710f8fb1f5838fdc5cfe5c3481"
  }, {
    "url": "assets/index.html-gxtKJZIQ.js",
    "revision": "d3c30dcd6c587235e70426cd09fb8966"
  }, {
    "url": "assets/index.html-eeyCYm_0.js",
    "revision": "4f42dd7896b2271f8a164344bb98640a"
  }, {
    "url": "assets/index.html-eebIPne-.js",
    "revision": "3ba7657417c4633edb950d53e499ee10"
  }, {
    "url": "assets/index.html-bZ1hqphJ.js",
    "revision": "df824e380e057089ab8ec6f940a847c2"
  }, {
    "url": "assets/index.html-Oj9pSZCN.js",
    "revision": "2ef4c21f1a8bad118754ad3526239346"
  }, {
    "url": "assets/index.html-Kco5TejW.js",
    "revision": "174a4fb5075d950c849a005f0fb3ec46"
  }, {
    "url": "assets/index.html-K1IL2LIR.js",
    "revision": "57662c69f276b5b2a78b712ffa3d9cbd"
  }, {
    "url": "assets/index.html-Dy01bFaX.js",
    "revision": "1d4020e9934bdd3d3743c9b935657c29"
  }, {
    "url": "assets/index.html-DvXGiHFm.js",
    "revision": "6f70ba43399bdcfa1e263b4755e6d4fd"
  }, {
    "url": "assets/index.html-Dtv9IgX9.js",
    "revision": "0b99f0087bcdcc42454d580d2acafb64"
  }, {
    "url": "assets/index.html-DrkI4SGf.js",
    "revision": "e9da04174ff24a34fc7d281d96e7f8cb"
  }, {
    "url": "assets/index.html-DpCvDAgC.js",
    "revision": "f92e76048fb34caa1c3ecd30e78adab3"
  }, {
    "url": "assets/index.html-Dc7_MjU7.js",
    "revision": "f26660dbf5fe9e18ddc3d2f68927aeaa"
  }, {
    "url": "assets/index.html-Dayusto4.js",
    "revision": "c48e0f30cafd6a2ee69b57498497422d"
  }, {
    "url": "assets/index.html-DXAvI7df.js",
    "revision": "d7d217dcde2ac63da3f3a3794561cdf2"
  }, {
    "url": "assets/index.html-DVT9Gj_I.js",
    "revision": "d3b6c6c7af2e25e262fd2124889d6358"
  }, {
    "url": "assets/index.html-DTykh_zV.js",
    "revision": "3742ac454116af002f56421073ba3efc"
  }, {
    "url": "assets/index.html-DB3PqRLe.js",
    "revision": "1980d674e79bad70b92b614eac410ddd"
  }, {
    "url": "assets/index.html-D8mXXCXb.js",
    "revision": "b95a2d5217247b6ff1b3380f0bdb05b7"
  }, {
    "url": "assets/index.html-D8Xgr7fH.js",
    "revision": "0900fcf0e611f0c9a9d4d4043e76553d"
  }, {
    "url": "assets/index.html-D7y3-G96.js",
    "revision": "ad5a1a96d2fe7b9789064298de83c5b1"
  }, {
    "url": "assets/index.html-D6eIPX7p.js",
    "revision": "345122fd51a6833e9aa1016468ad5218"
  }, {
    "url": "assets/index.html-D5SqrjUv.js",
    "revision": "19c4c785e11def53ec82d6050534e8ba"
  }, {
    "url": "assets/index.html-CyL8b7m2.js",
    "revision": "a4de5ab2fc4ed5ee0d72901519caf74b"
  }, {
    "url": "assets/index.html-CvnPyyqo.js",
    "revision": "e2ac701b0ddab5c3886807ceab4b3f85"
  }, {
    "url": "assets/index.html-CiuypG1h.js",
    "revision": "c35991ddae7bdeb054a9c7081c1f288f"
  }, {
    "url": "assets/index.html-Cat6tqKs.js",
    "revision": "6c82f6b20c935e45a3f145ef12067b33"
  }, {
    "url": "assets/index.html-CZQ9F_V8.js",
    "revision": "28a50592e6341bd1838c4390e822108e"
  }, {
    "url": "assets/index.html-CYXsXFFz.js",
    "revision": "cb1dd283e4717df15145e6d7b9b8bd15"
  }, {
    "url": "assets/index.html-CXLqVs3O.js",
    "revision": "026f818be460d97089a874c9bdba1031"
  }, {
    "url": "assets/index.html-CWU8joVK.js",
    "revision": "67f0d1d1e79937f0f89ca1f94ff551d4"
  }, {
    "url": "assets/index.html-CUI_ri25.js",
    "revision": "5955f77ff5ee07f50ef661ca4d0a7853"
  }, {
    "url": "assets/index.html-CNk7A-Ks.js",
    "revision": "45f65c54fc9aa5fe493ef95ef4da4699"
  }, {
    "url": "assets/index.html-CLBeWU9C.js",
    "revision": "94dab719f47d65664f4b8dcbb82fbcec"
  }, {
    "url": "assets/index.html-CKPe-Wis.js",
    "revision": "fe9d59cb451acbc9a87f96c4d48f0ffc"
  }, {
    "url": "assets/index.html-CKNGtXLT.js",
    "revision": "3db4b5b05b4df8f8cc18da675a4d59f9"
  }, {
    "url": "assets/index.html-CHjlZiyZ.js",
    "revision": "98a3a6c1cca5e9e4aa7d4531a0e5218e"
  }, {
    "url": "assets/index.html-CAaYoKAM.js",
    "revision": "9ef3a05bd80452ed6f7bbaa62a8055d4"
  }, {
    "url": "assets/index.html-C4RbRYpX.js",
    "revision": "ff2cda7f90c5a3116a7c848b824e19a0"
  }, {
    "url": "assets/index.html-C1vS_ERW.js",
    "revision": "fb14b939babe8ed48d56de70907e8fc0"
  }, {
    "url": "assets/index.html-BwlUYw1A.js",
    "revision": "c2cb45b29be024ef2c5bf3687c10c4b4"
  }, {
    "url": "assets/index.html-BvxcZNlE.js",
    "revision": "ad1bb84fc75d14bc37e928642d903313"
  }, {
    "url": "assets/index.html-Bs-yHMM4.js",
    "revision": "6b0836e780453e79f366132c8e46bec7"
  }, {
    "url": "assets/index.html-BoM66ni6.js",
    "revision": "033db70e2423879ddc0381384a3f2d17"
  }, {
    "url": "assets/index.html-BoAqRLTK.js",
    "revision": "0d0c208b7fe37c7ff356a4ff4b653c0c"
  }, {
    "url": "assets/index.html-BntnDUu3.js",
    "revision": "9fb1ea4c14c73ae80d137a566bb62f46"
  }, {
    "url": "assets/index.html-BmG2Qo-p.js",
    "revision": "a5170e6db2f5c61dd18faa5bfbf34264"
  }, {
    "url": "assets/index.html-BllPfql4.js",
    "revision": "7f3941070bde5fc8ed202f97ff2fd15f"
  }, {
    "url": "assets/index.html-BjuHlC6N.js",
    "revision": "c75632c19c84e2950d636df88955ba0b"
  }, {
    "url": "assets/index.html-BjgkF9IK.js",
    "revision": "42b1ab51af3eac2622e75cf3f82153a1"
  }, {
    "url": "assets/index.html-Bim8-4Z5.js",
    "revision": "5d2fdb77d5e91695945660be10fac48c"
  }, {
    "url": "assets/index.html-BbywPGxC.js",
    "revision": "58f3f0297755b12dc33180f88b104d37"
  }, {
    "url": "assets/index.html-B_myLt1M.js",
    "revision": "4ca51724991ea0049995a0b0ffca571d"
  }, {
    "url": "assets/index.html-BZK7WWCk.js",
    "revision": "7d151b84657647d5944d9d557a9103c4"
  }, {
    "url": "assets/index.html-BWNGwoxd.js",
    "revision": "2f1df518b63fcea3d758c0c6cdb49f9a"
  }, {
    "url": "assets/index.html-BHlvITI1.js",
    "revision": "bec8ede777e797dfa575853f2065e280"
  }, {
    "url": "assets/index.html-BBD8blfE.js",
    "revision": "03793fbf41f5e898888da4d5239bf2b7"
  }, {
    "url": "assets/index.html-B0j_xQ92.js",
    "revision": "fe60941bb3be08d8aa76c571bf1659ec"
  }, {
    "url": "assets/index.html-ADPBep-y.js",
    "revision": "cc60ee967aa3814cbaa0aa5f16f51b84"
  }, {
    "url": "assets/index.html-7NWeiuTS.js",
    "revision": "7ecb3a4499f38f898eb2441b5dc8c09a"
  }, {
    "url": "assets/index.html-5yBROtuF.js",
    "revision": "3f02536f789c6dcbbecdcacce9a5bd69"
  }, {
    "url": "assets/index.html-3K9_pfnH.js",
    "revision": "235703c857a004ba697cf378c733f1a6"
  }, {
    "url": "assets/index.html-0EazxtgP.js",
    "revision": "eb87fb5360eca8b39f9bd5fb5d6b8461"
  }, {
    "url": "assets/index-DTEEl-sV.js",
    "revision": "46a193641571106d3b7b43f9bc2a2735"
  }, {
    "url": "assets/how-llm-know-mcp-params.html-BeGgag1j.js",
    "revision": "805048537bed33f917ebc72859b9be1f"
  }, {
    "url": "assets/giscus-BAf4_9qv.js",
    "revision": "6bba63cc83e1b2b20cd115e60344dde7"
  }, {
    "url": "assets/docker-proxy.html-LFGl6D9N.js",
    "revision": "3a7a05579cec8da09eaa8be755e611ff"
  }, {
    "url": "assets/compiler.html-hTnum74G.js",
    "revision": "6d1d9c2c4540054ef267dcfaf701b5a8"
  }, {
    "url": "assets/code-visualization-intro.html-BXkwo6Gr.js",
    "revision": "bdc5a5f74abfcc3f8dda9b9360318a80"
  }, {
    "url": "assets/code-funny.html-jqLt34II.js",
    "revision": "78fdc2e9f02e35d31f53e8e64968b73b"
  }, {
    "url": "assets/cg-diff.html-6eyIe6yG.js",
    "revision": "51c2b238b174f430d5b5ceffdbf12bf3"
  }, {
    "url": "assets/auto-lock.html-D7EppExW.js",
    "revision": "3e1c4f8258b7a4f1c6f1a6d37f011a45"
  }, {
    "url": "assets/app-CrUsjYK1.js",
    "revision": "a8292a3f4033110f4e6591db7648cff3"
  }, {
    "url": "assets/ai-unit-test.html-C8lS5T4Y.js",
    "revision": "bbac6722cb2af89f9cd32098df001930"
  }, {
    "url": "assets/ai-search.html-Dr8-UqXE.js",
    "revision": "e5244d08c08e4e1969cdb572c848868d"
  }, {
    "url": "assets/ai-hotspot.html-DcMwzR3k.js",
    "revision": "16c550b8e0b4b7870cccc4c06e6b8be2"
  }, {
    "url": "assets/ai-article-database.html-voszPLF3.js",
    "revision": "cf3986b006f74d05f971da576b36681a"
  }, {
    "url": "assets/ai-agent.html-BG10V5Tt.js",
    "revision": "1f90e4d27ba84cbc79354cf3c099c761"
  }, {
    "url": "assets/SearchResult-dyuc9E8W.js",
    "revision": "05207caa78518a99f528790d82304945"
  }, {
    "url": "assets/5-years-summarize.html-DM3QJ89o.js",
    "revision": "6fab05cf7d1747e5409f83c8d3e2945e"
  }, {
    "url": "assets/404.html-CCLmB3v1.js",
    "revision": "d5f8fec2106b17ac60d01107cba9a99b"
  }, {
    "url": "assets/2026-3-6.html-DLGNHDtD.js",
    "revision": "1e9d2cbb07de4c618ce7594f4ccc1344"
  }, {
    "url": "assets/2026-3-4.html-CGEyhIk_.js",
    "revision": "6cc4ef9b8ee100aa38c587affcf06e7d"
  }, {
    "url": "assets/2026-3-3.html-BsWhFBSP.js",
    "revision": "ed4ea4285cefa1873ed38e476ac3647e"
  }, {
    "url": "assets/2026-3-22.html-DP87dOWA.js",
    "revision": "02638b8fa7d9dfa7b6d394ce0913d0cc"
  }, {
    "url": "assets/2026-3-17.html-eS5Z-8Xs.js",
    "revision": "4996ee5e56eea3bda461e0dee1fd0e7f"
  }, {
    "url": "assets/2026-3-16.html-DNS4p-ft.js",
    "revision": "422734d19eae892869eda5984d3cda84"
  }, {
    "url": "assets/2025-end.html-BdtnAw5L.js",
    "revision": "e2f742316885a3e9a063742717b33481"
  }, {
    "url": "assets/2024-end.html-DY4rmct0.js",
    "revision": "5ac9c046050e2c72e4e50bd4deeafe64"
  }, {
    "url": "index.html",
    "revision": "63468b4945e37ee9b7ad10731e925bbb"
  }, {
    "url": "404.html",
    "revision": "28998cc4487009daa10e068e0a6ff78f"
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
