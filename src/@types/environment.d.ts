declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DISCORD_TOKEN: string;
      DISCORD_GUILD_ID: string;
      DISCORD_CLIENT_ID: string;
    }
  }
}

export { };