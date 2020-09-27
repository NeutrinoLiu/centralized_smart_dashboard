from flask import render_template, json, abort

def login():
    return render_template('login.html')

#TODO: might be useful to add server-side error handlers
def error_handler( error ):
    return render_template('invalid-page.html')


def init_website_routes(app):
    if app:
        app.add_url_rule('/login', 'login', login, methods=['GET'])
        app.register_error_handler(404, error_handler)
