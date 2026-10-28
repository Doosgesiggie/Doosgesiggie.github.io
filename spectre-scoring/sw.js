/* Placeholder service worker: replaces the old cache-first worker, clears its caches and unregisters.
   It touches Cache Storage only. localStorage and IndexedDB (match data, signatures) are left alone. */
self.addEventListener("install", function(){ self.skipWaiting(); });
self.addEventListener("activate", function(e){
  e.waitUntil(caches.keys().then(function(ks){ return Promise.all(ks.map(function(k){ return caches.delete(k); })); })
    .then(function(){ return self.registration.unregister(); })
    .then(function(){ return self.clients.matchAll({ type: "window" }); })
    .then(function(cs){ cs.forEach(function(c){ try{ c.navigate(c.url); }catch(_){} }); }));
});
/* no fetch handler: every request goes to the network (the placeholder pages) */
