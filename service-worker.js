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
    "url": "assets/tcp-fast-open.html-mGaNgcu_.js",
    "revision": "5394283a2eff655eb192f8983222d781"
  }, {
    "url": "assets/style-D2uQfNRt.css",
    "revision": "5e837e72af909281cc7858a331d86bb6"
  }, {
    "url": "assets/regex-vis.html-DikYA97l.js",
    "revision": "66fb80ce27f4cf94d5df8108189d6d67"
  }, {
    "url": "assets/read-flow.html-Cjr1-05Z.js",
    "revision": "8f3d6b6965ecc781133bbfe4501b0bd3"
  }, {
    "url": "assets/read-code-tools.html-BS2l--Fc.js",
    "revision": "e8a9754fe30a74bb80db29f43ca12576"
  }, {
    "url": "assets/plugin-vue_export-helper-DlAUqK2U.js",
    "revision": "25e3a5dcaf00fb2b1ba0c8ecea6d2560"
  }, {
    "url": "assets/picture-manage.html-G6TyomJw.js",
    "revision": "16fd6bbc956cf41296ab61e18e6323fc"
  }, {
    "url": "assets/photoswipe.esm-BXDdABy_.js",
    "revision": "6c0bf54cf1322dab242c5bb14307d57a"
  }, {
    "url": "assets/one-cmd-web-to-app.html-CCb_CY6h.js",
    "revision": "1285f2c3fda1cdb30e97ccf75148ad08"
  }, {
    "url": "assets/mac-terminal.html-DGM0ngj4.js",
    "revision": "4ce9b65cd1542d1e42ec53d12806fa52"
  }, {
    "url": "assets/kimi.html-D1ELW2sE.js",
    "revision": "d31b13fb8c6c0ad6a3388352d100d574"
  }, {
    "url": "assets/ip-exploration.html-D2SZOhyp.js",
    "revision": "79d52fd13d02392ce0302e6d7360b54c"
  }, {
    "url": "assets/index.html-yoZbAiml.js",
    "revision": "84b1ea01c4ab8ea6da3aaeccd66c17d2"
  }, {
    "url": "assets/index.html-yPTzkXnL.js",
    "revision": "fb62a81554cabf50174a82fb9fbdecad"
  }, {
    "url": "assets/index.html-u0fl2ji4.js",
    "revision": "3d8c1876e9444101a54a9881e9dc6ecc"
  }, {
    "url": "assets/index.html-osbkuxl3.js",
    "revision": "5776618b77c1990c9cfdf4846dd81905"
  }, {
    "url": "assets/index.html-_coumHJt.js",
    "revision": "05408d408afbdb3c2ad42f65174e07e7"
  }, {
    "url": "assets/index.html-XR7tzIe8.js",
    "revision": "991fc90b6d315b80536b172eba32b7cd"
  }, {
    "url": "assets/index.html-V5NCqwHI.js",
    "revision": "16d6eaa017d650cc33173c8ae42e0296"
  }, {
    "url": "assets/index.html-UW_rXEZ0.js",
    "revision": "a18470fd973a72e8d86f35cf6ab7cc67"
  }, {
    "url": "assets/index.html-S_Dx4pQq.js",
    "revision": "a286d67f7bbb0743fd967d3d6fad4621"
  }, {
    "url": "assets/index.html-SYVqZfRP.js",
    "revision": "f6049bca768ba30351bf8aa440a1cd9a"
  }, {
    "url": "assets/index.html-McM8QTV1.js",
    "revision": "5783eb36cc0d958ee771087517fab48f"
  }, {
    "url": "assets/index.html-MZ_yyYsJ.js",
    "revision": "963e1fd49c29c2f75765dfe4db3f86c8"
  }, {
    "url": "assets/index.html-K7VxCgb9.js",
    "revision": "9258cf21dbcea30066ab2bb61b7d6772"
  }, {
    "url": "assets/index.html-H_typVSN.js",
    "revision": "ef9fd24cbfcfccbd965dec5a8169b0ab"
  }, {
    "url": "assets/index.html-DxAXpgZS.js",
    "revision": "1c9c0eb6bc087d00ca3070ddbb9f2c5a"
  }, {
    "url": "assets/index.html-Dv1dX6xR.js",
    "revision": "a83fff27f81f72645121cca8797359ce"
  }, {
    "url": "assets/index.html-Dt5INpPJ.js",
    "revision": "20f61ccee5df7718d9db530681524c9f"
  }, {
    "url": "assets/index.html-Dq8UcDXX.js",
    "revision": "e549cd26b4fc9860e5c545b2cc77642b"
  }, {
    "url": "assets/index.html-Dofii_KE.js",
    "revision": "2de8534dac5b584348b44d69cb47fee2"
  }, {
    "url": "assets/index.html-DoaC3svh.js",
    "revision": "6a2fac8fcbcb0b5491f5fcf943190cb7"
  }, {
    "url": "assets/index.html-DkmsMdjt.js",
    "revision": "bfe3bf66f3a2969ad777b3cc39b7497e"
  }, {
    "url": "assets/index.html-DgM6Eh5t.js",
    "revision": "3452d65c13bb112180a2596b948bd404"
  }, {
    "url": "assets/index.html-DatPHm4M.js",
    "revision": "c7af786bdf5b752da7f462f8abb18fc5"
  }, {
    "url": "assets/index.html-DXhj7iEX.js",
    "revision": "b911cd2bc278ef7ec9747f5e609fe19f"
  }, {
    "url": "assets/index.html-DXIhTJWz.js",
    "revision": "1895923118c90fc9422760819cc954ed"
  }, {
    "url": "assets/index.html-DRJpuvFc.js",
    "revision": "37d6f3148ccb468fa9db77a40a30669f"
  }, {
    "url": "assets/index.html-DQJf7ykv.js",
    "revision": "4af86b6bd356db05e7099e6ce6285fb3"
  }, {
    "url": "assets/index.html-DPcMhkbw.js",
    "revision": "cafad4d9e9a143afd5227655cdbc75d7"
  }, {
    "url": "assets/index.html-DLt92e1m.js",
    "revision": "a49552769f34250a45e1a544650577da"
  }, {
    "url": "assets/index.html-DJ2sP1Gp.js",
    "revision": "0fa3a81515cd59df7a81369ec2379816"
  }, {
    "url": "assets/index.html-DGapUr7M.js",
    "revision": "6bee70e16a0b9081a17dc5cbad242347"
  }, {
    "url": "assets/index.html-D68HwsQ2.js",
    "revision": "dc1d5ca62513328b43787c304e36fc06"
  }, {
    "url": "assets/index.html-D545mPMq.js",
    "revision": "b52939bb47dcd4906d606adaab2713ac"
  }, {
    "url": "assets/index.html-CyT8TY4H.js",
    "revision": "6b2b613d579d1784cefa9219825f855f"
  }, {
    "url": "assets/index.html-CwiqYAdX.js",
    "revision": "bf0a7ba7caddca43b2803d7c6ac1d6fd"
  }, {
    "url": "assets/index.html-CqldrXy2.js",
    "revision": "8aec5a9466704e9b8e18eab17e3a14c7"
  }, {
    "url": "assets/index.html-Cks8-Cy4.js",
    "revision": "75d9c82b1831177b5fcc0398e3a6ef4f"
  }, {
    "url": "assets/index.html-Cgxn3Kwi.js",
    "revision": "d4a4c7fc826d38ceabad8a76ebeb2d00"
  }, {
    "url": "assets/index.html-CahhCTMH.js",
    "revision": "40e4534d17f4454b8fe2a76d3b861478"
  }, {
    "url": "assets/index.html-CRnofX43.js",
    "revision": "e3c3e763b977ff64481bf11577c3cf6d"
  }, {
    "url": "assets/index.html-COgh5UZ2.js",
    "revision": "74dccc3401e1da52a0edd0f7f6888fe3"
  }, {
    "url": "assets/index.html-CGiJ39va.js",
    "revision": "97f9449d75f611d1f97757eed61e1718"
  }, {
    "url": "assets/index.html-CFj4N-3O.js",
    "revision": "3944d77a553961a8265a41d0942f91f7"
  }, {
    "url": "assets/index.html-C8OvFdpl.js",
    "revision": "99f28c2b252d22ad6775b50203f04a0a"
  }, {
    "url": "assets/index.html-C1MgwlpQ.js",
    "revision": "25e40cf9f972a4c9c0cffa4bebbc8283"
  }, {
    "url": "assets/index.html-BqitjlQx.js",
    "revision": "1c0852936eada99a98116434d4564792"
  }, {
    "url": "assets/index.html-BnGVufzJ.js",
    "revision": "d6dd93102cd95c7352021e3fa8fa8998"
  }, {
    "url": "assets/index.html-BhaxzS69.js",
    "revision": "38fc7799efb1ad50c6728ffd17497ac5"
  }, {
    "url": "assets/index.html-BY_BcOAr.js",
    "revision": "6a42178c0c43a187ed2369bbc1fe9f28"
  }, {
    "url": "assets/index.html-BVNwF3bv.js",
    "revision": "082ef19b2a91fcda772b001ab9747e1c"
  }, {
    "url": "assets/index.html-BCcn4umu.js",
    "revision": "0acafb79ecb491cd942aea6eccc49b52"
  }, {
    "url": "assets/index.html-BA5ACvWA.js",
    "revision": "30aa9cc8564c63dd48ede8b1fc8d1b59"
  }, {
    "url": "assets/index.html-B8G1oocv.js",
    "revision": "ca07ae34fefdeba0f00339f79ddd5613"
  }, {
    "url": "assets/index.html-B-8QS5ff.js",
    "revision": "c201ae11edfba41b7285a84d370ffe6d"
  }, {
    "url": "assets/index.html-8kzGos21.js",
    "revision": "8d2f7dcb11c5d64eb9d04e13a5247a0d"
  }, {
    "url": "assets/index.html-7hXSxVIs.js",
    "revision": "928cc872f1a6382c4de6d98dbd183f67"
  }, {
    "url": "assets/index-DTEEl-sV.js",
    "revision": "46a193641571106d3b7b43f9bc2a2735"
  }, {
    "url": "assets/how-llm-know-mcp-params.html-B8BHU8iq.js",
    "revision": "0b82b4a24cb05eeb80e87c4a8e0a5fc6"
  }, {
    "url": "assets/giscus-BAf4_9qv.js",
    "revision": "6bba63cc83e1b2b20cd115e60344dde7"
  }, {
    "url": "assets/docker-proxy.html-CFRSft-i.js",
    "revision": "e18e97fc3f3af09c1481b187c077bec8"
  }, {
    "url": "assets/compiler.html-D8Szwz5l.js",
    "revision": "72dee1beb93d4abdfeb29af689c19aa2"
  }, {
    "url": "assets/code-visualization-intro.html-ByNpdBkv.js",
    "revision": "1725dffb25bcf9efa2415eee18ad7e15"
  }, {
    "url": "assets/code-funny.html-CyqThu0B.js",
    "revision": "19704b803adb3212e18a0ad8e3a8f804"
  }, {
    "url": "assets/cg-diff.html-CRmUOBkW.js",
    "revision": "399306663b33aa76adf6f6023b8d6cd4"
  }, {
    "url": "assets/auto-lock.html-r5PuoO-A.js",
    "revision": "c2bcb776540dcf59e6a0c803781e1a99"
  }, {
    "url": "assets/app-BCun8tyx.js",
    "revision": "6f7a70e4403eb28a8f233f08efb80854"
  }, {
    "url": "assets/ai-unit-test.html-pVwNZUKl.js",
    "revision": "445f25213350ba3ae4f105684f942263"
  }, {
    "url": "assets/ai-search.html-BAhIeZjX.js",
    "revision": "006947814dfb176222ae025f87fe3431"
  }, {
    "url": "assets/ai-hotspot.html-BK8keCBc.js",
    "revision": "7a54dba149da9defef60a33922f7efd4"
  }, {
    "url": "assets/ai-article-database.html-D4nSVBo0.js",
    "revision": "4894efef081b81d243f1430e6987294e"
  }, {
    "url": "assets/ai-agent.html-DAvTKque.js",
    "revision": "94ba505de9ddd79ed02fcfc92d73e4c8"
  }, {
    "url": "assets/SearchResult-Cs6Z54Lj.js",
    "revision": "7e7fc244c8bf3dd1fe3c755c6f43f72d"
  }, {
    "url": "assets/5-years-summarize.html-B17Uyu5T.js",
    "revision": "e277e78c2699987644832eec98c44750"
  }, {
    "url": "assets/404.html-CLvv2ySD.js",
    "revision": "5b40982e0af7f47d1969b04fd9bf0441"
  }, {
    "url": "assets/2025-end.html-BA4tmoYs.js",
    "revision": "94243fd8c915939a62f011934be302ae"
  }, {
    "url": "assets/2024-end.html-DWub9lBj.js",
    "revision": "4be980633c40159a9b1b5a773323cb3e"
  }, {
    "url": "index.html",
    "revision": "de50ce57c09882ea72cbcf7e6df7b506"
  }, {
    "url": "404.html",
    "revision": "6d55d413dd78f6997fbdb3b592095bac"
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
