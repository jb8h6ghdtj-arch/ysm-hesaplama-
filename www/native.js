// YSM Hesaplama – Android köprüsü: önizlemedeki görsel/PDF'i Android paylaş menüsüyle gönderir
(function(){
  var C = window.Capacitor;
  if (!C || !C.isNativePlatform || !C.isNativePlatform()) return;
  var P = C.Plugins;
  function b64(blob){ return new Promise(function(res, rej){ var r = new FileReader();
    r.onload = function(){ res(String(r.result).split(',')[1]); }; r.onerror = rej; r.readAsDataURL(blob); }); }
  function safe(name){ return name.replace(/[ğĞ]/g,'g').replace(/[üÜ]/g,'u').replace(/[şŞ]/g,'s').replace(/[ıİ]/g,'i').replace(/[öÖ]/g,'o').replace(/[çÇ]/g,'c').replace(/×/g,'x').replace(/[^A-Za-z0-9._,-]+/g,'-'); }
  async function file(cur){
    var w = await P.Filesystem.writeFile({ path: safe(cur.fname), data: await b64(cur.blob), directory: 'CACHE' });
    return w.uri;
  }
  window.YSMNative = {
    share: async function(cur, text){
      var uri = await file(cur);
      await P.Share.share({ title: 'YSM Malzeme Listesi', text: text, files: [uri], dialogTitle: 'WhatsApp ile gönder' });
    },
    save: async function(cur){
      var uri = await file(cur);
      await P.Share.share({ title: cur.fname, files: [uri], dialogTitle: 'Kaydet veya paylaş' });
    }
  };
})();
