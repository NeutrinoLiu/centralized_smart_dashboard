from flask import render_template, json, abord


def login():
    return render_template('login.html')

def init_website_routes(app):
    if app:
        app.add_url_rule('/login', login, methods=['GET'])
