import rospy
from centralized_dashboard.msg import NavigationMsg
from centralized_dashboard.msg import Drive

class Subscriber:
    
    def __init__(self, nav_data_callback, drive_data_callback):
        self.nav_data_callback = nav_data_callback
        self.drive_data_callback = drive_data_callback
        rospy.Subscriber('/nav_data', NavigationMsg, self.nav_data_subscriber)
        rospy.Subscriber('/drive_data', Drive, self.drive_data_subscriber)

    def nav_data_subscriber(self, data):
        # Todo: clean/prepare data here if needed
        self.nav_data_callback(data)

    def drive_data_subscriber(self, data):
        # Todo: clean/prepare data here if needed
        self.drive_data_callback(data)

class Publisher:

    def __init__(sef):
        pass

    def set_target_coordinates(self):
        pass

    def set_motor_power(sef, motor_nums=[], speeds=[]):
        pass

    
rospy.init_node('ui_nodes', anonymous=False)