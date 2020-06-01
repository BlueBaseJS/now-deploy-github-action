const { createDeployment } = require('@vercel/client');
const slugify = require('slugify');
const {
	// BUILD_PATH,
	GITHUB_REPOSITORY_NAME,
	NOW_TOKEN,
	NOW_TARGET,
	NOW_CONFIGS,
} = require('./constants');
const getConfigs = require('./reader');

async function deploy() {
	let deployment;

	const name = slugify(GITHUB_REPOSITORY_NAME);

	for await (const event of createDeployment(
		{
			token: NOW_TOKEN,
			// path: BUILD_PATH,
			...NOW_CONFIGS,
		},
		{
			target: NOW_TARGET,
			name,
			alias: [name],
			...getConfigs(),
		}
	)) {
		if (event.type === 'ready') {
			deployment = event.payload;
			break;
		}
		if (event.type === 'error') {
			console.info('Deployment Error', event);
			throw Error(event.payload.message);
		}
	}

	return deployment;
}

module.exports = deploy;
