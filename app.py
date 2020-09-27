import os, time
from flask import Flask
from routes import init_website_routes

app = Flask(__name__)

init_website_routes( app )

#TODO: remove after routing file exists
#@app.route('/')
#def hello_world_page():
#return 'CS506, hello world page!'

if __name__ == "__main__":
    # TODO: add route initializations here, both for templates and backend
    app.run(debug=True, host='0.0.0.0')
