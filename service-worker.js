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
    "url": "assets/tcp-fast-open.html-D_mciwFX.js",
    "revision": "71a05967f61d672a8fb3514fcd9a2969"
  }, {
    "url": "assets/style-D2uQfNRt.css",
    "revision": "5e837e72af909281cc7858a331d86bb6"
  }, {
    "url": "assets/regex-vis.html-BUljMKPw.js",
    "revision": "8000a311e4a8ace7ddb0b9174ec7c66d"
  }, {
    "url": "assets/read-flow.html-BAjBXpDN.js",
    "revision": "b3f74ff12f785413d7db4a471e583967"
  }, {
    "url": "assets/read-code-tools.html-DNa4JHuC.js",
    "revision": "a9ca0eff239ca43d1d209659f6105d2e"
  }, {
    "url": "assets/plugin-vue_export-helper-DlAUqK2U.js",
    "revision": "25e3a5dcaf00fb2b1ba0c8ecea6d2560"
  }, {
    "url": "assets/picture-manage.html-ewN6J7ST.js",
    "revision": "781cdef5c164442791cdc833dbfe3b87"
  }, {
    "url": "assets/photoswipe.esm-BXDdABy_.js",
    "revision": "6c0bf54cf1322dab242c5bb14307d57a"
  }, {
    "url": "assets/one-cmd-web-to-app.html-CcUFesbX.js",
    "revision": "91642ac26eddc39df3ab3cb1842a12ed"
  }, {
    "url": "assets/mac-terminal.html-DsVmazCR.js",
    "revision": "295697cbd1c826a8583664894adefff5"
  }, {
    "url": "assets/kimi.html-C_eVt1pK.js",
    "revision": "8fe61fe711ad60e2ac8ffd5bd516e307"
  }, {
    "url": "assets/ip-exploration.html-CYpucMoX.js",
    "revision": "fc1c76018696e6a15bfc430f06cee66a"
  }, {
    "url": "assets/index.html-yK3WO7Jg.js",
    "revision": "dd970eb1b8fa4d6c1093f2d998818385"
  }, {
    "url": "assets/index.html-ocRtMuuf.js",
    "revision": "277ad43cae6b4f35ec21a7a2dd55cf5e"
  }, {
    "url": "assets/index.html-lPAMzHlt.js",
    "revision": "61c77029e4a5285d31e865f0671e57cf"
  }, {
    "url": "assets/index.html-gzrNeted.js",
    "revision": "a538d54823b7710fa25f4f998770f818"
  }, {
    "url": "assets/index.html-_w-im06o.js",
    "revision": "f1876acb6064ffd734acedfa04d0c279"
  }, {
    "url": "assets/index.html-Zc7T2xm7.js",
    "revision": "6dcc9a7914f828821710a780ca94f56a"
  }, {
    "url": "assets/index.html-VxRiAR-v.js",
    "revision": "69c472e1f4426acecc2f46180cc0407e"
  }, {
    "url": "assets/index.html-NhazyIGO.js",
    "revision": "a4a82d489a4b54128fd65aa1b99beb0e"
  }, {
    "url": "assets/index.html-Jv7KtjPL.js",
    "revision": "3b92dd0a96a0619b58e59ea28ad89464"
  }, {
    "url": "assets/index.html-HUWDWdg_.js",
    "revision": "625d2d2cc50969689b115174b8c9379d"
  }, {
    "url": "assets/index.html-DyMnqb3t.js",
    "revision": "144e9895e75a95f61e030dacdb96f626"
  }, {
    "url": "assets/index.html-Dy9s5Slx.js",
    "revision": "5355cbd458cd24d883e7c3c624d54541"
  }, {
    "url": "assets/index.html-Ds5FzOsb.js",
    "revision": "272b5bb28357819b1b9a6a2186765cc1"
  }, {
    "url": "assets/index.html-DqWeyeC6.js",
    "revision": "e08623cc8c6dbbcae8d347efc8d4c2b9"
  }, {
    "url": "assets/index.html-Do1iYhQl.js",
    "revision": "8f8101bb61b8d2e728d1eeb9fb74404f"
  }, {
    "url": "assets/index.html-Dn1Ztqh4.js",
    "revision": "8684d4a6a20a3c75c8438458f28e5ed2"
  }, {
    "url": "assets/index.html-DipaOfq6.js",
    "revision": "0012b0865d9289c79ae673b82954e64d"
  }, {
    "url": "assets/index.html-DfrNHBVf.js",
    "revision": "731ffcb61beaa8e145d32179b98ce1df"
  }, {
    "url": "assets/index.html-DejrW45S.js",
    "revision": "52319ca5d9368f1289e5c79a33a6b9af"
  }, {
    "url": "assets/index.html-DbxhgHeB.js",
    "revision": "60ce9ba694080ea595799a9684f379fe"
  }, {
    "url": "assets/index.html-DXHb7gXL.js",
    "revision": "c79fea9d2446da355191e8d1f72772a7"
  }, {
    "url": "assets/index.html-DV0Mz3U3.js",
    "revision": "118c2dc45c35a84959814695d9abc0e4"
  }, {
    "url": "assets/index.html-DTnqcyDi.js",
    "revision": "02ddf08ea9e711ae586568480be57b2d"
  }, {
    "url": "assets/index.html-DPskT1q2.js",
    "revision": "8d11c16073cbfbfdb3089cb07694cd9e"
  }, {
    "url": "assets/index.html-DOrCKRnU.js",
    "revision": "4087a4ed8847e7cb1776bcaf402032ad"
  }, {
    "url": "assets/index.html-DNgcfUje.js",
    "revision": "0fbbd145e0891e631382ba277131aa94"
  }, {
    "url": "assets/index.html-DA0mXACC.js",
    "revision": "cd4c130abbebd35491a9312d5c96c1da"
  }, {
    "url": "assets/index.html-D7SWL26Q.js",
    "revision": "122c9526e4dfd5e8a9e4502c25cbca33"
  }, {
    "url": "assets/index.html-D5-EFD7h.js",
    "revision": "aa06911660a2ac7e27d14e0a79098c3b"
  }, {
    "url": "assets/index.html-Cu8n3TlE.js",
    "revision": "f2040cc435f2310249dec82beb41367a"
  }, {
    "url": "assets/index.html-CnQ48VC7.js",
    "revision": "eb40ed19d0318982d50d24d2ccf03d00"
  }, {
    "url": "assets/index.html-Cml7110_.js",
    "revision": "afe264368bb49e4caf65394a29ee18f6"
  }, {
    "url": "assets/index.html-Cli1FnH7.js",
    "revision": "80dfc49cb02e3f606addedf454f1c5c5"
  }, {
    "url": "assets/index.html-ChHrftIX.js",
    "revision": "59b1c281aedf8222a6e1923ecdfce877"
  }, {
    "url": "assets/index.html-CX8FCHVR.js",
    "revision": "51f55662fb2988775a76b3eb2b2efe0a"
  }, {
    "url": "assets/index.html-CUZGADyl.js",
    "revision": "cc61dc2b229b12b5453191a9e8077813"
  }, {
    "url": "assets/index.html-CSTJALwR.js",
    "revision": "b8bad81ebcd9ed85eed65333f97c82ea"
  }, {
    "url": "assets/index.html-CQ4GDHk9.js",
    "revision": "830eb15ae6fa418fc78ccb2f2112a4b8"
  }, {
    "url": "assets/index.html-CMp61yl_.js",
    "revision": "39beedd4ffa64390068e1a543de2d812"
  }, {
    "url": "assets/index.html-CIzfKHx-.js",
    "revision": "24c559525f8296538be5664b81b92a43"
  }, {
    "url": "assets/index.html-CEvotHD5.js",
    "revision": "86aa7ee2cec1b5a35d0c7d6d0d6574c3"
  }, {
    "url": "assets/index.html-C34ES3rL.js",
    "revision": "c2d49ed09f22bb3c80441dd2ed45c64d"
  }, {
    "url": "assets/index.html-C1NVdxG1.js",
    "revision": "6ae8c29af3f5e4329a086a95b8db1161"
  }, {
    "url": "assets/index.html-C-z6mzoQ.js",
    "revision": "0bd8b64e24e3571b858079e03ab0d821"
  }, {
    "url": "assets/index.html-C-kKQmju.js",
    "revision": "7bb5efc8471fa8076dfef58d8b03125f"
  }, {
    "url": "assets/index.html-ByOUOQfy.js",
    "revision": "ff96ccca768b77deb3bd8271a6af268d"
  }, {
    "url": "assets/index.html-Bw3-w2M_.js",
    "revision": "9311d2a9bfc3756994582154a17a3179"
  }, {
    "url": "assets/index.html-Bsl3oRgu.js",
    "revision": "8a9d4a0a3e457a87fba4268f3aeb7c61"
  }, {
    "url": "assets/index.html-Bq7j7ozK.js",
    "revision": "347e1f13320a142a65e7b12d93236fb1"
  }, {
    "url": "assets/index.html-BpA8qGaN.js",
    "revision": "a74e1f90aba2049e835d8d384bfa22c7"
  }, {
    "url": "assets/index.html-Bk2U1FJF.js",
    "revision": "ca7d7613ac800448a5f6b791aa09fbdf"
  }, {
    "url": "assets/index.html-BZ8wEU5w.js",
    "revision": "6a8bb42ba796cf7be6babaa0b128b4d0"
  }, {
    "url": "assets/index.html-BS-6PeLk.js",
    "revision": "1ad72ef02fe7b94290ff50d15bcae2f9"
  }, {
    "url": "assets/index.html-BMNHvcZh.js",
    "revision": "278083f2919672992e6ae4c558e6cdc3"
  }, {
    "url": "assets/index.html-BHOPm24h.js",
    "revision": "f947f0e0d4a670bcffceaaefb04544aa"
  }, {
    "url": "assets/index.html-BG67r7TV.js",
    "revision": "844580dfbbe87f47e0f97a193cb40901"
  }, {
    "url": "assets/index.html-BFx4kJW3.js",
    "revision": "ec20af75f59573daa41a51e22bed8147"
  }, {
    "url": "assets/index.html-BDLUhKNl.js",
    "revision": "f0543c17881f21868593a4cb49c668c5"
  }, {
    "url": "assets/index.html-BBJxSA-L.js",
    "revision": "484d70d08727fd1cae06d8f8a56faf79"
  }, {
    "url": "assets/index.html-B6bSrR1i.js",
    "revision": "c7815a72557e9e221191f9dd9ef7141c"
  }, {
    "url": "assets/index.html-B4LuUBsg.js",
    "revision": "3c6997753e962ab7821f53cd83a772c2"
  }, {
    "url": "assets/index.html-B44HYuGJ.js",
    "revision": "bcd021b3092a55823299112f5d3f9777"
  }, {
    "url": "assets/index.html-9JvSWVjo.js",
    "revision": "fa12285135e3391ceb7673fe024a4ed3"
  }, {
    "url": "assets/index.html-8ET-eHB4.js",
    "revision": "8748bbe8ee0a32dd8a2696c018645459"
  }, {
    "url": "assets/index.html-7cPDAwSu.js",
    "revision": "f5d9da164e131bc8b799b84bbd8c82e0"
  }, {
    "url": "assets/index-DTEEl-sV.js",
    "revision": "46a193641571106d3b7b43f9bc2a2735"
  }, {
    "url": "assets/how-llm-know-mcp-params.html-teHz-2J_.js",
    "revision": "82a08993aa5a3026656c1f613081f461"
  }, {
    "url": "assets/giscus-BAf4_9qv.js",
    "revision": "6bba63cc83e1b2b20cd115e60344dde7"
  }, {
    "url": "assets/docker-proxy.html-DeI4waF_.js",
    "revision": "afe4fa076695796af1e1010fcea1dd3b"
  }, {
    "url": "assets/compiler.html-FbNK7LzR.js",
    "revision": "a18eeb9e79f68f94b478af55f5151301"
  }, {
    "url": "assets/code-visualization-intro.html-BQhybDIw.js",
    "revision": "ca3ffe224897e9b975f6d48712ee955f"
  }, {
    "url": "assets/code-funny.html-_bS2XfLW.js",
    "revision": "10b64963ef9506a4a6d7ca74ad27546e"
  }, {
    "url": "assets/cg-diff.html-NEDlW3E3.js",
    "revision": "11292e9fb1a9b21c4f8f03b4f97aa54a"
  }, {
    "url": "assets/auto-lock.html-CWgeW5u4.js",
    "revision": "581ae6b4e0d7ac5c5d093beb6ca6549e"
  }, {
    "url": "assets/app-BiqowmG5.js",
    "revision": "36d7d63f13bfa9d9d225057ceafbe84e"
  }, {
    "url": "assets/ai-unit-test.html-CV8e-xiQ.js",
    "revision": "74f1070c21a9bb16d2a90833b1979def"
  }, {
    "url": "assets/ai-search.html-8tAcg4nk.js",
    "revision": "630475ccabceb4ed4f223afd804e9340"
  }, {
    "url": "assets/ai-hotspot.html-CmNFxo4f.js",
    "revision": "7c3553cc1a86765005e6789eb94cd75e"
  }, {
    "url": "assets/ai-article-database.html-mtLz6mtI.js",
    "revision": "9c8ffe3ae45b9a0670f0533f9aadbfbf"
  }, {
    "url": "assets/ai-agent.html-CVshhEVB.js",
    "revision": "83b57df23eb043495129ab40bc399fb9"
  }, {
    "url": "assets/SearchResult-CR_FeR_F.js",
    "revision": "e6465bde2f7c0d8eaf2d7fdcc9400338"
  }, {
    "url": "assets/5-years-summarize.html-BObrceCx.js",
    "revision": "c6667b8d699171dabdaf63f7b61a82dd"
  }, {
    "url": "assets/404.html-HPCRh2sG.js",
    "revision": "1c85e722c80fa4836bea35f05bd786fc"
  }, {
    "url": "assets/2026-3-6.html-DrhBJiFs.js",
    "revision": "e000842fe145ecab1b7fe688202a48c5"
  }, {
    "url": "assets/2026-3-4.html-CYbToX4g.js",
    "revision": "c2ee2969fb8ea16ba7684e4c71b63bfd"
  }, {
    "url": "assets/2026-3-3.html-Cxu7ejkq.js",
    "revision": "4c4625ab24f7bb704be0930d3857de31"
  }, {
    "url": "assets/2026-3-16.html-Cd1w1KPn.js",
    "revision": "cb947021b2fcf3f3c7c5bcd36ddce260"
  }, {
    "url": "assets/2025-end.html-Bhn1oz2z.js",
    "revision": "1186fc96eb31901126de5b76157153b1"
  }, {
    "url": "assets/2024-end.html-CdgczU3C.js",
    "revision": "c5ffe292f27e0098d2346803012b9475"
  }, {
    "url": "index.html",
    "revision": "623266f2d4e0722d530201dfe4ffa80c"
  }, {
    "url": "404.html",
    "revision": "b89c33a27ef5f6bba01493832fc5e448"
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
