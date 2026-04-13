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
    "url": "assets/tcp-fast-open.html-BYRuO9LX.js",
    "revision": "619c1c6ce2809abc26b6e9c533f60c07"
  }, {
    "url": "assets/style-D2uQfNRt.css",
    "revision": "5e837e72af909281cc7858a331d86bb6"
  }, {
    "url": "assets/regex-vis.html-B4-1KHSO.js",
    "revision": "ba232fc34a1823e5e22979bc584f6fa3"
  }, {
    "url": "assets/read-flow.html-vgGRmD-c.js",
    "revision": "42e9f63cde80e645261faa3745f76d29"
  }, {
    "url": "assets/read-flow-2026.html-D2Xbc5NL.js",
    "revision": "e7eb4b01e24a6e1fb5bcfb9068be159a"
  }, {
    "url": "assets/read-code-tools.html-CWSUJyTD.js",
    "revision": "6c84fb5221588090c912766f7c1b1ee4"
  }, {
    "url": "assets/plugin-vue_export-helper-DlAUqK2U.js",
    "revision": "25e3a5dcaf00fb2b1ba0c8ecea6d2560"
  }, {
    "url": "assets/picture-manage.html-D9B4KMlb.js",
    "revision": "f2e54e916c61215f4a0be5ed30631ee2"
  }, {
    "url": "assets/photoswipe.esm-BXDdABy_.js",
    "revision": "6c0bf54cf1322dab242c5bb14307d57a"
  }, {
    "url": "assets/one-cmd-web-to-app.html-wgt28spx.js",
    "revision": "4169900949ba6a5da6b38b11efd650e4"
  }, {
    "url": "assets/mac-terminal.html-BpAvpMQU.js",
    "revision": "e0e4feea698166fee5e3fc0410963cbc"
  }, {
    "url": "assets/kimi.html-pmePtj4b.js",
    "revision": "ee90b4018c4c3aefb74e3eb2b839ec18"
  }, {
    "url": "assets/ip-exploration.html-DYkOVDJw.js",
    "revision": "d55f14438aa72773401749fdb6d0fb4d"
  }, {
    "url": "assets/index.html-uOubr8wn.js",
    "revision": "46dfbfde4e7da6bd7b0587855aab6e6d"
  }, {
    "url": "assets/index.html-k-diCbWL.js",
    "revision": "63ffdcd9b4726c941cbfb16b852cda50"
  }, {
    "url": "assets/index.html-jteMQrvt.js",
    "revision": "fa98c7727ee17f8332691b91432b83df"
  }, {
    "url": "assets/index.html-ifWT_l8C.js",
    "revision": "f5580af3a68ae26b8918bb70da52e219"
  }, {
    "url": "assets/index.html-f0e8qKgE.js",
    "revision": "82cbecb95cd3e89a367562a564ac05b4"
  }, {
    "url": "assets/index.html-cTX5XX20.js",
    "revision": "40b3596716dff33b387fef295babcd3e"
  }, {
    "url": "assets/index.html-bua0kCXW.js",
    "revision": "28f199fff2135a05c3df7f8e89da285b"
  }, {
    "url": "assets/index.html-_cHgXk61.js",
    "revision": "649b80f2c85f3143333da1fb269f0a59"
  }, {
    "url": "assets/index.html-ZxGNs4Jv.js",
    "revision": "a0a038ecb5b7e4c653731cb3b1bb3693"
  }, {
    "url": "assets/index.html-SyPKb33T.js",
    "revision": "e30834d99765fc2e74f3a5067df24b03"
  }, {
    "url": "assets/index.html-KhQABbaE.js",
    "revision": "a44c428dafb5c023321dc7324a6b561f"
  }, {
    "url": "assets/index.html-E2633vg4.js",
    "revision": "c0011cc6ac423cf1ca6eceebd10e13af"
  }, {
    "url": "assets/index.html-Dz5Gpjxg.js",
    "revision": "2b4427d49bfc9970b8c064316930d371"
  }, {
    "url": "assets/index.html-Dtidi2qY.js",
    "revision": "6848bf573c631ae3361ae2833854f66a"
  }, {
    "url": "assets/index.html-DriJYMT8.js",
    "revision": "c42632acd603a01b8d96ec41cc711034"
  }, {
    "url": "assets/index.html-DrbFH5BR.js",
    "revision": "d8b12f99bd875119f8589bc761521e74"
  }, {
    "url": "assets/index.html-DoOvrkBp.js",
    "revision": "29cf9bc0368a6faa9634c1354485cdbd"
  }, {
    "url": "assets/index.html-DntRrdUh.js",
    "revision": "ce058df2257065e007015b590357fb41"
  }, {
    "url": "assets/index.html-DZxT9NjJ.js",
    "revision": "c713216ccae9c02b58aafdb1588716b8"
  }, {
    "url": "assets/index.html-DYplmuCQ.js",
    "revision": "a85a206dac54b444151e19b0c6d491fb"
  }, {
    "url": "assets/index.html-DOxeffGC.js",
    "revision": "21df2d25226dcbf8364b21202d7b6c83"
  }, {
    "url": "assets/index.html-D2AeLIDp.js",
    "revision": "548fe683087b13e7aa8a70bcb4892681"
  }, {
    "url": "assets/index.html-D1s79YeT.js",
    "revision": "0ff232373e3c4b8e51b7b32651681d7f"
  }, {
    "url": "assets/index.html-CvriUHqG.js",
    "revision": "b2116d5aebdd979daa187abfc5ceef62"
  }, {
    "url": "assets/index.html-CvUWJ1OD.js",
    "revision": "070173c5d97d3348f9c9e2e81cc021a2"
  }, {
    "url": "assets/index.html-Ctb0lGbQ.js",
    "revision": "13d4c83daf146935d7ac2b9c3e0b9336"
  }, {
    "url": "assets/index.html-Cryn1EgE.js",
    "revision": "b7f6dd5e43d8035c632dad1d26d4dc0f"
  }, {
    "url": "assets/index.html-CqdsLasa.js",
    "revision": "a8972fafd65c765f63d8adf87309c618"
  }, {
    "url": "assets/index.html-CqcGe3fj.js",
    "revision": "072728f17de037a58e97b757caf745bd"
  }, {
    "url": "assets/index.html-CdjQJqyA.js",
    "revision": "18e5ff6a0085c721159045ce756fc189"
  }, {
    "url": "assets/index.html-Cc-1b5hi.js",
    "revision": "b6fad0cd7a194b1afcb76fff3f2a4656"
  }, {
    "url": "assets/index.html-CYFpgubI.js",
    "revision": "34bc8ac781f3209e191866ec520230c7"
  }, {
    "url": "assets/index.html-CSiDAkSp.js",
    "revision": "6e08ef7da395aea89d3aabd287c1e014"
  }, {
    "url": "assets/index.html-CRN4E5xA.js",
    "revision": "da2689a5db0a7a1a127c9f58375590a6"
  }, {
    "url": "assets/index.html-CPCZHMRw.js",
    "revision": "32328b2acd60e29a75e7d7c3407dc6e5"
  }, {
    "url": "assets/index.html-CJE5F0yc.js",
    "revision": "cb0a91651ab03be9df7180f90a5779be"
  }, {
    "url": "assets/index.html-CGmGDTMR.js",
    "revision": "417b020e1e26964f7af2ed9be07de576"
  }, {
    "url": "assets/index.html-CCv_YFpt.js",
    "revision": "86264953288e8c844670c43de6432d27"
  }, {
    "url": "assets/index.html-CAA4bFsd.js",
    "revision": "3424b3a7a0fff9163e2af60da971ca8c"
  }, {
    "url": "assets/index.html-C9D1y0HY.js",
    "revision": "a098eff147a6839c64939be406f868a5"
  }, {
    "url": "assets/index.html-C7AczQ8p.js",
    "revision": "ea85d2cafcc862ad7afd3a8285b27f37"
  }, {
    "url": "assets/index.html-BzKCAvpH.js",
    "revision": "6ae635b75b9fe034eba16f0190dd8139"
  }, {
    "url": "assets/index.html-BtSr5ERs.js",
    "revision": "6249984bb73f105bc1c62bbe8dd18899"
  }, {
    "url": "assets/index.html-BtAwxksv.js",
    "revision": "1164f07560816a58b3e1ff6d7d4f57b4"
  }, {
    "url": "assets/index.html-BZU7i303.js",
    "revision": "5b985be3f688dee9df22f3de8517d4bf"
  }, {
    "url": "assets/index.html-BVinEZ5E.js",
    "revision": "61feede990c67e31833b7141eb45a427"
  }, {
    "url": "assets/index.html-BRKxQfO-.js",
    "revision": "9b2e9b370d9f67dcb73eb562aa060beb"
  }, {
    "url": "assets/index.html-BHn93kVP.js",
    "revision": "1e02acd6d5529a7ca5f765ced1f67509"
  }, {
    "url": "assets/index.html-BBMqJi0y.js",
    "revision": "dc0c852c3565bbd8afc2b1541617a6d9"
  }, {
    "url": "assets/index.html-B7if9i2U.js",
    "revision": "63d57f06e8adc1bad03bbc55fdbdcef7"
  }, {
    "url": "assets/index.html-B6BgxBMx.js",
    "revision": "083eb9b435a265d71d5d224cff3a4db7"
  }, {
    "url": "assets/index.html-B1yP7o3X.js",
    "revision": "cf9e9b8c60b16209b517dcf40202da4a"
  }, {
    "url": "assets/index.html-B0Jw_PEN.js",
    "revision": "d06737632a06b8f23b0cfb479e7ca4bc"
  }, {
    "url": "assets/index.html-9RMzyE0o.js",
    "revision": "ef120d5af3a01e7517eac7c51505785d"
  }, {
    "url": "assets/index.html-677DWyYE.js",
    "revision": "29f33b2a791877828d27fbd78e7b7da8"
  }, {
    "url": "assets/index.html-511a7qSM.js",
    "revision": "a5bd5b4144981e5af0608bd99bf0cdaf"
  }, {
    "url": "assets/index.html-46n_XR2q.js",
    "revision": "e40da9c5343e9ff5466d6b2d671c4368"
  }, {
    "url": "assets/index-DTEEl-sV.js",
    "revision": "46a193641571106d3b7b43f9bc2a2735"
  }, {
    "url": "assets/how-llm-know-mcp-params.html-LGqZAsNm.js",
    "revision": "39c0df15b056085423d4d23088de8ed5"
  }, {
    "url": "assets/giscus-BAf4_9qv.js",
    "revision": "6bba63cc83e1b2b20cd115e60344dde7"
  }, {
    "url": "assets/docker-proxy.html-BeOM-FoU.js",
    "revision": "b1b44d8b8f3ed3de503f758f55c4e333"
  }, {
    "url": "assets/compiler.html-zdGXGCTQ.js",
    "revision": "9fc6e85bd0ecebbd997ecc652bcb2535"
  }, {
    "url": "assets/code-visualization-intro.html-xWelA_cD.js",
    "revision": "154cee36071697b7534c9c0bcb2e9538"
  }, {
    "url": "assets/code-funny.html-BFyA5k8K.js",
    "revision": "cf3908bbccde21d2831a57e5374fe136"
  }, {
    "url": "assets/cg-diff.html-CWnbzAH7.js",
    "revision": "dd23f05e3755d2bac6e20c402ac86b4a"
  }, {
    "url": "assets/auto-lock.html-DJPqdwSe.js",
    "revision": "dd9652b11fc4969261e404ff584efaa8"
  }, {
    "url": "assets/app-DHyqs4bT.js",
    "revision": "09022d02f7a26ab0a58cd711c4b95656"
  }, {
    "url": "assets/ai-unit-test.html-DJVtk-T5.js",
    "revision": "35311ea40882d439ec517e09ce7c946f"
  }, {
    "url": "assets/ai-search.html-ChPHfj8a.js",
    "revision": "a0ee484f8231d8d1d565f6042306b541"
  }, {
    "url": "assets/ai-hotspot.html-BwLMzeoI.js",
    "revision": "9ae9e341aa7a15ab7a2f45a2ea044971"
  }, {
    "url": "assets/ai-article-database.html-9anSu-0P.js",
    "revision": "f23eb845947f083057c2e3af80231e88"
  }, {
    "url": "assets/ai-agent.html-Bv3jtCKE.js",
    "revision": "30f7789bbb78b6159617f7acd567434d"
  }, {
    "url": "assets/aff.html-DK21VOmc.js",
    "revision": "aced3594e555c82edbfccd787f316905"
  }, {
    "url": "assets/SearchResult-wGnDzWUj.js",
    "revision": "320e05282897e4d033db1c54179fe9c5"
  }, {
    "url": "assets/5-years-summarize.html-HcwfoIWK.js",
    "revision": "a720b40d548e19fa0ce671cec869dd20"
  }, {
    "url": "assets/404.html-Btb4Lk2M.js",
    "revision": "ddccdf2d10db648302d49131de5ba712"
  }, {
    "url": "assets/2026-3-6.html-By0cDAZk.js",
    "revision": "868addc6dd06ff24df43f7e70fe8e448"
  }, {
    "url": "assets/2026-3-4.html-Ddktxewo.js",
    "revision": "23a5175a2e3517478ae2e84b53829632"
  }, {
    "url": "assets/2026-3-3.html-WgebduHT.js",
    "revision": "bd2246c1481e2c2babc5deebcecdb841"
  }, {
    "url": "assets/2026-3-26.html-DexILPrb.js",
    "revision": "a58d250ba88fbdb9909fbed395ad8434"
  }, {
    "url": "assets/2026-3-24.html-D78j9hEM.js",
    "revision": "8cb4b1344619794f2f80eecc113d87b6"
  }, {
    "url": "assets/2026-3-22.html-C1t1E6Xa.js",
    "revision": "176436643597768579d7ade04f6fa641"
  }, {
    "url": "assets/2026-3-17.html-DrO5VyBN.js",
    "revision": "252a3da133eaa67f6803e0ef5138d015"
  }, {
    "url": "assets/2026-3-16.html-_CBwQr3t.js",
    "revision": "56781cfa6598085a86eab48d6eec94ae"
  }, {
    "url": "assets/2025-end.html-DuCbW2M7.js",
    "revision": "d5752ea7ea205f324842b65eeb581b84"
  }, {
    "url": "assets/2024-end.html-CNWfQ2fZ.js",
    "revision": "525438dfa39ffef207eae25a9471e4b0"
  }, {
    "url": "index.html",
    "revision": "0db2af651c18676b528849bbbac1bc03"
  }, {
    "url": "404.html",
    "revision": "9a89c0ac0ad0199d773375ac62803ee6"
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
