/*  
  Author: book777
  Version: 1
*/

var matchState = 0; // 0 - playing, 1 - half time, 2 - end match
var lastClantag = "";

const gsClantagArr = generateGSStyleArr("gamesense ");
//todo const gsClantagArr = generateGSStyleArr("skeet.cc ");

UI.SetEnabled("Misc", "GENERAL", "Miscellaneous", "Clantag", false);

function generateGSStyleArr(text, numOfHalf) {
  var out = [];
  var i;

  for (i = 1; i < text.length - 1; ++i) {
    out.unshift(text.substr(0, text.length - i));
  }

  if (!numOfHalf) numOfHalf = 13;
  for (i = 0; i < numOfHalf; ++i) {
    out.push(text);
  }

  for (i = 1; i < text.length - 1; ++i) {
    out.push(text.substr(i, text.length));
  }

  out.push("");

  return out;
}

function clantagByTimesatamp(arr) {
  const el = Globals.Tickcount() + timeToTicks(Local.Latency());

  if (GetFlag(64) && matchState < 2) {
    return e + " ";
  }

  const currentIndex = Math.floor((el / timeToTicks(0.3)) % arr.length);

  return arr[currentIndex];
}

function main() {
  if (!isInGame()) {
    matchState = 0;
    return;
  }

  if (Globals.Tickcount() % 2 === 0) {
    const newClantagCandidate = clantagByTimesatamp(gsClantagArr);

    if (newClantagCandidate !== lastClantag) {
      Local.SetClanTag(newClantagCandidate);
      lastClantag = newClantagCandidate;
    }
  }
}
Cheat.RegisterCallback("Draw", "main");

function onRoundStart() {
  matchState = matchState === 1 ? 2 : 0;
}
Cheat.RegisterCallback("round_start", "onRoundStart");

function onEndMatch() {
  matchState = 2;
}
Cheat.RegisterCallback("cs_win_panel_match", "onEndMatch");

function onHalfTime() {
  matchState = 1;
}
Cheat.RegisterCallback("announce_phase_end", "onHalfTime");

function onDestroy() {
  removeClantag();
  UI.SetEnabled("Misc", "GENERAL", "Miscellaneous", "Clantag", true);
}
Cheat.RegisterCallback("Unload", "onDestroy");

/////

function GetFlag(method) {
  return (
      Entity.GetProp(Entity.GetLocalPlayer(), "CBasePlayer", "m_fFlags") & method
  );
}

function removeClantag() {
  Local.SetClanTag("");
}

function timeToTicks(timeStamp) {
  return Math.floor(timeStamp / Globals.TickInterval() + 0.5);
}

function isInGame() {
  var selfEntity = Entity.GetLocalPlayer();
  const connecredPropKey = "m_bConnected";
  var selfConnected = Entity.GetProp(
      selfEntity,
      "CPlayerResource",
      connecredPropKey
  );

  return (
      !!World.GetServerString() &&
      !!selfEntity &&
      selfConnected.toString() !== connecredPropKey &&
      Global.GetMapName() !== ""
  );
}
