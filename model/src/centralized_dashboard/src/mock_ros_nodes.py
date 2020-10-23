#! /usr/bin/env python
'''
Target topic list:
/drive_cmd has motor info
/nav_data has all navigation info

TODO: Import NavigationMsg from WRobotics repo

'''
import rospy
from centralized_dashboard.msg import NavigationMsg
# from std_mgs import Time

class NavData:

    def __init__(self, node_name='dead_reckoning', topic_name='/nav_data', frequency=100):
        rospy.init_node(node_name, anonymous=False)
        self.navigation_pub = rospy.Publisher(topic_name, NavigationMsg, queue_size=1)
        self.rate = rospy.Rate(frequency)

    def talker(self):
        ''''
        Publishes fake navigation data using a NavigationMsg
        TODO: implement
        '''
        msg = NavigationMsg()
        self.navigation_pub.publsh(msg)
        self.rate.sleep()


class DriveData:

    def __init__(self):
        pass

        