// KantoKids V2.6 – Farben + Spiel-Feedback
window.ITEMS.push(...[{"id":"color-red","emoji":"🔴","canto":"紅色","jyut":"hung4 sik1","de":"Rot","cat":"Farben"},{"id":"color-blue","emoji":"🔵","canto":"藍色","jyut":"laam4 sik1","de":"Blau","cat":"Farben"},{"id":"color-yellow","emoji":"🟡","canto":"黃色","jyut":"wong4 sik1","de":"Gelb","cat":"Farben"},{"id":"color-green","emoji":"🟢","canto":"綠色","jyut":"luk6 sik1","de":"Grün","cat":"Farben"},{"id":"color-orange","emoji":"🟠","canto":"橙色","jyut":"caang2 sik1","de":"Orange","cat":"Farben"},{"id":"color-purple","emoji":"🟣","canto":"紫色","jyut":"zi2 sik1","de":"Lila","cat":"Farben"},{"id":"color-pink","emoji":"🌸","canto":"粉紅色","jyut":"fan2 hung4 sik1","de":"Rosa","cat":"Farben"},{"id":"color-brown","emoji":"🟤","canto":"啡色","jyut":"fe1 sik1","de":"Braun","cat":"Farben"},{"id":"color-black","emoji":"⚫","canto":"黑色","jyut":"hak1 sik1","de":"Schwarz","cat":"Farben"},{"id":"color-white","emoji":"⚪","canto":"白色","jyut":"baak6 sik1","de":"Weiß","cat":"Farben"},{"id":"color-grey","emoji":"🩶","canto":"灰色","jyut":"fui1 sik1","de":"Grau","cat":"Farben"}]);

renderFilters=function(){
  $("filters").innerHTML=["Wörter","Zahlen","Farben","Alltag","Familie","Aktivitäten"]
    .map(c=>`<button onclick="setCat('${c}')">${c}</button>`).join("")
};

newGame=function(){
  let pool=list();
  question=pool[Math.floor(Math.random()*pool.length)];
  let o=[question];
  while(o.length<Math.min(4,pool.length)){
    let x=pool[Math.floor(Math.random()*pool.length)];
    if(!o.includes(x))o.push(x)
  }
  o.sort(()=>Math.random()-.5);
  $("answers").innerHTML=o.map(x=>`<button id="ans-${x.id}" class="answer" onclick="guess('${x.id}')">${x.cat==="Zahlen"?x.de:x.emoji+" "+x.de}</button>`).join("");
  $("gmsg").textContent="";
  setTimeout(()=>play(question),250)
};

guess=function(id){
  let b=$("ans-"+id);
  if(id===question.id){
    if(b)b.classList.add("correct");
    document.querySelectorAll("#answers .answer").forEach(x=>x.disabled=true);
    stars++;
    localStorage.setItem("kkstars",stars);
    $("stars").textContent=stars;
    addDaily();
    $("gmsg").textContent="⭐ 好嘢!";
    setTimeout(newGame,900)
  }else{
    if(b){b.classList.add("wrong");b.disabled=true}
    $("gmsg").textContent="再聽一次 👂";
    play(question)
  }
};

renderFilters();
