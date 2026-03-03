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
    "url": "assets/tcp-fast-open.html-Sut49NJJ.js",
    "revision": "35dedab628f23c598e7c0b23723d49ab"
  }, {
    "url": "assets/style-D2uQfNRt.css",
    "revision": "5e837e72af909281cc7858a331d86bb6"
  }, {
    "url": "assets/regex-vis.html-CJx7Jb0V.js",
    "revision": "2caa3f2fa7b68a2cb5ae34f8c127de7a"
  }, {
    "url": "assets/read-flow.html-CreI5uCS.js",
    "revision": "6f47b64ae30265b4f9b8e92c4d178739"
  }, {
    "url": "assets/read-code-tools.html-DJxejfKP.js",
    "revision": "0285db29a5037e3e2f6f4b6123226cf4"
  }, {
    "url": "assets/plugin-vue_export-helper-DlAUqK2U.js",
    "revision": "25e3a5dcaf00fb2b1ba0c8ecea6d2560"
  }, {
    "url": "assets/picture-manage.html-BzhirtKG.js",
    "revision": "1c5e8ff33526e927a603ed2ebc72f72b"
  }, {
    "url": "assets/photoswipe.esm-BXDdABy_.js",
    "revision": "6c0bf54cf1322dab242c5bb14307d57a"
  }, {
    "url": "assets/one-cmd-web-to-app.html-D6q4IKwc.js",
    "revision": "21505cf6947df0ebed74f249d98e549e"
  }, {
    "url": "assets/mac-terminal.html-B45BrOo5.js",
    "revision": "b46fb2182141af8ad13e44962e35f824"
  }, {
    "url": "assets/kimi.html-BbHCypJM.js",
    "revision": "99e0104112479044c1e3d293949c907d"
  }, {
    "url": "assets/ip-exploration.html-B7YLhGz6.js",
    "revision": "7a3f2331687f8cde42604f4b0f7864cd"
  }, {
    "url": "assets/index.html-yZgrchnJ.js",
    "revision": "2c1ab200d0db97507a831cc6a9898dab"
  }, {
    "url": "assets/index.html-yEKOqiR_.js",
    "revision": "f31e9bbfa246921802ffa100ec02beab"
  }, {
    "url": "assets/index.html-qOvqJmgy.js",
    "revision": "4e80056a01be6bd3e1192d8a56dd7eef"
  }, {
    "url": "assets/index.html-q7848S8y.js",
    "revision": "5185e277b29234848ebdfa7660d6fec7"
  }, {
    "url": "assets/index.html-mUj7l_Ut.js",
    "revision": "68b2feb8d8bc81013be26d93577779cf"
  }, {
    "url": "assets/index.html-gG_tmxv2.js",
    "revision": "528d7abbc0d1be128d9ab7e9e22f11d1"
  }, {
    "url": "assets/index.html-_vVETl9t.js",
    "revision": "379188f2dcad4992978d4784ad84afb1"
  }, {
    "url": "assets/index.html-YIOvEU0r.js",
    "revision": "efa3e8640372233324c6c45ef7da4898"
  }, {
    "url": "assets/index.html-XyKDyLKs.js",
    "revision": "59e03a98b7bf2de32f29e6dfc94a8327"
  }, {
    "url": "assets/index.html-Wi43p0G6.js",
    "revision": "020d7e98506f6f805ab1cddd8794f3c4"
  }, {
    "url": "assets/index.html-LR4L5iak.js",
    "revision": "1c8ef1dcde3973a92bee1d81bf01a792"
  }, {
    "url": "assets/index.html-ILbm5pPw.js",
    "revision": "cc8d0822abc2060cec134f870d0511c0"
  }, {
    "url": "assets/index.html-DvKrIZ8E.js",
    "revision": "407bbcc0b585e2ca257a2cbfa72c47c1"
  }, {
    "url": "assets/index.html-DtyEpZzd.js",
    "revision": "fc78fee14d53f1da55d538bb45936237"
  }, {
    "url": "assets/index.html-DnJHprWB.js",
    "revision": "6c40816163d7b3c77fcaf591d779f6b2"
  }, {
    "url": "assets/index.html-DmjWfwx2.js",
    "revision": "47f303c05a355b4b12cd589a641ab5b2"
  }, {
    "url": "assets/index.html-DjTq_cTq.js",
    "revision": "4e7edb590655089e07e58adfbe38a6ec"
  }, {
    "url": "assets/index.html-DeYWnyEo.js",
    "revision": "d209af6d27110ac4bdd021237fe5c941"
  }, {
    "url": "assets/index.html-Da9O1eO_.js",
    "revision": "23b1f9fdd702bbcd43ac08791c5d09de"
  }, {
    "url": "assets/index.html-D_-ODlRA.js",
    "revision": "b6ad59b139a1cc44743ae8126f623900"
  }, {
    "url": "assets/index.html-DRoQELAX.js",
    "revision": "4d1787ae51932ad03b2e0354f5a02271"
  }, {
    "url": "assets/index.html-DQgaJ8AQ.js",
    "revision": "592fc22987959dee09835a18c1c1d583"
  }, {
    "url": "assets/index.html-DPYSNeLl.js",
    "revision": "e6c1f1069732e740c28b891f8985193d"
  }, {
    "url": "assets/index.html-DMwfEmyk.js",
    "revision": "0ea1ac23fa5d0db0c59c21a98cc1f7d4"
  }, {
    "url": "assets/index.html-DDhzjTb_.js",
    "revision": "69638de921d9bcb4b4f9c3ac482674f3"
  }, {
    "url": "assets/index.html-DD-aQTXl.js",
    "revision": "fcffe95ad72754df03ec94d2f51ec03c"
  }, {
    "url": "assets/index.html-D9CnUUoj.js",
    "revision": "4e9ab5d823d2034933c76b591d7cdf36"
  }, {
    "url": "assets/index.html-CsQxrgTB.js",
    "revision": "eb2c66fb57bc45f4357953c857d58d86"
  }, {
    "url": "assets/index.html-CoPrXrSm.js",
    "revision": "654e565e8e919f0d4f7787f2163be32e"
  }, {
    "url": "assets/index.html-ClW4bnGr.js",
    "revision": "fe7b90da19d5a1ee311022b8a8f81cc5"
  }, {
    "url": "assets/index.html-Ckg9oWj-.js",
    "revision": "a9abfbca63b26a4a4b4c2e3e5110e6fb"
  }, {
    "url": "assets/index.html-Cea9KzGX.js",
    "revision": "3589562daf20a5ecc3bbac778aa44ac0"
  }, {
    "url": "assets/index.html-Cd3-6qXl.js",
    "revision": "bce5f58a5d6c2379495dd45bdbde0d34"
  }, {
    "url": "assets/index.html-C_BMZYKf.js",
    "revision": "c8ab62dc9e8ec01baf5feae893c99ad2"
  }, {
    "url": "assets/index.html-CYGmTHUY.js",
    "revision": "ffc092b281ec45b452ebffc90bb82460"
  }, {
    "url": "assets/index.html-CT_bXB_H.js",
    "revision": "ba4492658d35adf02cd1824d9d92a999"
  }, {
    "url": "assets/index.html-CS7SEvQk.js",
    "revision": "2ddd05c20f7b4a572580fc40589e3dd4"
  }, {
    "url": "assets/index.html-CQIo0jB3.js",
    "revision": "ef1ebc890d22034f8d8e432103000296"
  }, {
    "url": "assets/index.html-COoJRK_R.js",
    "revision": "581c2baddb44949deab1f8dbd7c9a3aa"
  }, {
    "url": "assets/index.html-CM4zwu7u.js",
    "revision": "d7455df5d9a6e6492cde04169c95cb8a"
  }, {
    "url": "assets/index.html-CL0j00ua.js",
    "revision": "935a2c581a79c801f39702f98d8826bb"
  }, {
    "url": "assets/index.html-CHG4SQjj.js",
    "revision": "a1ad8457185add29ef8f62bb32fb8157"
  }, {
    "url": "assets/index.html-CDnTVnKc.js",
    "revision": "4d943420d327aeb40afcf41d2bcae043"
  }, {
    "url": "assets/index.html-Bvlys-7B.js",
    "revision": "6623ae7e15b1bf7340ad1d6ddafe9f8d"
  }, {
    "url": "assets/index.html-BvToXJrx.js",
    "revision": "229e7d4756d00658dda0258603bc2f32"
  }, {
    "url": "assets/index.html-Bs8oiiS5.js",
    "revision": "b794d25d7e628e2c1ab883768f4080ef"
  }, {
    "url": "assets/index.html-BrMoq_rh.js",
    "revision": "23f5091f3ae83fa3b6b5df451ef03317"
  }, {
    "url": "assets/index.html-Bp3LzIzN.js",
    "revision": "152aa5e48f4cd62718c05daf8f3b89e6"
  }, {
    "url": "assets/index.html-BbKh8bmj.js",
    "revision": "359c2f5ce751defd35284d75432a5c1f"
  }, {
    "url": "assets/index.html-BW4zHe9m.js",
    "revision": "9b32c6286069153afced39db008fbbe8"
  }, {
    "url": "assets/index.html-BTCf2PcE.js",
    "revision": "f30f747131537c50ada5c5f41670d385"
  }, {
    "url": "assets/index.html-BO8dQ9jX.js",
    "revision": "a888d043d9136bd5a930cab8104d8122"
  }, {
    "url": "assets/index.html-BO1ANKrD.js",
    "revision": "af54f29c52abefafdae9c5400d3a7cc5"
  }, {
    "url": "assets/index.html-BBJ1eo2S.js",
    "revision": "9aeb06617fe88dfa37d317837d08d308"
  }, {
    "url": "assets/index.html-B8qTfKa5.js",
    "revision": "1b4d2309579fa483cd1e7ab105ad2e13"
  }, {
    "url": "assets/index.html-B8QNjV63.js",
    "revision": "fc25fa951c6e0eb34b8bf89ae83d0dc2"
  }, {
    "url": "assets/index.html-B16iFEpY.js",
    "revision": "af0412c53f894859f2d5b5eefbb20574"
  }, {
    "url": "assets/index.html-9urj0wdV.js",
    "revision": "1ed34e874c96a226a5e70f4ddb6c7781"
  }, {
    "url": "assets/index.html-6Pdif_tX.js",
    "revision": "247305554250dcfc16ce2784789bdbd9"
  }, {
    "url": "assets/index.html-1mnfTr4Y.js",
    "revision": "8237c4831950d394c7bbb46f613f7fe7"
  }, {
    "url": "assets/index-DTEEl-sV.js",
    "revision": "46a193641571106d3b7b43f9bc2a2735"
  }, {
    "url": "assets/how-llm-know-mcp-params.html-CmtI2qXG.js",
    "revision": "712380fda5aff8c4b2777f3a1f2cc73c"
  }, {
    "url": "assets/giscus-BAf4_9qv.js",
    "revision": "6bba63cc83e1b2b20cd115e60344dde7"
  }, {
    "url": "assets/docker-proxy.html-u7nzOh9r.js",
    "revision": "f2873392b9dda985ddd14d30821d0f90"
  }, {
    "url": "assets/compiler.html-DxYHsCVM.js",
    "revision": "1d68ac9bfdcfcbf20b65e74706f47c27"
  }, {
    "url": "assets/code-visualization-intro.html-CPv_W0qL.js",
    "revision": "cebc5fb87d16dbe2ce24cd96f57b37f8"
  }, {
    "url": "assets/code-funny.html-BHmdgfc1.js",
    "revision": "66c7fa063c93033cd69611b23158e19a"
  }, {
    "url": "assets/cg-diff.html-DJDSN2WW.js",
    "revision": "c4400027b702432dd42d629bb0ea0721"
  }, {
    "url": "assets/auto-lock.html-DLUnfxg4.js",
    "revision": "51fcc0d24c7c2335cb2f7474272d2773"
  }, {
    "url": "assets/app-B6hoQzae.js",
    "revision": "e24b3062169d8182e89ed4a191b74ed9"
  }, {
    "url": "assets/ai-unit-test.html-VqO233cj.js",
    "revision": "f40f7a5adbd830c8563acc8d7e3dd7af"
  }, {
    "url": "assets/ai-search.html-DAERlWSV.js",
    "revision": "e7d243a8fbb438c2911eacb5a73f3863"
  }, {
    "url": "assets/ai-hotspot.html-DmrmVQ4v.js",
    "revision": "46b6acf8c64a7d5d7f6282f8cac8e39f"
  }, {
    "url": "assets/ai-article-database.html-DJKmwo1l.js",
    "revision": "7d17404adc07292c1b4823297e1174fe"
  }, {
    "url": "assets/ai-agent.html-DYAxlJQt.js",
    "revision": "adbf59de1711e7ee0cbe2eebe1d12c64"
  }, {
    "url": "assets/SearchResult-Dra9mzZy.js",
    "revision": "a86bb413871698ad3aa72ac6c62e5cd4"
  }, {
    "url": "assets/5-years-summarize.html-DX9XB_Y4.js",
    "revision": "3cf19a3b9878e3ccd5f29b7224208fff"
  }, {
    "url": "assets/404.html-mNcxjdGn.js",
    "revision": "6990c4de7a0c1dd082401a682c7b104c"
  }, {
    "url": "assets/2026-3-3.html-BsQtcjE1.js",
    "revision": "4c58cebc202cb85e24e174baae3f56e8"
  }, {
    "url": "assets/2025-end.html-s-JJpdis.js",
    "revision": "8f2b9d6161e0facb007ff2800c655eed"
  }, {
    "url": "assets/2024-end.html-BfdPY4vG.js",
    "revision": "88b78689b84fe4449179fbb1fc8a6521"
  }, {
    "url": "index.html",
    "revision": "dcf7d41c083fe4c1ee3fd511810c59ad"
  }, {
    "url": "404.html",
    "revision": "963144a1d82b783b003ca99d14db81fc"
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
