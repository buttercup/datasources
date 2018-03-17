## Modules

<dl>
<dt><a href="#module_ButtercupDatasources">ButtercupDatasources</a></dt>
<dd><p>The primary module</p>
</dd>
</dl>

## Classes

<dl>
<dt><a href="#TextDatasource">TextDatasource</a></dt>
<dd><p>Datasource for text input and output</p>
</dd>
</dl>

## Functions

<dl>
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
<dt><a href="#stringToDatasource">stringToDatasource(str, [hostCredentials])</a> ⇒ <code>null</code> | <code><a href="#TextDatasource">TextDatasource</a></code></dt>
<dd><p>Create a datasource from a string</p>
</dd>
</dl>

<a name="module_ButtercupDatasources"></a>

## ButtercupDatasources
The primary module

<a name="TextDatasource"></a>

## TextDatasource
Datasource for text input and output

**Kind**: global class  

* [TextDatasource](#TextDatasource)
    * [new TextDatasource(content)](#new_TextDatasource_new)
    * [.load(credentials, [emptyCreatesNew])](#TextDatasource+load) ⇒ <code>Promise.&lt;Archive&gt;</code>
    * [.save(archive, credentials)](#TextDatasource+save) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.setContent(content)](#TextDatasource+setContent) ⇒ [<code>TextDatasource</code>](#TextDatasource)
    * [.toObject()](#TextDatasource+toObject) ⇒ <code>Object</code>
    * [.toString()](#TextDatasource+toString) ⇒ <code>String</code>

<a name="new_TextDatasource_new"></a>

### new TextDatasource(content)
Constructor for the text datasource


| Param | Type | Description |
| --- | --- | --- |
| content | <code>string</code> | The content to load from |

<a name="TextDatasource+load"></a>

### textDatasource.load(credentials, [emptyCreatesNew]) ⇒ <code>Promise.&lt;Archive&gt;</code>
Load from the stored content using a password to decrypt

**Kind**: instance method of [<code>TextDatasource</code>](#TextDatasource)  
**Returns**: <code>Promise.&lt;Archive&gt;</code> - A promise that resolves with an open archive  

| Param | Type | Description |
| --- | --- | --- |
| credentials | <code>Credentials</code> | The password or Credentials instance to decrypt with |
| [emptyCreatesNew] | <code>Boolean</code> | Create a new Archive instance if text contents are empty (defaults to false) |

<a name="TextDatasource+save"></a>

### textDatasource.save(archive, credentials) ⇒ <code>Promise.&lt;string&gt;</code>
Save an archive with a password

**Kind**: instance method of [<code>TextDatasource</code>](#TextDatasource)  
**Returns**: <code>Promise.&lt;string&gt;</code> - A promise resolving with the encrypted content  

| Param | Type | Description |
| --- | --- | --- |
| archive | <code>Archive</code> | The archive to save |
| credentials | <code>Credentials</code> | The Credentials instance to encrypt with |

<a name="TextDatasource+setContent"></a>

### textDatasource.setContent(content) ⇒ [<code>TextDatasource</code>](#TextDatasource)
Set the text content

**Kind**: instance method of [<code>TextDatasource</code>](#TextDatasource)  
**Returns**: [<code>TextDatasource</code>](#TextDatasource) - Self  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>String</code> | The encrypted text content |

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

