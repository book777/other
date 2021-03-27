/*  
  Author: book777
  Version: 1
*/

UI.AddLabel("____________ DT teleport _____________");

const nameDropdownSwitch = "Change DT to";
UI.AddDropdown(nameDropdownSwitch, ["Switch", "Only off", "Only on"]);
const scriptItems = ["Misc", "JAVASCRIPT", "Script Items"];

UI.SetValue("Rage", "GENERAL", "Exploits", "Teleport release", true);

function rageFire() {
  switch (UI.GetValue(scriptItems, nameDropdownSwitch)) {
    case 0:
      switchDT();
      break;
    case 1:
      if (isDTActive()) switchDT();
      break;
    case 2:
      if (!isDTActive()) switchDT();
      break;
  }
}
Cheat.RegisterCallback("ragebot_fire", "rageFire");

/* function everySelfFire() {
  iShotsFired = Event.GetInt("userid");
  iShotsFired_index = Entity.GetEntityFromUserID(iShotsFired);

  if (Entity.GetLocalPlayer() === iShotsFired_index && isDTActive()) {
    switchDT();
  }
}
Cheat.RegisterCallback("weapon_fire", "everySelfFire"); */

function switchDT() {
  UI.ToggleHotkey("Rage", "GENERAL", "Exploits", "Doubletap");
}

function isDTActive() {
  return UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Doubletap");
}
