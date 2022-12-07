import { GatewayIntentBits } from "discord.js";
import { ExtendedClient } from "@common/client";
import dotenv from "dotenv";
dotenv.config();

new ExtendedClient({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildVoiceStates,
	],
}).init();
