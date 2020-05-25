const express = require('express');
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require('../middleware/auth')
const database = require("../data/db-connection")



router.get('/groups', auth, async (req, res) => {
    const queryUser = `SELECT * FROM public."User" WHERE "Email" = '${req.usermail}';`
    var user = null;
    try {
        const { rows } = await database.query(queryUser);
        user = rows[0];
    } catch (e) {
        res.send({ message: "Error in fetching your user" });
        return
    }
    //Hier muss eine Abfrage rein, welcher User eingeloggt ist! Join erstellen!
    // const queryGroups = `SELECT * FROM public."Group";`

    const queryGroups = `SELECT * FROM public."Group" INNER JOIN public."GroupUsers" ON public."Group"."Id"=public."GroupUsers"."GroupId" 
    WHERE public."GroupUsers"."UserId" = '${user.Id}';`
    try {
        const { rows } = await database.query(queryGroups);
        const dbResponse = rows;
        if (!(typeof dbResponse !== 'undefined' && dbResponse.length > 0)) {
            return res.status(200).json({ groups: [] })

            // const errorMessage = 'No groups found';
            // return res.status(404).send({ message: errorMessage });
        }

        res.status(200).json({ groups: dbResponse });
    } catch (e) {
        console.log(e);
        res.send({ message: "Error in Fetching groups" })
    }
});


router.get('/expense/:expenseId', auth, async (req, res) => {
    var queryExpense = `SELECT * FROM public."Expense" WHERE "Id" = '${req.params.expenseId}';`
    try {
        const { rows } = await database.query(queryExpense);
        const dbResponse = rows;
        if (!dbResponse[0]) {
            const errorMessage = 'No expenses found';
            return res.status(404).send({ message: errorMessage });
        }
        res.status(200).json(dbResponse);
    } catch (e) {
        console.log(e);
        res.send({ message: "Error in fetching expenses" })
    }
});


router.get('/categories', auth, async (req, res) => {
    const queryCategories = `SELECT * FROM public."Category";`
    try {
        const { rows } = await database.query(queryCategories);
        const dbResponse = rows;
        if (!dbResponse[0]) {
            return res.status(200).json({ categories: [] })

            // const errorMessage = 'No categories found';
            // return res.status(404).send({ message: errorMessage });
        }
        res.status(200).json({ categories: dbResponse });
    } catch (e) {
        console.log(e);
        res.send({ message: "Error in Fetching categories" })
    }
});


router.get('/users', auth, async (req, res) => {
    const queryUser = `SELECT * FROM public."User" WHERE "Email" = '${req.usermail}';`
    var user = null;
    try {
        const { rows } = await database.query(queryUser);
        user = rows[0];
    } catch (e) {
        res.send({ message: "Error in fetching your user" });
        return
    }

    const queryUsers = `SELECT * FROM public."User" WHERE "Id" <> ${user.Id};`
    try {
        const { rows } = await database.query(queryUsers);
        const dbResponse = rows;
        if (!dbResponse[0]) {
            return res.status(200).json({ users: [] })

            // const errorMessage = 'No users found';
            // return res.status(404).send({ message: errorMessage });
        }
        res.status(200).json({ users: dbResponse });
    } catch (e) {
        console.log(e);
        res.send({ message: "Error in Fetching users" })
    }


});


router.get('/expenses/:groupId', auth, async (req, res) => {

    var queryExpenses = `SELECT * FROM public."Expense" WHERE "GroupId" = '${req.params.groupId}';`
    try {
        const { rows } = await database.query(queryExpenses);
        const dbResponse = rows;
        if (!dbResponse[0]) {
            return res.status(200).json({ expenses: [] })
            // const errorMessage = 'No expenses found';
            // return res.status(404).send({ message: errorMessage });
        }
        res.status(200).json({ expenses: dbResponse });
    } catch (e) {
        console.log(e);
        res.send({ message: "Error in fetching expenses" })
    }
});



router.get('/group/:groupId', auth, async (req, res) => {

    var queryGroup = `SELECT * FROM public."Group" WHERE "Id" = '${req.params.groupId}';`
    try {
        const { rows } = await database.query(queryGroup);
        const dbResponse = rows;
        if (!dbResponse[0]) {
            const errorMessage = 'No group found';
            return res.status(404).send({ message: errorMessage });
        }
        res.status(200).json(dbResponse);
    } catch (e) {
        console.log(e);
        res.send({ message: "Error in fetching group" })
    }
});


router.post('/category',
    [check("name", "No category name found.").not().isEmpty(),
    check("image", "No image found").not().isEmpty()],
    auth,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: errors.array()
            });
        }

        const { name, image } = req.body;
        const queryCategoryPost = `INSERT INTO public."Category"("Name", "Image") VALUES ('${name}', '${image}');`

        try {
            const { rows } = await database.query(queryCategoryPost);
            res.status(201).json({ message: 'Created new category' });
        } catch (e) {
            console.log(e);
            res.send({ message: "Unable to create category" })
        }
    });


router.post('/group',
    [check("name", "No group name found.").not().isEmpty()],
    auth,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: errors.array()
            });
        }

        const queryUser = `SELECT * FROM public."User" WHERE "Email" = '${req.usermail}';`;
        const { name, participants } = req.body;
        const queryGroupPost = `INSERT INTO public."Group"("Name") VALUES ('${name}') RETURNING "Id";`

        var user = null;
        try {
            const { rows } = await database.query(queryUser);
            user = rows[0];
        } catch (e) {
            console.log(e);
            res.send({ message: "Error in fetching your user" });
            return
        }

        var groupId = null
        try {
            const { rows } = await database.query(queryGroupPost);
            group = rows[0];
            groupId = group.Id;
        } catch (e) {
            console.log(e);
            res.send({ message: "Unable to create new group" })
            return
        }

        const queryGroupUsersOwnUserPost = `INSERT INTO public."GroupUsers"("UserId", "GroupId") VALUES ('${user.Id}','${groupId}');`
        try {
            const { rows } = await database.query(queryGroupUsersOwnUserPost);
            group = rows[0];
        } catch (e) {
            console.log(e);
            res.send({ message: "Unable to insert user to new group" })
            return
        }
        if (typeof participants !== 'undefined' && participants.length > 0) {
            try {
                participants.forEach(async (participantId) => {
                    const queryGroupUsersParticipantPost = `INSERT INTO public."GroupUsers"("UserId", "GroupId") VALUES ('${participantId}','${groupId}');`

                    await database.query(queryGroupUsersParticipantPost);
                });
            } catch (e) {
                console.log(e);
                res.send({ message: "Unable to insert participant to new group" })
                return

            }
        }

        res.status(201).json({ message: "Created new group" })


    });


router.post('/expense',
    [check("costs", "No expense costs found.").isNumeric(),
    check("title", "No expense name found.").not().isEmpty(),
    check("groupId", "No expense group found.").not().isEmpty(),
    check("categoryId", "No expense category found.").not().isEmpty()],
    auth,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: errors.array()
            });
        }

        //Owner fehlt noch
        const { title, costs, categoryId, groupId } = req.body;
        const queryExpensePost = `INSERT INTO public."Expense"("Title", "Costs", "CategoryId", "GroupId") VALUES ('${title}', '${costs}', '${categoryId}', '${groupId}');`

        try {
            const { rows } = await database.query(queryExpensePost);
            res.status(201).json({ message: 'Inserted new expense' });
        } catch (e) {
            console.log(e);
            res.send({ message: "Unable to insert new expense" })
        }

    });

router.put('/expense/:expenseID',
    [check("costs", "No expense costs found.").isNumeric(),
    check("title", "No expense name found.").not().isEmpty(),
    check("groupId", "No expense group found.").not().isEmpty(),
    check("categoryId", "No expense category found.").not().isEmpty()],
    auth,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: errors.array()
            });
        }
        const { title, costs, categoryId, groupId } = req.body;
        var queryExpensePut = `UPDATE public."Expense" SET "Title"='${title}', "Costs"='${costs}', "CategoryId"='${categoryId}', "GroupId"='${groupId}' WHERE "Id" = '${req.params.expenseID}';`;
        try {
            await database.query(queryExpensePut);
            res.status(200).json({ message: 'Updated expense' });
        } catch (e) {
            console.log(e);
            res.send({ message: "Error in fetching expenses" })
        }
    });

router.put('/group/:groupId', auth, async (req, res) => {
    const { name } = req.body;
    var queryGroupPut = `UPDATE public."Group" SET "Name"='${name}' WHERE "Id" = '${req.params.groupId}';`;
    try {
        await database.query(queryGroupPut);
        res.status(200).json({ message: 'Updated group' });
    } catch (e) {
        console.log(e);
        res.send({ message: "Error in fetching groups" })
    }
});


router.delete('/group/:groupId', auth, async (req, res) => {
    var queryGroupDelete = `DELETE FROM public."Group" WHERE "Id" = '${req.params.groupId}';`;
    try {
        await database.query(queryGroupDelete);
        res.status(200).json({ message: 'Deleted group' });
    } catch (e) {
        console.log(e);
        res.send({ message: "Error in fetching groups" })
    }
});


router.delete('/expense/:expenseId', auth, async (req, res) => {
    var queryExpenseDelete = `DELETE FROM public."Expense" WHERE "Id" = '${req.params.expenseId}';`;
    try {
        await database.query(queryExpenseDelete);
        res.status(200).json({ message: 'Deleted expense' });
    } catch (e) {
        console.log(e);
        res.send({ message: "Error in fetching groups" })
    }
});

module.exports = router;
