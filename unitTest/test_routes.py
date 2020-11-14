from flask import Flask, json
import pytest
import coverage
import app
from routes import init_website_routes, my_rover
from model.src.centralized_dashboard.src.rover import GPSPoint

@pytest.fixture
def client():
    app = Flask(__name__)
    init_website_routes(app)
    client = app.test_client()




def test_gps1():
    url = '/api/gps'
    response = client.get(url)
    assert response.get_data() == json.jsonify({"success": True, "lat": 0, "long": 0})


def test_get_route_without_setting():
    url = '/api/get_route'
    response = client.get(url)
    assert response.get_data() == json.jsonify({"success": False})

def test_set_route():
    url = '/api/set_route'
    mock_request_data = {"waypoints": [{"lat": 0, "long": 0}, {"lat": -58.72, "long": 23.65}]}
    response = client.post(url, data=json.dumps(mock_request_data))
    assert response.get_data() == json.jsonify({"success": True, "waypoints": [{"lat": 0, "long": 0},
                                                                               {"lat": -58.72, "long": 23.65}]})
    assert len(my_rover.route_state) == 2

    mock_correct_route = [GPSPoint(0, 0), GPSPoint(-58.72, 23.65)]

    assert my_rover.route_state == mock_correct_route


