import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///flight_db")

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


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available API routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/flights<br/>"
    )

@app.route("/api/flights")
def flights():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of flight data including the date, departure hour, and destination"""
    # Query all flights
    results = session.query(Flight.FL_DATE, Flight.DEP_HOUR, Flight.DEST, Flight.TAXI_OUT).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_flights
    all_flights = []
    for FL_DATE, DEP_HOUR, DEST,TAXI_OUT in results:
        flight_dict = {}
        flight_dict["FL_DATE"] = FL_DATE
        flight_dict["DEP_HOUR"] = DEP_HOUR
        flight_dict["DEST"] = DEST
        flight_dict["TAXI_OUT"] = TAXI_OUT
        all_flights.append(flight_dict)

    return jsonify(all_flights)


if __name__ == '__main__':
    app.run(debug=True)