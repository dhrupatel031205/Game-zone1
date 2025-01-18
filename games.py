from flask import Blueprint, render_template, request, jsonify,session
from db_connection import get_db_connection


# Blueprint setup
games_bp = Blueprint('games', __name__)

@games_bp.route('/games')
def games():
    return render_template('games.html')


@games_bp.route('/save_tic_tac_toe_data', methods=['POST'])
def save_tic_tac_toe_data():
    try:
        username = session.get('username')
        data = request.get_json()
        result = data.get('result')
        time_played = data.get('time_played')  

        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO tic_tac_toe (username,win, timestamp) VALUES (%s, %s, %s)",
            (username, result, time_played)
        )
        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({'message': 'Game data saved successfully!'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@games_bp.route("/save_flappy_bird_data",methods =['POST']) 
def save_flapy_bird_data() :
    try:
        username = session.get("username")
        data = request.get_json()
        score = data.get("score")
        timestamp = data.get("timestamp")

        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
                       INSERT INTO flappy_bird(username, score, timestamp) VALUES(%s,%s,%S)
                       """,(username, score,timestamp))

        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({'message': 'Game data saved successfully!'}), 200
    except Exception as e :
        return jsonify({'error'  : str(e)}),500
