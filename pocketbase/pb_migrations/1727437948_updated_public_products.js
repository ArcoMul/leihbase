/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("23lng9rcyhwckvp")

  collection.options = {
    "query": "SELECT products.id, products.name, products.location, products.categories, products.images, products.deposit, products.description, reservations.id AS ongoingReservation FROM products LEFT JOIN reservations ON products.id = reservations.product AND reservations.cancelled = FALSE AND DATE(reservations.start) <= DATE('now') AND DATE(reservations.end) >= DATE('now') WHERE products.active = TRUE"
  }

  // remove
  collection.schema.removeField("y41hlwlv")

  // remove
  collection.schema.removeField("vyn3kahd")

  // remove
  collection.schema.removeField("m6ufpinl")

  // remove
  collection.schema.removeField("jfu6uyev")

  // remove
  collection.schema.removeField("faw8nd87")

  // remove
  collection.schema.removeField("uzus2ctu")

  // remove
  collection.schema.removeField("r4dlujqf")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xugyukjv",
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
    "id": "k20onjaw",
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
    "id": "zu43bnhy",
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
    "id": "vcokx6nv",
    "name": "images",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [],
      "thumbs": [
        "600x0",
        "1200x0"
      ],
      "maxSelect": 99,
      "maxSize": 5242880,
      "protected": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "q4pn7m3x",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ahiowk09",
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
    "id": "l9lsmdvp",
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
    "query": "SELECT products.id, products.name, products.location, products.categories, products.images, products.deposit, products.description, reservations.id AS ongoingReservation FROM products LEFT JOIN reservations ON products.id = reservations.product AND DATE(reservations.start) <= DATE('now') AND DATE(reservations.end) > DATE('now') WHERE products.active = TRUE"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "y41hlwlv",
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
    "id": "vyn3kahd",
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
    "id": "m6ufpinl",
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
    "id": "jfu6uyev",
    "name": "images",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [],
      "thumbs": [
        "600x0",
        "1200x0"
      ],
      "maxSelect": 99,
      "maxSize": 5242880,
      "protected": false
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "faw8nd87",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uzus2ctu",
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
    "id": "r4dlujqf",
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

  // remove
  collection.schema.removeField("xugyukjv")

  // remove
  collection.schema.removeField("k20onjaw")

  // remove
  collection.schema.removeField("zu43bnhy")

  // remove
  collection.schema.removeField("vcokx6nv")

  // remove
  collection.schema.removeField("q4pn7m3x")

  // remove
  collection.schema.removeField("ahiowk09")

  // remove
  collection.schema.removeField("l9lsmdvp")

  return dao.saveCollection(collection)
})
