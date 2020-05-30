-- ALTER TABLE  public."GroupUsers"
--     DROP CONSTRAINT IF EXISTS "FK_GroupUsers_User";
-- ALTER TABLE  public."GroupUsers"
--     DROP CONSTRAINT IF EXISTS "FK_GroupUsers_Group";
-- ALTER TABLE  public."ExpenseParticipants"
--     DROP CONSTRAINT IF EXISTS "FK_ExpenseParticipants_User";
-- ALTER TABLE  public."ExpenseParticipants"
--     DROP CONSTRAINT IF EXISTS "FK_ExpenseParticipants_Expense";


-- DROP TABLE IF EXISTS public."User";
-- DROP TABLE IF EXISTS public."Expense";
-- DROP TABLE IF EXISTS public."ExpenseParticipants";
-- DROP TABLE IF EXISTS public."Group";
-- DROP TABLE IF EXISTS public."GroupUsers";
-- DROP TABLE IF EXISTS public."Category";



CREATE TABLE IF NOT EXISTS public."User"
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


CREATE TABLE IF NOT EXISTS public."Expense"
(
    "Id" SERIAL UNIQUE,
    "Title" VARCHAR NOT NULL,
    "Costs" FLOAT NOT NULL,
    "CategoryId" INTEGER NOT NULL,
    "GroupId" INTEGER NOT NULL,
    "Owner" VARCHAR,
    "CreatedAt" timestamp NOT NULL DEFAULT NOW(),
    CONSTRAINT "PK_Expense" PRIMARY KEY ("Id")
);

CREATE TABLE IF NOT EXISTS public."ExpenseParticipants"
(
    "Id" SERIAL UNIQUE,
    "UserId" INTEGER NOT NULL,
    "ExpenseId" INTEGER NOT NULL,
    CONSTRAINT "PK_ExpenseParticipants" PRIMARY KEY ("Id")
);


CREATE TABLE IF NOT EXISTS public."Group"
(
    "Id" SERIAL UNIQUE,
    "Name" VARCHAR NOT NULL,
    "Receipted" BOOLEAN DEFAULT FALSE,
    "CreatedAt" timestamp NOT NULL DEFAULT NOW(),
    CONSTRAINT "PK_Group" PRIMARY KEY ("Id")
);

CREATE TABLE IF NOT EXISTS public."GroupUsers"
(
    "Id" SERIAL UNIQUE,
    "UserId" INTEGER NOT NULL,
    "GroupId" INTEGER NOT NULL,
    CONSTRAINT "PK_GroupUsers" PRIMARY KEY ("Id")
);


CREATE TABLE IF NOT EXISTS public."Category"
(
    "Id" SERIAL UNIQUE,
    "Name" VARCHAR NOT NULL,
    "Image" VARCHAR NOT NULL,
    "CreatedAt" timestamp NOT NULL DEFAULT NOW(),
    CONSTRAINT "PK_Category" PRIMARY KEY ("Id")
);


INSERT INTO public."User"(
                "Username", "FirstName", "LastName", "Email", "Password"
                ) VALUES(
                'payday-test-account', 'Pay', 'Day', 'test@payday.de', '$2a$10$C4d.4w/WWnR75ciGkeeeT.rOaA7dTjaLQmNw6VX/1cTMsw85PoiTq'
                );

                
INSERT INTO public."User"(
                "Username", "FirstName", "LastName", "Email", "Password"
                ) VALUES(
                'payday-test-account2', 'Pay2', 'Day2', 'test2@payday.de', '$2a$10$C4d.4w/WWnR75ciGkeeeT.rOaA7dTjaLQmNw6VX/1cTMsw85PoiTq'
                );

INSERT INTO public."User"(
                "Username", "FirstName", "LastName", "Email", "Password"
                ) VALUES(
                'payday-test-account3', 'Pay3', 'Day3', 'test3@payday.de', '$2a$10$C4d.4w/WWnR75ciGkeeeT.rOaA7dTjaLQmNw6VX/1cTMsw85PoiTq'
                );     


INSERT INTO public."Category"("Name", "Image") VALUES ('Bier', 'bier.png');           
INSERT INTO public."Category"("Name", "Image") VALUES ('Essen', 'essen.png');   
INSERT INTO public."Category"("Name", "Image") VALUES ('Tickets', 'tickets.png');   

INSERT INTO public."Group"("Name") VALUES ('Testgruppe 1');
INSERT INTO public."GroupUsers"("UserId", "GroupId") VALUES ('1','1');
INSERT INTO public."GroupUsers"("UserId", "GroupId") VALUES ('2','1');
INSERT INTO public."GroupUsers"("UserId", "GroupId") VALUES ('3','1');

INSERT INTO public."Group"("Name") VALUES ('Testgruppe 2');
INSERT INTO public."GroupUsers"("UserId", "GroupId") VALUES ('1','2');
INSERT INTO public."GroupUsers"("UserId", "GroupId") VALUES ('2','2');

INSERT INTO public."Group"("Name", "Receipted") VALUES ('Testgruppe 3', TRUE);
INSERT INTO public."GroupUsers"("UserId", "GroupId") VALUES ('1','3');
INSERT INTO public."GroupUsers"("UserId", "GroupId") VALUES ('2','3');
INSERT INTO public."GroupUsers"("UserId", "GroupId") VALUES ('3','3');


INSERT INTO public."Expense"("Title", "Costs", "CategoryId", "GroupId") VALUES ('Bier', '22.3', '1', '1');
INSERT INTO public."Expense"("Title", "Costs", "CategoryId", "GroupId") VALUES ('Essen', '2.3', '2', '1');
INSERT INTO public."Expense"("Title", "Costs", "CategoryId", "GroupId") VALUES ('Tickets', '42.3', '3', '1');

INSERT INTO public."Expense"("Title", "Costs", "CategoryId", "GroupId") VALUES ('Bier', '22.3', '1', '2');
INSERT INTO public."Expense"("Title", "Costs", "CategoryId", "GroupId") VALUES ('Essen', '2.3', '2', '2');
INSERT INTO public."Expense"("Title", "Costs", "CategoryId", "GroupId") VALUES ('Tickets', '42.3', '3', '2');

INSERT INTO public."Expense"("Title", "Costs", "CategoryId", "GroupId") VALUES ('Bier', '22.3', '1', '3');
INSERT INTO public."Expense"("Title", "Costs", "CategoryId", "GroupId") VALUES ('Essen', '2.3', '2', '3');
INSERT INTO public."Expense"("Title", "Costs", "CategoryId", "GroupId") VALUES ('Tickets', '42.3', '3', '3');


ALTER TABLE  public."GroupUsers"
    ADD CONSTRAINT "FK_GroupUsers_User" FOREIGN KEY ("UserId") REFERENCES public."User"("Id");
ALTER TABLE  public."GroupUsers"
    ADD CONSTRAINT "FK_GroupUsers_Group" FOREIGN KEY ("GroupId") REFERENCES public."Group"("Id");

ALTER TABLE  public."Expense"
    ADD CONSTRAINT "FK_Expense_Category" FOREIGN KEY ("CategoryId") REFERENCES public."Category"("Id");

ALTER TABLE public."Expense"
    ADD CONSTRAINT "FK_Expense_Group" FOREIGN KEY ("GroupId") REFERENCES public."Group"("Id");

ALTER TABLE  public."ExpenseParticipants"
    ADD CONSTRAINT "FK_ExpenseParticipants_User" FOREIGN KEY ("UserId") REFERENCES public."User"("Id");
ALTER TABLE  public."ExpenseParticipants"
    ADD CONSTRAINT "FK_ExpenseParticipants_Expense" FOREIGN KEY ("ExpenseId") REFERENCES public."Expense"("Id");
