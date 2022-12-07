import { Events, VoiceState } from "discord.js";

export = {
  name: Events.VoiceStateUpdate,
  once: false,
  async execute(interaction: VoiceState) {
    console.log(interaction)
  }
}