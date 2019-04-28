var friends = require("../data/friends.js");

module.exports = function (app) {

    app.get("/api/friends", function (_req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function (_req, res) {

        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 1000
        };


        // * Important * Nested for loop will be needed; (thanks W3Schools, John Bellamy, and Stack Overflow (math absolute turns a neg to a pos))!


        // Parse user's survey result
        var userData = req.body;
        var userScores = userData.scores;

        // Variable to find the differnce between the user's scores and the scores of each user in the DB
        var totalDifference = 0;

        // Loop through all the friends in the DB
        for (var i = 0; i < friends.length; i++) {

            console.log(friends[i.name]);
            totalDifference = 0;

            // Loop through the scores of the friends in the DB
            for (var j = 0; j < friends[i].scores[j]; j++) {

                // Difference between the scores and 'sum' them into totalDifference variable
                totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

                // If sum of difference is less than the differnce of the best match
                if (totalDifference <= bestMatch.friendDifference) {

                    // Change the bestMatch to be the compaitble friend
                    bestMatch.name = friends[i].name;
                    bestMatch.photo = friends[i].photo;
                    bestMatch.friendDifference = totalDifference;
                }
            }
        }
        // Save user's data to DB after check so DB won't say that user is user's best friend
        friends.push(userData);

        // HTML needs to use a json w/ user's bestMatch
        res.json(bestMatch);
        
    });



}