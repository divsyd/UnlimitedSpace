# UnlimitedSpace

[![Build Status](https://divsyd.visualstudio.com/UnlimitedSpace/_apis/build/status/UnlimitedSpace-CI)](https://divsyd.visualstudio.com/UnlimitedSpace/_build/latest?definitionId=5)

Source repository for [https://unlimitedspace.azurewebsites.net/](https://unlimitedspace.azurewebsites.net/)

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
		In windows OS, Open powershell with administrator privileges and run this command, then proceed with bcrypt installation
		npm install --global --production windows-build-tools
		
1. Install MongoDB. See guide [here](https://docs.mongodb.com/manual/installation). 

    - An alternate option is to run Mongo in a docker conntainer

        	docker run --name mongodb -p 27017:27017 --rm mongo:4.0.1

1. Start mondodb

		mkdir -p ./db/data
		mongod --dbpath ./db/data --logpath ./db/log
	
1. Populate MongoDB collections

	- Populate local DB with:

			node ./populateDb mongodb://localhost:27017/unlimitedSpaceDb

	- Populate cloud DB with:

			node ./populateDb mongodb+srv://dbuser:PASSWORD@cluster0-d1fpj.mongodb.net/test?retryWrites=true
		
1. Build Angular frontend

		 ng build
		
1. Start backend api

    npm start

1. Start the front end

	ng serve

1. Connect to frontend: [http://localhost:4200/](http://localhost:4200/)
    
Testing User account
  1.  test3@account.com 
      
      password: testtest
      
  2.  test4@account.com 
      
      password: testtest
         


- main site: [https://unlimitedspace.azurewebsites.net/](https://unlimitedspace.azurewebsites.net/)
- api get all rooms: [https://unlimitedspace.azurewebsites.net/api/rooms](https://unlimitedspace.azurewebsites.net/api/rooms)
- api get room by id: [https://unlimitedspace.azurewebsites.net/api/rooms/{roomid}](https://unlimitedspace.azurewebsites.net/api/rooms/{roomid})
