from flask import Flask, render_template
from login import login_bp
from signup import signup_bp
from games import games_bp
from ContactUs import ContactUs_bp
from main import main_bp
from logout import logout_bp
app = Flask(__name__)
app.secret_key = "drpatel"

app.register_blueprint(login_bp)
app.register_blueprint(signup_bp)
app.register_blueprint(games_bp)
app.register_blueprint(ContactUs_bp)
app.register_blueprint(main_bp)
app.register_blueprint(logout_bp)

@app.route('/')
def home():
    return render_template('home.html')

if __name__ == '__main__':
    app.run(debug=True)
