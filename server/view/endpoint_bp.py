from flask import Blueprint, jsonify, request
from ..data.datasource import db_session
from ..model.endpoint import Endpoint
from ..model.app import App


endpoint_bp = Blueprint('endpoint_bp', __name__)

@endpoint_bp.route('/endpoint')
def get_endpoint_by_id():
    endpoint_id = request.args.get("endpoint_id")
    endpoint = db_session.query(Endpoint)\
        .filter(Endpoint.id == endpoint_id)\
        .first()
    
    return jsonify({
        'id': endpoint.id,
        'url': endpoint.url,
        'method': endpoint.method,
        'status': endpoint.status
    })

@endpoint_bp.route('/endpoints')
def get_endpoints_by_app_id():
    app_id = request.args.get("app_id")
    endpoints = db_session.query(Endpoint)\
        .join(App, App.id == Endpoint.app_id)\
        .filter(App.id == app_id)\
        .all()
    
    return jsonify([
        {
            'id': endpoint_obj.id,
            'url': endpoint_obj.url,
            'method': endpoint_obj.method,
            'status': endpoint_obj.status
        } 
        for endpoint_obj in endpoints
    ])

@endpoint_bp.route('/add_endpoint', methods=["POST"])
def add_endpoint():
    data = request.json

    url = data.get('url')
    method = data.get('method')
    app_id = data.get('app_id')

    endpoint = Endpoint(url=url, method=method, app_id=app_id)

    db_session.add(endpoint)
    db_session.commit()

    return jsonify({'message': 'Endpoint added successfully'})
