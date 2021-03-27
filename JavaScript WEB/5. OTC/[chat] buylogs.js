/*  
  Author: book777
  Version: 1
*/

UI.AddLabel("_____________ Buy logs _____________");

const scriptItems = ["Misc", "JAVASCRIPT", "Script Items"];
const dropdownWeaponsName = "Inform about";
UI.AddMultiDropdown(dropdownWeaponsName, [
  "AWP",
  "Scout",
  "Autosniper",
  "HE, molotov",
  "Kevlar + helmet",
  "Revolver",
  "Berets",
  "Other",
]);

function main() {
  const playerID = Event.GetInt("userid");
  const playerEntry = Entity.GetEntityFromUserID(playerID);
  const playerTeam = Event.GetInt("team");
  const selfTeam = Entity.GetProp(
      Entity.GetLocalPlayer(),
      "CBaseEntity",
      "m_iTeamNum"
  );

  if (playerTeam === selfTeam) return;

  const item = Event.GetString("weapon")
      .replace("weapon_", "")
      .replace("item_", "")
      .replace("assaultsuit", "kevlar + helmet")
      .replace("incgrenade", "molotov");

  if (item === "unknown") return;

  const playerName = Entity.GetName(playerEntry).trim();
  const dropdownWeapons = UI.GetValue(scriptItems, dropdownWeaponsName);

  if (dropdownWeapons & (1 << 0) && item === "awp") {
    // AWP
    print(playerName, item);
  } else if (dropdownWeapons & (1 << 1) && item === "ssg08") {
    // Scout
    print(playerName, item);
  } else if (
      dropdownWeapons & (1 << 2) &&
      (item === "g3sg1" || item === "scar20")
  ) {
    // Autosniper
    print(playerName, item);
  } else if (
      dropdownWeapons & (1 << 3) &&
      (item === "molotov" || item === "hegrenade")
  ) {
    // HE, molotov
    print(playerName, item);
  } else if (dropdownWeapons & (1 << 4) && item === "kevlar + helmet") {
    // Kevlar + helmet
    print(playerName, item);
  } else if (dropdownWeapons & (1 << 5) && item === "revolver") {
    // Revolver
    print(playerName, item);
  } else if (dropdownWeapons & (1 << 6) && item === "elite") {
    // Berets
    print(playerName, item);
  } else if (dropdownWeapons & (1 << 7)) {
    // Other
    print(playerName, item);
  }
}
Global.RegisterCallback("item_purchase", "main");

function print(entryName, item) {
  Global.PrintChat(
      "\x01[\x06BUY\x01] \x04" + entryName + " \x01bought \x04" + item + "\n"
  );
}
