from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

DATABASE = "eventtech.db"


# Database Initialization
def init_db():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            age INTEGER NOT NULL,
            password TEXT NOT NULL,
            role TEXT NOT NULL,
            user_group TEXT NOT NULL
        )
    """)

    conn.commit()
    conn.close()


init_db()


# Home Route
@app.route("/")
def home():
    return jsonify({
        "message": "EventTech Backend Running"
    })


# Sign Up
@app.route("/signup", methods=["POST"])
def signup():

    data = request.json

    name = data.get("name")
    email = data.get("email")
    age = data.get("age")
    password = data.get("password")
    role = data.get("role")
    user_group = data.get("group")

    if not all([name, email, age, password, role, user_group]):
        return jsonify({
            "message": "All fields are required"
        }), 400

    try:

        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()

        cursor.execute("""
            INSERT INTO users
            (name, email, age, password, role, user_group)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (
            name,
            email,
            age,
            password,
            role,
            user_group
        ))

        conn.commit()
        conn.close()

        return jsonify({
            "message": "Account created successfully"
        })

    except sqlite3.IntegrityError:
        return jsonify({
            "message": "Email already exists"
        }), 400

    except Exception as e:
        return jsonify({
            "message": str(e)
        }), 500


# Login
@app.route("/login", methods=["POST"])
def login():

    data = request.json

    email = data.get("email")
    password = data.get("password")

    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            name,
            email,
            age,
            role,
            user_group
        FROM users
        WHERE email = ?
        AND password = ?
    """, (
        email,
        password
    ))

    user = cursor.fetchone()

    conn.close()

    if user:

        return jsonify({
            "name": user[0],
            "email": user[1],
            "age": user[2],
            "role": user[3],
            "group": user[4]
        })

    return jsonify({
        "message": "Invalid email or password"
    }), 401


# Get All Users (Admin)
@app.route("/users")
def users():

    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            id,
            name,
            email,
            age,
            role,
            user_group
        FROM users
    """)

    rows = cursor.fetchall()

    conn.close()

    users_list = []

    for row in rows:
        users_list.append({
            "id": row[0],
            "name": row[1],
            "email": row[2],
            "age": row[3],
            "role": row[4],
            "group": row[5]
        })

    return jsonify(users_list)

@app.route("/user/<email>")
def get_user(email):

    conn = sqlite3.connect(DB)
    c = conn.cursor()

    c.execute("""
    SELECT name,email,age,role,user_group
    FROM users
    WHERE email=?
    """, (email,))

    user = c.fetchone()

    conn.close()

    if user:
        return jsonify({
            "name": user[0],
            "email": user[1],
            "age": user[2],
            "role": user[3],
            "group": user[4]
        })

    return jsonify({"message": "Not found"}), 404
travel_data = []


@app.route("/admin/add-trip", methods=["POST"])
def add_trip():

    data = request.json

    trip = {
        "id": len(travel_data) + 1,
        "location": data["location"],
        "startDate": data["startDate"],
        "endDate": data["endDate"],
        "price": data["price"],
        "paidBy": data.get("paidBy", []),
        "debtors": data.get("debtors", []),
        "createdAt": datetime.now()
    }

    travel_data.append(trip)

    return jsonify({"message": "saved"})

@app.before_request
def auto_cleanup():

    global travel_data

    now = datetime.now()

    travel_data = [
        trip for trip in travel_data
        if now - trip["createdAt"] < timedelta(days=5)
    ]

@app.route("/admin/update-trip/<int:trip_id>", methods=["POST"])
def update_trip(trip_id):

    data = request.json

    for trip in travel_data:

        if trip["id"] == trip_id:

            trip["startDate"] = data.get("startDate", trip["startDate"])
            trip["endDate"] = data.get("endDate", trip["endDate"])
            trip["location"] = data.get("location", trip["location"])

            if "paidBy" in data:

                for user in data["paidBy"]:

                    if user in trip["debtors"]:
                        trip["debtors"].remove(user)

                    if user not in trip["paidBy"]:
                        trip["paidBy"].append(user)

            return jsonify({"message": "updated"})

    return jsonify({"error": "not found"})


@app.route("/ai/data", methods=["GET"])
def get_data():
    return jsonify(travel_data)


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )    
    app.run(debug=True)