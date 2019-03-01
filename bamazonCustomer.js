var inquirer = require("inquirer");
var mysql = require("mysql");

//creating sql connection

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "MAB439110!!@#s",
    database: "products_db"
});

connection.connect(function (err) {
    if (err) throw err;
    else
        appStart();
    //console.log("app started no errors")
});



function appStart() {
    connection.query("SELECT item_id,product_name,price,stock_quantity FROM products", function (err, results) {
        if (err) throw err;
        inquirer.prompt({
            name: "chooseItem",
            type: 'rawlist',

            choices: function () {
                var choiceArray = [];
                for (var i = 0; i < results.length; i++) {
                    choiceArray.push(results[i].product_name + " $" + results[i].price + "/item" + "------Items Available------" + results[i].stock_quantity);
                }
                return choiceArray;
            },
            message: "Which Item would you like to buy?",





        }).then(function (user)


            {
                inquirer.prompt({
                        name: "numberofitem",
                        type: 'input',
                        message: "How many would you like to buy?",
                    })


                    .then(function (answer) {

                        for (var i = 0; i < results.length; i++) {

                            if (results[i].stock_quantity === 0 || answer.numberofitem > results[i].stock_quantity) {
                                console.log("Insufficient quantity");

                            } else {
                                var totalCost = 0;
                                totalCost = answer.numberofitem * results[i].price;

                                return console.log("You ordered: " + answer.numberofitem + " " + user.chooseItem + "-----\n" + "Your total cost is: " + " $" + totalCost);





                            }


                        }
                        var remainingQty = results[i].stock_quantity - answer.numberofitem;
                        return console.log("There are " + remainingQty + " items of this product remaining");
                       // remainingItems();
                    });


            });

    });
}