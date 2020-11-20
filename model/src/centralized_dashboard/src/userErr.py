class Err(Exception):
    '''
    base class
    '''
    pass

class InvalidSpeed(Err):
    def __init__(self, msg):
        self.msg = "[InvalidSpeed] " + msg

class InvalidTarget(Err):
    def __init__(self, msg):
        self.msg = "[InvalidTarget] " + msg