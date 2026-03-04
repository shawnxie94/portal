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
    "url": "assets/tcp-fast-open.html-DZyONOin.js",
    "revision": "8a12ff2dbbbd7ffeff804b6b678fbdb8"
  }, {
    "url": "assets/style-D2uQfNRt.css",
    "revision": "5e837e72af909281cc7858a331d86bb6"
  }, {
    "url": "assets/regex-vis.html-BurGgYLY.js",
    "revision": "fe4fa6a2ecc77e1de069726178b4da38"
  }, {
    "url": "assets/read-flow.html-Bvp3XuWo.js",
    "revision": "88209aa5648888b507f98e9b89d9e93f"
  }, {
    "url": "assets/read-code-tools.html-B-tkS5DP.js",
    "revision": "7bea1b045ef76f43a221919e988b0b04"
  }, {
    "url": "assets/plugin-vue_export-helper-DlAUqK2U.js",
    "revision": "25e3a5dcaf00fb2b1ba0c8ecea6d2560"
  }, {
    "url": "assets/picture-manage.html-C-xTXWLS.js",
    "revision": "11cab98bcc3e7860cfa3d44c39c5543a"
  }, {
    "url": "assets/photoswipe.esm-BXDdABy_.js",
    "revision": "6c0bf54cf1322dab242c5bb14307d57a"
  }, {
    "url": "assets/one-cmd-web-to-app.html-cFet9IUx.js",
    "revision": "73ca073e86399d3dda06417c13da18c6"
  }, {
    "url": "assets/mac-terminal.html-DXara1cz.js",
    "revision": "e3e0ec48b67c8fc2cc5a420c9d9311d1"
  }, {
    "url": "assets/kimi.html-CbTSrBJ4.js",
    "revision": "c555f67324bbc3c25aae773979b3fc3a"
  }, {
    "url": "assets/ip-exploration.html-Be3YNSvy.js",
    "revision": "f70f4c0d42255a90377bdc2a2cefaefe"
  }, {
    "url": "assets/index.html-gcPCQJkU.js",
    "revision": "30bab90858264dfcdabedd25cbc1dd66"
  }, {
    "url": "assets/index.html-apKB-8pe.js",
    "revision": "8ac044bad727ff4c48a5c3a824f6d43e"
  }, {
    "url": "assets/index.html-ZXtM7Scq.js",
    "revision": "2c5244b061fb82204eed4cc30ced8194"
  }, {
    "url": "assets/index.html-Yrsl8VqS.js",
    "revision": "a6ed861bad61da4be146cff75a931f6c"
  }, {
    "url": "assets/index.html-PcHR2TDv.js",
    "revision": "7391cedef0bcdf2d76e65dc45cc1f8f1"
  }, {
    "url": "assets/index.html-OWn4rYEo.js",
    "revision": "20d86305c9d310c5ba59aa5d31123dc8"
  }, {
    "url": "assets/index.html-OH45B4mo.js",
    "revision": "74b2161a58ad5e672da2161859e27541"
  }, {
    "url": "assets/index.html-IG-ZQl8p.js",
    "revision": "a14278d42796abc2aae34fd0426a1065"
  }, {
    "url": "assets/index.html-Hzx9-ZK0.js",
    "revision": "31ce742bf58e051511358266e14ccaf7"
  }, {
    "url": "assets/index.html-EqGTULQw.js",
    "revision": "8ac1604fb09ef95c76f82880069a1834"
  }, {
    "url": "assets/index.html-DzkUxHBW.js",
    "revision": "8871beb375c86daf57e6912e00f214f7"
  }, {
    "url": "assets/index.html-DygcCUMo.js",
    "revision": "9a92ec7dad665f0a7f542af4d8a6ce8d"
  }, {
    "url": "assets/index.html-Dq0Hsw1j.js",
    "revision": "9511473d378160b28a1c1ecd471eb65b"
  }, {
    "url": "assets/index.html-DhnMzdGf.js",
    "revision": "19b6b1b5d8582cbb0f470b74e4324d0a"
  }, {
    "url": "assets/index.html-DOFh-Mpr.js",
    "revision": "ef3c7da528d0d30b91ed609a712cb44a"
  }, {
    "url": "assets/index.html-DLNnmGz4.js",
    "revision": "e6145eb9452bb64621993f05744efbdb"
  }, {
    "url": "assets/index.html-DIBh2rId.js",
    "revision": "5ebe4bd2a70086b6930a965eecb0b317"
  }, {
    "url": "assets/index.html-DFluZPbG.js",
    "revision": "d0a56b755152a4fe472d320835dace9d"
  }, {
    "url": "assets/index.html-DDTTdUU9.js",
    "revision": "64aefc7244f64fd9cfcb43f74e603e23"
  }, {
    "url": "assets/index.html-DBmcQEbK.js",
    "revision": "9cca012ceb6bac42bd8cd497b4adb7a3"
  }, {
    "url": "assets/index.html-D6Xhvwv5.js",
    "revision": "a5d28a0cacd6800a704cfe4d83dd90bf"
  }, {
    "url": "assets/index.html-D4G5DwWR.js",
    "revision": "10b3f15f7ef33f3626e604561ab5677f"
  }, {
    "url": "assets/index.html-D1G94mjp.js",
    "revision": "920117ac7b4d30b435e3f46761f0f5c7"
  }, {
    "url": "assets/index.html-Cz3SvVo5.js",
    "revision": "2bf934a849502547a2e4c6cf020cc555"
  }, {
    "url": "assets/index.html-CvXimEFj.js",
    "revision": "fef0684077162636f2bc1e42d93f0ef6"
  }, {
    "url": "assets/index.html-CikqfQZl.js",
    "revision": "80c30875eace6a4da90688748a6e9ed8"
  }, {
    "url": "assets/index.html-Cggf5WCo.js",
    "revision": "03b06d12e51cd73decc6ee51ff0cd0fa"
  }, {
    "url": "assets/index.html-Cg4an8lm.js",
    "revision": "e65b8ecd21c76e337e64b562e9484904"
  }, {
    "url": "assets/index.html-Cexw5vR7.js",
    "revision": "84e4d9e51837fa0b537cf588d05c1c68"
  }, {
    "url": "assets/index.html-Ca2cklqT.js",
    "revision": "9cf6fbfb8de83e3afea0cf68e3df44c7"
  }, {
    "url": "assets/index.html-CYmOEcQ3.js",
    "revision": "90aca0374c30e832f61aa1625ebcae00"
  }, {
    "url": "assets/index.html-CUK4KC8o.js",
    "revision": "626c2b4fd9b73c07a48b66ce14048a1f"
  }, {
    "url": "assets/index.html-CTpT4ySE.js",
    "revision": "bbcaabeef06ae2ffa17d638e1e8d1ccc"
  }, {
    "url": "assets/index.html-CRO-fNk_.js",
    "revision": "f86c4c047a1f4b8e729b8458d78f5ee6"
  }, {
    "url": "assets/index.html-CQCoAjUe.js",
    "revision": "0e50c6e9d5a7b65d145405a8893cb983"
  }, {
    "url": "assets/index.html-CG6BpdTE.js",
    "revision": "813f5c76da87da0aea5ca3d3463c3abc"
  }, {
    "url": "assets/index.html-CFRw9KJy.js",
    "revision": "d71413c25cfdaac49fa435940525eaf7"
  }, {
    "url": "assets/index.html-CFHp1q14.js",
    "revision": "26e80a710911c163fd10d206f90c045d"
  }, {
    "url": "assets/index.html-CB9z4yTQ.js",
    "revision": "332eb1486ced245ca4c5018d95aace40"
  }, {
    "url": "assets/index.html-CAbE9mP8.js",
    "revision": "ddc7cf1126b929a730c22d0bb7b86c82"
  }, {
    "url": "assets/index.html-C7ajiDD2.js",
    "revision": "1bcd79df528c97efd83ae782b6ff990c"
  }, {
    "url": "assets/index.html-C6sadhm_.js",
    "revision": "c57230a12ab764bb9c5bdad5505ed5ce"
  }, {
    "url": "assets/index.html-C0oL_a5O.js",
    "revision": "f62c3a65db3741cb890b8f77dcd1908a"
  }, {
    "url": "assets/index.html-C0B69vsm.js",
    "revision": "4fe8d88c16f5eed89ad544de8fb2c0e1"
  }, {
    "url": "assets/index.html-BzdUPVW8.js",
    "revision": "0575c34236dcb98eff242f7eb476e53b"
  }, {
    "url": "assets/index.html-BzHCYpRU.js",
    "revision": "16051951de123f0a26ac7e7f2836a459"
  }, {
    "url": "assets/index.html-By7mpSYM.js",
    "revision": "e18fdd6c68dda6aa167c9436602fc8e9"
  }, {
    "url": "assets/index.html-BxW6SCyl.js",
    "revision": "32b1900f02a778e00087a545919a65ae"
  }, {
    "url": "assets/index.html-BoKqpzhk.js",
    "revision": "6085021aa93c7d4c256db1da9a0a1311"
  }, {
    "url": "assets/index.html-BlaoEEe3.js",
    "revision": "cfc422232caf05117ef8ed28503e2d6b"
  }, {
    "url": "assets/index.html-Bhj09Stu.js",
    "revision": "cbc54de741f8a451933edf682236cfbc"
  }, {
    "url": "assets/index.html-BZc5lKVl.js",
    "revision": "741f08d0478045d754d33f89babaeb08"
  }, {
    "url": "assets/index.html-BX9UP3hS.js",
    "revision": "f7990d3150b19ee893f59dbe7f677f4e"
  }, {
    "url": "assets/index.html-BW5Jfosj.js",
    "revision": "3856d62622d12d6c86eb4da298c502b8"
  }, {
    "url": "assets/index.html-BV_FFblt.js",
    "revision": "56d20bd69c57cc69dc89d95417686b53"
  }, {
    "url": "assets/index.html-BV04Co3u.js",
    "revision": "c54f28e4c8d32616c2fc07acda252c72"
  }, {
    "url": "assets/index.html-BUXqQzg9.js",
    "revision": "456fc84141bcd8740ef3f138c57ccf5c"
  }, {
    "url": "assets/index.html-BDuxs1K5.js",
    "revision": "64fde33480978d2c3acbfe566f8abdec"
  }, {
    "url": "assets/index.html-BD4evFEZ.js",
    "revision": "52bf33b4a07088d32dc6e2b82e83b8ff"
  }, {
    "url": "assets/index.html-BA7ODI9H.js",
    "revision": "ddde31aa6f2441fd7cbc83158c6e337c"
  }, {
    "url": "assets/index.html-B8jEiCQM.js",
    "revision": "09d453c802a3086d71830512ddb30a65"
  }, {
    "url": "assets/index.html-B-ilezIG.js",
    "revision": "b6f57e9a0de8cd3a38dfbf41881ea8dd"
  }, {
    "url": "assets/index-DTEEl-sV.js",
    "revision": "46a193641571106d3b7b43f9bc2a2735"
  }, {
    "url": "assets/how-llm-know-mcp-params.html-DGwYUZUJ.js",
    "revision": "daa6d73ebe1cc9e3bda19251f099a4fb"
  }, {
    "url": "assets/giscus-BAf4_9qv.js",
    "revision": "6bba63cc83e1b2b20cd115e60344dde7"
  }, {
    "url": "assets/docker-proxy.html-DzgQ6iLf.js",
    "revision": "503786add44ba1ef563dda64157fdf9f"
  }, {
    "url": "assets/compiler.html-BYHCvg4v.js",
    "revision": "487d708ef7cd17cc0e367880ea1e99bb"
  }, {
    "url": "assets/code-visualization-intro.html-FTOoCnzR.js",
    "revision": "6e27c519b2932f6fefcf248968f917c8"
  }, {
    "url": "assets/code-funny.html-CmIxlopJ.js",
    "revision": "b9bdfa3b583ea483d93fa32ddfd15cc5"
  }, {
    "url": "assets/cg-diff.html-DGUuyrqP.js",
    "revision": "6562c1fd30f59d3e7f0662261e769aa0"
  }, {
    "url": "assets/auto-lock.html-BchixMo6.js",
    "revision": "40879dc475b4ef2999acea2a3a796655"
  }, {
    "url": "assets/app-SRWEcElg.js",
    "revision": "fafd776bf0570a325a8463e34c88626c"
  }, {
    "url": "assets/ai-unit-test.html-DFZHmDBI.js",
    "revision": "168574bfd57a28ac668e47531aad5353"
  }, {
    "url": "assets/ai-search.html-BSLMkWZM.js",
    "revision": "16b5504fedafd1fc1241bb3f15068b32"
  }, {
    "url": "assets/ai-hotspot.html-BJfcnGli.js",
    "revision": "e109eda845409bf0f2c249cd6e284880"
  }, {
    "url": "assets/ai-article-database.html-BOcjcvuZ.js",
    "revision": "8136abaefc276d1ed725ffc09231da6f"
  }, {
    "url": "assets/ai-agent.html-D0wKHovq.js",
    "revision": "7ec1afa84553f58a7ebd53768dff698a"
  }, {
    "url": "assets/SearchResult-0khvw72n.js",
    "revision": "0353819eebd32acfe34917e8ccd74f84"
  }, {
    "url": "assets/5-years-summarize.html-BwCyFru6.js",
    "revision": "7794646ff2766b7b1f8c96f50471149b"
  }, {
    "url": "assets/404.html-B06dKlgi.js",
    "revision": "3b2c3ad13c1905bed92a481c077bd7fc"
  }, {
    "url": "assets/2026-3-4.html-DtqOium0.js",
    "revision": "aa9f2c9a6d0a25ae9839533ba81979e2"
  }, {
    "url": "assets/2026-3-3.html-BV96Hhpo.js",
    "revision": "ccfc29bbd0e5b28717e49e201c5ddf9f"
  }, {
    "url": "assets/2025-end.html-CZAV5ER7.js",
    "revision": "39aeadd2e8f30981b5b325792dc27a4c"
  }, {
    "url": "assets/2024-end.html-CT7aWGQn.js",
    "revision": "c3bdc5698b273e4b04c528b6dd2f87a1"
  }, {
    "url": "index.html",
    "revision": "42e246e4d537dfed52e2dfe76cef901b"
  }, {
    "url": "404.html",
    "revision": "3f00b199da981a5ab1bd290a0c98e217"
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
