# fbaudience CLI

fbaudience is a CLI for Facebook business audience that helps you manage your audiences, it's the simple way to do that.

<div align="center">

[![npm version](https://badge.fury.io/js/fbaudience.svg)](https://badge.fury.io/js/fbaudience) [![Actions Status](https://github.com/JairoDuarte/fbaudience-cli/workflows/deploy/badge.svg)](https://github.com/JairoDuarte/fbaudience-cli/actions)
</div>

## Features

1. Add audiences
2. Show audiences
3. Add users
4. show users
5. Add jobs to audience (use jsonstore)
6. Show jobs

## Setup

- Get Facebook business id and set to env var AD_ACCOUNT_ID
- Get Facebook access token from your facebook app and set to env var ACCESS_TOKEN
- Get the url for your json database in [jsonstore](https://www.jsonstore.io/) and set to env var  DB_URL

## Installation

```shell
$ npm i fbaudience -g
```

## Example

> Audiences

```
fbaudience a developers "developers in facebook" -a // add audience developers
fbaudience a -l // show all audiences
fbaudience a developers -d // delete audience developers

```
> Jobs

```
fbaudience j developers "backend engineer" -a // add job to audience developers
fbaudience j developers -l // show all jobs of developers
fbaudience j developers "backend engineer" -d // delete audience developers
```

>  Emails

```

fbaudience u developers stive@ur.com -a // add email to audience
fbaudience u developers bill@ur.com turin@gmail.com -a // add emails to audience
```

> for all commands please show helpers. like fbaudience {command} -h

## Contribution

Thanks for being interested on making this package better. We encourage everyone to help improving this project with some new features, bug fixes and performance issues.

# License

[MIT License](https://github.com/JairoDuarte/fbaudience-cli/blob/master/LICENSE) © United Remote