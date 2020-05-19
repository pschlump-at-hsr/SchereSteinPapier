"use strict"
import * as model from './model.js';
import * as view from './view.js';


function init() {
  model.loadPlayersFromStorage();
  model.setRankingOutput(view.viewState);
  view.updateView();
  document.getElementById('startGame').addEventListener('click', () => model.initNewGameSession(view.updateView, view.viewState ));

  for (let button of document.getElementsByClassName("selector")) {

    button.addEventListener('click', () => {
      let playerSelection = button.id;
      model.getOutcome(playerSelection, view.viewState);
      view.viewState.newState = "disabled";
      view.updateView();
      view.startTimer();

    });
  }
}

window.addEventListener('load', init);
