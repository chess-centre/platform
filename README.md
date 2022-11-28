<p align="center">
  <img src="img/cc-logo.png" width="120" />
  <h1 align="center">OTB Chess</h1>
  <h2 align="center">Platform</h2>
</p>

<div align="center">

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat)](https://github.com/otb-chess/welcome)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/8a35f82c63c0490db71b626a2f5125e1)](https://www.codacy.com/gh/otb-chess/platform/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=otb-chess/platform&amp;utm_campaign=Badge_Grade&style=flat&colour=light)
[![Version](https://img.shields.io/github/v/release/otb-chess/platform?color=light)](https://github.com/otb-chess/platform/releases)
[![Closed Issues](https://img.shields.io/github/issues-closed/otb-chess/platform?color=light&label=features)](https://github.com/otb-chess/platform/issues?q=is%3Aissue+is%3Aclosed)
[![Open Issues](https://img.shields.io/github/issues/otb-chess/platform?color=orange&label=features)](https://github.com/otb-chess/platform/issues)
  
</div>
  
This project contains the core source code of **The OTB Chess** application including its associated services and deployment configuration.

### Table of Contents
- [Motivation](#motivation)
- [Objective](#objective)
- [Examples](#examples)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Environments](#environments)
- [Tech Overview](#tech-overview)
  - [Testing](#testing)
  - [Architecture](#architecture)
  - [Integrations](#integrations)
- [Contributing](#contributing)
- [Special thanks 👏](#special-thanks-)
- [License 📒](#license-)
- [Contributors ✨](#contributors-)

## Motivation

<span style="color:#5499ab; font-weight: bold;">OTB Chess</span> was born through a love of Chess and built for the amazing community which surrounds it. Here we will provide keen chess players who enjoy playing over-the-board chess with a platform to utilise modern, accessible and easy to use features that enables them to easily find upcoming events, register and effortlessly track results of their games and those of others.

- ♟️ website: [demo.chesscentre.online](https://demo.chesscentre.online)

Our mission is entirely <span style="color:#f0802b;">**#NotForProfit**</span> so we gladly welcome volunteers.
  
## Objective
  
Intentionally open and transparent and striving to make it easy to reproduce and contribute to our model, our long term goals include the following technical objectives:
  
- 💰 **Low cost**
    - Infrastructure
    - Support
- 🌻 **Scalable** 
    - White-label (independent deployments)
    - Internationalisation
- 🏗️ **Maintainable** 
    - Admin capabilities (non-technical users)
    - Documentation (technical / non-technical)
- 🚀 **Feature rich**
    - Embracing other chess projects / useful public APIs

## Examples

<p align="center">
  <img width="150px" style="border-color: #0694a2; border-style: solid; margin-right: 10px" src="img/dashboard-example.png" />
  <img width="150px" style="border-color: #0694a2; border-style: solid; margin-left: 10px" src="img/profile-integration-example.png" />
</p>

## Getting started

### Prerequisites

- [Node.js](https://git-scm.com/downloads) - 14.16.0 ++
- [AWS Amplify CLI](https://docs.amplify.aws/cli/start/install) - 7.6.3 ++

Clone the project:

```bash
$ git clone git@github.com:otb-chess/platform.git && cd platform
```

Change directory to the root of the React application:

```bash
$ cd otb-chess-app
```

Checkout our [develop](https://github.com/otb-chess/platform/tree/develop) branch - this is where PRs are merged pre-live

```bash
$ git fetch && git checkout develop
```

Install dependencies

```bash
$ yarn
```

At this point you now have everything you need for the frontend UI, now you need the `AWS Amplify` backend.

- Our current practise is to manually set up your **AWS IAM** user (contact [@matt-d-webb](https://github.com/matt-d-webb) for this), providing you with the requisite configuration to pull the necessay backend environment(s). 

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

Once you are setup with an IAM user, add your config in the app root named `aws-exports.js`

Then pull down the backend environment:

```bash
amplify env pull dev
```
  
You will now have a development environment! 🥳

Finally, start the project:

```bash
$ yarn start # default port 3000
```

### Environments
  
| Env  | Player API | Public API | Travel API 
| ------------- | ------------- | ------------- | ------------- |
| Develop  | mgsigrqo6  | bd7p7atax7 | qxbqiiv6nc |
| Staging  | 21bx1c1zlk  | vrhqu5b9u6  | qrqz8sdqtd |
| Production  | ms60qr0ljj  | zkxiggnvb5  | 1mif6e1fj6 |

## Tech Overview

The front-end app uses `create-react-app` and `tailwindcss`. The backend is entirely serverless using AWS (see Architecture).

- JavaScript / TypeScript
- React
- Tailwind CSS
- GraphQL
- Node
- DynamoDB

### Testing

See our published storybook [here](https://61df76f187afd2003a044a06-gaxeydksrb.chromatic.com/?path=/story/introduction--page)

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
- Rapid Rating
- Profile Image
- Puzzle Rating
- Online Status

<p align="left">
  <img width="200px" src="img/lichess-logo.png" />
</p>

- Bullet Rating
- Blitz Rating
- Rapid Rating
- Online Status 
- Pgn Game Import

<p align="left">
  <img width="200px" src="img/ecf-logo.jpeg" />
</p>

- Standard Rating
- Rapidplay Rating
- FIDE ID
- ECF Membership Status
- Recent Game History
- Latest Rating

<p align="left">
  <img width="200px" src="img/transport-api-logo.png" />
</p>

- Train departures
- Bus departures
  
</details>

## Contributing 

See our [welcome](https://github.com/otb-chess/welcome) respository for guidelines on helping us develop this platform.

## Special thanks 👏

This project uses many amazing open source libraries but for chess specifically, we are grateful for the efforts of:

- [PgnViewerJS](https://github.com/mliebelt/PgnViewerJS#readme)
- [Chessground](https://github.com/ornicar/chessground)
- [chess.js](https://github.com/jhlywa/chess.js)


<details>
<summary>Pgn Viewer Example</summary>
<br />
<p align="center">
  <img src="img/pgn-viewer.jpg" />
</p>
</details>


## License 📒

[![License](https://img.shields.io/github/license/otb-chess/platform?color=light)](https://github.com/otb-chess/platform/LICENSE)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/matt-d-webb"><img src="https://avatars.githubusercontent.com/u/36933715?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Matt D. Webb</b></sub></a><br /><a href="https://github.com/otb-chess/platform/commits?author=matt-d-webb" title="Code">💻</a> <a href="https://github.com/otb-chess/platform/commits?author=matt-d-webb" title="Tests">⚠️</a> <a href="https://github.com/otb-chess/platform/commits?author=matt-d-webb" title="Documentation">📖</a> <a href="#business-matt-d-webb" title="Business development">💼</a></td>
    <td align="center"><a href="https://github.com/jbeasley123"><img src="https://avatars.githubusercontent.com/u/13149185?v=4?s=100" width="100px;" alt=""/><br /><sub><b>jbeasley123</b></sub></a><br /><a href="https://github.com/otb-chess/platform/commits?author=jbeasley123" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/AndyW359"><img src="https://avatars.githubusercontent.com/u/71315264?v=4?s=100" width="100px;" alt=""/><br /><sub><b>AndyW359</b></sub></a><br /><a href="#content-AndyW359" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/CatVarley"><img src="https://avatars.githubusercontent.com/u/16880382?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Cat Varley</b></sub></a><br /><a href="#ideas-CatVarley" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://elmore.dev"><img src="https://avatars.githubusercontent.com/u/2363879?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Adam Elmore</b></sub></a><br /><a href="https://github.com/otb-chess/platform/commits?author=adamelmore" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/akashsiddamshetty"><img src="https://avatars.githubusercontent.com/u/80561904?v=4?s=100" width="100px;" alt=""/><br /><sub><b>AKASH SIDDAMSHETTY</b></sub></a><br /><a href="https://github.com/otb-chess/platform/commits?author=akashsiddamshetty" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/arpit-maurya"><img src="https://avatars.githubusercontent.com/u/82953478?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Arpit Maurya</b></sub></a><br /><a href="https://github.com/otb-chess/platform/commits?author=arpit-maurya" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
  
This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
