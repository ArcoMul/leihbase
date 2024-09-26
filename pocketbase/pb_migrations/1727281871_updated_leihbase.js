/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("gu30h2m0sajzw6p")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "giapnf2o",
    "name": "style",
    "type": "text",
    "required": false,
    "presentable": false,
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
  const collection = dao.findCollectionByNameOrId("gu30h2m0sajzw6p")

  // remove
  collection.schema.removeField("giapnf2o")

  return dao.saveCollection(collection)
})
