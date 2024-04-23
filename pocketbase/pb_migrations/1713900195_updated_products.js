/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("oxgh1la125efx04")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "aumrbvfp",
    "name": "active",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lvcivpi8",
    "name": "notes",
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
  const collection = dao.findCollectionByNameOrId("oxgh1la125efx04")

  // remove
  collection.schema.removeField("aumrbvfp")

  // remove
  collection.schema.removeField("lvcivpi8")

  return dao.saveCollection(collection)
})
