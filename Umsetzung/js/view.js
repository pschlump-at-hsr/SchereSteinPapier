'use strict';
let errmsg, entries, history, outcome, name;
let serverSwitch, comResult, playerLabel;
let player, computer, historyTable, buttons;




export function initView() {
  errmsg        = document.getElementById("errmsg");
  entries       = document.getElementById("entries");
  history       = document.getElementById("history");
  outcome       = document.getElementById("outcome");
  serverSwitch  = document.getElementById("serverSwitch");
  comResult     = document.getElementById("comResult");
  playerLabel   = document.getElementById("playerLabel");
  player        = document.getElementById("player");
  computer      = document.getElementById("computer");
  historyTable  = document.getElementById("historyTable");
  buttons       = document.querySelectorAll('.local');
  name       = document.getElementById('name');
}

export function updateView(viewState) {
  errmsg.innerText = viewState.errMsg;
  entries.innerHTML = viewState.ranking;
  history.innerHTML = viewState.history;
  outcome.innerText = viewState.outcome;
  serverSwitch.innerText = viewState.online;
  comResult.value = viewState.comResult;
  playerLabel.innerText = viewState.activePlayer;
  name.value = viewState.activePlayer;
  player.classList.replace(viewState.oldState, viewState.newState);
  computer.classList.replace(viewState.oldState, viewState.newState);
  historyTable.classList.replace(viewState.oldState, viewState.newState);

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
          startTimer(viewState);
          break;
      }
    }
  }

  if(viewState.online === 'Server'){
    buttons.forEach((button) => button.classList.replace('server', 'local'));
  } else {
    buttons.forEach((button) => button.classList.replace('local', 'server'));
  }
}

function startTimer(viewState) {
  let display = document.querySelector('#countDown');
  display.parentElement.hidden = false;
  let seconds = 2;
  let timer = setInterval(function () {
    display.innerText = String(seconds);

    if (--seconds < 0) {
     display.parentElement.hidden = true;
     display.innerText = 2;
     clearInterval(timer);
     viewState.newState = "enabled";
     updateView(viewState);
    }
  }, 1000);
}
