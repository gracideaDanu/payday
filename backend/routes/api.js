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
    const queryUser = `SELECT * FROM public."User" WHERE "Email" = '${req.usermail}';`
    var user = null;
    try {
        const { rows } = await database.query(queryUser);
        user = rows[0];
        console.log(user);
    } catch (e) {
        res.send({ message: "Error in fetching your user" });
    }

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
    const queryUser = `SELECT * FROM public."User" WHERE "Email" = '${req.usermail}';`
    var user = null;
    try {
        const { rows } = await database.query(queryUser);
        user = rows[0];
        console.log(user);
    } catch (e) {
        res.send({ message: "Error in fetching your user" });
    }

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


// var queryExpense = `SELECT * FROM public."Expense" WHERE "Id" = ${expenseId};`
//   router.get('/expense/:expenseID', auth, async (req, res) => {
//     try {
//       console.log(req.params.expenseID)
//       const expense = await Expense.findById(req.params.expenseID);
//       res.status(200).json(expense);
//     } catch (e) {
//       res.send({ message: "Error in fetching expense"})
//     }
//   });


// var queryGroup = `SELECT * FROM public."Group" WHERE "Id" = ${groupId};`
//   router.get('/group/:groupID', auth, async (req, res) => {
//     try {
//       console.log(req.params.groupID)
//       const group = await Group.findById(req.params.groupID);
//       res.status(200).json(group);
//     } catch (e) {
//       res.send({ message: "Error in fetching group"})
//     }
//   });


router.post('/category', auth, async (req, res) => {
    const queryUser = `SELECT * FROM public."User" WHERE "Email" = '${req.usermail}';`;
    const { valCategory, valImage } = req.body;
    const queryCategoryPost = `INSERT INTO public."Category"("Name", "Image") VALUES ('${valCategory}', '${valImage}');`
    console.log(req.body);
    console.log(queryCategoryPost);
    var user = null;
    try {
        const { rows } = await database.query(queryUser);
        user = rows[0];
        console.log(user);
    } catch (e) {
        res.send({ message: "Error in fetching your user" });
    }

    try {
        const { rows } = await database.query(queryCategoryPost);
        // const dbResponse = rows[0];
        res.status(200).json({ message: 'Created new category' });
    } catch (e) {
        res.send({ message: "Unable to create category" })
    }
});




// var queryGroupPost = `INSERT INTO public."Group"("Id", "Name", "CreatedAt") VALUES (?, ?, ?);`;
//   router.post('/group', auth, async (req, res) => {
//     console.log("Zu erstellende Gruppe:")
//     console.log(req.body)
//       if(req.body.name && req.body.users){
//           await Group.create(req.body)
//             .then(data => res.status(201).json(data))
//         }else {
//           res.json({
//             error: "Gruppe konnte nicht erstellt werden."
//           })
//         }
//   });


// var queryExpensePost = `INSERT INTO public."Expense"("Id", "Title", "Costs", "Category", "Group", "Owner", "CreatedAt") VALUES (?, ?, ?, ?, ?, ?, ?);`;
//   router.post('/expense', auth, async (req, res) => {
//     console.log("Zu erstellende Ausgabe:")
//     console.log(req.body)
//       if(req.body.title && req.body.costs && req.body.category 
//         && req.body.group && req.body.participants){
//           await Expense.create(req.body)
//             .then(data => res.status(201).json(data))
//         }else {
//           res.json({
//             error: "Ausagbe konnte nicht erstellt werden."
//           })
//         }
//   });


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