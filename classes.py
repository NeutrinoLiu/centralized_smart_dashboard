''' 
    TODO: 
        add more field into Hive
        try to use pickle to store user info into local file
'''
from uuid import uuid4


class Hive(object):                 # hive object, may need to add more field in the future

    def __init__(self, hiveID, health, honeyStores, queenProduction, equipment, losses, gains):
        self.id = hiveID            # use hive id to index hive for a specific user
        self.health = health
        self.honeyStores = honeyStores
        self.queenProduction = queenProduction
        self.equipment = equipment
        self.losses = losses
        self.gains = gains

        
class User(object):

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
        return str({"username": self.username, "password": self.password,
                    "address": self.address, "contact": self.contact})
