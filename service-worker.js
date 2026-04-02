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
    "url": "assets/tcp-fast-open.html-HM9_Dy3K.js",
    "revision": "2561f2866c3b74e3710dacea67b03843"
  }, {
    "url": "assets/style-D2uQfNRt.css",
    "revision": "5e837e72af909281cc7858a331d86bb6"
  }, {
    "url": "assets/regex-vis.html-B7nh-yeI.js",
    "revision": "858563a31129a995907337518234e6df"
  }, {
    "url": "assets/read-flow.html-TqDhxJw6.js",
    "revision": "0265bec75dce8fca18e9f9574eb186a6"
  }, {
    "url": "assets/read-flow-2026.html-XOEQ4uLq.js",
    "revision": "508a0870ce3fed16b4cc84e807ee31ad"
  }, {
    "url": "assets/read-code-tools.html-Idf-AEMl.js",
    "revision": "c72bdcabfd9a00ba309f068a15efc7ce"
  }, {
    "url": "assets/plugin-vue_export-helper-DlAUqK2U.js",
    "revision": "25e3a5dcaf00fb2b1ba0c8ecea6d2560"
  }, {
    "url": "assets/picture-manage.html-D8fs7HgC.js",
    "revision": "3da63b89fe6f4dff739ba81a42b9f546"
  }, {
    "url": "assets/photoswipe.esm-BXDdABy_.js",
    "revision": "6c0bf54cf1322dab242c5bb14307d57a"
  }, {
    "url": "assets/one-cmd-web-to-app.html-BqSnCSAL.js",
    "revision": "1eb1869f5625d1add6c838befe36e43e"
  }, {
    "url": "assets/mac-terminal.html-BdPeH08T.js",
    "revision": "25030b6dcafb3c94d51f980404e7e72a"
  }, {
    "url": "assets/kimi.html-m4z0nVJ-.js",
    "revision": "960a4b19cb0e044e4412b4d62010dced"
  }, {
    "url": "assets/ip-exploration.html-CWJaCW8A.js",
    "revision": "e50c7d0908336e75d4b954b5ae87ce7d"
  }, {
    "url": "assets/index.html-v4axZ-Wo.js",
    "revision": "c61d4e70e08b37a6165f9f793454c8df"
  }, {
    "url": "assets/index.html-upsh_qAG.js",
    "revision": "5cbcb1a11b246486df64196c04b45223"
  }, {
    "url": "assets/index.html-iS3igFVQ.js",
    "revision": "dcd1ddd989c81529f0943ffaa2d0ed7b"
  }, {
    "url": "assets/index.html-hUPxyP3p.js",
    "revision": "ec642f277ee4fd2b0d1c2faa3bedaeba"
  }, {
    "url": "assets/index.html-ge1zOH8h.js",
    "revision": "2b07cdfd22126c10a80da67b48a7219e"
  }, {
    "url": "assets/index.html-ZogqrxTV.js",
    "revision": "66ad3b8b62906b68969dfab317a66a57"
  }, {
    "url": "assets/index.html-YB9pmq2E.js",
    "revision": "c1bd32cf5093812eaa610c25c5712b57"
  }, {
    "url": "assets/index.html-XQkRBQoW.js",
    "revision": "22bc04b1ed484c1ce520c32acd41dff0"
  }, {
    "url": "assets/index.html-TOiM-tDT.js",
    "revision": "a1e90899b0bd7b16ed1ae99e6abf296e"
  }, {
    "url": "assets/index.html-KaMN1-mV.js",
    "revision": "00f43b0500c9edd93a8e08bbb63a2a5f"
  }, {
    "url": "assets/index.html-KLIt5Ew1.js",
    "revision": "a48fd97bfd95de1930e068429fc1d870"
  }, {
    "url": "assets/index.html-HeQM038d.js",
    "revision": "753f893e7d5ce52d916045beb8956427"
  }, {
    "url": "assets/index.html-HHzsID93.js",
    "revision": "0a758d510b5f1c786dca37980c676676"
  }, {
    "url": "assets/index.html-H5mTwTWY.js",
    "revision": "295ae6226a9571c6631c1169f33b47ca"
  }, {
    "url": "assets/index.html-EY60oG_a.js",
    "revision": "02e57d2e99706749a02725c6ddf83391"
  }, {
    "url": "assets/index.html-DuJUk01c.js",
    "revision": "199e49475c63af16ef02ef9c21a52081"
  }, {
    "url": "assets/index.html-DlHW30W_.js",
    "revision": "797943cd149595ce204ced32be04e9ca"
  }, {
    "url": "assets/index.html-DhgBtOV6.js",
    "revision": "bdbaf9641b7410bc0d21418781b7858b"
  }, {
    "url": "assets/index.html-DhKk1dFq.js",
    "revision": "4ffc153b6679aad8fe0a7d3ff2df7edb"
  }, {
    "url": "assets/index.html-DbKsbDxf.js",
    "revision": "991dadff313caee4555e05c82d7bd2c0"
  }, {
    "url": "assets/index.html-DYcLAGWP.js",
    "revision": "fdf2199d645144e43670cde5c754c79c"
  }, {
    "url": "assets/index.html-DUtsis2k.js",
    "revision": "544f6a4d97e9cd547d42f227fc9a438e"
  }, {
    "url": "assets/index.html-DUUbeESj.js",
    "revision": "1b837d940cbe845d3dd96956a928a7a1"
  }, {
    "url": "assets/index.html-DRq32hVW.js",
    "revision": "3b81fe11b5833d1366a0042cfabe668c"
  }, {
    "url": "assets/index.html-DBYtTtiN.js",
    "revision": "70b2fd0b75fec90507bb247d5bc59def"
  }, {
    "url": "assets/index.html-D5eAkUpy.js",
    "revision": "b14f8f09ad609f236cbbbb726000de62"
  }, {
    "url": "assets/index.html-D1d3rCce.js",
    "revision": "6b06e0a25cc88ceabf93332b9d055024"
  }, {
    "url": "assets/index.html-D-z2qWhc.js",
    "revision": "4075ac0e391f8062d73d2a389aba947a"
  }, {
    "url": "assets/index.html-D-55BqAK.js",
    "revision": "ca79cb44a73375df7baf2cb0379da808"
  }, {
    "url": "assets/index.html-CtMtyaDc.js",
    "revision": "d4994f43b90615329b6f1ad3162d6007"
  }, {
    "url": "assets/index.html-CsnxbPnx.js",
    "revision": "8d3f72341c5e4fc7139ee485369bb66f"
  }, {
    "url": "assets/index.html-Cqj7zo9p.js",
    "revision": "0a03df08f90e7a9412d33e658220b83f"
  }, {
    "url": "assets/index.html-ClibTcu_.js",
    "revision": "93a2361102819e0cfcb944076ea99581"
  }, {
    "url": "assets/index.html-ClQ-9yYW.js",
    "revision": "e2b1a3e549be9220a3bfccde02f97420"
  }, {
    "url": "assets/index.html-ClOF--c7.js",
    "revision": "f007a2bb9749af988a8b4714d9d0e17c"
  }, {
    "url": "assets/index.html-ChbPKiwq.js",
    "revision": "5a28308de3f7f2fb3542868b423bce3c"
  }, {
    "url": "assets/index.html-CekFyhYh.js",
    "revision": "562e1461be2655478b1ecc4d5858a11d"
  }, {
    "url": "assets/index.html-CdyWRagx.js",
    "revision": "cc19d7aae6c9b452c352296c45ced22c"
  }, {
    "url": "assets/index.html-CTZJxSNH.js",
    "revision": "883e2b5587af2a2b8933c3af950f9b4c"
  }, {
    "url": "assets/index.html-CTP4SZqv.js",
    "revision": "e714eb526bb11abf51d02b95d6256ce4"
  }, {
    "url": "assets/index.html-CQgX-tPd.js",
    "revision": "a2ce0de876e6a550c609753a444f3500"
  }, {
    "url": "assets/index.html-CMZOVfJP.js",
    "revision": "a44c1e592f13e03d3ee9b25f18cf1ffe"
  }, {
    "url": "assets/index.html-CMWTbo_2.js",
    "revision": "e3ea29ce3bf28a0acf47effd2e23d126"
  }, {
    "url": "assets/index.html-CEhN5WWM.js",
    "revision": "794756be3081096e37c94614351f3fd1"
  }, {
    "url": "assets/index.html-CDbQKZLD.js",
    "revision": "953d7f00a774585c28d31671629b3ddc"
  }, {
    "url": "assets/index.html-C58hb4_j.js",
    "revision": "086ee0253b8083892bc7bb217f638951"
  }, {
    "url": "assets/index.html-C3DRlXA6.js",
    "revision": "01f5d1428eede032794fffb07fcf027a"
  }, {
    "url": "assets/index.html-C2RHqMNI.js",
    "revision": "f488a91fb0f96f12148162eba19e2477"
  }, {
    "url": "assets/index.html-BmL67cuv.js",
    "revision": "e85617d294bdb3b73e88a56cbafc6692"
  }, {
    "url": "assets/index.html-BkkehvzO.js",
    "revision": "6064ed288e6c45e5df181017d579b3a1"
  }, {
    "url": "assets/index.html-BggWjZrx.js",
    "revision": "23bf8f4ae4cade7d7a763136f00efe94"
  }, {
    "url": "assets/index.html-BRglZMCb.js",
    "revision": "1a45c830fe8c053c340f930a80c81aa9"
  }, {
    "url": "assets/index.html-BHUw09Fq.js",
    "revision": "b2ba2c7ddde028d69d0b036095ad985a"
  }, {
    "url": "assets/index.html-B3IlhBRV.js",
    "revision": "5bb266106e1510062e48fbd3276b7229"
  }, {
    "url": "assets/index.html-B0EDNB0f.js",
    "revision": "81a6d8d7d645f17016a9be4a1ff3b495"
  }, {
    "url": "assets/index.html-7YspC6ZK.js",
    "revision": "847cf6218a236303a1c78e6bcb119ca5"
  }, {
    "url": "assets/index.html-6m4BTADS.js",
    "revision": "b68552ee09506a1e256a970bb05397f2"
  }, {
    "url": "assets/index-DTEEl-sV.js",
    "revision": "46a193641571106d3b7b43f9bc2a2735"
  }, {
    "url": "assets/how-llm-know-mcp-params.html-gRmPtemr.js",
    "revision": "c271dc4d832094e42840c36dd4d4976b"
  }, {
    "url": "assets/giscus-BAf4_9qv.js",
    "revision": "6bba63cc83e1b2b20cd115e60344dde7"
  }, {
    "url": "assets/docker-proxy.html-sl80h2GB.js",
    "revision": "a7bf12deceabea0b038983dd2e777e05"
  }, {
    "url": "assets/compiler.html-D8IF3i3c.js",
    "revision": "cab5b421e6738378281c8ea83f17ac53"
  }, {
    "url": "assets/code-visualization-intro.html-vvy_6b5v.js",
    "revision": "571360c7850703d1c256fbbd836c4cde"
  }, {
    "url": "assets/code-funny.html-B2Oo_ltV.js",
    "revision": "420e6b77a1cf92600e14fd98fbf6831f"
  }, {
    "url": "assets/cg-diff.html-BYr6M7fe.js",
    "revision": "026b4f0ebf891fd41739c16d145e5de7"
  }, {
    "url": "assets/auto-lock.html-oGM15kgY.js",
    "revision": "a8c850c9efddf36a3c1837e7d945877b"
  }, {
    "url": "assets/app-Bf08zdq9.js",
    "revision": "3a9f2b9e4c1c57063e10ec06762e5f08"
  }, {
    "url": "assets/ai-unit-test.html-o8kGTj35.js",
    "revision": "2993d8f7fa9bede35239bf02ee0586a1"
  }, {
    "url": "assets/ai-search.html-DC0KXA6F.js",
    "revision": "2c081022199c7ccc36713ebfa82f4442"
  }, {
    "url": "assets/ai-hotspot.html-ioxrH1xk.js",
    "revision": "75f0b9524277bb97b9c845264736066f"
  }, {
    "url": "assets/ai-article-database.html-B8jRmxYE.js",
    "revision": "d62b8009a6aef25e0ebc14f112307e90"
  }, {
    "url": "assets/ai-agent.html-BF6zESwX.js",
    "revision": "0a3fb95e42b7c271480bef9c0b24c371"
  }, {
    "url": "assets/aff.html-B_JFAO3c.js",
    "revision": "6de488d5d8322b2a378d5ae5a0aec22b"
  }, {
    "url": "assets/SearchResult-BuhoN4kn.js",
    "revision": "45b36ff1149699aded66e2e735188ea0"
  }, {
    "url": "assets/5-years-summarize.html-jZzQX2U9.js",
    "revision": "732958f3652c8c62622b371e146f40b1"
  }, {
    "url": "assets/404.html-ZQmVaP10.js",
    "revision": "901a0aeb3283e1267f12fd6d1ed875fc"
  }, {
    "url": "assets/2026-3-6.html-j4pg-XQu.js",
    "revision": "d3fd2f5953c9d98c6273f16d8082a527"
  }, {
    "url": "assets/2026-3-4.html-W21vfU0g.js",
    "revision": "6d8f8eb70d3e10bc3bfcc57fd8b29613"
  }, {
    "url": "assets/2026-3-3.html-DRrqnzPB.js",
    "revision": "ac2fc989b7ab293c51b27c5d20cdb573"
  }, {
    "url": "assets/2026-3-26.html-D9uR-qus.js",
    "revision": "4600cde16fd15bd6bae2a7052fcdea4b"
  }, {
    "url": "assets/2026-3-24.html-BrUsnZt8.js",
    "revision": "8a8e0c9a3a6abb0abeef25c56320e727"
  }, {
    "url": "assets/2026-3-22.html-Blt3bg7Y.js",
    "revision": "238ee13cb2773f471b9f52a70c6afeda"
  }, {
    "url": "assets/2026-3-17.html-8FceL7DQ.js",
    "revision": "a75bec7170721864fbd74f3cb9b41f80"
  }, {
    "url": "assets/2026-3-16.html-0QW1cjUB.js",
    "revision": "b39217b65d7861ab4d36f14242f02439"
  }, {
    "url": "assets/2025-end.html-CC_x066L.js",
    "revision": "4b6d8de3193fa1b147cf9c51dab8c01c"
  }, {
    "url": "assets/2024-end.html-BW44JDWr.js",
    "revision": "3992169608398b77128bf86ea05f7aa1"
  }, {
    "url": "index.html",
    "revision": "b3f30d7939d4b3f0ead4241eda14e264"
  }, {
    "url": "404.html",
    "revision": "0366aae166a74d1e71628a58e2856779"
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
