from flask import Blueprint, jsonify, request
from sqlalchemy import desc
from ..data.datasource import db_session
from ..model.response import Response
from ..model.endpoint import Endpoint


response_bp = Blueprint('response_bp', __name__)

@response_bp.route('/responses')
def get_responses_by_endpoint_id():
    endpoint_id = request.args.get("endpoint_id")
    responses = db_session.query(Response)\
        .join(Endpoint, Endpoint.id == Response.endpoint_id)\
        .filter(Endpoint.id == endpoint_id)\
        .order_by(desc(Response.date))\
        .limit(10)\
        .all()

    return jsonify([
        {
            'status_code': response_obj.status_code,
            'information': response_obj.information,
            'date': response_obj.date
        }
        for response_obj in responses
    ])
