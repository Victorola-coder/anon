if(!self.define){let s,e={};const t=(t,a)=>(t=new URL(t+".js",a).href,e[t]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=t,s.onload=e,document.head.appendChild(s)}else s=t,importScripts(t),e()})).then((()=>{let s=e[t];if(!s)throw new Error(`Module ${t} didn’t register its module`);return s})));self.define=(a,n)=>{const i=s||("document"in self?document.currentScript.src:"")||location.href;if(e[i])return;let c={};const o=s=>t(s,i),l={module:{uri:i},exports:c,require:o};e[i]=Promise.all(a.map((s=>l[s]||o(s)))).then((s=>(n(...s),c)))}}define(["./workbox-1bb06f5e"],(function(s){"use strict";importScripts(),self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"fe4408c033199593ab12944634b0b70e"},{url:"/_next/static/chunks/1-ebac2ffef62a6c96.js",revision:"hhE1ssQH6y5l44lt-ooYA"},{url:"/_next/static/chunks/138-1305a2211346b83c.js",revision:"hhE1ssQH6y5l44lt-ooYA"},{url:"/_next/static/chunks/215-7d1c959f9a797f20.js",revision:"hhE1ssQH6y5l44lt-ooYA"},{url:"/_next/static/chunks/220-1cdbe7a9c651f6ec.js",revision:"hhE1ssQH6y5l44lt-ooYA"},{url:"/_next/static/chunks/4bd1b696-d155aa09db86789c.js",revision:"hhE1ssQH6y5l44lt-ooYA"},{url:"/_next/static/chunks/574-5ba6029eb34c68e7.js",revision:"hhE1ssQH6y5l44lt-ooYA"},{url:"/_next/static/chunks/68-38ae95496799f30d.js",revision:"hhE1ssQH6y5l44lt-ooYA"},{url:"/_next/static/chunks/754-bc1fb03f920d12b2.js",revision:"hhE1ssQH6y5l44lt-ooYA"},{url:"/_next/static/chunks/765-7996778509938a8e.js",revision:"hhE1ssQH6y5l44lt-ooYA"},{url:"/_next/static/chunks/776-03e441440a23c6bd.js",revision:"hhE1ssQH6y5l44lt-ooYA"},{url:"/_next/static/chunks/826-6a4e46c25cf8ea87.js",revision:"hhE1ssQH6y5l44lt-ooYA"},{url:"/_next/static/chunks/844-dab86a08d7e4ac54.js",revision:"hhE1ssQH6y5l44lt-ooYA"},{url:"/_next/static/chunks/ad2866b8-fd5911ae5fa3860d.js",revision:"hhE1ssQH6y5l44lt-ooYA"},{url:"/_next/static/chunks/app/(auth)/layout-ef0acab1f11246d9.js",revision:"hhE1ssQH6y5l44lt-ooYA"},{url:"/_next/static/chunks/app/(auth)/signin/page-43b949f91b356489.js",revision:"hhE1ssQH6y5l44lt-ooYA"},{url:"/_next/static/chunks/app/(auth)/signup/page-830dbd2e54cab8aa.js",revision:"hhE1ssQH6y5l44lt-ooYA"},{url:"/_next/static/chunks/app/(dashboard)/dashboard/page-85fe67da42b7bf34.js",revision:"hhE1ssQH6y5l44lt-ooYA"},{url:"/_next/static/chunks/app/(dashboard)/layout-5a976253c476ba6b.js",revision:"hhE1ssQH6y5l44lt-ooYA"},{url:"/_next/static/chunks/app/(dashboard)/messages/page-7f6b4d81c7672f27.js",revision:"hhE1ssQH6y5l44lt-ooYA"},{url:"/_next/static/chunks/app/(dashboard)/polls/page-c4b98560de53c4c0.js",revision:"hhE1ssQH6y5l44lt-ooYA"},{url:"/_next/static/chunks/app/(dashboard)/prompts/page-8379241b553c1cf0.js",revision:"hhE1ssQH6y5l44lt-ooYA"},{url:"/_next/static/chunks/app/(dashboard)/settings/page-0fcaf17d23e847b0.js",revision:"hhE1ssQH6y5l44lt-ooYA"},{url:"/_next/static/chunks/app/(public)/%5Busername%5D/layout-a0e3998e939a52cd.js",revision:"hhE1ssQH6y5l44lt-ooYA"},{url:"/_next/static/chunks/app/(public)/%5Busername%5D/page-60e1281a90d8cb62.js",revision:"hhE1ssQH6y5l44lt-ooYA"},{url:"/_next/static/chunks/app/_not-found/page-e67ebddc2aae341c.js",revision:"hhE1ssQH6y5l44lt-ooYA"},{url:"/_next/static/chunks/app/error-a52a77137081e4dd.js",revision:"hhE1ssQH6y5l44lt-ooYA"},{url:"/_next/static/chunks/app/layout-f3f2e4fb666c07b1.js",revision:"hhE1ssQH6y5l44lt-ooYA"},{url:"/_next/static/chunks/app/loading-def05b39abc3cb5a.js",revision:"hhE1ssQH6y5l44lt-ooYA"},{url:"/_next/static/chunks/app/not-found-b148b304f6961ffb.js",revision:"hhE1ssQH6y5l44lt-ooYA"},{url:"/_next/static/chunks/app/page-5404912dcbf55e3d.js",revision:"hhE1ssQH6y5l44lt-ooYA"},{url:"/_next/static/chunks/framework-d61873523a8b382f.js",revision:"hhE1ssQH6y5l44lt-ooYA"},{url:"/_next/static/chunks/main-app-a48c4c9e4f53e78d.js",revision:"hhE1ssQH6y5l44lt-ooYA"},{url:"/_next/static/chunks/main-dda011a254eeb32c.js",revision:"hhE1ssQH6y5l44lt-ooYA"},{url:"/_next/static/chunks/pages/_app-6a626577ffa902a4.js",revision:"hhE1ssQH6y5l44lt-ooYA"},{url:"/_next/static/chunks/pages/_error-1be831200e60c5c0.js",revision:"hhE1ssQH6y5l44lt-ooYA"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-1c4b78763f9d1e46.js",revision:"hhE1ssQH6y5l44lt-ooYA"},{url:"/_next/static/css/65aa3619a1925c9d.css",revision:"65aa3619a1925c9d"},{url:"/_next/static/css/a9747b319b2fa65e.css",revision:"a9747b319b2fa65e"},{url:"/_next/static/hhE1ssQH6y5l44lt-ooYA/_buildManifest.js",revision:"127abe4564b99f6e36452c3980c0061c"},{url:"/_next/static/hhE1ssQH6y5l44lt-ooYA/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/media/021bc4481ed92ece-s.woff2",revision:"0f5cb8880dd308345f58cecdc5fc5041"},{url:"/_next/static/media/3f69592b2fe603c7-s.woff2",revision:"84568c0a37620328592a78e9ad069d77"},{url:"/_next/static/media/4f05ba3a6752a328-s.p.woff2",revision:"ea21cc6e4b393851204d1a3160ad6abc"},{url:"/_next/static/media/6325a8417175c41d-s.woff2",revision:"a3fd0c427e31c0cadb48607ee8c7876b"},{url:"/_next/static/media/99b7f73d5af7c3e2-s.woff2",revision:"e94b5e20c27aefc321077e0493d637fa"},{url:"/images/logo.svg",revision:"a2760511c65806022ad20adf74370ff3"},{url:"/images/lolo.jpg",revision:"4d480dbb8c509cf5f7df73104407c614"}],{ignoreURLParametersMatching:[]}),s.cleanupOutdatedCaches(),s.registerRoute("/",new s.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:s,response:e,event:t,state:a})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new s.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new s.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),s.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new s.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),s.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new s.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\/_next\/image\?url=.+$/i,new s.StaleWhileRevalidate({cacheName:"next-image",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:mp3|wav|ogg)$/i,new s.CacheFirst({cacheName:"static-audio-assets",plugins:[new s.RangeRequestsPlugin,new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:mp4)$/i,new s.CacheFirst({cacheName:"static-video-assets",plugins:[new s.RangeRequestsPlugin,new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:js)$/i,new s.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:css|less)$/i,new s.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new s.StaleWhileRevalidate({cacheName:"next-data",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:json|xml|csv)$/i,new s.NetworkFirst({cacheName:"static-data-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>{if(!(self.origin===s.origin))return!1;const e=s.pathname;return!e.startsWith("/api/auth/")&&!!e.startsWith("/api/")}),new s.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>{if(!(self.origin===s.origin))return!1;return!s.pathname.startsWith("/api/")}),new s.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>!(self.origin===s.origin)),new s.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
