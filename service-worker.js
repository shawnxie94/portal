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
    "url": "assets/tcp-fast-open.html-CLWVphCR.js",
    "revision": "439d32a89d2166ad0c1bda2f33d832bf"
  }, {
    "url": "assets/style-D2uQfNRt.css",
    "revision": "5e837e72af909281cc7858a331d86bb6"
  }, {
    "url": "assets/regex-vis.html-10BFNnwE.js",
    "revision": "818b99f4602a5e9cba279621d51283db"
  }, {
    "url": "assets/read-flow.html-Ddt0puv7.js",
    "revision": "65280bdcafd77a94275ab09b7df8b733"
  }, {
    "url": "assets/read-flow-2026.html-C6Acex7A.js",
    "revision": "3fb99a31b367c588f02191af5cd60428"
  }, {
    "url": "assets/read-code-tools.html-MrGgXGSK.js",
    "revision": "79b2b11239da5f94bb87bfbf65fa40e0"
  }, {
    "url": "assets/plugin-vue_export-helper-DlAUqK2U.js",
    "revision": "25e3a5dcaf00fb2b1ba0c8ecea6d2560"
  }, {
    "url": "assets/picture-manage.html-CgaJgHv4.js",
    "revision": "ba22eadd5ebb3a3f97870991e07dcd76"
  }, {
    "url": "assets/photoswipe.esm-BXDdABy_.js",
    "revision": "6c0bf54cf1322dab242c5bb14307d57a"
  }, {
    "url": "assets/one-cmd-web-to-app.html-C0V3XUW7.js",
    "revision": "365ad185ba783a9ec7f4bfb17ff63c63"
  }, {
    "url": "assets/mac-terminal.html-BFvhy9YC.js",
    "revision": "43a98a6c27edec4e0126de48b00a3091"
  }, {
    "url": "assets/kimi.html-CKmQX8pJ.js",
    "revision": "009cbd623edc57cf4b99db813feae0bb"
  }, {
    "url": "assets/ip-exploration.html-BFRAvoa-.js",
    "revision": "d0b25cb3d2501f8b6dd0caeffd062b87"
  }, {
    "url": "assets/index.html-v7hc3QHr.js",
    "revision": "376569ab6c877229b7d819574a374e8d"
  }, {
    "url": "assets/index.html-mmnNgI6Z.js",
    "revision": "ef49b62c61ba52f0672c9d2d75e42ba7"
  }, {
    "url": "assets/index.html-mLHKtqH0.js",
    "revision": "e9ce854c087ce3f52c7fca0a0abb2654"
  }, {
    "url": "assets/index.html-jgvSIS3D.js",
    "revision": "239a752aa28eb609da6212595e484159"
  }, {
    "url": "assets/index.html-epnGai1U.js",
    "revision": "ab23c363acc8279ed1f9285c30c91473"
  }, {
    "url": "assets/index.html-b_mfoyuv.js",
    "revision": "45dbedd3a09734215c2e60ad13fb6ebc"
  }, {
    "url": "assets/index.html-XXa19uPS.js",
    "revision": "4e022ddb7b4a5724ee5e08afe97d7640"
  }, {
    "url": "assets/index.html-LpOsCqqi.js",
    "revision": "b75ec163ab3adc89c7c3a57b467090a8"
  }, {
    "url": "assets/index.html-FmMUWlAO.js",
    "revision": "4ae1fa12c82a0158ec2a7a5db4c9f284"
  }, {
    "url": "assets/index.html-DxCADekL.js",
    "revision": "a903fde29731bc11d4218e9fd77b609d"
  }, {
    "url": "assets/index.html-Dx6JK5TT.js",
    "revision": "f74e17ee73aec641d01348643cbbc124"
  }, {
    "url": "assets/index.html-DuqcjlLv.js",
    "revision": "5b2a65e48c845f97d9b42ada45e46989"
  }, {
    "url": "assets/index.html-DdjO3pIz.js",
    "revision": "3b475a2691a01e315f647b1eb6fe761a"
  }, {
    "url": "assets/index.html-Dc0bjQxe.js",
    "revision": "8ab628699ec4d8466c430721ca4cf7d6"
  }, {
    "url": "assets/index.html-Dahlrvlq.js",
    "revision": "ae26f5864ed75d68ce878f8b3a84370c"
  }, {
    "url": "assets/index.html-DYYXBiNw.js",
    "revision": "6772abdf024c93e9047771e0669e3353"
  }, {
    "url": "assets/index.html-DSDpijuj.js",
    "revision": "340a0ef6f99ff418115344ebfa1effce"
  }, {
    "url": "assets/index.html-DNHkEhrg.js",
    "revision": "49ac8236a4c710bea037455f948a93d0"
  }, {
    "url": "assets/index.html-DFI92JZN.js",
    "revision": "dffb60cda76072ac826c04a327629943"
  }, {
    "url": "assets/index.html-DBm0uhk-.js",
    "revision": "1c3c3fc268f906ee4050dd640a9c3d5b"
  }, {
    "url": "assets/index.html-Cyqa2t1t.js",
    "revision": "84949088c363fe1bb73c8f560270e2a1"
  }, {
    "url": "assets/index.html-CxBXjXT0.js",
    "revision": "46827928f555d796025424503090f47a"
  }, {
    "url": "assets/index.html-CkwpTLGT.js",
    "revision": "8afa337934b0279207378a5af630d952"
  }, {
    "url": "assets/index.html-CjjiN_T5.js",
    "revision": "5536487c9955231748e680e802b89866"
  }, {
    "url": "assets/index.html-CeVZss5_.js",
    "revision": "00b054a20d01f47ab6753578e3e357c9"
  }, {
    "url": "assets/index.html-CdKQIRPT.js",
    "revision": "8210c4f9e1036ec50c29e616064ef737"
  }, {
    "url": "assets/index.html-Ca_aU0bq.js",
    "revision": "41b29e80828028036bc56288d8baf26e"
  }, {
    "url": "assets/index.html-CX71Krka.js",
    "revision": "311bb3fd3429407ce0f11ad31207659f"
  }, {
    "url": "assets/index.html-CSINPRcI.js",
    "revision": "931eee66fa3570ef8a3db48cadc61cd4"
  }, {
    "url": "assets/index.html-CReeN5cw.js",
    "revision": "5c5a7d74120aa413ff91f19c0f6de739"
  }, {
    "url": "assets/index.html-CRAW37An.js",
    "revision": "e900424a67dec8ea2ad80a180b9e2e15"
  }, {
    "url": "assets/index.html-CPAPSpAl.js",
    "revision": "78240df5e2dde82a45ddc0a589e0712c"
  }, {
    "url": "assets/index.html-COMwhLWW.js",
    "revision": "a0d9f3a3a1921e8e30d37840235830c5"
  }, {
    "url": "assets/index.html-CO3i5DYD.js",
    "revision": "1cd3d41fba9f065625bc31dd00214099"
  }, {
    "url": "assets/index.html-CLVIrWHs.js",
    "revision": "cbd8921f4c3aaf7a7a48f3564dca3dcc"
  }, {
    "url": "assets/index.html-CIe8M8Jt.js",
    "revision": "49af0390473f7cfdbddd8f879d6e1799"
  }, {
    "url": "assets/index.html-CHIEtU0k.js",
    "revision": "05d66fa176ef770dded94df94cd60c89"
  }, {
    "url": "assets/index.html-CDc5MJi0.js",
    "revision": "3a9e0b4adee3aa49e2c9fc890205443a"
  }, {
    "url": "assets/index.html-CD_Aza73.js",
    "revision": "213dbc11273b9a38682ff86bd1b79747"
  }, {
    "url": "assets/index.html-CBYXuO6A.js",
    "revision": "0aae4dd6a01478fa05adcdae0da11df5"
  }, {
    "url": "assets/index.html-C2kNZiJC.js",
    "revision": "49c8c5d9cf886920350077cf6e944bee"
  }, {
    "url": "assets/index.html-C0kfCjZC.js",
    "revision": "0d4ad62d6d2215b687143e81eefacb50"
  }, {
    "url": "assets/index.html-Bxo_dpG3.js",
    "revision": "1ba77f5cbb018bbebd843ca09dc863d9"
  }, {
    "url": "assets/index.html-BdpVtWLi.js",
    "revision": "fbc4c031613b29470b2caa693d40f61a"
  }, {
    "url": "assets/index.html-BWmnPePf.js",
    "revision": "722f2708ce7ce464623244c28a47d8ee"
  }, {
    "url": "assets/index.html-BW0YCZ_s.js",
    "revision": "505ae7c4b9dbb39e52ef2ca80947c2e4"
  }, {
    "url": "assets/index.html-BTCxZ5xK.js",
    "revision": "dbab2ad760101c0ce772195c71aea002"
  }, {
    "url": "assets/index.html-BRKESXO2.js",
    "revision": "e1c3b8a155554e0dbc298b652f7f6a4a"
  }, {
    "url": "assets/index.html-BQ8EZvzv.js",
    "revision": "2cc6193400afc611616039e28f03cc4f"
  }, {
    "url": "assets/index.html-BNiIPvXd.js",
    "revision": "63531d9e5c6b7ff48d1ac6dcd89ea93b"
  }, {
    "url": "assets/index.html-B9qeuHCY.js",
    "revision": "3eb03aab55820cb3e8167c65cb78852b"
  }, {
    "url": "assets/index.html-B8dXmuxF.js",
    "revision": "d13272a3c79a6d5a99faa2c9bf0a8393"
  }, {
    "url": "assets/index.html-B5X9kIiU.js",
    "revision": "b927d0f65ebb435e6e8566c227ee25f3"
  }, {
    "url": "assets/index.html-B0tcULZQ.js",
    "revision": "4aa0cedb2d97cd11778a8671ff0a79b6"
  }, {
    "url": "assets/index.html-B0jSjDD4.js",
    "revision": "272bcafbd8671bebf35ec2d1074cb360"
  }, {
    "url": "assets/index.html-7c4yVP9b.js",
    "revision": "0322bed96dbe363971237229e1b5b987"
  }, {
    "url": "assets/index.html-5VQLkQRf.js",
    "revision": "80e1c01f016359331d94610c6cfd5e5d"
  }, {
    "url": "assets/index-DTEEl-sV.js",
    "revision": "46a193641571106d3b7b43f9bc2a2735"
  }, {
    "url": "assets/how-llm-know-mcp-params.html-B-xpz4e-.js",
    "revision": "6cd3d85d3e0615e4071d3c4cfc8e74a6"
  }, {
    "url": "assets/giscus-BAf4_9qv.js",
    "revision": "6bba63cc83e1b2b20cd115e60344dde7"
  }, {
    "url": "assets/docker-proxy.html-r6CHlbo7.js",
    "revision": "aab8c829ad419b430930c588c1be9fd0"
  }, {
    "url": "assets/compiler.html-BUXu3ZA5.js",
    "revision": "b7dcb1799d51b13e2e8315dc501a2fc1"
  }, {
    "url": "assets/code-visualization-intro.html-BUC3tdH0.js",
    "revision": "39c1c0a2ba749f87569e62d4ac2bbdfc"
  }, {
    "url": "assets/code-funny.html-Dj1sccvu.js",
    "revision": "0a2bef98aad72993384db5c2645b0753"
  }, {
    "url": "assets/cg-diff.html-Da2TukFL.js",
    "revision": "fa25382623507528abbb35201310116a"
  }, {
    "url": "assets/auto-lock.html-DhS45IGG.js",
    "revision": "5e45c1d59db1b42bed7b9f73252afeef"
  }, {
    "url": "assets/app-B_MTxG_3.js",
    "revision": "01cb9d9cb862b0d8a610438260316ab9"
  }, {
    "url": "assets/ai-unit-test.html-BLChS3P1.js",
    "revision": "a45081346b9a9573b4b059741e86d3e0"
  }, {
    "url": "assets/ai-search.html-aU8awUjj.js",
    "revision": "278ab51ecf6062459ef63b3b956553bf"
  }, {
    "url": "assets/ai-hotspot.html-BfPmoaFO.js",
    "revision": "71a1e7927beb21354f127926f1e95511"
  }, {
    "url": "assets/ai-article-database.html-CCkt5XzL.js",
    "revision": "77289e49b6b5feb905acdec1eb20a44a"
  }, {
    "url": "assets/ai-agent.html-Bs1qqJsA.js",
    "revision": "aa58ec73252008a07573d4a593de7018"
  }, {
    "url": "assets/aff.html-DR0YeYT7.js",
    "revision": "2d84c077cf62b48a72b8ae3335894928"
  }, {
    "url": "assets/SearchResult-CSFKt1R-.js",
    "revision": "b8d02a712a3ef0f98e151dacec985623"
  }, {
    "url": "assets/5-years-summarize.html-CYoeu-A3.js",
    "revision": "6814757107ea6a8749c9c081227b5815"
  }, {
    "url": "assets/404.html-CGZNbq8F.js",
    "revision": "5187a47a71883cb4aa9b980d4bc8e8c7"
  }, {
    "url": "assets/2026-3-6.html-BY2FuYSo.js",
    "revision": "2b11323bf558e51460818dfabe174cb5"
  }, {
    "url": "assets/2026-3-4.html-DuWEWa-N.js",
    "revision": "68f57e1d3f6d35e8823e4bb66395a0d1"
  }, {
    "url": "assets/2026-3-3.html-Bq6OTesV.js",
    "revision": "5c6b6398bfc21d20de94961dcd064c3d"
  }, {
    "url": "assets/2026-3-26.html-BnjxxmwQ.js",
    "revision": "146968f55971a54f2f4deb421f70cd98"
  }, {
    "url": "assets/2026-3-24.html-CNPWbgW1.js",
    "revision": "80691c1e338dee243243a8e889788849"
  }, {
    "url": "assets/2026-3-22.html-smJ1iRpt.js",
    "revision": "ec22e4b3af46874677f717ee944f3f8e"
  }, {
    "url": "assets/2026-3-17.html-DhFRNGdO.js",
    "revision": "edbdcc2d82f06cd9d132d7348be739e7"
  }, {
    "url": "assets/2026-3-16.html-BcNslhz2.js",
    "revision": "7cf8aed43f55968d29c6a079d1786870"
  }, {
    "url": "assets/2025-end.html-CGUA2HvN.js",
    "revision": "af7863efe087beeb501d4c2df85cd11f"
  }, {
    "url": "assets/2024-end.html-miXSIMdm.js",
    "revision": "4d5d162365362c7e69c6507fc9dc7ddf"
  }, {
    "url": "index.html",
    "revision": "0bae89d277ba0a45873c875cb62238d0"
  }, {
    "url": "404.html",
    "revision": "0f1254eaa0574f48df0d20bb0f5f689b"
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
