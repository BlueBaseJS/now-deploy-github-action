// const meta = require('github-action-meta');
const core = require('@actions/core');

const NOW_TOKEN = process.env['NOW_TOKEN'];
const GITHUB_TOKEN = process.env['GITHUB_TOKEN'];

const GITHUB_EVENT_NAME = process.env['GITHUB_EVENT_NAME'];
const GITHUB_EVENT_PATH = process.env['GITHUB_EVENT_PATH'];
const GITHUB_SHA = process.env['GITHUB_SHA'];
const GITHUB_REF = process.env['GITHUB_REF'];
const GITHUB_REPOSITORY = process.env['GITHUB_REPOSITORY'];
const REPO_DIRECTORY = process.env['GITHUB_WORKSPACE'];

const GITHUB_REPOSITORY_OWNER = GITHUB_REPOSITORY.split('/')[0]; // meta.git.owner;
const GITHUB_REPOSITORY_NAME = GITHUB_REPOSITORY.split('/')[1]; // meta.git.name;
const GITHUB_BRANCH = process.env['GITHUB_REF'].substring(11); //meta.git.branch;

if (!REPO_DIRECTORY) {
	console.log('There is no GITHUB_WORKSPACE environment variable');
	process.exit(1);
}

let GITHUB_DEPLOYMENT_ENVIORNMENT = 'web-dev';

switch (GITHUB_BRANCH) {
	case 'alpha':
		GITHUB_DEPLOYMENT_ENVIORNMENT = 'web-alpha';
		break;

	case 'beta':
		GITHUB_DEPLOYMENT_ENVIORNMENT = 'web-beta';
		break;

	case 'next':
		GITHUB_DEPLOYMENT_ENVIORNMENT = 'web-next';
		break;

	case 'master':
		GITHUB_DEPLOYMENT_ENVIORNMENT = 'web-production';
		break;
}

let NOW_TARGET;

if (GITHUB_BRANCH === 'next') {
	NOW_TARGET = 'staging';
} else if (GITHUB_BRANCH === 'master') {
	NOW_TARGET = 'production';
}

const NOW_CONFIGS = JSON.parse(core.getInput('configs') || '{}');
const BUILD_PATH = core.getInput('build-path') || 'build/web/client';

module.exports = {
	BUILD_PATH,
	NOW_TOKEN,
	NOW_TARGET,
	NOW_CONFIGS,
	GITHUB_DEPLOYMENT_ENVIORNMENT,
	GITHUB_TOKEN,
	GITHUB_EVENT_NAME,
	GITHUB_EVENT_PATH,
	GITHUB_SHA,
	GITHUB_REF,
	GITHUB_REPOSITORY,
	GITHUB_REPOSITORY_OWNER,
	GITHUB_REPOSITORY_NAME,
	GITHUB_BRANCH,
	REPO_DIRECTORY,
};
