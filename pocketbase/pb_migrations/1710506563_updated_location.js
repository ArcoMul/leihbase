/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nkbfankqkyubdu9")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sq4yk2iw",
    "name": "users",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("nkbfankqkyubdu9")

  // remove
  collection.schema.removeField("sq4yk2iw")

  return dao.saveCollection(collection)
})
