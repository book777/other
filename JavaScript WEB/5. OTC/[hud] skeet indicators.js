/*
  Author: book777
  Version: 1
*/

const static = {
  textDistanceBetween: 26,
  textYOffset: 28,
  dtProgressBarPx: 65,
  dtProgressYOffset: 57,
  aaProgressHalfPx: 17,
  aaProgressYOffset: 57,
  createFont: function () {
    return Render.AddFont("Roboto Medium", 19, 100);
    //return Render.AddFont("Verdana", 18, 100);
    //return Render.AddFont("Consolas", 18, 100);
    //return Render.AddFont("Tahoma", 18, 100);
  },
  screen: Global.GetScreenSize(),
};

var shared = {
  dtTime: 0,
  dtDelay: 0,
  dtFillbar: 0,
  dtShotsFired: 0,
};

const colors = {
  black: [0, 0, 0, 255],
  blackHalfTransparent: [0, 0, 0, 190],
  white: [255, 255, 255, 255],
  red: [255, 0, 0, 255],
  yellow: [124, 195, 13, 255],
  darkGreen: [132, 195, 16, 255],
  blue: [120, 120, 255, 200],
  cyan: [0, 252, 231, 255],
};

const indicators = {
  fov: {
    label: "Field Of View",
    canRender: function () {
      return (
          UI.IsHotkeyActive("Legit", "GENERAL", "General", "Enabled") ||
          UI.IsHotkeyActive("Rage", "GENERAL", "General", "Enabled")
      );
    },
    render: function (data, qI) {
      if (
          UI.GetValue("Rage", "GENERAL", "General", "Enabled") ||
          UI.IsHotkeyActive("Rage", "GENERAL", "General", "Enabled")
      ) {
        const currRageWeaponType = rageWeaponType(data.selfEntity);
        const isOverriden = UI.GetValue(
            "Rage",
            currRageWeaponType,
            "Auto config",
            "Override default"
        );

        renderText(
            data,
            qI,
            "FOV " +
            Math.round(
                UI.GetValue(
                    "Rage",
                    isOverriden ? currRageWeaponType : "GENERAL",
                    "Targeting",
                    "FOV"
                )
            ),
            colors.yellow
        );
      } else if (
          UI.GetValue("Legit", "GENERAL", "General", "Enabled") ||
          UI.IsHotkeyActive("Legit", "GENERAL", "General", "Enabled")
      ) {
        const currLegitWeaponType = legitWeaponType(data.selfEntity);
        const isOverriden = UI.GetValue(
            "Legit",
            currLegitWeaponType,
            "General",
            "Override default"
        );

        renderText(
            data,
            qI,
            "FOV " +
            Math.round(
                UI.GetValue(
                    "Legit",
                    isOverriden ? currLegitWeaponType : "GENERAL",
                    "Fov"
                )
            ),
            colors.yellow
        );
      }
    },
  },
  minDmg: {
    label: "Minimum damage",
    canRender: function () {
      return (
          UI.GetValue("Rage", "GENERAL", "General", "Enabled") ||
          UI.IsHotkeyActive("Rage", "GENERAL", "General", "Enabled")
      );
    },
    render: function (data, qI) {
      const currRageWeaponType = rageWeaponType(data.selfEntity);
      const isOverriden = UI.GetValue(
          "Rage",
          currRageWeaponType,
          "Auto config",
          "Override default"
      );

      const md = UI.GetValue(
          "Rage",
          isOverriden ? currRageWeaponType : "GENERAL",
          "Targeting",
          "Minimum damage"
      );

      renderText(data, qI, "DMG " + md, colors.red);
    },
  },
  hitChance: {
    label: "Hit Chance",
    canRender: function () {
      return (
          UI.GetValue("Rage", "GENERAL", "General", "Enabled") ||
          UI.IsHotkeyActive("Rage", "GENERAL", "General", "Enabled")
      );
    },
    render: function (data, qI) {
      const currRageWeaponType = rageWeaponType(data.selfEntity);
      const isOverriden = UI.GetValue(
          "Rage",
          currRageWeaponType,
          "Auto config",
          "Override default"
      );

      const hc = UI.GetValue(
          "Rage",
          isOverriden ? currRageWeaponType : "GENERAL",
          "Accuracy",
          "Hitchance"
      );

      renderText(data, qI, "HC " + hc, colors.blue);
    },
  },
  triggerBot: {
    label: "Triggerbot",
    canRender: function () {
      return UI.IsHotkeyActive("Legit", "GENERAL", "Triggerbot", "Enabled");
    },
    render: function (data, qI) {
      renderText(data, qI, "TRIGGER", colors.yellow);
    },
  },
  savePoint: {
    label: "Safe Point",
    canRender: function () {
      return UI.IsHotkeyActive(
          "Rage",
          "GENERAL",
          "General",
          "Force safe point"
      );
    },
    render: function (data, qI) {
      renderText(data, qI, "SAFE", colors.yellow);
    },
  },
  doubleTap: {
    label: "Doubletap",
    canRender: function () {
      return UI.IsHotkeyActive("Rage", "Exploits", "Doubletap");
    },
    render: function (data, qI) {
      const curtime = Globals.Curtime();
      const colorOffset = Math.floor((curtime * 255) / 58);

      renderText(
          data,
          qI,
          "DTAP",
          curtime <= shared.dtDelay
              ? [colorOffset, 255 - colorOffset, 0, 255]
              : colors.blue
      );

      if (curtime <= shared.dtDelay) {
        shared.dtShotsFired = 1;

        shared.dtFillbar += 3;
        if (shared.dtFillbar > static.dtProgressBarPx)
          shared.dtFillbar = static.dtProgressBarPx;

        // DT progressbar
        // BG
        Render.FilledRect(
            data.x,
            data.y -
            1 -
            static.dtProgressYOffset -
            qI * static.textDistanceBetween,
            static.dtProgressBarPx + 2,
            5,
            colors.blackHalfTransparent
        );
        // FG
        Render.FilledRect(
            data.x + 1,
            data.y - static.dtProgressYOffset - qI * static.textDistanceBetween,
            shared.dtFillbar,
            3,
            colors.blue
        );
      } else {
        shared.dtShotsFired = 0;
      }
    },
  },
  hideShots: {
    label: "Hide Shots",
    canRender: function () {
      return UI.IsHotkeyActive("Rage", "Exploits", "Hide shots");
    },
    render: function (data, qI) {
      renderText(data, qI, "HIDESHOTS", colors.yellow);
    },
  },
  isFakeLag: {
    label: "Fake-Lag",
    canRender: function () {
      return UI.GetValue("Anti-Aim", "Fake-Lag", "Enabled");
    },
    render: function (data, qI) {
      const colorOffset = (Globals.Curtime() * 70) % 58;

      renderText(data, qI, "FAKE", [colorOffset, 255 - colorOffset, 0, 255]);
    },
  },
  fakeLagTicks: {
    label: "Fake ticks",
    canRender: function () {
      return (
          UI.GetValue("Anti-Aim", "Rage Anti-Aim", "Enabled") ||
          UI.GetValue("Anti-Aim", "Legit Anti-Aim", "Enabled")
      );
    },
    render: function (data, qI) {
      if (UI.GetValue("Anti-Aim", "Rage Anti-Aim", "Enabled")) {
        const colorOffset =
            (Math.abs(Local.GetRealYaw() - Local.GetFakeYaw()) * 255) / 58;

        renderText(data, qI, "AA", [
          colorOffset,
          255 - (colorOffset * 255) / 58,
          0,
          255,
        ]);
      } else if (UI.GetValue("Anti-Aim", "Legit Anti-Aim", "Enabled")) {
        renderText(data, qI, "AA", colors.white);

        // AA direction bar
        Render.FilledRect(
            data.x,
            data.y -
            1 -
            static.aaProgressYOffset -
            qI * static.textDistanceBetween,
            static.aaProgressHalfPx * 2 + 2,
            5,
            colors.blackHalfTransparent
        );
        Render.FilledRect(
            data.x +
            1 +
            (UI.IsHotkeyActive("Anti-Aim", "Legit Anti-Aim", "Direction key")
                ? 0
                : static.aaProgressHalfPx),
            data.y - static.aaProgressYOffset - qI * static.textDistanceBetween,
            static.aaProgressHalfPx,
            3,
            colors.blue
        );
      }
    },
  },
  fakeAnglesInvert: {
    label: "Fake Angles Invert",
    canRender: function () {
      return UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Inverter");
    },
    render: function (data, qI) {
      renderText(data, qI, "INVERT", colors.white);
    },
  },
  antiAimSide: {
    label: "Anti-Aim Side",
    canRender: alwaysActive,
    render: function (data, qI) {
      if (UI.GetValue("Rage", "GENERAL", "General", "Enabled")) {
        if (UI.IsHotkeyActive("Anti-Aim", "Fake angles", "Inverter")) {
          renderText(data, qI, "LEFT", colors.white);
        } else {
          renderText(data, qI, "RIGHT", colors.white);
        }
      } else if (
          UI.IsHotkeyActive("Anti-Aim", "Legit Anti-Aim", "Direction key")
      ) {
        renderText(data, qI, "LEFT", colors.white);
      } else {
        renderText(data, qI, "RIGHT", colors.white);
      }
    },
  },
  slowWalk: {
    label: "Slow Walk",
    canRender: function () {
      return UI.IsHotkeyActive("Anti-Aim", "Extra", "Slow walk");
    },
    render: function (data, qI) {
      renderText(data, qI, "SLOW", colors.yellow);
    },
  },
  lowBodYaw: {
    label: "Low Body Yaw",
    canRender: function (data) {
      return data.selfVelocity > 250 && Input.IsKeyPressed(32); // 32 - space
    },
    render: function (data, qI) {
      renderText(
          data,
          qI,
          "LBY",
          data.selfVelocity > 295 ? colors.darkGreen : colors.red
      );
    },
  },
  fakeDuck: {
    label: "Fake Duck",
    canRender: function () {
      return UI.IsHotkeyActive("Anti-Aim", "Extra", "Fake duck");
    },
    render: function (data, qI) {
      renderText(data, qI, "DUCK", colors.white);
    },
  },
  autoPeek: {
    label: "Auto Peek",
    canRender: function () {
      return UI.IsHotkeyActive("Misc", "GENERAL", "Movement", "Auto peek");
    },
    render: function (data, qI) {
      renderText(data, qI, "AUTOPEEK", colors.yellow);
    },
  },
};

const menuInt = {
  xPos: {
    label: "X position",
    min: 0,
    max: 1,
  },
  yPos: {
    label: "Y position",
    min: 0,
    max: 1,
  },
};

///////////////////

UI.AddLabel("___________ Skeet Indicators ___________");

// Add menu checkboxes
const checkboxNames = Object.keys(indicators);
for (var i = 0; i < checkboxNames.length; ++i)
  UI.AddCheckbox(indicators[checkboxNames[i]].label);

// Add menu numbers
{
  const menuIntNames = Object.keys(menuInt);
  for (var i = 0; i < menuIntNames.length; ++i) {
    const a = menuInt[menuIntNames[i]];
    UI.AddSliderFloat(a.label, a.min, a.max);
  }
}

function main() {
  if (!World.GetServerString()) return;

  const selfEntity = Entity.GetLocalPlayer();

  if (!selfEntity || !Entity.IsAlive(selfEntity) || !Entity.IsValid(selfEntity))
    return;

  const data = {
    x: Math.floor(getMenuValue(menuInt.xPos.label) * static.screen[0]),
    y:
        static.screen[1] -
        Math.floor(getMenuValue(menuInt.yPos.label) * static.screen[1]),
    selfEntity: selfEntity,
    selfVelocity: Math.round(getPlayerSpeed(selfEntity)),
    font: static.createFont(),
  };

  var renderQuery = [];

  // Add indicators to render query
  for (var i = 0; i < checkboxNames.length; ++i) {
    const entry = indicators[checkboxNames[i]];

    if (!getMenuValue(entry.label)) continue;

    if (entry.canRender(data)) renderQuery.unshift(checkboxNames[i]);
  }

  // Render
  for (var i = 0; i < renderQuery.length; ++i) {
    try {
      indicators[renderQuery[i]].render(data, i);
    } catch (e) {
      Cheat.Print(
          "Error while render '" + indicators[renderQuery] + "': " + e + "\n"
      );
    }
  }
}
Global.RegisterCallback("Draw", "main");

function dtShareUpdate() {
  if (
      Entity.GetLocalPlayer() ==
      Entity.GetEntityFromUserID(Event.GetInt("userid")) &&
      UI.IsHotkeyActive("Rage", "GENERAL", "Exploits", "Doubletap") &&
      shared.dtShotsFired === 0
  ) {
    shared.dtTime = Globals.Curtime();
    shared.dtDelay = shared.dtTime + 0.3;
    shared.dtFillbar = 0;
  }
}
Global.RegisterCallback("weapon_fire", "dtShareUpdate");

///////////////////

function getPlayerSpeed(entity) {
  const velocity = Entity.GetProp(entity, "CBasePlayer", "m_vecVelocity[0]");
  return Math.sqrt(velocity[0] * velocity[0] + velocity[1] * velocity[1]);
}

function legitWeaponType(entity) {
  const weaponMap = {
    "usp s": "PISTOL",
    "glock 18": "PISTOL",
    p2000: "PISTOL",
    "dual berettas": "PISTOL",
    "r8 revolver": "PISTOL",
    "desert eagle": "PISTOL",
    p250: "PISTOL",
    "tec 9": "PISTOL",
    "five seven": "PISTOL",
    mp9: "SMG",
    "mac 10": "SMG",
    "ump 45": "SMG",
    "ak 47": "RIFLE",
    "sg 553": "RIFLE",
    aug: "RIFLE",
    "m4a1 s": "RIFLE",
    m4a4: "RIFLE",
    galil: "RIFLE",
    "ssg 08": "SNIPER",
    awp: "SNIPER",
    g3sg1: "SNIPER",
    "scar 20": "SNIPER",
  };
  const weapon = weaponMap[Entity.GetName(Entity.GetWeapon(entity))];

  return weapon === undefined ? "GENERAL" : weapon;
}

function rageWeaponType(entity) {
  const weaponMap = {
    "usp s": "PISTOL",
    "glock 18": "PISTOL",
    p2000: "PISTOL",
    "dual berettas": "PISTOL",
    "r8 revolver": "HEAVY PISTOL",
    "desert eagle": "HEAVY PISTOL",
    p250: "PISTOL",
    "tec 9": "PISTOL",
    "five seven": "PISTOL",
    "ssg 08": "SCOUT",
    awp: "AWP",
    g3sg1: "AUTOSNIPER",
    "scar 20": "AUTOSNIPER",
  };

  const weapon = weaponMap[Entity.GetName(Entity.GetWeapon(entity))];

  return weapon === undefined ? "GENERAL" : weapon;
}

function getMenuValue(state) {
  return UI.GetValue("Misc", "JAVASCRIPT", "Script items", state);
}

function alwaysActive() {
  return true;
}

function renderText(data, qI, text, colorArr) {
  const currY = data.y - static.textYOffset - qI * static.textDistanceBetween;

  if (data.font) {
    Render.StringCustom(
        data.x,
        currY,
        0,
        text,
        colors.blackHalfTransparent,
        data.font
    );
    Render.StringCustom(data.x + 1, currY, 0, text, colorArr, data.font);
  } else {
    Render.String(data.x, currY, 0, text, colors.blackHalfTransparent, 4);
    Render.String(data.x + 1, currY, 0, text, colorArr, 4);
  }
}
