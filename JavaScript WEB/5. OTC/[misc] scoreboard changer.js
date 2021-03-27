/*
  Author: book777
  Version: 1
*/

const pinRanges = [
  [0, 1], // Not selected, Blank
  //<[3100, 3199], //todo not tested
  [4551, 4554],
  [4556, 4559],
  [4624, 4627],
  [4675, 4680],
  [4682, 4692],
  [4700, 4703],
  [4737, 4742],
  //>[5000, 5099], //todo not tested
];

var pins = [0];
for (var i = 0; i < pinRanges.length; ++i)
  for (var j = pinRanges[i][0]; j < pinRanges[i][1]; ++j) pins.push(j);

UI.AddLabel("________Scoreboard changer________");
UI.AddSliderInt("ping", 0, 100);
UI.AddSliderInt("rank", 0, 41);
UI.AddSliderInt("music kit", 0, 52);
UI.AddSliderInt("skill group", 0, 19);
//UI.AddSliderInt("money", 0, pins.length);
UI.AddSliderInt("pin", 0, pins.length);
UI.AddSliderInt("kills", 0, 170);
UI.AddSliderInt("assists", 0, 170);
UI.AddSliderInt("deaths", 0, 170);
UI.AddSliderInt("MVPs", 0, 100);
UI.AddSliderInt("score", 0, 100);

function main() {
  if (Cheat.FrameStage() != 1) return;

  const localPlayer = Entity.GetLocalPlayer();

  const ping = UI.GetValue("ping");
  if (ping > 0)
    Entity.SetProp(localPlayer, "CCSPlayerResource", "m_iPing", ping - 1);

  const rank = UI.GetValue("rank");
  if (rank > 0)
    Entity.SetProp(
      localPlayer,
      "CCSPlayerResource",
      "m_nPersonaDataPublicLevel",
      rank - 1
    );

  const musicKit = UI.GetValue("music kit");
  if (musicKit > 0)
    Entity.SetProp(localPlayer, "CCSPlayerResource", "m_nMusicID", musicKit);

  const skillGroup = UI.GetValue("skill group");
  if (skillGroup > 0)
    Entity.SetProp(
      localPlayer,
      "CCSPlayerResource",
      "m_iCompetitiveRanking",
      skillGroup - 1
    );

  const pin = UI.GetValue("pin");
  if (pin > 0)
    Entity.SetProp(
      localPlayer,
      "CCSPlayerResource",
      "m_nActiveCoinRank",
      pins[pin]
    );

  const kills = UI.GetValue("kills");
  if (kills > 0)
    Entity.SetProp(localPlayer, "CCSPlayerResource", "m_iKills", kills - 1);

  const assists = UI.GetValue("assists");
  if (assists > 0)
    Entity.SetProp(localPlayer, "CCSPlayerResource", "m_iAssists", assists - 1);

  const deaths = UI.GetValue("deaths");
  if (deaths > 0)
    Entity.SetProp(localPlayer, "CCSPlayerResource", "m_iDeaths", deaths - 1);

  const mvps = UI.GetValue("MVPs");
  if (mvps > 0)
    Entity.SetProp(localPlayer, "CCSPlayerResource", "m_iMVPs", mvps - 1);
  Entity.SetProp(localPlayer, "CCSPlayerResource", "m_iCompetitiveWins", 111);

  const score = UI.GetValue("score");
  if (score > 0 || kills > 0 || assists > 0) {
    const realKills = Entity.GetProp(
      localPlayer,
      "CCSPlayerResource",
      "m_iKills"
    );
    const realAssists = Entity.GetProp(
      localPlayer,
      "CCSPlayerResource",
      "m_iAssists"
    );

    Entity.SetProp(
      localPlayer,
      "CCSPlayerResource",
      "m_iScore",
      score + realKills * 2 + realAssists
    );
  }
}

Global.RegisterCallback("FrameStageNotify", "main");

// https://gamesensical.gitbook.io/docs/developers/netprops/important/ccsplayerresource
