import { Message, SlashCommandBuilder } from "discord.js";
import { Command } from "../common/types";

export = {
	data: new SlashCommandBuilder().setName("ping").setDescription("Return pong."),
	async execute(interation: Message) {
		return interation.reply("Pong!");
	},
} as Command;
