<!-- TODO: Replace with actual name -->
# Application name

## Stack

* `Koa` HTTP server
* `axios` - HTTP client
* `rollbar` - Error tracking

## Environment variables

Locally listed in `.env` file.

* `ROLLBAR_ACCESS_TOKEN` - Rollbar access token
* `NODE_ENV` - Node environment (e.g. `production` or `development`)
* `PORT` - Port to listen on (default: `3000`)

## Deploy

Deployment is done via GitHub Actions.
The deployment script is located in the `.github/workflows/deploy.yml` file.
Environment variables and secrets should be configured in the GitHub repository settings: `Settings -> Secrets and variables -> Actions`.

### Access setup

1. On the server generate SSH key pair: `ssh-keygen -t rsa -b 4096 -f github-actions` (without passphrase).
2. This will produce two files: `github-actions` (private key) and `github-actions.pub` (public key) in the `~/.ssh` folder.
3. Add the public key content to the `~/.ssh/authorized_keys` file on the server.
4. Add the private key content to the `SERVER_SSH_PRIVATE_KEY` secret in the GitHub repository settings.

### Secrets

* `SERVER_SSH_PRIVATE_KEY` - SSH private key for the deployment server.
* `ROLLBAR_ACCESS_TOKEN` - Rollbar access token
<!-- * `THIRDPARTY_API_TOKEN` - API token for third-party service -->

### Variables

* `PROJECT_PATH` - Project path on the server (e.g. `/var/www/application-name`)
* `SERVER_USERNAME` - username on the deployment server (e.g. `root`)
* `SERVER_HOST` - hostname of the deployment server
* `PORT` - Port to listen on (default: `3000`)
<!-- * `THIRDPARTY_API_ENDPOINT` - API endpoint of third-party service -->

