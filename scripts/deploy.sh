#!/bin/bash

SERVERS="s1 s2"
SERVICENAME=kaymccormick-com
SERVICEDIR=/heptet/server/kaymccormick-com
BACKUPBASE=/heptet/backup
LATESTBUILDURL=https://jenkins.heptet.us/job/github/job/kaymccormick-com/job/master/lastSuccessfulBuild/artifact/build/kaymccormick-com.tar.gz

systemctl stop $SERVICENAME
if [ $? -gt 0 ]; then
    exit
fi
DEPLOYFILE=$1
mv $SERVICEDIR $BACKUPBASE/kaymccomick-com
printf -v DATEFILE "%(%F %T)T"
echo $DATEFILE

#if [ "$DEPLOYFILE" == "" ; then
#       wget $LATESTBUILDURL -O - $LATESTBUILDURL 
#       DEPLOYFILE=
       
