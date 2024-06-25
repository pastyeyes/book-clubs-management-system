# Asumptions
- Users can have only one reading list.
- User reading history are the book marked as read in the user's reading list.
- User preferences will be based in the reading list
    - This can be the separate to a different implementation.
    - Users can have a set of tags (such as book names, book length, genre, author) 
    - Tags along with reading list statuses might be used to infer from there the recommendations.
- Book Club can exists without any member, or members = 0
- Status and Genre are strings due to simplicity but should be tables.
- Errors are not verbose, but generic. It provides little security added. The errors are interally logged. 
- The develop of functional code was prefered over testeable code. There is lot of room to improve in testeability.
- The search by genre uses the subject property to search in Google Books Api but lists the Categories field not the genre so genre and category might and likely have differents words
# Considerations for improvements
- Repository layer should be behind a Controller layer that is imported into the endpoint layer
- Controller layer handles the data transformation, and obtains the data from the repository.

# Test remaining to be done

# Prerequisites
- Terraform by hashicorp executable CLI.
- AWS CLI
- Docker Engine

# Commands
- `npm install express dotenv sequelize pg pg-hstore` for system dependencies
- `npm install --save-dev jest supertest` for testing
- `aws configure` to setup the local credentials
- `terraform init | plan | apply | destroy` to deploy infrastructure

# Deployment
- Uses a terraform script to deploy the infrastructure

# In the EC2
- Install ngnix (necessary?) `sudo apt install ngnix`
- install nvm (node version manager)
```
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash 
source ~/.bashrc
```
- Install node and npm `nvm install 20.12.2`
- Install process manager for node apps `npm install pm2 -g`
- git is installed by default