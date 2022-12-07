import { Client, Guild } from "discord.js"

export class Utils {
  public client: Client<boolean>;

  constructor (c: Client) {
    this.client = c;
  }

  fetchUpdatedGuild (): Promise<Guild> {
    return this.client.guilds.fetch(process.env.DISCORD_GUILD_ID!);
  }
}
