from flask import Blueprint, render_template, request, redirect, url_for, session, flash
from db_connection import get_db_connection

ContactUs_bp = Blueprint('contactus', __name__)

@ContactUs_bp.route('/ContactUs', methods=['GET', 'POST'])
def ContactUs():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        message = request.form.get('message')

        if not name or not email or not message:
            flash("All fields are required!", "danger")
            return redirect(url_for('contactus.ContactUs'))

        save_data(name, email, message)
        flash("Your message has been sent successfully!", "success")
        flash("We will contact you soon!", "success")
        return redirect(url_for('contactus.ContactUs'))

    return render_template('contactus.html')

def save_data(name, email, message):
    username = session.get('username')
    if not username:
        flash("You must be logged in to submit the contact form!", "danger")
        return

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        query = "INSERT INTO contact_us (username, name, email, message) VALUES (%s, %s, %s, %s)"
        cursor.execute(query, (username, name, email, message))
        conn.commit()
        
    except Exception as e:
        print(f"Database error: {e}")
        flash("Something went wrong. Please try again.", "danger")
        
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
