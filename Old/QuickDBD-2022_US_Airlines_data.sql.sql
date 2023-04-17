-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/6dQRQ0
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "Active_Weather" (
    "STATUS" INT   NOT NULL,
    "WEATHER_DESCRIPTION" VARCHAR(120)   NOT NULL,
    CONSTRAINT "pk_Active_Weather" PRIMARY KEY (
        "STATUS"
     )
);

CREATE TABLE "Cancellation" (
    "STATUS" INT   NOT NULL,
    "CANCELLATION_REASON" VARCHAR(35)   NOT NULL,
    CONSTRAINT "pk_Cancellation" PRIMARY KEY (
        "STATUS"
     )
);

CREATE TABLE "Carriers" (
    "CODE" VARCHAR(2)   NOT NULL,
    "DESCRIPTION" VARCHAR(45)   NOT NULL,
    CONSTRAINT "pk_Carriers" PRIMARY KEY (
        "CODE"
     )
);

CREATE TABLE "UpdatedNewCompleteData" (
    "FL_DATE" date   NOT NULL,
    "DEP_HOUR" INT   NOT NULL,
    "OP_UNIQUE_CARRIER" VARCHAR(2)   NOT NULL,
    "OP_CARRIER_FL_NUM" INT   NOT NULL,
    "TAIL_NUM" VARCHAR(10)   NOT NULL,
    "ORIGIN" VARCHAR(5)   NOT NULL,
    "DEST" VARCHAR(5)   NOT NULL,
    "DEP_TIME" float   NOT NULL,
    "CRS_DEP_TIME" float   NOT NULL,
    "TAXI_OUT" INT   NOT NULL,
    "DEP_DELAY" INT   NOT NULL,
    "AIR_TIME" INT   NOT NULL,
    "CANCELLED" INT   NOT NULL,
    "YEAR_OF_MANUFACTURE" INT   NOT NULL,
    "MANUFACTURER" VARCHAR(35)   NOT NULL,
    "ICAO_TYPE" VARCHAR(5)   NOT NULL,
    "ACTIVE_WEATHER" INT   NOT NULL
);

ALTER TABLE "Carriers" ADD CONSTRAINT "fk_Carriers_CODE" FOREIGN KEY("CODE")
REFERENCES "UpdatedNewCompleteData" ("OP_UNIQUE_CARRIER");

ALTER TABLE "UpdatedNewCompleteData" ADD CONSTRAINT "fk_UpdatedNewCompleteData_CANCELLED" FOREIGN KEY("CANCELLED")
REFERENCES "Cancellation" ("STATUS");

ALTER TABLE "UpdatedNewCompleteData" ADD CONSTRAINT "fk_UpdatedNewCompleteData_ACTIVE_WEATHER" FOREIGN KEY("ACTIVE_WEATHER")
REFERENCES "Active_Weather" ("STATUS");

