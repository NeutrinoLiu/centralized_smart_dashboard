class User:
    def __init__(self, username, password, address, contact):
        self.username = username
        self.password = password
        self.address = address
        self.contact = contact

    def __repr__(self):
        return str({"username": self.username, "password": self.password,
                    "address": self.address, "contact": self.contact})
