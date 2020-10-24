from flask import render_template, json, abort


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

# TODO: might be useful to add server-side error handlers
def error_handler(error):
    return render_template('invalid-page.html')


def init_website_routes(app):
    if app:
        app.add_url_rule('/', 'home', home, methods=['GET'])
        app.add_url_rule('/home', 'home', home, methods=['GET'])
        app.add_url_rule('/ai-navigation', 'ai_navigation', ai_navigation, methods=['GET'])
        app.add_url_rule('/equipment-servicing', 'equipment_servicing', equipment_servicing, methods=['GET'])
        app.add_url_rule('/erdm', 'erdm', erdm, methods=['GET'])
        app.add_url_rule('/maintenance', 'maintenance',  maintenance, methods=['GET'])
        app.add_url_rule('/science', 'science', science, methods=['GET'])
        app.add_url_rule('/coming-soon', 'coming_soon', coming_soon, methods=['GET'])

        app.register_error_handler(404, error_handler)
