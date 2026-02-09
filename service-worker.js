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
    "url": "assets/tcp-fast-open.html-DGShU4dW.js",
    "revision": "002b1d88bf8ac046fd09dccd24640255"
  }, {
    "url": "assets/style-D2uQfNRt.css",
    "revision": "5e837e72af909281cc7858a331d86bb6"
  }, {
    "url": "assets/regex-vis.html-CQxX8xZg.js",
    "revision": "438a40e0d8d900a29d5d68dddbf50a7c"
  }, {
    "url": "assets/read-flow.html-D-u25SVG.js",
    "revision": "3a6b920f6743853a390a2ad05edcf892"
  }, {
    "url": "assets/read-code-tools.html-CYwvAPtK.js",
    "revision": "241c4f98fafe59b3939d24fd0f4cbc53"
  }, {
    "url": "assets/plugin-vue_export-helper-DlAUqK2U.js",
    "revision": "25e3a5dcaf00fb2b1ba0c8ecea6d2560"
  }, {
    "url": "assets/picture-manage.html-CIpbxoOt.js",
    "revision": "26e4b6e3e5d4ca6c6ace8296568849c6"
  }, {
    "url": "assets/photoswipe.esm-BXDdABy_.js",
    "revision": "6c0bf54cf1322dab242c5bb14307d57a"
  }, {
    "url": "assets/one-cmd-web-to-app.html-D7u4ATII.js",
    "revision": "53d2bc8da630f90607d2c1914db231bd"
  }, {
    "url": "assets/mac-terminal.html-De-FujcD.js",
    "revision": "e354d3ac57fd4378e5e020878f10556c"
  }, {
    "url": "assets/kimi.html-DYIx62GB.js",
    "revision": "c966db805dea335004ea22f0ba5e9b23"
  }, {
    "url": "assets/ip-exploration.html-DTnQgley.js",
    "revision": "2ba911bf5b3a378675c9fd6a529f01d8"
  }, {
    "url": "assets/index.html-xPUT-yEq.js",
    "revision": "e0c8c7b8f4d60c5afbcb60c667931325"
  }, {
    "url": "assets/index.html-vhVguFyU.js",
    "revision": "372e1284c085a68724b3c247f1e685ae"
  }, {
    "url": "assets/index.html-rpTQPOpN.js",
    "revision": "0058da4b3794995c4a25010f4b35f395"
  }, {
    "url": "assets/index.html-qRtWVWmF.js",
    "revision": "70da9da45c41b03b1263a7024d42e3ae"
  }, {
    "url": "assets/index.html-p0geNGIB.js",
    "revision": "8bc781330a3385a88101a17036cd12d2"
  }, {
    "url": "assets/index.html-mXQol9jH.js",
    "revision": "73ec293e0eabb932b286e037e00a360a"
  }, {
    "url": "assets/index.html-hBl-oDaV.js",
    "revision": "957718d660877453cbef4a3d04f965bb"
  }, {
    "url": "assets/index.html-h3B5G_mz.js",
    "revision": "bf4323515a9a38e8aaa382ccb9df3771"
  }, {
    "url": "assets/index.html-gs5sN9gB.js",
    "revision": "adf7e5eb489b1c4d57bd9ad6247dffd0"
  }, {
    "url": "assets/index.html-W2S-fnFw.js",
    "revision": "38f5e204dff84b689103747678c4811b"
  }, {
    "url": "assets/index.html-Ug1LnS_B.js",
    "revision": "dd1c82d7c532ab9a52bceb1207596a29"
  }, {
    "url": "assets/index.html-MgG5jbxd.js",
    "revision": "e1b6378913d4dee695816ecf33c9112c"
  }, {
    "url": "assets/index.html-KNzAFRbS.js",
    "revision": "dab242da706dfa17a8ca5be8dd066c75"
  }, {
    "url": "assets/index.html-EoMU2OOd.js",
    "revision": "f29142f68ba7705fdc413f449da1147f"
  }, {
    "url": "assets/index.html-DxXPcVaE.js",
    "revision": "2d0d24c978449c7d486a8bd2d0f100ac"
  }, {
    "url": "assets/index.html-Du9SEz_q.js",
    "revision": "a0b414afe21509f416701af2f21b2e11"
  }, {
    "url": "assets/index.html-Dsm1lHW-.js",
    "revision": "61feb93110fed756069f354a39d9c8d7"
  }, {
    "url": "assets/index.html-Dsio0kqQ.js",
    "revision": "deefe9d54b1bd0af040dae99ac735a61"
  }, {
    "url": "assets/index.html-DpSQDcQ5.js",
    "revision": "78160693bea19224b9e8e3b3e34efae3"
  }, {
    "url": "assets/index.html-DnuPuPXW.js",
    "revision": "cee4b445b664f226ade65f51226a50d3"
  }, {
    "url": "assets/index.html-DmmTH9Sx.js",
    "revision": "9a9cfe6cbba1c1fa0725dc5a0971c531"
  }, {
    "url": "assets/index.html-DjrVo4P4.js",
    "revision": "ce619f8693426525bc69421fb47829db"
  }, {
    "url": "assets/index.html-DiyW2oqg.js",
    "revision": "e71165b4ca1473b2bf91b71bc22a5f2e"
  }, {
    "url": "assets/index.html-Di4FVdTh.js",
    "revision": "3da6c38c0ee60e064c320d8cffef0839"
  }, {
    "url": "assets/index.html-Dhzs6wvz.js",
    "revision": "966bb9c3e656e3bbd80e6b5d972190f2"
  }, {
    "url": "assets/index.html-DbHgwGZO.js",
    "revision": "857ddac98e546589545bf759e3b81b90"
  }, {
    "url": "assets/index.html-Db2rKaPp.js",
    "revision": "b64d4fda336d44ab43c5e70f47794539"
  }, {
    "url": "assets/index.html-DZ9mzFSL.js",
    "revision": "15566801a13d2552d964d93b0a1db817"
  }, {
    "url": "assets/index.html-DWzLfSkv.js",
    "revision": "2dcc8d94587fdacddd2393b334693a76"
  }, {
    "url": "assets/index.html-DHuvOIRH.js",
    "revision": "25c202a444d69e50f0d9c772ece0a39b"
  }, {
    "url": "assets/index.html-DHCLyJJ8.js",
    "revision": "b784f7f9bec8c2f26823812d06052218"
  }, {
    "url": "assets/index.html-D6KkfyTV.js",
    "revision": "f0257c5d940833d07dc9ea325844fd6a"
  }, {
    "url": "assets/index.html-CkeHBjSh.js",
    "revision": "8daabebf45edfc5b6c24981ebd4883e5"
  }, {
    "url": "assets/index.html-CZEcWT6x.js",
    "revision": "4dc42dc244caa4ddebde84c7952c0cd6"
  }, {
    "url": "assets/index.html-CQVfvb1L.js",
    "revision": "7dcc406372334f8dfaa01dc0fb647a08"
  }, {
    "url": "assets/index.html-CLTvhFSv.js",
    "revision": "cdfa1aa286d1ae6fb586250419a1f484"
  }, {
    "url": "assets/index.html-CIkTO276.js",
    "revision": "189fe0c1e7273956ce5194f7265b71a6"
  }, {
    "url": "assets/index.html-BygCsWlE.js",
    "revision": "e26d81923ace799ac825324c557db889"
  }, {
    "url": "assets/index.html-Bxl2ASTL.js",
    "revision": "37dd0834bb4dabfb047c6d7798dcf8f1"
  }, {
    "url": "assets/index.html-Bni8l1cs.js",
    "revision": "b551bdbc517285eef6c37d8b4d6253e7"
  }, {
    "url": "assets/index.html-BmQSIV5_.js",
    "revision": "a85106e64012b3c89d235374f2c7dea3"
  }, {
    "url": "assets/index.html-Blc_y4Gu.js",
    "revision": "f85821c6adfbb982fe7a690e7558b15a"
  }, {
    "url": "assets/index.html-BkkccqLB.js",
    "revision": "60e4f2bf9d7ed4320361d41c2928cdc9"
  }, {
    "url": "assets/index.html-BghfSCqp.js",
    "revision": "24c818b1902a4fb16c0cb37bbef2c86e"
  }, {
    "url": "assets/index.html-BcmQH4bB.js",
    "revision": "c6f4395ca0fc206d910e0f32261d8142"
  }, {
    "url": "assets/index.html-BbST19_I.js",
    "revision": "6d4e3190f52fc36dba363614503a7bd1"
  }, {
    "url": "assets/index.html-BWSZ2sym.js",
    "revision": "898b490d6220192b3a9cb1e9469acc6e"
  }, {
    "url": "assets/index.html-BVL0Dr_u.js",
    "revision": "a2b246cd5eaa85b899bcdee8f44aaab2"
  }, {
    "url": "assets/index.html-BSl9z7KA.js",
    "revision": "b5a7a4af2901b9e1835d821f3e5d84c3"
  }, {
    "url": "assets/index.html-BM2JQB1k.js",
    "revision": "2a0a6007cf636e6e89c519b68d5dae36"
  }, {
    "url": "assets/index.html-BL9gIBmP.js",
    "revision": "6557b8e211f905612fe3ef5aee7953e4"
  }, {
    "url": "assets/index.html-BGwt_SgC.js",
    "revision": "329f732858f69417f75e1a8e985301ff"
  }, {
    "url": "assets/index.html-BCGg8jd6.js",
    "revision": "df4632df9e48506994b8d18f45ce6019"
  }, {
    "url": "assets/index.html-BACLmCuO.js",
    "revision": "91a69bc330e73c193f915617f723976a"
  }, {
    "url": "assets/index.html-B683pukS.js",
    "revision": "0bb3e748c68c3fc32b976fda05791cab"
  }, {
    "url": "assets/index.html-B3AsIj8P.js",
    "revision": "a7835f3c3160c02060a619cbf5c6f7c9"
  }, {
    "url": "assets/index-DTEEl-sV.js",
    "revision": "46a193641571106d3b7b43f9bc2a2735"
  }, {
    "url": "assets/how-llm-know-mcp-params.html-Bq2-7D4v.js",
    "revision": "abc30465ce1968fd93c8d4f2a98a476b"
  }, {
    "url": "assets/giscus-BAf4_9qv.js",
    "revision": "6bba63cc83e1b2b20cd115e60344dde7"
  }, {
    "url": "assets/docker-proxy.html-DPX-0i_i.js",
    "revision": "9d104e7f5d803320efb0b0a5c11982b3"
  }, {
    "url": "assets/compiler.html-TAcbOxaB.js",
    "revision": "70f7419e7c041fd3283611bfce16202f"
  }, {
    "url": "assets/code-visualization-intro.html-BnhaqC52.js",
    "revision": "9fc7e8f563fb3673414d2fd6cbedadfb"
  }, {
    "url": "assets/code-funny.html-BMProziG.js",
    "revision": "bccf24e62c266fbcb3657326b7d6dd95"
  }, {
    "url": "assets/cg-diff.html-B1UNiz7I.js",
    "revision": "2655e68440fdea359da1febc00f85193"
  }, {
    "url": "assets/auto-lock.html-BN54bYLm.js",
    "revision": "701f5b781d254f574eef575bf39570ee"
  }, {
    "url": "assets/app-9okZt9t7.js",
    "revision": "972b507511f5c1474db6f31f83c4e699"
  }, {
    "url": "assets/ai-unit-test.html-8trcNwe6.js",
    "revision": "9fdf5eac64ba18bde1b923099adcede4"
  }, {
    "url": "assets/ai-search.html-DWr9GsdR.js",
    "revision": "98a21191c80a24ece5f5e4b5d6c59c66"
  }, {
    "url": "assets/ai-hotspot.html-DqmMy7t1.js",
    "revision": "309eb6e138a5d836e81762b0c5844544"
  }, {
    "url": "assets/ai-article-database.html-Cz_OfgQN.js",
    "revision": "46a947170b55b579a01ec1fa34b56c25"
  }, {
    "url": "assets/ai-agent.html-DRtKomem.js",
    "revision": "2dd7e709fa700eac0425acce31121a45"
  }, {
    "url": "assets/SearchResult-B3twfSMW.js",
    "revision": "a25ae5b0e70b47a046b631e714b25d0a"
  }, {
    "url": "assets/5-years-summarize.html-DyA7bfDX.js",
    "revision": "3c528a0ff3e512c7efd2ddd8f88e75a6"
  }, {
    "url": "assets/404.html-KvVANoTl.js",
    "revision": "950fcda6e8666f1a25d1418af923182e"
  }, {
    "url": "assets/2024-end.html-BL7Pmr7v.js",
    "revision": "107cce5729071434ae40a97ecec065b5"
  }, {
    "url": "index.html",
    "revision": "4307a2abee7bba0c4fed7aa942a4bcc1"
  }, {
    "url": "404.html",
    "revision": "78a8f42782d8c6bae3053ac2b35b8e5b"
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
