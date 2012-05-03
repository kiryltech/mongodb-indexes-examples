MongoDB indexes examples
========================

## Overview
Set of scripts which shows some aspects of indexing in MongoDB.

## Examples

### Basic Examples
_TBD: Description of basic-examples.js_

#### Run
```
mongo basic-examples.js
```

### Iterating Over Two Indexes
This script demonstrates how MongoDB uses more than one index for optimization of queries.

#### Run
```
mongo iterating-over-two-indexes.js
```

#### Description
Result example (for query without sorting):
```json
{
	"clauses" : [
		{
			"cursor" : "BtreeCursor v1_1",
			"nscanned" : 30,
			"nscannedObjects" : 30,
			"n" : 30,
			"millis" : 0,
			"nYields" : 0,
			"nChunkSkips" : 0,
			"isMultiKey" : false,
			"indexOnly" : false,
			"indexBounds" : {
				"v1" : [
					[
						10,
						39
					]
				]
			}
		},
		{
			"cursor" : "BtreeCursor v3_1",
			"nscanned" : 15,
			"nscannedObjects" : 15,
			"n" : 10,
			"millis" : 0,
			"nYields" : 0,
			"nChunkSkips" : 0,
			"isMultiKey" : false,
			"indexOnly" : false,
			"indexBounds" : {
				"v3" : [
					[
						35,
						49
					]
				]
			}
		}
	],
	"nscanned" : 45,
	"nscannedObjects" : 45,
	"n" : 40,
	"millis" : 0
}
```

Result example (for query with sorting):
```json
{
	"cursor" : "BasicCursor",
	"nscanned" : 100,
	"nscannedObjects" : 100,
	"n" : 40,
	"scanAndOrder" : true,
	"millis" : 0,
	"nYields" : 0,
	"nChunkSkips" : 0,
	"isMultiKey" : false,
	"indexOnly" : false,
	"indexBounds" : {
	}
}
```

### Full Text Search Eaxmple
Inspired by [Full Text Search in Mongo](http://www.mongodb.org/display/DOCS/Full+Text+Search+in+Mongo).

This example demonstrates simplified implementation of full-text search in MogoDB.

#### Run
```
mongo full-text-search-example.js
```

#### Description
* Before save document:
    * Collect all words in document into one array
    * Put collected words into document (in example field "_w" is used), document looks like this:

```json
{
    "_id" : ObjectId("4f9fdf87a09f1819274c3f6b"),
    "v1" : "First string",
    "v2" : "Second string",
    "v3" : [
    	{
    	    "v4" : "String in nested list item"
    	}
    ],
    "_w" : [
    	"first",
    	"string",
    	"second",
    	"nested",
    	"list",
    	"item"
    ]
}
```
* On search execution:
    * Collect all words in search term
    * Create search criteria, using operator $all:
    
```json
{
    "_w": { "$all": [<words_from_search_term>] }
}
```

### Unique constraints
This example shows how to achieve the following goals:

* Implement ability to create unlimited count of unique constraints in one collection
* Implement ability to define different scopes of uniqueness for documents in one collection

#### Run
```
mongo unique-constraints-example.js
```

#### Description
For each matched constraint collect unique tokens and add it to list field, this field should be covered by unique, sparse index.

Example:
```
$ mongo unique-constraints-example.js --quiet
Record: {  "t" : "t1",  "v1" : "tag",  "_u" : [ 	"t1$tag" ],  "_id" : ObjectId("4fa22d66b8da12e83007b96b") } saved successfully.
Record: {  "t" : "t1",  "v1" : "tag2",  "_u" : [ 	"t1$tag2" ],  "_id" : ObjectId("4fa22d67b8da12e83007b96c") } saved successfully.
Record: {  "t" : "t1",  "v1" : "tAg",  "_u" : [ 	"t1$tag" ],  "_id" : ObjectId("4fa22d67b8da12e83007b96d") } was rejected.
Record: {  "t" : "t2",  "v1" : "tAg",  "_u" : [ 	"t2$tAg" ],  "_id" : ObjectId("4fa22d67b8da12e83007b96e") } saved successfully.
Record: {  "t" : "t2",  "v1" : "tag",  "_u" : [ 	"t2$tag" ],  "_id" : ObjectId("4fa22d67b8da12e83007b96f") } saved successfully.
Record: {  "t" : "t2",  "v1" : "Tag",  "_u" : [ 	"t2$Tag" ],  "_id" : ObjectId("4fa22d67b8da12e83007b970") } saved successfully.
Record: {  "t" : "t2",  "v1" : "tag",  "_u" : [ 	"t2$tag" ],  "_id" : ObjectId("4fa22d67b8da12e83007b971") } was rejected.
Record: {  "t" : "t3",  "v1" : "tag",  "_id" : ObjectId("4fa22d67b8da12e83007b972") } saved successfully.
Record: {  "t" : "t3",  "v1" : "tag",  "_id" : ObjectId("4fa22d67b8da12e83007b973") } saved successfully.
```

## Resources
1. Presentation (_in development_): [Indexing with MongoDB](https://docs.google.com/open?id=0B3yjF5899w1LMDA0ZFd2Yko5OU0)
2. MongoDB: [http://www.mongodb.org/](http://www.mongodb.org/)
3. Indexes in MongoDB (Official documentation): [http://www.mongodb.org/display/DOCS/Indexes](http://www.mongodb.org/display/DOCS/Indexes)
4. Explain operation (Official documentation): [http://www.mongodb.org/display/DOCS/Explain](http://www.mongodb.org/display/DOCS/Explain)
