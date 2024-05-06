# BACKEND

### Game
- create tournament
- get (game or tournament) history, statue

### USER 
- change friend-list database 
    [article](https://medium.com/analytics-vidhya/add-friends-with-689a2fa4e41d)

* invite users create looby for game 
   - if after 2 min invited user didn't join the game room kill the inviter

## tournament 
- join registered users to looby_tournament_<tournament_id>
   - randomly assign to every user an opponent
   - if some user does not have an opponent he get promoted to new round automatically
   - wait tell start time and then create games rooms and send link to all registered users

- every game ended the winner is added to bracket table
- when all games ended retrieve all winners and create match-up accordingly

# in game
 - every user stream hes moves and backend app stream back the position o the ball and score
 - score is stored in cache
 - when game is ended the score get flushed to db


# FRONTEND
- Profile page
- setting page
- notification toast
- invitation toast
- game looby

- ## Forms
    - create tournament
    - create chat group
    - update user info
