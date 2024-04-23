/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("oxgh1la125efx04")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "iilop8q4",
    "name": "deposit",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("oxgh1la125efx04")

  // remove
  collection.schema.removeField("iilop8q4")

  return dao.saveCollection(collection)
})
