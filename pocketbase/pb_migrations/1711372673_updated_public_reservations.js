/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qqus3eo9ya7bars")

  // remove
  collection.schema.removeField("qiejepop")

  // remove
  collection.schema.removeField("jvshph0o")

  // remove
  collection.schema.removeField("csodlrgx")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ekoavaef",
    "name": "product",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "oxgh1la125efx04",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nageet85",
    "name": "start",
    "type": "date",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1uenpxqn",
    "name": "end",
    "type": "date",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qqus3eo9ya7bars")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qiejepop",
    "name": "product",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "oxgh1la125efx04",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jvshph0o",
    "name": "start",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "csodlrgx",
    "name": "end",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // remove
  collection.schema.removeField("ekoavaef")

  // remove
  collection.schema.removeField("nageet85")

  // remove
  collection.schema.removeField("1uenpxqn")

  return dao.saveCollection(collection)
})
