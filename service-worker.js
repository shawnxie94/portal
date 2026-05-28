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
    "url": "assets/tcp-fast-open.html-BH1dV99b.js",
    "revision": "afa6c335fb8d1011cfdb06b9cdb04c8c"
  }, {
    "url": "assets/style-D2uQfNRt.css",
    "revision": "5e837e72af909281cc7858a331d86bb6"
  }, {
    "url": "assets/regex-vis.html-DUEUje8z.js",
    "revision": "2f14f5a355994566290f46dbebf0650f"
  }, {
    "url": "assets/read-flow.html-14CKcDRY.js",
    "revision": "5a641d024109b1e8114dc5f7a1c5a1ec"
  }, {
    "url": "assets/read-flow-2026.html-Q7HXH6g0.js",
    "revision": "a96603b53eb4e324cb83a4ef1f8bf36c"
  }, {
    "url": "assets/read-code-tools.html-CJMgCexj.js",
    "revision": "a3f190bda14d1d6dd2ea942710fd1bbb"
  }, {
    "url": "assets/plugin-vue_export-helper-DlAUqK2U.js",
    "revision": "25e3a5dcaf00fb2b1ba0c8ecea6d2560"
  }, {
    "url": "assets/picture-manage.html-D4Cos7_P.js",
    "revision": "1c993dcd1134aec036462316fa498905"
  }, {
    "url": "assets/photoswipe.esm-BXDdABy_.js",
    "revision": "6c0bf54cf1322dab242c5bb14307d57a"
  }, {
    "url": "assets/one-cmd-web-to-app.html-CxQD7qW9.js",
    "revision": "d4b8c3462aba7f3517bb5d1f32f63f64"
  }, {
    "url": "assets/mac-terminal.html-CLM8twoB.js",
    "revision": "d55aff09884971ab424d3d75c7a746f5"
  }, {
    "url": "assets/lumina.html-CWgcaAeY.js",
    "revision": "c1e50357ad357f4e1f02f6ff94820280"
  }, {
    "url": "assets/kimi.html-4sqbl-PL.js",
    "revision": "1964eed264b7d29b2b02486c78789139"
  }, {
    "url": "assets/ip-exploration.html-DsqOAC3f.js",
    "revision": "68e47380f3c410d0a75b89c8fe909ab3"
  }, {
    "url": "assets/infinitum.html-Em_d5UCD.js",
    "revision": "2a7c3352129fe45f90f21ded5a6dc896"
  }, {
    "url": "assets/index.html-skcfnjz8.js",
    "revision": "f2d9d220c06b4c8f4d304f53225a3839"
  }, {
    "url": "assets/index.html-iRujmoiU.js",
    "revision": "622a11a45c02b946e25fb20c72d40988"
  }, {
    "url": "assets/index.html-hgyP2UXO.js",
    "revision": "860677bdb68de074f8327374467a5061"
  }, {
    "url": "assets/index.html-gKceo1mN.js",
    "revision": "dffa8e72795fedde78c3479dfe0156e3"
  }, {
    "url": "assets/index.html-gD0f5bi7.js",
    "revision": "1d9a2af4bd7e80795554a941f2181f1d"
  }, {
    "url": "assets/index.html-YLxHvID5.js",
    "revision": "2f5c4d2ef853e4cd5536b7d67552c48f"
  }, {
    "url": "assets/index.html-T1rsXEy1.js",
    "revision": "fecce669d89bb4e2362cf0594d5be16c"
  }, {
    "url": "assets/index.html-S4NbItDh.js",
    "revision": "1be29b3beedf90b596215eaa165da635"
  }, {
    "url": "assets/index.html-K1GTVg2R.js",
    "revision": "e1b2a562c7cea381dd37b0dbe9de083c"
  }, {
    "url": "assets/index.html-I9yQULJk.js",
    "revision": "b70ca390056b4a2764272970df52b69e"
  }, {
    "url": "assets/index.html-DxEJzKXh.js",
    "revision": "286233d957dbb87a253712734a9fcbce"
  }, {
    "url": "assets/index.html-DufCnAUY.js",
    "revision": "d2a693ec97f20cba3dcca1cf0376e7ef"
  }, {
    "url": "assets/index.html-DnESWGXb.js",
    "revision": "d4fbd6c7cf4e607432ba69b16c784d44"
  }, {
    "url": "assets/index.html-Dmn5iDzq.js",
    "revision": "a0b251512902bd18439fc251e59e4c32"
  }, {
    "url": "assets/index.html-DleKOpMr.js",
    "revision": "b93abae20ff49b3a6b1e72d3d030c03e"
  }, {
    "url": "assets/index.html-DiYXvG08.js",
    "revision": "15963bbc6406145f7df0955f39c0e2cc"
  }, {
    "url": "assets/index.html-DcqskpzP.js",
    "revision": "801d35aadab1eecead3f080638a5a5de"
  }, {
    "url": "assets/index.html-Db33SFWF.js",
    "revision": "09affd0a16b10b774cf64651ecaedc02"
  }, {
    "url": "assets/index.html-DaVOtWq6.js",
    "revision": "8063f943764d34ae7029260d1f0473f1"
  }, {
    "url": "assets/index.html-DWtHJ27Y.js",
    "revision": "c764de13f3bc2a92eb3d4ee858993dee"
  }, {
    "url": "assets/index.html-DSd8BC-V.js",
    "revision": "64102e17639970415b2c20401e1f24dc"
  }, {
    "url": "assets/index.html-DR9Wd7k9.js",
    "revision": "45ba0df5497d2ad163761bf3e9d97dd2"
  }, {
    "url": "assets/index.html-DJOaPh1K.js",
    "revision": "bade6a9b943dbbdb15273e1f3b70e5f3"
  }, {
    "url": "assets/index.html-DF5pCS0d.js",
    "revision": "da932859ac2574933894054082b87e50"
  }, {
    "url": "assets/index.html-DDPGlKSh.js",
    "revision": "b3a75cb58989198238e7f7effccf5110"
  }, {
    "url": "assets/index.html-DCx-z7FN.js",
    "revision": "ed925ce2d9ca1f89a09fc8250170cd4d"
  }, {
    "url": "assets/index.html-D0KrqXCZ.js",
    "revision": "09e20cde4100563a40526914322b2b8b"
  }, {
    "url": "assets/index.html-CxfqhzAk.js",
    "revision": "79f1942a0da02ac4ae08e20cf233b455"
  }, {
    "url": "assets/index.html-Cv-z06d2.js",
    "revision": "c03728732cf376e4a0d1c77d3f22d7f1"
  }, {
    "url": "assets/index.html-Cu5xi8U8.js",
    "revision": "2f75c70c5497c76c96441791fd301d03"
  }, {
    "url": "assets/index.html-CqpCz8VV.js",
    "revision": "ff16453e1a8150cba76ca7e29c4a3060"
  }, {
    "url": "assets/index.html-CiZH-qXm.js",
    "revision": "3fbf35c533864c7d51812814da129156"
  }, {
    "url": "assets/index.html-CUQv3wP7.js",
    "revision": "5a6ee584d033f638718490528d584f51"
  }, {
    "url": "assets/index.html-CRWoUhDK.js",
    "revision": "9b2df9e65432c6c22b9cc73f6fd9ea36"
  }, {
    "url": "assets/index.html-CNN2Ygly.js",
    "revision": "1521c60fef21ca327c561ca62c892108"
  }, {
    "url": "assets/index.html-CM4zq4KK.js",
    "revision": "07c11833276772241b8a8e9a492c0a49"
  }, {
    "url": "assets/index.html-CFqn6gAQ.js",
    "revision": "4f7d822d2d49a9b6be29b542d020a4c5"
  }, {
    "url": "assets/index.html-CDg8kHs-.js",
    "revision": "221025e6999bf6e6e1ee1820412449c1"
  }, {
    "url": "assets/index.html-CBbF3m2G.js",
    "revision": "e86270e4d958b2a8f9ae190372ac2b75"
  }, {
    "url": "assets/index.html-CAmn1ZeU.js",
    "revision": "370c6901f6f1d7fdf5e217513e448d72"
  }, {
    "url": "assets/index.html-C8BLMGYI.js",
    "revision": "4a4b9479f52a8026c66a307e876ddaa5"
  }, {
    "url": "assets/index.html-C0yyU8DN.js",
    "revision": "f9c8ba704cdfad40adaf79fd60e0abe3"
  }, {
    "url": "assets/index.html-C-Uu2ZVn.js",
    "revision": "2f024b54f03b23b421201ddc4f9038d7"
  }, {
    "url": "assets/index.html-ByWg8jjp.js",
    "revision": "e05487d887c8d623829555dcd98c14f8"
  }, {
    "url": "assets/index.html-Bwlzrlxh.js",
    "revision": "f66ddc653ebd887e9db8e1944f0e03a8"
  }, {
    "url": "assets/index.html-Bwe8efIv.js",
    "revision": "97576df46817e244ddf274c3cfab372c"
  }, {
    "url": "assets/index.html-BwOTG9fW.js",
    "revision": "7d4bc532a91fd5720d22aaa2b117af8c"
  }, {
    "url": "assets/index.html-BuwKWI9V.js",
    "revision": "68722e5692a31b1abcc29684a33b4716"
  }, {
    "url": "assets/index.html-Bqjzq_yt.js",
    "revision": "2d990f47f241855fcd3135bef802dca4"
  }, {
    "url": "assets/index.html-BcW8gDP0.js",
    "revision": "066eb3213068b1da98c27e21c1f4c97c"
  }, {
    "url": "assets/index.html-BWJiHe8j.js",
    "revision": "6d8c8eee77bbef2497b9da683d9313ad"
  }, {
    "url": "assets/index.html-BEqMv32g.js",
    "revision": "cf5f96fe54e06079f8ad696baae5629a"
  }, {
    "url": "assets/index.html-BAVe37WA.js",
    "revision": "9d142775fc78a44fc0dc59ad9de588cc"
  }, {
    "url": "assets/index.html-B8X1NjWL.js",
    "revision": "a521341f7964f42802f053aac6263f6b"
  }, {
    "url": "assets/index.html-B6VkXwgA.js",
    "revision": "1dfbbd01461e34f255eb55626f4d5c60"
  }, {
    "url": "assets/index.html-B2lKuWli.js",
    "revision": "f3bceb2431f27be226e621c7b0dbf8dd"
  }, {
    "url": "assets/index.html-B0cdu93I.js",
    "revision": "af6223540ecba642972912e3174f92d6"
  }, {
    "url": "assets/index.html-B0GFcrfk.js",
    "revision": "981cdd373e071992e77ea04f1bf3f393"
  }, {
    "url": "assets/index.html-9izykjPD.js",
    "revision": "c47cf8f2aeb61eb563941bb4b33d38bf"
  }, {
    "url": "assets/index.html-8wcrQs2Q.js",
    "revision": "6d566866988070e058fdb235a1b87206"
  }, {
    "url": "assets/index.html-7fz9QxS4.js",
    "revision": "e8ab74915a5a903c5035811ceafd4451"
  }, {
    "url": "assets/index.html-7Btu8WHo.js",
    "revision": "3b2aabe9ba4957e1c48d3493a1ad0cde"
  }, {
    "url": "assets/index-DTEEl-sV.js",
    "revision": "46a193641571106d3b7b43f9bc2a2735"
  }, {
    "url": "assets/how-llm-know-mcp-params.html-Dhpq2TAn.js",
    "revision": "c2864ff3085c54bb4a623edb2a6ed5fb"
  }, {
    "url": "assets/giscus-BAf4_9qv.js",
    "revision": "6bba63cc83e1b2b20cd115e60344dde7"
  }, {
    "url": "assets/docker-proxy.html-Dv_1WbLZ.js",
    "revision": "53df8650d499c9ef6ae51400e10a2165"
  }, {
    "url": "assets/compiler.html-BcD_kRX9.js",
    "revision": "aa60b65661478583c2b96929bf6e07d0"
  }, {
    "url": "assets/code-visualization-intro.html-B9PNTLjI.js",
    "revision": "87af7906c293c9ffd687ae7a11937bc3"
  }, {
    "url": "assets/code-funny.html-DxLlxEKA.js",
    "revision": "95bb47cbb56070e387cd50471290d00a"
  }, {
    "url": "assets/cg-diff.html-C7PgMfNd.js",
    "revision": "4df428f52f014f661a009da7b1ed5d78"
  }, {
    "url": "assets/auto-lock.html-CmMMX5-2.js",
    "revision": "89fa3f2695f4c1f568411da741121ad8"
  }, {
    "url": "assets/app-DjXZDtIZ.js",
    "revision": "df5fa5bb9098859dfe988b25db2ffbb5"
  }, {
    "url": "assets/ai-unit-test.html-DW-p3_E0.js",
    "revision": "2567f7c3e874f0fb7a3fa2a47a372e0a"
  }, {
    "url": "assets/ai-search.html-DmzSTQ_E.js",
    "revision": "8bf6eb31083229ea7df01de570458d1f"
  }, {
    "url": "assets/ai-hotspot.html-DQpa4LY0.js",
    "revision": "3042a6e6ac9d00c3a3183143dad9001e"
  }, {
    "url": "assets/ai-article-database.html-CxDS9x9S.js",
    "revision": "81fb8ffb71e8ece6f6ed892fd1335721"
  }, {
    "url": "assets/ai-agent.html-Di4oChuN.js",
    "revision": "b537629b069c9f5c1e9d80a4f4b2f446"
  }, {
    "url": "assets/aff.html-D0BWpS1A.js",
    "revision": "41940dbc414987a0a30cd84e97189a74"
  }, {
    "url": "assets/SearchResult-BcC7iKOK.js",
    "revision": "8706ebad14446d8f3dbe6152ca7c1fbc"
  }, {
    "url": "assets/5-years-summarize.html-CV8_cIQ6.js",
    "revision": "86fe1546cf22d66bb199c932cb2eb821"
  }, {
    "url": "assets/404.html-BbdlcM4N.js",
    "revision": "0508d7656aeae1b0ec088547dc7d88f7"
  }, {
    "url": "assets/2026-3-6.html-DyphgmXy.js",
    "revision": "fd57ed6f438dc98ba72461777abb75f0"
  }, {
    "url": "assets/2026-3-4.html-DErVMHZG.js",
    "revision": "7566a352da45d541634e00ce37174dee"
  }, {
    "url": "assets/2026-3-3.html-BGPAs6sC.js",
    "revision": "0876a6be31da2bf1fcde9e743a9f2202"
  }, {
    "url": "assets/2026-3-26.html-BDOpVQYH.js",
    "revision": "8bd996ac37a162a4d84f84493eeca226"
  }, {
    "url": "assets/2026-3-24.html-Cxbu2H8q.js",
    "revision": "1ab1bba3d6dd0ddedbd5684565393afe"
  }, {
    "url": "assets/2026-3-22.html-DQ1fa3-W.js",
    "revision": "7a82c44fbe70b2f338be50c3c566dcc6"
  }, {
    "url": "assets/2026-3-17.html-4aNTndam.js",
    "revision": "ab24097a60d312ea715299936f0f394b"
  }, {
    "url": "assets/2026-3-16.html-BrWIA7JV.js",
    "revision": "3f84fe7ac5daa815f444c522b71810bf"
  }, {
    "url": "assets/2025-end.html-GJxmpbeb.js",
    "revision": "3123dc54f60aeba3983b8c46d4cdb38d"
  }, {
    "url": "assets/2024-end.html-ChJ_jFP6.js",
    "revision": "0ffa12b7ec68c7c2e0d0f77e1b59f5e8"
  }, {
    "url": "index.html",
    "revision": "c510b2b3d14145fc1a1975274720ecd2"
  }, {
    "url": "404.html",
    "revision": "03364f2adadbdeadf429854bd29aeef5"
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
