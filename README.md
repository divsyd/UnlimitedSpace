# UnlimitedSpace

## Key code style and design principles

- Weapons of choice... We are building a MEAN app!
	- Frontend should be done in Angular.
	- Database should be MongoDB.
	- Server should be ExpressJS.
	- Mongoose ODM should be used for object modelling with MongoDB.
- Maintain consistency in layout
	- Use standard naming convention for variables and classes. e.g. PascalCase for classes, UPPERCASE for const and camelCase for viarables.
	- Use line indentation for easy reading of code. Leave a space after closing classes or functions.
	- Keep lines under 120 characters wide.
	- Avoid trailing spaces. One or two lines to break up code for readability is preferred
- Documentation and comments
	- All variables should be descriptive. Avoid using things like x.
	- If the code isn't obvious on what it is doing, add inline comments to explain further.
	- Add comments for code to be implemented at a later date.
	- Incomplete code should not be commented out and pushed to master. Create a branch or stash this somewhere else.
	- Git commits should be short one line subjects with no full stop. Thing in terms of: If applied, this commit will *Add CCS styling for main page*

## Basic setup of project

1. Clone the repo
		
		git clone https://github.com/divsyd/UnlimitedSpace.git

1. Install packages

		cd ./UnlimitedSpace
		npm install
		
1. Install MongoDB. See guide [here](https://docs.mongodb.com/manual/installation). 

    - An alternate option is to run Mongo in a docker conntainer

          docker run --name mongodb -p 27017:27017 --rm mongo:4.0.1

1. Start mondodb

		mkdir -p ./db/data
		mongod --dbpath ./db/data --logpath ./db/log
	
1. Populate MongoDB collections

		node ./populateDb mongodb://localhost:27017/unlimitedSpaceDb
		
1. Build Angular frontend

		ng build
		
1. Start web server

		ts-node ./server.ts

- Please note that all the components are not fully intergrated yet.
	- You can see Angular frontend here: [http://localhost:8000/hotels](http://localhost:8000/hotels)
	- You can see the server API: [http://localhost:8000/api/rooms](http://localhost:8000/api/rooms)
	- We now need to update the angular components to match the database and add CRUD services.
