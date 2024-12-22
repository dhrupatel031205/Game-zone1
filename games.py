from flask import Blueprint, render_template, request, redirect, url_for
from db_connection import get_db_connection

games_bp = Blueprint('games', __name__)

@games_bp.route('/games')
def games() :
    return render_template('games.html')