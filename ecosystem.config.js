module.exports = {
	apps: [
		{
			name: "DISCORD_BOT_PROD",
			exec_mode: "cluster",
			instances: "max",
			script: "npm",
			args: "run dev",
			env: {
				NODE_ENV: "production",
			},
		},
	],
};
