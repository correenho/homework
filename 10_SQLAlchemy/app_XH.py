import numpy as np
import pandas as pd
import sqlalchemy
import datetime as dt
from datetime import timedelta
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify


engine = create_engine("sqlite:///Resources/hawaii.sqlite")

Base = automap_base()
Base.prepare(engine, reflect=True)
Measurement = Base.classes.measurement
Station = Base.classes.station
session=Session(engine)



app=Flask(__name__)

@app.route("/")
def home():
    return(
    	f"Available routes:<br/>"
        f"1. To inquire about precipitation:<br/>"
        f"- /api/v1.0/precipitation<br/>"
        f"2. To inquire about the list of stations:<br/>"
        f"- /api/v1.0/stations<br/>"
        f"3. To inquire about temperature observations:<br/>"
        f"- /api/v1.0/tobs<br/>"
        f"4. To inquire about the minimum, average and maximum temperatures from a date, please use\
        /api/v1.0/ plus<br/>\
        - start date, or<br/>\
        - start date/end date<br/>"
        f"- Please type the date in the format of yyyy-mm-dd."
    )
    
@app.route("/api/v1.0/precipitation")
def precipitation():
    results=session.query(Measurement.date, Measurement.prcp).all()
    session.close()

    date_prcp=[]
    
    for date, precip in results:
    	prcp_dict={}
    	prcp_dict.setdefault(date,precip)
    	date_prcp.append(prcp_dict)
    
    return jsonify(date_prcp)


@app.route("/api/v1.0/stations")
def stations():
	results=session.query(Station.name).all()
	session.close()

	station_list=[]

	for station in results:
		station_list.append(station)

	return jsonify(station_list)


@app.route("/api/v1.0/tobs")
def tobs():
	ini_date = session.query(Measurement.date).order_by(Measurement.date.desc()).first()
	ini_date_time = dt.datetime.strptime(ini_date[0],'%Y-%m-%d')
	past_date_12mths = ini_date_time + timedelta(days=-365.5)
	ini_date_time,past_date_12mths
	results=session.query(Measurement.date, Measurement.tobs).filter(Measurement.date >= past_date_12mths).all()
	session.close()

	p12m_tobs_list=[]

	for date, tob in results:
		date_tob_dict = {}
		date_tob_dict.setdefault(date,tob)
		p12m_tobs_list.append(date_tob_dict)

	return 	jsonify(p12m_tobs_list)


@app.route("/api/v1.0/<start>")
def date_query(start):
			
	start_date_converted=dt.datetime.strptime(start,'%Y-%m-%d')

	ini_date = session.query(Measurement.date).order_by(Measurement.date.desc()).first()
	ini_date_time = dt.datetime.strptime(ini_date[0],'%Y-%m-%d')

	def calc_temps(start_date, end_date):
		return session.query(func.min(Measurement.tobs), func.avg(Measurement.tobs), func.max(Measurement.tobs)).\
	        filter(Measurement.date >= start_date).filter(Measurement.date <= end_date).all()

	if start_date_converted <= ini_date_time:	
		return jsonify(calc_temps(start_date_converted,ini_date_time))
	else:
		return f"Cannot process the date entered. Please use a different date."


@app.route("/api/v1.0/<start>/<end>")
def temp_query(start,end):
	start_date_converted=dt.datetime.strptime(start,'%Y-%m-%d')
	end_date_converted=dt.datetime.strptime(end,'%Y-%m-%d')

	ini_date = session.query(Measurement.date).order_by(Measurement.date.desc()).first()
	ini_date_time = dt.datetime.strptime(ini_date[0],'%Y-%m-%d')

	def calc_temps(start_date, end_date):
		return session.query(func.min(Measurement.tobs), func.avg(Measurement.tobs), func.max(Measurement.tobs)).\
	        filter(Measurement.date >= start_date).filter(Measurement.date <= end_date).all()

	if start_date_converted<=ini_date_time and end_date_converted<=ini_date_time and start_date_converted<=end_date_converted:	
		return jsonify(calc_temps(start_date_converted,end_date_converted))
	else:
		return f"Cannot process the dates entered. Please use a different date."



if __name__ == '__main__':
    app.run(debug=True)