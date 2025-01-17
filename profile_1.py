from flask import Blueprint, render_template, request, redirect, url_for
from db_connection import get_db_connection

profile_bp = Blueprint('profile', __name__)

@profile_bp.route('/profile')

def profile() :
    return render_template('profile.html')