import re
from flask import Blueprint, render_template, request, redirect, url_for, flash
from mysql.connector.errors import IntegrityError
from db_connection import get_db_connection

signup_bp = Blueprint('signup', __name__)

@signup_bp.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form.get('username').strip()
        password = request.form.get('password').strip()
        name = request.form.get('name').strip()
        email = request.form.get('email').strip()

        # Username validation
        if len(username) < 3:
            flash("Username must be at least 3 characters long.", "error")
            return render_template('signup.html')

        # Password validation: At least 6 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
        password_regex = r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$"
        if not re.match(password_regex, password):
            flash("Password must be at least 6 characters long, contain an uppercase letter, lowercase letter, a number, and a special character.", "error")
            return render_template('signup.html')

        try:
            conn = get_db_connection()
            cursor = conn.cursor()

            # Insert user into the database
            query = '''
                INSERT INTO users (username, password, name, email) 
                VALUES (%s, %s, %s, %s)
            '''
            cursor.execute(query, (username, password, name, email))
            conn.commit()
            cursor.close()
            conn.close()

            flash("Sign up successful! Please log in.", "success")
            return redirect(url_for('login.login'))  # Redirect to login page

        except IntegrityError:
            flash("Username already exists. Please choose another one.", "error")
        except Exception as e:
            flash(f"An error occurred: {str(e)}", "error")

    return render_template('signup.html')
