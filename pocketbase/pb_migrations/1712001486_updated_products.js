/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("oxgh1la125efx04")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "u3csmld8",
    "name": "categories",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "eq4iy7753ga1h1m",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("oxgh1la125efx04")

  // remove
  collection.schema.removeField("u3csmld8")

  return dao.saveCollection(collection)
})
