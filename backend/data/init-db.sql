CREATE TABLE test (
    id integer NOT NULL,
    conf_id integer NOT NULL,
    option_key character varying NOT NULL,
    ausstatt_kz character varying NOT NULL,
    ausstatt_alt character varying NOT NULL,
    option_category_id character varying NOT NULL,
    option_type_id character varying 
);


CREATE TABLE public."User"
(
    "ID" SERIAL UNIQUE,
    "Username" VARCHAR NOT NULL,
    "FirstName" VARCHAR NOT NULL,
    "LastName" VARCHAR NOT NULL,
    "Email" VARCHAR NOT NULL,
    "Password" VARCHAR NOT NULL,
    "Image" VARCHAR,
    "CreatedAt" timestamp NOT NULL DEFAULT NOW(),
    CONSTRAINT "User_pkey" PRIMARY KEY ("ID")
);