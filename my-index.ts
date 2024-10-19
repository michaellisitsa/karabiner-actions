import {
  ifVar,
  map,
  mapSimultaneous,
  rule,
  toKey,
  toRemoveNotificationMessage,
  toSetVar,
  withModifier,
  writeToProfile,
} from "karabiner.ts";

const L_GUI = "a";
const L_ALT = "s";
const L_CTRL = "d";
const L_SHIFT = "f";

const R_SHIFT = "j";
const R_ALT = "k";
const R_CTRL = "l";
const R_GUI = ";";

const KEY_DOWN_ORDER = "insensitive"; // strict is recommended if issues

writeToProfile(
  "Default profile",
  [
    // Alt: https://karabiner.ts.evanliu.dev/examples/modifier-keys/caps_lock-to-hyper
    //rule("Caps + Quote -> Hyper").manipulators([
    //  map("⇪")
    //    .toIfAlone("⇪", {}, { halt: true })
    //    .toDelayedAction(toNone(), [
    //      toStickyModifier("left_shift", "toggle"),
    //      toStickyModifier("left_control", "toggle"),
    //      toStickyModifier("left_option", "toggle"),
    //      toStickyModifier("left_command", "toggle"),
    //    ])
    //    .toIfHeldDown("left⇧", "left⌘⌥⌃", { halt: true }),
    //  map("'")
    //    .toIfAlone("'", {}, { halt: true })
    //    .toDelayedAction(toKey("vk_none"), toKey("'"))
    //    .toIfHeldDown("right⇧", "right⌘⌥⌃", { halt: true })
    //    .parameters({ "basic.to_if_held_down_threshold_milliseconds": 220 }),
    //]),

    rule(`Physical Escape; Virtual CAPS LOCK`).manipulators([
      withModifier("optionalAny")([
        map("caps_lock").condition(ifVar("caps_lock_state", 0)).to("escape"),
        map("caps_lock")
          .condition(ifVar("caps_lock_state", 1))
          .to(toSetVar("caps_lock_state", 0))
          .to("caps_lock"),
        map("escape")
          .condition(ifVar("caps_lock_state", 1))
          .to(toSetVar("caps_lock_state", 0))
          .to("caps_lock"),
        map("-").condition(ifVar("caps_lock_state", 1)).to("-", ["left⇧"]),
        map(";").condition(ifVar("caps_lock_state", 1)).to(";", ["left⇧"]),
      ]),
      mapSimultaneous([L_SHIFT, R_SHIFT])
        .to(toSetVar("caps_lock_state", 1))
        .to("caps_lock"),
    ]),

    // Home row mods
    rule(
      `Home Row Mods (GUI: ${L_GUI}, Ctrl: ${L_CTRL}, Alt: ${L_ALT}, Shift: ${L_SHIFT})`,
    ).manipulators([
      //
      // Four - left hand
      // PLANNED: Add notifications to more easily troubleshoot timing
      mapSimultaneous([L_SHIFT, L_CTRL, L_ALT, L_GUI], {
        to_after_key_up: [toRemoveNotificationMessage("id")],
      })
        .toIfHeldDown("left⇧", ["l⌘⌥⌃"])
        .toNotificationMessage("id", "All four"),
      //
      // Three - left hand
      mapSimultaneous([L_SHIFT, L_CTRL, L_ALT]).toIfHeldDown("left⇧", ["l⌥⌃"]),
      mapSimultaneous([L_SHIFT, L_ALT, L_GUI]).toIfHeldDown("left⇧", ["l⌘⌥"]),
      mapSimultaneous([L_CTRL, L_ALT, L_GUI]).toIfHeldDown("left⌃", ["l⌘⌥"]),
      //
      // Two - left hand
      mapSimultaneous([L_SHIFT, L_CTRL], { key_down_order: KEY_DOWN_ORDER })
        .toIfAlone(L_SHIFT)
        .toIfAlone(L_CTRL)
        .toIfHeldDown("left⇧", "left⌃"),
      mapSimultaneous([L_CTRL, L_SHIFT], { key_down_order: KEY_DOWN_ORDER })
        .toIfAlone(L_CTRL)
        .toIfAlone(L_SHIFT)
        .toIfHeldDown("left⇧", "left⌃"),
      mapSimultaneous([L_SHIFT, L_ALT], { key_down_order: KEY_DOWN_ORDER })
        .toIfAlone(L_SHIFT)
        .toIfAlone(L_ALT)
        .toIfHeldDown("left⇧", "left⌥"),
      mapSimultaneous([L_ALT, L_SHIFT], { key_down_order: KEY_DOWN_ORDER })
        .toIfAlone(L_ALT)
        .toIfAlone(L_SHIFT)
        .toIfHeldDown("left⇧", "left⌥"),
      mapSimultaneous([L_SHIFT, L_GUI], { key_down_order: KEY_DOWN_ORDER })
        .toIfAlone(L_SHIFT)
        .toIfAlone(L_GUI)
        .toIfHeldDown("left⇧", "left⌘"),
      mapSimultaneous([L_GUI, L_SHIFT], { key_down_order: KEY_DOWN_ORDER })
        .toIfAlone(L_GUI)
        .toIfAlone(L_SHIFT)
        .toIfHeldDown("left⇧", "left⌘"),
      mapSimultaneous([L_CTRL, L_ALT], { key_down_order: KEY_DOWN_ORDER })
        .toIfAlone(L_CTRL)
        .toIfAlone(L_ALT)
        .toIfHeldDown("left⌃", "left⌥"),
      mapSimultaneous([L_ALT, L_CTRL], { key_down_order: KEY_DOWN_ORDER })
        .toIfAlone(L_ALT)
        .toIfAlone(L_CTRL)
        .toIfHeldDown("left⌃", "left⌥"),
      mapSimultaneous([L_CTRL, L_GUI], { key_down_order: KEY_DOWN_ORDER })
        .toIfAlone(L_CTRL)
        .toIfAlone(L_GUI)
        .toIfHeldDown("left⌃", "left⌘"),
      mapSimultaneous([L_GUI, L_CTRL], { key_down_order: KEY_DOWN_ORDER })
        .toIfAlone(L_GUI)
        .toIfAlone(L_CTRL)
        .toIfHeldDown("left⌃", "left⌘"),
      mapSimultaneous([L_ALT, L_GUI], { key_down_order: KEY_DOWN_ORDER })
        .toIfAlone(L_ALT)
        .toIfAlone(L_GUI)
        .toIfHeldDown("left⌥", "left⌘"),
      mapSimultaneous([L_GUI, L_ALT], { key_down_order: KEY_DOWN_ORDER })
        .toIfAlone(L_GUI)
        .toIfAlone(L_ALT)
        .toIfHeldDown("left⌥", "left⌘"),
      //
      // One - left hand
      map(L_SHIFT)
        .toIfAlone(L_SHIFT, {}, { halt: true })
        .toDelayedAction(toKey("vk_none"), toKey(L_SHIFT))
        // PLANNED: would be nice to have notification feedback, but doesn't work
        // .toAfterKeyUp(toRemoveNotificationMessage("L_SHIFT"))
        // .toNotificationMessage("L_SHIFT", "L_SHIFT")
        .toIfHeldDown("left⇧", {}, { halt: true }),
      map(L_CTRL)
        .toIfAlone(L_CTRL, {}, { halt: true })
        .toDelayedAction(toKey("vk_none"), toKey(L_CTRL))
        .toIfHeldDown("left⌃", {}, { halt: true }),
      map(L_ALT)
        .toIfAlone(L_ALT, {}, { halt: true })
        .toDelayedAction(toKey("vk_none"), toKey(L_ALT))
        .toIfHeldDown("left⌥", {}, { halt: true }),
      map(L_GUI)
        .toIfAlone(L_GUI, {}, { halt: true })
        .toDelayedAction(toKey("vk_none"), toKey(L_GUI, {}, { halt: true }))
        .toIfHeldDown("left⌘", {}, { halt: true }),
      //
      //
      // Four - right hand
      mapSimultaneous([R_GUI, R_CTRL, R_ALT, R_SHIFT]).toIfHeldDown("right⇧", [
        "right⌘⌥⌃",
      ]),
      //
      // Three - right hand
      mapSimultaneous([R_SHIFT, R_ALT, R_CTRL]).toIfHeldDown("right⇧", [
        "right⌥⌃",
      ]),
      mapSimultaneous([R_SHIFT, R_CTRL, R_GUI]).toIfHeldDown("right⇧", [
        "right⌘⌥",
      ]),
      mapSimultaneous([R_ALT, R_CTRL, R_GUI]).toIfHeldDown("right⌃", [
        "right⌘⌥",
      ]),
      //
      // Two - right hand
      mapSimultaneous([R_SHIFT, R_ALT], { key_down_order: KEY_DOWN_ORDER })
        .toIfAlone(R_SHIFT)
        .toIfAlone(R_ALT)
        .toIfHeldDown("right⇧", "right⌃"),
      mapSimultaneous([R_ALT, R_SHIFT], { key_down_order: KEY_DOWN_ORDER })
        .toIfAlone(R_ALT)
        .toIfAlone(R_SHIFT)
        .toIfHeldDown("right⇧", "right⌃"),
      mapSimultaneous([R_SHIFT, R_CTRL], { key_down_order: KEY_DOWN_ORDER })
        .toIfAlone(R_SHIFT)
        .toIfAlone(R_CTRL)
        .toIfHeldDown("right⇧", "right⌥"),
      mapSimultaneous([R_CTRL, R_SHIFT], { key_down_order: KEY_DOWN_ORDER })
        .toIfAlone(R_CTRL)
        .toIfAlone(R_SHIFT)
        .toIfHeldDown("right⇧", "right⌥"),
      mapSimultaneous([R_SHIFT, R_GUI], { key_down_order: KEY_DOWN_ORDER })
        .toIfAlone(R_SHIFT)
        .toIfAlone(R_GUI)
        .toIfHeldDown("right⇧", "right⌘"),
      mapSimultaneous([R_GUI, R_SHIFT], { key_down_order: KEY_DOWN_ORDER })
        .toIfAlone(R_GUI)
        .toIfAlone(R_SHIFT)
        .toIfHeldDown("right⇧", "right⌘"),
      mapSimultaneous([R_ALT, R_CTRL], { key_down_order: KEY_DOWN_ORDER })
        .toIfAlone(R_ALT)
        .toIfAlone(R_CTRL)
        .toIfHeldDown("right⌃", "right⌥"),
      mapSimultaneous([R_CTRL, R_ALT], { key_down_order: KEY_DOWN_ORDER })
        .toIfAlone(R_CTRL)
        .toIfAlone(R_ALT)
        .toIfHeldDown("right⌃", "right⌥"),
      mapSimultaneous([R_ALT, R_GUI], { key_down_order: KEY_DOWN_ORDER })
        .toIfAlone(R_ALT)
        .toIfAlone(R_GUI)
        .toIfHeldDown("right⌃", "right⌘"),
      mapSimultaneous([R_GUI, R_ALT], { key_down_order: KEY_DOWN_ORDER })
        .toIfAlone(R_GUI)
        .toIfAlone(R_ALT)
        .toIfHeldDown("right⌃", "right⌘"),
      mapSimultaneous([R_CTRL, R_GUI], { key_down_order: KEY_DOWN_ORDER })
        .toIfAlone(R_CTRL)
        .toIfAlone(R_GUI)
        .toIfHeldDown("right⌥", "right⌘"),
      mapSimultaneous([R_GUI, R_CTRL], { key_down_order: KEY_DOWN_ORDER })
        .toIfAlone(R_GUI)
        .toIfAlone(R_CTRL)
        .toIfHeldDown("right⌥", "right⌘"),
      //
      // One - right hand
      map(R_SHIFT)
        .toIfAlone(R_SHIFT, {}, { halt: true })
        .toDelayedAction(toKey("vk_none"), toKey(R_SHIFT))
        .toIfHeldDown("right⇧", {}, { halt: true }),
      map(R_ALT)
        .toIfAlone(R_ALT, {}, { halt: true })
        .toDelayedAction(toKey("vk_none"), toKey(R_ALT))
        .toIfHeldDown("right⌃", {}, { halt: true }),
      map(R_CTRL)
        .toIfAlone(R_CTRL, {}, { halt: true })
        .toDelayedAction(toKey("vk_none"), toKey(R_CTRL))
        .toIfHeldDown("right⌥", {}, { halt: true }),
      map(R_GUI)
        .toIfAlone(R_GUI, {}, { halt: true })
        .toDelayedAction(toKey("vk_none"), toKey(R_GUI))
        .toIfHeldDown("right⌘", {}, { halt: true }),
    ]),
  ],
  {
    "basic.to_if_alone_timeout_milliseconds": 300, // Default 1000
    "basic.to_if_held_down_threshold_milliseconds": 150, // Default 500
    "basic.to_delayed_action_delay_milliseconds": 300, // Default 500
    "basic.simultaneous_threshold_milliseconds": 45, // Default 50
  },
);
