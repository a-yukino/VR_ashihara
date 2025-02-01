// avatar.js

// 他のユーザーの移動状態を管理するマップ
const userMovementStates = new Map();

// 移動検知の閾値と遅延設定
const MOVEMENT_THRESHOLD = 0.1;
const STOP_DELAY = 500; // ミリ秒

// アームの位置設定
const ARM_POSITIONS = {
  default: {
    right: {
      rotation: "-67.2 83.16 15.56",
      position: "-0.11 -0.054 -0.28",
    },
    left: {
      rotation: "-65.0 -146.1 43.3",
      position: "0.096 -0.054 -0.27",
    },
  },
  moving: {
    right: {
      rotation: "-63.53 68.13 41.95",
      position: "-0.29439 0.04377 -0.09665",
    },
    left: {
      rotation: "-65.04 -146.10 43.31",
      position: "0.27278 0.04431 -0.13484",
    },
  },
};

// 表情変化の関数
function changeFace(emotion) {
  const avatar = document.querySelector("#mybody"); // 自分のアバターを取得
  if (!avatar) return;
  changeFaceForAvatar(avatar, emotion);
}

function changeFaceForAvatar(avatar, emotion) {
  const mouseElement = avatar.querySelector(".other_mouse");
  const eyebrow_L = avatar.querySelector(".other_eyebrow_L");
  const eyebrow_R = avatar.querySelector(".other_eyebrow_R");
  const eye_L = avatar.querySelector(".other_eye_L"); // 左目
  const eye_R = avatar.querySelector(".other_eye_R"); // 右目

  if (!mouseElement || !eyebrow_L || !eyebrow_R) return;

  switch (emotion) {
    case "neutral":
      // 口の設定
      mouseElement.setAttribute(
        "geometry",
        "primitive: torus; arc: 180; radiusTubular: 0.082"
      );
      mouseElement.setAttribute("rotation", "27.5 5.66 -177.38");
      mouseElement.setAttribute("scale", "0.016 0.008 0.016");
      mouseElement.setAttribute("position", "0 0.125 -0.29");
      mouseElement.setAttribute("material", "color: #230a05");
      // 眉の設定
      eyebrow_L.setAttribute("visible", false);
      eyebrow_R.setAttribute("visible", false);

      // 目の設定（デフォルトの大きさに戻す）
      eye_L.setAttribute("scale", "0.7 0.3 0.3");
      eye_R.setAttribute("scale", "0.7 0.3 0.3");
      break;

    case "happy":
      // 口の設定
      mouseElement.setAttribute(
        "geometry",
        "primitive: circle; thetaLength: 180"
      );
      mouseElement.setAttribute("rotation", "19.69 0 180");
      mouseElement.setAttribute("scale", "0.06 0.04 1");
      mouseElement.setAttribute("position", "0 0.122 -0.29");
      mouseElement.setAttribute("material", "side: double; color: #ff9999");
      // 眉の設定
      eyebrow_L.setAttribute("visible", false);
      eyebrow_R.setAttribute("visible", false);

      // 目の設定（デフォルトの大きさに戻す）
      eye_L.setAttribute("scale", "0.7 0.3 0.3");
      eye_R.setAttribute("scale", "0.7 0.3 0.3");
      break;

    case "sad":
      // 口の設定
      mouseElement.setAttribute(
        "geometry",
        "primitive: torus; arc: 180; radiusTubular: 0.082"
      );
      mouseElement.setAttribute("rotation", "27.5 5.66 -0");
      mouseElement.setAttribute("scale", "0.016 0.008 0.016");
      mouseElement.setAttribute("position", "0 0.125 -0.29");
      mouseElement.setAttribute("material", "color: #230a05");
      // 眉の設定
      eyebrow_L.setAttribute("visible", false);
      eyebrow_R.setAttribute("visible", false);

      // 目の設定（デフォルトの大きさに戻す）
      eye_L.setAttribute("scale", "0.7 0.3 0.3");
      eye_R.setAttribute("scale", "0.7 0.3 0.3");
      break;

    case "angry":
      // 口の設定
      mouseElement.setAttribute(
        "geometry",
        "primitive: torus; arc: 180; radiusTubular: 0.082"
      );
      mouseElement.setAttribute("rotation", "27.5 5.66 -0");
      mouseElement.setAttribute("scale", "0.016 0.008 0.016");
      mouseElement.setAttribute("position", "0 0.125 -0.29");
      mouseElement.setAttribute("material", "color: #230a05");
      // 眉の設定
      eyebrow_L.setAttribute("visible", true);
      eyebrow_R.setAttribute("visible", true);

      // 目の設定（デフォルトの大きさに戻す）
      eye_L.setAttribute("scale", "0.7 0.3 0.3");
      eye_R.setAttribute("scale", "0.7 0.3 0.3");
      break;

    case "fearful":
      // 口の設定
      mouseElement.setAttribute(
        "geometry",
        "primitive: torus; arc: 180; radiusTubular: 0.082"
      );
      mouseElement.setAttribute("rotation", "19.69 0 0");
      mouseElement.setAttribute("scale", "0.06 0.04 1");
      mouseElement.setAttribute("position", "0 0.112 -0.29");
      mouseElement.setAttribute("material", "side: double; color: #000000");
      // 眉の設定
      eyebrow_L.setAttribute("visible", false);
      eyebrow_R.setAttribute("visible", false);

      // 目の設定（デフォルトの大きさに戻す）
      eye_L.setAttribute("scale", "0.7 0.3 0.3");
      eye_R.setAttribute("scale", "0.7 0.3 0.3");
      break;

    case "disgusted":
      mouseElement.setAttribute("geometry", "primitive: box;");
      mouseElement.setAttribute(
        "rotation",
        "27.610263189559245 -1.1464885480567772 179.46871608441802"
      );
      mouseElement.setAttribute("scale", "0.0625 0.00578 0.01");
      mouseElement.setAttribute("position", "0 0.11326 -0.293");
      mouseElement.setAttribute("material", "side: double; color: #230a05");
      eyebrow_L.setAttribute("visible", false);
      eyebrow_R.setAttribute("visible", false);

      // 目の高さを0.5倍にする
      eye_L.setAttribute("scale", "0.7 0.15 0.3");
      eye_R.setAttribute("scale", "0.7 0.15 0.3");
      break;

    case "surprised":
      // 口の設定
      mouseElement.setAttribute(
        "geometry",
        "primitive: circle; thetaLength: 360"
      );
      mouseElement.setAttribute(
        "rotation",
        "19.694278292031786 0 179.9998479605043"
      );
      mouseElement.setAttribute("scale", "0.03146 0.02263 1.00821");
      mouseElement.setAttribute("position", "-0.00617 0.10388 -0.29645");
      mouseElement.setAttribute("material", "color: #ff9999");

      eyebrow_L.setAttribute("visible", false);
      eyebrow_R.setAttribute("visible", false);

      // **目の高さを2倍にする**
      eye_L.setAttribute("scale", "0.7 0.6 0.3"); // 0.3 * 1.5 = 0.45
      eye_R.setAttribute("scale", "0.7 0.6 0.3");
      break;

    default:
      // デフォルトの表情設定
      mouseElement.setAttribute(
        "geometry",
        "primitive: torus; arc: 180; radiusTubular: 0.082"
      );
      mouseElement.setAttribute("rotation", "27.5 5.66 -177.38");
      mouseElement.setAttribute("scale", "0.016 0.008 0.016");
      mouseElement.setAttribute("position", "0 0.125 -0.29");
      mouseElement.setAttribute("material", "color: #230a05");
      eyebrow_L.setAttribute("visible", false);
      eyebrow_R.setAttribute("visible", false);

      // 目の設定（デフォルトの大きさに戻す）
      eye_L.setAttribute("scale", "0.7 0.3 0.3");
      eye_R.setAttribute("scale", "0.7 0.3 0.3");
      break;
  }
}

// 他のユーザーの表情を更新する関数
function updateOtherUserExpression(id, expression) {
  const avatar = document.getElementById(id);
  if (!avatar) return;
  changeFaceForAvatar(avatar, expression);
}

// 他のユーザーのアバターを作成
function createOtherUserAvatar(id, color, name, position) {
  const avatar = document.createElement("a-sphere");
  avatar.setAttribute("id", id);
  avatar.setAttribute("radius", "0.3");
  avatar.setAttribute("scale", "0.65 0.9 0.6");
  avatar.setAttribute("color", color);
  avatar.classList.add("otherUser");
  avatar.object3D.position.set(position.x, position.y - 1, position.z);

  // 初期移動状態を設定
  userMovementStates.set(id, {
    position: new THREE.Vector3(position.x, position.y, position.z),
    moving: false,
    lastMoveTime: Date.now(),
    moveTimeout: null,
  });

  // アバターの各部品を追加
  const parts = getOtherUserParts();

  parts.forEach((part) => {
    const element = document.createElement(part.tag);
    Object.entries(part.attrs).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
    avatar.appendChild(element);
  });

  // 名前プレートを追加
  const namePlate = document.createElement("a-text");
  namePlate.setAttribute("value", name);
  namePlate.setAttribute("align", "center");
  namePlate.setAttribute("color", "white");
  namePlate.setAttribute("width", "2.5");
  namePlate.setAttribute("rotation", "0 180 0");
  namePlate.setAttribute("position", "0 0.45 0");
  avatar.appendChild(namePlate);

  document.querySelector("a-scene").appendChild(avatar);
}

// 他のユーザーのアバターの部品を定義
function getOtherUserParts() {
  return [
    // 顔
    {
      tag: "a-sphere",
      attrs: {
        class: "other_face",
        radius: "0.28",
        rotation: "28.2 0 0",
        scale: "0.6 0.45 0.25",
        position: "0 0.1 -0.22",
        color: "#fffaf0",
      },
    },
    // 右腕
    {
      tag: "a-sphere",
      attrs: {
        class: "other_arm_R",
        radius: "0.2",
        position: ARM_POSITIONS.default.right.position,
        rotation: ARM_POSITIONS.default.right.rotation,
        scale: "0.2 0.3 0.2",
        animation__rotation:
          "property: rotation; dur: 200; easing: easeOutQuad;",
        animation__position:
          "property: position; dur: 200; easing: easeOutQuad;",
      },
    },
    // 左腕
    {
      tag: "a-sphere",
      attrs: {
        class: "other_arm_L",
        radius: "0.2",
        position: ARM_POSITIONS.default.left.position,
        rotation: ARM_POSITIONS.default.left.rotation,
        scale: "0.2 0.3 0.2",
        animation__rotation:
          "property: rotation; dur: 200; easing: easeOutQuad;",
        animation__position:
          "property: position; dur: 200; easing: easeOutQuad;",
      },
    },
    // 右足
    {
      tag: "a-sphere",
      attrs: {
        class: "other_leg_R",
        radius: "0.25",
        scale: "0.3 0.3 0.3",
        position: "-0.15 -0.25 0.01",
        color: "#13316c",
      },
    },
    // 左足
    {
      tag: "a-sphere",
      attrs: {
        class: "other_leg_L",
        radius: "0.25",
        scale: "0.3 0.3 0.3",
        position: "0.15 -0.25 0.01",
        color: "#13316c",
      },
    },
    // 右目
    {
      tag: "a-sphere",
      attrs: {
        class: "other_eye_R",
        radius: "0.02",
        scale: "0.7 0.3 0.3",
        position: "-0.1 0.1389 -0.26",
        color: "#230a05",
      },
    },
    // 左目
    {
      tag: "a-sphere",
      attrs: {
        class: "other_eye_L",
        radius: "0.02",
        scale: "0.7 0.3 0.3",
        position: "0.1 0.1398 -0.26",
        color: "#230a05",
      },
    },
    // 右ほほ
    {
      tag: "a-sphere",
      attrs: {
        class: "other_right_cheek",
        radius: "0.02",
        rotation: "0 25.3 0",
        scale: "1.37 0.91 0.7",
        position: "-0.125 0.083 -0.265",
        material: "opacity: 0.1; color: #ff9985",
      },
    },
    // 左ほほ
    {
      tag: "a-sphere",
      attrs: {
        class: "other_left_cheek",
        radius: "0.02",
        rotation: "0 -25.3 0",
        scale: "1.37 0.91 0.7",
        position: "0.125 0.083 -0.265",
        material: "opacity: 0.1; color: #ff9985",
      },
    },
    // 口
    {
      tag: "a-entity",
      attrs: {
        class: "other_mouse",
        geometry: "primitive: circle; thetaLength: 180",
        material: "side: double; color: #ff9999",
        rotation: "19.694278292031786 0 179.9998479605043",
        scale: "0.06016 0.04 1",
        position: "-0.00098 0.12241 -0.28982",
      },
    },
    // 左眉
    {
      tag: "a-entity",
      attrs: {
        class: "other_eyebrow_L",
        geometry: "primitive: torus; arc: 120; radiusTubular: 0.082",
        material: "side: double; color: #230a05",
        rotation: "30.174822280564804 -12.232648926043076 -151.82407542715094",
        scale: "0.02042 0.01278 0.016",
        position: "0.09978 0.15898 -0.2522",
        visible: false,
      },
    },
    // 右眉
    {
      tag: "a-entity",
      attrs: {
        class: "other_eyebrow_R",
        geometry: "primitive: torus; arc: 120; radiusTubular: 0.082",
        material: "side: double; color: #230a05",
        rotation: "11.57202858825724 16.455920833952376 -169.09302337239393",
        scale: "0.02 0.01278 0.016",
        position: "-0.09538 0.15678 -0.25719",
        visible: false,
      },
    },
  ];
}

// 他のユーザーの位置と回転を更新
function updateOtherUserPosition(id, position, quaternionArray) {
  const avatar = document.getElementById(id);
  if (!avatar) return;

  const currentTime = Date.now();
  const newPosition = new THREE.Vector3(position.x, position.y, position.z);
  const newQuaternion = new THREE.Quaternion(
    quaternionArray[0],
    quaternionArray[1],
    quaternionArray[2],
    quaternionArray[3]
  );

  // 移動状態の初期化
  if (!userMovementStates.has(id)) {
    userMovementStates.set(id, {
      position: newPosition.clone(),
      moving: false,
      lastMoveTime: currentTime,
      moveTimeout: null,
    });
  }

  const state = userMovementStates.get(id);
  const distance = newPosition.distanceTo(state.position);

  // アバターの位置と回転を更新
  avatar.object3D.position.copy(newPosition);
  avatar.object3D.quaternion.copy(newQuaternion);

  // 移動が検知された場合
  if (distance > MOVEMENT_THRESHOLD) {
    if (!state.moving) {
      updateArmPositions(avatar, true);
      state.moving = true;
    }

    if (state.moveTimeout) {
      clearTimeout(state.moveTimeout);
    }

    state.moveTimeout = setTimeout(() => {
      updateArmPositions(avatar, false);
      state.moving = false;
      state.moveTimeout = null;
    }, STOP_DELAY);
  }

  // 状態を更新
  state.position.copy(newPosition);
  state.lastMoveTime = currentTime;
  userMovementStates.set(id, state);
}

// アームの位置をアニメーションで更新
function updateArmPositions(avatar, isMoving) {
  const arms = ["other_arm_R", "other_arm_L"];
  const targetPositions = isMoving
    ? ARM_POSITIONS.moving
    : ARM_POSITIONS.default;

  arms.forEach((armId) => {
    const arm = avatar.querySelector(`#${armId}`);
    if (arm) {
      const side = armId.endsWith("_r") ? "right" : "left";
      const target = targetPositions[side];

      arm.setAttribute("animation__rotation", {
        property: "rotation",
        to: target.rotation,
        dur: 200,
        easing: "easeOutQuad",
      });
      arm.setAttribute("animation__position", {
        property: "position",
        to: target.position,
        dur: 200,
        easing: "easeOutQuad",
      });
    }
  });
}
