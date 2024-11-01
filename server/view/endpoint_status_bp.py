from flask import Blueprint, jsonify, request
from ..model.endpoint_status import EndpointStatus
from ..data.datasource import db_session
from datetime import datetime, timedelta

endpoint_status_bp = Blueprint('endpoint_status_bp', __name__)

@endpoint_status_bp.route("/last_endpoint_updates")
def get_last_endpoint_updates():
    endpoint_id = request.args.get('endpoint_id')
    interval = request.args.get('interval')

    lower_bound = datetime.now() - timedelta(hours=interval)

    stats = db_session.query(EndpointStatus)\
        .filter(EndpointStatus.endpoint_id == endpoint_id)\
        .filter(EndpointStatus.updated_date >= lower_bound)\
        .all()
    
    return jsonify([
        {
            'id': status.id,
            'endpoint_id': status.endpoint_id,
            'new_status': status.new_status,
            'updated_date': status.updated_date.strftime('%Y-%m-%d %H:%M:%S') 
        }
        for status in stats
    ])
