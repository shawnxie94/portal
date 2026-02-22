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
    "url": "assets/tcp-fast-open.html-DT3-Iu7_.js",
    "revision": "8cbfc7d4b398e737a546f1f8c601996d"
  }, {
    "url": "assets/style-D2uQfNRt.css",
    "revision": "5e837e72af909281cc7858a331d86bb6"
  }, {
    "url": "assets/regex-vis.html-T5vxVhEn.js",
    "revision": "333c89bb1ee16fde9470b12ce9086325"
  }, {
    "url": "assets/read-flow.html-mqo4DcfF.js",
    "revision": "57a3dd5ed01481aec1bd5900039dbe2b"
  }, {
    "url": "assets/read-code-tools.html-Dl2IwQH2.js",
    "revision": "bba2422fd0e2e609e29f31f8635d853b"
  }, {
    "url": "assets/plugin-vue_export-helper-DlAUqK2U.js",
    "revision": "25e3a5dcaf00fb2b1ba0c8ecea6d2560"
  }, {
    "url": "assets/picture-manage.html-BGCzaX3a.js",
    "revision": "b6575da5448ae97298d1eba536c51bbe"
  }, {
    "url": "assets/photoswipe.esm-BXDdABy_.js",
    "revision": "6c0bf54cf1322dab242c5bb14307d57a"
  }, {
    "url": "assets/one-cmd-web-to-app.html-BR0KkRne.js",
    "revision": "586aac49b9584c01a071ec577853624a"
  }, {
    "url": "assets/mac-terminal.html-BmQP19N1.js",
    "revision": "d34464418db5aa43d999fa265c5caae1"
  }, {
    "url": "assets/kimi.html-DgXr3IT1.js",
    "revision": "de0251b9dff88266f5cd1f20e6b18ce5"
  }, {
    "url": "assets/ip-exploration.html-DEOJzRxx.js",
    "revision": "865144bfc1fb3c80426314bbe2d33760"
  }, {
    "url": "assets/index.html-ydQjpOeM.js",
    "revision": "a831c06a7b46263cc5ac30c612b8ec7a"
  }, {
    "url": "assets/index.html-pmDMNWPN.js",
    "revision": "3498bfcfd3ce8e7bcbe535e1b9c19294"
  }, {
    "url": "assets/index.html-mp169tji.js",
    "revision": "f2e843f57c70a2c3c81aced07a5eff77"
  }, {
    "url": "assets/index.html-lG_yQqRd.js",
    "revision": "3034d632cd46946e24bdd2e848a9cc37"
  }, {
    "url": "assets/index.html-jFNSQs0E.js",
    "revision": "18c549e01d645ec1763e1eef3fcb0c40"
  }, {
    "url": "assets/index.html-j8Yg0U5_.js",
    "revision": "ca20465e35009f0af90670dc79e7cb4b"
  }, {
    "url": "assets/index.html-c5VFm84s.js",
    "revision": "ea0faf6e40043217bf9f0bd1016d9eee"
  }, {
    "url": "assets/index.html-bSzsHlam.js",
    "revision": "b491ece5c882669ca4820ef6087ecefb"
  }, {
    "url": "assets/index.html-Vi-9FK1N.js",
    "revision": "853004f5b6659bfc6c2dc8af00fbc7a6"
  }, {
    "url": "assets/index.html-UiMsp1y5.js",
    "revision": "d346405d694fee13e1ccc11e9117f927"
  }, {
    "url": "assets/index.html-PJVY7qnV.js",
    "revision": "6d90c08adf97d3ede5a92f76e2c6fe26"
  }, {
    "url": "assets/index.html-Oqhc76iP.js",
    "revision": "d1dcdf96ccb07907615598b6513486a1"
  }, {
    "url": "assets/index.html-Ma6MmTVH.js",
    "revision": "4917761a9d95b6059dd67e3bdfe75d90"
  }, {
    "url": "assets/index.html-HyM9H7SS.js",
    "revision": "26c5775aeccc43d9aa0d4abee95e9e6d"
  }, {
    "url": "assets/index.html-DoEtDhs7.js",
    "revision": "9c7a0b9e154c5e680080153fafb4b81a"
  }, {
    "url": "assets/index.html-DkJ-XCIt.js",
    "revision": "90e5d253111c12ba3b9b1d5129f72662"
  }, {
    "url": "assets/index.html-DjqQfZ0x.js",
    "revision": "7139dce81aee6ddabc34cfeb7e1a41d9"
  }, {
    "url": "assets/index.html-DfuQ5OEY.js",
    "revision": "41c4d05299eafa40c6bfcccb7455a656"
  }, {
    "url": "assets/index.html-DcSJr1BE.js",
    "revision": "b9ce015f87e88ddd9116fff342789a97"
  }, {
    "url": "assets/index.html-DaoCQAFH.js",
    "revision": "f3254bedbacd28491ed491c52b1f8c18"
  }, {
    "url": "assets/index.html-DaUuclhK.js",
    "revision": "87635d8211c67cf8ea4f8e4224aeefb0"
  }, {
    "url": "assets/index.html-DM_SW-fC.js",
    "revision": "79631cba4eda8eb36094212263a71e28"
  }, {
    "url": "assets/index.html-DLq8HD2t.js",
    "revision": "fb4b0147fd50b293eaf5f7606ff8e421"
  }, {
    "url": "assets/index.html-DH9owpQH.js",
    "revision": "3295737eb9129dd436f52723bbdebdeb"
  }, {
    "url": "assets/index.html-DBbDw8i7.js",
    "revision": "c4f377a3a58ad67b5270c666c205fd49"
  }, {
    "url": "assets/index.html-D-L-s8ug.js",
    "revision": "73671c0b1a3eeb5d09ec3a6829b1bf0a"
  }, {
    "url": "assets/index.html-Cn3u4q2y.js",
    "revision": "c5f36b3d4d17ec432a2c9138f8ed6ff9"
  }, {
    "url": "assets/index.html-CiQj9OMO.js",
    "revision": "05d9abc3b66fcb47d3c4dc3b2a1d0fa1"
  }, {
    "url": "assets/index.html-CiCWclWe.js",
    "revision": "a26ae7223e9e61a04240a6e5dbb6e91c"
  }, {
    "url": "assets/index.html-CgXCvJiq.js",
    "revision": "90e030eb5a064e4ff5c8d735a4f1ab07"
  }, {
    "url": "assets/index.html-Cepwrwq3.js",
    "revision": "22b13c405a074630a722831b448849b4"
  }, {
    "url": "assets/index.html-C_BEOorI.js",
    "revision": "15a61859841a760489295653c5703a4d"
  }, {
    "url": "assets/index.html-CLugHufR.js",
    "revision": "bc211d2d6d81c3d41b2811ff60f8e197"
  }, {
    "url": "assets/index.html-C2S_TFkr.js",
    "revision": "c9b37dfc25c79eaeea44891ce8e5ff57"
  }, {
    "url": "assets/index.html-C1vbjKwx.js",
    "revision": "19dc5e4f51d06f63088b2cad6a2797ee"
  }, {
    "url": "assets/index.html-BxrZaPQa.js",
    "revision": "a18c3caede37d436c9f4a2472e5b364b"
  }, {
    "url": "assets/index.html-BwvqUUM8.js",
    "revision": "a1acfbb66ac7200b52d463d6207cb111"
  }, {
    "url": "assets/index.html-BvI0WqLI.js",
    "revision": "98b5f70d61809259cec76be903e5d970"
  }, {
    "url": "assets/index.html-Bu-b-w3g.js",
    "revision": "b1d530a23f420452e3e2b4a32f7c60bc"
  }, {
    "url": "assets/index.html-Bfr8K-ei.js",
    "revision": "7690da93bce25c9aad077f1a8d1204ac"
  }, {
    "url": "assets/index.html-BdmD3W-s.js",
    "revision": "7587f44361313605d809a85b934ef88d"
  }, {
    "url": "assets/index.html-BaZiHxNa.js",
    "revision": "a6d049984a24a371679c67408947ecb4"
  }, {
    "url": "assets/index.html-BZOCEYOY.js",
    "revision": "17c79a4898b9d04ae4f1bb542d7a2ff6"
  }, {
    "url": "assets/index.html-BXFKTb3Y.js",
    "revision": "87adf617a9123a53b5df34d3f09a84b4"
  }, {
    "url": "assets/index.html-BWAf4lwo.js",
    "revision": "0f3e0722a815db414911a98d9a29eef6"
  }, {
    "url": "assets/index.html-BSIwaNK3.js",
    "revision": "c669b3940a6bb5eebfd93aa946bb1fbf"
  }, {
    "url": "assets/index.html-BR_JXv3j.js",
    "revision": "6391f5b8399470bf6f8018259af17712"
  }, {
    "url": "assets/index.html-BGGZ4J1r.js",
    "revision": "f24f575b6087f3e62dea8ae22c2685d9"
  }, {
    "url": "assets/index.html-BFb0hb3c.js",
    "revision": "d66099568d1d87afa1e8193eee8dfc7c"
  }, {
    "url": "assets/index.html-BC41Ng7a.js",
    "revision": "bfccd003be922e1b82107ffb7cbe54a7"
  }, {
    "url": "assets/index.html-B3vz4Nun.js",
    "revision": "4b79ef2a98a74b42cb014780f77d6abf"
  }, {
    "url": "assets/index.html-9Y4KCzmE.js",
    "revision": "fc853124588eae3bda74d2e4d1b853a8"
  }, {
    "url": "assets/index.html-3x2gjTOW.js",
    "revision": "4264478c0747fb0f587f1b0102b6792a"
  }, {
    "url": "assets/index.html-3ekaToBk.js",
    "revision": "c9466ec5f97d6f6132014f7bb34edc67"
  }, {
    "url": "assets/index.html-1eX7JgyF.js",
    "revision": "b5b03a65214cefc3cbd2769fdb0403c2"
  }, {
    "url": "assets/index.html-0j-EsCHX.js",
    "revision": "c6f801c30f0fdc04e0253cd5ff6b10f0"
  }, {
    "url": "assets/index-DTEEl-sV.js",
    "revision": "46a193641571106d3b7b43f9bc2a2735"
  }, {
    "url": "assets/how-llm-know-mcp-params.html--Ijuf6Mr.js",
    "revision": "1a2e7fd23546bd4243a138b33c8d9443"
  }, {
    "url": "assets/giscus-BAf4_9qv.js",
    "revision": "6bba63cc83e1b2b20cd115e60344dde7"
  }, {
    "url": "assets/docker-proxy.html-EiIfMxCR.js",
    "revision": "85f88c532e81d55d3dffb7482d4a873a"
  }, {
    "url": "assets/compiler.html-CPGhnxwe.js",
    "revision": "64b8976c477e076768aed094700885a0"
  }, {
    "url": "assets/code-visualization-intro.html-oN-qhtnR.js",
    "revision": "b39dc6b14fea36dcb06a0d1797836d3c"
  }, {
    "url": "assets/code-funny.html-D_lzT4if.js",
    "revision": "e21cc41a700a30a1abb62de60d9c16f3"
  }, {
    "url": "assets/cg-diff.html-Bkq3ZELN.js",
    "revision": "e056c73a078b0278f82fce46149fdcbf"
  }, {
    "url": "assets/auto-lock.html-rdn27r2f.js",
    "revision": "9e73d7caebdf12b229d5ec1017497d82"
  }, {
    "url": "assets/app-TdRmB4AX.js",
    "revision": "99d05d3dfeecf22a2d8ef2e77b891990"
  }, {
    "url": "assets/ai-unit-test.html-By_vbDGP.js",
    "revision": "6dd7e5b7ac3966ae28942a8e5836f455"
  }, {
    "url": "assets/ai-search.html-BAK5wSl-.js",
    "revision": "c022b6f32ed5f415784ca2dbec69636e"
  }, {
    "url": "assets/ai-hotspot.html-B6Y1YxiN.js",
    "revision": "a059ac88b56c40328e083c25cb78d74f"
  }, {
    "url": "assets/ai-article-database.html-B5w97ULx.js",
    "revision": "5445c45c8725136279448c15d59838a1"
  }, {
    "url": "assets/ai-agent.html-CcY7f87t.js",
    "revision": "cc2c503e9a3b5a70b28bf6c82c5031e7"
  }, {
    "url": "assets/SearchResult-Bmm34nN_.js",
    "revision": "53bd60094d2164ba26795cdab11cf3a7"
  }, {
    "url": "assets/5-years-summarize.html-CPt16-rE.js",
    "revision": "f41ea0619853bd77e585e45f94d1f249"
  }, {
    "url": "assets/404.html-DvUxcdbr.js",
    "revision": "44cbf03099bc6d8df49f8084e82a57a9"
  }, {
    "url": "assets/2025-end.html-1vlqLaJ-.js",
    "revision": "81aad3a97ab056985b31ea857fdb0f08"
  }, {
    "url": "assets/2024-end.html-gCZ0ueJT.js",
    "revision": "40585fad33501eebf99f8f44d50c7882"
  }, {
    "url": "index.html",
    "revision": "f09974002343bddbaa1d29046a3389d1"
  }, {
    "url": "404.html",
    "revision": "f99467880c3a4844d420629df70470d0"
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
