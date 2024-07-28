import sqlite3
import json
import os
from flask import Flask, g, jsonify, request
from flask_cors import CORS
from datetime import datetime, timezone

app = Flask(__name__)
CORS(app)

# JSONデータを読み込んでSQLiteデータベースに挿入
# data = load_json_data()
# conn = init_db()


# JSONファイルからデータを読み込む関数
def load_json_data():
    with open("test_data.json", "r") as file:
        return json.load(file)


DATABASE = "test.db"


def get_db():
    db = getattr(g, "_database", None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db


@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, "_database", None)
    if db is not None:
        db.close()


def init_db():

    with app.app_context():
        db = get_db()
        cursor = db.cursor()
        cursor.execute(
            """CREATE TABLE IF NOT EXISTS c
                          (id INTEGER PRIMARY KEY AUTOINCREMENT,
                           approach TEXT, version REAL, user TEXT, tokens INTEGER, 
                           input TEXT, response TEXT, _ts TEXT)"""
        )
        with open("test_data.json", "r") as f:
            data = json.load(f)
            for record in data:
                cursor.execute(
                    "INSERT INTO c (approach, version, user, tokens, input, response, _ts) VALUES (?, ?, ?, ?, ?, ?, ?)",
                    (
                        record["approach"],
                        record["version"],
                        record["user"],
                        record["tokens"],
                        record["input"],
                        record["response"],
                        record["_ts"],
                    ),
                )
        db.commit()


def get_filter_month():
    now = datetime.now(timezone.utc)
    # 当月の開始と終了のタイムスタンプを計算
    start_of_month = datetime(now.year, now.month, 1, tzinfo=timezone.utc)
    if now.month == 12:
        end_of_month = datetime(now.year + 1, 1, 1, tzinfo=timezone.utc)
    else:
        end_of_month = datetime(now.year, now.month + 1, 1, tzinfo=timezone.utc)

    start_ts = int(start_of_month.timestamp())
    end_ts = int(end_of_month.timestamp())
    return {"start_ts": start_ts, "end_ts": end_ts}


@app.route("/")
def hello_world():
    return "Hello, World!"


@app.route("/get-user", methods=["GET"])
def get_user():
    response_data = {"user": "shota@ms.iss2tf.com"}
    return jsonify(response_data)


@app.route("/get-usage", methods=["GET"])
def get_usage():
    username = request.args.get("username")
    filter_condition = get_filter_month()

    db = get_db()
    cursor = db.cursor()
    cursor.execute(
        f"""
        SELECT version, SUM(tokens) as total_tokens 
        FROM c 
        WHERE _ts >= ? AND _ts < ? AND user = ? 
        GROUP BY version
        """,
        (filter_condition["start_ts"], filter_condition["end_ts"], username),
    )
    rows = cursor.fetchall()

    result = []
    for row in rows:
        version, total_tokens = row
        record = {
            "total_tokens": total_tokens,
            "version": version,
        }
        if version == 3.5:
            record["limit"] = 12000
        elif version == 4.0:
            record["limit"] = 15000
        result.append(record)

    return jsonify(result)

    # クエリを作成
    # query = f"SELECT * FROM c WHERE c._ts >= {start_ts} AND c._ts < {end_ts}"


@app.route("/get-history", methods=["GET"])
def get_history():
    # data = load_json_data()
    # username = "kobayashi@ms.iss2tf.com"
    username = request.args.get("username")
    filter_condition = get_filter_month()

    db = get_db()
    cursor = db.cursor()
    cursor.execute(
        f"SELECT * FROM c WHERE c._ts >= {filter_condition['start_ts']} AND c._ts < {filter_condition['end_ts']} AND c.user = '{username}'"
    )
    rows = cursor.fetchall()
    col_names = [description[0] for description in cursor.description]
    result = [dict(zip(col_names, row)) for row in rows]

    return jsonify(result)


if __name__ == "__main__":
    # init_db()
    app.run(host="0.0.0.0", port="6055", debug=True)
