''' 
    TODO: 
        add more field into Hive
        try to use pickle to store user info into local file
'''


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

    def __init__(self, name, pswd, addr, contact):  # called when register info is valid
        # todo: add profile pic.
        self.name = name
        self.__pswd = pswd          # private it
        self.addr = addr
        self.contact = contact
        self.hives = []             # initalize the hive list that a user possess
        self.hiveIdAdder = 0        # just an accumulator to index the new hive
        User.userList.append(name)  # add new user name to userlist
        
    def checkPswd(self, pswd):      # called when validate login
        if pswd == self.__pswd:
            return True
        else: 
            return False
    
    def addHive(self):              # called when add a new hive
        self.hiveIdAdder += 1 
        self.hives.append(Hive(self.hiveIdAdder)) 
    
    def rmHive(self, hiveID):       # called when rm the hive
        for i in self.hives:
            if i.hiveID == hiveID:
                self.hives.remove(i)
                break

    def getHive(self):              # called when log in, showing the hive panel
        return self.hives           # return a list containing all hives
    
    def __repr__(self):
        return str({"username": self.name, "password": self.pswd,
                    "address": self.addr, "contact": self.contact})
