const $=x=>document.getElementById(x);let cat="Wörter",current=null,question=null,stars=+(localStorage.getItem("kkstars")||0);$("stars").textContent=stars;
let goal=+(localStorage.getItem("kkgoal")||20);
function todayKey(){let d=new Date();return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()}
function dailyCount(){if(localStorage.getItem("kkday")!==todayKey()){localStorage.setItem("kkday",todayKey());localStorage.setItem("kkdaily","0")}return +(localStorage.getItem("kkdaily")||0)}
function updateProgress(){let d=dailyCount();$("daily").textContent=d+"/"+goal;let gv=$("goalValue");if(gv)gv.textContent=goal}
function addDaily(){let d=dailyCount()+1;localStorage.setItem("kkdaily",d);updateProgress()}
function changeGoal(n){goal=Math.max(5,Math.min(100,goal+n));localStorage.setItem("kkgoal",goal);updateProgress()}
function resetToday(){localStorage.setItem("kkday",todayKey());localStorage.setItem("kkdaily","0");updateProgress()}
function resetStars(){stars=0;localStorage.setItem("kkstars","0");$("stars").textContent=0}
let db;const req=indexedDB.open("KantoKidsAudio",1);req.onupgradeneeded=e=>e.target.result.createObjectStore("clips");req.onsuccess=e=>db=e.target.result;
function getClip(id){return new Promise(res=>{if(!db)return res(null);let r=db.transaction("clips").objectStore("clips").get(id);r.onsuccess=()=>res(r.result||null);r.onerror=()=>res(null)})}
function blobToDataURL(blob){return new Promise((res,rej)=>{let r=new FileReader();r.onload=()=>res(r.result);r.onerror=()=>rej(r.error);r.readAsDataURL(blob)})}
function dataURLToBlob(data){let p=data.indexOf(",");if(p<0)throw new Error("Ungültige Audiodatei");let meta=data.slice(0,p),bin=atob(data.slice(p+1)),a=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)a[i]=bin.charCodeAt(i);let m=/^data:([^;]+)/.exec(meta);return new Blob([a],{type:m?m[1]:"audio/webm"})}
async function exportAudio(){
 let msg=$("backupMsg");try{
  if(!db)throw new Error("Audiospeicher ist noch nicht bereit.");
  msg.textContent="Backup wird erstellt …";
  let entries=await new Promise((res,rej)=>{let out=[],r=db.transaction("clips").objectStore("clips").openCursor();r.onsuccess=e=>{let c=e.target.result;if(c){out.push([c.key,c.value]);c.continue()}else res(out)};r.onerror=()=>rej(r.error)});
  if(!entries.length){msg.textContent="Keine eigenen Aufnahmen in dieser App-Installation gefunden.";return}
  let clips=[];for(let [id,blob] of entries)clips.push({id:String(id),audio:await blobToDataURL(blob)});
  let backup={format:"KantoKidsAudioBackup",version:1,created:new Date().toISOString(),clips};
  let file=new Blob([JSON.stringify(backup)],{type:"application/json"}),url=URL.createObjectURL(file),a=document.createElement("a");
  a.href=url;a.download="KantoKids-Audio-Backup-"+new Date().toISOString().slice(0,10)+".json";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);
  msg.textContent="✓ "+clips.length+" Aufnahmen gesichert. Bewahre die Backup-Datei gut auf.";
 }catch(e){msg.textContent="Backup fehlgeschlagen: "+e.message}
}
function chooseAudioBackup(){$("backupFile").click()}
async function importAudio(ev){
 let msg=$("backupMsg"),file=ev.target.files&&ev.target.files[0];if(!file)return;
 try{
  if(!db)throw new Error("Audiospeicher ist noch nicht bereit.");
  let backup=JSON.parse(await file.text());
  if(!backup||backup.format!=="KantoKidsAudioBackup"||!Array.isArray(backup.clips))throw new Error("Das ist kein gültiges KantoKids-Audio-Backup.");
  let existing=0;for(let c of backup.clips)if(await getClip(c.id))existing++;
  if(existing&&!confirm(existing+" vorhandene Aufnahme(n) würden durch das Backup ersetzt. Fortfahren?")){msg.textContent="Wiederherstellung abgebrochen.";ev.target.value="";return}
  msg.textContent="Aufnahmen werden wiederhergestellt …";
  let clips=backup.clips.map(c=>({id:c.id,blob:dataURLToBlob(c.audio)}));
  await new Promise((res,rej)=>{let t=db.transaction("clips","readwrite"),store=t.objectStore("clips");for(let c of clips)store.put(c.blob,c.id);t.oncomplete=res;t.onerror=()=>rej(t.error);t.onabort=()=>rej(t.error)});
  msg.textContent="✓ "+clips.length+" Aufnahmen wiederhergestellt.";if(recItem)prepareRec(recItem.id);
 }catch(e){msg.textContent="Wiederherstellung fehlgeschlagen: "+e.message}
 ev.target.value="";
}
async function play(x){let blob=await getClip(x.id);if(blob){new Audio(URL.createObjectURL(blob)).play();return} speechSynthesis.cancel();let u=new SpeechSynthesisUtterance(x.canto),vs=speechSynthesis.getVoices();u.voice=vs.find(v=>/yue|Hong Kong|zh-HK/i.test(v.lang+" "+v.name))||null;u.lang="zh-HK";u.rate=.78;speechSynthesis.speak(u)}
function list(){return ITEMS.filter(x=>x.cat===cat)}function setItem(x,doPlay=true){current=x;$("be").textContent=x.cat==="Zahlen"?x.de:x.emoji;$("bc").textContent=x.canto;$("bj").textContent=x.jyut;$("bd").textContent=x.de;if(doPlay)play(x)}
function render(){let a=list();$("grid").innerHTML=a.map((x,i)=>`<div class=card onclick="setItem(ITEMS.find(y=>y.id==='${x.id}'))"><div class=e>${x.cat==="Zahlen"?x.de:x.emoji}</div><div class=h>${x.canto}</div><div class=j>${x.jyut}</div></div>`).join("");setItem(a[0],false)}
function setCat(c){cat=c;render();renderFilters()}function renderFilters(){$("filters").innerHTML=["Wörter","Zahlen","Alltag","Familie","Aktivitäten"].map(c=>`<button onclick="setCat('${c}')">${c}</button>`).join("")}
function next(){let a=list(),i=a.findIndex(x=>x.id===current.id);setItem(a[(i+1)%a.length])}
let parentUnlocked=false;
function unlockParent(){
 let pin=prompt("Elternbereich – PIN eingeben:");
 if(pin===null)return false;
 if(pin==="1990"){parentUnlocked=true;return true}
 alert("PIN ist nicht korrekt.");return false
}
function lockParent(){parentUnlocked=false;view("learn")}
function view(v){if(v==="parent"&&!parentUnlocked&&!unlockParent())return;["learn","game","parent"].forEach(x=>$(x).style.display=x===v?"block":"none");["Learn","Game","Parent"].forEach(x=>$("n"+x).className=x.toLowerCase()===v?"on":"");if(v==="game")newGame();if(v==="parent"){renderParent();prepareRec(recItem?recItem.id:ITEMS[0].id)}}
function newGame(){let pool=list();question=pool[Math.floor(Math.random()*pool.length)];let o=[question];while(o.length<Math.min(4,pool.length)){let x=pool[Math.floor(Math.random()*pool.length)];if(!o.includes(x))o.push(x)}o.sort(()=>Math.random()-.5);$("answers").innerHTML=o.map(x=>`<button class=answer onclick="guess('${x.id}')">${x.cat==="Zahlen"?x.de:x.emoji+" "+x.de}</button>`).join("");$("gmsg").textContent="";setTimeout(()=>play(question),250)}
function guess(id){if(id===question.id){stars++;localStorage.setItem("kkstars",stars);$("stars").textContent=stars;addDaily();$("gmsg").textContent="⭐ 好嘢!";setTimeout(newGame,700)}else{$("gmsg").textContent="再聽一次 👂";play(question)}}
let recorder,chunks=[],recItem=null,recIndex=0,touchX=null;
function renderParent(){let q=($("search").value||"").toLowerCase(),a=ITEMS.filter(x=>(x.canto+x.jyut+x.de).toLowerCase().includes(q)).slice(0,140);$("plist").innerHTML=a.map(x=>`<div class=parentItem onclick="prepareRec('${x.id}')"><b>${x.cat==="Zahlen"?x.de+" · ":""}${x.canto}</b> · ${x.jyut}<br>${x.de}</div>`).join("")}
async function prepareRec(id){
 recItem=ITEMS.find(x=>x.id===id);recIndex=ITEMS.findIndex(x=>x.id===id);let has=await getClip(id);
 $("recbox").innerHTML=`<div class=parentItem id=reccard style="text-align:center">
 <div style="font-size:13px;color:#756">${recIndex+1} / ${ITEMS.length} · ${recItem.cat}</div>
 <div style="font-size:46px;font-weight:900;margin-top:5px">${recItem.cat==="Zahlen"?recItem.de+" · ":""}${recItem.canto}</div>
 <div style="font-size:19px;color:#755e39">${recItem.jyut}</div><div style="font-size:18px">${recItem.de}</div>
 <div class=row><button class=light onclick="prevRec()">← Zurück</button><button id=recbtn class=rec onclick="toggleRec()">🔴 Aufnehmen</button><button class=light onclick="nextRec()">Weiter →</button></div>
 ${has?`<div class=row><button class=light onclick="play(recItem)">▶️ Aufnahme anhören</button><button class=light onclick="deleteRec()">🗑️ Löschen</button></div>`:""}
 <div class=status id=rmsg>${has?"✓ Eigene Aufnahme gespeichert":""}</div>
 <small>← / → wischen funktioniert ebenfalls</small></div>`;
 let card=$("reccard");card.addEventListener("touchstart",e=>touchX=e.changedTouches[0].screenX,{passive:true});
 card.addEventListener("touchend",e=>{if(touchX===null)return;let dx=e.changedTouches[0].screenX-touchX;touchX=null;if(Math.abs(dx)>55){dx<0?nextRec():prevRec()}},{passive:true});
 window.scrollTo({top:0,behavior:"smooth"})
}
function nextRec(){let i=(recIndex+1)%ITEMS.length;prepareRec(ITEMS[i].id)}
function prevRec(){let i=(recIndex-1+ITEMS.length)%ITEMS.length;prepareRec(ITEMS[i].id)}
async function toggleRec(){if(recorder&&recorder.state==="recording"){recorder.stop();return}try{let s=await navigator.mediaDevices.getUserMedia({audio:true});chunks=[];recorder=new MediaRecorder(s);recorder.ondataavailable=e=>chunks.push(e.data);recorder.onstop=()=>{let blob=new Blob(chunks,{type:recorder.mimeType});let t=db.transaction("clips","readwrite");t.objectStore("clips").put(blob,recItem.id);t.oncomplete=()=>prepareRec(recItem.id);s.getTracks().forEach(t=>t.stop())};recorder.start();$("recbtn").textContent="⏹ Speichern";$("recbtn").classList.add("recording");$("rmsg").textContent="Sprich jetzt: "+recItem.canto}catch(e){$("rmsg").textContent="Mikrofonzugriff wurde nicht erlaubt."}}
function deleteRec(){let t=db.transaction("clips","readwrite");t.objectStore("clips").delete(recItem.id);t.oncomplete=()=>prepareRec(recItem.id)}
renderFilters();render();updateProgress();
if("serviceWorker"in navigator){
 navigator.serviceWorker.register("sw.js").then(reg=>reg.update()).catch(()=>{});
}
