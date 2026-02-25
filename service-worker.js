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
    "url": "assets/tcp-fast-open.html-DAvAFlu2.js",
    "revision": "b61065e8e6febd70535161ab0526eb47"
  }, {
    "url": "assets/style-D2uQfNRt.css",
    "revision": "5e837e72af909281cc7858a331d86bb6"
  }, {
    "url": "assets/regex-vis.html-BkUSrBRh.js",
    "revision": "7f39587402bab4065f38826f5c28d96b"
  }, {
    "url": "assets/read-flow.html-BM8mbIFM.js",
    "revision": "a72157e8520f9bfb105058f7202e4fa0"
  }, {
    "url": "assets/read-code-tools.html-wfPweqEB.js",
    "revision": "71533aa6a9caef0e009bc373d5c8eb4d"
  }, {
    "url": "assets/plugin-vue_export-helper-DlAUqK2U.js",
    "revision": "25e3a5dcaf00fb2b1ba0c8ecea6d2560"
  }, {
    "url": "assets/picture-manage.html-7eKmmn-a.js",
    "revision": "edd0113d03b0d1e017ff3b2abd60f1cd"
  }, {
    "url": "assets/photoswipe.esm-BXDdABy_.js",
    "revision": "6c0bf54cf1322dab242c5bb14307d57a"
  }, {
    "url": "assets/one-cmd-web-to-app.html-DGYPBGju.js",
    "revision": "0b1227e7850c4aca0c02055740f05daa"
  }, {
    "url": "assets/mac-terminal.html-D2O2Jp61.js",
    "revision": "8404f12db56517db5381654b64a14f39"
  }, {
    "url": "assets/kimi.html-D_08pguO.js",
    "revision": "1fb1bcd5b4723e186fbe69f23e1ef15a"
  }, {
    "url": "assets/ip-exploration.html-h3vxNgkz.js",
    "revision": "d7b0c1e9c094f4e814be879c935bff70"
  }, {
    "url": "assets/index.html-pyZ68xTB.js",
    "revision": "b0fce022cec811ebb20b7534cc7387c9"
  }, {
    "url": "assets/index.html-jWxOFWeZ.js",
    "revision": "e4b932189579cd96227a77b4450fb656"
  }, {
    "url": "assets/index.html-idnBDiJY.js",
    "revision": "4ac8730633a220ec240bf3152263f17d"
  }, {
    "url": "assets/index.html-i8IoyX_V.js",
    "revision": "7eaa574b2e8b50525e40810928854f41"
  }, {
    "url": "assets/index.html-fOMMpejH.js",
    "revision": "25d41446a00cffc285dc237b44e8f26b"
  }, {
    "url": "assets/index.html-dieE_rpE.js",
    "revision": "18efb5579a5c4889a8a2b6be6b4c93d2"
  }, {
    "url": "assets/index.html-ctPuqZ9R.js",
    "revision": "139bf3a9952bfbe91467afe1c223f73e"
  }, {
    "url": "assets/index.html-b8VpnXeR.js",
    "revision": "a5b6003b48490b798d9be4fc6249e3de"
  }, {
    "url": "assets/index.html-S91IaR-f.js",
    "revision": "bf6382607c63caf1d9580c4a140b6414"
  }, {
    "url": "assets/index.html-OpU1m05r.js",
    "revision": "b24a0158973e35805343abbb1cc5128b"
  }, {
    "url": "assets/index.html-OHo-P24K.js",
    "revision": "71b75636e7caa5845149d7bf1194c7b0"
  }, {
    "url": "assets/index.html-MKxC4yZs.js",
    "revision": "9160747c3fd67d51f8630b609273bb07"
  }, {
    "url": "assets/index.html-Lr3siW2N.js",
    "revision": "f812b5fc0051a6f7bf62ce42c604867e"
  }, {
    "url": "assets/index.html-DsMLwSUB.js",
    "revision": "0c6dc2fc4a8b0906c2e3a60fa137678b"
  }, {
    "url": "assets/index.html-DlW-KdtM.js",
    "revision": "016aed693911e6464bc1c7eb9700451f"
  }, {
    "url": "assets/index.html-Dl8Ua3ga.js",
    "revision": "7f45147984ebd8eb7181ea47be3f7be5"
  }, {
    "url": "assets/index.html-Dglh5uTr.js",
    "revision": "8ca0d0261fe5618ef551d0bc0cd28fba"
  }, {
    "url": "assets/index.html-DRkqi40A.js",
    "revision": "9088507dbe2d1c302461ae8715e39bff"
  }, {
    "url": "assets/index.html-DQ7_sbyP.js",
    "revision": "438e4dce71156094d4db78fa1936f641"
  }, {
    "url": "assets/index.html-DOKLKzQD.js",
    "revision": "c5242cb3f82f429966e218cce4915ad4"
  }, {
    "url": "assets/index.html-DNEQ82i6.js",
    "revision": "4c1b992f27efdbc76bfcfe7962a4bea3"
  }, {
    "url": "assets/index.html-DK_wuB-A.js",
    "revision": "472e5279444abfa31cd818b7e8bc23e3"
  }, {
    "url": "assets/index.html-DFPvS9J9.js",
    "revision": "19dc64b45993f0eb54e2a8eac7122b78"
  }, {
    "url": "assets/index.html-DAiLAT9G.js",
    "revision": "825988ade4df3efd21c71e4a03aa7e3e"
  }, {
    "url": "assets/index.html-D929RVyo.js",
    "revision": "a60ea4f438eb395c08713e4174bf750c"
  }, {
    "url": "assets/index.html-D8rfI9lH.js",
    "revision": "edef1c6f8447039aa313ccd5aef0a3f5"
  }, {
    "url": "assets/index.html-D56UVLG5.js",
    "revision": "5f3f02b8d6eda8516cd7be35b25a20ea"
  }, {
    "url": "assets/index.html-D1SKC-wT.js",
    "revision": "67fb6dde6afe1b3d558db0043f9cfc86"
  }, {
    "url": "assets/index.html-D14sGxxc.js",
    "revision": "9f57ac28f09cd6674c92e1b60faae908"
  }, {
    "url": "assets/index.html-CzoWXYdI.js",
    "revision": "d3275ec5f322495eb20c80e8f09b0d5d"
  }, {
    "url": "assets/index.html-Czf2agFX.js",
    "revision": "45bc13ed4a37655115e184b992d3550f"
  }, {
    "url": "assets/index.html-CuO8Ho20.js",
    "revision": "364c7cff71154e200e5bee26c8e33649"
  }, {
    "url": "assets/index.html-CtSdzg0M.js",
    "revision": "79f53e1ff25aad7b260709881abf2822"
  }, {
    "url": "assets/index.html-CnesDvjK.js",
    "revision": "8bdb93e61a601cd4101e52b62e868e8b"
  }, {
    "url": "assets/index.html-CnJqhE7K.js",
    "revision": "d6a7b65954a3c2071b7abc910f9d34aa"
  }, {
    "url": "assets/index.html-CkGWpETk.js",
    "revision": "7fd6f00f2460646a3fc83f6d90c74c18"
  }, {
    "url": "assets/index.html-CbE4nJJt.js",
    "revision": "48e4c4cdcc9c970cab476b427b707329"
  }, {
    "url": "assets/index.html-Ca7JKiau.js",
    "revision": "7de94482e0df7f64f61dfa6082263443"
  }, {
    "url": "assets/index.html-C_tEFxBv.js",
    "revision": "b35968ea2abe6735bfe4df08ba3d4eb2"
  }, {
    "url": "assets/index.html-CXcJIGGA.js",
    "revision": "02f6421cd82e21f12a9f95f3a1fcb826"
  }, {
    "url": "assets/index.html-CS-zVM5A.js",
    "revision": "222314be39e75ce597514f851393497c"
  }, {
    "url": "assets/index.html-CROhEzyn.js",
    "revision": "9089c7084d323a17bd5ce4449ae64839"
  }, {
    "url": "assets/index.html-CLvV1gu4.js",
    "revision": "5dcf48afb40fd2d370578220929bf92a"
  }, {
    "url": "assets/index.html-CI_PiBvj.js",
    "revision": "c2cfc83e7eff5bfaada1b81a3d470626"
  }, {
    "url": "assets/index.html-CAbQqQyV.js",
    "revision": "f17c8a9c168960c1723497f46cd253f8"
  }, {
    "url": "assets/index.html-C1-reWz4.js",
    "revision": "1799a3f7c2218c945133cede14036975"
  }, {
    "url": "assets/index.html-BfMiG9sd.js",
    "revision": "02f4096e4d5800d9fab937d0dde97699"
  }, {
    "url": "assets/index.html-Baq6FYQd.js",
    "revision": "1dfdda4a83ab79eec1f712b20ba5e10c"
  }, {
    "url": "assets/index.html-BS5yQ0Fy.js",
    "revision": "75a1526f7f927ed8ba6c0e9c421a83a7"
  }, {
    "url": "assets/index.html-BQbXfYKe.js",
    "revision": "06c9fc41bc37cddab442ca92b2cccb84"
  }, {
    "url": "assets/index.html-BPzH0ZS1.js",
    "revision": "ee041f3ef0ee7c787a99a94486618f1e"
  }, {
    "url": "assets/index.html-BNaDDosg.js",
    "revision": "260e5afe54697f3b0776c550c8db24db"
  }, {
    "url": "assets/index.html-BH4SNyF4.js",
    "revision": "dd82239cf35fd7e5c1ec178206c804c6"
  }, {
    "url": "assets/index.html-BG0ez1iW.js",
    "revision": "469a42d858da2f817042e64b3176286e"
  }, {
    "url": "assets/index.html-B1Yd7lfK.js",
    "revision": "c6b8f8bd3bf966eb34f5c20f7458d8ec"
  }, {
    "url": "assets/index.html-38ztM-KP.js",
    "revision": "bda1fb881416449eb221f623ba3cab09"
  }, {
    "url": "assets/index-DTEEl-sV.js",
    "revision": "46a193641571106d3b7b43f9bc2a2735"
  }, {
    "url": "assets/how-llm-know-mcp-params.html-o9UrWjet.js",
    "revision": "024c9e0b509c11697d04ddb9490d92d6"
  }, {
    "url": "assets/giscus-BAf4_9qv.js",
    "revision": "6bba63cc83e1b2b20cd115e60344dde7"
  }, {
    "url": "assets/docker-proxy.html-BBjk9BAB.js",
    "revision": "5f1940b9a7b4dce16945fd87574535b7"
  }, {
    "url": "assets/compiler.html-DQzXXtpd.js",
    "revision": "05d6d87ba7ff5ad9d2e9cb5f12d4e880"
  }, {
    "url": "assets/code-visualization-intro.html-482m9wTs.js",
    "revision": "22c1a31c281b012b12e7afe13d0229d6"
  }, {
    "url": "assets/code-funny.html-BGvojght.js",
    "revision": "51458f65138fe266c0af0fdb76837633"
  }, {
    "url": "assets/cg-diff.html-BaSpBAE_.js",
    "revision": "aac46cff95513a6f662252fd9ca6d1ad"
  }, {
    "url": "assets/auto-lock.html-CNDTr_y2.js",
    "revision": "64b52f5713748ca41bb251068bae8c7d"
  }, {
    "url": "assets/app-CiUzioJ7.js",
    "revision": "44a66049f4184d5211ec7cff24e647be"
  }, {
    "url": "assets/ai-unit-test.html-6rbmRnBD.js",
    "revision": "1e79f2da3c5934b1daee9feff9b98c1e"
  }, {
    "url": "assets/ai-search.html-DApTxMeW.js",
    "revision": "2ceaba129306fc8bbd7024f604d3838c"
  }, {
    "url": "assets/ai-hotspot.html-DXUrB7Me.js",
    "revision": "eeb5ca0b47511f65b9c1fdfbfe38f67b"
  }, {
    "url": "assets/ai-article-database.html-DYjbpC8R.js",
    "revision": "8c1b0b21f9431f1dc3aa998d93b9a7fc"
  }, {
    "url": "assets/ai-agent.html-9p2UyDoG.js",
    "revision": "dd32930273c24f436fdd6a45a09427a0"
  }, {
    "url": "assets/SearchResult-CLulICJp.js",
    "revision": "6d0baac216a8ff810168c84f377e8551"
  }, {
    "url": "assets/5-years-summarize.html-3Q0nacP2.js",
    "revision": "ac4ff43c99481098c645c65d73f6432b"
  }, {
    "url": "assets/404.html-TD9UsgxO.js",
    "revision": "3547e8222a9a648d3c744a0af7eed32f"
  }, {
    "url": "assets/2025-end.html-C0G9Mthm.js",
    "revision": "3fe61c350c397a036f56104849585ab7"
  }, {
    "url": "assets/2024-end.html-B6y62T_E.js",
    "revision": "294b568e5c37b3e47c48f7c9da43dca3"
  }, {
    "url": "index.html",
    "revision": "9bcf7b49868b9cd65839e04130436d1f"
  }, {
    "url": "404.html",
    "revision": "e8d17a2ca592c55170530b35dce0c82d"
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
