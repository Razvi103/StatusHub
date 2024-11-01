from flask import Blueprint, jsonify, request
from ..model.app import App
from ..data.datasource import db_session
from ..model.app_to_user import AppToUser
from ..model.endpoint import Endpoint
from ..model.bug import Bug
from ..model.endpoint_status import EndpointStatus
from datetime import datetime, timedelta

app_bp = Blueprint('app_bp', __name__)

# @app_bp.route('/apps')
# def get_all_apps():
#     apps = App.query.all()
#     return jsonify(
#         [
#             {
#                 "id": app_obj.id,
#                 "name": app_obj.name,
#                 "url": app_obj.url,
#                 "interval": app_obj.interval,
#                 "status": app_obj.status
#             }
#             for app_obj in apps
#         ]
#     )

@app_bp.route('/app')
def get_app_by_id():
    app_id = request.args.get("app_id")
    app = App.query.filter(App.id == app_id).first()

    endpoints = Endpoint.query.filter(Endpoint.app_id == app_id).all()

    endpoints_info = []
    bugs_info = []
    state_count = {
        "stable": 0,
        "unstable": 0,
        "down": 0
    }

    for endpoint in endpoints:
        bugs = Bug.query.filter(Bug.endpoint_id == endpoint.id).all()

        endpoint_info = {
            "id": endpoint.id,
            "url": endpoint.url,
            "method": endpoint.method,
            "status": endpoint.status,
            "num_bugs": len(bugs)
        }

        if endpoint.status in ['stable', 'unstable', 'down']:
            state_count[endpoint.status] += 1

        endpoints_info.append(endpoint_info)
        bugs_info.extend([
            {
                "reported_date": bug_obj.reported_date,
                "description": bug_obj.description,
                "endpoint_id": bug_obj.endpoint_id,
                "is_solved": bug_obj.is_solved
            }
            for bug_obj in bugs
        ])

    app_users = AppToUser.query.filter(AppToUser.app_id == app_id).all()

    users_info = [
        {
            "id": app_user.user.id,
            "name": app_user.user.name,
            "email": app_user.user.email,
            "username": app_user.user.username,
            "phone_number": app_user.user.phone_number
        }
        for app_user in app_users
    ] 

    return jsonify(
        {
            "id": app.id,
            "name": app.name,
            "url": app.url,
            "interval": app.interval,
            "status": app.status,
            "join_code": app.join_code,
            "endpoints": endpoints_info,
            "bugs": bugs_info,
            "users": users_info,
            "total_stable": state_count['stable'],
            "total_unstable": state_count['unstable'],
            "total_down": state_count['down']
        }
    )

@app_bp.route('/get_endpoint_stats')
def get_endpoint_stats_over_time():
    app_id = request.args.get("app_id")
    deltaT = request.args.get("interval")

    end_time = datetime.now()
    start_time = end_time - timedelta(hours=int(deltaT))

    endpoints = Endpoint.query.filter(Endpoint.app_id == app_id).all()

    result = []
    
    endpoint_index = 0
    for endpoint in endpoints:
        endpoint_index += 1

        endpoint_info = {
            "label": f"Endpoint {endpoint_index}",
            "data": []
        }

        current_time = start_time
        while current_time < end_time:
            latest_status = EndpointStatus.query.filter(
                EndpointStatus.endpoint_id == endpoint.id,
                EndpointStatus.updated_date <= current_time
            ).order_by(EndpointStatus.updated_date.desc()).first()

            if latest_status:
                if latest_status.new_status == 'stable':
                    endpoint_info['data'].append(3)
                elif latest_status.new_status == 'unstable':
                    endpoint_info['data'].append(2)
                elif latest_status.new_status == 'down':
                    endpoint_info['data'].append(1)
                else:
                    endpoint_info['data'].append(0)
            
            if deltaT == 1:
                current_time += timedelta(minutes=5)
            elif deltaT == 6:
                current_time += timedelta(minutes=30)
            else:
                current_time += timedelta(hours=1)

        while len(endpoint_info['data']) < 12:
            endpoint_info['data'] = [endpoint_info['data'][0]] + endpoint_info["data"]

        result.append(endpoint_info)

    return result 

@app_bp.route('/real_time_stats')
def get_stats_by_app_id():
    app_id = request.args.get("app_id")

    endpoints = Endpoint.query.filter(Endpoint.app_id == app_id).all()

    state_count = {
        "stable": 0,
        "unstable": 0,
        "down": 0
    }

    for endpoint in endpoints:
        if endpoint.status in ['stable', 'unstable', 'down']:
            state_count[endpoint.status] += 1

    return jsonify(
        {
            "total_stable": state_count['stable'],
            "total_unstable": state_count['unstable'],
            "total_down": state_count['down']
        }
    )

@app_bp.route('/find_apps')
def get_apps_by_prefix():
    prefix = request.args.get("prefix")
    apps_with_prefix = db_session.query(App).filter(App.name.like(f'{prefix}%')).all()
    return jsonify(
        [
            {
                "id": app_obj.id,
                "name": app_obj.name,
                "url": app_obj.url,
                "interval": app_obj.interval,
                "status": app_obj.status,
                "join_code": app_obj.join_code
            }
            for app_obj in apps_with_prefix
        ]
    )

@app_bp.route('/add_app', methods=["POST"])
def add_new_app():
    data = request.json
    user_id = data.get('user_id')
    urls = data.get('endpoint_urls')
    methods = data.get('endpoint_methods')
    new_app = App(data.get('name'), data.get('url'), data.get('interval'))
    db_session.add(new_app)
    db_session.commit()

    new_app_to_user = AppToUser(new_app.id, user_id)

    db_session.add(new_app_to_user)
    db_session.commit()

    from ..app import scheduler
    from ..logic.caller import caller
    scheduler.add_job(caller, 'interval', args=[new_app], seconds=new_app.interval)

    for index in range(len(urls)):
        db_session.add(Endpoint(urls[index], methods[index], new_app.id))
        db_session.commit()

    return jsonify({
        'message': 'App added successfully',
        'id': new_app.id
    })

@app_bp.route('/update_interval', methods=['PUT'])
def update_interval():
    data = request.json
    new_interval = data.get('interval')
    app_id = data.get('app_id')

    app = App.query.filter_by(id=app_id).first()
    app.interval = new_interval

    db_session.commit()

    return jsonify({"message": "App interval updated successfully"})