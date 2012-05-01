MongoDB indexes examples
========================

## Overview
Set of scripts which shows some aspects of indexing in MongoDB.

## Examples

### Basic Examples
_TBD: Description of basic-examples.js_

### Iterating Over Two Indexex
This scripts demonstrates how MongoDB uses more than one index for optimization of queries.

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
This example demonstrate simplified implementation of full-text search in MogoDB.

## Resources
1. Presentation (_in development_): [Indexing with MongoDB](https://docs.google.com/open?id=0B3yjF5899w1LMDA0ZFd2Yko5OU0)
2. MongoDB: [http://www.mongodb.org/](http://www.mongodb.org/)
3. Indexes in MongoDB (Official documentation): [http://www.mongodb.org/display/DOCS/Indexes](http://www.mongodb.org/display/DOCS/Indexes)
4. Explain operation (Official documentation): [http://www.mongodb.org/display/DOCS/Explain](http://www.mongodb.org/display/DOCS/Explain)
