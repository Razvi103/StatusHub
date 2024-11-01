from flask import Blueprint, jsonify, request
from ..data.datasource import db_session
from ..model.bug import Bug
from datetime import datetime
from twilio.rest import Client
from ..model.endpoint import Endpoint
from ..model.app_to_user import AppToUser
from ..logic.openai import bug_prompter
import smtplib
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

bug_bp = Blueprint('bug_bp', __name__)

@bug_bp.route('/add_bug', methods=['POST'])
def add_new_bug():
    data = request.json
    new_bug = Bug(data.get('description'), data.get('endpoint_id'))

    db_session.add(new_bug)
    db_session.commit()

    endpoint = Endpoint.query.filter_by(id=data.get('endpoint_id')).first()

    app = endpoint.app
    users = [app_to_user.user for app_to_user in AppToUser.query.filter_by(app_id=app.id).all()]

    # Email setup using environment variables
    server = smtplib.SMTP("smtp.gmail.com", 587)
    server.starttls()
    email_address = os.getenv("EMAIL_ADDRESS")
    email_password = os.getenv("EMAIL_PASSWORD")
    server.login(email_address, email_password)

    # Twilio setup using environment variables
    account_sid = os.getenv('TWILIO_ACCOUNT_SID')
    auth_token = os.getenv('TWILIO_AUTH_TOKEN')
    client = Client(account_sid, auth_token)

    for user in users:
        email_notification = bug_prompter(user.name, app.name, endpoint.url, new_bug.description)
        email_subject = f"StatusHub bug update for your app: {app.name}"

        server.sendmail(email_address, user.email, f"Subject: {email_subject}\n\n{email_notification}")  

        try:
            message = client.messages.create(
                from_=os.getenv('TWILIO_PHONE_NUMBER'),
                body=f"Hi, {user.name}! A new bug has been reported for {app.name} on StatusHub. Check your email for a more detailed description!",
                to=f'{user.phone_number}'
            )
        except:
            pass

    return jsonify({'message': 'Bug added successfully'})


@bug_bp.route('/solve_bug', methods=['PUT'])
def solve_bug():
    data = request.json
    bug_id = data.get('bug_id')
    bug = Bug.query.filter_by(id=bug_id).first()

    bug.is_solved = True
    bug.solved_date = datetime.now()

    try:
        bug.assigned_user_id = data.get('assigned_user_id')
    except:
        pass

    db_session.commit()

    return jsonify({'message': 'Bug solved successfully'})


@bug_bp.route('/bugs', methods=['GET'])
def get_bugs_by_endpoint_id():
    endpoint_id = request.args.get("endpoint_id")
    bugs = Bug.query.filter_by(endpoint_id=endpoint_id).all()

    bugs_json = []
    for bug in bugs:
        bugs_json.append({
            'id': bug.id,
            'description': bug.description,
            'reported_date': bug.reported_date.strftime("%Y-%m-%d %H:%M:%S"),
            'is_solved': bug.is_solved,
            'solved_date': bug.solved_date.strftime("%Y-%m-%d %H:%M:%S") if bug.solved_date else None,
            'assigned_user_id': bug.assigned_user_id
        })

    return jsonify(bugs_json)
