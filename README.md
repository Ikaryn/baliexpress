# Baliexpress E-Commerce Website

### For setting up the system to work properly, all three components need to be set up and running simultaneously. 

These components are:
  - Database: For retrieving, adding, and manipulating data involved with the site
  - Backend: For both communication and processing data between the frontend and database.
  - Frontend: For providing a user interface for the website, allowing for navigation and interaction with the provided features.


Database setup
==============
 ### Install Postgresql
The relational database management system we used for our project is Postgresql. If Postgresql is not already installed on your computer, you must first install version          13.2 from EDB’s download page: https://www.enterprisedb.com/downloads/postgres-postgresql-downloads

### Create the “baliexpress” database 
Once Postgresql is installed, you should open pgAdmin4. If this is your first time opening it, you may be prompted to set up your admin password. Open the “Servers”              dropdown on the left of the screen, and right click on “Databases”. Select “Create > Database…”. When the options appear, enter “baliexpress” for the database name, and          select “postgres” as the owner. Click save. “Baliexpress” should now be visible on the left of the screen, underneath the “Databases” dropdown. Right click on                    “baliexpress”, and select “restore…”. For the format, select “directory”. The filename should be the path to capstone-project-3900-w11a-                                          baliexpress/database/baliexpress. Click restore, and the database has now been set up on your computer. 

### Add your credentials to credentials.py
Open capstone-project-3900-w11a-baliexpress/backend/api/credentials.py. On line 2, where it says password = “(some string)”, replace whatever is inside the brackets with         the admin password you set up for your database. Save the file.


Backend setup
=============
### Install the latest version of python for your OS. 
This can be done through the link provided: https://www.python.org/downloads/.
Once the codebase is pulled from GitHub, navigate to the root directory that contains the file requirements.txt

### Recommended: Create a new virtual environment
This is so that packages needed for the website are contained and isolated from the rest of your workspace
  - Run the command: “pip install virtualenv” if you do not have the package installed.
  - Run the following command “virtualenv baliexpress”. This will create a new virtual environment named “baliexpress”. You can change the name to anything that you would            like but remember this name - this name will be used for the following steps.
  - To activate the virtual environment, run the following command based on the operation system that you are using:
  - Windows: “baliexpress\Scripts\activate”
  - Mac: “source baliexpress/bin/activate”
  - Now that you have your virtual environment activated, the following steps can be performed within your virtual environment. To deactivate the virtual environment, run            the command “deactivate”

### Install the necessary packages using the command “pip install -r requirements.txt”
Once all the packages are installed, navigate to the backend folder using “cd backend” from the current directory.

### If you have not set up the database yet using the instructions above, please do so now 
The program will not function if the database has not yet been set up and running.
Enter the command “python run.py” and the backend for the website will now be running on your local port 5000.


Frontend setup
==============
  - Once the codebase is pulled from GitHub, do the following
  - Navigate to this link https://nodejs.org/en/  and download npm for your OS.
  - From the root Git Folder run the following command “npm install --global yarn”
    navigate to the frontend folder (cd frontend). Once in the frontend folder, run the following commands: 
      - yarn add react-router-dom
      - yarn add @material-ui/core
      - yarn add @material-ui/icons
      - yarn add @material-ui/lab
      - yarn add material-ui-dropzone
      - npm i @date-io/date-fns
      - npm install react-chatbot-kit
      - npm install react-material-ui-carousel --save
  - To run the frontend, in the frontend folder in your terminal, enter “yarn start”. This will open up a browser with the page, and its url as ‘localhost:3000’
