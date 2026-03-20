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
    "url": "assets/tcp-fast-open.html-BxKxd-9N.js",
    "revision": "71eb79fa6392014ff8f34619aee408d9"
  }, {
    "url": "assets/style-D2uQfNRt.css",
    "revision": "5e837e72af909281cc7858a331d86bb6"
  }, {
    "url": "assets/regex-vis.html-BZzeJlYX.js",
    "revision": "4681ce91bbdb042893c52c157cf1d84c"
  }, {
    "url": "assets/read-flow.html-CrUEZ8cT.js",
    "revision": "dbaf04a3884498b8663cec285e1d5136"
  }, {
    "url": "assets/read-flow-2026.html-DBhAnHut.js",
    "revision": "2dc815e0c8542203028cf9dcdccbfa67"
  }, {
    "url": "assets/read-code-tools.html-BgudC09D.js",
    "revision": "c29057afb69bfbcbba3c9d5d07903142"
  }, {
    "url": "assets/plugin-vue_export-helper-DlAUqK2U.js",
    "revision": "25e3a5dcaf00fb2b1ba0c8ecea6d2560"
  }, {
    "url": "assets/picture-manage.html-CoXgalO0.js",
    "revision": "d8e285108db308b1e4852109a3af7f76"
  }, {
    "url": "assets/photoswipe.esm-BXDdABy_.js",
    "revision": "6c0bf54cf1322dab242c5bb14307d57a"
  }, {
    "url": "assets/one-cmd-web-to-app.html-DT1tHBGq.js",
    "revision": "13a4a68fef048e15d680cc04889af6d6"
  }, {
    "url": "assets/mac-terminal.html-D4KidbF5.js",
    "revision": "1d936ebc03e0bc9937c2249c8da9ca08"
  }, {
    "url": "assets/kimi.html-CRG0Cpm-.js",
    "revision": "fdab2af0e34473ae6a0e956b9225cf06"
  }, {
    "url": "assets/ip-exploration.html-D6Gy66pT.js",
    "revision": "a34183eea7c78d8026317a83ddf062b5"
  }, {
    "url": "assets/index.html-zLicAs2A.js",
    "revision": "79774fb59fa74d25ad7d4c59a00febab"
  }, {
    "url": "assets/index.html-yDkvTI8F.js",
    "revision": "c2889aaa4dc48233ced46916ef50a67e"
  }, {
    "url": "assets/index.html-qgXpmw5b.js",
    "revision": "671ad2f98f26650d0eea1399d8de28ab"
  }, {
    "url": "assets/index.html-lGKoKesX.js",
    "revision": "578f5c2466c2cb4b2f0687cd54394e45"
  }, {
    "url": "assets/index.html-jhrIZee0.js",
    "revision": "a25f8267a85ce4d9a2b3d6a5a7f6190e"
  }, {
    "url": "assets/index.html-c2lYo9l5.js",
    "revision": "7bf992f3ab761f9a8b0e54bed5b823ea"
  }, {
    "url": "assets/index.html-ZPxmAH6A.js",
    "revision": "76cabad4ef0c5a2c474778e12974ea18"
  }, {
    "url": "assets/index.html-XNiEl_vJ.js",
    "revision": "1926a4af70d40506f5b9c10a8faec076"
  }, {
    "url": "assets/index.html-VoiqOoIA.js",
    "revision": "b556891ab4f3f458539fc86ead7fb335"
  }, {
    "url": "assets/index.html-Tn-98wJd.js",
    "revision": "f32bce0161766671dd8a86f8724eb1d4"
  }, {
    "url": "assets/index.html-TcROm53I.js",
    "revision": "8182d6ef7140ba61242b2a0573e59471"
  }, {
    "url": "assets/index.html-Dz17zFbq.js",
    "revision": "2bec7501d2cda3a75e04abe7059f6463"
  }, {
    "url": "assets/index.html-Dspo6mIv.js",
    "revision": "179a8551b43cc076b55258af5c24ddd9"
  }, {
    "url": "assets/index.html-DqnNMDkL.js",
    "revision": "319b6e9f6d0103d40aa11085bb9e37db"
  }, {
    "url": "assets/index.html-DmHieBGh.js",
    "revision": "d879a42d85e95a7cd2f45fc5a61708c2"
  }, {
    "url": "assets/index.html-DjjFbeYo.js",
    "revision": "1287136918ec124f3829e26ac111d965"
  }, {
    "url": "assets/index.html-DhLCqfRx.js",
    "revision": "11e983af177bc9912f1900eb48a0ac8a"
  }, {
    "url": "assets/index.html-DdPz8a59.js",
    "revision": "700886b405e6465bf7db39acdf18742b"
  }, {
    "url": "assets/index.html-Dbyc4Whf.js",
    "revision": "9a55c9ad7be2dc63d5fa945f6e4061b3"
  }, {
    "url": "assets/index.html-DarwGMIH.js",
    "revision": "09fcd2e9e188df16805066036b8e713d"
  }, {
    "url": "assets/index.html-DWU2IAy0.js",
    "revision": "1d9bc061966cf94751e45ecd3c956eb8"
  }, {
    "url": "assets/index.html-DWHdWf_v.js",
    "revision": "f6cae181306ada5433bc6bceb0fb2c55"
  }, {
    "url": "assets/index.html-DVpMW8Xp.js",
    "revision": "0dc1061fe71cd878b6864d59684d8eab"
  }, {
    "url": "assets/index.html-DTbR8bOs.js",
    "revision": "67d18fb9ebbe1095027c6f2a311cad3c"
  }, {
    "url": "assets/index.html-DTER3-e8.js",
    "revision": "9de98dbe614ac2a423a76ee979e20115"
  }, {
    "url": "assets/index.html-DSxlifZL.js",
    "revision": "2940e5b93c658ad61df0af79b11ef2ac"
  }, {
    "url": "assets/index.html-DSHXmhBw.js",
    "revision": "0b359020d36712957ba67611d1428432"
  }, {
    "url": "assets/index.html-DPhe3VGV.js",
    "revision": "250b5cea7fa225b4b110b7c5474c8845"
  }, {
    "url": "assets/index.html-DO1svxe-.js",
    "revision": "c5cd9c966e420384c138227380cb71d2"
  }, {
    "url": "assets/index.html-DN4UglPH.js",
    "revision": "d72641760f1c81122f46c8bca49e025a"
  }, {
    "url": "assets/index.html-DKsjw-rt.js",
    "revision": "89352b7aaad73540934bf915c9bbdef8"
  }, {
    "url": "assets/index.html-DKEGSde_.js",
    "revision": "b2822953c29b95ec2b38fdaad71c1648"
  }, {
    "url": "assets/index.html-DG1CmGz5.js",
    "revision": "7fab9c1411dba6fc39f8e9c61ebb7380"
  }, {
    "url": "assets/index.html-DDtCt9iJ.js",
    "revision": "64d0565a02d5883083b0dfca7a82c4eb"
  }, {
    "url": "assets/index.html-DDPpFsuO.js",
    "revision": "6bf1292ab891f864c0168e002c2e131b"
  }, {
    "url": "assets/index.html-D4aJR8wX.js",
    "revision": "714d7522ef01dcad15e2c90a2aec5996"
  }, {
    "url": "assets/index.html-D2pNBSVX.js",
    "revision": "9d2d68927509fc7eb42ca2aab0b9273b"
  }, {
    "url": "assets/index.html-CzD4NQKN.js",
    "revision": "929b4d0385e74a8f1537881d5766bfae"
  }, {
    "url": "assets/index.html-CygrVh4G.js",
    "revision": "7886feadc60098c32e2eed4e1e089d32"
  }, {
    "url": "assets/index.html-CuGofOkM.js",
    "revision": "58686b70f1ff844ee936751070060ba7"
  }, {
    "url": "assets/index.html-Cs5S5hZ8.js",
    "revision": "0238408b7555a148e3dc398e74280ae4"
  }, {
    "url": "assets/index.html-CorgbE6l.js",
    "revision": "9da60216f450556600f04c6866eb945b"
  }, {
    "url": "assets/index.html-Cn79SckG.js",
    "revision": "c402bf4274a1fc5d54448c0006dff55a"
  }, {
    "url": "assets/index.html-CkQPpXBP.js",
    "revision": "37bb21bf49e589af114757b01eab35c6"
  }, {
    "url": "assets/index.html-CkKvqbWk.js",
    "revision": "c9d60191ceda4eb9baedcf6f22ad2934"
  }, {
    "url": "assets/index.html-CgRUE048.js",
    "revision": "866565404b7b300bf903d34b3e5adf69"
  }, {
    "url": "assets/index.html-CaXUGjKP.js",
    "revision": "a05dd5810c5a740500493863c430389f"
  }, {
    "url": "assets/index.html-CSWyVLU7.js",
    "revision": "af9bd62188409e91b916627be5fff516"
  }, {
    "url": "assets/index.html-CSPhyknw.js",
    "revision": "f8243916a5674e6f3e060cbc6331a939"
  }, {
    "url": "assets/index.html-CNKCBBPY.js",
    "revision": "92350db713eb1a60f0cb063999b25545"
  }, {
    "url": "assets/index.html-C9hhOMyw.js",
    "revision": "8f0fc1f374446e899075e501e8fa8a9d"
  }, {
    "url": "assets/index.html-C7aS3Mlg.js",
    "revision": "0b463516b2a4c1b948d32f2b5c22610b"
  }, {
    "url": "assets/index.html-C1RMIHam.js",
    "revision": "cefcdad67f6206867a177015172e4ea6"
  }, {
    "url": "assets/index.html-BwL3GtxM.js",
    "revision": "0af7dfddc86533cdc20eaf1e314a6889"
  }, {
    "url": "assets/index.html-Boay2w7l.js",
    "revision": "3782adb61c3ae81ec5832edf5ca29513"
  }, {
    "url": "assets/index.html-BmhzsWT5.js",
    "revision": "39dae2ff6b34c34d90059d46ca715ae1"
  }, {
    "url": "assets/index.html-BkjUF7rw.js",
    "revision": "4ec9ca820b9b76045037e51791929648"
  }, {
    "url": "assets/index.html-BdsFLnWl.js",
    "revision": "48ae99c163179a0e6f6b4d32b22c1653"
  }, {
    "url": "assets/index.html-BOJqlIHg.js",
    "revision": "e95943e62c0b4ebd53db14cebfdc4836"
  }, {
    "url": "assets/index.html-BGu4C59n.js",
    "revision": "1061e7184ce32b83a1a7d4ced90f5195"
  }, {
    "url": "assets/index.html-BBSfSpGh.js",
    "revision": "0295146a233c2684f1f8d26fd88eeba1"
  }, {
    "url": "assets/index.html-B6dXsAWo.js",
    "revision": "e9615f425c3609ad0627063ee88677d1"
  }, {
    "url": "assets/index.html-3po_L9Ue.js",
    "revision": "58469e0e4119fc907da63567f9bb25b5"
  }, {
    "url": "assets/index.html-2BFGrIL8.js",
    "revision": "3e541431ba9b450be3b47363183abf0d"
  }, {
    "url": "assets/index.html-1jInuNTm.js",
    "revision": "a15945fa8e078ea38b3ecb83a5e48954"
  }, {
    "url": "assets/index.html-13QY0yuF.js",
    "revision": "ac05fb814de250fffab14dbc6d33a146"
  }, {
    "url": "assets/index.html--OVl3YOr.js",
    "revision": "919e2013e7329837b8c2897a3d79430d"
  }, {
    "url": "assets/index-DTEEl-sV.js",
    "revision": "46a193641571106d3b7b43f9bc2a2735"
  }, {
    "url": "assets/how-llm-know-mcp-params.html-ZAIUiXBE.js",
    "revision": "5a94fa00c1228bd5ce111faa1e3bb707"
  }, {
    "url": "assets/giscus-BAf4_9qv.js",
    "revision": "6bba63cc83e1b2b20cd115e60344dde7"
  }, {
    "url": "assets/docker-proxy.html-ud7J4djc.js",
    "revision": "5a19a98abd42ac48b514346453f5ba61"
  }, {
    "url": "assets/compiler.html-wUHhR0FE.js",
    "revision": "f36532067f39f88f141aa967b77f868f"
  }, {
    "url": "assets/code-visualization-intro.html-zkrCG62x.js",
    "revision": "820752c71bc5f0be080e37a7655a4721"
  }, {
    "url": "assets/code-funny.html-MbLQiE-n.js",
    "revision": "29c94ac5b7d551cd0908f11705e539d3"
  }, {
    "url": "assets/cg-diff.html-DT2FpwtH.js",
    "revision": "7c6550e81ed8d4af180f8956a75bc8a9"
  }, {
    "url": "assets/auto-lock.html-CjUGveY4.js",
    "revision": "f076643fd9ff33381bd26b0a26cfd8de"
  }, {
    "url": "assets/app-C59McKyo.js",
    "revision": "f5db69324bca0b3eafabfd93e3087577"
  }, {
    "url": "assets/ai-unit-test.html-GN5uLHuW.js",
    "revision": "61b8ec042937f44aee0528031453a3a4"
  }, {
    "url": "assets/ai-search.html-B4EXcryG.js",
    "revision": "e93bc276e0b3ec132aab037697583f8a"
  }, {
    "url": "assets/ai-hotspot.html-D8yfyOZb.js",
    "revision": "a5f2adc86e8e805088374e848afbe62b"
  }, {
    "url": "assets/ai-article-database.html-DXz6eyv1.js",
    "revision": "9dc8052989c67b4ffc4f843154d2c26a"
  }, {
    "url": "assets/ai-agent.html-DBpbfL8F.js",
    "revision": "928fdcb5ff3bf10f04b5b240cc23d570"
  }, {
    "url": "assets/SearchResult-CnKh3DS9.js",
    "revision": "8daffd535b45e2482e003b5e3e5bb504"
  }, {
    "url": "assets/5-years-summarize.html-i8aMm3TW.js",
    "revision": "d7641fb55a74c5e980e864192e50b9b0"
  }, {
    "url": "assets/404.html-B99IKc_t.js",
    "revision": "606cedba5ddfc91498c41263785fe14e"
  }, {
    "url": "assets/2026-3-6.html-DHPlaW-0.js",
    "revision": "b0d00c0081297fbfe32428a5d62d259e"
  }, {
    "url": "assets/2026-3-4.html-D-YyExQV.js",
    "revision": "362d672f0eb65ca6f88fc74ca4de44f3"
  }, {
    "url": "assets/2026-3-3.html-D639927x.js",
    "revision": "9adf62fa07c133af23337c20d705d6b6"
  }, {
    "url": "assets/2026-3-17.html-BSrb14ND.js",
    "revision": "d2d290c3f80c3a0d99dc6e51b3195d90"
  }, {
    "url": "assets/2026-3-16.html-D6MX2ylZ.js",
    "revision": "85326ae96e5cf17bede34e9bc01796f6"
  }, {
    "url": "assets/2025-end.html-DwmxrCYU.js",
    "revision": "ea026a13ff5d2751a1a5eaf8c5b245ee"
  }, {
    "url": "assets/2024-end.html-Z_1tPA69.js",
    "revision": "f77bfff933adc39e5550ca560eeb8791"
  }, {
    "url": "index.html",
    "revision": "efa385c58987c3768f78f62696aa881e"
  }, {
    "url": "404.html",
    "revision": "c5bf9e92f7d9c3b0d3f818afeddea3df"
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
