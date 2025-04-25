import json
import os
import html
from db_conn import db_conn

BASE_DIR = os.path.dirname(__file__)

with open(os.path.join(BASE_DIR, "..", "data", "manufacturers.json"), encoding="utf-8") as f:
    manufacturers = json.load(f)[0]

with open(os.path.join(BASE_DIR, "..", "data", "drinks_with_all_corrections.json"), encoding="utf-8") as f:
    drinks = json.load(f)


drink_to_manf_name = {}

for manf in manufacturers:
    for drink in manf.get("manf_of_drink", []):
        drink_to_manf_name[drink.strip()] = manf["name"].strip()

db = db_conn(
    username="",
    password=""
)
db.connect()

sql_lookup_manf = """
    SELECT id FROM Manufacturer WHERE name = ?;
"""
sql_insert_drink = """
    INSERT INTO Drink (name, [mg/oz], image_url, manufacturer_id)
    VALUES (?, ?, ?, ?);
"""

# # insert loop
# for drink in drinks:
#     # Skip null
#     if not drink:
#         continue

#     try:
#         name = html.unescape(drink["name"].strip())
#         mg_per_oz = drink["mg_per_oz"]
#         image_url = drink["image"]
#         manf_name = drink_to_manf_name.get(name)

#         if not manf_name:
#             print(f"Skipping '{name}': manufacturer name not found in JSON.")
#             continue

#         # get the manufacturer’s id
#         db.cursor.execute(sql_lookup_manf, (manf_name))
#         row = db.cursor.fetchone()
#         if row is None:
#             print(f"Skipping '{name}': manufacturer '{manf_name}' not in the DB.")
#             continue
#         manf_id = row[0]

#         # insert the drink
#         db.cursor.execute(sql_insert_drink, (name, mg_per_oz, image_url, manf_id))

#     except Exception as exc:
#         print(f"Error inserting '{drink.get('name', 'unknown')}': {exc}")

# db.connection.commit()
# db.close()
# print("All drink records inserted (where a matching manufacturer was found).")
