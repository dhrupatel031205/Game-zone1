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


@games_bp.route('/save_stone_paper_scissor_data', methods=['POST'])
def save_stone_paper_scissor_data():
    try:
        username = session.get('username')
        data = request.get_json()

        # Corrected result assignment
        result = data.get('result')  # or `result = -data.get('result')` if negation is intended
        computerScore = data.get('computerS')
        playerScore = data.get('userS')
        tieCount = data.get('tieS')
        timestamp = data.get('timestamp')

        if None in [username, result, computerScore, playerScore, tieCount, timestamp]:
            return jsonify({'error': 'Missing required data'}), 400

        conn = get_db_connection()
        cursor = conn.cursor()

        # Insert query
        cursor.execute(
            "INSERT INTO rock_paper_scissor(username, player_score, tie_count, computer_score, result, timestamp) "
            "VALUES (%s, %s, %s, %s, %s, %s)",
            (username, playerScore, tieCount, computerScore, result, timestamp)
        )
        
        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({'message': 'Stone paper scissor game data saved successfully!'}), 200
    except Exception as e:
        # Log the error for debugging (optional)
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500
