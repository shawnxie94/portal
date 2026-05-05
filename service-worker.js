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
    "url": "assets/tcp-fast-open.html-B9TM7IwH.js",
    "revision": "a1188453bdf6640d9e3fb8bbd0ebaa21"
  }, {
    "url": "assets/style-D2uQfNRt.css",
    "revision": "5e837e72af909281cc7858a331d86bb6"
  }, {
    "url": "assets/regex-vis.html-C-WY5UMy.js",
    "revision": "33c5e09cecb161c6c5d669cef3a78c68"
  }, {
    "url": "assets/read-flow.html-B16LaoyO.js",
    "revision": "edc08e4052b436f0207943b4d9403ce5"
  }, {
    "url": "assets/read-flow-2026.html-DgAeW5Vr.js",
    "revision": "9f97b82a67e2eab538fc791e6bb3c7c7"
  }, {
    "url": "assets/read-code-tools.html-xXMUkhKf.js",
    "revision": "7175fc3d750418f9d6fc410eca7569ed"
  }, {
    "url": "assets/plugin-vue_export-helper-DlAUqK2U.js",
    "revision": "25e3a5dcaf00fb2b1ba0c8ecea6d2560"
  }, {
    "url": "assets/picture-manage.html-1ReQmuh2.js",
    "revision": "eb9a6f4b48f9036d5736dbefee691186"
  }, {
    "url": "assets/photoswipe.esm-BXDdABy_.js",
    "revision": "6c0bf54cf1322dab242c5bb14307d57a"
  }, {
    "url": "assets/one-cmd-web-to-app.html-CuNB3s59.js",
    "revision": "1ac557e5b0e3ddd6ef287e16791fced7"
  }, {
    "url": "assets/mac-terminal.html-DN6NW4EF.js",
    "revision": "72c8ee308fbb2ca4d7b7481833d136e6"
  }, {
    "url": "assets/lumina.html-CWMC9-mX.js",
    "revision": "3ed1bdc918e06b4d9a6ee8c0414f4584"
  }, {
    "url": "assets/kimi.html-DVr1S8IW.js",
    "revision": "21777869e24cff0b75dd929e6e6ee089"
  }, {
    "url": "assets/ip-exploration.html-DZqXvPcr.js",
    "revision": "95d89f073e1adffa2b6c22576052d174"
  }, {
    "url": "assets/infinitum.html-uhXPK50x.js",
    "revision": "86a5b43a498885b3d19e4584ea9f5cd7"
  }, {
    "url": "assets/index.html-waPz1FFo.js",
    "revision": "4002e7397ff7c5eed32ed4b6b74b1ade"
  }, {
    "url": "assets/index.html-wMlfTB2l.js",
    "revision": "2d011a933eae0d8e3e75e0d7d1c54567"
  }, {
    "url": "assets/index.html-vY9iBFkm.js",
    "revision": "80e65b1b99439a2143e620d3e6e569d6"
  }, {
    "url": "assets/index.html-s3Sb1ijB.js",
    "revision": "c877235242af055e79711930a7b37f0a"
  }, {
    "url": "assets/index.html-puaWx8Ee.js",
    "revision": "197f793921b70ad0079c69c57e7182f5"
  }, {
    "url": "assets/index.html-njdcIUgK.js",
    "revision": "e46ef27c7515672e9e55edc1cae9e23e"
  }, {
    "url": "assets/index.html-iNJFhQ46.js",
    "revision": "bdb5697d8685589d67facf36c07d8480"
  }, {
    "url": "assets/index.html-hOCya9XW.js",
    "revision": "f0d8148a6108c2eb1102fb3c5312ef51"
  }, {
    "url": "assets/index.html-ZA2Fkd3Z.js",
    "revision": "9de98fee0445dec4217caa74b9868111"
  }, {
    "url": "assets/index.html-H43c9ZJJ.js",
    "revision": "c5820e8894fcdcf78df31f1731179c20"
  }, {
    "url": "assets/index.html-DsLaVCCQ.js",
    "revision": "6789425a57530f6090d4045a846964e0"
  }, {
    "url": "assets/index.html-DpXOVxaY.js",
    "revision": "e848873ab33d53f1d8f2e3f637eb1dbb"
  }, {
    "url": "assets/index.html-Dp6zYHS9.js",
    "revision": "25ce32a6e1714f1df6bb9bc9ab8c6798"
  }, {
    "url": "assets/index.html-Dkoc5eQY.js",
    "revision": "e359bff9d6f5f6fdd66c7f65be1bd711"
  }, {
    "url": "assets/index.html-DdTcfMRQ.js",
    "revision": "ba19a3fbb496f1ef9eafd8bacd187881"
  }, {
    "url": "assets/index.html-DYfZIry_.js",
    "revision": "8d07d83259544ce716db7d6a400a7472"
  }, {
    "url": "assets/index.html-DTC19bEL.js",
    "revision": "6b2c65bafe9b9e29c28e8ab643e77121"
  }, {
    "url": "assets/index.html-DQCKj5rL.js",
    "revision": "4a5f8dff4ece99850e9f28a9144cfc60"
  }, {
    "url": "assets/index.html-DPG8U8OX.js",
    "revision": "d049bff67d869c95d7576bff2db62ec7"
  }, {
    "url": "assets/index.html-DMXuwQ5B.js",
    "revision": "4ca45c15fb9e34a8d67259c0c6a66677"
  }, {
    "url": "assets/index.html-DEsCencI.js",
    "revision": "7a7dde26a6b1df07763cd1a543e30ab5"
  }, {
    "url": "assets/index.html-D9RVLf01.js",
    "revision": "aea06a2e4158cb13a6a1670733f38950"
  }, {
    "url": "assets/index.html-D7DO7wsp.js",
    "revision": "a752e3709dcac3db812b809ece7de12c"
  }, {
    "url": "assets/index.html-D5ypooaZ.js",
    "revision": "a3f3fb530a9462a6030a3c7cba698bd1"
  }, {
    "url": "assets/index.html-D34K6QVh.js",
    "revision": "d6f9ef3b5a4821eafd7a1b58141c34dd"
  }, {
    "url": "assets/index.html-CuUXKr8Q.js",
    "revision": "588c0432cfaadda55aeb5e9f033b3fbf"
  }, {
    "url": "assets/index.html-CjArqner.js",
    "revision": "9f48378fc492236a9b77581ce5ffdbf4"
  }, {
    "url": "assets/index.html-CiTR9Rac.js",
    "revision": "d7a1aba23e7e7dfe4b2f5d0291cf05ec"
  }, {
    "url": "assets/index.html-CiMhuWmf.js",
    "revision": "fb0731fedec039518e942d98cffc03ae"
  }, {
    "url": "assets/index.html-CfR1Vp8w.js",
    "revision": "3d5bc6043711e643edbe4c3da836e1ad"
  }, {
    "url": "assets/index.html-CdxUS3_P.js",
    "revision": "6e89900c9259918223f82ee992354226"
  }, {
    "url": "assets/index.html-CZ84DpEP.js",
    "revision": "d4d6e83d9e338bfd8a4a2943093d5e60"
  }, {
    "url": "assets/index.html-CXuN6s5h.js",
    "revision": "a2ccf6bb6e1fc7837d26331686b21285"
  }, {
    "url": "assets/index.html-CXs-czNz.js",
    "revision": "1028b57ddb62dc5399963c07397c1007"
  }, {
    "url": "assets/index.html-CUkFRQ4E.js",
    "revision": "de07e60e4c180ca4d78e4276cb3ba654"
  }, {
    "url": "assets/index.html-CSlC5gjT.js",
    "revision": "2554934252b73619163131743bdd037f"
  }, {
    "url": "assets/index.html-CSgUatGz.js",
    "revision": "43fe4dd91c3baff96cdf50b5e04368be"
  }, {
    "url": "assets/index.html-CS7MiaPg.js",
    "revision": "ac3d38c6311515fe47fec91b7d754e0e"
  }, {
    "url": "assets/index.html-CM8kuRsH.js",
    "revision": "3aa7bb13bb977363962914c9e9ec876c"
  }, {
    "url": "assets/index.html-CKlrjiXK.js",
    "revision": "bbfb61fe3f38fb34e522d7bcaaec1623"
  }, {
    "url": "assets/index.html-C8QElBBg.js",
    "revision": "ca8084e0a09fe8cc65f5003ecddf8e95"
  }, {
    "url": "assets/index.html-C0fs7EPu.js",
    "revision": "f4efbcbbcee3eefca068545550de299b"
  }, {
    "url": "assets/index.html-C0Im7G3S.js",
    "revision": "54c7a59e72a75a6c845de007c06185d5"
  }, {
    "url": "assets/index.html-C0I574R9.js",
    "revision": "fc6fc6283206c967451cd9bf139e9da9"
  }, {
    "url": "assets/index.html-Brccypw7.js",
    "revision": "4bb5b1bc88fadcc285e0e762a50c2f1d"
  }, {
    "url": "assets/index.html-BiOLAD-8.js",
    "revision": "403f2d0e24acfb960bed14982f278ad7"
  }, {
    "url": "assets/index.html-BiEX1HtI.js",
    "revision": "ac537dd39e48b4d0bd9602065d107521"
  }, {
    "url": "assets/index.html-Bg91m-so.js",
    "revision": "6be6e0669080a57d0a09148c1c1a3ae4"
  }, {
    "url": "assets/index.html-Bdb1zSgO.js",
    "revision": "266dc0d9100a2adb627511c8a1c05631"
  }, {
    "url": "assets/index.html-BZnWgP-D.js",
    "revision": "7240a278d5f1f0196725157e8b70443f"
  }, {
    "url": "assets/index.html-BWdcnC_o.js",
    "revision": "746139b3e9f600c6a265f6e4980a40ed"
  }, {
    "url": "assets/index.html-BWEUcdrt.js",
    "revision": "1ba6151b3f6409d99a69e677381de37f"
  }, {
    "url": "assets/index.html-BUgzhb5f.js",
    "revision": "b66fb8fd305a0d75395504ecba56e41f"
  }, {
    "url": "assets/index.html-BTbzBIVA.js",
    "revision": "27af7693cea4915e4848ba0711701ddd"
  }, {
    "url": "assets/index.html-BQf2SLIc.js",
    "revision": "ef38066a735a2d48ff6d667e5bfc4ca9"
  }, {
    "url": "assets/index.html-BKUGN9Xk.js",
    "revision": "0c6e4d269ee9a9ba62471bc3cf6937e2"
  }, {
    "url": "assets/index.html-BGdA3fhz.js",
    "revision": "7f130dbe7627c9e054fe29a2d3298b8d"
  }, {
    "url": "assets/index.html-BD2Y_7dT.js",
    "revision": "4132803c68c73f389a75e505e1d918c9"
  }, {
    "url": "assets/index.html-BClKoGeV.js",
    "revision": "035eaf9b5aca16a947b96b765c28b407"
  }, {
    "url": "assets/index.html-B9hvi-ql.js",
    "revision": "f0d38d7e5e19bd6f2f258c962c1ff335"
  }, {
    "url": "assets/index.html-1SVcST8v.js",
    "revision": "1ac407805bf120540fe732a9a62b2bd3"
  }, {
    "url": "assets/index.html--darIByg.js",
    "revision": "27abb429e4360789feeb3bbbb820403c"
  }, {
    "url": "assets/index-DTEEl-sV.js",
    "revision": "46a193641571106d3b7b43f9bc2a2735"
  }, {
    "url": "assets/how-llm-know-mcp-params.html-BlnExBjM.js",
    "revision": "86b711e8943ead30a85a3189e70394f4"
  }, {
    "url": "assets/giscus-BAf4_9qv.js",
    "revision": "6bba63cc83e1b2b20cd115e60344dde7"
  }, {
    "url": "assets/docker-proxy.html-B1cNY0-s.js",
    "revision": "fcd31ef942fd1710da6b9bec54f6c9c0"
  }, {
    "url": "assets/compiler.html-CmonQ4d6.js",
    "revision": "f8817595b735927c7494b1032d7c9812"
  }, {
    "url": "assets/code-visualization-intro.html-CD4R03VS.js",
    "revision": "907eee1fb38a6fe68c72024f5213de13"
  }, {
    "url": "assets/code-funny.html-DrjrJpyZ.js",
    "revision": "88e9d2cab4c668a52e851cedbbf6a950"
  }, {
    "url": "assets/cg-diff.html-ylpStleg.js",
    "revision": "0712aa5c2a48379542e2beabb2079725"
  }, {
    "url": "assets/auto-lock.html-JZTxWY7w.js",
    "revision": "d592c6c88889ceebb1ac74e8a92c032e"
  }, {
    "url": "assets/app-Vw-E8ua0.js",
    "revision": "0a5fc286ca0925f0d9dccab518c0d44e"
  }, {
    "url": "assets/ai-unit-test.html-DAma_uLk.js",
    "revision": "67df8d7151a5b5e05d2f79c79331be78"
  }, {
    "url": "assets/ai-search.html-D9k0MiqN.js",
    "revision": "a5eaafb4e0bb46504406b6aa8b5ce165"
  }, {
    "url": "assets/ai-hotspot.html-Cc3bgRnL.js",
    "revision": "a521b48093d4a75d68fd879d907ed0c5"
  }, {
    "url": "assets/ai-article-database.html-BkEDACmT.js",
    "revision": "9320f105413736b13df3ada0b06c67af"
  }, {
    "url": "assets/ai-agent.html-tHQsfIAX.js",
    "revision": "cba40b0e9fd5a4ed11879a88cf632c25"
  }, {
    "url": "assets/aff.html-Y88MtPCJ.js",
    "revision": "15d72fcd8c429c13940281e139d9c7b6"
  }, {
    "url": "assets/SearchResult-BjGHAxs6.js",
    "revision": "3d711b63693b53ca648e99b9d3b7b12b"
  }, {
    "url": "assets/5-years-summarize.html-CYpNq1FW.js",
    "revision": "0215bd6af7f17b261f85f44643be15e8"
  }, {
    "url": "assets/404.html-BjzuCcg8.js",
    "revision": "0ff02041e8192eec7de4f310d244bc29"
  }, {
    "url": "assets/2026-3-6.html-BUMzk7Hc.js",
    "revision": "5a6d94a64742529fb9b61bc978600cde"
  }, {
    "url": "assets/2026-3-4.html-I0lP1bJS.js",
    "revision": "71ebfc85c1c3785fb3930348c19a348c"
  }, {
    "url": "assets/2026-3-3.html-DWquv__o.js",
    "revision": "c28a59ce8afa07d38d31906d5275db03"
  }, {
    "url": "assets/2026-3-26.html-Z_L5MXN2.js",
    "revision": "fc04bf26b8c550252d98e2dbb24a78be"
  }, {
    "url": "assets/2026-3-24.html-DAcL-Dyz.js",
    "revision": "72d5621b918c156b4fd04d0a70f1e44d"
  }, {
    "url": "assets/2026-3-22.html-Bf2RYxr0.js",
    "revision": "3b16452f14c31e69fe804853d72ca600"
  }, {
    "url": "assets/2026-3-17.html-ucvFGspH.js",
    "revision": "13152789297a6385894e78c0c7662b26"
  }, {
    "url": "assets/2026-3-16.html-DzYVkBd9.js",
    "revision": "4b5c678a5c28024ee9b45ef3327512da"
  }, {
    "url": "assets/2025-end.html-BJzWJJim.js",
    "revision": "1b03c5c82b6cdd7cbf94d25b4fc3396a"
  }, {
    "url": "assets/2024-end.html-BviELeW2.js",
    "revision": "f624aef4fd2975c3941eb6f9f234f8df"
  }, {
    "url": "index.html",
    "revision": "ff1d391186d1ad22b8128bea354e2ab6"
  }, {
    "url": "404.html",
    "revision": "7ba19646cfe1772ae17b328e19b44cee"
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
