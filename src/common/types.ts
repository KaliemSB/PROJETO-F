import { SlashCommandBuilder, ClientEvents } from "discord.js";

export interface Command {
	execute(...any: any[]): Promise<any>;
	data: SlashCommandBuilder;
}

export interface Event {
	execute(...any: any[]): Promise<void>;
	once: boolean;
	name: keyof ClientEvents;
}
