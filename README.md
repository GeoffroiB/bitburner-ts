# Bitburner-TS 
---

[![Current Version](https://img.shields.io/badge/version-0.0.1-green.svg)](https://github.com/GeoffoiB/bitburner-ts)

This is a NodeJS/TypeScript development setup for the game `Bitburner` which is IDE independent. Scripts contained in "/src" serve as placeholders.


## Bitburner <a href="https://github.com/danielyxie/bitburner/"><img height="20" src="https://raw.githubusercontent.com/github/explore/89bdd9644f44d1b12180fd512b95574fe4c54617/topics/github-api/github-api.png"></a>

> Bitburner is a programming-based incremental game. Write scripts in JavaScript to automate gameplay, learn skills, play minigames, solve puzzles, and more in this cyberpunk text-based incremental RPG.

> **Bitburner Connector for VSCode**  <a href="https://github.com/bitburner-official/bitburner-vscode/"><img height="20" src="https://raw.githubusercontent.com/github/explore/89bdd9644f44d1b12180fd512b95574fe4c54617/topics/github-api/github-api.png"></a>


## Overview

This project aims to make possible editing scripts for Bitburner, without requiring it to be done through `VSCode`. This setup will use `Gulp`, which can be done through most IDEs.

### Currently targets `Bitburner v1.3.0`

## Features

- [x] Transpile .ts scripts to .ns scripts.
- [x] Push multiple scripts to in-game home server.
- [ ] Push scripts automatically using a file watcher.

## Setup

Once this repository is cloned, go to its root directory and run `npm install` to install its dependencies.

Then, run `npm run setup` to transpile the .ts build scripts. This can only be done once, unless the .ts scripts are altered.

Also, based on the file '.env.template', a file '.env' must be created, filled out and placed at the root of the project

## Usage

To transpile all scripts in "/src", run `npm run transpile`. The resulting .js scripts are output to "/dist".

To upload all scripts in "dist/", run `npm run upload`.
The contents of "/dist" is representative of the layout of the uploaded files in the "home" in-game server.

All NetScript declarations are included globally, therefore they don't need to be imported, as the in-game editor does.

## License

See the [LICENSE.md](LICENSE.md) file for license rights and limitations (GNU GPLv3)[^1].
