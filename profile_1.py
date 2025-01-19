from flask import Blueprint, render_template, request, redirect, url_for, session
from db_connection import get_db_connection

profile_bp = Blueprint('profile', __name__)

@profile_bp.route('/profile')
def profile():
    username = session.get('username')
    profileData = profile_data(username)
    flappyBirdData =  fetch_flappy_bird_data(username)
    tic_tac_toe_data = fetch_tic_tac_toe_data(username)
    rock_paper_scissor_data = fetch_rock_paper_scissor_data(username)
    game_2048_data = fetch_game_2048(username)
    
    return render_template('profile.html', profile_data = profileData, tic_tac_toe_data = tic_tac_toe_data, flappy_bird_data = flappyBirdData, rock_paper_scissor_data = rock_paper_scissor_data,game_2048_data = game_2048_data)

def profile_data(username):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        # Use a parameterized query
        query = "SELECT * FROM users WHERE username = %s"
        cursor.execute(query, (username,))
        data = cursor.fetchall()
        return data
    finally:
        # Ensure resources are released
        cursor.close()
        conn.close()

def fetch_tic_tac_toe_data(username) :
    try :
        conn = get_db_connection()
        cursor = conn.cursor()

        query = "SELECT * FROM tic_tac_toe WHERE username = %s"

        cursor.execute(query,(username,))
        tic_tac_toe_data = cursor.fetchall()

        return tic_tac_toe_data

    except Exception as e :
        return e 
    
    finally:
        cursor.close()
        conn.close()


def fetch_flappy_bird_data(username) :
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        query = "SELECT * FROM flappy_bird WHERE username = %s "
        
        cursor.execute(query,(username,))

        flappy_bird_data = cursor.fetchall()
        return flappy_bird_data
    except Exception as e:
        return e
    
    finally :
        cursor.close()
        conn.close()


def fetch_rock_paper_scissor_data(username) :
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        query = "SELECT * FROM rock_paper_scissor WHERE username = %s"
        cursor.execute(query,(username,))

        rock_paper_scissor_data = cursor.fetchall()
        return rock_paper_scissor_data
    except Exception as e :
        return e
    
    finally :
        cursor.close()
        conn.close()

def fetch_game_2048(username) :
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        query = "SELECT * FROM game_2048 WHERE username = %s"
        cursor.execute(query,(username,))

        game_2048_data = cursor.fetchall()
        return game_2048_data
    
    except Exception as e :
        return e
    
    finally :
        cursor.close()
        conn.close()
    