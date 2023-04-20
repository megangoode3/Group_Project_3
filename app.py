# Python SQL toolkit and Object Relational Mapper
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, inspect
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import sqlite3

#################################################
# Database Setup
#################################################
engine = create_engine('sqlite:///flight_db.sqlite', echo=False)
# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(autoload_with=engine)

# Save reference to the table
Flight = Base.classes.flight_db

#################################################
# Flask Setup
#################################################
app = Flask(__name__)
CORS(app, resources={r"/api/flights": {"origins": "http://127.0.0.1:5501", "allow_headers": ["Content-Type", "Authorization"]}})
CORS(app)

@app.route("/")
def welcome():
    """List all available API routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/flights<br/>"
    )

@app.route("/api/flights")
def flight_data():
    # Create our session (link) from Python to the DB
    session = Session(engine)
    # Query all flight data
    results = session.query(Flight.FL_DATE, Flight.DEP_HOUR, Flight.OP_UNIQUE_CARRIER, Flight.OP_CARRIER_FL_NUM, Flight.TAIL_NUM, Flight.ORIGIN, Flight.DEST, Flight.SCHED_DEP_DATE, Flight.SCHED_DEP_TIME, Flight.ACTUAL_DEP_DATE, Flight.ACTUAL_DEP_TIME, Flight.TAXI_OUT, Flight.DEP_DELAY, Flight.AIR_TIME, Flight.CANCELLED, Flight.YEAR_OF_MANUFACTURE, Flight.MANUFACTURER, Flight.ICAO_TYPE, Flight.ACTIVE_WEATHER).all()

    # Create a dictionary from the row data and append to a list of all_passengers
    all_flight_data = []
    for FL_DATE, DEP_HOUR, OP_UNIQUE_CARRIER, OP_CARRIER_FL_NUM, TAIL_NUM, ORIGIN, DEST, SCHED_DEP_DATE, SCHED_DEP_TIME,ACTUAL_DEP_DATE, ACTUAL_DEP_TIME, TAXI_OUT, DEP_DELAY, AIR_TIME, CANCELLED, YEAR_OF_MANUFACTURE, MANUFACTURER, ICAO_TYPE, ACTIVE_WEATHER in results:
        flight_dict = {}
        flight_dict["FL_DATE"] = FL_DATE
        flight_dict["DEP_HOUR"] = DEP_HOUR
        flight_dict["OP_UNIQUE_CARRIER"] = OP_UNIQUE_CARRIER
        flight_dict["OP_CARRIER_FL_NUM"] = OP_CARRIER_FL_NUM
        flight_dict["TAIL_NUM"] = TAIL_NUM
        flight_dict["ORIGIN"] = ORIGIN
        flight_dict["DEST"] = DEST
        flight_dict["SCHED_DEP_DATE"] = SCHED_DEP_DATE
        flight_dict["SCHED_DEP_TIME"] = SCHED_DEP_TIME
        flight_dict["ACTUAL_DEP_DATE"] = ACTUAL_DEP_DATE
        flight_dict["ACTUAL_DEP_TIME"] = ACTUAL_DEP_TIME
        flight_dict["TAXI_OUT"] = TAXI_OUT
        flight_dict["DEP_DELAY"] = DEP_DELAY
        flight_dict["AIR_TIME"] = AIR_TIME
        flight_dict["CANCELLED"] = CANCELLED
        flight_dict["YEAR_OF_MANUFACTURE"] = YEAR_OF_MANUFACTURE
        flight_dict["MANUFACTURER"] = MANUFACTURER
        flight_dict["ICAO_TYPE"] = ICAO_TYPE
        flight_dict["ACTIVE_WEATHER"] = ACTIVE_WEATHER
        all_flight_data.append(flight_dict)

    return jsonify(all_flight_data)


if __name__ == '__main__':
    app.run(debug=True)