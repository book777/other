/*
  Author: unknown, book777
  Version: 2
*/
const replies = ["shut up", "nice killsay, LOL", "nice baim", "you sell?"];

function main() {
  const localName = Entity.GetName(Entity.GetLocalPlayer());
  const text = Event.GetString("text");

  if (text.indexOf(localName) > -1) {
    if (text.trim() === localName) {
      Cheat.ExecuteCommand("say ?");
    }

    const userid = Event.GetInt("userid");
    const chatterName = Entity.GetName(Entity.GetEntityFromUserID(userid));
    const randomText = replies[getRndInteger(0, replies.length)];
    Cheat.ExecuteCommand("say " + chatterName + ", " + randomText);
  }
}
Cheat.RegisterCallback("player_say", "main");

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
