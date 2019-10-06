# Buttercup Vault Datasources
> Datasource integrations for Buttercup vaults

[![Buttercup](https://cdn.rawgit.com/buttercup-pw/buttercup-assets/6582a033/badge/buttercup-slim.svg)](https://buttercup.pw) [![Build Status](https://travis-ci.org/buttercup/datasources.svg?branch=master)](https://travis-ci.org/buttercup/datasources) [![npm version](https://badge.fury.io/js/%40buttercup%2Fdatasources.svg)](https://www.npmjs.com/package/@buttercup/datasources)

## About
Datasources are how Buttercup integrates with 3rd party services like Dropbox, ownCloud and Nextcloud etc.

You might want to check out the [API documentation](API.md).

Supported interfaces:
 * Text: `TextDatasource`
 * Files: `FileDatasource`
 * WebDAV: `WebDAVDatasource`
 * OwnCloud: `OwnCloudDatasource`
 * Nextcloud: `NextcloudDatasource`
 * Dropbox: `DropboxDatasource`
 * ~~Box: `BoxDatasource`~~ (Deprecated)
 * Google Drive: `GoogleDriveDatasource`

You can easily add new, custom datasources by creating a new class and using `registerDatasource` to register it.

## Installation
Simply run `npm install @buttercup/datasources` to install.

This library has both `buttercup` and `iocane` as peer dependencies, as they're required for normal function.

## Usage
Datasources are exported by the module so you can import only what you need:

```javascript
const { Archive, Credentials } = require("buttercup");
const { TextDatasource } = require("@buttercup/datasources");

const tds = new TextDatasource(encryptedContent);
tds
    .load(Credentials.fromPassword("myPass"))
    .then(Archive.createFromHistory)
    .then(archive => {
        console.log(archive.toObject());
    });
```

### Handling expiried authorisation tokens
Services like Google Drive use OAuth tokens which may eventually expire. You can listen for these expirations and handle their renewal by registering a listener on the `AuthManager` shared instance:

```javascript
const { AuthManager } = require("@buttercup/datasources");

AuthManager.getSharedManager().registerHandler("googledrive", googleDriveDS => {
    // handle refreshing or fetching of tokens
    // attach them to datasource
    // return a promise
});
```

It should be noted that when using a datasource & workspace combination (inherent when using `ArchiveManager`) you should also update the workspace in the registered handler.

### Registering a custom datasource
You can add your own datasources by using the `registerDatasource` method. Datasources must have the following properties:

 * `Datasource#load(credentials)`: Load the stored contents (provided as a string) and return an array of Archive history items. It is often best to extend `TextDatasource` for this functionality.
 * `Datasource#save(historyArray, credentials)`: Save the archive history. It is often best to extend `TextDatasource` for this functionality.
 * `Datasource#toObject()`: Output an object representation of the data source. The object should contain the content and properties necessary to **serialise** and **deserialise** it. Do not store the archive content in the object. Each object should contain a `type` property that is the string name of the datasource.
 * `Datasource.fromObject(obj)`: Create a new datasource instance from an object (format should match `Datasource#toObject()`).
 * `Datasource.fromString(str)`: Should create a new datasource instance from a string. This method is usually **generic**, as shown below.

The `Datasource.fromString` method will usually just use JSON to deserialise the datasource object, and this should stay the same if `Datasource#toString` is not overridden:

```javascript
Datasource.fromString = function fromString(str, hostCredentials) {
    return Datasource.fromObject(JSON.parse(str), hostCredentials);
};
```

Once you have your datasource, be sure to register it:

```javascript
registerDatasource("custom", CustomDatasource);
```

**Note**: The first argument `"custom"` should match the `type` property in the object presentation of the datasource.

#### Implementing OAuth2
If your datasource uses OAuth2 and stores tokens on it, you should use the following 2 public instance properties:

 * `Datasource#token` - The access token
 * `Datasource#refreshToken` - The refresh token, if available

Buttercup looks for these internally when doing updates to vault sources (saved on the device). If tokens are updated at some point, Buttercup will read from these to ensure the local (encrypted) copy is kept up to date.

If you update tokens at any point, make sure to emit an event: `this.emit("updated")`. Emit the event after the properties are updated so that Buttercup correctly performs the save process with the right values.

## Compatibility
This library uses `webdav` under the hood for WebDAV-related requests. This in turn uses `node-fetch` to make requests, but this won't work in every environment. You can override it easily:

```javascript
const { webdav } = require("@buttercup/datasources");

webdav.setFetchMethod(window.fetch);
```
