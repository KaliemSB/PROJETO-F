import { Events, VoiceState, GuildMember, ChannelType, Collection, VoiceBasedChannel, GuildBasedChannel, CategoryChannel, GuildChannelManager } from "discord.js";
import { Utils } from "@common/utils"
import { Event } from "@common/types"

const VOICE_AUTOCLONE_CHANNEL = 'geral'
const VOICE_AUTOCLONE_CATEGORY = "canais de voz"

export = {
  name: Events.VoiceStateUpdate,
  once: false,
  async execute(voiceState: VoiceState): Promise<void> {
      const { client } = voiceState;
      const utils = new Utils(client)

      const guild = await utils.fetchUpdatedGuild()

      const voiceAutocloneChannels: Collection<string, GuildBasedChannel> = guild.channels.cache
        .filter(channel => channel.type === ChannelType.GuildVoice && channel.name.toLowerCase().startsWith(VOICE_AUTOCLONE_CHANNEL))
        

      const hasMemberInVoiceChannels = voiceAutocloneChannels.every(c => c.isVoiceBased() ? c.members.size > 0 : false)
      
      if (hasMemberInVoiceChannels) {
        const GuildChannelManager = guild.channels;

        const autocloneChannelsCategory = client.channels.cache
          .find(channel => channel.type === ChannelType.GuildCategory && channel.name.toLowerCase().startsWith(VOICE_AUTOCLONE_CATEGORY))

        console.log(autocloneChannelsCategory)

        await GuildChannelManager?.create({
          name: "Geral",
          type: ChannelType.GuildVoice,
          parent: autocloneChannelsCategory?.id,
        });
      }    
  }
} as Event;
