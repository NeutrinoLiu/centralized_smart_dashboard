import os, time
from flask import Flask
from flask_cors import CORS

application = Flask(__name__)
application.config['CORS_HEADERS'] = 'Content-Type'
CORS(application)

#TODO: remove after routing file exists
@app.route('/')
def hello_world_page():
    return 'CS506, hello world page!'

if __name__ == "__main__":
    # TODO: add route initializations here, both for templates and backend
    application.run(debug=True, host='0.0.0.0')
