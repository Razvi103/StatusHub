from flask import Blueprint, jsonify, request
from ..model.app_to_user import AppToUser
from ..model.app import App
from ..data.datasource import db_session

app_to_user_bp = Blueprint('app_to_user_bp', __name__)


@app_to_user_bp.route("/apps")
def get_apps_by_user_id():
    user_id = request.args.get("user_id")

    app_to_user_entries = AppToUser.query.filter_by(user_id=user_id).all()

    app_ids = [entry.app_id for entry in app_to_user_entries]

    # Query the database to retrieve app details for the extracted app IDs
    apps = App.query.filter(App.id.in_(app_ids)).all()

    # Serialize the app details to JSON
    apps_json = [{
        "id": app.id,
        "name": app.name,
        "url": app.url,
        "interval": app.interval,
        "status": app.status,
        "join_code": app.join_code,
    } for app in apps]

    # Return the JSON response
    return jsonify(apps_json)


@app_to_user_bp.route("/join_app", methods=["POST"])
def join_app():
    user_id = request.json.get("user_id")
    join_code = request.json.get("join_code")

    app = App.query.filter_by(join_code=join_code).first()

    link = AppToUser.query.filter_by(app_id=app.id, user_id=user_id)

    if link is None:
        new_link = AppToUser(app.id, user_id)

        db_session.add(new_link)
        db_session.commit()

        return jsonify({"message": "Joined app successfully!"})
    
    return jsonify({"message": "User already owns the app."})