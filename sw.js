// يحفظ المنصة وكل القوانين على الجهاز لتعمل دون إنترنت
const CACHE='jcpa2-202610212021';
const FILES=["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./data/accounting.js?v=202610212021", "./data/aml.js?v=202610212021", "./data/aqaba.js?v=202610212021", "./data/audit.js?v=202610212021", "./data/banks.js?v=202610212021", "./data/companies.js?v=202610212021", "./data/competition.js?v=202610212021", "./data/exams.js?v=202610212021", "./data/income.js?v=202610212021", "./data/insolvency.js?v=202610212021", "./data/insolvency_sys.js?v=202610212021", "./data/insurance.js?v=202610212021", "./data/integrity.js?v=202610212021", "./data/investment.js?v=202610212021", "./data/leasing.js?v=202610212021", "./data/sales.js?v=202610212021", "./data/securities.js?v=202610212021", "./data/social.js?v=202610212021", "./data/stamp.js?v=202610212021", "./data/trade.js?v=202610212021", "./data/whistle.js?v=202610212021"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE&&!k.startsWith('fonts')).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const u=new URL(e.request.url);
  if(/fonts\.(googleapis|gstatic)\.com/.test(u.host)){
    e.respondWith(caches.open('fonts').then(c=>c.match(e.request).then(r=>r||fetch(e.request).then(n=>{c.put(e.request,n.clone());return n}))));return;
  }
  if(u.pathname.includes('/data/')){e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));return}
  e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match('./index.html'))));
});
