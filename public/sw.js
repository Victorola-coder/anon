<<<<<<< HEAD
if(!self.define){let e,s={};const n=(n,a)=>(n=new URL(n+".js",a).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(a,t)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let c={};const r=e=>n(e,i),o={module:{uri:i},exports:c,require:r};s[i]=Promise.all(a.map((e=>o[e]||r(e)))).then((e=>(t(...e),c)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"2e7a0df000929a8bc3de7f36caa9a054"},{url:"/_next/static/chunks/1-ebac2ffef62a6c96.js",revision:"nY5m97n4fLmBDawQlPZzT"},{url:"/_next/static/chunks/138-1305a2211346b83c.js",revision:"nY5m97n4fLmBDawQlPZzT"},{url:"/_next/static/chunks/215-7d1c959f9a797f20.js",revision:"nY5m97n4fLmBDawQlPZzT"},{url:"/_next/static/chunks/220-1cdbe7a9c651f6ec.js",revision:"nY5m97n4fLmBDawQlPZzT"},{url:"/_next/static/chunks/4bd1b696-d155aa09db86789c.js",revision:"nY5m97n4fLmBDawQlPZzT"},{url:"/_next/static/chunks/525-0d0b4e71bfbd7b42.js",revision:"nY5m97n4fLmBDawQlPZzT"},{url:"/_next/static/chunks/68-38ae95496799f30d.js",revision:"nY5m97n4fLmBDawQlPZzT"},{url:"/_next/static/chunks/754-bc1fb03f920d12b2.js",revision:"nY5m97n4fLmBDawQlPZzT"},{url:"/_next/static/chunks/765-7996778509938a8e.js",revision:"nY5m97n4fLmBDawQlPZzT"},{url:"/_next/static/chunks/776-03e441440a23c6bd.js",revision:"nY5m97n4fLmBDawQlPZzT"},{url:"/_next/static/chunks/826-6a4e46c25cf8ea87.js",revision:"nY5m97n4fLmBDawQlPZzT"},{url:"/_next/static/chunks/844-dab86a08d7e4ac54.js",revision:"nY5m97n4fLmBDawQlPZzT"},{url:"/_next/static/chunks/ad2866b8-fd5911ae5fa3860d.js",revision:"nY5m97n4fLmBDawQlPZzT"},{url:"/_next/static/chunks/app/(auth)/layout-c3d31c6e583d1430.js",revision:"nY5m97n4fLmBDawQlPZzT"},{url:"/_next/static/chunks/app/(auth)/signin/page-fbe41852cb8b0797.js",revision:"nY5m97n4fLmBDawQlPZzT"},{url:"/_next/static/chunks/app/(auth)/signup/page-416758072f3861a3.js",revision:"nY5m97n4fLmBDawQlPZzT"},{url:"/_next/static/chunks/app/(dashboard)/dashboard/page-2b11cade9ed98b95.js",revision:"nY5m97n4fLmBDawQlPZzT"},{url:"/_next/static/chunks/app/(dashboard)/layout-9fea8c89857832d4.js",revision:"nY5m97n4fLmBDawQlPZzT"},{url:"/_next/static/chunks/app/(dashboard)/messages/page-772a9439ee5b744b.js",revision:"nY5m97n4fLmBDawQlPZzT"},{url:"/_next/static/chunks/app/(dashboard)/polls/page-914a17953bbee892.js",revision:"nY5m97n4fLmBDawQlPZzT"},{url:"/_next/static/chunks/app/(dashboard)/prompts/page-392d1b4b23f89abc.js",revision:"nY5m97n4fLmBDawQlPZzT"},{url:"/_next/static/chunks/app/(dashboard)/settings/page-fce3adda6227ff48.js",revision:"nY5m97n4fLmBDawQlPZzT"},{url:"/_next/static/chunks/app/(public)/%5Busername%5D/layout-523c13bf843635c2.js",revision:"nY5m97n4fLmBDawQlPZzT"},{url:"/_next/static/chunks/app/(public)/%5Busername%5D/page-893acf6d7f481fee.js",revision:"nY5m97n4fLmBDawQlPZzT"},{url:"/_next/static/chunks/app/_not-found/page-e67ebddc2aae341c.js",revision:"nY5m97n4fLmBDawQlPZzT"},{url:"/_next/static/chunks/app/error-a53f62238b852ae6.js",revision:"nY5m97n4fLmBDawQlPZzT"},{url:"/_next/static/chunks/app/layout-ce0dc016fbad5e3e.js",revision:"nY5m97n4fLmBDawQlPZzT"},{url:"/_next/static/chunks/app/loading-fdbfbb133815ed42.js",revision:"nY5m97n4fLmBDawQlPZzT"},{url:"/_next/static/chunks/app/not-found-2b80540ef26629c1.js",revision:"nY5m97n4fLmBDawQlPZzT"},{url:"/_next/static/chunks/app/page-05a33545fe9c268c.js",revision:"nY5m97n4fLmBDawQlPZzT"},{url:"/_next/static/chunks/framework-d61873523a8b382f.js",revision:"nY5m97n4fLmBDawQlPZzT"},{url:"/_next/static/chunks/main-0fc00b9bc5909486.js",revision:"nY5m97n4fLmBDawQlPZzT"},{url:"/_next/static/chunks/main-app-12c1ef59e0abd558.js",revision:"nY5m97n4fLmBDawQlPZzT"},{url:"/_next/static/chunks/pages/_app-6a626577ffa902a4.js",revision:"nY5m97n4fLmBDawQlPZzT"},{url:"/_next/static/chunks/pages/_error-1be831200e60c5c0.js",revision:"nY5m97n4fLmBDawQlPZzT"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-acde9461eb71c067.js",revision:"nY5m97n4fLmBDawQlPZzT"},{url:"/_next/static/css/65aa3619a1925c9d.css",revision:"65aa3619a1925c9d"},{url:"/_next/static/css/c4c1eed38c68cddf.css",revision:"c4c1eed38c68cddf"},{url:"/_next/static/media/021bc4481ed92ece-s.woff2",revision:"0f5cb8880dd308345f58cecdc5fc5041"},{url:"/_next/static/media/3f69592b2fe603c7-s.woff2",revision:"84568c0a37620328592a78e9ad069d77"},{url:"/_next/static/media/4f05ba3a6752a328-s.p.woff2",revision:"ea21cc6e4b393851204d1a3160ad6abc"},{url:"/_next/static/media/6325a8417175c41d-s.woff2",revision:"a3fd0c427e31c0cadb48607ee8c7876b"},{url:"/_next/static/media/99b7f73d5af7c3e2-s.woff2",revision:"e94b5e20c27aefc321077e0493d637fa"},{url:"/_next/static/nY5m97n4fLmBDawQlPZzT/_buildManifest.js",revision:"127abe4564b99f6e36452c3980c0061c"},{url:"/_next/static/nY5m97n4fLmBDawQlPZzT/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/images/logo.svg",revision:"a2760511c65806022ad20adf74370ff3"},{url:"/images/lolo.jpg",revision:"4d480dbb8c509cf5f7df73104407c614"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
=======
if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,t)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(s[a])return;let c={};const r=e=>i(e,a),o={module:{uri:a},exports:c,require:r};s[a]=Promise.all(n.map((e=>o[e]||r(e)))).then((e=>(t(...e),c)))}}define(["./workbox-1bb06f5e"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"738c4c9215ba9e041823fc16494824cd"},{url:"/_next/static/RLn1jEi12BvGitz9vzSxX/_buildManifest.js",revision:"127abe4564b99f6e36452c3980c0061c"},{url:"/_next/static/RLn1jEi12BvGitz9vzSxX/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/1-ebac2ffef62a6c96.js",revision:"RLn1jEi12BvGitz9vzSxX"},{url:"/_next/static/chunks/138-1305a2211346b83c.js",revision:"RLn1jEi12BvGitz9vzSxX"},{url:"/_next/static/chunks/215-7d1c959f9a797f20.js",revision:"RLn1jEi12BvGitz9vzSxX"},{url:"/_next/static/chunks/220-1cdbe7a9c651f6ec.js",revision:"RLn1jEi12BvGitz9vzSxX"},{url:"/_next/static/chunks/4bd1b696-d155aa09db86789c.js",revision:"RLn1jEi12BvGitz9vzSxX"},{url:"/_next/static/chunks/574-53248cf4870034d1.js",revision:"RLn1jEi12BvGitz9vzSxX"},{url:"/_next/static/chunks/68-38ae95496799f30d.js",revision:"RLn1jEi12BvGitz9vzSxX"},{url:"/_next/static/chunks/754-bc1fb03f920d12b2.js",revision:"RLn1jEi12BvGitz9vzSxX"},{url:"/_next/static/chunks/765-7996778509938a8e.js",revision:"RLn1jEi12BvGitz9vzSxX"},{url:"/_next/static/chunks/776-03e441440a23c6bd.js",revision:"RLn1jEi12BvGitz9vzSxX"},{url:"/_next/static/chunks/826-6a4e46c25cf8ea87.js",revision:"RLn1jEi12BvGitz9vzSxX"},{url:"/_next/static/chunks/844-dab86a08d7e4ac54.js",revision:"RLn1jEi12BvGitz9vzSxX"},{url:"/_next/static/chunks/ad2866b8-fd5911ae5fa3860d.js",revision:"RLn1jEi12BvGitz9vzSxX"},{url:"/_next/static/chunks/app/(auth)/layout-ef0acab1f11246d9.js",revision:"RLn1jEi12BvGitz9vzSxX"},{url:"/_next/static/chunks/app/(auth)/signin/page-43b949f91b356489.js",revision:"RLn1jEi12BvGitz9vzSxX"},{url:"/_next/static/chunks/app/(auth)/signup/page-830dbd2e54cab8aa.js",revision:"RLn1jEi12BvGitz9vzSxX"},{url:"/_next/static/chunks/app/(dashboard)/dashboard/page-85fe67da42b7bf34.js",revision:"RLn1jEi12BvGitz9vzSxX"},{url:"/_next/static/chunks/app/(dashboard)/layout-5a976253c476ba6b.js",revision:"RLn1jEi12BvGitz9vzSxX"},{url:"/_next/static/chunks/app/(dashboard)/messages/page-7f6b4d81c7672f27.js",revision:"RLn1jEi12BvGitz9vzSxX"},{url:"/_next/static/chunks/app/(dashboard)/polls/page-c4b98560de53c4c0.js",revision:"RLn1jEi12BvGitz9vzSxX"},{url:"/_next/static/chunks/app/(dashboard)/prompts/page-8379241b553c1cf0.js",revision:"RLn1jEi12BvGitz9vzSxX"},{url:"/_next/static/chunks/app/(dashboard)/settings/page-0fcaf17d23e847b0.js",revision:"RLn1jEi12BvGitz9vzSxX"},{url:"/_next/static/chunks/app/(public)/%5Busername%5D/layout-a0e3998e939a52cd.js",revision:"RLn1jEi12BvGitz9vzSxX"},{url:"/_next/static/chunks/app/(public)/%5Busername%5D/page-60e1281a90d8cb62.js",revision:"RLn1jEi12BvGitz9vzSxX"},{url:"/_next/static/chunks/app/_not-found/page-e67ebddc2aae341c.js",revision:"RLn1jEi12BvGitz9vzSxX"},{url:"/_next/static/chunks/app/error-a52a77137081e4dd.js",revision:"RLn1jEi12BvGitz9vzSxX"},{url:"/_next/static/chunks/app/layout-f3f2e4fb666c07b1.js",revision:"RLn1jEi12BvGitz9vzSxX"},{url:"/_next/static/chunks/app/loading-def05b39abc3cb5a.js",revision:"RLn1jEi12BvGitz9vzSxX"},{url:"/_next/static/chunks/app/not-found-b148b304f6961ffb.js",revision:"RLn1jEi12BvGitz9vzSxX"},{url:"/_next/static/chunks/app/page-5404912dcbf55e3d.js",revision:"RLn1jEi12BvGitz9vzSxX"},{url:"/_next/static/chunks/framework-d61873523a8b382f.js",revision:"RLn1jEi12BvGitz9vzSxX"},{url:"/_next/static/chunks/main-app-a48c4c9e4f53e78d.js",revision:"RLn1jEi12BvGitz9vzSxX"},{url:"/_next/static/chunks/main-dda011a254eeb32c.js",revision:"RLn1jEi12BvGitz9vzSxX"},{url:"/_next/static/chunks/pages/_app-6a626577ffa902a4.js",revision:"RLn1jEi12BvGitz9vzSxX"},{url:"/_next/static/chunks/pages/_error-1be831200e60c5c0.js",revision:"RLn1jEi12BvGitz9vzSxX"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-1c4b78763f9d1e46.js",revision:"RLn1jEi12BvGitz9vzSxX"},{url:"/_next/static/css/65aa3619a1925c9d.css",revision:"65aa3619a1925c9d"},{url:"/_next/static/css/c4c1eed38c68cddf.css",revision:"c4c1eed38c68cddf"},{url:"/_next/static/media/021bc4481ed92ece-s.woff2",revision:"0f5cb8880dd308345f58cecdc5fc5041"},{url:"/_next/static/media/3f69592b2fe603c7-s.woff2",revision:"84568c0a37620328592a78e9ad069d77"},{url:"/_next/static/media/4f05ba3a6752a328-s.p.woff2",revision:"ea21cc6e4b393851204d1a3160ad6abc"},{url:"/_next/static/media/6325a8417175c41d-s.woff2",revision:"a3fd0c427e31c0cadb48607ee8c7876b"},{url:"/_next/static/media/99b7f73d5af7c3e2-s.woff2",revision:"e94b5e20c27aefc321077e0493d637fa"},{url:"/images/logo.svg",revision:"a2760511c65806022ad20adf74370ff3"},{url:"/images/lolo.jpg",revision:"4d480dbb8c509cf5f7df73104407c614"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:i,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
>>>>>>> d6303eb763a442a9a207cc4029af153304d971d0
