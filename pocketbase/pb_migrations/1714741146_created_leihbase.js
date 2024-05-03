/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "gu30h2m0sajzw6p",
    "created": "2024-05-03 12:59:06.116Z",
    "updated": "2024-05-03 12:59:06.116Z",
    "name": "leihbase",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "5pg1pkpi",
        "name": "imprint",
        "type": "editor",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "convertUrls": false
        }
      },
      {
        "system": false,
        "id": "ohbrtpwk",
        "name": "contact_link",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("gu30h2m0sajzw6p");

  return dao.deleteCollection(collection);
})
