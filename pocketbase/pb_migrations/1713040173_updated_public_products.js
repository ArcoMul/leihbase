/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("23lng9rcyhwckvp")

  collection.options = {
    "query": "SELECT products.id, products.name, products.location, products.categories, products.images, products.description, COUNT(reservations.id) AS ongoingReservations FROM products LEFT JOIN reservations ON products.id = reservations.product "
  }

  // remove
  collection.schema.removeField("nrywgdjw")

  // remove
  collection.schema.removeField("dsfdax2m")

  // remove
  collection.schema.removeField("futfbmcx")

  // remove
  collection.schema.removeField("1qj2nqs4")

  // remove
  collection.schema.removeField("gkgnne9f")

  // remove
  collection.schema.removeField("kaoyjgfz")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "d0nnnykp",
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
    "id": "pcfnjgeo",
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
    "id": "ppcoq9a1",
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
    "id": "wbdwzw4z",
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
    "id": "mxtachpf",
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
    "id": "rcpa2xbs",
    "name": "ongoingReservations",
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
    "query": "SELECT products.id, products.name, products.location, products.categories, products.images, products.description, COUNT(reservations.id) AS ongoingReservations FROM products LEFT JOIN reservations ON reservations.product = products.id"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nrywgdjw",
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
    "id": "dsfdax2m",
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
    "id": "futfbmcx",
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
    "id": "1qj2nqs4",
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
    "id": "gkgnne9f",
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
    "id": "kaoyjgfz",
    "name": "ongoingReservations",
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
  collection.schema.removeField("d0nnnykp")

  // remove
  collection.schema.removeField("pcfnjgeo")

  // remove
  collection.schema.removeField("ppcoq9a1")

  // remove
  collection.schema.removeField("wbdwzw4z")

  // remove
  collection.schema.removeField("mxtachpf")

  // remove
  collection.schema.removeField("rcpa2xbs")

  return dao.saveCollection(collection)
})
