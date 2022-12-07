import { Client, Collection, REST, Routes } from "discord.js";
import { Command, Event } from "@common/types";
import path from "node:path";
import { readdirSync } from "node:fs";

export class ExtendedClient extends Client {
  public commands: Collection<string, Command> = new Collection();
  public events: Collection<string, Event> = new Collection();

  public async init() {
    this.login(process.env.DISCORD_TOKEN);

    const commandPath = path.join(__dirname, "..", "commands");
    const eventsPath = path.join(__dirname, "..", "events");
    const commands = readdirSync(commandPath).filter((file: string) => file.endsWith(".ts"));
    const events = readdirSync(eventsPath).filter((file: string) => file.endsWith(".ts"));
    const commandsData = (await Promise.all(commands.map((file: string) => {
      return import(`${commandPath}/${file}`)
    }))).map((command: Command) => command.data.toJSON())

    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN!);

    try {
      await rest.put(
        Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID!, process.env.DISCORD_GUILD_ID!),
        { body: commandsData },
      );
    } catch (error) {
      console.log(error)
    }

    commands.forEach(async file => {
      const command: Command = await import(`${commandPath}/${file}`);

      this.commands.set(command.data.name, command);
    })

    events.forEach(async file => {
      const event: Event = await import(`${eventsPath}/${file}`);

      if (event.once) {
        this.once(event.name, (...args) => event.execute(...args));
      } else {
        this.on(event.name, (...args) => event.execute(...args));
      }

      this.events.set(file.replace(".ts", ""), event)
    })
  };
};