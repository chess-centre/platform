<p align="center">
  <img src="img/bcc-logo.png" width="150" />
  <h1 align="center"><strong></strong> The Chess Centre | Platform</h1>
</p>

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat)](https://github.com/chess-centre/welcome)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/8a35f82c63c0490db71b626a2f5125e1)](https://www.codacy.com/gh/chess-centre/platform/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=chess-centre/platform&amp;utm_campaign=Badge_Grade&style=flat&colour=light)
[![GitHub](https://img.shields.io/github/license/chess-centre/platform?color=light)](https://github.com/chess-centre/platform/LICENSE)
[![Version](https://img.shields.io/github/v/release/chess-centre/platform?color=light)](https://github.com/chess-centre/platform/releases)
[![Open Issues](https://img.shields.io/github/issues/chess-centre/platform?color=orange)](https://github.com/chess-centre/platform/issues)
[![Closed Issues](https://img.shields.io/github/issues-closed/chess-centre/platform?color=blue)](https://github.com/chess-centre/platform/issues?q=is%3Aissue+is%3Aclosed)

This project contains the core source code of **The Chess Centre** application its associated services and deployment configuration.

### Table of Contents
1. [Motivation](#motivation)
2. [Objective](#objective)
3. [Getting started](#getting-started)
    * [Prerequisites](#prerequisites)
    * [Environments](#environments)
4. [Tech Overview](#tech-overview)
    * [Architecture](#architecture)
    * [Integrations](#integrations)
6. [Contributing](#contributing)

## Motivation

<span style="color:#5499ab; font-weight: bold;">The Chess Centre</span> was born through a love of Chess and the amazing community it has! This platform serves to provide keen chess players who enjoy playing over-the-board (in person) chess, with modern, accessible, easy to use features to easily find upcoming events, register and effortlessly track results of their games and others!

To support this goal a dedicated centre (physical premises) has been established and is open for players to come learn and play the game. As such, supporting these fantastic venue requires a platform that allows new and existing players to participate as seamlessly as possible.

This code project and venue operate entirely as a <span style="color:#f0802b;">#not-for-profit</span> venture.

- website: [chesscentre.online](https:chesscentre.online)
  
## Objective
  
It is intended to be as open and transparent as possible, making it easy to reproduce and contribute to. The long term goals include the following technical objectives:
  
- 💰 **Low cost**
    - Infrastructure
    - Support
- 🌻 **Scalable** 
    - White-label (independent deployments)
    - Internationalisation
- ℹ️ **Maintainable** 
    - Admin UI
    - Documentation
- 🚀 **Feature rich**
    - Embracing other chess projects / useful public APIs

## Getting started

### Prerequisites

- [Node.js](https://git-scm.com/downloads) v14+
- [AWS Amplify CLI](https://docs.amplify.aws/cli/start/install) v5.3.0

Clone the project:

```bash
$ git clone git@github.com:chess-centre/platform.git 
```

Change directory to the root of the React application:

```bash
$ cd chess-centre-app
```

Checkout our [develop](https://github.com/chess-centre/platform/tree/develop) branch - this is where PRs are merged pre-live

```bash
$ git fetch && git checkout develop
```

Install dependencies

```bash
$ yarn install
```

At this point you now have everything you need for the UI, minus the Amplify backend..

- Our current practise is to manually set up your **AWS IAM** user (contact [@matt-d-webb](https://github.com/matt-d-webb) for this), providing you with the requisite configure to pull the necessay backend environment. 

Example configuration:

```js
const config = {
  aws_project_region: "eu-west-1",
  aws_cognito_identity_pool_id: "eu-west-1:xxxxx-xxxx-xxxxx-xxxx-xxxx",
  aws_cognito_region: "eu-west-1",
  aws_user_pools_id: "eu-west-1_xxxxxxxx",
  aws_user_pools_web_client_id: "123xyz456ABC789dEFg",
};
```

Once you are setup with an IAM user, add this in the app root as `aws-exports.js`

Then pull down the backend environment:

```bash
amplify env pull dev
```
  
You will now have a custom development environment!

Finally, start the project:

```bash
$ yarn start # app runs on port 3000
```

### Environments
  
| Env  | Player API | Public API | Travel API 
| ------------- | ------------- | ------------- | ------------- |
| Develop  | mgsigrqo6  | bd7p7atax7 | qxbqiiv6nc |
| Staging  | 21bx1c1zlk  | vrhqu5b9u6  | qrqz8sdqtd |
| Production  | ms60qr0ljj  | zkxiggnvb5  | 1mif6e1fj6 |

## Tech Overview

The front-end app uses `create-react-app` and `tailwindcss`. The backend is entirely serverless using AWS (see Architecture).

- JavaScript
- React
- Tailwind CSS
- GraphQL
- Node

### Architecture

<details>
<summary>Overview</summary>
<br />
<p align="center">
  <img src="img/architecture-overview.jpg" />
</p>
</details>


<details>
<summary>Game Broadcasts</summary>
<br />
<p align="center">
  <img src="img/live-broadcast-overview.jpg" />
</p>
</details>

### Integrations

<details>
<summary>Key Details</summary>
<br />
Taking advantage of the fantastic online chess sites, we pull in live data from the following sources:

<p align="left">
  <img width="200px" src="img/chesscom-logo.png" />
</p>

- Bullet Rating
- Blitz Rating
- Profile Image
- Puzzle Rating

<p align="left">
  <img width="200px" src="img/lichess-logo.png" />
</p>

- Bullet Rating
- Blitz Rating

<p align="left">
  <img width="200px" src="img/ecf-logo.jpeg" />
</p>

- Standard Rating
- Rapidplay Rating
- FIDE ID
- ECF Membership Status
- Recent Game History

<p align="left">
  <img width="200px" src="img/transport-api-logo.png" />
</p>

- Train departures
- Bus departures
</details>

## Contributing

See our [welcome](https://github.com/chess-centre/welcome) respository for guidelines on helping us develop this platform.

## Special Thanks

This project used many amazing open source libraries but for chess specifically, we are grateful for the efforts of:

- [PgnViewerJS](https://github.com/mliebelt/PgnViewerJS#readme)
- [chess.js](https://github.com/jhlywa/chess.js)
- [Chessground](https://github.com/ornicar/chessground)
- [pegjs](https://github.com/pegjs/pegjs)

## License

[MIT](LICENSE)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://chesscentre.online"><img src="https://avatars.githubusercontent.com/u/36933715?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Matt D. Webb</b></sub></a><br /><a href="https://github.com/chess-centre/platform/commits?author=matt-d-webb" title="Code">💻</a> <a href="https://github.com/chess-centre/platform/commits?author=matt-d-webb" title="Tests">⚠️</a> <a href="https://github.com/chess-centre/platform/commits?author=matt-d-webb" title="Documentation">📖</a> <a href="#business-matt-d-webb" title="Business development">💼</a></td>
    <td align="center"><a href="https://github.com/jbeasley123"><img src="https://avatars.githubusercontent.com/u/13149185?v=4?s=100" width="100px;" alt=""/><br /><sub><b>jbeasley123</b></sub></a><br /><a href="https://github.com/chess-centre/platform/commits?author=jbeasley123" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/AndyW359"><img src="https://avatars.githubusercontent.com/u/71315264?v=4?s=100" width="100px;" alt=""/><br /><sub><b>AndyW359</b></sub></a><br /><a href="#content-AndyW359" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/CatVarley"><img src="https://avatars.githubusercontent.com/u/16880382?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Cat Varley</b></sub></a><br /><a href="#ideas-CatVarley" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://elmore.dev"><img src="https://avatars.githubusercontent.com/u/2363879?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Adam Elmore</b></sub></a><br /><a href="https://github.com/chess-centre/platform/commits?author=adamelmore" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
  
This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
