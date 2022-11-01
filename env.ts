import setEnv from '@americanairlines/simple-env';

export const env = setEnv({
	required: {},
	optional: {
		nodeEnv: 'NODE_ENV',
		expressPort: 'EXPRESS_PORT',
		database: 'MONGO_URI',
		dbLoggingEnabled: 'DB_LOGGING_ENABLED',
	},
});
