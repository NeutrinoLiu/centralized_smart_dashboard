from flask import render_template, json, abort, request
from classes import User

users = []

def login():
    return render_template('login.html')

def register():
    if request.method == 'POST':
        userinfo = json.loads(request.data.decode())
        new_user = User(userinfo.get("username"), userinfo.get("password"), userinfo.get("address"),
                        userinfo.get("contact"))
        # checks to see if there are any users with that username already in the system otherwise it adds it
        if not any(x.username == new_user.username for x in users):
            users.append(new_user)
    return render_template('register.html')

def register_success():
    return render_template('register_succ.html')

def profile():
    return render_template('profile.html')

#TODO: might be useful to add server-side error handlers
def error_handler( error ):
    return render_template('invalid-page.html')


def init_website_routes(app):
    if app:
        app.add_url_rule('/login', 'login', login, methods=['GET'])
        app.add_url_rule('/register', 'register', register, methods=['GET', 'POST'])
        app.add_url_rule('/register-success', 'register_success', register_success, methods=['GET'])
        app.add_url_rule('/profile', 'profile', profile, methods=['GET'])
        app.add_url_rule('/', 'login', login, methods=['GET'])
        app.register_error_handler(404, error_handler)
        
def init_api_routes(app):
    #todo: add all routes related to backend
    # for example, what happens after an image is uploaded
    # what happens after a request for an image is made
    # regardless if we use a DB or local this paths should trigger that code (potentially python)
    # loading the image or text required. From the computer if we are doing local DB
    pass
