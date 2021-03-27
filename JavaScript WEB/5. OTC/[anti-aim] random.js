/*
  Author: unknown, book777
  Version: 2
*/

UI.AddLabel("___________ Random AA ___________");
currentTime = Globals.Curtime();
delay = 0;
delayedTime = currentTime + delay;

function main() {
  currentTime = Globals.Curtime();

  if (currentTime >= delayedTime) {
    delay = getVal("Delay (seconds)");

    if (getVal("Random delay:")) {
      delay = generateRandomNumber(0, 0.3);
    }

    delayedTime = currentTime + delay;

    fakeYawLower = getVal("Fake lower:");
    fakeYawUpper = getVal("Fake upper:");
    fakeYaw = getRandomInt(fakeYawLower, fakeYawUpper);

    realLower = getVal("Real lower:");
    realUpper = getVal("Real upper:");
    realYaw = getRandomInt(realLower, realUpper);

    AntiAim.SetRealOffset(realYaw);
    AntiAim.SetFakeOffset(fakeYaw);
    AntiAim.SetLBYOffset(fakeYaw);
  }
}
Cheat.RegisterCallback("Draw", "main");

function getVal(valName) {
  return UI.GetValue("Misc", "JAVASCRIPT", "Script items", valName);
}

AntiAim.SetOverride(1);
UI.AddSliderFloat("Delay (seconds)", 0, 2);

UI.AddSliderInt("Fake lower:", -180, 180);
UI.AddSliderInt("Fake upper:", -180, 180);

UI.AddSliderInt("Real lower:", -180, 180);
UI.AddSliderInt("Real upper:", -180, 180);

UI.AddCheckbox("Random delay:");

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max) + 1;
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
