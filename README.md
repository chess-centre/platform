<p align="center">
  <img src="img/bcc-logo.png" width="150" />
    <p align="center">
      <a href="https://github.com/chess-centre/welcome/blob/master/LICENSE">
        <img alt="GitHub" src="https://img.shields.io/github/license/chess-centre/welcome?style=flat">
      </a>
      <a href="https://github.com/chess-centre/welcome/blob/master/CONTRIBUTING.md">
        <img alt="GitHub" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat">
      </a>
      <a href="https://www.codacy.com/gh/chess-centre/platform/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=chess-centre/platform&amp;utm_campaign=Badge_Grade">
        <img src="https://app.codacy.com/project/badge/Grade/8a35f82c63c0490db71b626a2f5125e1"/>
      </a>
  </p>
  <h1 align="center"><strong>BETA:</strong> The Chess Centre | Platform</h1>
</p>

The project contains the starting point for our AWS configuration details and an empty front-end React JS application.

## Architecture

<details>
<summary>Overview</summary>
<p align="center">
  <img src="img/bcc-architecture.png" />
</p>
</details>


### Prerequisites

- Node.js - [Download & Install Node.js](https://git-scm.com/downloads) and the npm package manager.
- Amplify CLI - [Download & Install the Amplify CLI](https://docs.amplify.aws/cli/start/install)

### Getting started

```bash
cd chess-centre-app
yarn install          # install dependencies
amplify env pull dev  # pull the Amplify dev environment and generate aws-exports.js
yarn start            # start the local dev server which is running at http://localhost:3000
```

The front-end app uses `create-react-app` and `tailwindcss`. The backend is entirely serverless using AWS.

## Contributing

See our [welcome](https://github.com/chess-centre/welcome) respository for guidelines on helping us develop this platform.

## License

[MIT](../LICENSE.md)
