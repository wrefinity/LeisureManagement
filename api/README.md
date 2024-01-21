# leisure backend

## requirement
1. node js installed
2. mongodb installed
3. install nodemon globally using the command below via the vscode terminal
```
node install -g nodemon
```


## create enviromental variable
1. create an enviromental variable file and name it .env instead the api folder
2. assign values and paste the variables inside the file and save it, then close the file
```
JWT=
SERVER_PORT=5050
MONGO = mongodb://localhost:27017/leisure
ADMIN_USERNAME=
ADMIN_EMAIL=
ADMIN_PASS=
IS_ADMIN=true
```

## running the app
use vscode terminal
```
# install the libs
cd app && npm install
# run the app
npm start
```
## note
the terminal should show 
```
Connected to backend.
Connected to mongoDB.
```