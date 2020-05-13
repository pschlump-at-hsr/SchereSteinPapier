import http from 'http';
import url from 'url';
import {getTrickResult} from './schereSteinGameLogic.js';

const PORT = 8080;

function writeHead(req, res, status) {
  let origin = String(req.headers.origin);
  // if (!origin.startsWith('http://localhost')) {
  //   console.log("blocked:", origin);
  //   origin = 'block';
  // }
  res.writeHead(status, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': origin});
}

/// getAnswer
function handleGetAnswer(req, res) {
  writeHead(req, res, 200);
  res.end(JSON.stringify({answer: 42}));
}

/// Schere Stein ...

const history = {'Michael': {user: 'Michael', win: 10, lost: 0}};

function _report(playerName, win) {
  if (!history[playerName]) {
    history[playerName] = {user: playerName, win: 0, lost: 0};
  }
  if (win) {
    history[playerName].win += 1;
  }
}

function _play(playerName, playerHand) {
  const result = getTrickResult(playerHand);
  _report(playerName, result.win);
  return result;
}

function getRanking(req, res) {
  writeHead(req, res, 200);
  res.end(JSON.stringify(history));
}

function play(req, res) {
  const queryString = url.parse(req.url).query;
  const query = new URLSearchParams(queryString);
  const playerHand = query.get('playerHand');
  const playerName = query.get('playerName');
  if (playerName === undefined || playerHand === undefined) {
    console.log(query, queryString);
    writeHead(req, res, 400);
    res.end('Wrong parameters');
  } else {
    writeHead(req, res, 200);
    res.end(JSON.stringify(_play(playerName, playerHand)));
  }
}

const routes = {
  '/getAnswer': handleGetAnswer,
  '/ranking': getRanking,
  '/play': play,
};

function requestHandler(req, res) {
  // console.log(url.parse(req.url));
  const routeHandler = routes[url.parse(req.url).pathname];
  if (routeHandler) {
    routeHandler(req, res);
  } else {
    writeHead(req, res, 404);
    res.end();
  }
}

const httpServer = http.createServer(requestHandler);

httpServer.listen(PORT, () => console.log('Node listening on Port ', PORT));
