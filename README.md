# umbraco-client

[![npm stat](https://img.shields.io/npm/dm/umbraco-client.svg?style=flat-square)](https://npm-stat.com/charts.html?package=umbraco-client)
[![npm version](https://img.shields.io/npm/v/umbraco-client.svg?style=flat-square)](https://www.npmjs.com/package/umbraco-client)

JavaScript client for Umbraco using the [Content Delivery API](https://docs.umbraco.com/umbraco-cms/reference/content-delivery-api).

## Quickstart

Install the client from [npm](https://www.npmjs.com/):

```sh
npm install umbraco-client

# Alternative package managers
yarn add umbraco-client
pnpm install umbraco-client
```

Import `umbraco-client`, and create a new client instance. Below is a simple example in JavaScript.

```js
// umbraco-client.js
import createClient from 'umbraco-client'

export const client = createClient('https://example.com')
```

## Usage

```js
import client from './umbraco-client'

const homepage = await client.getContentById('homePage')

const blogPosts = await client.getContentByType('blogPost', {
  sort: { type: 'createDate', order: 'asc' }
})
```
