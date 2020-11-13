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

def api_add_notifications():
    return json.jsonify({"success": True})

# send the notification to
def api_send_notifications():
    notifications = my_rover.get_notification()
    return json.jsonify({"success": True, "notifications": notifications})
# send rover to next waypoint
def api_go_button():
    my_rover.set_new_target(my_rover.route_state[1])
    return json.jsonify({"success": True})

# emergency stop not implemented yet
def api_emergency_stop():
    return json.jsonify({"success": True})

# returns full list of all waypoint on route
def api_get_route():
    route = my_rover.route_state
    route_to_send = []
    for point in route:
        route_to_send.append({"lat": point.lati, "long": point.longt})
    if len(route_to_send) > 0:
        return json.jsonify({"success": True, "data": route_to_send})
    else:
        return json.jsonify({"success": False})


# sets the new route
def api_set_route():
    new_route = json.loads(request.data.decode())
    route_to_set = []
    for point in new_route["waypoints"]:
        route_to_set.append(GPSPoint(point["lat"], point["long"]))
    my_rover.set_new_route(route_to_set)

    return json.jsonify({"success": True})

# route for getting the latitude and longitude of the rover
def api_gps():
    lat = my_rover.gps_lati
    long = my_rover.gps_longt
    # get in format specified by server
    #try:
    return json.jsonify({"success": True, "data": {"lat": lat, "long": long}})
    #except ValueError:

   #else:
   #     return json.jsonify({"success": False})


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

        app.add_url_rule('/api/notification', 'api_send_notifications', api_send_notifications, methods=['GET'])
        app.add_url_rule('/api/notification', 'api_add_notifications', api_add_notifications, methods=['POST'])
        app.add_url_rule('/api/emergency-stop', 'api_emergency_stop', api_emergency_stop, methods=['GET'])
        app.add_url_rule('/api/gps', 'api_gps', api_gps, methods=['GET'])
        app.add_url_rule('/api/route', 'api_set_route', api_set_route, methods=['POST'])
        app.add_url_rule('/api/route', 'api_get_route', api_get_route, methods=['GET'])
        app.add_url_rule('/api/go-button', 'api_go_button', api_go_button, methods=['GET'])


        app.register_error_handler(404, error_handler)
