CREATE TABLE public."User"
(
    "Id" SERIAL UNIQUE,
    "Username" VARCHAR NOT NULL,
    "FirstName" VARCHAR NOT NULL,
    "LastName" VARCHAR NOT NULL,
    "Email" VARCHAR NOT NULL,
    "Password" VARCHAR NOT NULL,
    "Image" VARCHAR,
    "CreatedAt" timestamp NOT NULL DEFAULT NOW(),
    CONSTRAINT "PK_User" PRIMARY KEY ("Id")
);


CREATE TABLE public."Expense"
(
    "Id" SERIAL UNIQUE,
    "Title" VARCHAR NOT NULL,
    "Costs" VARCHAR NOT NULL,
    "Category" VARCHAR NOT NULL,
    "Group" VARCHAR NOT NULL,
    "Owner" VARCHAR,
    "CreatedAt" timestamp NOT NULL DEFAULT NOW(),
    CONSTRAINT "PK_Expense" PRIMARY KEY ("Id")
);

CREATE TABLE public."ExpenseParticipants"
(
    "Id" SERIAL UNIQUE,
    "UserId" INTEGER NOT NULL,
    "ExpenseId" INTEGER NOT NULL,
    CONSTRAINT "PK_ExpenseParticipants" PRIMARY KEY ("Id")
);


CREATE TABLE public."Group"
(
    "Id" SERIAL UNIQUE,
    "Name" VARCHAR NOT NULL,
    "CreatedAt" timestamp NOT NULL DEFAULT NOW(),
    CONSTRAINT "PK_Group" PRIMARY KEY ("Id")
);

CREATE TABLE public."GroupUsers"
(
    "Id" SERIAL UNIQUE,
    "UserId" INTEGER NOT NULL,
    "GroupId" INTEGER NOT NULL,
    CONSTRAINT "PK_GroupUsers" PRIMARY KEY ("Id")
);


CREATE TABLE public."Category"
(
    "Id" SERIAL UNIQUE,
    "Name" VARCHAR NOT NULL,
    "Image" VARCHAR NOT NULL,
    "CreatedAt" timestamp NOT NULL DEFAULT NOW(),
    CONSTRAINT "PK_Category" PRIMARY KEY ("Id")
);


ALTER TABLE  public."GroupUsers"
    ADD CONSTRAINT "FK_GroupUsers_User" FOREIGN KEY ("UserId") REFERENCES public."User"("Id");

ALTER TABLE  public."GroupUsers"
    ADD CONSTRAINT "FK_GroupUsers_Group" FOREIGN KEY ("GroupId") REFERENCES public."Group"("Id");


ALTER TABLE  public."ExpenseParticipants"
    ADD CONSTRAINT "FK_ExpenseParticipants_User" FOREIGN KEY ("UserId") REFERENCES public."User"("Id");

ALTER TABLE  public."ExpenseParticipants"
    ADD CONSTRAINT "FK_ExpenseParticipants_Expense" FOREIGN KEY ("ExpenseId") REFERENCES public."Expense"("Id");

