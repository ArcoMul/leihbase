/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gu30h2m0sajzw6p")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ltimpo7r",
    "name": "privacy_policy",
    "type": "editor",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "convertUrls": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gu30h2m0sajzw6p")

  // remove
  collection.schema.removeField("ltimpo7r")

  return dao.saveCollection(collection)
})
