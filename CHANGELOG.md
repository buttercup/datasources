# Buttercup Datasources changelog

## v4.1.1
_2020-02-05_

 * Upgrade WebDAV for parsing fixes

## v4.1.0
_2020-01-26_

 * Upgrade to new WebDAV client for reduced payload size

## v4.0.1
_2020-01-03_

 * Patch release for dependency updates downstream (`buttercup` core)

## v4.0.0
_2020-01-03_

 * **Breaking changes**:
   * Requires [@buttercup/app-env](https://github.com/buttercup/app-env) to initialise the environment before datasources can be used
 * Removed Box datasource

## v3.4.0
_2019-10-06_

 * Upgrade Google Drive client
 * Upgrade Dropbox client

## v3.3.0
_2019-09-02_

 * Expose history encryption/decryption methods

## v3.2.4
_2019-08-02_

 * Upgrade Google Drive client to remove `UInt8Array` dependency

## v3.2.3
_2019-08-02_

 * **Bugfix**:
   * Google Drive re-authorisation would fail on non-lower-case headers

## v3.2.2
_2019-07-23_

 * **Bugfix**:
   * Update Dropbox client to fix PUT requests

## v3.2.1
_2019-07-22_

 * Upgrade Google Drive and Dropbox request clients for browser compatibility

## v3.2.0
_2019-07-19_

 * Google Drive request upgrade: `cowl` instead of `axios` for compatibility

## v3.1.0
_2019-07-16_

 * Dropbox request upgrade: `cowl` instead of `axios` for compatibility

## v3.0.0
_2019-04-13_

 * Improved Google Drive authentication
 * Events for handling re-authorisation

## v2.4.0
_2019-03-05_

 * Google Drive support via `GoogleDriveDatasource`

## v2.3.0
_2019-01-17_

 * `getID` for all datasources

## v2.2.1
_2018-12-08_

 * Fire `registerDatasourcePostProcessor` for each datasource type

## v2.2.0
_2018-12-05_

 * Add `registerDatasourcePostProcessor` for handling instantiation of datasources

## ~~v2.1.0~~
_2018-12-03_

 * Expose `dropboxClientPatcher` for patching Dropbox requests

## v2.0.0
_2018-11-16_

 * Use new **Dropbox** client [`@buttercup/dropbox-client`](https://github.com/buttercup/dropbox-client)
   * Replaces Dropbox-SDK/Dropbox-Streams/Got which had multiple environmental issues
   * Uses Axios for requests
 * Use new **WebDAV** client 
   * Replaces `node-fetch` with Axios

## v1.3.1
_2018-11-13_

 * Lock `dropbox-fs` `dropbox-streams` to `v2.0.0`

## v1.3.0
_2018-10-06_

 * Update `webdav` to fix many connectivity issues

## v1.2.1
_2018-08-08_

 * Add missing `supportsRemoteBypass` method to all datasources

## v1.2.0
_2018-08-04_

 * Add remote-fetch bypass support (for offline use)

## v1.1.1
_2018-06-19_

 * Bugfix: webdav file transfer - force using text

## v1.1.0
_2018-04-02_

 * Upgrade iocane to v1

## v1.0.2
_2018-03-18_

 * Fix module export

## v1.0.1
_2018-03-18_

 * Expose `webdav`

## v1.0.0
_2018-03-18_

 * Split from buttercup core
