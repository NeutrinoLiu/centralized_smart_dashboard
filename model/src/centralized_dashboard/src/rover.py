''' 
standarize the communication between frontend and the local node 
[Iteration2] we have remove the auto update target point function
'''
#from ui_nodes import * we do not need ui_nodes any more

from math import sqrt

import rospy
from centralized_dashboard.msg import NavigationMsg
from centralized_dashboard.msg import Drive

class Cmd:      # the object sending from frontend to the local publisher
    def __init__(self,  new_route=[], 
                        new_arm=[], 
                        new_speed=[],
                        remark='<unclaimed>'):
        self.new_route = new_route  
        self.new_arm = new_arm
        self.new_speed = new_speed
        self.remark = remark
        self.cmd_code = 0           # the code indicates which type of command it is

        if new_route != []:
            self.cmd_code = self.cmd_code | 0b0001  # last bit: new route setting cmd
        if new_arm != []:
            self.cmd_code = self.cmd_code | 0b0010  # 2nd bit: new arm gesture setting
        if new_speed != []:
            self.cmd_code = self.cmd_code | 0b0100  # 3rd bit: 

    def __repr__(self):
        return "this cmd aims to " + remark

class GPSPoint:
    def __init__(self, lati, longt):
        self.lati = lati
        self.longt = longt

    def __eq__(self, other):
        if self.lati == other.lati and self.longt == other.longt:
            return True
        else:
            return False

    def __repr__(self):
        return '(' + str(self.lati) + ',' + str(self.longt) + ')'

class Rover:
    def __init__(self, name, frequency=100, auto_update=False):    # frequency is the commmand topic sending freq
        # NOTICE:   those fields are though read_only for outside program but not protected.
        #           make sure you did not overwrite them mistakenly
        self.__auto_update = auto_update
        # disable the route auto updating for iteration2
        self.gps_longt = 0.0
        self.gps_lati = 0.0
        # the current pos of the car
        self.buffer_longt = 0.0 
        self.buffer_lati = 0.0
        # the target pos of the car
        self.ori = 0.0
        self.speed = []
        self.arm = []
        self.remark = ''
        self.name = name
        # self.warn_flag = False # indicate whenever there is a warning.
        self.route_state = []   # rover only accept cur/target and cannot accept a full path
                                # hence the path is stored locally
                                # route_state[0] stores the start point and it gets updated everytime a passing point is achieved
                                # 0-----*-O-------O--------O-------O------------O
                                # r[0]    r[1]    r[2]                            for example: it get updated when rover arrive r[1]
                                #         0--*----O--------O-------O------------O
                                #         r[0]    r[1]     r[2]
        # self.connected = False

        #ros init
        rospy.init_node(name, anonymous=False)
        #sub
        rospy.Subscriber('/nav_data', NavigationMsg, self.nav_callback)
        rospy.Subscriber('/drive_data', Drive, self.drive_callback)
        #pub
        self.navi_pub = rospy.Publisher('/set_nav_data', NavigationMsg, queue_size=1)   # it is the topic that we send command to rover 
        self.driv_pub = rospy.Publisher('/set_drive_data', Drive, queue_size=1)              # so it should have a differnt name
        self.timer = rospy.Rate(frequency)
    def __debug_print(self, str):
        pass
        # print(str)  # currently we just output to consol
        # if self.remark == '<empty>' : 
        #   self.remark = str
        # else:
        #   self.remark = self.remark + '\n' + str

    def __debug_warn(self, str):
        print("warn: " + str)  # currently we just output to consol
        self.warn_flag = True
        # TODO: may need to implement warn buffer in the future

    def nav_callback(self, nav_data):
        self.connected = True
        self.ori = nav_data.heading
        self.gps_longt = nav_data.cur_long
        self.gps_lati = nav_data.cur_lat
        if self.route_state == []:
            self.route_state = [GPSPoint(self.gps_lati, self.gps_longt)]
        self.buffer_longt = nav_data.tar_long
        self.buffer_lati = nav_data.tar_lat

    def drive_callback(self, drive_data):
        self.connected = True
        self.speed = [      drive_data.wheel0,
                            drive_data.wheel1,
                            drive_data.wheel2,
                            drive_data.wheel3,
                            drive_data.wheel4,
                            drive_data.wheel5]
        self.__debug_print('drive data updated!\n')

    def send_cmd(self, command): # the API that get command object from front end and send it to rover
        if command.cmd_code & 0b0001:    # if it is a route update command
            self.set_new_route(command.new_route)                    # remote update

        if command.cmd_code & 0b0010:    # an arm gesture update command
            # pub.set_arm_gesture(command.new_arm) 
            # local-rover interface not implemented
            pass 

        if command.cmd_code & 0b0100:    # a speed update command
            self.set_new_speed(command.new_speed)
        
        self.__debug_print("one command sent") 
    
    def set_new_route(self, new_route): # new_route should be a list of GPSPoint
        #[self.route_state[0]] + commented out from line below
        self.route_state = new_route # the start point(current pos) is reserved
        self.set_new_target(new_route[0])

    def set_new_target(self, new_target):
        nav_data = NavigationMsg()
        nav_data.tar_lat = new_target.lati
        nav_data.tar_long = new_target.longt
        self.navi_pub.publish(nav_data) 
    
    def set_new_speed(self, new_speed):
        drive_data = Drive()
        drive_data.wheel0 = new_speed[0]
        drive_data.wheel1 = new_speed[1]
        drive_data.wheel2 = new_speed[2]
        drive_data.wheel3 = new_speed[3]
        drive_data.wheel4 = new_speed[4]
        drive_data.wheel5 = new_speed[5]
        self.driv_pub.publish(drive_data)

    def get_notification(self):
        remark = self.remark
        self.clear_noti_buffer()    #clear notification buffer after everytime we read it.
        return remark

    def clear_noti_buffer(self):
        self.remark = '<empty>'

    def clear_connect_flag(self):
        self.connected = False      #TODO: try to using threading timer to check the connection

    def __repr__(self):
        return "this is Rover " + self.name + " !"

