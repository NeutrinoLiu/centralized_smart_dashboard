''' 
standarize the communication between frontend and the local node 
'''
#from ui_nodes import *

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

    def __repr__(self):
        return '(' + str(self.lati) + ',' + str(self.longt) + ')'

class Rover:
    def __init__(self, name, frequency=100):    # frequency is the commmand topic sending freq
        # NOTICE:   those fields are though read_only for outside program but not protected.
        #           make sure you did not overwrite them mistakenly
        self.gps_longt = 0.0
        self.gps_lati = 0.0
        self.buffer_longt = 0.0
        self.buffer_lati = 0.0
        self.ori = 0.0
        self.speed = []
        self.arm = []
        self.remark = '<empty>'
        self.name = name
        self.warn_flag = False # indicate whenever there is a warning.
        self.route_state = []   # rover only accept cur/target and cannot accept a full path
                                # hence the path is stored locally
                                # route_state[0] stores the start point and it gets updated everytime a passing point is achieved
                                # 0-----*-O-------O--------O-------O------------O
                                # r[0]    r[1]    r[2]                            for example: it get updated when rover arrive r[1]
                                #         0--*----O--------O-------O------------O
                                #         r[0]    r[1]     r[2]

        #ros init
        rospy.init_node(name, anonymous=False)
        #sub
        rospy.Subscriber('/nav_data', NavigationMsg, self.nav_callback)
        rospy.Subscriber('/drive_data', Drive, self.drive_callback)
        #pub
        self.navi_pub = rospy.Publisher('/set_nav_data', NavigationMsg, queue_size=1)   # it is the topic that we send command to rover 
        self.driv_pub = rospy.Publisher('/set_drive_data', Drive, queue_size=1)              # so it should have a differnt name
        self.timer = rospy.Rate(frequency)
    
    @staticmethod
    def almost_equal(a, b, error):    # error should be carfully chosed
        return abs(a-b) <= error

    @staticmethod
    def dist_point2line(x3, y3, x1, y1, x2, y2): # distance from point p3 to the line(p1, p2)
        return abs((y1-y2)*x3 + (x2-x1)*y3 + x1*y2 - x2*y1) / sqrt((y1-y2)*(y1-y2) + (x1-x2)*(x1-x2))

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
        self.ori = nav_data.heading
        self.gps_longt = nav_data.cur_long
        self.gps_lati = nav_data.cur_lat
        if self.route_state == []:
            self.route_state = [GPSPoint(self.gps_lati, self.gps_longt)]
        self.buffer_longt = nav_data.tar_long
        self.buffer_lati = nav_data.tar_lat
        self.check_route() 
        # check if the target info from rover is consistant with our local path record
        # and update the route whenever there is an arriving
        #self.__debug_print('nav data updated!\n')
    
    def drive_callback(self, drive_data):
        self.speed = [      drive_data.wheel0,
                            drive_data.wheel1,
                            drive_data.wheel2,
                            drive_data.wheel3,
                            drive_data.wheel4,
                            drive_data.wheel5]
        self.__debug_print('drive data updated!\n')

    def check_route(self):   # target point, check if the rover is heading the correct direction
        
        error = 0.01    # gps error seting
        
        st_long = self.route_state[0].longt
        st_lat = self.route_state[0].lati # start point
        cur_long = self.gps_longt
        cur_lat = self.gps_lati  # current point
        tar_long = self.buffer_longt
        tar_lat = self.buffer_lati  # target point received from rover

        if (len(self.route_state) <= 1):
            self.__debug_print("no route available currently")
            return

        if (tar_long != self.route_state[1].longt) or (tar_lat != self.route_state[1].lati):
            self.__debug_warn("target conflict, reset the rover route")
            self.send_cmd(Cmd(new_route=self.route_state[1:len(self.route_state)]))
            return

        if      (Rover.dist_point2line(cur_long, cur_lat, st_long, st_lat, tar_long, tar_lat) <= error)                   \
            and (cur_long >= min(tar_long, st_long) - error)    and (cur_long <= max(tar_long, st_long) + error)    \
            and (cur_lat >= min(tar_lat, st_lat) - error)       and (cur_lat <= max(tar_lat, st_lat)+ error):
            # if the currend pos is on the segment between start point and target point

            if Rover.almost_equal(cur_long, tar_long, error) and Rover.almost_equal(cur_lat, tar_lat, error):   # we arrive the target point
                self.__debug_print("arrive one station, heading to the next!")
                self.route_state.pop(0)
                self.pub.set_target_coordinates({'lat': self.route_state[1].lati, 'long': self.route_state[1].longt})   # let the next node on the route list become the target
                return
            else:
                self.__debug_print("still on the way from start point to target point")
                return

        else:
            self.__debug_warn("off the route, reset the start point")
            self.route_state[0].longt = cur_long
            self.route_state[0].lati = cur_lat
            return

    def send_cmd(self, command): # the API that get command object from front end and send it to rover
        if command.cmd_code & 0b0001:    # if it is a route update command
            self.route_state = [self.route_state[0]] + command.new_route                # locally update: new_route[0] is the current gps, new_route[1] is the heading station
            nav_data = NavigationMsg()
            nav_data.tar_lat = command.new_route[0].lati
            nav_data.tar_long = command.new_route[0].longt
            self.navi_pub.publish(nav_data)                     # remote update

        if command.cmd_code & 0b0010:    # an arm gesture update command
            # pub.set_arm_gesture(command.new_arm) 
            # local-rover interface not implemented
            pass 

        if command.cmd_code & 0b0100:    # a speed update command
            drive_data = Drive()
            drive_data.wheel0 = command.new_speed[0]
            drive_data.wheel1 = command.new_speed[1]
            drive_data.wheel2 = command.new_speed[2]
            drive_data.wheel3 = command.new_speed[3]
            drive_data.wheel4 = command.new_speed[4]
            drive_data.wheel5 = command.new_speed[5]
            self.driv_pub.publish(drive_data)
        
        self.__debug_print("one command sent")

    def get_notification(self):
        remark = self.remark
        self.clear_noti_buffer()    #clear notification buffer after everytime we read it.
        return remark

    def clear_noti_buffer(self):
        self.remark = '<empty>'

    def __repr__(self):
        return "this is Rover " + self.name + " !"
