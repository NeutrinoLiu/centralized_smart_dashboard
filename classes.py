''' 
    TODO: 
        add more field into Hive
        try to use pickle to store user info into local file
'''
import json

class Hive(object):                 # hive object, may need to add more field in the future

    def __init__(self, hiveID, health="", honeyStores="", queenProduction="", equipment_hive="",
                 equipment_inventory="", losses="", gains=""):
        self.hiveID = hiveID            # use hive id to index hive for a specific user
        self.health = health
        self.honeyStores = honeyStores
        self.queenProduction = queenProduction
        self.equipment_hive = equipment_hive
        self.equipment_inventory = equipment_inventory
        self.losses = losses
        self.gains = gains
    def toDict(self):
        hiveDict = {'hiveID': self. hiveID, 'health': self.health,'honeyStores': self.honeyStores,
                    'queenProduction': self.queenProduction, 'equipment_hive': self.equipment_hive,
                    'equipment_inventory': self.equipment_inventory,
                        'losses': self.losses, 'gains': self.gains}
        return hiveDict


        
class User(object):

    def __init__(self, username, password, address, contact):  # called when register info is valid
        # todo: add profile pic.
        self.username = username
        self.password = password
        self.address = address
        self.contact = contact
        self.hives = []             # initalize the hive list that a user possess
        self.is_active = True
        self.is_anonymous = False
        self.is_authenticated = True

    def addHive(self, hiveID, health, honeyStores, queenProduction, equipment_hive,
                equipment_inventory, losses, gains):  # called when add a new hive
        self.hives.append(Hive(hiveID, health, honeyStores, queenProduction, equipment_hive,
                               equipment_inventory, losses, gains))
    
    def rmHive(self, hiveID):       # called when rm the hive
        for i in self.hives:
            if i.hiveID == hiveID:
                self.hives.remove(i)
                break

    def get_id(self):
        return self.username

    def getHives(self):              # called when log in, showing the hive panel
        return self.hives           # return a list containing all hives

    def findHiveByID(self, hiveID):
        for h in self.hives:
            if h.hiveID == hiveID:
                return h
        return None

    def __repr__(self):
        return str({"username": self.username, "password": self.password,
                    "address": self.address, "contact": self.contact})
