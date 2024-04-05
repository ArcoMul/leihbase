/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "eq4iy7753ga1h1m",
    "created": "2024-04-01 19:55:47.861Z",
    "updated": "2024-04-01 19:55:47.861Z",
    "name": "categories",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "2jkk89vg",
        "name": "name_de",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "m1c5dm4h",
        "name": "name_en",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [
      "CREATE UNIQUE INDEX `idx_7uhrwww` ON `categories` (`name_de`)",
      "CREATE UNIQUE INDEX `idx_D3rTwd7` ON `categories` (`name_en`)"
    ],
    "listRule": "",
    "viewRule": "",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("eq4iy7753ga1h1m");

  return dao.deleteCollection(collection);
})
