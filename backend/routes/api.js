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


// var queryExpenses = `SELECT * FROM public."Expense";`
// router.get('/expenses/:groupID', auth, async (req, res) => {
//     try {
//       const expenses = await Expense.find({
//         group: req.params.groupID
//       });

//       res.status(200).json(expenses);
//     } catch (e) {
//       res.send({ message: "Error in fetching expenses"})
//     }
//   });


router.get('/categories', auth, async (req, res) => {
    // const queryUser = `SELECT * FROM public."User" WHERE "Email" = '${req.usermail}';`
    // var user = null;
    // try {
    //     const { rows } = await database.query(queryUser);
    //     user = rows[0];
    //     console.log(user);
    // } catch (e) {
    //     res.send({ message: "Error in fetching your user" });
    // }

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
    // const queryUser = `SELECT * FROM public."User" WHERE "Email" = '${req.usermail}';`
    // var user = null;
    // try {
    //     const { rows } = await database.query(queryUser);
    //     user = rows[0];
    //     console.log(user);
    // } catch (e) {
    //     res.send({ message: "Error in fetching your user" });
    // }

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

    var queryExpense = `SELECT * FROM public."Expense" WHERE "Id" = '${req.params.groupId}';`
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

    const queryGroupUsersOwnUserPost = `INSERT INTO public."GroupUsers"("UserId, GroupId") VALUES ('${user.Id}','${groupId}');`
    try {
        const { rows } = await database.query(queryGroupUsersOwnUserPost);
        group = rows[0];
        // res.status(200).json({ message: 'Insert User to Group' });
    } catch (e) {
        res.send({ message: "Unable to insert user to new group" })
    }
    participants.forEach(async (participantId) => {
        console.log(participantId)
        const queryGroupUsersParticipantPost = `INSERT INTO public."GroupUsers"("UsersId, GroupId") VALUES ('${participantId}','${groupId}');`
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
    const { title, costs, category, group } = req.body;
    const queryExpensePost = `INSERT INTO public."Expense"("Title", "Costs", "Category", "Group") VALUES ('${title}', '${costs}', '${category}', '${group}');`
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


// var queryExpensePut = `UPDATE public."Expense" SET "Id"=?, "Title"=?, "Costs"=?, "Category"=?, "Group"=?, "Owner"=?, "CreatedAt"=? WHERE "Id" = ${expenseID};`;
// router.put('/expense/:expenseID', auth, async (req, res) => {
//     console.log("Zu änderende Felder:")
//     console.log(req.body)
//     try {
//       await Expense.findOneAndUpdate(
//         { _id: req.params.expenseID },
//         req.body);
//       res.status(200).send('Ok');
//     } catch (e) {
//       res.send({ message: "Die Ausgabe konnte nicht gefunden werden...:(" })
//     }
//   });


// var queryGroupPut = `UPDATE public."Group" SET "Id"=?, "Name"=?, "CreatedAt"=? WHERE "Id" = ${groupID};`;
//   router.put('/group/:groupID', auth, async (req, res) => {
//     console.log("Zu änderende Felder:")
//     console.log(req.body)
//     try {
//       await Group.findOneAndUpdate(
//         { _id: req.params.groupID },
//         req.body);
//       //Zu Testzwecken
//       //const result = await Group.findById(req.params.groupID)
//       res.status(200).send('Ok');
//     } catch (e) {
//       res.send({ message: "Die Gruppe konnte nicht gefunden werden...:(" })
//     }
//   });


// var queryGroupDelete = `DELETE FROM public."Group" WHERE "Id" = ${groupID};`;
// router.delete('/group/:groupID', auth, async (req, res) => {
//     console.log('GruppenID welche gelöscht werden soll: ' + req.params.groupID);
//     try {
//       await Expense.deleteMany( 
//         { group: req.params.groupID }
//       )
//       await Group.findOneAndDelete(
//         { _id: req.params.groupID }
//       );
//       res.status(200).send('Ok');
//     } catch (e) {
//       res.send({ message: "Die Gruppe konnte nicht gefunden werden...:(" })
//     }
//   });


// var queryExpenseDelete = `DELETE FROM public."Expense" WHERE "Id" = ${expenseID};`;
//   router.delete('/expense/:expenseID', auth, async (req, res) => {
//     console.log('ExpenseID welche gelöscht werden soll: ' + req.params.expenseID);
//     try {
//       await Expense.findOneAndDelete(
//         { _id: req.params.expenseID }
//       );
//       res.status(200).send('Ok');
//     } catch (e) {
//       res.send({ message: "Die Ausagbe konnte nicht gefunden werden...:(" })
//     }
//   });

module.exports = router;