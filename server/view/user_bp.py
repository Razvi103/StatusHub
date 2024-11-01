from flask import Blueprint, jsonify, request
from ..model.app_to_user import AppToUser
from ..model.user import User
from ..model.app import App
from ..data.datasource import db_session

user_bp = Blueprint('user_bp', __name__)


@user_bp.route('/user/<int:user_id>/apps')
def get_all_apps_by_user_id(user_id):
    app_ids = db_session.query(AppToUser.app_id).filter(AppToUser.user_id == user_id).all()
    app_ids = [app_id for (app_id,) in app_ids]

    apps = db_session.query(App).filter(App.id.in_(app_ids)).all()

    app_data = [
        {
            'id': app.id,
            'name': app.name,
            'url': app.url,
            'interval': app.interval,
            'join_code': app.join_code,
        }
        for app in apps
    ]
    return jsonify(app_data)

@user_bp.route('/users')
def get_all_users():
    users = User.query.all()
    return jsonify(
        [
            {
                'id': user.id,
                'name': user.name,
                'email': user.email,
                'username': user.username,
                'phone_number': user.phone_number
            }
            for user in users
        ]
    )

#
# @user_bp.route('/user/<int:user_id>')
# def get_user_by_id(user_id):
#     user = User.query.filter(User.id == user_id).first()
#     return jsonify(
#         {
#             'id': user.id,
#             'name': user.name,
#             'email': user.email,
#             'username': user.username,
#             'phone_number': user.phone_number


#         }
#     )

@user_bp.route('/add_user', methods=["POST"])
def add_new_user():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    username = data.get('username')
    phone_number = data.get('phone_number')

    new_user = User(name, email, username, phone_number)

    db_session.add(new_user)
    db_session.commit()

    return jsonify({
        'message': 'User added successfully',
        'user_id': new_user.id
    })

@user_bp.route('/user')
def get_user_by_email():
    email = request.args.get("email")
    user = db_session.query(User).filter(User.email == email).first()

    return jsonify({
        'id': user.id,
        'name': user.name,
        'email': user.email,
        'username': user.username,
        'phone_number': user.phone_number,
    })
