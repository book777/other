/*
  Author: unknown, book777
  Version: 2
*/

UI.AddLabel("_____________ MM Fakeduck ____________");
UI.AddHotkey("activate");
UI.AddSliderFloat("height", 0.3, 0.77);

var fakelagOverrides = {
  Enabled: false,
  Limit: 7,
  "Trigger limit": 7,
  Jitter: 0,
};

// Store original values
var fakelagOriginal = null;
var hideshotRevert = null;

function fakelagRecover() {
  var name;
  for (name in fakelagOriginal) {
    UI.SetValue("Anti-Aim", "Fake-Lag", name, fakelagOriginal[name]);
  }

  UI.SetValue("Rage", "Exploits", "Hide shots", hideshotRevert);

  return function () {
    fakelagOriginal = null;
    hideshotRevert = null;
  };
}

function main() {
  if (!isPressed()) {
    if (fakelagOriginal != null) {
      fakelagRecover();
    }
    return;
  }

  if (fakelagOriginal == null) {
    override();
  }

  const tc = Globals.Tickcount() % 8;

  const duck = Entity.GetProp(
      Entity.GetLocalPlayer(),
      "CCSPlayer",
      "m_flDuckAmount"
  );
  const isDuck = !(tc >= 1 && tc <= 3) && duck <= UI.GetValue("height");
  const isChoke = tc >= 1 && tc <= 7;

  UI.SetValue("Anti-Aim", "Fake-Lag", "Enabled", isChoke);

  //Cheat.Print("[FD] tick: " + tc + " choking: " + isChoke + " ducking: " + isDuck + " duck: " + duck + "\n");

  if (isDuck) {
    return UserCMD.ForceCrouch();
  }
}
Cheat.RegisterCallback("CreateMove", "main");

function onDestroy() {
  if (fakelagOriginal != null) {
    return fakelagRecover(); // recover fakelag when disabling while fakeducking
  }
}
Cheat.RegisterCallback("Unload", "onDestroy");

function isPressed() {
  return UI.IsHotkeyActive("Script Items", "activate");
}

function override() {
  var name, value;
  fakelagOriginal = {};
  for (name in fakelagOverrides) {
    value = fakelagOverrides[name];
    fakelagOriginal[name] = UI.GetValue("Anti-Aim", "Fake-Lag", name);
    UI.SetValue("Anti-Aim", "Fake-Lag", name, value);
  }

  hideshotRevert = UI.IsHotkeyActive("Rage", "Exploits", "Hide shots");
  UI.SetValue("Rage", "Exploits", "Hide shots", true);

  return void 0;
}
