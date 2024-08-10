/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h7plyphsy0mgjpf")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "knq3clyw",
    "name": "send_confirmation",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("h7plyphsy0mgjpf")

  // remove
  collection.schema.removeField("knq3clyw")

  return dao.saveCollection(collection)
})
