from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

users = []
groups = [
    {"name": "30-", "members": []},
    {"name": "30-50", "members": []},
    {"name": "50+", "members": []},
    {"name": "Family", "members": []}
]


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/home")
def home():
    return render_template("home.html")


@app.route("/about")
def about():
    return render_template("about.html")


@app.route("/group")
def group():
    return render_template("group.html")


@app.route("/contact")
def contact():
    return render_template("contact.html")


@app.route("/api/signup", methods=["POST"])
def signup():
    data = request.json

    users.append({
        "name": data["name"],
        "email": data["email"],
        "age": data["age"],
        "role": data["role"]
    })

    return jsonify({"msg": "user created"})


@app.route("/api/login", methods=["POST"])
def login():
    data = request.json

    user = next((u for u in users if u["email"] == data["email"]), None)

    if not user:
        return jsonify({"error": "user not found"}), 404

    return jsonify(user)


@app.route("/api/groups")
def get_groups():
    return jsonify(groups)


@app.route("/api/join", methods=["POST"])
def join_group():
    data = request.json

    for g in groups:
        if g["name"] == data["group"]:
            if len(g["members"]) < 20:
                g["members"].append(data["user"])
                return jsonify({"msg": "joined"})
            return jsonify({"msg": "group full"})

    return jsonify({"msg": "not found"})


if __name__ == "__main__":
    app.run(debug=True)