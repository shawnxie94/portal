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
    "url": "assets/tcp-fast-open.html-CNKKhkyB.js",
    "revision": "df18038b56a56d12fe8151765b53eab5"
  }, {
    "url": "assets/style-D2uQfNRt.css",
    "revision": "5e837e72af909281cc7858a331d86bb6"
  }, {
    "url": "assets/regex-vis.html-edIlUWby.js",
    "revision": "765fac87ffe16d90b13fe0e1d132ac9d"
  }, {
    "url": "assets/read-flow.html-C5oyk9qW.js",
    "revision": "e4dc055e615ceb040c9f66480cc6b97b"
  }, {
    "url": "assets/read-flow-2026.html-llLQDyDc.js",
    "revision": "55fba5ea2087eea4c7ff1676adf1f520"
  }, {
    "url": "assets/read-code-tools.html-SJyDAnqI.js",
    "revision": "18a559c961f4102110ea5a11607d48b2"
  }, {
    "url": "assets/plugin-vue_export-helper-DlAUqK2U.js",
    "revision": "25e3a5dcaf00fb2b1ba0c8ecea6d2560"
  }, {
    "url": "assets/picture-manage.html-C9tBHomT.js",
    "revision": "cdc210449a214ac0cefd576e38022004"
  }, {
    "url": "assets/photoswipe.esm-BXDdABy_.js",
    "revision": "6c0bf54cf1322dab242c5bb14307d57a"
  }, {
    "url": "assets/one-cmd-web-to-app.html-CLaD1-83.js",
    "revision": "e7b003cc311b7650e2fd50c5c6bf374d"
  }, {
    "url": "assets/mac-terminal.html-KMClnPEQ.js",
    "revision": "48b0035adfd23f6218be8f5f93dfbdeb"
  }, {
    "url": "assets/kimi.html-CfRw7E_9.js",
    "revision": "fb9331a2d5df6c6e797acef73ad149d8"
  }, {
    "url": "assets/ip-exploration.html-DAFKdEfS.js",
    "revision": "545f2d9172cf2ae08ea7e32df09490cd"
  }, {
    "url": "assets/index.html-uqxUg2R4.js",
    "revision": "1893498c587d038eb29b71ba74a46592"
  }, {
    "url": "assets/index.html-s-MBQ3j9.js",
    "revision": "47a2514087e2ad0aff34a9be98fbfd36"
  }, {
    "url": "assets/index.html-r8TYOnrb.js",
    "revision": "bd5ce3ee18b65df469e98415daa988a1"
  }, {
    "url": "assets/index.html-mRqUT-zu.js",
    "revision": "0926a3d1bb1a919d5c20621fc9cd6fc0"
  }, {
    "url": "assets/index.html-j1WkvrWk.js",
    "revision": "c5022ea08a3fb636d379ef10bdb38d7c"
  }, {
    "url": "assets/index.html-bKtfdAbf.js",
    "revision": "6e1a84c4fe7e8551ed54f019528b798f"
  }, {
    "url": "assets/index.html-Xf89PK8h.js",
    "revision": "580f64d48b1201bdbd26e4729e504d23"
  }, {
    "url": "assets/index.html-WayKiAa2.js",
    "revision": "b7b9bdaa732193e6c66b91766b1d461b"
  }, {
    "url": "assets/index.html-QLckmtKr.js",
    "revision": "e3ff9d4a1daa1136816b7cf3c1ab195f"
  }, {
    "url": "assets/index.html-MVLp1wzL.js",
    "revision": "b4fb3749db8fe0ca55733a9eb0272fe3"
  }, {
    "url": "assets/index.html-Jz2F3MVm.js",
    "revision": "7b5c7c4cf4495cf40f4de4d8cf1cab96"
  }, {
    "url": "assets/index.html-DzU0KDER.js",
    "revision": "742cd66a1efffec95da6d28c4b1d324d"
  }, {
    "url": "assets/index.html-Dz0mBRXy.js",
    "revision": "deae5a7500ff33cf293bf216da4d516b"
  }, {
    "url": "assets/index.html-DtT_MZzx.js",
    "revision": "ad372d549eed9f3e0a68e8042821c788"
  }, {
    "url": "assets/index.html-DpxxQZZr.js",
    "revision": "e08ae056155da83a9ce1c0e050a5be85"
  }, {
    "url": "assets/index.html-DopeA9Be.js",
    "revision": "d7bb9dd7ea2f1f63d68b27d69d2eb9bb"
  }, {
    "url": "assets/index.html-Dd5_IMRW.js",
    "revision": "993aabe64e896f1a6bd19a8b91ea9093"
  }, {
    "url": "assets/index.html-Dcgs3Ezk.js",
    "revision": "6987e31919f1f8ade78877ed91601754"
  }, {
    "url": "assets/index.html-D_n0hauN.js",
    "revision": "899cec6b887e523e7bf13152bfa277e9"
  }, {
    "url": "assets/index.html-DZvo8rkJ.js",
    "revision": "1679528d652f51f7c1ada715c85d8236"
  }, {
    "url": "assets/index.html-DZPEQUcA.js",
    "revision": "326f7aa9ed162132a791f1508e1194d7"
  }, {
    "url": "assets/index.html-DYThliXV.js",
    "revision": "33c14eb0f319b04ece5d313f7149b76d"
  }, {
    "url": "assets/index.html-DYBQZtoA.js",
    "revision": "9709455904218a24fbf2effa48e43058"
  }, {
    "url": "assets/index.html-DXBx7FOP.js",
    "revision": "7550c560778fd536cdf7917cd96a733b"
  }, {
    "url": "assets/index.html-DUThaI_M.js",
    "revision": "cf1867cf92d849699ac5f16c4177170e"
  }, {
    "url": "assets/index.html-DTKDtNdA.js",
    "revision": "67c0897d68aa075380ae5499d0aa6c61"
  }, {
    "url": "assets/index.html-DRXM-HJE.js",
    "revision": "80d02a4756b4ba7c9a5d19da87823b2f"
  }, {
    "url": "assets/index.html-DMEOKHOn.js",
    "revision": "adb8cdaa5539f7d5dda5c118a8d581e9"
  }, {
    "url": "assets/index.html-D8oK5D2j.js",
    "revision": "54bb335b888c8db021b1c320ca4aadfc"
  }, {
    "url": "assets/index.html-D3JCX0wW.js",
    "revision": "314313a61f8a8c278d4f8fffe52368e9"
  }, {
    "url": "assets/index.html-D2dbPzEN.js",
    "revision": "0fd9daa0782eb610e2189f821a19b602"
  }, {
    "url": "assets/index.html-CmeOzcfo.js",
    "revision": "7f50692410371ed02bd8a9ae77d1f6d5"
  }, {
    "url": "assets/index.html-ClZU1KmG.js",
    "revision": "b58893f1444e0cb301ffbd3fae9921d9"
  }, {
    "url": "assets/index.html-CgHlyYph.js",
    "revision": "3ad195582664f554963aff56961c4906"
  }, {
    "url": "assets/index.html-Cevb0SNa.js",
    "revision": "161c2c2c20b24ed742d40ba5c5d0c4c6"
  }, {
    "url": "assets/index.html-CegxCpWe.js",
    "revision": "a60c0bff5309a158918f4aef2171f764"
  }, {
    "url": "assets/index.html-CYkkMV9i.js",
    "revision": "3cf0942193edd6ca265fdb741f868bcd"
  }, {
    "url": "assets/index.html-COncijvG.js",
    "revision": "ba373ed398402d8ca6968e92d6db9f93"
  }, {
    "url": "assets/index.html-CM5fezvx.js",
    "revision": "08f6301735315759fc70b9ccc8d609f6"
  }, {
    "url": "assets/index.html-CLsNAm5p.js",
    "revision": "7ab7748d8c8be07472e9bacf77fca041"
  }, {
    "url": "assets/index.html-C1Yg7RUJ.js",
    "revision": "d70b794c73d4e5a1cd435345d8a9cb7d"
  }, {
    "url": "assets/index.html-C01tWz2T.js",
    "revision": "01e56938fd8c9947d03c20a884c285d9"
  }, {
    "url": "assets/index.html-Bzw35TCP.js",
    "revision": "e0ab90b8081b5d70170139756ceb1876"
  }, {
    "url": "assets/index.html-BoyHfIPa.js",
    "revision": "4d5c245e0ed1160f4dc9cf1ee3f6dde7"
  }, {
    "url": "assets/index.html-Bo7AKWaZ.js",
    "revision": "58e8e54c23a27116c7f20643d9ef07c4"
  }, {
    "url": "assets/index.html-BncY57vf.js",
    "revision": "76a1db9d42fcab064de507aaf25195df"
  }, {
    "url": "assets/index.html-Bmc1VbIL.js",
    "revision": "f2951e86cd63d8c455b5fef7f2168a67"
  }, {
    "url": "assets/index.html-Blyz30Po.js",
    "revision": "94581e65964bf2d523a3c7fd2430d261"
  }, {
    "url": "assets/index.html-Bk833lLa.js",
    "revision": "83203a0451f49956936cbe030ae6a962"
  }, {
    "url": "assets/index.html-BjxQ3Y9i.js",
    "revision": "a989a2a3a11083c3445fbff96db7971e"
  }, {
    "url": "assets/index.html-BjpNR4JY.js",
    "revision": "a0a2cc39302366096a04ad1569defcc4"
  }, {
    "url": "assets/index.html-Bg4si9oJ.js",
    "revision": "f97ecf9d56e8bedf644faa2c80164a5c"
  }, {
    "url": "assets/index.html-Bc2rZrsA.js",
    "revision": "4658b82dc5d8a423f4a514b0e77cdb34"
  }, {
    "url": "assets/index.html-BRemp5pc.js",
    "revision": "c7ee23bd6db21d70606e7579d4f17349"
  }, {
    "url": "assets/index.html-BRJ4YykC.js",
    "revision": "057d0e030aa970b78b6aa4ba3d3fbeb2"
  }, {
    "url": "assets/index.html-BP17auA4.js",
    "revision": "fb6bb38d553498e3539cf13c0fa2c4e9"
  }, {
    "url": "assets/index.html-BINA67q6.js",
    "revision": "36295d585aae37229bf3b07b4a9b63e3"
  }, {
    "url": "assets/index.html-BIEWhpzZ.js",
    "revision": "aa7e00fc773bd7d5caae789375570fef"
  }, {
    "url": "assets/index.html-BGwE0Q42.js",
    "revision": "281cb8a5f565ba111e9ebb13883346c2"
  }, {
    "url": "assets/index.html-B1rd7QNp.js",
    "revision": "5d1223bd298bd8db0cb6e46d3ad514ec"
  }, {
    "url": "assets/index.html-B1Ei0Bs9.js",
    "revision": "7a7a0b5225ba705972186e416e55424d"
  }, {
    "url": "assets/index.html-8fvs6jXO.js",
    "revision": "9b53ab1d48f4cdc5d334823bdda9c42b"
  }, {
    "url": "assets/index.html-8dh5Av7F.js",
    "revision": "eee4406345c1d44d35a2c131708f0d72"
  }, {
    "url": "assets/index.html-6Yz3C1We.js",
    "revision": "6a31d5f9b6b547d46254a6da6286b8fc"
  }, {
    "url": "assets/index.html-4g9Vyz69.js",
    "revision": "5c7334f22748ad08d880af3816a2c9ae"
  }, {
    "url": "assets/index-DTEEl-sV.js",
    "revision": "46a193641571106d3b7b43f9bc2a2735"
  }, {
    "url": "assets/how-llm-know-mcp-params.html-dtgYmdMf.js",
    "revision": "e68e0ac79702121a87cafd95658c1bfc"
  }, {
    "url": "assets/giscus-BAf4_9qv.js",
    "revision": "6bba63cc83e1b2b20cd115e60344dde7"
  }, {
    "url": "assets/docker-proxy.html-CPfNIwAW.js",
    "revision": "b8a24e2fb12b99ede180caf528f64d6c"
  }, {
    "url": "assets/compiler.html-lBmdTAJh.js",
    "revision": "7b419b54de454afff74b376b217260c7"
  }, {
    "url": "assets/code-visualization-intro.html-BB6zqYM7.js",
    "revision": "1f190fe63a0d429da56b311ffde92e23"
  }, {
    "url": "assets/code-funny.html-a-uN5YB3.js",
    "revision": "bec5a7f9fe48c38c1718c6d18d90e1ac"
  }, {
    "url": "assets/cg-diff.html-C371c5ar.js",
    "revision": "9ca31cca613b32a7d5e01c344c1f8e33"
  }, {
    "url": "assets/auto-lock.html-lETxBHU9.js",
    "revision": "45b0c082c13efe5d1b8ac65824133821"
  }, {
    "url": "assets/app-DMUTg9Xp.js",
    "revision": "197c32dcfe65a9bb91c937dc3c9393e1"
  }, {
    "url": "assets/ai-unit-test.html-BEGhHWse.js",
    "revision": "a3fc0862e46c2f3d9a1ac894cf0adf8c"
  }, {
    "url": "assets/ai-search.html-CiduT2dY.js",
    "revision": "040e3ac6a1ed05f825a43d907ea0eb25"
  }, {
    "url": "assets/ai-hotspot.html-DvgsMf7O.js",
    "revision": "0d30967aa1a29f8a350cd495c164c628"
  }, {
    "url": "assets/ai-article-database.html-Cm42EfR_.js",
    "revision": "ee7ef674e57865cd414babef2f3763db"
  }, {
    "url": "assets/ai-agent.html-rWRfLGl-.js",
    "revision": "fa0163c207b5f87e0a8131a02b57d911"
  }, {
    "url": "assets/SearchResult-R5BRj-dM.js",
    "revision": "010a53e409a34cd37b663b62229e11bd"
  }, {
    "url": "assets/5-years-summarize.html-BtZTr6uy.js",
    "revision": "ccbbd6c16d652ce3d27cc1e38dd67ea5"
  }, {
    "url": "assets/404.html-Bsu9_wbS.js",
    "revision": "d197cf4bee117101c4f9a41f0f8ca6af"
  }, {
    "url": "assets/2026-3-6.html-6y1OG8-I.js",
    "revision": "ae57947b662afae3acd79b3f523d63a9"
  }, {
    "url": "assets/2026-3-4.html-PgE6b_Aa.js",
    "revision": "0aecce97ea50ab06d3962971deb29140"
  }, {
    "url": "assets/2026-3-3.html-BTfyXNrR.js",
    "revision": "45d08d2534b11a61280f02791531075b"
  }, {
    "url": "assets/2026-3-16.html-e25TBAZy.js",
    "revision": "9bea4cf3ae5d5be0f56704b6173c7bcc"
  }, {
    "url": "assets/2025-end.html-MwwKdDRc.js",
    "revision": "079661cb6628e4fccc7fc209c853d545"
  }, {
    "url": "assets/2024-end.html-C4aFkDii.js",
    "revision": "9f5f776b2105e1b32c34c8fa0a2e82cb"
  }, {
    "url": "index.html",
    "revision": "15b9ceafdf00ec2e3d26bce6ead35f36"
  }, {
    "url": "404.html",
    "revision": "bad81d94d5d6a1f05a0a4c47266ccf38"
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
