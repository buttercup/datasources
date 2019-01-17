## Modules

<dl>
<dt><a href="#module_ButtercupDatasources">ButtercupDatasources</a></dt>
<dd><p>The primary module</p>
</dd>
</dl>

## Classes

<dl>
<dt><a href="#BoxDatasource">BoxDatasource</a> ⇐ <code><a href="#WebDAVDatasource">WebDAVDatasource</a></code></dt>
<dd><p>Datasource for Box archives</p>
</dd>
<dt><a href="#DropboxDatasource">DropboxDatasource</a> ⇐ <code><a href="#TextDatasource">TextDatasource</a></code></dt>
<dd><p>Datasource for Dropbox archives</p>
</dd>
<dt><a href="#FileDatasource">FileDatasource</a> ⇐ <code><a href="#TextDatasource">TextDatasource</a></code></dt>
<dd><p>File datasource for loading and saving files</p>
</dd>
<dt><a href="#NextcloudDatasource">NextcloudDatasource</a> ⇐ <code><a href="#OwnCloudDatasource">OwnCloudDatasource</a></code></dt>
<dd><p>Datasource for Nextcloud archives</p>
</dd>
<dt><a href="#OwnCloudDatasource">OwnCloudDatasource</a> ⇐ <code><a href="#WebDAVDatasource">WebDAVDatasource</a></code></dt>
<dd><p>Datasource for OwnCloud archives</p>
</dd>
<dt><a href="#TextDatasource">TextDatasource</a></dt>
<dd><p>Datasource for text input and output</p>
</dd>
<dt><a href="#WebDAVDatasource">WebDAVDatasource</a> ⇐ <code><a href="#TextDatasource">TextDatasource</a></code></dt>
<dd><p>WebDAV datasource for reading and writing remote archives</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#fireInstantiationHandlers">fireInstantiationHandlers(datasource)</a></dt>
<dd><p>Execute all datasource postprocessors</p>
</dd>
<dt><a href="#objectToDatasource">objectToDatasource(obj, [hostCredentials])</a> ⇒ <code>null</code> | <code><a href="#TextDatasource">TextDatasource</a></code></dt>
<dd><p>Create a datasource from an object
The object must have the required properties (as output by the corresponding
<code>toObject</code> call of the datasource).</p>
</dd>
<dt><a href="#registerDatasource">registerDatasource(datasourceType, DSClass)</a></dt>
<dd><p>Register a new datasource
This is called internally by the built-in datasources, but should be called if a
custom datasource is used.</p>
</dd>
<dt><a href="#registerDatasourcePostProcessor">registerDatasourcePostProcessor(callback)</a> ⇒ <code><a href="#RegisterDatasourcePostProcessorResult">RegisterDatasourcePostProcessorResult</a></code></dt>
<dd><p>Register a post-processor for a datasource being instantiated</p>
</dd>
<dt><a href="#stringToDatasource">stringToDatasource(str, [hostCredentials])</a> ⇒ <code>null</code> | <code><a href="#TextDatasource">TextDatasource</a></code></dt>
<dd><p>Create a datasource from a string</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#RegisterDatasourcePostProcessorResult">RegisterDatasourcePostProcessorResult</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="module_ButtercupDatasources"></a>

## ButtercupDatasources
The primary module

<a name="BoxDatasource"></a>

## BoxDatasource ⇐ [<code>WebDAVDatasource</code>](#WebDAVDatasource)
Datasource for Box archives

**Kind**: global class  
**Extends**: [<code>WebDAVDatasource</code>](#WebDAVDatasource)  

* [BoxDatasource](#BoxDatasource) ⇐ [<code>WebDAVDatasource</code>](#WebDAVDatasource)
    * [new BoxDatasource(resourcePath, credentials)](#new_BoxDatasource_new)
    * _instance_
        * [.client](#WebDAVDatasource+client) : <code>Object</code>
        * [.endpoint](#WebDAVDatasource+endpoint) : <code>String</code>
        * [.path](#WebDAVDatasource+path) : <code>String</code>
        * [.hasContent](#TextDatasource+hasContent) : <code>Boolean</code>
        * [.toObject()](#BoxDatasource+toObject) ⇒ <code>Object</code>
        * [.load(credentials)](#WebDAVDatasource+load) ⇒ <code>Promise.&lt;Array.&lt;String&gt;&gt;</code>
        * [.save(history, credentials)](#WebDAVDatasource+save) ⇒ <code>Promise</code>
        * [.supportsRemoteBypass()](#WebDAVDatasource+supportsRemoteBypass) ⇒ <code>Boolean</code>
        * [.setContent(content)](#TextDatasource+setContent) ⇒ [<code>TextDatasource</code>](#TextDatasource)
        * [.toString()](#TextDatasource+toString) ⇒ <code>String</code>
    * _static_
        * [.fromObject(obj, hostCredentials)](#BoxDatasource.fromObject) ⇒ [<code>BoxDatasource</code>](#BoxDatasource)
        * [.fromString(str, hostCredentials)](#BoxDatasource.fromString) ⇒ [<code>BoxDatasource</code>](#BoxDatasource)

<a name="new_BoxDatasource_new"></a>

### new BoxDatasource(resourcePath, credentials)
Datasource for Box connections


| Param | Type | Description |
| --- | --- | --- |
| resourcePath | <code>String</code> | The file path |
| credentials | <code>Credentials</code> | The credentials (username/password) for Box |

<a name="WebDAVDatasource+client"></a>

### boxDatasource.client : <code>Object</code>
The WebDAV client instance

**Kind**: instance property of [<code>BoxDatasource</code>](#BoxDatasource)  
<a name="WebDAVDatasource+endpoint"></a>

### boxDatasource.endpoint : <code>String</code>
The remote WebDAV endpoint

**Kind**: instance property of [<code>BoxDatasource</code>](#BoxDatasource)  
<a name="WebDAVDatasource+path"></a>

### boxDatasource.path : <code>String</code>
The remote archive path

**Kind**: instance property of [<code>BoxDatasource</code>](#BoxDatasource)  
<a name="TextDatasource+hasContent"></a>

### boxDatasource.hasContent : <code>Boolean</code>
Whether the datasource currently has content
Used to check if the datasource has encrypted content that can be loaded. May be used
when attempting to open a vault in offline mode.

**Kind**: instance property of [<code>BoxDatasource</code>](#BoxDatasource)  
<a name="BoxDatasource+toObject"></a>

### boxDatasource.toObject() ⇒ <code>Object</code>
Output the datasource as an object

**Kind**: instance method of [<code>BoxDatasource</code>](#BoxDatasource)  
**Overrides**: [<code>toObject</code>](#WebDAVDatasource+toObject)  
**Returns**: <code>Object</code> - An object describing the datasource  
<a name="WebDAVDatasource+load"></a>

### boxDatasource.load(credentials) ⇒ <code>Promise.&lt;Array.&lt;String&gt;&gt;</code>
Load archive history from the datasource

**Kind**: instance method of [<code>BoxDatasource</code>](#BoxDatasource)  
**Returns**: <code>Promise.&lt;Array.&lt;String&gt;&gt;</code> - A promise resolving archive history  

| Param | Type | Description |
| --- | --- | --- |
| credentials | <code>Credentials</code> | The credentials for archive decryption |

<a name="WebDAVDatasource+save"></a>

### boxDatasource.save(history, credentials) ⇒ <code>Promise</code>
Save archive contents to the WebDAV service

**Kind**: instance method of [<code>BoxDatasource</code>](#BoxDatasource)  
**Returns**: <code>Promise</code> - A promise resolving when the save is complete  

| Param | Type | Description |
| --- | --- | --- |
| history | <code>Array.&lt;String&gt;</code> | Archive history |
| credentials | <code>Credentials</code> | The credentials for encryption |

<a name="WebDAVDatasource+supportsRemoteBypass"></a>

### boxDatasource.supportsRemoteBypass() ⇒ <code>Boolean</code>
Whether or not the datasource supports bypassing remote fetch operations

**Kind**: instance method of [<code>BoxDatasource</code>](#BoxDatasource)  
**Returns**: <code>Boolean</code> - True if content can be set to bypass fetch operations,
 false otherwise  
<a name="TextDatasource+setContent"></a>

### boxDatasource.setContent(content) ⇒ [<code>TextDatasource</code>](#TextDatasource)
Set the text content

**Kind**: instance method of [<code>BoxDatasource</code>](#BoxDatasource)  
**Returns**: [<code>TextDatasource</code>](#TextDatasource) - Self  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>String</code> | The encrypted text content |

<a name="TextDatasource+toString"></a>

### boxDatasource.toString() ⇒ <code>String</code>
Output the datasource configuration as a string

**Kind**: instance method of [<code>BoxDatasource</code>](#BoxDatasource)  
**Returns**: <code>String</code> - The string representation of the datasource  
<a name="BoxDatasource.fromObject"></a>

### BoxDatasource.fromObject(obj, hostCredentials) ⇒ [<code>BoxDatasource</code>](#BoxDatasource)
Create an instance from an object

**Kind**: static method of [<code>BoxDatasource</code>](#BoxDatasource)  
**Returns**: [<code>BoxDatasource</code>](#BoxDatasource) - A new instance  
**Throws**:

- <code>Error</code> Throws if credentials are not provided
- <code>Error</code> Throws if the type specified is invalid


| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | The object representation |
| hostCredentials | <code>Credentials</code> | The box account credentials |

<a name="BoxDatasource.fromString"></a>

### BoxDatasource.fromString(str, hostCredentials) ⇒ [<code>BoxDatasource</code>](#BoxDatasource)
Create an instance from a string

**Kind**: static method of [<code>BoxDatasource</code>](#BoxDatasource)  
**Returns**: [<code>BoxDatasource</code>](#BoxDatasource) - A new instance  
**See**: BoxDatasource.fromObject  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>String</code> | The string representation |
| hostCredentials | <code>Credentials</code> | Credentials for the box account |

<a name="DropboxDatasource"></a>

## DropboxDatasource ⇐ [<code>TextDatasource</code>](#TextDatasource)
Datasource for Dropbox archives

**Kind**: global class  
**Extends**: [<code>TextDatasource</code>](#TextDatasource)  

* [DropboxDatasource](#DropboxDatasource) ⇐ [<code>TextDatasource</code>](#TextDatasource)
    * [new DropboxDatasource(accessToken, resourcePath)](#new_DropboxDatasource_new)
    * _instance_
        * [.hasContent](#TextDatasource+hasContent) : <code>Boolean</code>
        * [.load(credentials)](#DropboxDatasource+load) ⇒ <code>Promise.&lt;Array.&lt;String&gt;&gt;</code>
        * [.save(history, credentials)](#DropboxDatasource+save) ⇒ <code>Promise</code>
        * [.supportsRemoteBypass()](#DropboxDatasource+supportsRemoteBypass) ⇒ <code>Boolean</code>
        * [.toObject()](#DropboxDatasource+toObject) ⇒ <code>Object</code>
        * [.setContent(content)](#TextDatasource+setContent) ⇒ [<code>TextDatasource</code>](#TextDatasource)
        * [.toString()](#TextDatasource+toString) ⇒ <code>String</code>
    * _static_
        * [.fromObject(obj)](#DropboxDatasource.fromObject) ⇒ [<code>DropboxDatasource</code>](#DropboxDatasource)
        * [.fromString(str)](#DropboxDatasource.fromString) ⇒ [<code>DropboxDatasource</code>](#DropboxDatasource)

<a name="new_DropboxDatasource_new"></a>

### new DropboxDatasource(accessToken, resourcePath)
Datasource for Dropbox accounts


| Param | Type | Description |
| --- | --- | --- |
| accessToken | <code>String</code> | The dropbox access token |
| resourcePath | <code>String</code> | The file path |

<a name="TextDatasource+hasContent"></a>

### dropboxDatasource.hasContent : <code>Boolean</code>
Whether the datasource currently has content
Used to check if the datasource has encrypted content that can be loaded. May be used
when attempting to open a vault in offline mode.

**Kind**: instance property of [<code>DropboxDatasource</code>](#DropboxDatasource)  
<a name="DropboxDatasource+load"></a>

### dropboxDatasource.load(credentials) ⇒ <code>Promise.&lt;Array.&lt;String&gt;&gt;</code>
Load an archive from the datasource

**Kind**: instance method of [<code>DropboxDatasource</code>](#DropboxDatasource)  
**Overrides**: [<code>load</code>](#TextDatasource+load)  
**Returns**: <code>Promise.&lt;Array.&lt;String&gt;&gt;</code> - A promise that resolves archive history  

| Param | Type | Description |
| --- | --- | --- |
| credentials | <code>Credentials</code> | The credentials for decryption |

<a name="DropboxDatasource+save"></a>

### dropboxDatasource.save(history, credentials) ⇒ <code>Promise</code>
Save an archive using the datasource

**Kind**: instance method of [<code>DropboxDatasource</code>](#DropboxDatasource)  
**Overrides**: [<code>save</code>](#TextDatasource+save)  
**Returns**: <code>Promise</code> - A promise that resolves when saving has completed  

| Param | Type | Description |
| --- | --- | --- |
| history | <code>Array.&lt;String&gt;</code> | The archive history to save |
| credentials | <code>Credentials</code> | The credentials to save with |

<a name="DropboxDatasource+supportsRemoteBypass"></a>

### dropboxDatasource.supportsRemoteBypass() ⇒ <code>Boolean</code>
Whether or not the datasource supports bypassing remote fetch operations

**Kind**: instance method of [<code>DropboxDatasource</code>](#DropboxDatasource)  
**Overrides**: [<code>supportsRemoteBypass</code>](#TextDatasource+supportsRemoteBypass)  
**Returns**: <code>Boolean</code> - True if content can be set to bypass fetch operations,
 false otherwise  
<a name="DropboxDatasource+toObject"></a>

### dropboxDatasource.toObject() ⇒ <code>Object</code>
Output the datasource as an object

**Kind**: instance method of [<code>DropboxDatasource</code>](#DropboxDatasource)  
**Overrides**: [<code>toObject</code>](#TextDatasource+toObject)  
**Returns**: <code>Object</code> - An object describing the datasource  
<a name="TextDatasource+setContent"></a>

### dropboxDatasource.setContent(content) ⇒ [<code>TextDatasource</code>](#TextDatasource)
Set the text content

**Kind**: instance method of [<code>DropboxDatasource</code>](#DropboxDatasource)  
**Returns**: [<code>TextDatasource</code>](#TextDatasource) - Self  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>String</code> | The encrypted text content |

<a name="TextDatasource+toString"></a>

### dropboxDatasource.toString() ⇒ <code>String</code>
Output the datasource configuration as a string

**Kind**: instance method of [<code>DropboxDatasource</code>](#DropboxDatasource)  
**Returns**: <code>String</code> - The string representation of the datasource  
<a name="DropboxDatasource.fromObject"></a>

### DropboxDatasource.fromObject(obj) ⇒ [<code>DropboxDatasource</code>](#DropboxDatasource)
Create a new instance from an object

**Kind**: static method of [<code>DropboxDatasource</code>](#DropboxDatasource)  
**Returns**: [<code>DropboxDatasource</code>](#DropboxDatasource) - A new instance  
**Throws**:

- <code>Error</code> Throws if the type is invalid


| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | The object representation |

<a name="DropboxDatasource.fromString"></a>

### DropboxDatasource.fromString(str) ⇒ [<code>DropboxDatasource</code>](#DropboxDatasource)
Create a new instance from a string

**Kind**: static method of [<code>DropboxDatasource</code>](#DropboxDatasource)  
**Returns**: [<code>DropboxDatasource</code>](#DropboxDatasource) - A new instance  
**Throws**:

- <code>Error</code> Throws if the type is invalid


| Param | Type | Description |
| --- | --- | --- |
| str | <code>String</code> | The string representation |

<a name="FileDatasource"></a>

## FileDatasource ⇐ [<code>TextDatasource</code>](#TextDatasource)
File datasource for loading and saving files

**Kind**: global class  
**Extends**: [<code>TextDatasource</code>](#TextDatasource)  

* [FileDatasource](#FileDatasource) ⇐ [<code>TextDatasource</code>](#TextDatasource)
    * [new FileDatasource(filename)](#new_FileDatasource_new)
    * _instance_
        * [.path](#FileDatasource+path) : <code>String</code>
        * [.hasContent](#TextDatasource+hasContent) : <code>Boolean</code>
        * [.load(credentials)](#FileDatasource+load) ⇒ <code>Promise.&lt;Array.&lt;String&gt;&gt;</code>
        * [.save(history, credentials)](#FileDatasource+save) ⇒ <code>Promise</code>
        * [.supportsRemoteBypass()](#FileDatasource+supportsRemoteBypass) ⇒ <code>Boolean</code>
        * [.toObject()](#FileDatasource+toObject) ⇒ <code>Object</code>
        * [.setContent(content)](#TextDatasource+setContent) ⇒ [<code>TextDatasource</code>](#TextDatasource)
        * [.toString()](#TextDatasource+toString) ⇒ <code>String</code>
    * _static_
        * [.fromObject(obj)](#FileDatasource.fromObject) ⇒ [<code>FileDatasource</code>](#FileDatasource)
        * [.fromString(str)](#FileDatasource.fromString) ⇒ [<code>FileDatasource</code>](#FileDatasource)

<a name="new_FileDatasource_new"></a>

### new FileDatasource(filename)
Constructor for the file datasource


| Param | Type | Description |
| --- | --- | --- |
| filename | <code>string</code> | The filename to load and save |

<a name="FileDatasource+path"></a>

### fileDatasource.path : <code>String</code>
The file path

**Kind**: instance property of [<code>FileDatasource</code>](#FileDatasource)  
<a name="TextDatasource+hasContent"></a>

### fileDatasource.hasContent : <code>Boolean</code>
Whether the datasource currently has content
Used to check if the datasource has encrypted content that can be loaded. May be used
when attempting to open a vault in offline mode.

**Kind**: instance property of [<code>FileDatasource</code>](#FileDatasource)  
<a name="FileDatasource+load"></a>

### fileDatasource.load(credentials) ⇒ <code>Promise.&lt;Array.&lt;String&gt;&gt;</code>
Load from the filename specified in the constructor using a password

**Kind**: instance method of [<code>FileDatasource</code>](#FileDatasource)  
**Overrides**: [<code>load</code>](#TextDatasource+load)  
**Returns**: <code>Promise.&lt;Array.&lt;String&gt;&gt;</code> - A promise resolving with archive history  

| Param | Type | Description |
| --- | --- | --- |
| credentials | <code>Credentials</code> | The credentials for decryption |

<a name="FileDatasource+save"></a>

### fileDatasource.save(history, credentials) ⇒ <code>Promise</code>
Save archive history to a file

**Kind**: instance method of [<code>FileDatasource</code>](#FileDatasource)  
**Overrides**: [<code>save</code>](#TextDatasource+save)  
**Returns**: <code>Promise</code> - A promise that resolves when saving is complete  

| Param | Type | Description |
| --- | --- | --- |
| history | <code>Array.&lt;String&gt;</code> | The archive history to save |
| credentials | <code>Credentials</code> | The credentials to save with |

<a name="FileDatasource+supportsRemoteBypass"></a>

### fileDatasource.supportsRemoteBypass() ⇒ <code>Boolean</code>
Whether or not the datasource supports bypassing remote fetch operations

**Kind**: instance method of [<code>FileDatasource</code>](#FileDatasource)  
**Overrides**: [<code>supportsRemoteBypass</code>](#TextDatasource+supportsRemoteBypass)  
**Returns**: <code>Boolean</code> - True if content can be set to bypass fetch operations,
 false otherwise  
<a name="FileDatasource+toObject"></a>

### fileDatasource.toObject() ⇒ <code>Object</code>
Output the datasource as an object

**Kind**: instance method of [<code>FileDatasource</code>](#FileDatasource)  
**Overrides**: [<code>toObject</code>](#TextDatasource+toObject)  
**Returns**: <code>Object</code> - An object describing the datasource  
<a name="TextDatasource+setContent"></a>

### fileDatasource.setContent(content) ⇒ [<code>TextDatasource</code>](#TextDatasource)
Set the text content

**Kind**: instance method of [<code>FileDatasource</code>](#FileDatasource)  
**Returns**: [<code>TextDatasource</code>](#TextDatasource) - Self  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>String</code> | The encrypted text content |

<a name="TextDatasource+toString"></a>

### fileDatasource.toString() ⇒ <code>String</code>
Output the datasource configuration as a string

**Kind**: instance method of [<code>FileDatasource</code>](#FileDatasource)  
**Returns**: <code>String</code> - The string representation of the datasource  
<a name="FileDatasource.fromObject"></a>

### FileDatasource.fromObject(obj) ⇒ [<code>FileDatasource</code>](#FileDatasource)
Create an instance from an object

**Kind**: static method of [<code>FileDatasource</code>](#FileDatasource)  
**Returns**: [<code>FileDatasource</code>](#FileDatasource) - A new instance  
**Throws**:

- <code>Error</code> Throws for an invalid type specification


| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | The object representation of a datasource |

<a name="FileDatasource.fromString"></a>

### FileDatasource.fromString(str) ⇒ [<code>FileDatasource</code>](#FileDatasource)
Create an instance from a string

**Kind**: static method of [<code>FileDatasource</code>](#FileDatasource)  
**Returns**: [<code>FileDatasource</code>](#FileDatasource) - A new instance  
**See**: FileDatasource.fromObject  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>String</code> | The string representation |

<a name="NextcloudDatasource"></a>

## NextcloudDatasource ⇐ [<code>OwnCloudDatasource</code>](#OwnCloudDatasource)
Datasource for Nextcloud archives

**Kind**: global class  
**Extends**: [<code>OwnCloudDatasource</code>](#OwnCloudDatasource)  

* [NextcloudDatasource](#NextcloudDatasource) ⇐ [<code>OwnCloudDatasource</code>](#OwnCloudDatasource)
    * [new NextcloudDatasource()](#new_NextcloudDatasource_new)
    * _instance_
        * [.client](#WebDAVDatasource+client) : <code>Object</code>
        * [.endpoint](#WebDAVDatasource+endpoint) : <code>String</code>
        * [.path](#WebDAVDatasource+path) : <code>String</code>
        * [.hasContent](#TextDatasource+hasContent) : <code>Boolean</code>
        * [.toObject()](#NextcloudDatasource+toObject) ⇒ <code>Object</code>
        * [.load(credentials)](#WebDAVDatasource+load) ⇒ <code>Promise.&lt;Array.&lt;String&gt;&gt;</code>
        * [.save(history, credentials)](#WebDAVDatasource+save) ⇒ <code>Promise</code>
        * [.supportsRemoteBypass()](#WebDAVDatasource+supportsRemoteBypass) ⇒ <code>Boolean</code>
        * [.setContent(content)](#TextDatasource+setContent) ⇒ [<code>TextDatasource</code>](#TextDatasource)
        * [.toString()](#TextDatasource+toString) ⇒ <code>String</code>
    * _static_
        * [.fromObject(obj, [hostCredentials])](#NextcloudDatasource.fromObject) ⇒ [<code>NextcloudDatasource</code>](#NextcloudDatasource)
        * [.fromString(str, [hostCredentials])](#NextcloudDatasource.fromString) ⇒ [<code>NextcloudDatasource</code>](#NextcloudDatasource)

<a name="new_NextcloudDatasource_new"></a>

### new NextcloudDatasource()
Constructor for the datasource

<a name="WebDAVDatasource+client"></a>

### nextcloudDatasource.client : <code>Object</code>
The WebDAV client instance

**Kind**: instance property of [<code>NextcloudDatasource</code>](#NextcloudDatasource)  
<a name="WebDAVDatasource+endpoint"></a>

### nextcloudDatasource.endpoint : <code>String</code>
The remote WebDAV endpoint

**Kind**: instance property of [<code>NextcloudDatasource</code>](#NextcloudDatasource)  
<a name="WebDAVDatasource+path"></a>

### nextcloudDatasource.path : <code>String</code>
The remote archive path

**Kind**: instance property of [<code>NextcloudDatasource</code>](#NextcloudDatasource)  
<a name="TextDatasource+hasContent"></a>

### nextcloudDatasource.hasContent : <code>Boolean</code>
Whether the datasource currently has content
Used to check if the datasource has encrypted content that can be loaded. May be used
when attempting to open a vault in offline mode.

**Kind**: instance property of [<code>NextcloudDatasource</code>](#NextcloudDatasource)  
<a name="NextcloudDatasource+toObject"></a>

### nextcloudDatasource.toObject() ⇒ <code>Object</code>
Output the datasource as an object

**Kind**: instance method of [<code>NextcloudDatasource</code>](#NextcloudDatasource)  
**Overrides**: [<code>toObject</code>](#OwnCloudDatasource+toObject)  
**Returns**: <code>Object</code> - An object describing the datasource  
<a name="WebDAVDatasource+load"></a>

### nextcloudDatasource.load(credentials) ⇒ <code>Promise.&lt;Array.&lt;String&gt;&gt;</code>
Load archive history from the datasource

**Kind**: instance method of [<code>NextcloudDatasource</code>](#NextcloudDatasource)  
**Returns**: <code>Promise.&lt;Array.&lt;String&gt;&gt;</code> - A promise resolving archive history  

| Param | Type | Description |
| --- | --- | --- |
| credentials | <code>Credentials</code> | The credentials for archive decryption |

<a name="WebDAVDatasource+save"></a>

### nextcloudDatasource.save(history, credentials) ⇒ <code>Promise</code>
Save archive contents to the WebDAV service

**Kind**: instance method of [<code>NextcloudDatasource</code>](#NextcloudDatasource)  
**Returns**: <code>Promise</code> - A promise resolving when the save is complete  

| Param | Type | Description |
| --- | --- | --- |
| history | <code>Array.&lt;String&gt;</code> | Archive history |
| credentials | <code>Credentials</code> | The credentials for encryption |

<a name="WebDAVDatasource+supportsRemoteBypass"></a>

### nextcloudDatasource.supportsRemoteBypass() ⇒ <code>Boolean</code>
Whether or not the datasource supports bypassing remote fetch operations

**Kind**: instance method of [<code>NextcloudDatasource</code>](#NextcloudDatasource)  
**Returns**: <code>Boolean</code> - True if content can be set to bypass fetch operations,
 false otherwise  
<a name="TextDatasource+setContent"></a>

### nextcloudDatasource.setContent(content) ⇒ [<code>TextDatasource</code>](#TextDatasource)
Set the text content

**Kind**: instance method of [<code>NextcloudDatasource</code>](#NextcloudDatasource)  
**Returns**: [<code>TextDatasource</code>](#TextDatasource) - Self  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>String</code> | The encrypted text content |

<a name="TextDatasource+toString"></a>

### nextcloudDatasource.toString() ⇒ <code>String</code>
Output the datasource configuration as a string

**Kind**: instance method of [<code>NextcloudDatasource</code>](#NextcloudDatasource)  
**Returns**: <code>String</code> - The string representation of the datasource  
<a name="NextcloudDatasource.fromObject"></a>

### NextcloudDatasource.fromObject(obj, [hostCredentials]) ⇒ [<code>NextcloudDatasource</code>](#NextcloudDatasource)
Create a new instance from an object

**Kind**: static method of [<code>NextcloudDatasource</code>](#NextcloudDatasource)  
**Returns**: [<code>NextcloudDatasource</code>](#NextcloudDatasource) - A new instance  
**Throws**:

- <code>Error</code> Throws for an invalid type specification


| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | The object representation of an instance |
| [hostCredentials] | <code>Credentials</code> | The remote server credentials |

<a name="NextcloudDatasource.fromString"></a>

### NextcloudDatasource.fromString(str, [hostCredentials]) ⇒ [<code>NextcloudDatasource</code>](#NextcloudDatasource)
Create a new instance from a string

**Kind**: static method of [<code>NextcloudDatasource</code>](#NextcloudDatasource)  
**Returns**: [<code>NextcloudDatasource</code>](#NextcloudDatasource) - A new instance  
**Throws**:

- <code>Error</code> Throws for an invalid type specification


| Param | Type | Description |
| --- | --- | --- |
| str | <code>String</code> | The string representation of an instance |
| [hostCredentials] | <code>Credentials</code> | The remote server credentials |

<a name="OwnCloudDatasource"></a>

## OwnCloudDatasource ⇐ [<code>WebDAVDatasource</code>](#WebDAVDatasource)
Datasource for OwnCloud archives

**Kind**: global class  
**Extends**: [<code>WebDAVDatasource</code>](#WebDAVDatasource)  

* [OwnCloudDatasource](#OwnCloudDatasource) ⇐ [<code>WebDAVDatasource</code>](#WebDAVDatasource)
    * [new OwnCloudDatasource(owncloudURL, resourcePath, [credentials])](#new_OwnCloudDatasource_new)
    * _instance_
        * [.client](#WebDAVDatasource+client) : <code>Object</code>
        * [.endpoint](#WebDAVDatasource+endpoint) : <code>String</code>
        * [.path](#WebDAVDatasource+path) : <code>String</code>
        * [.hasContent](#TextDatasource+hasContent) : <code>Boolean</code>
        * [.toObject()](#OwnCloudDatasource+toObject) ⇒ <code>Object</code>
        * [.load(credentials)](#WebDAVDatasource+load) ⇒ <code>Promise.&lt;Array.&lt;String&gt;&gt;</code>
        * [.save(history, credentials)](#WebDAVDatasource+save) ⇒ <code>Promise</code>
        * [.supportsRemoteBypass()](#WebDAVDatasource+supportsRemoteBypass) ⇒ <code>Boolean</code>
        * [.setContent(content)](#TextDatasource+setContent) ⇒ [<code>TextDatasource</code>](#TextDatasource)
        * [.toString()](#TextDatasource+toString) ⇒ <code>String</code>
    * _static_
        * [.fromObject(obj, [hostCredentials])](#OwnCloudDatasource.fromObject) ⇒ [<code>OwnCloudDatasource</code>](#OwnCloudDatasource)
        * [.fromString(str, [hostCredentials])](#OwnCloudDatasource.fromString) ⇒ [<code>OwnCloudDatasource</code>](#OwnCloudDatasource)

<a name="new_OwnCloudDatasource_new"></a>

### new OwnCloudDatasource(owncloudURL, resourcePath, [credentials])
Datasource for Owncloud connections


| Param | Type | Description |
| --- | --- | --- |
| owncloudURL | <code>String</code> | The URL to the owncloud instance, without "remote.php/webdav" etc. |
| resourcePath | <code>String</code> | The file path |
| [credentials] | <code>Credentials</code> | The credentials (username/password) for owncloud |

<a name="WebDAVDatasource+client"></a>

### ownCloudDatasource.client : <code>Object</code>
The WebDAV client instance

**Kind**: instance property of [<code>OwnCloudDatasource</code>](#OwnCloudDatasource)  
<a name="WebDAVDatasource+endpoint"></a>

### ownCloudDatasource.endpoint : <code>String</code>
The remote WebDAV endpoint

**Kind**: instance property of [<code>OwnCloudDatasource</code>](#OwnCloudDatasource)  
<a name="WebDAVDatasource+path"></a>

### ownCloudDatasource.path : <code>String</code>
The remote archive path

**Kind**: instance property of [<code>OwnCloudDatasource</code>](#OwnCloudDatasource)  
<a name="TextDatasource+hasContent"></a>

### ownCloudDatasource.hasContent : <code>Boolean</code>
Whether the datasource currently has content
Used to check if the datasource has encrypted content that can be loaded. May be used
when attempting to open a vault in offline mode.

**Kind**: instance property of [<code>OwnCloudDatasource</code>](#OwnCloudDatasource)  
<a name="OwnCloudDatasource+toObject"></a>

### ownCloudDatasource.toObject() ⇒ <code>Object</code>
Output the datasource as an object

**Kind**: instance method of [<code>OwnCloudDatasource</code>](#OwnCloudDatasource)  
**Overrides**: [<code>toObject</code>](#WebDAVDatasource+toObject)  
**Returns**: <code>Object</code> - An object describing the datasource  
<a name="WebDAVDatasource+load"></a>

### ownCloudDatasource.load(credentials) ⇒ <code>Promise.&lt;Array.&lt;String&gt;&gt;</code>
Load archive history from the datasource

**Kind**: instance method of [<code>OwnCloudDatasource</code>](#OwnCloudDatasource)  
**Returns**: <code>Promise.&lt;Array.&lt;String&gt;&gt;</code> - A promise resolving archive history  

| Param | Type | Description |
| --- | --- | --- |
| credentials | <code>Credentials</code> | The credentials for archive decryption |

<a name="WebDAVDatasource+save"></a>

### ownCloudDatasource.save(history, credentials) ⇒ <code>Promise</code>
Save archive contents to the WebDAV service

**Kind**: instance method of [<code>OwnCloudDatasource</code>](#OwnCloudDatasource)  
**Returns**: <code>Promise</code> - A promise resolving when the save is complete  

| Param | Type | Description |
| --- | --- | --- |
| history | <code>Array.&lt;String&gt;</code> | Archive history |
| credentials | <code>Credentials</code> | The credentials for encryption |

<a name="WebDAVDatasource+supportsRemoteBypass"></a>

### ownCloudDatasource.supportsRemoteBypass() ⇒ <code>Boolean</code>
Whether or not the datasource supports bypassing remote fetch operations

**Kind**: instance method of [<code>OwnCloudDatasource</code>](#OwnCloudDatasource)  
**Returns**: <code>Boolean</code> - True if content can be set to bypass fetch operations,
 false otherwise  
<a name="TextDatasource+setContent"></a>

### ownCloudDatasource.setContent(content) ⇒ [<code>TextDatasource</code>](#TextDatasource)
Set the text content

**Kind**: instance method of [<code>OwnCloudDatasource</code>](#OwnCloudDatasource)  
**Returns**: [<code>TextDatasource</code>](#TextDatasource) - Self  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>String</code> | The encrypted text content |

<a name="TextDatasource+toString"></a>

### ownCloudDatasource.toString() ⇒ <code>String</code>
Output the datasource configuration as a string

**Kind**: instance method of [<code>OwnCloudDatasource</code>](#OwnCloudDatasource)  
**Returns**: <code>String</code> - The string representation of the datasource  
<a name="OwnCloudDatasource.fromObject"></a>

### OwnCloudDatasource.fromObject(obj, [hostCredentials]) ⇒ [<code>OwnCloudDatasource</code>](#OwnCloudDatasource)
Create an instance from an object

**Kind**: static method of [<code>OwnCloudDatasource</code>](#OwnCloudDatasource)  
**Returns**: [<code>OwnCloudDatasource</code>](#OwnCloudDatasource) - A new instance  
**Throws**:

- <code>Error</code> Throws for an invalid type specification


| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | The object representation of the datasource |
| [hostCredentials] | <code>Credentials</code> | Remote server credentials |

<a name="OwnCloudDatasource.fromString"></a>

### OwnCloudDatasource.fromString(str, [hostCredentials]) ⇒ [<code>OwnCloudDatasource</code>](#OwnCloudDatasource)
Create an instance from a string

**Kind**: static method of [<code>OwnCloudDatasource</code>](#OwnCloudDatasource)  
**Returns**: [<code>OwnCloudDatasource</code>](#OwnCloudDatasource) - A new instance  
**Throws**:

- <code>Error</code> Throws for an invalid type specification


| Param | Type | Description |
| --- | --- | --- |
| str | <code>String</code> | The string representation of the datasource |
| [hostCredentials] | <code>Credentials</code> | The remote server credentials |

<a name="TextDatasource"></a>

## TextDatasource
Datasource for text input and output

**Kind**: global class  

* [TextDatasource](#TextDatasource)
    * [new TextDatasource(content)](#new_TextDatasource_new)
    * [.hasContent](#TextDatasource+hasContent) : <code>Boolean</code>
    * [.load(credentials)](#TextDatasource+load) ⇒ <code>Promise.&lt;Array.&lt;String&gt;&gt;</code>
    * [.save(history, credentials)](#TextDatasource+save) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.setContent(content)](#TextDatasource+setContent) ⇒ [<code>TextDatasource</code>](#TextDatasource)
    * [.supportsRemoteBypass()](#TextDatasource+supportsRemoteBypass) ⇒ <code>Boolean</code>
    * [.toObject()](#TextDatasource+toObject) ⇒ <code>Object</code>
    * [.toString()](#TextDatasource+toString) ⇒ <code>String</code>

<a name="new_TextDatasource_new"></a>

### new TextDatasource(content)
Constructor for the text datasource


| Param | Type | Description |
| --- | --- | --- |
| content | <code>string</code> | The content to load from |

<a name="TextDatasource+hasContent"></a>

### textDatasource.hasContent : <code>Boolean</code>
Whether the datasource currently has content
Used to check if the datasource has encrypted content that can be loaded. May be used
when attempting to open a vault in offline mode.

**Kind**: instance property of [<code>TextDatasource</code>](#TextDatasource)  
<a name="TextDatasource+load"></a>

### textDatasource.load(credentials) ⇒ <code>Promise.&lt;Array.&lt;String&gt;&gt;</code>
Load from the stored content using a password to decrypt

**Kind**: instance method of [<code>TextDatasource</code>](#TextDatasource)  
**Returns**: <code>Promise.&lt;Array.&lt;String&gt;&gt;</code> - A promise that resolves with decrypted history  
**Throws**:

- <code>Error</code> Rejects if content is empty


| Param | Type | Description |
| --- | --- | --- |
| credentials | <code>Credentials</code> | The password or Credentials instance to decrypt with |

<a name="TextDatasource+save"></a>

### textDatasource.save(history, credentials) ⇒ <code>Promise.&lt;string&gt;</code>
Save archive contents with a password

**Kind**: instance method of [<code>TextDatasource</code>](#TextDatasource)  
**Returns**: <code>Promise.&lt;string&gt;</code> - A promise resolving with the encrypted content  

| Param | Type | Description |
| --- | --- | --- |
| history | <code>Array.&lt;String&gt;</code> | Archive history to save |
| credentials | <code>Credentials</code> | The Credentials instance to encrypt with |

<a name="TextDatasource+setContent"></a>

### textDatasource.setContent(content) ⇒ [<code>TextDatasource</code>](#TextDatasource)
Set the text content

**Kind**: instance method of [<code>TextDatasource</code>](#TextDatasource)  
**Returns**: [<code>TextDatasource</code>](#TextDatasource) - Self  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>String</code> | The encrypted text content |

<a name="TextDatasource+supportsRemoteBypass"></a>

### textDatasource.supportsRemoteBypass() ⇒ <code>Boolean</code>
Whether or not the datasource supports bypassing remote fetch operations

**Kind**: instance method of [<code>TextDatasource</code>](#TextDatasource)  
**Returns**: <code>Boolean</code> - True if content can be set to bypass fetch operations,
 false otherwise  
<a name="TextDatasource+toObject"></a>

### textDatasource.toObject() ⇒ <code>Object</code>
Output the datasource as an object

**Kind**: instance method of [<code>TextDatasource</code>](#TextDatasource)  
**Returns**: <code>Object</code> - The object representation  
<a name="TextDatasource+toString"></a>

### textDatasource.toString() ⇒ <code>String</code>
Output the datasource configuration as a string

**Kind**: instance method of [<code>TextDatasource</code>](#TextDatasource)  
**Returns**: <code>String</code> - The string representation of the datasource  
<a name="WebDAVDatasource"></a>

## WebDAVDatasource ⇐ [<code>TextDatasource</code>](#TextDatasource)
WebDAV datasource for reading and writing remote archives

**Kind**: global class  
**Extends**: [<code>TextDatasource</code>](#TextDatasource)  

* [WebDAVDatasource](#WebDAVDatasource) ⇐ [<code>TextDatasource</code>](#TextDatasource)
    * [new WebDAVDatasource(endpoint, webDAVPath, [credentials])](#new_WebDAVDatasource_new)
    * _instance_
        * [.client](#WebDAVDatasource+client) : <code>Object</code>
        * [.endpoint](#WebDAVDatasource+endpoint) : <code>String</code>
        * [.path](#WebDAVDatasource+path) : <code>String</code>
        * [.hasContent](#TextDatasource+hasContent) : <code>Boolean</code>
        * [.load(credentials)](#WebDAVDatasource+load) ⇒ <code>Promise.&lt;Array.&lt;String&gt;&gt;</code>
        * [.save(history, credentials)](#WebDAVDatasource+save) ⇒ <code>Promise</code>
        * [.supportsRemoteBypass()](#WebDAVDatasource+supportsRemoteBypass) ⇒ <code>Boolean</code>
        * [.toObject()](#WebDAVDatasource+toObject) ⇒ <code>Object</code>
        * [.setContent(content)](#TextDatasource+setContent) ⇒ [<code>TextDatasource</code>](#TextDatasource)
        * [.toString()](#TextDatasource+toString) ⇒ <code>String</code>
    * _static_
        * [.fromObject(obj, [hostCredentials])](#WebDAVDatasource.fromObject)
        * [.fromString(str, [hostCredentials])](#WebDAVDatasource.fromString)

<a name="new_WebDAVDatasource_new"></a>

### new WebDAVDatasource(endpoint, webDAVPath, [credentials])
Constructor for the datasource


| Param | Type | Description |
| --- | --- | --- |
| endpoint | <code>string</code> | URL for the WebDAV service (without resource path) |
| webDAVPath | <code>string</code> | Resource path on the WebDAV service |
| [credentials] | <code>Credentials</code> | Credentials (username/password) for the WebDAV service |

<a name="WebDAVDatasource+client"></a>

### webDAVDatasource.client : <code>Object</code>
The WebDAV client instance

**Kind**: instance property of [<code>WebDAVDatasource</code>](#WebDAVDatasource)  
<a name="WebDAVDatasource+endpoint"></a>

### webDAVDatasource.endpoint : <code>String</code>
The remote WebDAV endpoint

**Kind**: instance property of [<code>WebDAVDatasource</code>](#WebDAVDatasource)  
<a name="WebDAVDatasource+path"></a>

### webDAVDatasource.path : <code>String</code>
The remote archive path

**Kind**: instance property of [<code>WebDAVDatasource</code>](#WebDAVDatasource)  
<a name="TextDatasource+hasContent"></a>

### webDAVDatasource.hasContent : <code>Boolean</code>
Whether the datasource currently has content
Used to check if the datasource has encrypted content that can be loaded. May be used
when attempting to open a vault in offline mode.

**Kind**: instance property of [<code>WebDAVDatasource</code>](#WebDAVDatasource)  
<a name="WebDAVDatasource+load"></a>

### webDAVDatasource.load(credentials) ⇒ <code>Promise.&lt;Array.&lt;String&gt;&gt;</code>
Load archive history from the datasource

**Kind**: instance method of [<code>WebDAVDatasource</code>](#WebDAVDatasource)  
**Overrides**: [<code>load</code>](#TextDatasource+load)  
**Returns**: <code>Promise.&lt;Array.&lt;String&gt;&gt;</code> - A promise resolving archive history  

| Param | Type | Description |
| --- | --- | --- |
| credentials | <code>Credentials</code> | The credentials for archive decryption |

<a name="WebDAVDatasource+save"></a>

### webDAVDatasource.save(history, credentials) ⇒ <code>Promise</code>
Save archive contents to the WebDAV service

**Kind**: instance method of [<code>WebDAVDatasource</code>](#WebDAVDatasource)  
**Overrides**: [<code>save</code>](#TextDatasource+save)  
**Returns**: <code>Promise</code> - A promise resolving when the save is complete  

| Param | Type | Description |
| --- | --- | --- |
| history | <code>Array.&lt;String&gt;</code> | Archive history |
| credentials | <code>Credentials</code> | The credentials for encryption |

<a name="WebDAVDatasource+supportsRemoteBypass"></a>

### webDAVDatasource.supportsRemoteBypass() ⇒ <code>Boolean</code>
Whether or not the datasource supports bypassing remote fetch operations

**Kind**: instance method of [<code>WebDAVDatasource</code>](#WebDAVDatasource)  
**Overrides**: [<code>supportsRemoteBypass</code>](#TextDatasource+supportsRemoteBypass)  
**Returns**: <code>Boolean</code> - True if content can be set to bypass fetch operations,
 false otherwise  
<a name="WebDAVDatasource+toObject"></a>

### webDAVDatasource.toObject() ⇒ <code>Object</code>
Output the datasource as an object

**Kind**: instance method of [<code>WebDAVDatasource</code>](#WebDAVDatasource)  
**Overrides**: [<code>toObject</code>](#TextDatasource+toObject)  
**Returns**: <code>Object</code> - An object describing the datasource  
<a name="TextDatasource+setContent"></a>

### webDAVDatasource.setContent(content) ⇒ [<code>TextDatasource</code>](#TextDatasource)
Set the text content

**Kind**: instance method of [<code>WebDAVDatasource</code>](#WebDAVDatasource)  
**Returns**: [<code>TextDatasource</code>](#TextDatasource) - Self  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>String</code> | The encrypted text content |

<a name="TextDatasource+toString"></a>

### webDAVDatasource.toString() ⇒ <code>String</code>
Output the datasource configuration as a string

**Kind**: instance method of [<code>WebDAVDatasource</code>](#WebDAVDatasource)  
**Returns**: <code>String</code> - The string representation of the datasource  
<a name="WebDAVDatasource.fromObject"></a>

### WebDAVDatasource.fromObject(obj, [hostCredentials])
Create an instance from an object

**Kind**: static method of [<code>WebDAVDatasource</code>](#WebDAVDatasource)  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | The WebDAV info object |
| [hostCredentials] | <code>Credentials</code> | The server credentials |

<a name="WebDAVDatasource.fromString"></a>

### WebDAVDatasource.fromString(str, [hostCredentials])
Create an instance from a string

**Kind**: static method of [<code>WebDAVDatasource</code>](#WebDAVDatasource)  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>String</code> | The string representation of the datasource |
| [hostCredentials] | <code>Credentials</code> | The server credentials |

<a name="fireInstantiationHandlers"></a>

## fireInstantiationHandlers(datasource)
Execute all datasource postprocessors

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| datasource | [<code>TextDatasource</code>](#TextDatasource) | The datasource instance |

<a name="objectToDatasource"></a>

## objectToDatasource(obj, [hostCredentials]) ⇒ <code>null</code> \| [<code>TextDatasource</code>](#TextDatasource)
Create a datasource from an object
The object must have the required properties (as output by the corresponding
`toObject` call of the datasource).

**Kind**: global function  
**Returns**: <code>null</code> \| [<code>TextDatasource</code>](#TextDatasource) - A datasource instance or null of none found  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | The object |
| [hostCredentials] | <code>Credentials</code> | Credentials instance for remote host  authentication (not required for File/Text datasources) |

<a name="registerDatasource"></a>

## registerDatasource(datasourceType, DSClass)
Register a new datasource
This is called internally by the built-in datasources, but should be called if a
custom datasource is used.

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| datasourceType | <code>String</code> | The name (slug) of the datasource |
| DSClass | <code>Object</code> | The class for the new datasource |

<a name="registerDatasourcePostProcessor"></a>

## registerDatasourcePostProcessor(callback) ⇒ [<code>RegisterDatasourcePostProcessorResult</code>](#RegisterDatasourcePostProcessorResult)
Register a post-processor for a datasource being instantiated

**Kind**: global function  
**Returns**: [<code>RegisterDatasourcePostProcessorResult</code>](#RegisterDatasourcePostProcessorResult) - The result of the registration  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>function</code> | The callback to execute with the instantiated datasource |

<a name="stringToDatasource"></a>

## stringToDatasource(str, [hostCredentials]) ⇒ <code>null</code> \| [<code>TextDatasource</code>](#TextDatasource)
Create a datasource from a string

**Kind**: global function  
**Returns**: <code>null</code> \| [<code>TextDatasource</code>](#TextDatasource) - A new datasource instance or null of not found  
**Access**: public  
**See**: objectToDatasource  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>String</code> | The string representation of a datasource, as output by  the `toString` method on the corresponding datasource |
| [hostCredentials] | <code>Credentials</code> | The remote authentication credentials |

<a name="RegisterDatasourcePostProcessorResult"></a>

## RegisterDatasourcePostProcessorResult : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| remove | <code>function</code> | Function to call to remove the handler |

