"use strict"
import * as model from './model.js';
import {updateView} from "./view.js";
import {initView} from "./view.js";
import * as data from './DataService.js';
let name, player, goOnline, startGame;
function reset() {
  model.viewState.history = "";
  model.viewState.activePlayer = "";
  model.viewState.newState = "invisible";
}

function init() {
  name = document.getElementById('name-input');
  startGame = document.getElementById('start-game-button');
  goOnline = document.getElementById('go-online-button');
  player = document.getElementById('player-div');
  initView();
  model.loadPlayersFromStorage();
  data.getRank(model.setRankingOutput, updateView);

  startGame.addEventListener('click', () => model.initNewGameSession(updateView, name.value));

  goOnline.addEventListener('click', () => {
    if (data.dataState.online) {
      model.viewState.online = "Server";
      data.dataState.online = false;
    } else {
      model.viewState.online = "Lokal";
      data.dataState.online = true;
    }
    reset();
    data.getRank(model.setRankingOutput, updateView);
  });

  player.addEventListener('click', (event) => {
    let playerSelection = event.target.id;
    data.getOutcome(Number(playerSelection), model.activePlayer, model.displayOutcome, updateView);
    data.getRank(model.setRankingOutput, updateView);
    model.viewState.newState = "disabled";
    updateView(model.viewState);

  });

}

window.addEventListener('load', init);
