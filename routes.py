import os
from flask import render_template, json, abort, request, session, redirect, url_for
from classes import User, Hive
from werkzeug.utils import secure_filename
from flask_login import current_user, login_user, logout_user, login_required
from extensions import login

users = []
ALLOWED_EXTENSIONS = {'jpg', 'png', 'jpeg'}


@login.user_loader
def load_user(id):
    for x in users:
        if x.username == id:
            return x
    return None


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def logout():
    logout_user()
    return json.jsonify({'success': True})


def login():
    return render_template('login.html')


def api_login():
    # if current_user.is_authenticated:
    #     return redirect(url_for('index'))


    userinfo = json.loads(request.data.decode())
    username = userinfo.get("username")
    password = userinfo.get("password")
    #checking valid credentials
    for x in users:
        if x.username == username:
            if x.password == password:
                login_user(x)
                print(current_user)
                return json.jsonify({'success': True, 'username': username})
            else:
                return json.jsonify({'success': False})

    else:
        return json.jsonify({'success': False})


def register():
    if request.method == 'POST':
        userinfo = json.loads(request.data.decode())
        new_user = User(userinfo.get("username"), userinfo.get("password"), userinfo.get("address"),
                        userinfo.get("contact"))
        # checks to see if there are any users with that username already in the system otherwise it adds it
        if not any(x.username == new_user.username for x in users):
            users.append(new_user)
            return json.jsonify({'result': 'success'})
        else:
            return json.jsonify({'result': 'user already exists'})
    return render_template('register.html')


def upload_file():
    print(request.files)
    # check if the post request has the file part
    if 'file' not in request.files:
        print('no file in request')
        return""
    file = request.files['file']
    if file.filename == '':
        print('no selected file')
        return""
    if file and allowed_file(file.filename):
        print("hello")
        filename = secure_filename(file.filename)
        file.save(os.path.join('/pictures', filename))
        return ""
    print("end")
    return""


def register_success():
    return render_template('register_succ.html')


@login_required
def profile():
    return render_template('profile.html')
@login_required
def hives():
    # if current_user.username == username:
    #     return current_user.getHives()

    return render_template('hives.html')


def edit_hive():
    return render_template('editHive.html')

def api_add_hive():
    hiveInfo = json.loads(request.data.decode())
    hiveID = hiveInfo.get("hiveID")
    health = hiveInfo.get("health")
    honeyStores = hiveInfo.get("honeyStores")
    queenProduction = hiveInfo.get("queenProduction")
    equipment = hiveInfo.get("equipment")
    losses = hiveInfo.get("losses")
    gains = hiveInfo.get("gains")
    current_user.addHive(hiveID, health, honeyStores, queenProduction, equipment, losses, gains)
    return json.jsonify({'success': True})


@login_required
def api_edit_hive():
    hiveInfo = json.loads(request.data.decode())
    hiveID = hiveInfo.get("hiveID")
    if hiveInfo.get("update") == 'True':
        health = hiveInfo.get("health")
        honeyStores = hiveInfo.get("honeyStores")
        queenProduction = hiveInfo.get("queenProduction")
        equipment = hiveInfo.get("equipment")
        losses = hiveInfo.get("losses")
        gains = hiveInfo.get("gains")
        if current_user in users:
            for h in current_user.hives:
                if h.id == hiveID:
                    h.health = health
                    h.honeyStores = honeyStores
                    h.queenProduction = queenProduction
                    h.equipment = equipment
                    h.losses = losses
                    h.gains = gains
                    return json.jsonify({'success': True, 'username': current_user.username, 'health': health,
                                         'honeyStores': honeyStores, 'queenProduction': queenProduction,
                                         'equipment': equipment, 'losses': losses, 'gains': gains})
            return json.jsonify({'success': False})
    else:
        correct_hive = current_user.findHiveByID(hiveID)
        health = correct_hive.health
        honeyStores = correct_hive.honeyStores
        queenProduction = correct_hive.queenProduction
        equipment = correct_hive.equipment
        losses = correct_hive.losses
        gains = correct_hive.gains
        return json.jsonify({'success': False, 'username': current_user.username, 'health': health,
                                         'honeyStores': honeyStores, 'queenProduction': queenProduction,
                                         'equipment': equipment, 'losses': losses, 'gains': gains})

#def api_add_hive():
#    current_user.addHive(health, honeyStores, queenProduction, equipment, losses, gains)
#    return json.jsonify({'result': 'hive added'})


#TODO: might be useful to add server-side error handlers
def error_handler( error ):
    return render_template('invalid-page.html')


def init_website_routes(app):
    if app:
        app.add_url_rule('/logout', 'logout', logout, methods=['GET'])
        app.add_url_rule('/upload-file', 'upload_file', upload_file, methods=['POST'])
        app.add_url_rule('/login', 'login', login, methods=['GET'])
        app.add_url_rule('/register', 'register', register, methods=['GET', 'POST'])
        app.add_url_rule('/register-success', 'register_success', register_success, methods=['GET'])
        app.add_url_rule('/profile', 'profile', profile, methods=['GET'])
        app.add_url_rule('/hives', 'hives', hives, methods=['GET'])
        app.add_url_rule('/edit-hive', 'edit_hive', edit_hive, methods=['GET'])
        app.add_url_rule('/', 'login', login, methods=['GET'])
        app.register_error_handler(404, error_handler)

        app.add_url_rule('/api/edit-hive', 'api_edit_hive', api_edit_hive, methods=['POST'] )
        app.add_url_rule('/api/login', 'api_login', api_login, methods=['POST'])
        app.add_url_rule('/api/add-hive', 'api_app', api_add_hive, methods=['POST'])

