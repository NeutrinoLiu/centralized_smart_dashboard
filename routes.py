from flask import render_template, json, abort

def login():
    return render_template('login.html')

def register():
    return render_template('register.html')

def register_success():
    return render_template('register_succ.html')


#TODO: might be useful to add server-side error handlers
def error_handler( error ):
    return render_template('invalid-page.html')


def init_website_routes(app):
    if app:
        app.add_url_rule('/login', 'login', login, methods=['GET'])
        app.add_url_rule('/register', 'register', register, methods=['GET'])
        app.add_url_rule('/register-success', 'register_success', register_success, methods=['GET'])
        app.add_url_rule('/', 'login', login, methods=['GET'])
        app.register_error_handler(404, error_handler)
