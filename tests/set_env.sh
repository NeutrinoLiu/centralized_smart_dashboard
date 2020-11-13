#!/bin/bash

#  env setup script for auto testing 
source /opt/ros/noetic/setup.bash
cd /root/model
catkin_make
sleep 2
source /root/model/devel/setup.bash
roscore &
sleep 2
python3 /root/model/src/centralized_dashboard/src/mock_ros_nodes.py &
echo "roscore and mock node is running in the background"
echo "checking with rosnode list"
cd /root/tests/

