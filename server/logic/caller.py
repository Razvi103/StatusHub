from ..data.datasource import db_session
from ..model.app import App
from ..model.endpoint import Endpoint
from ..model.response import Response
from ..model.bug import Bug
from ..model.endpoint_status import EndpointStatus
from ..model.app_status import AppStatus
import requests
from datetime import datetime
from sqlalchemy import func, update, false
import random 


def gen_random_code():
    good_codes = [200, 302]
    bad_codes = [400, 401, 403, 404, 405, 422]

    if random.random() < 0.2:
        return random.choice(bad_codes)
    
    return random.choice(good_codes)
 
def caller(app):
    endpoints = db_session.query(Endpoint).filter(Endpoint.app_id == app.id).all()
    
    for endpoint in endpoints:
        query_url = endpoint.url

        if endpoint.url == 'https://httpstat.us':
            query_url += f'/{gen_random_code()}'

        response = requests.get(query_url)

        response_obj = Response(
            endpoint_id=endpoint.id,
            status_code=response.status_code,
            information=response.reason,  
            date=datetime.now()
        )

        db_session.add(response_obj)
        db_session.commit()

        last_10_responses = db_session.query(Response)\
            .filter(Response.endpoint_id == endpoint.id)\
            .order_by(Response.date.desc())\
            .limit(10)\
            .all()
        
        count_good_codes = 0

        for db_response in last_10_responses:
            if db_response.status_code in [200, 302]:
                count_good_codes += 1

        old_status = endpoint.status

        if count_good_codes == len(last_10_responses):
            new_status = 'stable'
        elif count_good_codes > 0:
            new_status = 'unstable'
        else:
            new_status = 'down'

        bug_exists = db_session.query(Bug).filter(
            Bug.endpoint_id == endpoint.id,
            Bug.is_solved.is_(false())  
        ).first()
        
        if new_status == 'stable' and bug_exists:
            new_status = 'unstable'

        if new_status != old_status:
            db_session.add(EndpointStatus(endpoint.id, new_status))
            db_session.commit()

        endpoint.status = new_status
        db_session.commit()

    count_stable = db_session.query(func.count()).filter(Endpoint.app_id == app.id, Endpoint.status == 'stable').scalar()
    count_unstable = db_session.query(func.count()).filter(Endpoint.app_id == app.id, Endpoint.status == 'unstable').scalar()

    old_status = db_session.query(App).filter(App.id == app.id).first().status

    stmt = (
        update(App)
        .where(App.id == app.id)
        .values(
            status=(
                'stable' if count_stable == len(endpoints)
                else 'unstable' if count_stable > 0 or count_unstable > 0
                else 'down'
            )
        )
    )

    db_session.execute(stmt)
    db_session.commit()

    new_status = db_session.query(App).filter(App.id == app.id).first().status

    if new_status != old_status:
        db_session.add(AppStatus(app.id, new_status))
        db_session.commit()
