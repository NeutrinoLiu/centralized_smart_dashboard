''' 
    TODO: 
        add more field into Hive
        try to use pickle to store user info into local file
'''
from uuid import uuid4


class Hive(object):                 # hive object, may need to add more field in the future

    def __init__(self, hiveID):
        self.id = hiveID            # use hive id to index hive for a specific user


        
class User(object):

    userList = []                   # class field records all the username

    @classmethod                    # check if the user name has been registered
    def checkName(cls, name):       # called when validate the register info
        if name in cls.userList:
            return True
        else:
            return False

    def __init__(self, username, password, address, contact):  # called when register info is valid
        # todo: add profile pic.
        self.username = username
        self.password = password
        self.address = address
        self.contact = contact
        self.hives = []             # initalize the hive list that a user possess
        self.hiveIdAdder = 0        # just an accumulator to index the new hive
        self.is_active = True
        self.is_anonymous = False
        self.is_authenticated = True
        User.userList.append(username)  # add new user name to userlist


    def addHive(self):              # called when add a new hive
        self.hiveIdAdder += 1 
        self.hives.append(Hive(self.hiveIdAdder)) 
    
    def rmHive(self, hiveID):       # called when rm the hive
        for i in self.hives:
            if i.hiveID == hiveID:
                self.hives.remove(i)
                break

    def get_id(self):
        return self.username

    def getHive(self):              # called when log in, showing the hive panel
        return self.hives           # return a list containing all hives
    
    def __repr__(self):
        return str({"username": self.name, "password": self.pswd,
                    "address": self.addr, "contact": self.contact})
