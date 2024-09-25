/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qqus3eo9ya7bars")

  collection.options = {
    "query": "SELECT id, product, start, end FROM reservations WHERE cancelled IS FALSE"
  }

  // remove
  collection.schema.removeField("fg4fdemt")

  // remove
  collection.schema.removeField("fo4t2hz0")

  // remove
  collection.schema.removeField("4w3nne0i")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pq1aq7zj",
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
    "id": "cx21ieuu",
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
    "id": "hvshyed2",
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

  collection.options = {
    "query": "SELECT id, product, start, end FROM reservations"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fg4fdemt",
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
    "id": "fo4t2hz0",
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
    "id": "4w3nne0i",
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

  // remove
  collection.schema.removeField("pq1aq7zj")

  // remove
  collection.schema.removeField("cx21ieuu")

  // remove
  collection.schema.removeField("hvshyed2")

  return dao.saveCollection(collection)
})
