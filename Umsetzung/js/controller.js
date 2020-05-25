"use strict"
import * as model from './model.js';
import {updateView} from "./view.js";
import {initView} from "./view.js";
import * as data from './DataService.js';

function reset() {
  model.viewState.history = "";
  model.viewState.activePlayer = "";
  model.viewState.newState = "invisible";
}

function init() {
  initView();
  model.loadPlayersFromStorage();
  model.setRankingOutput(updateView);
  updateView(model.viewState);
  document.getElementById('startGame').addEventListener('click', () => model.initNewGameSession(updateView));
  document.getElementById('goOnline').addEventListener('click', () => {
    if (data.dataState.online) {
      data.dataState.online = false;
      model.viewState.online = "Server";
      reset();
      model.setRankingOutput(updateView);
    } else {
      model.viewState.online = "Lokal";
      reset();
      data.dataState.online = true;
      data.getRank(model.setRankingOutput, updateView);
    }

  });

  for (let button of document.getElementsByClassName("selector")) {

    button.addEventListener('click', () => {
      let playerSelection = button.id;
      if (data.dataState.online) {
        data.getServerSelection(model.getResultText(Number(playerSelection)), model.activePlayer, model.displayOutcome, updateView);
        data.getRank(model.setRankingOutput, updateView);
      } else {
        model.getOutcome(Number(playerSelection), updateView);
        model.setRankingOutput(updateView);
      }
      model.viewState.newState = "disabled";
      updateView(model.viewState);

    });
  }
}

window.addEventListener('load', init);
