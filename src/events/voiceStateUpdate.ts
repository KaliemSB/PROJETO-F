import {
	Events,
	VoiceState,
	ChannelType,
	Collection,
	VoiceBasedChannel,
} from "discord.js";
import { Utils } from "@common/utils";
import { Event } from "@common/types";

const VOICE_AUTOCLONE_CATEGORY = "1049396541258993747";
const CHANNELS_QUANTITY_KEEP = 1
const AUTOCLONE_CHANNEL_NAME = 'Geral'

export = {
	name: Events.VoiceStateUpdate,
	once: false,
	async execute(voiceState: VoiceState): Promise<void> {
		const { client } = voiceState;

		const utils = new Utils(client)
		const guild = await utils.fetchUpdatedGuild()

		const category = await guild.channels.fetch(VOICE_AUTOCLONE_CATEGORY)

		if (category?.type === ChannelType.GuildCategory) {
			const GuildChannelManager = guild.channels;

			const voiceChannels = category.children.cache.filter(channel => channel.isVoiceBased()) as Collection<string, VoiceBasedChannel>

			const hasAllVoiceChannelsFilled = voiceChannels.every(channel => channel.members.size > 0)

			if (hasAllVoiceChannelsFilled) {
				await GuildChannelManager?.create({
					name: AUTOCLONE_CHANNEL_NAME,
					type: ChannelType.GuildVoice,
					parent: category?.id,
				});
			}

			const emptyVoiceChannelsIds = voiceChannels
				.filter(channel => channel.members.size === 0)
				.map(channel => channel.id)
				.slice(CHANNELS_QUANTITY_KEEP)

			await Promise.all(emptyVoiceChannelsIds.map((id) => GuildChannelManager?.delete(id)))
		}
	},
} as Event;
