import flask
from flask_cors import CORS
from .data.datasource import db_session
from .view.app_bp import app_bp
from .view.endpoint_bp import endpoint_bp
from .view.response_bp import response_bp
from .view.user_bp import user_bp
from .view.bug_bp import bug_bp
from .view.app_to_user_bp import app_to_user_bp
from .view.endpoint_status_bp import endpoint_status_bp
from .model.app import App
from apscheduler.schedulers.background import BackgroundScheduler
from .logic.caller import caller

app = flask.Flask(__name__)
CORS(app)

app.register_blueprint(app_bp)
app.register_blueprint(endpoint_bp)
app.register_blueprint(response_bp)
app.register_blueprint(user_bp)
app.register_blueprint(bug_bp)
app.register_blueprint(app_to_user_bp)
app.register_blueprint(endpoint_status_bp)

scheduler = BackgroundScheduler()

for _app in db_session.query(App).all():
    scheduler.add_job(caller, 'interval', args=[_app], seconds=_app.interval)

scheduler.start()

@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()

if __name__ == "__main__":
    app.run(debug=True)
