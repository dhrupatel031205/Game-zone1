from flask import Blueprint, render_template, request, redirect, url_for
from db_connection import get_db_connection

main_bp = Blueprint('main', __name__)

@main_bp.route('/main')
def main() :

    
    return render_template('main.html')