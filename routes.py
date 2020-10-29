from flask import render_template, json, abort, request
from rover import rover, GPSPoint

GPS_ERROR_VALUE = None
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
    return render_template('ComingSoon.html')

# API routes

# return rover heading and speed
def api_speed():
    orientation = rover.ori
    speed = rover.speed
    return json.jsonify({"success": True, "data": {"orientation": orientation,
                                                   "speed1": speed[0], "speed2": speed[1],
                                                   "speed3": speed[2], "speed4": speed[3],
                                                   "speed5": speed[4], "speed6": speed[5]}})

# returns full list of all waypoint on route
def api_route():
    route = rover.route_state
    route_to_send = []
    for point in route:
        route_to_send.append({"lat": point.lati, "long": point.longt})
    if len(route_to_send) > 0:
        return json.jsonify({"success": True, "data": route_to_send})
    else:
        return json.jsonify({"success": False})

# route for adding a waypoint
def api_waypoint():
    waypoint = json.loads(request.data.decode())
    lat = float(waypoint.get("lat"))
    long = float(waypoint.get("long"))
    rover.route_state.append(GPSPoint(lat, long))
    return "not sure what you want"


# route for getting the latitude and longitude of the rover
def api_gps():
    lat = rover.gps_lati
    long = rover.gps_longt
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
        app.add_url_rule('/api/waypoint', 'api_waypoint', api_waypoint, methods=['POST'])

        app.register_error_handler(404, error_handler)
