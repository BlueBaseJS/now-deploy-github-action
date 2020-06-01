const { createDeployment } = require('@vercel/client');
const slugify = require('slugify');
const {
	BUILD_PATH,
	GITHUB_REPOSITORY_NAME,
	NOW_TOKEN,
	NOW_TARGET,
	NOW_CONFIGS,
} = require('./constants');
const getConfigs = require('./reader');

async function deploy() {
	let deployment;

	const name = slugify(GITHUB_REPOSITORY_NAME);

	for await (const event of createDeployment({
		token: NOW_TOKEN,
		target: NOW_TARGET,
		path: BUILD_PATH,
		name,
		alias: [name],
		...getConfigs(),
		...NOW_CONFIGS,
	})) {
		console.info('Deployment Event', event);

		if (event.type === 'ready') {
			deployment = event.payload;
			break;
		}
		if (event.type === 'error') {
			throw Error(event.payload.message);
		}
	}

	return deployment;
}

module.exports = deploy;
