#! /usr/bin/env python

import rospy
import random
from threading import Thread

from centralized_dashboard.msg import NavigationMsg
from centralized_dashboard.msg import Drive

class NavData:

    def __init__(self, topic_name='/nav_data', frequency=100):
        self.publisher = rospy.Publisher(topic_name, NavigationMsg, queue_size=1)
        self.rate = rospy.Rate(frequency)

    def get_target_coordinates(self):
        '''
        TODO: MAKE THIS CHANGE DYNAMICALLY 
        '''
        # Sample camp randall 
        sample_lats = [43.070096]
        sample_longs = [-89.412030] 
        coords = {'lat': sample_lats[0], 'long': sample_longs[0]}
        return coords

    def get_current_coordinates(self):
        '''
        TODO: make this change dynicamically
        '''
        # Sample is Bascom Hall
        sample_lats = [43.075457]
        sample_longs = [-89.404166] 
        coords = {'lat': sample_lats[0], 'long': sample_longs[0]}
        return coords

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
        self.rate = rospy.Rate(frequency)

    def get_wheel_speeds(self):
        ''' 
        TODO: make this more dynamic
        '''
        wheel_speeds = [random.randrange(0, 101), random.randrange(0, 101), random.randrange(0, 101), \
            random.randrange(0, 101), random.randrange(0, 101), random.randrange(0, 101)]

        return wheel_speeds


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
        