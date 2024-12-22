import mysql.connector

# Configure database connection
DB_CONFIG = {
    
}

def get_db_connection():
    try:
        connection = mysql.connector.connect(  host="localhost",
            user="root",
            password="",
            database="game_zone"
        )
        return connection
    except mysql.connector.Error as e:
        print(f"Error connecting to database: {e}")
        raise
