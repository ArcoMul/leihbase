/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("23lng9rcyhwckvp")

  collection.options = {
    "query": "SELECT products.id, products.name, products.location, products.categories, products.images, products.description, reservations.id AS ongoingReservation FROM products LEFT JOIN reservations ON products.id = reservations.product AND DATE(reservations.start) <= DATE('now') AND DATE(reservations.end) > DATE('now')"
  }

  // remove
  collection.schema.removeField("gxaaofkc")

  // remove
  collection.schema.removeField("vbeg2skd")

  // remove
  collection.schema.removeField("9wfjrrad")

  // remove
  collection.schema.removeField("efq3qggg")

  // remove
  collection.schema.removeField("gphfg0rs")

  // remove
  collection.schema.removeField("eaglvbnn")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sr8whyrx",
    "name": "name",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cdpcyq7s",
    "name": "location",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "nkbfankqkyubdu9",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yrmyadp2",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "y4fw2wvp",
    "name": "images",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [],
      "thumbs": [],
      "maxSelect": 99,
      "maxSize": 5242880,
      "protected": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zl02dbws",
    "name": "description",
    "type": "editor",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "convertUrls": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rv2mchzb",
    "name": "ongoingReservation",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "h7plyphsy0mgjpf",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("23lng9rcyhwckvp")

  collection.options = {
    "query": "SELECT products.id, products.name, products.location, products.categories, products.images, products.description, reservations.id AS ongoingReservations FROM products LEFT JOIN reservations ON products.id = reservations.product AND DATE(reservations.start) <= DATE('now') AND DATE(reservations.end) > DATE('now')"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gxaaofkc",
    "name": "name",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vbeg2skd",
    "name": "location",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "nkbfankqkyubdu9",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9wfjrrad",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "efq3qggg",
    "name": "images",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [],
      "thumbs": [],
      "maxSelect": 99,
      "maxSize": 5242880,
      "protected": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gphfg0rs",
    "name": "description",
    "type": "editor",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "convertUrls": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "eaglvbnn",
    "name": "ongoingReservations",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "h7plyphsy0mgjpf",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // remove
  collection.schema.removeField("sr8whyrx")

  // remove
  collection.schema.removeField("cdpcyq7s")

  // remove
  collection.schema.removeField("yrmyadp2")

  // remove
  collection.schema.removeField("y4fw2wvp")

  // remove
  collection.schema.removeField("zl02dbws")

  // remove
  collection.schema.removeField("rv2mchzb")

  return dao.saveCollection(collection)
})
