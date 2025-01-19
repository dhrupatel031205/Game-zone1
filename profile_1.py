from flask import Blueprint, render_template, request, redirect, url_for, session
from db_connection import get_db_connection

profile_bp = Blueprint('profile', __name__)

@profile_bp.route('/profile')

def profile() :
    name = session.get("name")
    username = session.get('username')
    email  = session.get("email")
    return render_template('profile.html',username = username,name =  name,email = email)


@profile_bp.route('/games_data',methods = ['GET','POST'])

def games_data() :
    print("Hello World")

