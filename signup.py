from flask import Blueprint, render_template, request, redirect, url_for
from mysql.connector.errors import IntegrityError
from db_connection import get_db_connection

signup_bp = Blueprint('signup', __name__)

@signup_bp.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        name = request.form.get('name')
        email = request.form.get('email')
        
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

            return redirect(url_for('login.login'))  # Redirect to login page
        except IntegrityError:
            return "Username already exists. Please choose another one.", 400
        except Exception as e:
            return f"An error occurred: {str(e)}", 500

    return render_template('signup.html')
