from db_conn import db_conn
import json
import os

# Correct file path to manufacturers.json
json_path = os.path.join(os.path.dirname(__file__), "..", "data", "manufacturers.json")

with open(json_path, "r", encoding="utf-8") as f:
    manufacturer_list = json.load(f)[0]  # fix here!

# replace with usename and password
db = db_conn(
    username='<username>',
    password='<password>'
)
db.connect()

stmt = """
    INSERT INTO Manufacturer (name, website, address)
    VALUES (?, ?, ?)
"""

for manufacturer in manufacturer_list:
    try:
        name = manufacturer["name"].strip()
        website = manufacturer["website"].strip()
        address = manufacturer["location"].strip()

        db.cursor.execute(stmt, (name, website, address))
    except Exception as e:
        print(f"Error inserting {manufacturer.get('name', 'Unknown')}: {e}")

db.connection.commit()
db.close()
print("Manufacturer data inserted successfully.")
