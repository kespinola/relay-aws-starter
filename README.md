# Relay AWS Starter

Relay application boilerplate repo

[Walkthrough](https://ksespinola.github.io/talks/sb-js-meetup-dec-2017)


[![CircleCI](https://circleci.com/gh/ksespinola/relay-aws-starter.svg?style=svg&circle-token=b770d321d049739b20822c608fd91919cdbf0752)](https://circleci.com/gh/ksespinola/relay-aws-starter)

## Development

1. System requirements

  - node@^7.0.0

  - watchman

  ```bash
  $ brew update
  $ brew install watchman
  ```

2. Get env from webmaster

```bash
GRAPHQL_URL
```

3. Start server

```
$ GRAPHQL_URL='https://graphql.myshopify.com/api/graphql' npm run dev
```
