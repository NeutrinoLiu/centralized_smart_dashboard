from flask import render_template, json, abort, request
from model.src.centralized_dashboard.src.rover import Rover, GPSPoint


GPS_ERROR_VALUE = None

my_rover = Rover("rover1")

# Render templates
def home():
    return render_template('homepage.html')


def ai_navigation():
    return render_template('AINavigation.html')


def equipment_servicing():
    return render_template("EquipmentServicing.html")


def erdm():
    return render_template("ERDM.html")


def maintenance():
    return render_template("Maintenance.html")


def science():
    return render_template("Science.html")

def coming_soon():
    return render_template("ComingSoon.html")


def coming_soon():
    return render_template('ComingSoon.html')

# API routes

# return rover heading and speed
def api_speed():
    orientation = my_rover.ori
    speed = my_rover.speed
    return json.jsonify({"success": True, "data": {"orientation": orientation,
                                                   "speed1": speed[0], "speed2": speed[1],
                                                   "speed3": speed[2], "speed4": speed[3],
                                                   "speed5": speed[4], "speed6": speed[5]}})

# returns full list of all waypoint on route
def api_route():
    route = my_rover.route_state
    route_to_send = []
    for point in route:
        route_to_send.append({"lat": point.lati, "long": point.longt})
    if len(route_to_send) > 0:
        return json.jsonify({"success": True, "data": route_to_send})
    else:
        return json.jsonify({"success": False})

# route for adding a waypoint
def api_add_waypoint():
    waypoint = json.loads(request.data.decode())
    lat = float(waypoint.get("lat"))
    long = float(waypoint.get("long"))
    new_route = my_rover.route_state.append(GPSPoint(lat, long))
    my_rover.set_new_route(new_route[1:])
    return json.jsonify({"success": True})

# route for deleting a waypoint
def api_delete_waypoint():
    waypoint = json.loads(request.data.decode())
    lat = float(waypoint.get("lat"))
    long = float(waypoint.get("long"))
    success = False
    for i, point in enumerate(my_rover.route_state):
        if point.lati == lat and point.longt == long:
            my_rover.route_state.pop()
            success = True
            break
    return json.jsonify({"success": success})


def api_get_route():
    return json.jsonify({"waypoints": [{'lat': 9.958869, 'long': -83.985763},
                                       {'lat': 43.075441, 'long': -89.404075}],
                         "curr_coord": {'lat': 90.3456, 'long': -90.6543}, "notifications": ""})

# route for getting the latitude and longitude of the rover
def api_gps():
    lat = my_rover.gps_lati
    long = my_rover.gps_longt
    # get in format specified by server
    if lat != GPS_ERROR_VALUE and long != GPS_ERROR_VALUE:
        return json.jsonify({"success": True, "data": {"lat": lat, "long": long}})
    else:
        return json.jsonify({"success": False})


# TODO: might be useful to add server-side error handlers
def error_handler(error):
    return render_template('ComingSoon.html')

def init_website_routes(app):
    if app:
        app.add_url_rule('/', 'home', home, methods=['GET'])
        app.add_url_rule('/home', 'home', home, methods=['GET'])
        app.add_url_rule('/ai-navigation', 'ai_navigation', ai_navigation, methods=['GET'])
        app.add_url_rule('/equipment-servicing', 'equipment_servicing', equipment_servicing, methods=['GET'])
        app.add_url_rule('/erdm', 'erdm', erdm, methods=['GET'])
        app.add_url_rule('/maintenance', 'maintenance',  maintenance, methods=['GET'])
        app.add_url_rule('/science', 'science', science, methods=['GET'])
        app.add_url_rule('/coming-soon', 'coming-soon', coming_soon, methods=['GET'])

        app.add_url_rule('/api/speed', 'api_speed', api_speed, methods=['GET'])
        app.add_url_rule('/api/route', 'api_route', api_route, methods=['POST'])
        app.add_url_rule('/api/gps', 'api_gps', api_gps, methods=['GET'])
        app.add_url_rule('/api/waypoint', 'api_add_waypoint', api_add_waypoint, methods=['POST'])
        app.add_url_rule('/api/waypoint', 'api_get_route', api_get_route, methods=['GET'])


        app.register_error_handler(404, error_handler)
