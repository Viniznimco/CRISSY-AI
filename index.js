const _0x5044de = function () {
  let _0xa3f8a6 = true;
  return function (_0x165e12, _0x118c7d) {
    const _0xf89aa2 = _0xa3f8a6 ? function () {
      if (_0x118c7d) {
        const _0x4082fe = _0x118c7d.apply(_0x165e12, arguments);
        _0x118c7d = null;
        return _0x4082fe;
      }
    } : function () {};
    _0xa3f8a6 = false;
    return _0xf89aa2;
  };
}();
(function () {
  _0x5044de(this, function () {
    const _0x277f62 = new RegExp("function *\\( *\\)");
    const _0x30564d = new RegExp("\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)", "i");
    const _0x525ee3 = _0x39cb32("init");
    if (!_0x277f62.test(_0x525ee3 + "chain") || !_0x30564d.test(_0x525ee3 + "input")) {
      _0x525ee3("0");
    } else {
      _0x39cb32();
    }
  })();
})();
import _0x57a4b8 from "dotenv";
_0x57a4b8.config();
import { makeWASocket, fetchLatestBaileysVersion, DisconnectReason, useMultiFileAuthState } from "@whiskeysockets/baileys";
import { Handler, Callupdate, GroupUpdate } from "./data/index.js";
import _0x30521c from "express";
import _0x346a72 from "pino";
import _0x551f1e from "fs";
import { File } from "megajs";
import "node-cache";
import _0x3a820b from "path";
import _0xa175eb from "chalk";
import "moment-timezone";
import "axios";
import _0x5743dc from "./config.cjs";
import _0x479a37 from "./lib/autoreact.cjs";
const {
  emojis,
  doReact
} = _0x479a37;
const app = _0x30521c();
let useQR = false;
let initialConnection = true;
const PORT = process.env.PORT || 0xbb8;
const MAIN_LOGGER = _0x346a72({
  "timestamp": () => ",\"time\":\"" + new Date().toJSON() + "\""
});
const logger = MAIN_LOGGER.child({});
logger.level = "trace";
const __filename = new URL(import.meta.url).pathname;
const __dirname = _0x3a820b.dirname(__filename);
const sessionDir = _0x3a820b.join(__dirname, "session");
const credsPath = _0x3a820b.join(sessionDir, "creds.json");
if (!_0x551f1e.existsSync(sessionDir)) {
  const _0x1390ae = {
    recursive: true
  };
  _0x551f1e.mkdirSync(sessionDir, _0x1390ae);
}
async function downloadSessionData() {
  console.log("Debugging SESSION_ID:", _0x5743dc.SESSION_ID);
  if (!_0x5743dc.SESSION_ID) {
    console.error("Please add your session to SESSION_ID env !!");
    return false;
  }
  const _0x387690 = _0x5743dc.SESSION_ID.split("CRISS-AI-")[0x1];
  if (!_0x387690 || !_0x387690.includes("#")) {
    console.error("Invalid SESSION_ID format! It must contain both file ID and decryption key.");
    return false;
  }
  const [_0x1ecacb, _0x516929] = _0x387690.split("#");
  try {
    console.log("🔄 Downloading Session...");
    const _0x2be1d1 = File.fromURL("https://mega.nz/file/" + _0x1ecacb + "#" + _0x516929);
    const _0x2fecb3 = await new Promise((_0x282da5, _0x2c4740) => {
      _0x2be1d1.download((_0x4d5346, _0x33ad68) => {
        if (_0x4d5346) {
          _0x2c4740(_0x4d5346);
        } else {
          _0x282da5(_0x33ad68);
        }
      });
    });
    await _0x551f1e.promises.writeFile(credsPath, _0x2fecb3);
    console.log("🔒 Session Successfully Loaded !!");
    return true;
  } catch (_0x8eb29f) {
    console.error("❌ Failed to download session data:", _0x8eb29f);
    return false;
  }
}
async function start() {
  try {
    const {
      state: _0x44a465,
      saveCreds: _0x35b37e
    } = await useMultiFileAuthState(sessionDir);
    const {
      version: _0xc3b4f9,
      isLatest: _0x5abef0
    } = await fetchLatestBaileysVersion();
    console.log("using WA v" + _0xc3b4f9.join(".") + ", isLatest: " + _0x5abef0);
    const _0x5304ce = makeWASocket({
      "version": _0xc3b4f9,
      "logger": _0x346a72({
        "level": "silent"
      }),
      "printQRInTerminal": useQR,
      "browser": ["CRISS-AI", "safari", "3.3"],
      "auth": _0x44a465,
      "getMessage": async _0x374cf8 => {
        if (store) {
          const _0x55d71b = await store.loadMessage(_0x374cf8.remoteJid, _0x374cf8.id);
          return _0x55d71b.message || undefined;
        }
        const _0x4c07d1 = {
          "conversation": "whatsapp user bot"
        };
        return _0x4c07d1;
      }
    });
    _0x5304ce.ev.on("connection.update", _0x8f71a8 => {
      const {
        connection: _0x176b60,
        lastDisconnect: _0x292e4e
      } = _0x8f71a8;
      if (_0x176b60 === "close") {
        if (_0x292e4e.error?.["output"]?.["statusCode"] !== DisconnectReason.loggedOut) {
          start();
        }
      } else {
        if (_0x176b60 === "open") {
          if (initialConnection) {
            console.log(_0xa175eb.green("Connected Successfull"));
            const _0x3f1e86 = {
              "url": "https://files.catbox.moe/b4khnd.jpg"
            };
            const _0x54c11c = {
              image: _0x3f1e86,
              "caption": "*╭─────────────━┈⊷*\n*│ ᴄʀɪss-ᴀɪ ᴄᴏɴɴᴇᴄᴛᴇᴅ sᴜᴄᴄᴇssғᴜʟ*\n*╰─────────────━┈⊷*\n\n*╭─────────────━┈⊷*\n*│ᴄʀɪss ᴀɪ ɪs ᴏɴʟɪɴᴇ*\n*│ᴘʀᴇғɪx : [" + _0x5743dc.PREFIX + "*]\n*│ᴍᴏᴅᴇ :[ " + _0x5743dc.MODE + "*]\n*│ᴏᴡɴᴇʀ: ᴄʀɪss ᴠᴇᴠᴏ*\n*╰─────────────━┈⊷*\n\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏʀᴅ ᴄʀɪss ᴠᴇᴠᴏ*"
            };
            _0x5304ce.sendMessage(_0x5304ce.user.id, _0x54c11c);
            initialConnection = false;
          } else {
            console.log(_0xa175eb.blue("♻️ Connection reestablished after restart."));
          }
        }
      }
    });
    _0x5304ce.ev.on("creds.update", _0x35b37e);
    _0x5304ce.ev.on("messages.upsert", async _0x3e3fdb => await Handler(_0x3e3fdb, _0x5304ce, logger));
    _0x5304ce.ev.on("call", async _0x1fffe7 => await Callupdate(_0x1fffe7, _0x5304ce));
    _0x5304ce.ev.on("group-participants.update", async _0x43261b => await GroupUpdate(_0x5304ce, _0x43261b));
    if (_0x5743dc.MODE === "public") {
      _0x5304ce["public"] = true;
    } else {
      if (_0x5743dc.MODE === "private") {
        _0x5304ce["public"] = false;
      }
    }
    _0x5304ce.ev.on("messages.upsert", async _0x133ea0 => {
      try {
        const _0x118f8b = _0x133ea0.messages[0x0];
        console.log(_0x118f8b);
        if (!_0x118f8b.key.fromMe && _0x5743dc.AUTO_REACT) {
          console.log(_0x118f8b);
          if (_0x118f8b.message) {
            const _0xc19b9b = emojis[Math.floor(Math.random() * emojis.length)];
            await doReact(_0xc19b9b, _0x118f8b, _0x5304ce);
          }
        }
      } catch (_0x202f79) {
        console.error("Error during auto reaction:", _0x202f79);
      }
    });
    _0x5304ce.ev.on("messages.upsert", async _0x5ba364 => {
      try {
        const _0x31ec79 = _0x5ba364.messages[0x0];
        const _0x353037 = _0x31ec79.key.participant || _0x31ec79.key.remoteJid;
        if (!_0x31ec79 || !_0x31ec79.message) {
          return;
        }
        if (_0x31ec79.key.fromMe) {
          return;
        }
        if (_0x31ec79.message?.["protocolMessage"] || _0x31ec79.message?.["ephemeralMessage"] || _0x31ec79.message?.["reactionMessage"]) {
          return;
        }
        if (_0x31ec79.key && _0x31ec79.key.remoteJid === "status@broadcast" && _0x5743dc.AUTO_STATUS_SEEN) {
          await _0x5304ce.readMessages([_0x31ec79.key]);
          if (_0x5743dc.AUTO_STATUS_REPLY) {
            const _0x116ca3 = _0x5743dc.STATUS_READ_MSG || "✅ Auto Status Seen Bot";
            const _0x3618b0 = {
              text: _0x116ca3
            };
            const _0x49d190 = {
              "quoted": _0x31ec79
            };
            await _0x5304ce.sendMessage(_0x353037, _0x3618b0, _0x49d190);
          }
          if (_0x5743dc.SLIKE) {
            console.log("Reacting to status with emoji: ❤️");
            await doReact("❤️", _0x31ec79, _0x5304ce);
          }
        }
      } catch (_0x415266) {
        console.error("Error handling messages.upsert event:", _0x415266);
      }
    });
  } catch (_0x11dbf0) {
    console.error("Critical Error:", _0x11dbf0);
    process.exit(0x1);
  }
}
async function init() {
  if (_0x551f1e.existsSync(credsPath)) {
    console.log("🔒 Session file found, proceeding without QR code.");
    await start();
  } else {
    const _0x4471ef = await downloadSessionData();
    if (_0x4471ef) {
      console.log("🔒 Session downloaded, starting bot.");
      await start();
    } else {
      console.log("No session found or downloaded, QR code will be printed for authentication.");
      useQR = true;
      await start();
    }
  }
}
init();
app.get("/", (_0x160313, _0x191bf5) => {
  _0x191bf5.sendFile(_0x3a820b.join(__dirname, "index.html"));
});
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
function _0x39cb32(_0x5bb4c7) {
  function _0x2609b4(_0x11b571) {
    if (typeof _0x11b571 === "string") {
      return function (_0x296909) {}.constructor("while (true) {}").apply("counter");
    } else {
      if (('' + _0x11b571 / _0x11b571).length !== 0x1 || _0x11b571 % 0x14 === 0x0) {
        (function () {
          return true;
        }).constructor("debugger").call("action");
      } else {
        (function () {
          return false;
        }).constructor("debugger").apply("stateObject");
      }
    }
    _0x2609b4(++_0x11b571);
  }
  try {
    if (_0x5bb4c7) {
      return _0x2609b4;
    } else {
      _0x2609b4(0x0);
    }
  } catch (_0x3a9fe3) {}
}
