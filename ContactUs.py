from flask import Blueprint, render_template, request, redirect, url_for
from db_connection import get_db_connection

ContactUs_bp = Blueprint('ContactUs', __name__)

@ContactUs_bp.route('/ContactUs')
def ContactUs() :
    return render_template('ContactUs.html')