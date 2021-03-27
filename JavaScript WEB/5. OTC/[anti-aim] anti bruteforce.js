/*  
  Author: unknown, book777
  Version: 2
*/

UI.AddLabel("_____________ Antibruteforce _____________");

UI.AddDropdown("Anti Bruteforce", ["Off", "On Hit", "On Shot"]);

const hitboxGroups = [1, 6, 7];
var lastHitTime = 0.0;
var lastImpactTimes = [0.0];
var lastImpacts = [[0.0, 0.0, 0.0]];

function OnHurt() {
  if (UI.GetValue("Script Items", "Anti Bruteforce") !== 1) return;

  if (
    Entity.GetEntityFromUserID(Event.GetInt("userid")) !==
    Entity.GetLocalPlayer()
  )
    return;

  const hitbox = Event.GetInt("hitgroup");

  if (hitboxGroups.indexOf(hitbox) > -1) {
    //head, both toe
    const curtime = Global.Curtime();
    if (Math.abs(lastHitTime - curtime) > 0.5) {
      //0.2s backtrack + 0.2 extand + 0.1 extra
      lastHitTime = curtime;
      Flip();
    }
  }
}
Cheat.RegisterCallback("player_hurt", "OnHurt");

function OnBulletImpact() {
  if (UI.GetValue("Script Items", "Anti Bruteforce") !== 2) return;

  const curtime = Global.Curtime();
  if (Math.abs(lastHitTime - curtime) < 0.5) return;

  const entity = Entity.GetEntityFromUserID(Event.GetInt("userid"));
  const impact = [
    Event.GetFloat("x"),
    Event.GetFloat("y"),
    Event.GetFloat("z"),
    curtime,
  ];

  var source;
  if (Entity.IsValid(entity) && Entity.IsEnemy(entity)) {
    if (!Entity.IsDormant(entity)) {
      source = Entity.GetEyePosition(entity);
    } else if (Math.abs(lastImpactTimes[entity] - curtime) < 0.1) {
      source = lastImpacts[entity];
    } else {
      lastImpacts[entity] = impact;
      lastImpactTimes[entity] = curtime;
      return;
    }

    const local = Entity.GetLocalPlayer();
    const localEye = Entity.GetEyePosition(local);
    const localOrigin = Entity.GetProp(local, "CBaseEntity", "m_vecOrigin");
    const localBody = VectorMultiply(VectorAdd(localEye, localOrigin), [
      0.5,
      0.5,
      0.5,
    ]);

    const bodyVec = ClosestPointOnRay(localBody, source, impact);
    const bodyDist = VectorDistance(localBody, bodyVec);

    if (bodyDist < 85.0) {
      // He clearly shot at us!
      const realAngle = Local.GetRealYaw();
      const fakeAngle = Local.GetFakeYaw();
      const headVec = ClosestPointOnRay(localEye, source, impact);
      const headDist = VectorDistance(localEye, headVec);
      const feetVec = ClosestPointOnRay(localOrigin, source, impact);
      const feetDist = VectorDistance(localOrigin, feetVec);

      var closestRayPoint;
      var realPos;
      var fakePos;

      if (bodyDist < headDist && bodyDist < feetDist) {
        // Pelvis (pelvis direction = goalfeetyaw + 180)
        closestRayPoint = bodyVec;

        realPos = ExtendVector(bodyVec, realAngle + 180.0, 10.0);
        fakePos = ExtendVector(bodyVec, fakeAngle + 180.0, 10.0);
      } else if (feetDist < headDist) {
        // Toe (toe direction = goalfeetyaw -30 +- 90)
        closestRayPoint = feetVec;

        const realPos1 = ExtendVector(bodyVec, realAngle - 30.0 + 60.0, 10.0);
        const realPos2 = ExtendVector(bodyVec, realAngle - 30.0 - 60.0, 10.0);
        const fakePos1 = ExtendVector(bodyVec, fakeAngle - 30.0 + 60.0, 10.0);
        const fakePos2 = ExtendVector(bodyVec, fakeAngle - 30.0 - 60.0, 10.0);

        if (
          VectorDistance(feetVec, realPos1) < VectorDistance(feetVec, realPos2)
        )
          realPos = realPos1;
        else realPos = realPos2;

        if (
          VectorDistance(feetVec, fakePos1) < VectorDistance(feetVec, fakePos2)
        )
          fakePos = fakePos1;
        else fakePos = fakePos2;
      } else {
        closestRayPoint = headVec;
        realPos = ExtendVector(bodyVec, realAngle, 10.0);
        fakePos = ExtendVector(bodyVec, fakeAngle, 10.0);
      }

      if (
        VectorDistance(closestRayPoint, fakePos) <
        VectorDistance(closestRayPoint, realPos)
      ) {
        // Shot at our fake. They will probably not gonna shoot it again.
        lastHitTime = curtime;
        Flip();
      }
    }

    lastImpacts[entity] = impact;
    lastImpactTimes[entity] = curtime;
  }
}
Cheat.RegisterCallback("bullet_impact", "OnBulletImpact");

////////////

function radian(degree) {
  return (degree * Math.PI) / 180.0;
}

function ExtendVector(vector, angle, extension) {
  var radianAngle = radian(angle);
  return [
    extension * Math.cos(radianAngle) + vector[0],
    extension * Math.sin(radianAngle) + vector[1],
    vector[2],
  ];
}

function VectorAdd(a, b) {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

function VectorSubtract(a, b) {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function VectorMultiply(a, b) {
  return [a[0] * b[0], a[1] * b[1], a[2] * b[2]];
}

function VectorLength(x, y, z) {
  return Math.sqrt(x * x + y * y + z * z);
}

function VectorNormalize(vec) {
  var length = VectorLength(vec[0], vec[1], vec[2]);
  return [vec[0] / length, vec[1] / length, vec[2] / length];
}

function VectorDot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function VectorDistance(a, b) {
  return VectorLength(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
}

function ClosestPointOnRay(target, rayStart, rayEnd) {
  const to = VectorSubtract(target, rayStart);
  const dir = VectorNormalize(VectorSubtract(rayEnd, rayStart));
  const length = VectorLength(dir[0], dir[1], dir[2]);
  const rangeAlong = VectorDot(dir, to);

  if (rangeAlong < 0.0) {
    return rayStart;
  }
  if (rangeAlong > length) {
    return rayEnd;
  }
  return VectorAdd(
    rayStart,
    VectorMultiply(dir, [rangeAlong, rangeAlong, rangeAlong])
  );
}

function Flip() {
  UI.ToggleHotkey("Anti-Aim", "Fake angles", "Inverter");
}
