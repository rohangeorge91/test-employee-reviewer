#!/bin/bash

command=$1

path1=$(pwd)'/primary';

if [ "$command" = "hakai" ]
then
    output=$(docker rm -f test-mysql-primary);
    output=$(rm -r $path1);
else
    available=$(docker images mysql:5.7.27 | grep 'mysql' | awk '{printf "%s-%s" , $1 , $2}');

    # pull the docker image - if not available
    if [ "$available" != "mysql-5.7.27" ]
    then
        echo " --- pulling images --- "
        docker pull mysql:5.7.27
    fi

    primary=$(docker ps -a | grep 'test-mysql-primary' | awk '{print $1}');

    # start primary mysql server.
    if [ -z "$primary" ]
    then
        echo " --- start new primary mysql --- "
        output=$(docker run --name test-mysql-primary -e MYSQL_ROOT_PASSWORD=root -e MYSQL_USER=root -e MYSQL_PASSWORD=root -e MYSQL_DATABASE=test_database -p 3309:3306 -v $path1:/var/lib/mysql -d mysql:5.7.27 --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci );
    else
        primary_start=$(docker ps -a | grep 'test-mysql-primary' | grep 'Exited')
        if [ -z "$primary_start" ]
        then
            echo " --- using old primary mysql --- "
        else
            echo " --- start old primary mysql --- "
            output=$(docker start $primary)
        fi
    fi
fi
