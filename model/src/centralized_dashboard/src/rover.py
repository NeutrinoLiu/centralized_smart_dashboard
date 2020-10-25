'''
class definition of communication protocle between frontend and ui_nodes
TODO: need to link between subscriber-roverType and publisher-cmdType
'''
class PosState:
    def __init__(self, lati, longt):
        self.lati = lati
        self.longt = longt

class Rover:    # the object sending from local subscriber to the frontend
    def __init__(self, name): # just init the fields
        self.route_state = []
        self.gps_longt = 0.0
        self.gps_latit = 0.0
        self.ori = 0.0
        self.speed = []
        self.arm = []
        self.remark = '<empty>'
        self.name = name
        
    def __repr__(self):
        return "this is Rover " + self.name + " !"

class Cmd:      # the object sending from frontend to the local publisher
    def __init__(self,  new_route=[], 
                        new_arm=[], 
                        new_speed=[],
                        remark='<unclaimed>')
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


