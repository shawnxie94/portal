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
    "url": "assets/tcp-fast-open.html-CDovertH.js",
    "revision": "4163320a61b4bb3a8489d85cc40b3af7"
  }, {
    "url": "assets/style-D2uQfNRt.css",
    "revision": "5e837e72af909281cc7858a331d86bb6"
  }, {
    "url": "assets/regex-vis.html-BCtAdVt6.js",
    "revision": "7470a5e72cb26930c48ee354ec1a1762"
  }, {
    "url": "assets/read-flow.html-Cvd8AJmO.js",
    "revision": "396450a64be21c03a739368ae70e09a2"
  }, {
    "url": "assets/read-flow-2026.html-BPU2FJEG.js",
    "revision": "6d0d180dc4b5853c7735ad0fd4152f6a"
  }, {
    "url": "assets/read-code-tools.html-CLXoUx0G.js",
    "revision": "ee7611dfe35cde477d5dfc6ac4b10aab"
  }, {
    "url": "assets/plugin-vue_export-helper-DlAUqK2U.js",
    "revision": "25e3a5dcaf00fb2b1ba0c8ecea6d2560"
  }, {
    "url": "assets/picture-manage.html-DHoJ--Zi.js",
    "revision": "69cb3af2f53ec3aadbce06d9e20b04b3"
  }, {
    "url": "assets/photoswipe.esm-BXDdABy_.js",
    "revision": "6c0bf54cf1322dab242c5bb14307d57a"
  }, {
    "url": "assets/one-cmd-web-to-app.html-CSZSpHFr.js",
    "revision": "c6552d2dabdde38ee73305ba415187f0"
  }, {
    "url": "assets/mac-terminal.html-DLcDQzwk.js",
    "revision": "67388b3c959f85d0b9c3fd4d49639476"
  }, {
    "url": "assets/lumina.html-DcTdyEX5.js",
    "revision": "2b5ee1154ff22dec0c4f1955f9726c13"
  }, {
    "url": "assets/kimi.html-C4Kefsuq.js",
    "revision": "d465965fcc3bb00fe1731ab2cd72d385"
  }, {
    "url": "assets/ip-exploration.html-BeqwXoMI.js",
    "revision": "8b32497be180077878fba4399d5e67b2"
  }, {
    "url": "assets/infinitum.html-DqZ94dlr.js",
    "revision": "fc27657d43178d53b4f6d9493d98b86c"
  }, {
    "url": "assets/index.html-ziKWKItN.js",
    "revision": "b5562a1866c67963277336a5c57e2f6a"
  }, {
    "url": "assets/index.html-wy14XKcD.js",
    "revision": "7be7c416eafb6318c385b1a9e89481c8"
  }, {
    "url": "assets/index.html-nZ22oA5U.js",
    "revision": "032d0403ec69f688a8696141a3a1699f"
  }, {
    "url": "assets/index.html-nJCDWTpC.js",
    "revision": "d234bd52259079a1d98218c37920045c"
  }, {
    "url": "assets/index.html-jRDRXJvv.js",
    "revision": "62ae7c384541209d45887d075da902fc"
  }, {
    "url": "assets/index.html-hAyphFI2.js",
    "revision": "87de997a29383c516a680e41404e339e"
  }, {
    "url": "assets/index.html-eMBEFLOw.js",
    "revision": "711da6f7fa65874061c63e48293ab7d6"
  }, {
    "url": "assets/index.html-HYbDYhh_.js",
    "revision": "bffc442258ba2616f76924e6694c0350"
  }, {
    "url": "assets/index.html-DuqsRMVz.js",
    "revision": "6d8eb9c0d59f4325396a51d75185cf24"
  }, {
    "url": "assets/index.html-DnLOwrGp.js",
    "revision": "9a06d31e09465bcd1eec453a16497a5c"
  }, {
    "url": "assets/index.html-DlHm5Kj9.js",
    "revision": "a32a790750ce15ef01156d1100e3ef50"
  }, {
    "url": "assets/index.html-DdRdVxhw.js",
    "revision": "370e588fd64f31a0e698252f37267067"
  }, {
    "url": "assets/index.html-Dc9HqCnp.js",
    "revision": "a64f12a0c2aee5b2bff468501fb4ac24"
  }, {
    "url": "assets/index.html-DZlyH2t1.js",
    "revision": "ba1223fd1b41f3c7539c3ffcf544e743"
  }, {
    "url": "assets/index.html-DYplwltN.js",
    "revision": "0d5d49f61dfb16c2ccb91096fed9c7f5"
  }, {
    "url": "assets/index.html-DQ01CNzB.js",
    "revision": "3bd86d0dc482f0a482507925c71e8e52"
  }, {
    "url": "assets/index.html-DNlsmXIV.js",
    "revision": "5ed25a90d96e186c67ab8b6f11e323da"
  }, {
    "url": "assets/index.html-DMRV5YR2.js",
    "revision": "716fbc1e73f70204f8f96c79ad85f9c1"
  }, {
    "url": "assets/index.html-DLHnn---.js",
    "revision": "5d79a7b1edccca37a6df46cb9594c9c8"
  }, {
    "url": "assets/index.html-DJ0OAhit.js",
    "revision": "c4c1b3ba4cbc9c6bac840af61376cf0d"
  }, {
    "url": "assets/index.html-DFK91T8p.js",
    "revision": "3ed32ee10435a2fccfee7772dbbcbc53"
  }, {
    "url": "assets/index.html-DFB1Sxvx.js",
    "revision": "9d8810024a225de8e2add7a643a92e1d"
  }, {
    "url": "assets/index.html-D800CTon.js",
    "revision": "7d010dcb91442bd5e4fbd0ae75cc442f"
  }, {
    "url": "assets/index.html-D5Zm4nfS.js",
    "revision": "a205a287fd0a595a269d34daafa0f2ab"
  }, {
    "url": "assets/index.html-D3oX0bn4.js",
    "revision": "e249390e06c549e67c6f91225c823c60"
  }, {
    "url": "assets/index.html-Cs6sOFnv.js",
    "revision": "39e5db0e9f1644201a08d9bde429e369"
  }, {
    "url": "assets/index.html-CnkOUove.js",
    "revision": "7bb18ef3b8b96e46d00659e963933224"
  }, {
    "url": "assets/index.html-CjfhjtLd.js",
    "revision": "663ebc0b9daf931f7b7bdce30b61eeaf"
  }, {
    "url": "assets/index.html-CeZYEAib.js",
    "revision": "279bc208d9ab3ab168ab0836644652c7"
  }, {
    "url": "assets/index.html-Caq1wXjE.js",
    "revision": "0fa13d866212a59a7baef9b96fbce634"
  }, {
    "url": "assets/index.html-C_OtHr7W.js",
    "revision": "4cb5381f73efeb8705b8dd16abc838c2"
  }, {
    "url": "assets/index.html-CYI5CWZ3.js",
    "revision": "3a7ac7572d12ec5a012f029e20a33103"
  }, {
    "url": "assets/index.html-CX6osDzb.js",
    "revision": "19b691df141bf8364b2e1dab12ea8adb"
  }, {
    "url": "assets/index.html-CLlCWeC0.js",
    "revision": "c7baed4822682d4672207f8ac6aace04"
  }, {
    "url": "assets/index.html-CLCXe7f4.js",
    "revision": "6ac1e43dd538ef83b2c387ad09b533aa"
  }, {
    "url": "assets/index.html-CHgGq4nA.js",
    "revision": "29464a63853fbc62de5bb1038fdd9b95"
  }, {
    "url": "assets/index.html-CBeutBrk.js",
    "revision": "4efeee5b75da9301f57d47e3aed283ee"
  }, {
    "url": "assets/index.html-C9vSnzZe.js",
    "revision": "b95f306b36aaa162a80f7067d6fbd16b"
  }, {
    "url": "assets/index.html-C24ujSxh.js",
    "revision": "31bfe6339ee344fe99bd604cfb9f9cc5"
  }, {
    "url": "assets/index.html-C0hg6vim.js",
    "revision": "772f1f776f65f64612ff172698b6658c"
  }, {
    "url": "assets/index.html-BzIji1BJ.js",
    "revision": "8a05bff7a8d7d5bdc427b15f188ae549"
  }, {
    "url": "assets/index.html-Bz5ay2PR.js",
    "revision": "3d330696c80a5e997a655c74cf93d628"
  }, {
    "url": "assets/index.html-BtIvQmeM.js",
    "revision": "0be3b6bccbd488c649293c72784cf434"
  }, {
    "url": "assets/index.html-BgWzvKly.js",
    "revision": "9c7550daafec0a1939ef06f38e57dae8"
  }, {
    "url": "assets/index.html-BZUFZOJF.js",
    "revision": "da4de96fad42dd9a3b2adc13d68ad081"
  }, {
    "url": "assets/index.html-BQGVWQ6l.js",
    "revision": "a22c48e1b5d47380240f74f4e6fb2c43"
  }, {
    "url": "assets/index.html-BOyY-_zV.js",
    "revision": "e618e5088f6cb69b21a49f96aa1625a0"
  }, {
    "url": "assets/index.html-BLTIui4B.js",
    "revision": "2265558b5d5cff38d8a52c8174d1d5af"
  }, {
    "url": "assets/index.html-BJyLdd0t.js",
    "revision": "6b6a7c5159983ece9e8836be4e2866e0"
  }, {
    "url": "assets/index.html-BFmMUwD7.js",
    "revision": "23b76a9352b26dd0098b04bfb3e157cb"
  }, {
    "url": "assets/index.html-BEm6ml8O.js",
    "revision": "d47cadf83abd2a90a1929588878471b3"
  }, {
    "url": "assets/index.html-BEEfsQbO.js",
    "revision": "3d72af01371100e124524a57d3861201"
  }, {
    "url": "assets/index.html-BBwH2prp.js",
    "revision": "99111322fed1075960ddc15e42ec84b0"
  }, {
    "url": "assets/index.html-B7ByKBFD.js",
    "revision": "dccea7b3540ef686744868c2a6ffb575"
  }, {
    "url": "assets/index.html-B6Zd-p9_.js",
    "revision": "1afcba1763ad20e9f98d746b31f99ef3"
  }, {
    "url": "assets/index.html-B5slBuWj.js",
    "revision": "f0adf982c978b873a9301a0c89ed2cee"
  }, {
    "url": "assets/index.html-B5i8JX2p.js",
    "revision": "b1487d473da91a71983a1356ed4f8e94"
  }, {
    "url": "assets/index.html-B3Yk7LOe.js",
    "revision": "df302861aafd55efcedf0815794fdbea"
  }, {
    "url": "assets/index.html-B0d0KXuR.js",
    "revision": "8dd39ee2e4555ac5c15238aa1ee57e9e"
  }, {
    "url": "assets/index.html-5G-_UKBI.js",
    "revision": "854f3fba325bb588d06557bd92489067"
  }, {
    "url": "assets/index.html-4NW2N_LU.js",
    "revision": "1f523efa14fa54593636e29490abe560"
  }, {
    "url": "assets/index.html-1OBbnB4m.js",
    "revision": "153751879b5a97a6e3cc2d6cb4ce7285"
  }, {
    "url": "assets/index-DTEEl-sV.js",
    "revision": "46a193641571106d3b7b43f9bc2a2735"
  }, {
    "url": "assets/how-llm-know-mcp-params.html-Yp8tdwjh.js",
    "revision": "478a93b7d6f2edd0145f4d5361ba8530"
  }, {
    "url": "assets/giscus-BAf4_9qv.js",
    "revision": "6bba63cc83e1b2b20cd115e60344dde7"
  }, {
    "url": "assets/docker-proxy.html-CPGiCoZf.js",
    "revision": "ce15b0e92053aaebb5bc11fe96f41f95"
  }, {
    "url": "assets/compiler.html-CeaMQRGP.js",
    "revision": "88e552f2710c3dee5a12a4760b7d7eb4"
  }, {
    "url": "assets/code-visualization-intro.html-C_NJqrJb.js",
    "revision": "108b93bc8d7baf8714d77edd6a0e7a51"
  }, {
    "url": "assets/code-funny.html-CNL_f_51.js",
    "revision": "7159154d0abc5bc1168ad9d87363dc8f"
  }, {
    "url": "assets/cg-diff.html-DqwvB0ni.js",
    "revision": "0a697d316e0bfea61565f9bb0f56c9f8"
  }, {
    "url": "assets/auto-lock.html-cbv7HIuQ.js",
    "revision": "49fbbf207f7a29d3c80eae78dfd0d19b"
  }, {
    "url": "assets/app-eGpMRfjx.js",
    "revision": "054ef3afd1246ed18ff58f2b606de9fb"
  }, {
    "url": "assets/ai-unit-test.html-C993vTYC.js",
    "revision": "6aa29cff86d3b84e57778ddcb037e957"
  }, {
    "url": "assets/ai-search.html-D-iNpsxf.js",
    "revision": "565235f1d193405445e42fc455ac5a66"
  }, {
    "url": "assets/ai-hotspot.html-I4LbvEEM.js",
    "revision": "bf946cd7701c93d827527a4e45883c2e"
  }, {
    "url": "assets/ai-article-database.html-BXJIjYwx.js",
    "revision": "0baa8dfc608dcae0fd91d521f95bba4f"
  }, {
    "url": "assets/ai-agent.html-BHmcQSCI.js",
    "revision": "a9c8aa5bc13df99d4df78e62b74245ff"
  }, {
    "url": "assets/aff.html-B8jc7QKl.js",
    "revision": "7187b02eb9a70abe8d33dae06ba5e17d"
  }, {
    "url": "assets/SearchResult-Dox3ORPq.js",
    "revision": "0009d3dd968f02034d41ffad359ebc06"
  }, {
    "url": "assets/5-years-summarize.html-hZKOPc4H.js",
    "revision": "1be470e20b1aeae22f2e3b56dda4abb6"
  }, {
    "url": "assets/404.html-DWtGzQwK.js",
    "revision": "8d10759ae98bbdd7cc6238221f69533f"
  }, {
    "url": "assets/2026-3-6.html-DZovK4BF.js",
    "revision": "fc1cd25e2ec371b6c5dc2cb568aa485e"
  }, {
    "url": "assets/2026-3-4.html-CLezqKSB.js",
    "revision": "bc1088e5ee41719b012d98b59fa97f4f"
  }, {
    "url": "assets/2026-3-3.html-hbQxsIYr.js",
    "revision": "70dc0e617027411db84d77e74e60a53a"
  }, {
    "url": "assets/2026-3-26.html-DGM_LoV0.js",
    "revision": "fd271619cf99acb0edcf1e6ddd4e7966"
  }, {
    "url": "assets/2026-3-24.html-BOu3GJNy.js",
    "revision": "53a0310ecb4ffc06b8bdc195cdab5658"
  }, {
    "url": "assets/2026-3-22.html-Ck64j6MW.js",
    "revision": "c180203b52f5987af0f7fb9741e25da7"
  }, {
    "url": "assets/2026-3-17.html-DHgx9PjB.js",
    "revision": "39eb46aea434c3eb5f33c1d713a92b54"
  }, {
    "url": "assets/2026-3-16.html-BLxEv__-.js",
    "revision": "38e87640f6ccfcd706460931f16002e4"
  }, {
    "url": "assets/2025-end.html-SoGjQ8-J.js",
    "revision": "3922d1dde4e7eb2d6e1d5a602a4a977e"
  }, {
    "url": "assets/2024-end.html-CIv3kiqO.js",
    "revision": "51c32c89d4b36398c66f982a52bae34a"
  }, {
    "url": "index.html",
    "revision": "9c3196cc7dd2c37d7d6e32b9d51720dc"
  }, {
    "url": "404.html",
    "revision": "88d4971e402cb8dab173775b9f8bbb32"
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
