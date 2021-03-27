/*
  Author: unknown, book777
  Version: 4
*/

const static = {
  hudText: "LD",
  menuValueName: "Low delta value",
  menuOnKeyName: "Low delta on key",
  menuModesName: "Low delta modes",
  menuModesFields: ["Slow walk", "Low HP", "Standing"],
  menuTypeName: "Low delta type",
  menuTypeFields: ["Custom", "On key"],
  scriptItems: ["Misc", "JAVASCRIPT", "Script Items"],
  defaultValue: 19,
};

UI.AddLabel("_____________ Low delta _____________");
UI.AddDropdown(static.menuTypeName, static.menuTypeFields);
UI.AddHotkey(static.menuOnKeyName);

UI.AddSliderInt(static.menuValueName, 0, 60);
if (!UI.GetValue(static.menuValueName))
  UI.SetValue(static.scriptItems, static.menuValueName, static.defaultValue);

// todo check "Anti-aim -> Fake angles -> Fake desync"

const fakeDelta = 0;

const lowdeltaModes = UI.AddMultiDropdown(
  static.menuModesName,
  static.menuModesFields
);
const yawOffsetOrigin = UI.GetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset");
const jitterOffsetOrigin = UI.GetValue(
  "Anti-Aim",
  "Rage Anti-Aim",
  "Jitter offset"
);

function main() {
  if (UI.GetValue(static.scriptItems, static.menuTypeName) === 0) {
    UI.SetEnabled(static.scriptItems, static.menuModesName, 1);
    UI.SetEnabled(static.scriptItems, static.menuOnKeyName, 0);
  } else {
    UI.SetEnabled(static.scriptItems, static.menuModesName, 0);
    UI.SetEnabled(static.scriptItems, static.menuOnKeyName, 1);
  }

  if (!World.GetServerString()) return;

  const localplayerIndex = Entity.GetLocalPlayer();
  const lowdeltaDropdownValue = UI.GetValue.apply(null, lowdeltaModes);
  const velocity = getVelocity(localplayerIndex);
  const health = getHealth(localplayerIndex);
  const localplayer_alive = Entity.IsAlive(localplayerIndex);

  var isActive = false;

  if (UI.GetValue(static.scriptItems, static.menuTypeName) === 0) {
    isActive =
      /* isSlowWalk */ (lowdeltaDropdownValue & (1 << 0) &&
        UI.IsHotkeyActive("Anti-Aim", "Extra", "Slow walk")) ||
      /*  isLowHP */ (lowdeltaDropdownValue & (1 << 1) && health < 50) ||
      /* isStanding */ (lowdeltaDropdownValue & (1 << 2) && velocity < 3);
  } else {
    /*  isOnkey */ isActive = UI.IsHotkeyActive(
      static.scriptItems,
      static.menuOnKeyName
    );
  }

  if (isActive) {
    const invertedMultiply = UI.IsHotkeyActive(
      "Anti-Aim",
      "Fake angles",
      "Inverter"
    )
      ? 1
      : -1; // 0/1

    UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset", 0);
    UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", fakeDelta);
    AntiAim.SetRealOffset(UI.GetValue(static.menuValueName) * invertedMultiply); //todo need to be reverted
    AntiAim.SetOverride(1);

    // Draw notificaction
    const screenSize = Global.GetScreenSize();
    if (localplayer_alive)
      Render.StringCustom(
        screenSize[0] / 2,
        screenSize[1] / 2 - 25,
        1,
        static.hudText,
        [255, 255, 0, 255],
        Render.AddFont("Verdana", 8, 100)
      );
  } else {
    UI.SetValue(
      "Anti-Aim",
      "Rage Anti-Aim",
      "Jitter offset",
      jitterOffsetOrigin
    );
    UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", yawOffsetOrigin);
    AntiAim.SetOverride(0);
  }
}
Cheat.RegisterCallback("Draw", "main");

function getVelocity(index) {
  const velocity = Entity.GetProp(index, "CBasePlayer", "m_vecVelocity[0]");
  return Math.sqrt(velocity[0] * velocity[0] + velocity[1] * velocity[1]);
}

function getHealth(index) {
  return Entity.GetProp(index, "CBasePlayer", "m_iHealth");
}
