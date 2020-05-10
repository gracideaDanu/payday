const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const database = require("../data/db-connection")



router.get('/groups', auth, async (req, res) => {
    const queryUser = `SELECT * FROM public."User" WHERE "Email" = '${req.usermail}';`
    var user = null;
    try {
        const { rows } = await database.query(queryUser);
        user = rows[0];
        console.log(user);
    } catch (e) {
        res.send({ message: "Error in fetching your user" });
    }

    const queryGroups = `SELECT * FROM public."Group";`
    try {
        const { rows } = await database.query(queryGroups);
        const dbResponse = rows;
        if (!dbResponse[0]) {
            errorMessage.error = 'No groups found';
            return res.status(404).send(errorMessage);
        }
        res.status(200).json(dbResponse);
    } catch (e) {
        res.send({ message: "Error in Fetching groups" })
    }
});


router.get('/expense/:expenseId', auth, async (req, res) => {
    var queryExpense = `SELECT * FROM public."Expense" WHERE "Id" = '${req.params.expenseId}';`
    try {
        const { rows } = await database.query(queryExpense);
        const dbResponse = rows;
        if (!dbResponse[0]) {
            errorMessage.error = 'No expenses found';
            return res.status(404).send(errorMessage);
        }
        res.status(200).json(dbResponse);
    } catch (e) {
        res.send({ message: "Error in fetching expenses" })
    }
});


router.get('/categories', auth, async (req, res) => {
    const queryCategories = `SELECT * FROM public."Category";`
    try {
        const { rows } = await database.query(queryCategories);
        const dbResponse = rows;
        if (!dbResponse[0]) {
            errorMessage.error = 'No categories found';
            return res.status(404).send(errorMessage);
        }
        res.status(200).json(dbResponse);
    } catch (e) {
        res.send({ message: "Error in Fetching categories" })
    }
});


router.get('/users', auth, async (req, res) => {
    const queryUsers = `SELECT * FROM public."User";`
    try {
        const { rows } = await database.query(queryUsers);
        const dbResponse = rows;
        if (!dbResponse[0]) {
            errorMessage.error = 'No users found';
            return res.status(404).send(errorMessage);
        }
        res.status(200).json(dbResponse);
    } catch (e) {
        res.send({ message: "Error in Fetching users" })
    }
});


router.get('/expenses/:groupId', auth, async (req, res) => {

    var queryExpenses = `SELECT * FROM public."Expense" WHERE "GroupId" = '${req.params.groupId}';`
    try {
        const { rows } = await database.query(queryExpenses);
        const dbResponse = rows;
        if (!dbResponse[0]) {
            errorMessage.error = 'No expenses found';
            return res.status(404).send(errorMessage);
        }
        res.status(200).json(dbResponse);
    } catch (e) {
        res.send({ message: "Error in fetching expenses" })
    }
});



router.get('/group/:groupId', auth, async (req, res) => {

    var queryGroup = `SELECT * FROM public."Group" WHERE "Id" = '${req.params.groupId}';`
    try {
        const { rows } = await database.query(queryGroup);
        const dbResponse = rows;
        if (!dbResponse[0]) {
            errorMessage.error = 'No group found';
            return res.status(404).send(errorMessage);
        }
        res.status(200).json(dbResponse);
    } catch (e) {
        res.send({ message: "Error in fetching group" })
    }
});


router.post('/category', auth, async (req, res) => {
    const { valCategory, valImage } = req.body;
    const queryCategoryPost = `INSERT INTO public."Category"("Name", "Image") VALUES ('${valCategory}', '${valImage}');`
    console.log(req.body);
    console.log(queryCategoryPost);

    try {
        const { rows } = await database.query(queryCategoryPost);
        res.status(200).json({ message: 'Created new category' });
    } catch (e) {
        res.send({ message: "Unable to create category" })
    }
});


router.post('/group', auth, async (req, res) => {
    const queryUser = `SELECT * FROM public."User" WHERE "Email" = '${req.usermail}';`;
    const { groupname, participants } = req.body;
    const queryGroupPost = `INSERT INTO public."Group"("Name") VALUES ('${groupname}') RETURNING "Id";`

    var user = null;
    try {
        const { rows } = await database.query(queryUser);
        user = rows[0];
        console.log(user);
    } catch (e) {
        res.send({ message: "Error in fetching your user" });
    }

    var groupId = null
    try {
        const { rows } = await database.query(queryGroupPost);
        group = rows[0];
        console.log("jetzt kommt group ID")
        console.log(group.Id);
        groupId = group.Id;
        console.log(group);
        // res.status(200).json({ message: 'Created new group' });
    } catch (e) {
        res.send({ message: "Unable to create new group" })
    }

    const queryGroupUsersOwnUserPost = `INSERT INTO public."GroupUsers"("UserId", "GroupId") VALUES ('${user.Id}','${groupId}');`
    try {
        const { rows } = await database.query(queryGroupUsersOwnUserPost);
        group = rows[0];
        // res.status(200).json({ message: 'Insert User to Group' });
    } catch (e) {
        res.send({ message: "Unable to insert user to new group" })
    }
    participants.forEach(async (participantId) => {
        console.log(participantId)
        const queryGroupUsersParticipantPost = `INSERT INTO public."GroupUsers"("UserId", "GroupId") VALUES ('${participantId}','${groupId}');`
        try {
            const { rows } = await database.query(queryGroupUsersParticipantPost);
            group = rows[0];
            res.status(200).json({ message: 'Insert new group' });
        } catch (e) {
            res.send({ message: "Unable to insert participant to new group" })
        }
    });


});


router.post('/expense', auth, async (req, res) => {
    const queryUser = `SELECT * FROM public."User" WHERE "Email" = '${req.usermail}';`;
    const { title, costs, categoryId, groupId } = req.body;
    const queryExpensePost = `INSERT INTO public."Expense"("Title", "Costs", "CategoryId", "GroupId") VALUES ('${title}', '${costs}', '${categoryId}', '${groupId}');`
    var user = null;
    try {
        const { rows } = await database.query(queryUser);
        user = rows[0];
        console.log(user);
    } catch (e) {
        res.send({ message: "Error in fetching your user" });
    }
    try {
        const { rows } = await database.query(queryExpensePost);
        res.status(200).json({ message: 'Inserted new expense' });
    } catch (e) {
        res.send({ message: "Unable to insert new expense" })
    }
    console.log("Zu erstellende Ausgabe:")
    console.log(req.body)
});

// catcht aus irgend einem Grund noch "Error in fetching groups", funktioniert aber
router.put('/expense/:expenseID', auth, async (req, res) => {
    const { title, costs, categoryId, groupId } = req.body;
    var queryExpensePut = `UPDATE public."Expense" SET "Title"='${title}', "Costs"='${costs}', "CategoryId"='${categoryId}', "GroupId"='${groupId}' WHERE "Id" = '${req.params.expenseID}';`;
    try {
        const { rows } = await database.query(queryExpensePut);
        const dbResponse = rows;
        if (!dbResponse[0]) {
            errorMessage.error = 'No expenses found';
            return res.status(404).send(errorMessage);
        }
        res.status(200).json({ message: 'Updated expense' });
    } catch (e) {
        res.send({ message: "Error in fetching expenses" })
    }
});

// catcht aus irgend einem Grund noch "Error in fetching groups", funktioniert aber
router.put('/group/:groupId', auth, async (req, res) => {
    const { name } = req.body;
    var queryGroupPut = `UPDATE public."Group" SET "Name"='${name}' WHERE "Id" = '${req.params.groupId}';`;
    try {
        const { rows } = await database.query(queryGroupPut);
        const dbResponse = rows;
        if (!dbResponse[0]) {
            errorMessage.error = 'No groups found';
            return res.status(404).send(errorMessage);
        }
        res.status(200).json({ message: 'Updated group' });
    } catch (e) {
        res.send({ message: "Error in fetching groups" })
    }
});


// catcht aus irgend einem Grund noch "Error in fetching groups", funktioniert aber
router.delete('/group/:groupId', auth, async (req, res) => {
    var queryGroupDelete = `DELETE FROM public."Group" WHERE "Id" = '${req.params.groupId}';`;
    try {
        const { rows } = await database.query(queryGroupDelete);
        const dbResponse = rows;
        if (!dbResponse[0]) {
            errorMessage.error = 'No groups found';
            return res.status(404).send(errorMessage);
        }
        res.status(200).json({ message: 'Deleted group' });
    } catch (e) {
        res.send({ message: "Error in fetching groups" })
    }
});


// catcht aus irgend einem Grund noch "Error in fetching groups", funktioniert aber
router.delete('/expense/:expenseId', auth, async (req, res) => {
    var queryExpenseDelete = `DELETE FROM public."Expense" WHERE "Id" = '${req.params.expenseId}';`;
    try {
        const { rows } = await database.query(queryExpenseDelete);
        const dbResponse = rows;
        if (!dbResponse[0]) {
            errorMessage.error = 'No expenses found';
            return res.status(404).send(errorMessage);
        }
        res.status(200).json({ message: 'Deleted expense' });
    } catch (e) {
        res.send({ message: "Error in fetching groups" })
    }
});

module.exports = router;