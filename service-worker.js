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
    "url": "assets/tcp-fast-open.html-DrEKZfAs.js",
    "revision": "0dcf99ad0cd88c668cb8e18934ff031f"
  }, {
    "url": "assets/style-D2uQfNRt.css",
    "revision": "5e837e72af909281cc7858a331d86bb6"
  }, {
    "url": "assets/regex-vis.html-B7KgcpFu.js",
    "revision": "251abcf1fc1aa847238f98be0d97f355"
  }, {
    "url": "assets/read-flow.html-uIZiFQF8.js",
    "revision": "661406455d58a21ae7e945fc0661c6de"
  }, {
    "url": "assets/read-flow-2026.html-C9L_ifsi.js",
    "revision": "14d3e2de8ee93e6808abf216f89a6ad4"
  }, {
    "url": "assets/read-code-tools.html-BTRI-XBs.js",
    "revision": "20b4644c6689959b15ff444522fa2f38"
  }, {
    "url": "assets/plugin-vue_export-helper-DlAUqK2U.js",
    "revision": "25e3a5dcaf00fb2b1ba0c8ecea6d2560"
  }, {
    "url": "assets/picture-manage.html-CcFRruTb.js",
    "revision": "8374f1579dad92ae78fd2ad2d6f962e4"
  }, {
    "url": "assets/photoswipe.esm-BXDdABy_.js",
    "revision": "6c0bf54cf1322dab242c5bb14307d57a"
  }, {
    "url": "assets/one-cmd-web-to-app.html-DfGDkvvH.js",
    "revision": "d87f95d6fe88d08b4c6fcf134b641c04"
  }, {
    "url": "assets/mac-terminal.html-hm06GvDI.js",
    "revision": "9e3a5e3331622c5b708e9ac21ecdcf58"
  }, {
    "url": "assets/lumina.html-yiQhN7I_.js",
    "revision": "11a8ccc7d7d6d6cb7ddca4f8067100ea"
  }, {
    "url": "assets/kimi.html-Dq-X-B4l.js",
    "revision": "c3ab3984f4f3f4418145cb217e11feba"
  }, {
    "url": "assets/ip-exploration.html-B8yPobUu.js",
    "revision": "fc79d5d30172b29cd2b0f304f6115192"
  }, {
    "url": "assets/index.html-yPkD8p32.js",
    "revision": "c2819815b2b789b3af406097d2b87aab"
  }, {
    "url": "assets/index.html-yOyM2Tgz.js",
    "revision": "7ba3ff7a8c2204f3e34c9c9c7b329bce"
  }, {
    "url": "assets/index.html-uNl4DaTB.js",
    "revision": "5604e8894bb4e2c1401f199a35d0389f"
  }, {
    "url": "assets/index.html-tQWw1Hwp.js",
    "revision": "f5389a81f56e09c54623a208cf36caa0"
  }, {
    "url": "assets/index.html-qLsYGUoO.js",
    "revision": "fd55193caea6203fdb3708572d6d229c"
  }, {
    "url": "assets/index.html-ja4cg9l1.js",
    "revision": "77650e34530c059a6bcdb70b0719e86a"
  }, {
    "url": "assets/index.html-aPE1gOgr.js",
    "revision": "40d6d4e7d458cfa63c67caa61cd530d1"
  }, {
    "url": "assets/index.html-UDQxePgI.js",
    "revision": "a8062c194580cac0cb86cc2bd357672b"
  }, {
    "url": "assets/index.html-TzBWpkwL.js",
    "revision": "9f7720ce2530cc5d93f506106b7d1e5f"
  }, {
    "url": "assets/index.html-RYbiRytK.js",
    "revision": "6277521e048d8cac36c8313aa4207107"
  }, {
    "url": "assets/index.html-DxLAgGCY.js",
    "revision": "7f912acb154fdbc8bb8a7a84f6de46f8"
  }, {
    "url": "assets/index.html-Dw7aj89d.js",
    "revision": "3b7c0deaa4dec55662ae4ef1b61c3e36"
  }, {
    "url": "assets/index.html-DkObvPA7.js",
    "revision": "4fc32110eb62531777ff460516c954dd"
  }, {
    "url": "assets/index.html-Dan6oJ8U.js",
    "revision": "b0f3ed933c92427da2f9f492648fff25"
  }, {
    "url": "assets/index.html-DZmB9xSJ.js",
    "revision": "678ccdd5103446a277b9c45baee45a23"
  }, {
    "url": "assets/index.html-DYrxqwlf.js",
    "revision": "7f87c3fc998f34cd273423dbbfec1fae"
  }, {
    "url": "assets/index.html-DR7temap.js",
    "revision": "71167868fccf237ef840ecbcfe99a53a"
  }, {
    "url": "assets/index.html-DNnDkhOk.js",
    "revision": "26377fd8fe3c5f26d7c2df008364069d"
  }, {
    "url": "assets/index.html-DNFs0gEY.js",
    "revision": "159355c36726134e1aef0d856e3f2bca"
  }, {
    "url": "assets/index.html-DDINRtjz.js",
    "revision": "9246d421b30ca2a069c16b488f6029de"
  }, {
    "url": "assets/index.html-D98QZmYs.js",
    "revision": "bef5503c43cfae7b29b2774e89bf3d4f"
  }, {
    "url": "assets/index.html-D72yImEK.js",
    "revision": "2be3f1becce7369f025046f0183c684b"
  }, {
    "url": "assets/index.html-D21MdKoN.js",
    "revision": "c4bf636855f5522d853ff884f3c8b938"
  }, {
    "url": "assets/index.html-Cyjl5av3.js",
    "revision": "81c95cb2bf63e9a766694f5a961ac2eb"
  }, {
    "url": "assets/index.html-CuPjEjkE.js",
    "revision": "015b72655680a075fcf834533e7c6c84"
  }, {
    "url": "assets/index.html-CuOGnqjE.js",
    "revision": "ead1e89f7c6f8dfde99689e5b09d0f3c"
  }, {
    "url": "assets/index.html-Cja127wv.js",
    "revision": "22ae6765138085b5c874bc7bef8c7284"
  }, {
    "url": "assets/index.html-CjYkO7dQ.js",
    "revision": "257e44239e54bf4f779befde71b835df"
  }, {
    "url": "assets/index.html-CgI9DY7R.js",
    "revision": "408b202d38ff1e53f03a31eb36987df7"
  }, {
    "url": "assets/index.html-CdNn_ggN.js",
    "revision": "8f0d09b8c6d21c037400e22eb96d1289"
  }, {
    "url": "assets/index.html-Ccm58RqZ.js",
    "revision": "fc9c3c1d03a343613358797e2d98c0ff"
  }, {
    "url": "assets/index.html-CY1qXhmZ.js",
    "revision": "c6bd8636b3c585db237b5a9234c8514d"
  }, {
    "url": "assets/index.html-CWq5BHWq.js",
    "revision": "e689b8cd868f09539a793b7b1fefd1d7"
  }, {
    "url": "assets/index.html-CUQtf0Dc.js",
    "revision": "3f04b1ce491391c4355c8bda2d532c53"
  }, {
    "url": "assets/index.html-CPI1S4Q1.js",
    "revision": "fd51e3af442e53583d9fdcdb4540e7ad"
  }, {
    "url": "assets/index.html-CMefRZhM.js",
    "revision": "b0ad0aa51a9b211df411ce5ee6b83671"
  }, {
    "url": "assets/index.html-CIcGpX9z.js",
    "revision": "83090e4ec15ce8dd7b72ca182b818d79"
  }, {
    "url": "assets/index.html-CILgU7wC.js",
    "revision": "bed1e33ab128011b0b55ba93f64782c3"
  }, {
    "url": "assets/index.html-C9RZlASB.js",
    "revision": "79cbadcdbaa7beaf713f7730cb1bbcf7"
  }, {
    "url": "assets/index.html-C989mHSw.js",
    "revision": "cb16ac0b41cba4627c1646f7f8221e90"
  }, {
    "url": "assets/index.html-C8LMQZpu.js",
    "revision": "e423993dc80db81a14af4b44a1959847"
  }, {
    "url": "assets/index.html-BxXz_dkR.js",
    "revision": "5eeb8a2bd1f5a1ccd006d642cdb653c6"
  }, {
    "url": "assets/index.html-Bv6i7kFF.js",
    "revision": "ac833ce57690f183f79f6003a4e83968"
  }, {
    "url": "assets/index.html-Btl3WDIh.js",
    "revision": "056a93feb3a67c3ef812483c1d54e08a"
  }, {
    "url": "assets/index.html-BqZ4d7p_.js",
    "revision": "90991fb3c7afd0d9d4fc42745dbc34c8"
  }, {
    "url": "assets/index.html-Bh1ZrRBF.js",
    "revision": "06764d5f8f6ad4cf172e789c33c3da31"
  }, {
    "url": "assets/index.html-BgjRQGqC.js",
    "revision": "dfc11208c78acacbe6072253fe7f2b69"
  }, {
    "url": "assets/index.html-Bfppy8Ft.js",
    "revision": "4628cf318620bd0f3a3569dd8567d9e3"
  }, {
    "url": "assets/index.html-BfCQaG6W.js",
    "revision": "995a5e9d9339a06610217ef5ce2bdd37"
  }, {
    "url": "assets/index.html-BevQV9MG.js",
    "revision": "2910aa043da2daf7ca7e941378b42727"
  }, {
    "url": "assets/index.html-BcBsh4UI.js",
    "revision": "f3ed1737ec9c123289e89927c4eba8c7"
  }, {
    "url": "assets/index.html-BbY3cp2u.js",
    "revision": "e8fa821adb4faefc48cfbcf6b87c27a2"
  }, {
    "url": "assets/index.html-BTvC7nnb.js",
    "revision": "1043d8b77a883b869b8a329dedd8fcc8"
  }, {
    "url": "assets/index.html-BNaFFDtI.js",
    "revision": "e607b9bfad878adf87df8d034b2e937c"
  }, {
    "url": "assets/index.html-BNCnxYR7.js",
    "revision": "af0a028c8a693460fb8989503d5b0279"
  }, {
    "url": "assets/index.html-BI-_2peU.js",
    "revision": "bfbe0cf81ef39576c3a86796ff5546be"
  }, {
    "url": "assets/index.html-BI-FokI1.js",
    "revision": "9ef62445bb17153825e9e5b8669c2edf"
  }, {
    "url": "assets/index.html-BCD9e6Ax.js",
    "revision": "6015cb29180b59f9de0a47bd1c6382e2"
  }, {
    "url": "assets/index.html-BABgGF__.js",
    "revision": "802ffbfd045f6ec6d6ed08afdd135dd4"
  }, {
    "url": "assets/index.html-B3CH37zA.js",
    "revision": "d282e88789e953bf83a647fd624f167c"
  }, {
    "url": "assets/index.html-B1kdSn2h.js",
    "revision": "142e6df09be3603cf42b25aed9b437e0"
  }, {
    "url": "assets/index-DTEEl-sV.js",
    "revision": "46a193641571106d3b7b43f9bc2a2735"
  }, {
    "url": "assets/how-llm-know-mcp-params.html-DpcT9jpv.js",
    "revision": "d4d48d2a793bb62ece77dfae1be94634"
  }, {
    "url": "assets/giscus-BAf4_9qv.js",
    "revision": "6bba63cc83e1b2b20cd115e60344dde7"
  }, {
    "url": "assets/docker-proxy.html-CchkAULi.js",
    "revision": "96ebce8e5fdc8773818edd33f2568cea"
  }, {
    "url": "assets/compiler.html-BWx77Z3P.js",
    "revision": "d0e7361f5061f5419c086ba48854363d"
  }, {
    "url": "assets/code-visualization-intro.html-B1mTlaRT.js",
    "revision": "e9f31725d1f675802f0c486e31a8f630"
  }, {
    "url": "assets/code-funny.html-xpSFC-Wz.js",
    "revision": "d750d3e18d9e90fc27c023e1a646a3a5"
  }, {
    "url": "assets/cg-diff.html-I3pOXXp-.js",
    "revision": "2231581aecbb0808032b75f1f494287e"
  }, {
    "url": "assets/auto-lock.html-BhQjMF8t.js",
    "revision": "522ab4fbe53c72a67fae43816255ca56"
  }, {
    "url": "assets/app-Dpa3USK3.js",
    "revision": "d615625db6c4e44646d6f62e0ff4c341"
  }, {
    "url": "assets/ai-unit-test.html-CG71E6vQ.js",
    "revision": "b517ed1cad883ae97bad702334136f17"
  }, {
    "url": "assets/ai-search.html-B359Jefo.js",
    "revision": "c5d295db2aab94ba60b877a1072266e8"
  }, {
    "url": "assets/ai-hotspot.html-CYyOxAca.js",
    "revision": "208d40bedd9b31d6b52a3c960e1ee496"
  }, {
    "url": "assets/ai-article-database.html-D2WTLMbQ.js",
    "revision": "1e794d9bd871629be741591b189bcd1a"
  }, {
    "url": "assets/ai-agent.html-D8uw6B15.js",
    "revision": "8f19910cbefcd690179d4e9e7e1271b2"
  }, {
    "url": "assets/aff.html-BU-bHKhf.js",
    "revision": "a2abe1edb9b5e9c69bc0ac7b98ad5e31"
  }, {
    "url": "assets/SearchResult-Dp7rEZVT.js",
    "revision": "a9a2751c4fd7fa2da9320fa3814db103"
  }, {
    "url": "assets/5-years-summarize.html-Bwhp5btz.js",
    "revision": "2b5d774836a731bc9b7c99d2111fd89e"
  }, {
    "url": "assets/404.html-DcKzhvhs.js",
    "revision": "f7b07d968caa3f6bb18efc2099c61303"
  }, {
    "url": "assets/2026-3-6.html-0EagJLNi.js",
    "revision": "bc067c576073d2d8501da8c7a8f425b7"
  }, {
    "url": "assets/2026-3-4.html-3VAJERNZ.js",
    "revision": "feb85424b718cabbf5c65dfb00e2de4b"
  }, {
    "url": "assets/2026-3-3.html-0-lHvzL6.js",
    "revision": "86d16a30f5ab30d194ce0e938d975ef1"
  }, {
    "url": "assets/2026-3-26.html-BPcNWIhS.js",
    "revision": "5a570cc25ffa891c72bd381281c8122c"
  }, {
    "url": "assets/2026-3-24.html-C943zFkt.js",
    "revision": "3ce83676bcfdbbbf9dc00a406fd33e41"
  }, {
    "url": "assets/2026-3-22.html-C4e5oYBZ.js",
    "revision": "74f985415d9f830fb8816f954dd0a66e"
  }, {
    "url": "assets/2026-3-17.html-DH_1slVw.js",
    "revision": "8205d219f9c85b0b3a026cf395d7f25b"
  }, {
    "url": "assets/2026-3-16.html-DvmRzoRk.js",
    "revision": "00521b50fd09137114193d8938cb479a"
  }, {
    "url": "assets/2025-end.html-C9R8BFE7.js",
    "revision": "26d9956829f305500991607c782044eb"
  }, {
    "url": "assets/2024-end.html-DkQt1OM9.js",
    "revision": "297c47772accc10ff0622cc14ebd17ad"
  }, {
    "url": "index.html",
    "revision": "71a1350c3406f916585755371eefd84e"
  }, {
    "url": "404.html",
    "revision": "808600c3fb1f4087f2eddf5a15c06ade"
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
