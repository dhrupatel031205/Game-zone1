from flask import Blueprint, render_template, request, redirect, url_for,session
from db_connection import get_db_connection

logout_bp = Blueprint('logout', __name__)

@logout_bp.route('/logout')
def logout() :
    name = session.get('name')
    
    return render_template('logout.html',name = name)