/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nkbfankqkyubdu9")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jt5rqoxb",
    "name": "links",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 2000000
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nkbfankqkyubdu9")

  // remove
  collection.schema.removeField("jt5rqoxb")

  return dao.saveCollection(collection)
})
