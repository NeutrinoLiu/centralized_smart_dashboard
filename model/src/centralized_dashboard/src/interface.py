''' 
standarize the communication between frontend and the local node 
'''
from ui_nodes import *
from rover import *

class Interface:

    def __init__(self):
        self.rover = Rover()
        self.sub = Subscriber(self.nav_callback, self.drive_callback)
        self.pub = Publisher()
        self.rover.route_state = []    # rover only accept cur/target and cannot accept a full path
                                # hence the path is stored locally
                                # route_state[0] stores the start point and it gets updated everytime a passing point is achieved
                                # 0-----*-O-------O--------O-------O------------O
                                # r[0]    r[1]    r[2]                            for example: it get updated when rover arrive r[1]
                                #         0--*----O--------O-------O------------O
                                #         r[0]    r[1]     r[2]
    
    @staticmethod
    def almost_equal(a, b, error = 0.1):    # error should be carfully chosed
        return abs(a-b) <= error

    def nav_callback(self, nav_data):
        self.rover.ori = nav_data.heading
        self.rover.gps_longt = nav_data.cur_lang
        self.rover.gps_latit = nav_data.cur_lat
        self.check_route(nav_data.tar_long, nav_data.tar_lat) 
        # check if the target info from rover is consistant with our local path record
        # and update the route whenever there is an arriving
        print('nav data updated!\n')
    
    def drive_callback(self, drive_data):
        self.rover.speed = [drive_data.wheel0,
                            drive_data.wheel1,
                            drive_data.wheel2,
                            drive_data.wheel3,
                            drive_data.wheel4,
                            drive_data.wheel5]
        print('drive data updated!\n')

    def check_route(self, tar_long, tar_lat):   # target point, check if the rover is heading the correct direction
        error = 0.02    # gps error 
        st_long = self.rover.route_state[0].longt
        st_lat = self.rover.route_state[0].lati # start point
        cur_long = self.rover.gps_longt
        cur_lat = self.rover.gps_latit  # current point

        if (len(self.rover.route_state) <= 1):
            print("no route available currently")
            return

        if (tar_long != self.rover.route_state[1].longt) or (tar_lat != self.rover.route_state[1].lati):
            print("warning: target conflict, reset the rover route")
            self.rover.route_state = [PosState(cur_lat, cur_long), PosState(tar_lat, tar_long)]
            return

        if almost_equal(    (cur_long - st_long) * (tar_lat - st_lat),
                            (tar_long - st_long) * (cur_lat - st_lat)   )                                           \
            and (cur_long >= min(tar_long, st_long) - error) and (cur_long <= max(tar_long, st_long) + error)       \
            and (cur_lat >= min(tar_lat, st_lat) - error) and (cur_lat <= max(tar_lat, st_lat))+ error)             \
            : # if the currend pos is on the line between start point and target point

            if almost_equal(cur_long, tar_long, error) and almost_equal(cur_lat, tar_lat, error):
                print("arrive one station, heading to the next!")
                self.rover.route_state.pop(0)
                self.pub.set_target_coordinates(['lat': self.rover.route_state[1].lati, 'long': self.rover.route_state[1].longt])
                return
            else:
                print("still on the way from start point to target point")
                return

        else:
            print("warning: off the route, need manual intervene")
            return

    def get_current_state(self): # the API that return the state of rover, in the format of Rover classs
        return self.rover

    def send_cmd(self, command): # the API that get command object from front end and send it to rover
        if command & 0b0001:    # if it is a route update command
            self.local_route = command.new_route
            tar_cord = ['lat': command.new_route[1].lati, 'long': command.new_route[1].longt] 
            # new_route[0] is the current gps, new_route[1] is the heading station
            self.pub.set_target_coordinates(tar_cord)
        if command & 0b0010:    # an arm gesture update command
            # pub.set_arm_gesture(command.new_arm) 
            # local-rover interface not implemented
            pass
        if command & 0b0100:    # a speed update command
            self.pub.set_motor_power(list(range(5)), command.new_speed)
        print(command)
            

