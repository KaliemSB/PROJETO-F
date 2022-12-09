module.exports = {
	apps: [
		{
			name: "DISCORD_BOT_PROD",
			exec_mode: "cluster",
			instances: "max",
			script: "npm",
			args: "dev",
			env: {
				NODE_ENV: "production",
			},
		},
	],
};
