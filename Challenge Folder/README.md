# Quick Response Desking
Management system for Hot Desking and occupany visualisation

Git Ignored a database.ini file with the following data:
[postgresql]
user=psql_user
password=the_user_password
database=the_database_name
host=private_ip_address# Quick_Response_Desking


# PostgreSQL DATABASE SETUP

"CREATE TABLE buildings(
id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
address TEXT NOT NULL,
building_name TEXT, 
gps_co_ords TEXT
);
"

"CREATE TABLE building_entrances (
id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
building_entrance_name TEXT,
building_id INT REFERENCES floors, 
co_ord_x REAL, 
co_ord_y REAL,
UNIQUE (building_id, co_ord_x ,co_ord_y)
);
"

"CREATE TABLE floors(
id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
floor_number INT NOT NULL,
floor_name TEXT, 
building_id INT REFERENCES buildings
);
"

"CREATE TABLE floor_entrances (
id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
floor_entrance_name TEXT,
floor_id INT REFERENCES floors, 
co_ord_x REAL, 
co_ord_y REAL,
UNIQUE (floor_id, co_ord_x ,co_ord_y)
);
"

"CREATE TABLE users(
id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
name TEXT,
email TEXT UNIQUE NOT NULL,
checked_in BOOL NOT NULL,
last_desk_id INT REFERENCES desks
);
"

"CREATE TABLE desks (
id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
scan_code_id INT REFERENCES scan_codes,
desk_name TEXT, 
floor_id INT REFERENCES floors, 
occupied BOOL NOT NULL,
reserved_until_time TIMESTAMPZ,
reserved_time_limit INT NOT NULL,
last_user INT,
co_ord_x REAL NOT NULL,
co_ord_y REAL NOT NULL,
UNIQUE (floor_id, co_ord_x ,co_ord_y)
);
"

"CREATE TABLE scan_codes (
id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
scan_code TEXT UNIQUE NOT NULL,
desk_id INT REFERENCES desks,
floor_entrances_id INT REFERENCES floor_entrances,
building_entrances_id INT REFERENCES building_entrances,
CHECK ( NOT (desk_id IS NOT NULL AND floor_entrances_id IS NOT NULL)),
CHECK ( NOT (desk_id IS NOT NULL AND building_entrances_id IS NOT NULL)),
CHECK ( NOT (floor_entrance_id IS NOT NULL AND user_id IS NOT NULL))
);"

"CREATE TABLE actions(
id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
action_name TEXT UNIQUE NOT NULL
);
"

"CREATE TABLE log(
id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, 
user_id INT REFERENCES users,
desk_id INT REFERENCES desks,
time_stamp TIMESTAMPTZ NOT NULL,
action INT REFERENCES actions
);
"
