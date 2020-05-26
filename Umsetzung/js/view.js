'use strict';
let errmsg, entries, history, outcome, name;
let serverSwitch, comResult, playerLabel;
let player, computer, historyTable, buttons;
let display;

export function initView() {
  errmsg = document.getElementById("err-msg");
  entries = document.getElementById("entries-ulist");
  history = document.getElementById("history-table-div");
  outcome = document.getElementById("outcome");
  serverSwitch = document.getElementById("server-switch-span");
  comResult = document.getElementById("com-result-input");
  playerLabel = document.getElementById("player-label");
  player = document.getElementById("player-div");
  computer = document.getElementById("computer-div");
  historyTable = document.getElementById("history-table");
  buttons = document.querySelectorAll('.local');
  name = document.getElementById('name-input');
  display = document.getElementById('count-down-span');
}

export function updateView(viewState) {
  errmsg.innerText = viewState.errMsg;
  entries.innerHTML = viewState.ranking;
  historyTable.innerHTML = viewState.history;
  outcome.innerText = viewState.outcome;
  serverSwitch.innerText = viewState.online;
  comResult.value = viewState.comResult;
  playerLabel.innerText = viewState.activePlayer;
  name.value = viewState.activePlayer;
  player.classList.replace(viewState.oldState, viewState.newState);
  computer.classList.replace(viewState.oldState, viewState.newState);
  history.classList.replace(viewState.oldState, viewState.newState);
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

  if (viewState.online === 'Server') {
    buttons.forEach((button) => button.classList.replace('server', 'local'));
  } else {
    buttons.forEach((button) => button.classList.replace('local', 'server'));
  }
}

function startTimer(viewState) {
  display.parentElement.hidden = false;
  let seconds = 2;
  let timer = setInterval(function () {
    display.innerText = String(seconds);

    if (--seconds < 0) {
      display.parentElement.hidden = true;
      display.innerText = 3;
      clearInterval(timer);
      viewState.newState = "enabled";
      updateView(viewState);
    }
  }, 1000);
}
