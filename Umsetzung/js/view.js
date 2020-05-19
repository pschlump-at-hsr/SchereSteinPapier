'use strict';
export let viewState = {
  ranking: "",
  errMsg: "",
  outcome: "",
  oldState: "invisible",
  newState: "invisible",
  activePlayer: "",
  comResult: "",
  history: "<tr><th>Resultat</th><th>Spieler</th><th>Gegner</th></tr>"
}


export function updateView() {
  document.getElementById("errmsg").innerText = viewState.errMsg;
  document.getElementById("entries").innerHTML = viewState.ranking;
  document.getElementById("history").innerHTML = viewState.history;
  document.getElementById("outcome").innerText = viewState.outcome;
  document.getElementById("comResult").value = viewState.comResult;
  document.getElementById("playerLabel").innerText = viewState.activePlayer;
  document.getElementById("player").classList.replace(viewState.oldState, viewState.newState);
  document.getElementById("computer").classList.replace(viewState.oldState, viewState.newState);
  document.getElementById("historyTable").classList.replace(viewState.oldState, viewState.newState);
  viewState.oldState = viewState.newState;
  for (let parent of document.getElementsByClassName(viewState.newState)) {
    for (let child of parent.children) {
      switch (viewState.newState) {
        case "invisible":
          break;
        case "enabled":
          child.disabled = false;
          break;
        case "disabled":
          child.disabled = true;
          break;
      }
    }
  }
}

export function startTimer() {
  let display = document.querySelector('#countDown');
  display.parentElement.hidden = false;
  let seconds = 5;
  let timer = setInterval(function () {
    display.innerText = String(seconds);

    if (--seconds < 0) {
     display.parentElement.hidden = true;
     display.innerText = 5;
     clearInterval(timer);
     viewState.newState = "enabled";
     updateView();
    }
  }, 1000);
}
