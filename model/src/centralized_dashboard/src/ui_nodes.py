import rospy
from centralized_dashboard.msg import NavigationMsg
from centralized_dashboard.msg import Drive

class Subscriber:
    
    def __init__(self, nav_data_callback, drive_data_callback, name='ui_subscriber', inited_flag=False):
        if not inited_flag:
            rospy.init_node(name, anonymous=False)
        self.node_name = name
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

    def __init__(self, inited_flag=False, frequency=100, name='ui_publisher'):
        if not inited_flag:
            rospy.init_node(name, anonymous=False)
        self.node_name = name
        self.navigation_publisher = rospy.Publisher('/set_nav_data', NavigationMsg, queue_size=1)   # it is the topic that we send command to rover 
        self.drive_publisher = rospy.Publisher('/set_drive_data', Drive, queue_size=1)              # so it should have a differnt name
        self.rate = rospy.Rate(frequency)

    def set_target_coordinates(self, target_coordinates):
        nav_data = NavigationMsg()
        nav_data.tar_lat = target_coordinates['lat']
        nav_data.tar_long = target_coordinates['long']
        self.navigation_publisher.publish(nav_data)
        # Prevents an overwhelming of the system, although is likely that 
        # UI rate is much much lower than this suggested sleep
        self.rate.sleep()

    def set_motor_power(self, motor_nums=[], speeds=[]):
        if len(motor_nums) != len(speeds):
            ValueError('Expected {0} different speeds, but received only {1}'.format(len(motor_nums), len(speeds)))

        drive_data = Drive()
        for i in range(len(motor_nums)):
            if motor_nums[i] < 0 or motor_nums[i] > 5:
                ValueError('Motor number {0} does not exist in the rover'.format(num))

            if speeds[i] < 0 or speeds[i] > 100:
                ValueError('Invalid speed of {0} for motor{1}. \
                    Speed power should be between 0 and 100'.format(speed[i], motor_nums[i]))

            if motor_nums[i] == 0:
                drive_data.wheel0 = speeds[i]
            elif motor_nums[i] == 1:
                drive_data.wheel1 = speeds[i]
            elif motor_nums[i] == 2:
                drive_data.wheel2 = speeds[i]
            elif motor_nums[i] == 3:
                drive_data.wheel3 = speeds[i]
            elif motor_nums[i] == 4:
                drive_data.wheel4 = speeds[i]
            elif motor_nums[i] == 5:
                drive_data.wheel5 = speeds[i]

        self.drive_publisher.publish(drive_data)
        # Prevents an overwhelming of the system, although is likely that 
        # UI rate is much much lower than this suggested sleep
        self.rate.sleep()


    