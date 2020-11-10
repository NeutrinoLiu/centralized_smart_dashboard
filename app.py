from flask import Flask
from routes import init_website_routes

app = Flask(__name__)


if __name__ == "__main__":
    # TODO: add route initializations here, both for templates and backend
    init_website_routes(app)
    app.run(debug=True, use_reloader=False, host='0.0.0.0')
