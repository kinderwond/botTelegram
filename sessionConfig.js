const Telegraf = require("telegraf")
const LocalSession = require("telegraf-session-local")

const property = "data",
  localSession = new LocalSession({
    database: "./db/db.json",
    property: "session",
    storage: LocalSession.storageFileAsync,
    format: {
      serialize: obj => JSON.stringify(obj, null, "\t"),
      deserialize: str => JSON.parse(str)
    }
  });

module.exports = localSession