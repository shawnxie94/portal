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
    "url": "assets/tcp-fast-open.html-CjbRwVsC.js",
    "revision": "d300e5e8f01ee73547b3a899f7376419"
  }, {
    "url": "assets/style-D2uQfNRt.css",
    "revision": "5e837e72af909281cc7858a331d86bb6"
  }, {
    "url": "assets/regex-vis.html-DvTMpl7C.js",
    "revision": "0f04547cddd72a5b55bda5e81eec472a"
  }, {
    "url": "assets/read-flow.html-DBbHJRw0.js",
    "revision": "92dbfc8e7eeb1d3b13d03c055437e100"
  }, {
    "url": "assets/read-flow-2026.html-D-B2CgWz.js",
    "revision": "56dc8a62fe137080cbc1a2ca2ffdd2f5"
  }, {
    "url": "assets/read-code-tools.html-D9VC5LHo.js",
    "revision": "75a51ebf81330cbcf4f5a03897f27122"
  }, {
    "url": "assets/plugin-vue_export-helper-DlAUqK2U.js",
    "revision": "25e3a5dcaf00fb2b1ba0c8ecea6d2560"
  }, {
    "url": "assets/picture-manage.html-B7Wtjzof.js",
    "revision": "6add78ae406551c052497f8d4837789a"
  }, {
    "url": "assets/photoswipe.esm-BXDdABy_.js",
    "revision": "6c0bf54cf1322dab242c5bb14307d57a"
  }, {
    "url": "assets/one-cmd-web-to-app.html-BElfqOt-.js",
    "revision": "903490abd3668d66efc9aa7f9d459046"
  }, {
    "url": "assets/mac-terminal.html-CTHkgWm5.js",
    "revision": "c4f2de4ebeb75fe2ffb83412e07cb39a"
  }, {
    "url": "assets/kimi.html-Dg-IMUOI.js",
    "revision": "4695575edbae3bff698fdd61965bc79b"
  }, {
    "url": "assets/ip-exploration.html-CeZQ8FV0.js",
    "revision": "6ea00e14589b077a0ec5e97ffafd173a"
  }, {
    "url": "assets/index.html-zS_Cgo5_.js",
    "revision": "a8832b9f5cdf361af25bd9ca6f804149"
  }, {
    "url": "assets/index.html-vWACPRX4.js",
    "revision": "658c35d265f47da3c67dc10059516754"
  }, {
    "url": "assets/index.html-n1EgpoQo.js",
    "revision": "423199892ff15dabef7eddb2412e7648"
  }, {
    "url": "assets/index.html-lwqddyfR.js",
    "revision": "30b1664969689f0b39da667bcd9ba85d"
  }, {
    "url": "assets/index.html-fzljYBPQ.js",
    "revision": "b18ca3e8ed7e5a8b8d1abf1725fa1f0c"
  }, {
    "url": "assets/index.html-TIPwkkzb.js",
    "revision": "1bfbec8655be6bf134cc630b5d2cf884"
  }, {
    "url": "assets/index.html-Q_-E9xSB.js",
    "revision": "13df3e72a5cb609b059fea869d23a8b8"
  }, {
    "url": "assets/index.html-KDgXknCr.js",
    "revision": "16a01666dc6ac67f81a66c542ab81594"
  }, {
    "url": "assets/index.html-E8reWwLT.js",
    "revision": "1d7deb78b4be55d4c7c259af29b0df54"
  }, {
    "url": "assets/index.html-DzqY2KT1.js",
    "revision": "878fefea4180c5fbbe97c77871eac2e6"
  }, {
    "url": "assets/index.html-Dxr3W-hT.js",
    "revision": "8ac2d3dd7c1839800e7efd3dae11b6ea"
  }, {
    "url": "assets/index.html-DuKq1yMJ.js",
    "revision": "7f4053caca847d6b82ea7c51064bd1bf"
  }, {
    "url": "assets/index.html-DtOcjzqm.js",
    "revision": "95ce5411d54b939112d0b4bcddfa2dfd"
  }, {
    "url": "assets/index.html-DsjATycQ.js",
    "revision": "280d30de539a973a3beb0cbe9b6f6b33"
  }, {
    "url": "assets/index.html-DmbvXkfL.js",
    "revision": "d9f54480370ef0ea747401ffd69164ee"
  }, {
    "url": "assets/index.html-DdheIhBG.js",
    "revision": "f053b8db92a4b3c18fb9923a84844558"
  }, {
    "url": "assets/index.html-DZ-_9pTb.js",
    "revision": "a7d0ba8fac2689130b269e1e52797c95"
  }, {
    "url": "assets/index.html-DXmgzAcz.js",
    "revision": "771b58671a89badcd6ce9d46eeb7e16a"
  }, {
    "url": "assets/index.html-DRKdFfBG.js",
    "revision": "70b1a5eacf04b5c8656c4dae48d12bf6"
  }, {
    "url": "assets/index.html-DNcqlO8i.js",
    "revision": "196fc11f00bbc3a5a85a3f031c66bf39"
  }, {
    "url": "assets/index.html-DNJBCTXJ.js",
    "revision": "44b313c9585e9e54750890183e8c8f64"
  }, {
    "url": "assets/index.html-DFLxYcst.js",
    "revision": "493355edd3517b16f7b36f03c4b50c17"
  }, {
    "url": "assets/index.html-DCG8OMtk.js",
    "revision": "a7df3ab6266291c54df71808d1e8faba"
  }, {
    "url": "assets/index.html-D9XtAmmr.js",
    "revision": "05bab3a793752ddf70c0c78b7b321f60"
  }, {
    "url": "assets/index.html-D8m0qiwV.js",
    "revision": "ced673bbbd04c833dccd2ef7490d8073"
  }, {
    "url": "assets/index.html-D7YnZ6Vc.js",
    "revision": "7293ace257f230442cd82606edee173c"
  }, {
    "url": "assets/index.html-D7UaTmXO.js",
    "revision": "fa8c184fb113dae79a0c35b8eaa5c5f0"
  }, {
    "url": "assets/index.html-CyYs5oMz.js",
    "revision": "4016e2adb3079c84c4be6159fd815fd9"
  }, {
    "url": "assets/index.html-Cx7e8QXM.js",
    "revision": "d81640cdd23f1eee62e03cd09c9f663b"
  }, {
    "url": "assets/index.html-CrVf1Mam.js",
    "revision": "f96b3256042e9e0e3d8534dcfd594f7c"
  }, {
    "url": "assets/index.html-CgpLumtk.js",
    "revision": "3ff8aea8972cbe698083615861af0957"
  }, {
    "url": "assets/index.html-CfCBlgk6.js",
    "revision": "aa77b1f2d9e81108db0679993ff27a39"
  }, {
    "url": "assets/index.html-CQApevO3.js",
    "revision": "480ebb6b69873c9b26f38314f0e14ea3"
  }, {
    "url": "assets/index.html-CNIuOt7a.js",
    "revision": "e05266fe123dde3c33945f1e4af8b39c"
  }, {
    "url": "assets/index.html-CKFQkiqJ.js",
    "revision": "ce587f7b2cf238a03289399267c62f42"
  }, {
    "url": "assets/index.html-CBPOIK9e.js",
    "revision": "62a1ac3bf16f32e62151e97f03174d1d"
  }, {
    "url": "assets/index.html-BvGUVJVe.js",
    "revision": "8356b537c860c78b8bfc8e0f5b5e75d2"
  }, {
    "url": "assets/index.html-BlF1g-DP.js",
    "revision": "7f720e9a70b87f441dcbbcda7a443947"
  }, {
    "url": "assets/index.html-BPSihz6V.js",
    "revision": "211ecbf2a326f0df46a09391e4a206ee"
  }, {
    "url": "assets/index.html-BLzKuShW.js",
    "revision": "7758ca92c39b6d6db96df68096a36908"
  }, {
    "url": "assets/index.html-B97RrAGO.js",
    "revision": "188945f0b716e7297a3ca7ef181fc28e"
  }, {
    "url": "assets/index.html-B5goN_hb.js",
    "revision": "f255e3f8a429b1a73e02f07d592eec0f"
  }, {
    "url": "assets/index.html-B4GS9r9u.js",
    "revision": "74b44b31a06d8b4c37181fffc335202a"
  }, {
    "url": "assets/index.html-B20LT9dh.js",
    "revision": "735db78ad0a333d435b6d13a964deb0d"
  }, {
    "url": "assets/index.html-2391vUty.js",
    "revision": "6b26133adab9c34677c6f3e54827e443"
  }, {
    "url": "assets/index.html-0WCm2Ujx.js",
    "revision": "93cb2c8616fe93b49d22c0d110dca63f"
  }, {
    "url": "assets/index-DTEEl-sV.js",
    "revision": "46a193641571106d3b7b43f9bc2a2735"
  }, {
    "url": "assets/how-llm-know-mcp-params.html-DaMQNTtg.js",
    "revision": "d7cdd11971ebc4e2ce4337c4c346b781"
  }, {
    "url": "assets/giscus-BAf4_9qv.js",
    "revision": "6bba63cc83e1b2b20cd115e60344dde7"
  }, {
    "url": "assets/docker-proxy.html-CVHbCZLm.js",
    "revision": "b1b92e1794beeaabed47fdbe412819eb"
  }, {
    "url": "assets/compiler.html-C6IKnQPk.js",
    "revision": "86069941db32214d372fcf30130a8bbe"
  }, {
    "url": "assets/code-visualization-intro.html-DFGJdwkq.js",
    "revision": "afbacec65a84361a45dafb8327999656"
  }, {
    "url": "assets/code-funny.html-BGgl9MsY.js",
    "revision": "5ec82308b4366db3722bfc062dcdf186"
  }, {
    "url": "assets/cg-diff.html-DGQ7YXqR.js",
    "revision": "3ea036b262dfdfdb0f23c480289bd8d0"
  }, {
    "url": "assets/auto-lock.html-CII5oWr5.js",
    "revision": "98401ad9c5763709c2948a3e8309cfa0"
  }, {
    "url": "assets/app-fVtG1nhe.js",
    "revision": "84502d0efbad3210239b927f2cb57a8e"
  }, {
    "url": "assets/ai-unit-test.html-BRGqi6nU.js",
    "revision": "eac326eb6227f46f35c6d7544e1eccb1"
  }, {
    "url": "assets/ai-search.html-BphzpvQZ.js",
    "revision": "892f4f99d9da0c381565a6f87f2a1a60"
  }, {
    "url": "assets/ai-hotspot.html-BanlLMCt.js",
    "revision": "7c2c4538f91589a51376b23478121ed0"
  }, {
    "url": "assets/ai-article-database.html-D5ULdTzE.js",
    "revision": "8084891991bfff51fcc63cf4caaf688a"
  }, {
    "url": "assets/ai-agent.html-BYM4IEis.js",
    "revision": "076174bbae7a77556202e57172a26b45"
  }, {
    "url": "assets/SearchResult-CQN4YPOV.js",
    "revision": "a0d1d563198af01ebd6a7b91dc3f9d24"
  }, {
    "url": "assets/5-years-summarize.html-BVez624z.js",
    "revision": "063c1eef1e2835c2ade3fb14af0bb6af"
  }, {
    "url": "assets/404.html-D4DB4YjR.js",
    "revision": "b8270f94af626589d4aa916ca5f09798"
  }, {
    "url": "assets/2026-3-6.html-CdUjoNtl.js",
    "revision": "885c3008403be738ed5d0b218a780105"
  }, {
    "url": "assets/2026-3-4.html-iNUOcyZe.js",
    "revision": "7c44e41a66b60a2f0d8ebefd7f22eb63"
  }, {
    "url": "assets/2026-3-3.html-ezLQIHZs.js",
    "revision": "b45b9357e760be4f5a3c9aaabd13bb8e"
  }, {
    "url": "assets/2026-3-22.html-BGhrRs5T.js",
    "revision": "32fa24fe749257afb3b4e23b4f63656e"
  }, {
    "url": "assets/2026-3-17.html-BDifqnKk.js",
    "revision": "08b2206c8359134ce0f19f812aeefd50"
  }, {
    "url": "assets/2026-3-16.html-DbJw7nCr.js",
    "revision": "5cf868f606dda8fcddfc000567de2b2b"
  }, {
    "url": "assets/2025-end.html-DAYX_E7E.js",
    "revision": "73f6388f7ef0ee73599dc990187c2e59"
  }, {
    "url": "assets/2024-end.html-DIEN5nu2.js",
    "revision": "34d2f8bad2f3228cd5feeeb672bea646"
  }, {
    "url": "index.html",
    "revision": "ad3dc3e8b6f381b66e801eea142168ad"
  }, {
    "url": "404.html",
    "revision": "f5a0a4cb1fc588181cd9904137e85624"
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
