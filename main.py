import sqlite3
import csv
import pandas as pd

connection = sqlite3.connect('flight.db')
cursor = connection.cursor()

cursor.execute('''
    CREATE TABLE IF NOT EXISTS flight_db (
        FL_DATE DATE,
        DEP_HOUR INTEGER,
        OP_UNIQUE_CARRIER TEXT,
        OP_CARRIER_FL_NUM INTEGER,
        TAIL_NUM TEXT,
        ORIGIN TEXT,
        DEST TEXT,
        DEP_TIME TEXT,
        CRS_DEP_TIME TEXT,
        TAXI_OUT INTEGER,
        DEP_DELAY INTEGER,
        AIR_TIME INTEGER,
        CANCELLED INTEGER,
        YEAR_OF_MANUFACTURE TEXT,
        MANUFACTURER TEXT,
        ICAO_TYPE TEXT,
        ACTIVE_WEATHER INTEGER )
''')

flight_data = pd.read_csv('UpdatedNewCompleteData.csv')             
flight_data.to_sql('flight_db', connection, if_exists='append', index=False)

cursor.execute('''
    SELECT * FROM flight_db
''')
print(cursor.fetchall())

flight_df = pd.read_sql('''
    SELECT * FROM flight_db
    ''', connection)

print(flight_df.head())

connection.close()
