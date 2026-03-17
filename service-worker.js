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
    "url": "assets/tcp-fast-open.html-CwhSin6Z.js",
    "revision": "19fdf7dd45bcea3d318022826d747aac"
  }, {
    "url": "assets/style-D2uQfNRt.css",
    "revision": "5e837e72af909281cc7858a331d86bb6"
  }, {
    "url": "assets/regex-vis.html-zJw9PhrJ.js",
    "revision": "07bbd0ea1f8026b5716c0abc4280d5bb"
  }, {
    "url": "assets/read-flow.html-IZM53mrf.js",
    "revision": "8b777736ff20e3f985ccf0b253a142f7"
  }, {
    "url": "assets/read-flow-2026.html-aaJcIcdN.js",
    "revision": "f1b17a2c3ed903c255c225d45b2e6f9b"
  }, {
    "url": "assets/read-code-tools.html-DPd0Kmf9.js",
    "revision": "dd41bf53be87a75a46ccdfe7dad05609"
  }, {
    "url": "assets/plugin-vue_export-helper-DlAUqK2U.js",
    "revision": "25e3a5dcaf00fb2b1ba0c8ecea6d2560"
  }, {
    "url": "assets/picture-manage.html-IswIkDmf.js",
    "revision": "07a1970a447c5cbaa3d727ad3d80ab45"
  }, {
    "url": "assets/photoswipe.esm-BXDdABy_.js",
    "revision": "6c0bf54cf1322dab242c5bb14307d57a"
  }, {
    "url": "assets/one-cmd-web-to-app.html-CKqqhkra.js",
    "revision": "659fb3505605a55c3ad074784a5e4d71"
  }, {
    "url": "assets/mac-terminal.html-jkYKM0v4.js",
    "revision": "08f46d60d0813eb3e2c8c6290c1b0b84"
  }, {
    "url": "assets/kimi.html-lnszEwU1.js",
    "revision": "d1907091e8b890a2a5e21153c9787df3"
  }, {
    "url": "assets/ip-exploration.html-CA_dDTg8.js",
    "revision": "ea54382b46cffef01cb44a5a2c8e79a7"
  }, {
    "url": "assets/index.html-zetqUls5.js",
    "revision": "5fa4ba5c712e52de9f89fcad421ac2b7"
  }, {
    "url": "assets/index.html-z9gCmD6R.js",
    "revision": "b0977d5a6045c9342b81a4fda48f5ac1"
  }, {
    "url": "assets/index.html-sXrph6KD.js",
    "revision": "bca91b9cc0b7171570b901e521aeab70"
  }, {
    "url": "assets/index.html-myfjk1ng.js",
    "revision": "d4f1175845121b30e754e0262f3aaa00"
  }, {
    "url": "assets/index.html-lzewEgmb.js",
    "revision": "73f009f304612e64165f2129dd655157"
  }, {
    "url": "assets/index.html-lXwOw0Wk.js",
    "revision": "08c58e1553b5a07e971ac6ea339c0fe8"
  }, {
    "url": "assets/index.html-j-tz4orl.js",
    "revision": "6c5da296505f9b2714f333b1bab25a2f"
  }, {
    "url": "assets/index.html-cdSDlbYw.js",
    "revision": "402f833df9b7587419311537673e6c7d"
  }, {
    "url": "assets/index.html-cbX0H6mt.js",
    "revision": "db94a6ed53049650dd31bc338b8a2d59"
  }, {
    "url": "assets/index.html-TJY98M_S.js",
    "revision": "37090bbf4cc7fe966344410c6a2d0855"
  }, {
    "url": "assets/index.html-RsUVfcOA.js",
    "revision": "aa14a81e1445359cb9d3c96627a5ef44"
  }, {
    "url": "assets/index.html-L_m0mHax.js",
    "revision": "c38c38b69ed25f340110dbda8f863577"
  }, {
    "url": "assets/index.html-FpEC42Bm.js",
    "revision": "6b6e1716d91d6c8f13ea8fde39232e37"
  }, {
    "url": "assets/index.html-EaO4fGyI.js",
    "revision": "45c8243b1782f82c6ee98d5821c9bec9"
  }, {
    "url": "assets/index.html-DyOVl3gA.js",
    "revision": "82cc6232269c3cf641b72b7cfef061e2"
  }, {
    "url": "assets/index.html-DxczKHOv.js",
    "revision": "e9e7c02d227b1c17db64e8757046362b"
  }, {
    "url": "assets/index.html-DsT5VJMr.js",
    "revision": "557cdae830289bed63358d89af652bcb"
  }, {
    "url": "assets/index.html-Ds8Vn-DZ.js",
    "revision": "0787fe53d530ab8a088362bf5d8290eb"
  }, {
    "url": "assets/index.html-DpzmMo-S.js",
    "revision": "5e180696ac90df0b66ff74ffd7f06d35"
  }, {
    "url": "assets/index.html-DnglC50_.js",
    "revision": "208ba7f4d7cda3a71567bfd02b99b121"
  }, {
    "url": "assets/index.html-Dlfg4hHa.js",
    "revision": "9bed95cd44a2f2cc71b5ae0bcc46a821"
  }, {
    "url": "assets/index.html-DlI7VqS9.js",
    "revision": "ad67227311b77480a2d4b947e93bd199"
  }, {
    "url": "assets/index.html-Dl358Vd8.js",
    "revision": "8f40c46715ebd977c420aa9c3e17b463"
  }, {
    "url": "assets/index.html-DkhIXtDt.js",
    "revision": "bca29df767950b5e30283ae460c2875a"
  }, {
    "url": "assets/index.html-DjsAe_sH.js",
    "revision": "5b292a957f262731aea71c154684ea2d"
  }, {
    "url": "assets/index.html-DjebvZ4Y.js",
    "revision": "daca828489b84d86e3f77e466e5f09bb"
  }, {
    "url": "assets/index.html-DhFsJSvs.js",
    "revision": "7676eedfee4ead2fb20c83cb7762cf04"
  }, {
    "url": "assets/index.html-DaInSQeF.js",
    "revision": "e153c77abacb6daf653901f717576e03"
  }, {
    "url": "assets/index.html-DZLsEFbV.js",
    "revision": "dd07b642893ae3c54ce05dd9b74e3ac4"
  }, {
    "url": "assets/index.html-DMT48PS5.js",
    "revision": "fd132eab8e102159636dc1a70e1f10c4"
  }, {
    "url": "assets/index.html-DDNtIVH2.js",
    "revision": "08d5bc4b91866e68f97532ae5ed9e3b5"
  }, {
    "url": "assets/index.html-DCGChlJv.js",
    "revision": "2c175400c10d081e4073b9c361fa36f8"
  }, {
    "url": "assets/index.html-D9aqkMRK.js",
    "revision": "a6168de097fd69155185a1ebbdfcbdf1"
  }, {
    "url": "assets/index.html-D4eiVou2.js",
    "revision": "eceb8cd1d75109466ab70adb90130986"
  }, {
    "url": "assets/index.html-D-nH6hAm.js",
    "revision": "9bee95fcbbfffeffdf194792f4a97019"
  }, {
    "url": "assets/index.html-Ch1bSbXc.js",
    "revision": "ec8481bd3d99ef8b21394ffea14dba77"
  }, {
    "url": "assets/index.html-CPNECEJl.js",
    "revision": "e600e2cf3a566b77dfd8248c4995bec6"
  }, {
    "url": "assets/index.html-CLi_ii3L.js",
    "revision": "977c1ddc2ffcb1ff6b2bc72b00167c14"
  }, {
    "url": "assets/index.html-CKq1p05l.js",
    "revision": "ec3f56d614cb64ab6ac9a57e8f10a66e"
  }, {
    "url": "assets/index.html-CIVyUn06.js",
    "revision": "bd62ef94050f42028ec982bcd1aa5e77"
  }, {
    "url": "assets/index.html-CG0QRVJD.js",
    "revision": "63ebfb5c0be3df4f393fcdb59bd977aa"
  }, {
    "url": "assets/index.html-CAw-27C_.js",
    "revision": "2fb8d3df5a53207378b0c3e6b705178f"
  }, {
    "url": "assets/index.html-C43VGSmJ.js",
    "revision": "46a3a7f60c17065f5dd8b2e769a110bc"
  }, {
    "url": "assets/index.html-BwspzV3f.js",
    "revision": "2c390f91d1461047204454569e3db8bc"
  }, {
    "url": "assets/index.html-BubTIyPM.js",
    "revision": "58e95bfe0533abc3a1fbf887163440d2"
  }, {
    "url": "assets/index.html-BtKXJfj-.js",
    "revision": "fbfdf24c02fe89ff7c1a372496f53ddb"
  }, {
    "url": "assets/index.html-Bt5jIkk4.js",
    "revision": "e431eaeed96bb4f0226b159f74a453a2"
  }, {
    "url": "assets/index.html-BgnWM0G_.js",
    "revision": "2c5abb50745ae9c63ae9f6e743b09ba5"
  }, {
    "url": "assets/index.html-BgL_Sa5v.js",
    "revision": "ffea1bf981375c15bf6f910499120916"
  }, {
    "url": "assets/index.html-Bd47Y7ne.js",
    "revision": "0ceccb3b72b4fb0a76b47f4efdb01e12"
  }, {
    "url": "assets/index.html-BYvYx4-A.js",
    "revision": "f1c65dd5c498967afd69b4e6edf562ff"
  }, {
    "url": "assets/index.html-BVG6Owwb.js",
    "revision": "df9c53de92086acf6b5c05ebc2c63307"
  }, {
    "url": "assets/index.html-BSQ3BWBf.js",
    "revision": "674fa597a783388a5135344027bda546"
  }, {
    "url": "assets/index.html-BSL5joEv.js",
    "revision": "92a1e533e08fdd9183318a25c8fee885"
  }, {
    "url": "assets/index.html-BPhAadm_.js",
    "revision": "02f1670d550d32e5a5411b7d3f320c00"
  }, {
    "url": "assets/index.html-BPU3XzQh.js",
    "revision": "55704da40ab0baf883704ce6cc485437"
  }, {
    "url": "assets/index.html-BKe5V30p.js",
    "revision": "f152b07a66b0daf79511ca164ec07e01"
  }, {
    "url": "assets/index.html-BGDURUUv.js",
    "revision": "269e7f4c5af396358c3680067b4f5e24"
  }, {
    "url": "assets/index.html-BFXJMQPD.js",
    "revision": "d53a18a482ca29a2b7f71558eb7ecb9b"
  }, {
    "url": "assets/index.html-B85k8gCR.js",
    "revision": "040e159b175aa5fc4cffca970d82da9e"
  }, {
    "url": "assets/index.html-B3U0FtF1.js",
    "revision": "1e6cc9bdfcc6433d4f159edc2b781f75"
  }, {
    "url": "assets/index.html-B0r5R4yF.js",
    "revision": "b374442e0edb17ad112bf12c29f6c98d"
  }, {
    "url": "assets/index.html-B0_8LveB.js",
    "revision": "0af78cd89c76e9f049cad20f9fa61ba7"
  }, {
    "url": "assets/index.html-4BhCMeML.js",
    "revision": "8431e28e68fa702af0e57496600fd696"
  }, {
    "url": "assets/index.html-2zK6yYJ8.js",
    "revision": "75a3375a0f026f609bdbc8ad02537240"
  }, {
    "url": "assets/index.html-2D9pGQpo.js",
    "revision": "e725095ee7ce74092ac58233ac224cea"
  }, {
    "url": "assets/index.html-22_hkd4j.js",
    "revision": "516884db4d7e58742a223a1944785f39"
  }, {
    "url": "assets/index-DTEEl-sV.js",
    "revision": "46a193641571106d3b7b43f9bc2a2735"
  }, {
    "url": "assets/how-llm-know-mcp-params.html-B4uIfclQ.js",
    "revision": "440044da437a33ccce5540bc9396b018"
  }, {
    "url": "assets/giscus-BAf4_9qv.js",
    "revision": "6bba63cc83e1b2b20cd115e60344dde7"
  }, {
    "url": "assets/docker-proxy.html-dN3-dCEI.js",
    "revision": "db8cb8f28567cd9ef6b2921ddc2b6246"
  }, {
    "url": "assets/compiler.html-BbyZijzm.js",
    "revision": "c131b3f2bbcebca1a2891895e3208d50"
  }, {
    "url": "assets/code-visualization-intro.html-DRO4EFKM.js",
    "revision": "b4469637c7dc3ab875949b1d38df14dd"
  }, {
    "url": "assets/code-funny.html-BXQp5ZJH.js",
    "revision": "e049be16d5c456f042b76ca21c256ece"
  }, {
    "url": "assets/cg-diff.html-DkNsYsjz.js",
    "revision": "1d6f9b5aa7548953061d4d03f48bb74e"
  }, {
    "url": "assets/auto-lock.html-DjO047xU.js",
    "revision": "424594e316a0c2fedd53880892679246"
  }, {
    "url": "assets/app-BbNiSpxD.js",
    "revision": "59bec7a93f50cf6a74bb4f98a797231d"
  }, {
    "url": "assets/ai-unit-test.html-DrzHtUGH.js",
    "revision": "b46585edf5683bc0979937d375ee06cd"
  }, {
    "url": "assets/ai-search.html-DG6FDC3t.js",
    "revision": "79ecbca7f78b51e41e7c584be428436d"
  }, {
    "url": "assets/ai-hotspot.html-CET9u1rR.js",
    "revision": "b982c4a6d5e0f247d9f3811f5031e64b"
  }, {
    "url": "assets/ai-article-database.html-boiUHISw.js",
    "revision": "bf198addc9dc0f978d1bf697860e18e8"
  }, {
    "url": "assets/ai-agent.html-t0V6nGD2.js",
    "revision": "edff18634ae3db6046cb0cdb61cfc3f7"
  }, {
    "url": "assets/SearchResult-EHXWeYdp.js",
    "revision": "a4041ea66d1746d478f9d67af1e407fc"
  }, {
    "url": "assets/5-years-summarize.html-Cz7JMc3S.js",
    "revision": "38bab53e7270ddceca7dc99bc53e86ca"
  }, {
    "url": "assets/404.html-D1Z-W0hy.js",
    "revision": "b68da4b240c8e2089da000ba25c548e0"
  }, {
    "url": "assets/2026-3-6.html-B48H-1dV.js",
    "revision": "55574036455257bafbecd7daf6b7a93b"
  }, {
    "url": "assets/2026-3-4.html-D4b62xVs.js",
    "revision": "921116e9999fd94cadec239696b3c925"
  }, {
    "url": "assets/2026-3-3.html-tdN7nSnD.js",
    "revision": "6e388f06234533d21a5590b413f3b753"
  }, {
    "url": "assets/2026-3-17.html-DJegg2EH.js",
    "revision": "6d1675a5a5360a960bf3dfd47de2416c"
  }, {
    "url": "assets/2026-3-16.html-DOZB2PJh.js",
    "revision": "88f421717fd14e4963e1ed3ea4b84624"
  }, {
    "url": "assets/2025-end.html-Dc9moFrA.js",
    "revision": "d04abdecddb5bf40aa85717dd652d380"
  }, {
    "url": "assets/2024-end.html-Dvdac1v-.js",
    "revision": "9f220d6366ad0a7bd6e2e33a6ff089bc"
  }, {
    "url": "index.html",
    "revision": "ce9fc506005b237945b929016eb50593"
  }, {
    "url": "404.html",
    "revision": "d5ad7b3f0e9049dda72734d8ee2df361"
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
