from flask import Blueprint, render_template, request, redirect, url_for
from mysql.connector.errors import IntegrityError
from db_connection import get_db_connection

signup_bp = Blueprint('signup', __name__)

@signup_bp.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        name = request.form['name']
        email = request.form['email']

        try:
            conn = get_db_connection()
            cursor = conn.cursor()

            # Insert user into the database
            cursor.execute('INSERT INTO users (username, password,name,email) VALUES (%s, %s,%s,%s)', (username, password,name,email))
            conn.commit()
            conn.close()

            return redirect(url_for('login.login'))  # Redirect to login page
        except IntegrityError:
            return "Username already exists. Please choose another one.", 400

    return render_template('signup.html')
