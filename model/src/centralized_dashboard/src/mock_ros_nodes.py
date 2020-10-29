#! /usr/bin/env python

import rospy
import random
from threading import Thread

from centralized_dashboard.msg import NavigationMsg
from centralized_dashboard.msg import Drive

class NavData:

    def __init__(self, topic_name='/nav_data', frequency=100):
        self.publisher = rospy.Publisher(topic_name, NavigationMsg, queue_size=1)
        self.subscriber = rospy.Subscriber('/set_nav_data', NavigationMsg, self.set_target)
        self.rate = rospy.Rate(frequency)
        self.tar_lat = 0
        self.tar_long = 0
        self.cur_lat = 43.075457
        self.cur_long = -89.404166

    def set_target(self, data):
        self.tar_lat = data.tar_lat
        self.tar_long = data.tar_long

    def get_target_coordinates(self):
        return {'lat': self.tar_lat, 'long': self.tar_long}

    def get_current_coordinates(self):
        # Sample is Bascom Hall
        return {'lat': self.cur_lat, 'long': self.cur_long}

    def get_heading(self):
        '''
        TODO: get this in a more dynamic way that yet makes sense
        '''
        return random.randrange(0, 360)


    def talker(self):
        ''''
        Publishes fake navigation data using a NavigationMsg
        TODO: implement
        '''
        msg = NavigationMsg()
        while not rospy.is_shutdown():
            ## Build nav_data msg to send
            #Target coords
            target_coords_dict = self.get_target_coordinates()
            msg.tar_lat = target_coords_dict['lat']
            msg.tar_long = target_coords_dict['long']
            #Current coords
            current_coordinates = self.get_current_coordinates()
            msg.cur_lat = current_coordinates['lat']
            msg.cur_long = current_coordinates['long']
            #Heading
            msg.heading = self.get_heading()

            # Publish pose at f rate
            self.publisher.publish(msg)
            self.rate.sleep()


class DriveData:

    def __init__(self, topic_name='/drive_data', frequency=100):
        self.publisher = rospy.Publisher(topic_name, Drive, queue_size=1)
        self.subscriber = rospy.Subscriber('/set_drive_data', Drive, self.set_speed)
        self.rate = rospy.Rate(frequency)
        self.wheel_speeds = [0, 0, 0, 0, 0, 0]

    def get_wheel_speeds(self):
        return self.wheel_speeds
    
    def set_speed(self, data):
        self.wheel_speeds = [data.wheel0, data.wheel1, data.wheel2, data.wheel3, data.wheel4, data.wheel5]


    def talker(self):
        msg = Drive()
        while not rospy.is_shutdown():
            wheel_speeds = self.get_wheel_speeds()
            msg.wheel0 = wheel_speeds[0]
            msg.wheel1 = wheel_speeds[1]
            msg.wheel2 = wheel_speeds[2]
            msg.wheel3 = wheel_speeds[3]
            msg.wheel4 = wheel_speeds[4]
            msg.wheel5 = wheel_speeds[5]
            # TODO: determine what are and if we need the other fields
            self.publisher.publish(msg)
            self.rate.sleep()


if __name__ == '__main__':
    try:
        rospy.init_node('mock_data', anonymous=False)
        navigation_data = NavData()
        thread_navigation_data = Thread(target=navigation_data.talker)
        thread_navigation_data.daemon=True
        thread_navigation_data.start()

        drive_data = DriveData()
        thread_drive_data = Thread(target=drive_data.talker)
        thread_drive_data.daemon=True
        thread_drive_data.start()
        rospy.spin()
    except rospy.ROSInterruptException:
        print('ROSPY EXCETION')
        