/*  
  Author: book777
  Version: 2.1
*/

const clantags = {
  Acidtech: {
    arr: arrConcatReverse(
        [
          "",
          "4",
          "A",
          "A<",
          "Ac",
          "Ac1",
          "Aci",
          "Acid",
          "Acid7",
          "Acidt",
          "Acidt3",
          "Acidte",
          "Acidte<",
          "Acidtec",
          "Acidtech",
          "Acidtech",
        ],
        1,
        1
    ),
    speed: 3,
  },
  gamesense: textShowHideBackward("gamesense"),
  memesense: textShowHideBackward("memesense"),
  "AIMWARE.net": textSlideOnetap("AIMWARE.net "),
  "fatality.win": {
    arr: arrWrap(textShowHide("fatality.win", 10), "", 1),
    speed: 6,
  },
  "Neverlose.cc": arrConcatReverse(
      [
        "",
        "|",
        "|\\",
        "|\\|",
        "N",
        "N3",
        "Ne",
        "Ne\\",
        "Ne\\/",
        "Nev",
        "Nev3",
        "Neve",
        "Neve|",
        "Neve|2",
        "Never",
        "Never|",
        "Never|_",
        "Neverl",
        "Neverl0",
        "Neverlo",
        "Neverlo5",
        "Neverlos",
        "Neverlos3",
        "Neverlose",
        "Neverlose.",
        "Neverlose.<",
        "Neverlose.c",
        "Neverlose.c<",
        "Neverlose.cc",
        "Neverlose.cc",
      ],
      1
  ),
  "onetap v3": textSlideOnetap("onetap.su "),
  "onetap v4": "onetap",
  "dancer onetap v4": [
    "\\(^.^)/",
    "(\\^.^)\\",
    "/(^.^)\\",
    "/(^.^/)",
    "(\\^.^)\\",
    "(/^.^)/",
    "\\(^.^)/",
  ],
  "nixware.cc": {
    arr: arrAddSuffix(textShowHide("nixware.cc", 10), " "),
    speed: 6,
  },
  "PPHUD FREE": textSlide("PPHUD FREE"),
  pandora: {
    arr: [
      "pandora",
      "_andor_",
      "__ndo__",
      "___d___",
      "_______",
      "p_____a",
      "pa___ra",
      "pan_ora",
      "pandora",
    ],
    speed: 2,
  },
  "9/11": ["✈__∎_∎", "_✈_∎_∎", "__✈∎_∎", "___☠✈∎", "__ ☠_☠"],
  time: function () {
    return new Date().toLocaleTimeString().split(".")[0];
  },
  ":)": [":)", "):"],
  xy0: textShowHideBackward("xy0"),
  "ev0lve.xyz": textShowHideBackward("ev0lve.xyz"),
  "NeoSync.js": textShowHide("NeoSync.js"),
  millionware: textSpaceForwardBackward("millionware"),
  samovare: [
    "",
    "_ _",
    "+▂ ▂+",
    "▁† †▁",
    "▁☮ ☮▁",
    "▂↕ ↕▂",
    "▂ ▂",
    "▃〠 〠▃",
    // not good clantag, but someone use it
    "卐卐",
    "卐|卐",
    "卐|卐",
    "卐|\\卐",
    "卐|\\|卐",
    "卐S卐",
    "卐S卐",
    "卐S|卐",
    "卐S|/卐",
    "卐SA卐",
    "卐SA(卐",
    "卐SA(_卐",
    "卐SA(_)卐",
    "卐SAM卐",
    "卐SAM5卐",
    "卐SAMO/卐",
    "卐SAMO/卐",
    "卐SAMO/|卐",
    "卐SAMO/|/卐",
    "卐SAMOW卐",
    "卐SAMOW3卐",
    "卐SAMOWA卐",
    "卐SAMOWA|卐",
    "卐SAMOWA|_卐",
    "卐SAMOWAR卐",
    "卐SAMOWAR|卐",
    "卐SAMOWAR|1卐",
    //"卐SAMOWAR|1|卐", // to long
    "卐SAMOWARE卐",
    "✖SAMOWARE✖",
    "❤SAMOWARE❤",
    "†SAMOWARE†",
    //"卐|\\|AMOWARE卐", // to long
    "卐|\\AMOWARE卐",
    "卐|AMOWARE卐",
    "卐|AMOWARE卐",
    "卐AMOWARE卐",
    "卐|/MOWARE卐",
    "卐|MOWARE卐",
    "卐MOWARE卐",
    "卐MOWARE卐",
    "卐(_)OWARE卐",
    "卐(_OWARE卐",
    "卐(OWARE卐",
    "卐OWARE卐",
    "卐5WARE卐",
    "卐WARE卐",
    "卐/|/ARE卐",
    "卐/|/ARE卐",
    "卐/|ARE卐",
    "卐/ARE卐",
    "卐/ARE卐",
    "卐ARE卐",
    "卐3RE卐",
    "卐RE卐",
    "卐|_E卐",
    "卐|E卐",
    "卐E卐",
    "卐|1|卐",
    "卐|1卐",
    "卐|卐",
    "卐卐",
    "▃〠 〠▃",
    "▂ ▂",
    "▂↕ ↕▂",
    "▁☮ ☮▁",
    "▁† †▁",
    "+▂ ▂+",
    "_ _",
    "",
  ],
  blyatosware: textShowHide("blyatosware"),
  blyatsense: textSpaceForward("blyatsense"),
  gaysense: textHide("gaysense"),
  "gaysex.pub": textShowHide("gaysex.pub"),
  "Bober Hook": arrConcatReverse(
      [
        "",
        "B",
        "B0",
        "Bo6",
        "Bob3",
        "Bober",
        "Bober",
        "Bober ⎟",
        "Bober ⎟-",
        "Bober ⎟-⎟",
        "Bober H0",
        "Bober Ho0",
        "Bober Hoo⎟<",
        "Bober Hook",
        "Bober Hook",
      ],
      1
  ),
  happyBear: ["ʕ•ᴥ•ʔ", "ʕᵔᴥᵔʔ"],
  onetapSlash: textSuffix(textShowHide("onetap"), "\\", "/"),
  dancer: ["<(o-o<)", "(>o-o)>", "^(o-o)^", "v(o-o)v"],
  triangleSpin: ["◢", "◣", "◤", "◥"],
  triangleOutlineSpin: ["◺", "◸", "◹", "◿"],
  squareSpin: ["◨", "◪", "◧", "◩"],
  squareOutlineSpin: ["◰", "◳", "◲", "◱"],
  flower: ["֍", "֎"],
  numbers: ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨"],
  FemboywareStaff: arrConcatReverse([
    "FemboywareStaff",
    "_3mboywareStaff",
    "F_mboywareStaff",
    "F3_boywareStaff",
    "Fem_0ywareStaff",
    "Femb_ywareStaff",
    "Femb0_wareStaff",
    "Femboy_4reStaff",
    "Femboyw_reStaff",
    "Femboyw4_3Staff",
    "Femboywar_$taff",
    "Femboywar3_taff",
    "Femboyware$_4ff",
    "FemboywareSt_ff",
    "FemboywareSt4_f",
    "FemboywareStaf_",
    "FemboywareStaff",
  ]).concat([
    "F3mboywareStaff",
    "Femb0ywareStaff",
    "Femboyw4reStaff",
    "Femboywar3Staff",
    "FemboywareSt4ff",
    "FemboywareStaff",
  ]),
  PhenomnV2: [
    "| |",
    "| V2 |",
    "| V2 |P",
    "| V2 |Ph",
    "| V2 |Phe",
    "| V2 |Phen",
    "| V2 |Pheno",
    "| V2 |Phenom",
    "| V2 |Phenomn",
    "| V2 |Phenomn",
    "P| V2 |henomn",
    "Ph| V2 |enomn",
    "Phe| V2 |nomn",
    "Phen| V2 |omn",
    "Pheno| V2 |mn",
    "Phenom| V2 |n",
    "Phenomn| V2 |",
    "Phenomn| V2 |",
    "Phenom|n V2 |",
    "Pheno|mn V2 |",
    "Phen|omn V2 |",
    "Phe|nomn V2 |",
    "Ph|enomn V2 |",
    "P|henomn V2 |",
    "|Phenomn V2 |",
    "| Phenomn V2 |",
  ],
  nemesis: { arr: ["n3m3sis", "nemesis"], speed: 4 }, //todo speed
  "LegiFard.pw": [
    "L",
    "L3",
    "Leg",
    "L3g1",
    "LegiF",
    "L3g1F2",
    "LegiFar",
    "L3g1F2r5",
    "LegiFard.",
    "L3g1F2r5.|^",
    "|_egiFard.pw",
    "L3giFard.pw",
    "Le6iFard.pw",
    "Leg1|=ard.pw",
    "LegiF2rd.pw",
    "LegiFa|^d.pw",
    "LegiFar5.pw",
    "egiFard.p",
    "giFard.",
    "iFard",
    "Far",
    "giFar",
    "Fa",
    "t",
    "at",
    "eat",
    "heat",
    "Cheat",
    "st Cheat",
    "Best Cheat",
    "B3st Cheat",
    "Be5t Cheat",
    "Bes+ Cheat",
    "Best 6heat",
    "Best C|=eat",
    "Best Ch3at",
    "Best Che2t",
    "Best Chea+",
    "Cheat",
    "eat",
    "t",
  ],
  LuckyCharms: "☘ LuckyCharms", //todo
  "skeet.cc": "skeet.cc",
  legendware: {
    arr: arrayOffset([""].concat(textShowHide("legendware", 1)), -4),
    speed: 10.25,
  },
  "WEAVE.SU": [
    //todo
    "WEAVE.SU",
    "W3AVE.SU",
    "WE4VE.SU",
    "WEA\\/E.SU",
    "WEAV3.SU",
    "WEAVE.5U",
    "WEAVE.S?",
    "W34V3.SU",
    "WE4VE.SU",
    "WEAVE.SU",
  ],
};
//todo copy enemy player

// ⭕⃤" ☢ ☣ ☪ ☮ ☯☹ ☺ ☻ ( ఠ ͟ʖ ఠ) ( ಠ ʖ̯ ಠ) ヅツ⚇⚆⚉⚈☹☺☻☭✌"✃✂✁☸⛧⛏

///////////////////

UI.AddLabel("_____________ Clantag ______________");
const dropdownTitle = "ClanTag";
const speedTitle = "Speed";

const scriptItems = ["Misc", "JAVASCRIPT", "Script Items"];
const clantagNames = Object.keys(clantags);

UI.AddDropdown(dropdownTitle, ["disabled"].concat(clantagNames));
UI.AddSliderInt(speedTitle, 1, 10);
//UI.AddSliderFloat(speedTitle, 0.5, 6);
UI.SetEnabled(scriptItems, speedTitle, false);

var lastUpdateTimestamp = 0;

function main() {
  if (!World.GetServerString()) return;

  const tag = UI.GetValue(scriptItems[2], dropdownTitle);
  const speed = UI.GetValue(scriptItems[2], speedTitle);

  if (tag === 0) {
    if (lastUpdateTimestamp === -1) return;

    removeClantag();
    lastUpdateTimestamp = -1;
    UI.SetEnabled(scriptItems, speedTitle, false);
    return;
  }

  const currentClantagName = clantagNames[tag - 1];
  const clantagEntry = clantags[currentClantagName];
  var currentTimestamp = calcTimestamp(speed);
  var newClantagCandidate = "";

  if (typeof clantagEntry === "object") {
    if (!!clantagEntry.length) {
      // Array<string>
      if (currentTimestamp === lastUpdateTimestamp) return;

      const index = currentTimestamp % clantagEntry.length;

      UI.SetEnabled(scriptItems, speedTitle, true);

      newClantagCandidate = clantagEntry[index];
    } else {
      // Object {arr: Array<sting>, speed?: number}
      if ("speed" in clantagEntry) {
        UI.SetEnabled(scriptItems, speedTitle, false); // todo UI.IsMenuOpen
        currentTimestamp = calcTimestamp(clantagEntry.speed);
      } else {
        UI.SetEnabled(scriptItems, speedTitle, true);
      }

      if ("arr" in clantagEntry) {
        const index = currentTimestamp % clantagEntry.arr.length;

        newClantagCandidate = clantagEntry.arr[index];
      }
    }

    Local.SetClanTag(newClantagCandidate);
  } else {
    if (typeof clantagEntry === "function") {
      // function(currentTimestamp, speed)
      if (currentTimestamp === lastUpdateTimestamp) return;
      UI.SetEnabled(scriptItems, speedTitle, true);
      Local.SetClanTag(clantagEntry(currentTimestamp, speed));
    } else if (typeof clantagEntry === "string") {
      // Static string
      if (currentTimestamp === lastUpdateTimestamp) return;
      UI.SetEnabled(scriptItems, speedTitle, false);
      Local.SetClanTag(clantagEntry);
    }
  }
  lastUpdateTimestamp = currentTimestamp;
}
Cheat.RegisterCallback("Draw", "main");

UI.SetEnabled("Misc", "GENERAL", "Miscellaneous", "Clantag", false);
function onDestroy() {
  removeClantag();
  UI.SetEnabled("Misc", "GENERAL", "Miscellaneous", "Clantag", true);
}
Cheat.RegisterCallback("Unload", "onDestroy");

///////////////////

function calcTimestamp(speed) {
  return parseInt((Globals.Curtime() * speed) / 2);
}

function removeClantag() {
  Local.SetClanTag("");
}

// todo ex.
function textShowHide(text, numOfHalf) {
  const len = text.length;
  var out = [];
  var i;

  if (typeof numOfHalf !== "number") numOfHalf = 3;

  for (i = 0; i < numOfHalf; ++i) {
    out.push(text);
  }

  for (i = 1; i < len; ++i) {
    const cropped = text.substr(0, len - i);

    out.unshift(cropped);
    out.push(cropped);
  }

  return out;
}

// todo ex.
function arrWrap(arr, text, count) {
  var out = [].concat(arr);

  for (var i = 0; i < count; ++i) {
    out.unshift(text);
    out.push(text);
  }

  return out;
}

// todo ex.
function arrAddSuffix(arr, text) {
  var out = [].concat(arr);

  for (var i = 0; i < out.length; ++i) {
    out[i] += text;
  }

  return out;
}

// todo ex.
function textShowHideBackward(text, numOfHalf) {
  const len = text.length;
  var out = [];
  var i;

  if (!numOfHalf) numOfHalf = 3;
  for (i = 0; i < numOfHalf; ++i) {
    out.push(text);
  }

  for (i = 1; i < len + 2; ++i) {
    out.unshift(text.substr(0, len - i));
    out.push(text.substr(i, len));
  }

  return out;
}

// todo ex.
function textSlide(text) {
  var out = [text, text, text];
  const len = text.length;

  for (var i = 1; i < len + 2; ++i) {
    out.push(text.substr(i) + " " + text.substr(-len, i));
  }

  return out;
}

// todo ex.
function textSlideOnetap(text) {
  var out = [text];
  const len = text.length;

  for (var i = 1; i < len; ++i) {
    out.push(text.substr(i) + text.substr(-len, i));
  }

  return out;
}

// todo ex.
function textHide(text) {
  var out = [text, text, text];
  const len = text.length;

  for (var i = 1; i < len + 2; ++i) {
    out.push(text.substr(i));
  }

  return out;
}

// todo ex.
function textSpaceForward(text) {
  var out = [text, text, text];
  const len = text.length;

  for (var i = 1; i < len + 2; ++i) {
    var separator = " ";

    if (i >= len) separator = "";

    out.push(text.substr(-len, i) + separator + text.substr(i));
  }

  return out;
}

// todo ex.
function textSpaceForwardBackward(text) {
  var out = [text, text, text];
  const len = text.length;

  for (var i = 1; i < len + 2; ++i) {
    var separator = " ";

    if (i >= len) separator = "";

    var entity = text.substr(-len, i) + separator + text.substr(i);

    out.unshift(entity);
    out.push(entity);
  }

  return out;
}

// todo ex.
function textSuffix(arr, firstHalf, lastHalf, fromStart) {
  if (!arr) return [];
  if (!firstHalf) firstHalf = "";

  const len = arr.length;
  var out = [].concat(arr);
  var i;

  if (!!lastHalf) {
    const halfLen = Math.floor(len / 2);

    for (i = 0; i < halfLen; ++i) {
      out[i] += fromStart ? firstHalf : i === 0 ? "" : firstHalf;
      out[len - i - 1] += fromStart ? lastHalf : i === 0 ? "" : lastHalf;
    }
  } else {
    for (i = 0; i < len; ++i) {
      out[i] += fromStart
          ? firstHalf
          : i === 0 || i === len - 1
              ? ""
              : firstHalf;
    }
  }

  return out;
}

// [1,2,3]     -> [1,2,3,3,2,1]
// ([1,2,3],1) -> [1,2,3,  2,1]
function arrConcatReverse(arr, removeNHalf, removeNLast) {
  var arrCopyReversed = arr
      .slice(
          0,
          arr.length - 1 - (typeof removeNHalf === "number" ? removeNHalf : 0)
      )
      .reverse();

  for (
      var i = 0;
      i < (typeof removeNHalf === "number" ? removeNLast : 0);
      i++
  ) {
    arrCopyReversed.pop();
  }

  return arr.concat(arrCopyReversed);
}

// ([1,2,3], 1) -> [3,1,2]
// ([1,2,3],-1) -> [2,3,1]
function arrayOffset(arr, offset) {
  const lowerOffset = offset % arr.length; // For large num
  var out = arr.slice(0, arr.length); // Copy
  var i;

  if (lowerOffset < 0) for (i = 0; i < -lowerOffset; ++i) out.push(out.shift());
  else for (i = 0; i < lowerOffset; ++i) out.unshift(out.pop());

  return out;
}
