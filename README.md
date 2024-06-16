# Asumptions
- Users can have only one reading list.
- User reading history are the book marked as read in the user's reading list.
- User preferences will be based in the reading list
    - This can be the separate to a different implementation.
    - Users can have a set of tags (such as book names, book length, genre, author) 
    - Tags along with reading list statuses might be used to infer from there the recommendations.

# Commands
npm install express dotenv sequelize pg pg-hstore