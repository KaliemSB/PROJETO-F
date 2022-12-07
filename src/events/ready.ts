import { Events } from "discord.js";

export = {
  name: Events.ClientReady,
  once: true,
  execute() {
    console.log("BOT Running.")
  }
}