let player = new Map();

function init() {
  if (localStorage.length > 0){
    for(let i = 0;i < localStorage.length ; i++){
      console.log("Spieler "+localStorage.key(i)+" mit "+localStorage.getItem(localStorage.key(i))+" Punkten hinzugefügt");
      player.set(localStorage.key(i), localStorage.getItem(localStorage.key(i)));
    }
  }
  displayRanking();
  document.getElementById('startGame').addEventListener('click', function () {

    let playerTextBox = document.getElementById('name');
    let errmsg  = document.getElementById('errmsg');
    if (playerTextBox.value < 3) {
      errmsg.innerHTML="Mindestens 3 Zeichen eingeben!";
    } else {
      errmsg.innerHTML="";
      if (typeof player.get(playerTextBox.value) == 'undefined') {
        player.set(playerTextBox.value, 0);
        localStorage.setItem(playerTextBox.value, '0');
        console.log(playerTextBox.value + " wurde dem Storage hinzugefügt.");
        displayRanking();
      }
      startGame(playerTextBox.value);
    }
  });
}
function startGame(activePlayer) {
  document.getElementById("gamer").innerText = activePlayer;
}

function displayRanking() {
  let ranking = "";
  let rank = 1;
  player[Symbol.iterator] = function* () {
    yield* [...this.entries()].sort((a,b) => b[1]-a[1]);
  }
  for (let [key, value] of player) {
    console.log("Spieler "+key+" mit "+value+" Siegen");
   ranking +="<li><h2>" + rank + ". Rang mit "+ value + " Punkten</h2><p>" + key + "</p></li>";
    rank++;
  }
  document.getElementById('entries').innerHTML = ranking;
}
window.addEventListener('load', init);
