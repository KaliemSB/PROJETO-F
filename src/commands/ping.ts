import { SlashCommandBuilder } from "discord.js"
import { Command } from "../common/types";

export = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Return pong.'),
	async execute() {
    console.log("interaction")
	},
} as Command;