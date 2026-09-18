const C='kk-v9';
const A=['./','index.html','app.js','data.js','manifest.webmanifest','icon.svg'];

self.addEventListener('install',e=>{
  self.skipWaiting();
  e.waitUntil(caches.open(C).then(c=>c.addAll(A)));
});

self.addEventListener('activate',e=>{
  e.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(k=>k!==C).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const u=new URL(e.request.url);
  const isAppFile=u.origin===self.location.origin &&
    (e.request.mode==='navigate' || /\/(index\.html|app\.js|data\.js)$/.test(u.pathname));

  if(isAppFile){
    e.respondWith(
      fetch(e.request).then(r=>{
        if(r&&r.ok){
          const copy=r.clone();
          caches.open(C).then(c=>c.put(e.request,copy));
        }
        return r;
      }).catch(()=>caches.match(e.request).then(r=>r||caches.match('./')))
    );
  }else{
    e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
  }
});
