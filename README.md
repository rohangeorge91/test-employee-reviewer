# test-employee-reviewer
A poc to show a full-stack app inital was planning to make it a docker-compose (but lack of time). So steps below to run on your local
**NOTE**:
1.  mysql-docker.sh - execute this will start of a docker instance of MySQL. You need to run this script twice (first time it start of an instance making a volumn mount on your local for the database and often will stop the server). You can check the docker instance using `docker ps -a` if the sql instance is up or died. If it did kill itself, then you can run the file again or do a `docker start <container-id>`
2.  run the sql scripts inside the database folder to create the table and insert the data.
3. Next make the prepare the backend server, you are expected to have maven on your local. You need to navigate to backend folder and then run the shell called `prepareServer.sh` (which basically does a mvn clean install) then excute the `startServer.sh`
4. Next start the client, again you need to NodeJS with npm on your local system. You can then navigate the folder frontend/adminclient and then run npm start to start of the webclient on 3000.

For now I didn't get enough time to get all the part of the functionality of the website ready. You can login by using `johndoe` and test
1> add, remove, edit of member
2> add, remove, edit of assignment.
