/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("23lng9rcyhwckvp")

  collection.options = {
    "query": "SELECT products.id, products.name, products.location, products.categories, products.images, products.description, COUNT(reservations.id) AS ongoing_reservations FROM products LEFT JOIN reservations ON reservations.product = products.id"
  }

  // remove
  collection.schema.removeField("fpwvtoyz")

  // remove
  collection.schema.removeField("e2kqun52")

  // remove
  collection.schema.removeField("4h0vqhlu")

  // remove
  collection.schema.removeField("vnlfgy4e")

  // remove
  collection.schema.removeField("qv4wjiav")

  // remove
  collection.schema.removeField("0xxxsjha")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "jsqvhlck",
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
    "id": "fc5r8mah",
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
    "id": "gly28qsh",
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
    "id": "nmf03rpp",
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
    "id": "4bu2j5sx",
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
    "id": "aqjdb6xq",
    "name": "ongoing_reservations",
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
  const collection = dao.findCollectionByNameOrId("23lng9rcyhwckvp")

  collection.options = {
    "query": "SELECT products.id, products.name, products.location, products.categories, products.images, products.description, COUNT(reservations.id) AS ongoing_reservations FROM products LEFT JOIN reservations ON reservations.product = products.id AND reservations.start <= DATE('now') AND reservations.end > DATE('now')"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fpwvtoyz",
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
    "id": "e2kqun52",
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
    "id": "4h0vqhlu",
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
    "id": "vnlfgy4e",
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
    "id": "qv4wjiav",
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
    "id": "0xxxsjha",
    "name": "ongoing_reservations",
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

  // remove
  collection.schema.removeField("jsqvhlck")

  // remove
  collection.schema.removeField("fc5r8mah")

  // remove
  collection.schema.removeField("gly28qsh")

  // remove
  collection.schema.removeField("nmf03rpp")

  // remove
  collection.schema.removeField("4bu2j5sx")

  // remove
  collection.schema.removeField("aqjdb6xq")

  return dao.saveCollection(collection)
})
