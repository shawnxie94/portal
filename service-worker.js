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
    "url": "assets/tcp-fast-open.html-ISxng1ze.js",
    "revision": "a186b88cce434708f1dd2ddcf93bed6a"
  }, {
    "url": "assets/style-D2uQfNRt.css",
    "revision": "5e837e72af909281cc7858a331d86bb6"
  }, {
    "url": "assets/regex-vis.html-DKj0QHKj.js",
    "revision": "eeb32509397fd8bccd2fac403ef89eaf"
  }, {
    "url": "assets/read-flow.html-DbvZ04wL.js",
    "revision": "66adcb489b5f535dd8d0ef27f0a2d8cb"
  }, {
    "url": "assets/read-flow-2026.html-Cj4h4EBh.js",
    "revision": "7c72ab903de1fac1726485e0da08a2bc"
  }, {
    "url": "assets/read-code-tools.html-DAdDO966.js",
    "revision": "1c7ac87a9455ab85a3b453a348fd1d98"
  }, {
    "url": "assets/plugin-vue_export-helper-DlAUqK2U.js",
    "revision": "25e3a5dcaf00fb2b1ba0c8ecea6d2560"
  }, {
    "url": "assets/picture-manage.html-BJF14s85.js",
    "revision": "eb6a3ba7ca21295ce8348175ff7eaff9"
  }, {
    "url": "assets/photoswipe.esm-BXDdABy_.js",
    "revision": "6c0bf54cf1322dab242c5bb14307d57a"
  }, {
    "url": "assets/one-cmd-web-to-app.html-BcgWnvai.js",
    "revision": "14baf061890b3b31a874727ddfbcc847"
  }, {
    "url": "assets/mac-terminal.html-Bkx95LEi.js",
    "revision": "9eba76065db0a4be864282b60f64fb4f"
  }, {
    "url": "assets/kimi.html-tUn1ViKf.js",
    "revision": "b101a22883c5fad93e5dc5857479689e"
  }, {
    "url": "assets/ip-exploration.html-C78Wnqe2.js",
    "revision": "0c86aa38dc4eed5e351d9a232a8b0f69"
  }, {
    "url": "assets/index.html-zwafLQZN.js",
    "revision": "aa4403c2d52d64bf3e095935b918bf94"
  }, {
    "url": "assets/index.html-ydi1-JG-.js",
    "revision": "4a1990db98bf511d5e1a315ce030c28d"
  }, {
    "url": "assets/index.html-wCP0lZ2w.js",
    "revision": "8a7b9fa6fd896f822b54613985755ccb"
  }, {
    "url": "assets/index.html-qhhmCLXK.js",
    "revision": "0b43569b688d8de4e4ab213b0e8dc275"
  }, {
    "url": "assets/index.html-nskEfVlG.js",
    "revision": "e661ac69370991fe135d38a98b64bc6b"
  }, {
    "url": "assets/index.html-dAvXi5pP.js",
    "revision": "75e33244124b2cd9043114dc86028824"
  }, {
    "url": "assets/index.html-cKMgdBj6.js",
    "revision": "014b26fb6d182e2acf57879b3ad590cf"
  }, {
    "url": "assets/index.html-UQu0WNc7.js",
    "revision": "9eff0ae14586b60c5bafc28acf4ab344"
  }, {
    "url": "assets/index.html-HXyaFrSz.js",
    "revision": "fcb0a0682e5ab1a311e05b0068ff2def"
  }, {
    "url": "assets/index.html-EhXHb3SH.js",
    "revision": "ba6f7221650d34d59a2dac92106be4e4"
  }, {
    "url": "assets/index.html-DvgKQIHL.js",
    "revision": "5b7ae90d5493fa60067feeaf229bb3d0"
  }, {
    "url": "assets/index.html-DuaMPBGn.js",
    "revision": "c5afd2976654a55dbb93d2e6e941e9a5"
  }, {
    "url": "assets/index.html-DqC2lvnv.js",
    "revision": "5aafed484fd7afaa50252683e80b2cf0"
  }, {
    "url": "assets/index.html-DpPv-NMG.js",
    "revision": "b7253155c1cfea18800797b9e6200124"
  }, {
    "url": "assets/index.html-DlwpY8KN.js",
    "revision": "c409ecd391618d3a9871d3f27a694b83"
  }, {
    "url": "assets/index.html-DlqLpWAM.js",
    "revision": "fac6853333179c7caac66dd4f833dcac"
  }, {
    "url": "assets/index.html-Dhc6PWpL.js",
    "revision": "18745338040252e4ebb265f305e3ac71"
  }, {
    "url": "assets/index.html-DbedCMjD.js",
    "revision": "8081bc7a0e6720a7fd93cd61d577cc26"
  }, {
    "url": "assets/index.html-DSR8r8wu.js",
    "revision": "53df53d2ef562a42710fc6dda1ceb3b5"
  }, {
    "url": "assets/index.html-DSETlKe7.js",
    "revision": "cdcf20ae7198ed50a5ecbd40ff5ad49f"
  }, {
    "url": "assets/index.html-DL4BjzX0.js",
    "revision": "a30fbba0f60abc75dc14f93ebb62ecca"
  }, {
    "url": "assets/index.html-DIczSF-t.js",
    "revision": "89c6b463eaad3c4bda4eb96d52564ea7"
  }, {
    "url": "assets/index.html-DIJhgaoC.js",
    "revision": "833302f5bd74e1c92656325c61cc5510"
  }, {
    "url": "assets/index.html-DBmFhndR.js",
    "revision": "bc948483621da837d3b0e7f3664e7033"
  }, {
    "url": "assets/index.html-D9mL1FzE.js",
    "revision": "5d1cfb4a20a09b6d97a3813d6f483d64"
  }, {
    "url": "assets/index.html-D9898I_J.js",
    "revision": "363e8ed6bc6fa6e59c0626a7d66a9294"
  }, {
    "url": "assets/index.html-D3kUPgfF.js",
    "revision": "89d58f07f9a409ea8344fd136e285e49"
  }, {
    "url": "assets/index.html-D1q68ruJ.js",
    "revision": "1f7137730113bf21dce5dce8d5949b48"
  }, {
    "url": "assets/index.html-D14WJiPn.js",
    "revision": "39181b0fb4c5bd04194629c802644ee3"
  }, {
    "url": "assets/index.html-D1475FAw.js",
    "revision": "226365ad742b8cead4c743c2ced493a0"
  }, {
    "url": "assets/index.html-Cygo3dBs.js",
    "revision": "d081d93f38ad34f849b1cdf59c415408"
  }, {
    "url": "assets/index.html-CtixyFsb.js",
    "revision": "7279c3f5fdf6a4aca6e75ebf7e5ba6e1"
  }, {
    "url": "assets/index.html-CswHsDBM.js",
    "revision": "10f85c8a541d3dffb92401110ce904cf"
  }, {
    "url": "assets/index.html-Cst6SuQQ.js",
    "revision": "482f4d9224948cc2703fec3fdc1fa828"
  }, {
    "url": "assets/index.html-CpXEsg9n.js",
    "revision": "5d7b7216911e961b06db3aeb80a64712"
  }, {
    "url": "assets/index.html-Cnlmo2lk.js",
    "revision": "02d180755490712c0b622dca9eda37b6"
  }, {
    "url": "assets/index.html-CeUYRd0w.js",
    "revision": "03a709638b44bb9c28b82dcd7868e862"
  }, {
    "url": "assets/index.html-CbhRK2hY.js",
    "revision": "8bc29bd5876ad797636384027b44f92b"
  }, {
    "url": "assets/index.html-CKs4QS7j.js",
    "revision": "67ef986148d8700d021b1d48beb4bb3c"
  }, {
    "url": "assets/index.html-CGTVIRmx.js",
    "revision": "cc9c8f39bdf1245ccff8c7255b1e3c80"
  }, {
    "url": "assets/index.html-CDfR5daF.js",
    "revision": "a96616af6c31881483de5e33269d1c7d"
  }, {
    "url": "assets/index.html-CALcG_ju.js",
    "revision": "df874730e5fd1c5a2940b7807a2a1dc6"
  }, {
    "url": "assets/index.html-C1wpCmkL.js",
    "revision": "8ccb65658ec141e72b6eb6a2bb4ae41c"
  }, {
    "url": "assets/index.html-BsRwn9QD.js",
    "revision": "729698e64eec18076e0c364eac83777e"
  }, {
    "url": "assets/index.html-BqBiWkBA.js",
    "revision": "3eb71bf6e3abda79918d05061d7553c2"
  }, {
    "url": "assets/index.html-BoEy2dAy.js",
    "revision": "8820cc69f0af37b2db229d36ccd99a39"
  }, {
    "url": "assets/index.html-Bm_gbhHL.js",
    "revision": "9fa2150eeb9f41219c479915e15c14a6"
  }, {
    "url": "assets/index.html-Bk9ei-RP.js",
    "revision": "d224c159920e391c26e2f8343b1dab2d"
  }, {
    "url": "assets/index.html-Bfoqy1Nf.js",
    "revision": "aed3b069e68df414b60f0c62302c1ea1"
  }, {
    "url": "assets/index.html-BPwu_0UB.js",
    "revision": "3661d959c2bb8a6959349e9bbd324bd7"
  }, {
    "url": "assets/index.html-BE0t2piv.js",
    "revision": "859155c248664d74f1cb434f8c43fa6a"
  }, {
    "url": "assets/index.html-B9asg18D.js",
    "revision": "67e22b9198282b75102ce84a78fa00e2"
  }, {
    "url": "assets/index.html-B3f4Cx62.js",
    "revision": "af08f82b3506da498475150af3d87177"
  }, {
    "url": "assets/index.html-B0tY79Tx.js",
    "revision": "8070d5bb05d65e1c6494bde87f20d615"
  }, {
    "url": "assets/index.html-B0Lw3Ryq.js",
    "revision": "e1ed0f53ae05d804b92790e093d6bfef"
  }, {
    "url": "assets/index.html-6QtzqLV7.js",
    "revision": "f90266f25f5dd496576f4a2a0fb3b474"
  }, {
    "url": "assets/index-DTEEl-sV.js",
    "revision": "46a193641571106d3b7b43f9bc2a2735"
  }, {
    "url": "assets/how-llm-know-mcp-params.html-DihLGn2i.js",
    "revision": "1d9dff25ecb3121ab0166d8a62eef750"
  }, {
    "url": "assets/giscus-BAf4_9qv.js",
    "revision": "6bba63cc83e1b2b20cd115e60344dde7"
  }, {
    "url": "assets/docker-proxy.html-C_UrCpHz.js",
    "revision": "76ee095db7c9b3f41344001ac8595088"
  }, {
    "url": "assets/compiler.html-lK19S95x.js",
    "revision": "0f5216f0876ca4e6f9c8f6c330d10c98"
  }, {
    "url": "assets/code-visualization-intro.html-4NO5qIsY.js",
    "revision": "964b16f29413e5ad7bf609a7dd724bb0"
  }, {
    "url": "assets/code-funny.html-Br6mYsw-.js",
    "revision": "bab90235cefe30074af48587b01b6328"
  }, {
    "url": "assets/cg-diff.html-ByoniMWH.js",
    "revision": "c0e9ddf099ad4bb15ec523234712fce3"
  }, {
    "url": "assets/auto-lock.html-DNeLbirV.js",
    "revision": "d4e41592fbc52960a2f49dc50a8dc4c4"
  }, {
    "url": "assets/app-BPxzbjwh.js",
    "revision": "dcdd39a12c90e8edcadc75c797935a65"
  }, {
    "url": "assets/ai-unit-test.html-DLEUdeeY.js",
    "revision": "7611614b89c1607231d809cacfc3bf36"
  }, {
    "url": "assets/ai-search.html-Ds3I_WWw.js",
    "revision": "a51b0f658707f23e870b45dbe91196c1"
  }, {
    "url": "assets/ai-hotspot.html-BMRYcW8L.js",
    "revision": "9aeab2957c72babd13beb40bc56bc7ce"
  }, {
    "url": "assets/ai-article-database.html-zvRQ413S.js",
    "revision": "e73d3d5001f60c619745af8a70c17b59"
  }, {
    "url": "assets/ai-agent.html-FZhNscr5.js",
    "revision": "d8f01e943b9dc9c2bc2bee1596a965e3"
  }, {
    "url": "assets/aff.html-BATsSTli.js",
    "revision": "3fbf154b912e507055e7b7576fc7cda7"
  }, {
    "url": "assets/SearchResult-1KGpeaIW.js",
    "revision": "33ba2e23cffdb8cbc9cc2cc1906a27e8"
  }, {
    "url": "assets/5-years-summarize.html-Doot7axO.js",
    "revision": "41f6ea13e859cb3f4443cccb07a1293a"
  }, {
    "url": "assets/404.html-C__EJnGf.js",
    "revision": "59825491fb45b236bd6595bc1afd5190"
  }, {
    "url": "assets/2026-3-6.html-QWPygsig.js",
    "revision": "53b65c668378a31a477f2cd110e6f97c"
  }, {
    "url": "assets/2026-3-4.html-hsYiwy8n.js",
    "revision": "9837efd4f72e0828d9f61623854b50f2"
  }, {
    "url": "assets/2026-3-3.html-C23pnlUK.js",
    "revision": "c2bb0c77b9dd390c53df736622519b41"
  }, {
    "url": "assets/2026-3-26.html-DObKpzZn.js",
    "revision": "b38ee7794b2b6b5ece653dd4ce76173b"
  }, {
    "url": "assets/2026-3-24.html-H108qrRO.js",
    "revision": "e3805b3ea0d032cd7f24ea1effc42e21"
  }, {
    "url": "assets/2026-3-22.html-CJUfhk9X.js",
    "revision": "f78c86b6ae1012ae187927f4a2aad035"
  }, {
    "url": "assets/2026-3-17.html-BSe7D83F.js",
    "revision": "ffcfdf48262b4a31bfa722480ae62818"
  }, {
    "url": "assets/2026-3-16.html-NKzTqDU9.js",
    "revision": "da544f8bd06bd9b624ba2f7cd7603f57"
  }, {
    "url": "assets/2025-end.html-Dit3yhxG.js",
    "revision": "ccc8388acd4e871baff2124ed25edc85"
  }, {
    "url": "assets/2024-end.html-BRKwnV20.js",
    "revision": "9d543476726539be822cce8af8588ea7"
  }, {
    "url": "index.html",
    "revision": "946aaadbfe56b589567d080f07c59187"
  }, {
    "url": "404.html",
    "revision": "0d06c785b9dbe2c1ae0c151273bb84e1"
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
