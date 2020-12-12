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


def cameras():
    return render_template("Cameras.html")

def coming_soon():
    return render_template("ComingSoon.html")


def coming_soon():
    return render_template('ComingSoon.html')

# helper method for getting the route in format for
def get_format_route():
    route = my_rover.route_state
    route_to_send = []
    for point in route:
        route_to_send.append({"lat": point.lati, "long": point.longt})
    return route_to_send

# API routes

def api_add_notifications():
    response = json.loads(request.data.decode())
    my_rover.remark = response["notifications"]
    return json.jsonify({"success": True, "notifications": my_rover.remark})

#adds
def api_update_ips():
    response = json.loads(request.data.decode())
    my_rover.update_ips(response["ips"])
    ips = my_rover.ips
    return json.jsonify({"success": True, "ips": ips})

def api_get_ips():
    ips = my_rover.ips
    return json.jsonify({"success": True, "ips": ips})


def api_maintenance_set_wheels():
    response = json.loads(request.data.decode())
    new_speed = my_rover.set_new_speed(response["wheels"])
    return json.jsonify({"success": True, "wheels": my_rover.speed})


def api_maintenance_set_arm():
    response = json.loads(request.data.decode())
    my_rover.set_new_arm(response["arm"])
    return json.jsonify({"success": True, "arm": my_rover.arm})

def api_maintenance_get_arm():
    return json.jsonify({"success": True, "arm": my_rover.arm})

def api_maintenance_get_wheels():
    return json.jsonify({"success": True, "wheels": my_rover.speed})

# send the notification to rover
def api_send_notifications():
    notifications = my_rover.remark
    return json.jsonify({"success": True, "notifications": notifications})
# send rover to next waypoint
def api_go_button():
    if len(my_rover.route_state) > 0:
        my_rover.set_new_target(my_rover.route_state[0])
        return json.jsonify({"success": True})
    else:
        return json.jsonify({"success": False})

# emergency stop not implemented yet
def api_emergency_stop():
    my_rover.emergent_stop()
    return json.jsonify({"success": True})

# returns full list of all waypoint on route
def api_get_route():
    route_to_send = get_format_route()
    if len(route_to_send) > 0:
        return json.jsonify({"success": True, "waypoints": route_to_send})
    else:
        return json.jsonify({"success": False})


# sets the new route
def api_set_route():
    new_route = json.loads(request.data.decode())
    route_to_set = []
    for point in new_route["waypoints"]:
        route_to_set.append(GPSPoint(point["lat"], point["long"]))
    my_rover.route_state = route_to_set

    return json.jsonify({"success": True, "waypoints": get_format_route()})

# route for getting the latitude and longitude of the rover
def api_gps():
    lat = my_rover.gps_lati
    long = my_rover.gps_longt
    # get in format specified by server
    #try:
    return json.jsonify({"success": True, "lat": lat, "long": long})
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
        app.add_url_rule('/cameras', 'cameras', cameras, methods=['GET'])
        app.add_url_rule('/coming-soon', 'coming-soon', coming_soon, methods=['GET'])

        app.add_url_rule('/api/ips', 'api_update_ips', api_update_ips, methods=['POST'])
        app.add_url_rule('/api/ips', 'api_get_ips', api_get_ips, methods=['GET'])
        app.add_url_rule('/api/maintenance/wheels', 'api_maintenance_get_wheels', api_maintenance_get_wheels, methods=['GET'])
        app.add_url_rule('/api/maintenance/arm', 'api_maintenance_get_arm', api_maintenance_get_arm, methods=['GET'])
        app.add_url_rule('/api/maintenance/wheels', 'api_maintenance_set_wheels', api_maintenance_set_wheels, methods=['POST'])
        app.add_url_rule('/api/maintenance/arm', 'api_maintenance_set_arm', api_maintenance_set_arm, methods=['POST'])
        app.add_url_rule('/api/notifications', 'api_send_notifications', api_send_notifications, methods=['GET'])
        app.add_url_rule('/api/notifications', 'api_add_notifications', api_add_notifications, methods=['POST'])
        app.add_url_rule('/api/emergency-stop', 'api_emergency_stop', api_emergency_stop, methods=['GET'])
        app.add_url_rule('/api/gps', 'api_gps', api_gps, methods=['GET'])
        app.add_url_rule('/api/route', 'api_set_route', api_set_route, methods=['POST'])
        app.add_url_rule('/api/route', 'api_get_route', api_get_route, methods=['GET'])
        app.add_url_rule('/api/go-button', 'api_go_button', api_go_button, methods=['GET'])


        app.register_error_handler(404, error_handler)
