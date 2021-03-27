/*
  Author: unknown, book777
  Version: 1
*/
UI.AddLabel("___________ Hit/Miss Ratio ___________");
UI.AddCheckbox("Hit/Miss Ratio");
UI.AddCheckbox("Reset on round start");

var xPos = 30, //todo sliders
    yPos = 420;

const fontSize = 3;

var gunFired = false;

var shots = {
  fired: 0,
  hit: 0,
  missed: 0,
  hit_chance: 0,
  miss_chance: 0,
};

function is_gun(weapon_name) {
  for (var i = 0; i < otherWeapons.length; i++) {
    if (weapon_name === "weapon_" + otherWeapons[i]) {
      return false;
    }
  }

  return true;
}

function weapon_fire() {
  var player_id = Event.GetInt("userid");
  var player_weapon = Event.GetString("weapon");

  if (
      Entity.IsLocalPlayer(Entity.GetEntityFromUserID(player_id)) &&
      is_gun(player_weapon)
  ) {
    shots.fired = shots.fired + 1;
    gunFired = true;
  }
}

function player_hurt() {
  var attacker_id = Event.GetInt("attacker");
  var attacker_weapon = Event.GetString("weapon");

  if (
      Entity.IsLocalPlayer(Entity.GetEntityFromUserID(attacker_id)) &&
      is_gun(attacker_weapon) &&
      gunFired
  ) {
    shots.hit = shots.hit + 1;
    gunFired = false;
  }
}

function round_prestart() {
  if (UI.GetValue("Misc", "JAVASCRIPT", "Reset on round start")) {
    for (var key in shots) {
      shots[key] = 0;
    }
  }
}

function main() {
  if (!World.GetServerString()) return;

  shots.missed = shots.fired - shots.hit;
  shots.hit_chance = (shots.hit / shots.fired) * 100;
  shots.miss_chance = (shots.missed / shots.fired) * 100;

  const text_size = Render.TextSize("total: " + shots.fired, fontSize);
  const missRatio = Math.round(shots.miss_chance);

  Render.String(
      xPos,
      yPos + (text_size[1] - 12) * 1.6,
      0,
      shots.missed + " mises" + (missRatio > 0 ? " (" + missRatio + "%)" : ""),
      [255, 255, 255, 255], //todo color picker
      fontSize
  );
}

Global.RegisterCallback("weapon_fire", "weapon_fire");
Global.RegisterCallback("player_hurt", "player_hurt");
Global.RegisterCallback("round_prestart", "round_prestart");

Global.RegisterCallback("Draw", "main");

const otherWeapons = [
  "knife",
  "knife_t",
  "knife_karambit",
  "knife_m9_bayonet",
  "knife_survival_bowie",
  "knife_butterfly",
  "knife_flip",
  "knife_push",
  "knife_tactical",
  "knife_falchion",
  "knife_gut",
  "knife_ursus",
  "knife_gypsy_jackknife",
  "knife_stiletto",
  "knife_widowmaker",
  "knife_css",
  "knife_cord",
  "knife_canis",
  "knife_outdoor",
  "knife_skeleton",
  "bayonet",
  "hegrenade",
  "smokegrenade",
  "molotov",
  "incgrenade",
  "flashbang",
  "decoy",
  "taser",
];
