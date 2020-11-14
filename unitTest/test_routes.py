from flask import Flask, json
import pytest
import sys
sys.path.append('..')
from routes import init_website_routes, my_rover, get_format_route

sys.path.append('../model/src/centralized_dashboard/src')
from rover import GPSPoint
#from model.src.centralized_dashboard.src.rover import GPSPoint

@pytest.fixture
def flask_app():
    app = Flask(__name__)
    app.config['TESTING'] = True
    init_website_routes(app)
    with app.app_context():
        yield app
    #client = app.test_client()


@pytest.fixture
def client(flask_app):
    return flask_app.test_client()



def test_gps1(client):
    url = "/api/gps"
    response = client.get(url)
    assert response.get_data() == (json.dumps({"success": True, "lat": 0, "long": 0})+"\n").encode("UTF-8")


def test_get_route_without_setting(client):
    url = "/api/route"
    response = client.get(url)
    assert response.get_data() == (json.dumps({"success": False})+"\n").encode("UTF-8")

def test_set_and_get_route(client):
    # check if setting works
    url = "/api/route"
    mock_request_data = {"waypoints": [{"lat": 0, "long": 0}, {"lat": -58.72, "long": 23.65}]}
    response = client.post(url, data=json.dumps(mock_request_data))
    # verify response is correct
    assert response.get_data() == (json.dumps({"success": True, "waypoints": [{"lat": 0, "long": 0},
                                                                               {"lat": -58.72, "long": 23.65}]})+"\n").encode("UTF-8")
    mock_correct_route = [GPSPoint(0, 0), GPSPoint(-58.72, 23.65)]
    # verify the route got changed correctly on the backend
    assert my_rover.route_state == mock_correct_route
    # verify get route now gets the correct route
    response = client.get(url)
    assert response.get_data() == (json.dumps({"success": True, "waypoints": [{"lat": 0, "long": 0},
                                                                               {"lat": -58.72, "long": 23.65}]})+"\n").encode("UTF-8")
    # checking if setting works if there is already a route
    mock_request_data = {"waypoints": [{"lat": 0, "long": 0}, {"lat": -58.72, "long": 23.65}, {"lat": -58, "long": 23},
                                       {"lat": -33.72, "long": 56.65}]}
    response = client.post(url, data=json.dumps(mock_request_data))
    # verify response is correct
    assert response.get_data == (json.dumps({"success": True, "waypoints": [{"lat": 0, "long": 0},
                                                                              {"lat": -58.72, "long": 23.65},
                                                                              {"lat": -58, "long": 23},
                                                                              {"lat": -33.72, "long": 56.65}]})+"\n").encode("UTF-8")
    mock_correct_route2 = [GPSPoint(0, 0), GPSPoint(-58.72, 23.65), GPSPoint(-58, 23), GPSPoint(-33.72, 56.65)]
    # verify the route got changed correctly on the backend
    assert my_rover.route_state == mock_correct_route2
    response = client.get(url)
    # verify get route still gets the correct one
    assert response.get_data == (json.dumps({"success": True, "waypoints": [{"lat": 0, "long": 0},
                                                                             {"lat": -58.72, "long": 23.65},
                                                                             {"lat": -58, "long": 23},
                                                                             {"lat": -33.72, "long": 56.65}]})+"\n").encode("UTF-8")
    # checking that clearing the set route works properly
    mock_request_data = {"waypoints": []}
    response = client.post(url, data=json.dumps(mock_request_data))
    # verify response is correct
    assert response.get_data() == (json.dumps({"success": True, "waypoints": []})+"\n").encode("UTF-8")
    # verify route got removed on backend
    assert my_rover.route_state == []


# emergency stop still in progress
def test_emergency_stop(client):
    url = "/api/emergency-stop"
    response = client.get(url)
    assert response.get_data() == (json.dumps({"success": True})+"\n").encode("UTF-8")

def test_go_button_if_empty(client):
    url = "/api/go-button"
    response = client.get(url)
    # verify that the go button doesn't work if there is nothing to go to
    assert response.get_data() == (json.dumps({"success": False})+"\n").encode("UTF-8")

# TODO make a verification that the rover is actually moving towards the new target
def test_go_button(client):
    url = "/api/set-route"
    mock_request_data = {"waypoints": [{"lat": 23, "long": -52}, {"lat": -58.72, "long": 23.65}]}
    response = client.post(url, data=json.dumps(mock_request_data))
    url = "/api/go-button"
    response = client.get(url)
    assert response.get_data() == (json.dumps({"success": True})+"\n").encode("UTF-8")

# check if empty notifications are empty
def test_send_empty_notifications(client):
    url = "/api/notifications"
    response = client.get(url)
    assert response.get_data() == (json.dumps({"success": True, "notifications": ""})+"\n").encode("UTF-8")

#check if adding notifications works
def test_add_notifications(client):
    url = "/api/notifications"
    mock_request_data = {"notifications": "\nnotification1\nnotification2"}
    response = client.post(url, data=json.dumps(mock_request_data))
    assert response.get_data() == (json.dumps({"success": True, "\nnotifications": "notification1\nnotification2"})+"\n").encode("UTF-8")
    mock_request_data = {"notifications": "\nnotification3\nnotification4"}
    response = client.post(url, data=json.dumps(mock_request_data))
    assert response.get_data() == (json.dumps({"success": True, "notifications":
        "\nnotification1\nnotification2\nnotification3\nnotification4"})+"\n").encode("UTF-8")
    response = client.get(url)
    assert response.get_data() == (json.dumps({"success": True, "notifications":
        "\nnotification1\nnotification2\nnotification3\nnotification4"})+"\n").encode("UTF-8")

# check to make sure get format route works
def test_get_format_route(client):
    route = [GPSPoint(23, -52), GPSPoint(-58.72, 23.65), GPSPoint(0, -34.231564), GPSPoint(-10.123412, 24.6555)]
    correct_formatted_route = {"waypoints": [{"lat": 23, "long": -52}, {"lat": -58.72, "long": 23.65},
                                             {"lat": 0, "long": -34.231564}, {"lat": -10.123412, "long": 24.6555}]}
    my_rover.route_state = route
    assert get_format_route() == correct_formatted_route
