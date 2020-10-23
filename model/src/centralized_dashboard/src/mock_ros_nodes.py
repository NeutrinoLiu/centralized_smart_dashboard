#! /usr/bin/env python
'''
Target topic list:
/drive_cmd has motor info
/nav_data has all navigation info

TODO: Import NavigationMsg from WRobotics repo

'''
import rospy
import random
from centralized_dashboard.msg import NavigationMsg

class NavData:

    def __init__(self, node_name='dead_reckoning', topic_name='/nav_data', frequency=100):
        rospy.init_node(node_name, anonymous=False)
        self.navigation_pub = rospy.Publisher(topic_name, NavigationMsg, queue_size=1)
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
            self.navigation_pub.publish(msg)
            self.rate.sleep()


class DriveData:
    
    def __init__(self):
        pass


if __name__ == '__main__':
    try:
        navigation_data = NavData()
        navigation_data.talker()
        #todo: consider making different threads for each topic publisher
    except rospy.ROSInterruptException:
        print('ROSPY EXCETION')
        