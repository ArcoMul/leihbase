/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("eq4iy7753ga1h1m")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2jkk89vg",
    "name": "name_de",
    "type": "text",
    "required": true,
    "presentable": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("eq4iy7753ga1h1m")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2jkk89vg",
    "name": "name_de",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
