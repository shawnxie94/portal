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
    "url": "assets/tcp-fast-open.html-BG9Mannb.js",
    "revision": "3d2508453807712d1b3352b092975bf3"
  }, {
    "url": "assets/style-D2uQfNRt.css",
    "revision": "5e837e72af909281cc7858a331d86bb6"
  }, {
    "url": "assets/regex-vis.html-Gi5M4SLq.js",
    "revision": "7a57d4b58d3376a5572442ffc9c7429e"
  }, {
    "url": "assets/read-flow.html-gudHPAnA.js",
    "revision": "a0a7482eb475b2bf6c066c91a65fbe32"
  }, {
    "url": "assets/read-flow-2026.html-C6k0l08d.js",
    "revision": "3e273dbb140cbcd9430837e01ae210b8"
  }, {
    "url": "assets/read-code-tools.html-DcOSqnwO.js",
    "revision": "519309c9a799355daad737b5f191d239"
  }, {
    "url": "assets/plugin-vue_export-helper-DlAUqK2U.js",
    "revision": "25e3a5dcaf00fb2b1ba0c8ecea6d2560"
  }, {
    "url": "assets/picture-manage.html-TAX_KU2M.js",
    "revision": "044ca2554df7c026e29161ea2217f990"
  }, {
    "url": "assets/photoswipe.esm-BXDdABy_.js",
    "revision": "6c0bf54cf1322dab242c5bb14307d57a"
  }, {
    "url": "assets/one-cmd-web-to-app.html-DqUqtZeo.js",
    "revision": "7f1a5486f158292fabb85d0ed5edd915"
  }, {
    "url": "assets/mac-terminal.html-CAK_mJua.js",
    "revision": "bcfeb2a0895ebc9b192325ad2b9067a7"
  }, {
    "url": "assets/kimi.html-BAVZEs3I.js",
    "revision": "015319d879b0d8ba19b6276cc82ae044"
  }, {
    "url": "assets/ip-exploration.html-DsbgJeui.js",
    "revision": "d243978684c6ddad72a22ba047c37332"
  }, {
    "url": "assets/index.html-vaCHLS98.js",
    "revision": "64a6c518d04c23adc30acc31e74ff492"
  }, {
    "url": "assets/index.html-jlcOSX1k.js",
    "revision": "748f6b79d0b67d61445913b07d8c387d"
  }, {
    "url": "assets/index.html-iavTfZpJ.js",
    "revision": "c602ca93cdf2fa6677407bd346d6613d"
  }, {
    "url": "assets/index.html-gevcOe7P.js",
    "revision": "144b9de2ba45fc9e7364ed00a6724ea9"
  }, {
    "url": "assets/index.html-f2ujbQn2.js",
    "revision": "e8c0a11a34cb37ace52a5227d716156e"
  }, {
    "url": "assets/index.html-_oQiX1my.js",
    "revision": "cbfb7321bde9d00bffcaed8ff5849822"
  }, {
    "url": "assets/index.html-XE_snhX-.js",
    "revision": "ca1e16049d7f45690ea93d2daffff771"
  }, {
    "url": "assets/index.html-TNS5Gls8.js",
    "revision": "bc29fb0afee5cadd5a0b9ebb937589c9"
  }, {
    "url": "assets/index.html-N9sMjd6Y.js",
    "revision": "a9ec438069c1ddd6e1d35e0561c6d6d3"
  }, {
    "url": "assets/index.html-Dyxrbupw.js",
    "revision": "191244b851555aa11caaf485accb11b3"
  }, {
    "url": "assets/index.html-DtICbCrl.js",
    "revision": "60135af2948f8daad2ec24350cdd85ae"
  }, {
    "url": "assets/index.html-DoAtOaY_.js",
    "revision": "6633098c4cdc17b93cc4ab1481dfdae4"
  }, {
    "url": "assets/index.html-DhoHxGcS.js",
    "revision": "ccd5c0f1cee990907f57f09a351d0e7e"
  }, {
    "url": "assets/index.html-DbomMKpH.js",
    "revision": "979bfa02d56840a611785f5ce914bebf"
  }, {
    "url": "assets/index.html-DZG9hsJq.js",
    "revision": "e231f6194991a0eb542d4bfd77f135f2"
  }, {
    "url": "assets/index.html-DVikINWG.js",
    "revision": "2209b6af56fa0fb11196bccace19d360"
  }, {
    "url": "assets/index.html-DU-eYu0C.js",
    "revision": "f46ebdd3515a6f5141464ba722128541"
  }, {
    "url": "assets/index.html-DRXrlSDX.js",
    "revision": "5ca5a166ba2f94272725ff953e412f53"
  }, {
    "url": "assets/index.html-DQtjCmES.js",
    "revision": "cf49084413bf7620687d884508540994"
  }, {
    "url": "assets/index.html-DPW1JoL3.js",
    "revision": "45b02e9d62d404e9986e7d5dcdb6bd15"
  }, {
    "url": "assets/index.html-DMSJvCrb.js",
    "revision": "88da23bb728dd6673685b187bc7374c2"
  }, {
    "url": "assets/index.html-DMLCdS1x.js",
    "revision": "9f06014b5f87c8cf349d5bb1cc81e206"
  }, {
    "url": "assets/index.html-DK2S31gT.js",
    "revision": "7b26679c0d213cb85934182dc467896d"
  }, {
    "url": "assets/index.html-DBfR4d5D.js",
    "revision": "8b237d896256158a9957ba522f152a48"
  }, {
    "url": "assets/index.html-D8Rnomjq.js",
    "revision": "e2acfd88f307794a0724983f708a5879"
  }, {
    "url": "assets/index.html-D7fslNTw.js",
    "revision": "706e9e10e9143d3c44c63e9a772cba2d"
  }, {
    "url": "assets/index.html-D-rsH1H-.js",
    "revision": "57bc1923766b98b7d73b0acb80995f94"
  }, {
    "url": "assets/index.html-CzHZud8u.js",
    "revision": "a6e6a2c6b115c6c35de03cfb2704054b"
  }, {
    "url": "assets/index.html-Cvah7N-S.js",
    "revision": "2f4ef2f992f6c6030db10f025c4042ef"
  }, {
    "url": "assets/index.html-CstaOfNt.js",
    "revision": "ce504ed1fa387c07719cc379fd33ddaa"
  }, {
    "url": "assets/index.html-Cs9Myl7g.js",
    "revision": "748dcb863eb919e061b325bbf42ced49"
  }, {
    "url": "assets/index.html-C_9DdQEs.js",
    "revision": "55aaad1e377cd0472a9f8769df3867da"
  }, {
    "url": "assets/index.html-CX47DEdQ.js",
    "revision": "60c6e90a880a92b5d1ca7902f1ec48a7"
  }, {
    "url": "assets/index.html-CWV9zwqu.js",
    "revision": "887adad416c3e8c50757b09737e23565"
  }, {
    "url": "assets/index.html-CVm1Bo-6.js",
    "revision": "20b6a7914f78fa9db099881d7d66bde8"
  }, {
    "url": "assets/index.html-CUJKW_mK.js",
    "revision": "56a7e2120b6ad956a7ce7b031d2d9dff"
  }, {
    "url": "assets/index.html-COX8p39w.js",
    "revision": "679c7ee7019f7eeffcd2526e3799da2a"
  }, {
    "url": "assets/index.html-CNdhoN_1.js",
    "revision": "1006b6c2d5ab0c21be7c2320da1e4747"
  }, {
    "url": "assets/index.html-CMNNHWpp.js",
    "revision": "b14e8fd945cb99dc6780c3d766beb99d"
  }, {
    "url": "assets/index.html-CEHv3RnI.js",
    "revision": "1cf1e76e8d2b3014b75e2676a686d650"
  }, {
    "url": "assets/index.html-CE0c_moN.js",
    "revision": "0a972ab6153a35f00623868cb02c3761"
  }, {
    "url": "assets/index.html-BuCTRnH7.js",
    "revision": "8f65a2791788d472f2b93fe96f66052b"
  }, {
    "url": "assets/index.html-BtwKCn5O.js",
    "revision": "c6843ef3f20a0a8cbc7a4258aed18b00"
  }, {
    "url": "assets/index.html-Bqrascja.js",
    "revision": "6389888161ff31f10f70155990095122"
  }, {
    "url": "assets/index.html-BgeQCGjF.js",
    "revision": "e4e94f837994d5d78016050c6a375413"
  }, {
    "url": "assets/index.html-BN6KGAbt.js",
    "revision": "6a5bd3eecad8a6aed0927ce05a9f3276"
  }, {
    "url": "assets/index.html-BEbfhFFv.js",
    "revision": "32e8c7848313afd572431e88ab23c203"
  }, {
    "url": "assets/index.html-B8EX_ZWk.js",
    "revision": "8782761ca8048fb5058a31947ff7b06a"
  }, {
    "url": "assets/index.html-B7MXs9X8.js",
    "revision": "c268d52b26a28e973370ea481e4c49df"
  }, {
    "url": "assets/index.html-B6Pwovxk.js",
    "revision": "dbfe70e2012fae4581d32f812eec85d7"
  }, {
    "url": "assets/index.html-9IAJoOym.js",
    "revision": "988e0bc955c5e0fb7340b4571e0d4a41"
  }, {
    "url": "assets/index.html-0jNJDRhS.js",
    "revision": "056c7618ccd2bb18495f473cc80d83e3"
  }, {
    "url": "assets/index-DTEEl-sV.js",
    "revision": "46a193641571106d3b7b43f9bc2a2735"
  }, {
    "url": "assets/how-llm-know-mcp-params.html-BXiJveRy.js",
    "revision": "d0649fca780ae6dbd61fce2da3727120"
  }, {
    "url": "assets/giscus-BAf4_9qv.js",
    "revision": "6bba63cc83e1b2b20cd115e60344dde7"
  }, {
    "url": "assets/docker-proxy.html-BywSbd7F.js",
    "revision": "72e494b91b43fedc5a800613f0a139f7"
  }, {
    "url": "assets/compiler.html-VFMrW0e0.js",
    "revision": "f88e2d1c0f9f8798752545f9179b6c37"
  }, {
    "url": "assets/code-visualization-intro.html-n32NFUGg.js",
    "revision": "f1404e15117a099175ba52562fe3c6e6"
  }, {
    "url": "assets/code-funny.html-0DOg5sDl.js",
    "revision": "26aa2116baeeebeb3ffe1bf993af2b1c"
  }, {
    "url": "assets/cg-diff.html-CsprvIk5.js",
    "revision": "bc68a8bb2931ef4ab10bbcca23ffbcb4"
  }, {
    "url": "assets/auto-lock.html-DsP9Xxmb.js",
    "revision": "a0bedbae57bc0e4cbbcb876ac9e3f332"
  }, {
    "url": "assets/app-Oq2wMXa8.js",
    "revision": "cb91c6c51acb74636c8131404f444476"
  }, {
    "url": "assets/ai-unit-test.html-BXHUpVR2.js",
    "revision": "9553a50b0ab6149731dd6b26d7fd3e30"
  }, {
    "url": "assets/ai-search.html-CGNj-k8d.js",
    "revision": "457df65887247c16399533261befc65e"
  }, {
    "url": "assets/ai-hotspot.html-XSp8qtlm.js",
    "revision": "640f82b005fee8289980d3849f99d386"
  }, {
    "url": "assets/ai-article-database.html-D-P0z_l6.js",
    "revision": "22120cd3e47039a7f142461362fb749b"
  }, {
    "url": "assets/ai-agent.html-DTs-sq5a.js",
    "revision": "829b77d3decf8ccad1650e324e3460d5"
  }, {
    "url": "assets/SearchResult-VDp4esH0.js",
    "revision": "67b60f291833c53782023a8388e0dc50"
  }, {
    "url": "assets/5-years-summarize.html-CK3WoKAo.js",
    "revision": "62f9bb1b9c475449d08c91e1e6d93a45"
  }, {
    "url": "assets/404.html-D9v4mbGC.js",
    "revision": "0e67255221109b7ace784c9757bc2acc"
  }, {
    "url": "assets/2026-3-6.html-bZqx-ATY.js",
    "revision": "fefc94334e93e6dbffc14abe749a4ffd"
  }, {
    "url": "assets/2026-3-4.html-D_1rcOpY.js",
    "revision": "06745930c7b768e69127f5b249eaebc4"
  }, {
    "url": "assets/2026-3-3.html-B1eUvAbP.js",
    "revision": "37f7dea620976744aa1b5809e9cffb99"
  }, {
    "url": "assets/2026-3-26.html-BuBq-6ME.js",
    "revision": "7bd0ea88ec06bff81201c73cd1fa441f"
  }, {
    "url": "assets/2026-3-24.html-zf-c6EhB.js",
    "revision": "d321e7e2be8da8fdc70fa88d60c282ad"
  }, {
    "url": "assets/2026-3-22.html-BBNGmAKQ.js",
    "revision": "399c40558c2a824082af6407a9d9524e"
  }, {
    "url": "assets/2026-3-17.html-B0xsQ6U-.js",
    "revision": "4f9b6afd249ce47094b5dbcbd3eed9c8"
  }, {
    "url": "assets/2026-3-16.html-Cuuqac2F.js",
    "revision": "600dbaf8305e922b5aabd5ec02b8ecd8"
  }, {
    "url": "assets/2025-end.html-j-9SQXKb.js",
    "revision": "10ee383435d9a71b5e363d168fdd2413"
  }, {
    "url": "assets/2024-end.html-DzXu0qTn.js",
    "revision": "b4534d91908759d43f917697ea43be1e"
  }, {
    "url": "index.html",
    "revision": "8f02985e3083edbda5e1dd45ac093dbb"
  }, {
    "url": "404.html",
    "revision": "721e0a8a5d13d558b4e96e70342df4de"
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
