import os, time
from flask import Flask
from routes import init_website_routes


app = Flask(__name__)

def register_extensions():
    from extensions import login
    login.init_app(app)



#TODO: remove after routing file exists
#@app.route('/')
#def hello_world_page():
#return 'CS506, hello world page!'

if __name__ == "__main__":
    # TODO: add route initializations here, both for templates and backend
    register_extensions()
    init_website_routes(app)
    app.run(debug=True, host='0.0.0.0')
