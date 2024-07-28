import random
import json
from datetime import datetime, timedelta

# from flask_sqlalchemy import SQLAlchemy


def iso_to_unix(iso_str):
    # ISO 8601形式の日時をdatetimeオブジェクトに変換
    dt = datetime.fromisoformat(iso_str.replace("Z", "+00:00"))
    # Unixタイムスタンプに変換
    unix_timestamp = int(dt.timestamp())
    return unix_timestamp


def random_date(start, end):
    """
    この関数は、startからendまでの範囲でランダムな日時を生成します。
    """
    return start + timedelta(
        seconds=random.randint(0, int((end - start).total_seconds()))
    )


def random_question():
    questions = [
        "フランスの首都はどこですか",
        "Pythonを使うにはどうすればいいですか",
        "機械学習とは何ですか",
        "ジョークを教えてください",
        "今日の天気は",
        "パスタの作り方は",
        "量子物理学を説明してください。",
        "人生の意味は何ですか？",
        "プログラミングを学ぶにはどうすればいいですか",
        "ソフトウェア開発のベストプラクティスは何ですか",
    ]
    return random.choice(questions)


def random_answer():
    answers = [
        "パリはフランスの首都です。",
        "Pythonはpython.orgからインストールして使うことができます。",
        "機械学習は人工知能の一分野です。",
        "科学者が原子を信用しないのはなぜですか？それは、原子がすべてを作り上げるからです。",
        "今日の天気は晴れです。",
        "パスタを作るには、水を沸騰させてパスタを入れ、10〜12分間茹でます。",
        "量子物理学は物理学の基本的な理論です。",
        "人生の意味は主観的です。",
        "プログラミングを学ぶには、練習と勉強が必要です。",
        "ベストプラクティスには、きれいなコードを書くことやバージョン管理を使用することが含まれます。",
    ]
    return random.choice(answers)


start_date = datetime(2024, 7, 1)
end_date = datetime(2024, 9, 30)

data = []
for _ in range(200):
    record = {
        "approach": random.choice(["chat", "searchdoc"]),
        "version": random.choice([3.5, 4.0]),
        "user": random.choice(
            [
                "kobayashi@ms.iss2tf.com",
                "yoshimura@ms.iss2tf.com",
                "saito@ms.iss2tf.com",
                "kugo@ms.iss2tf.com",
                "taki@ms.iss2tf.com",
            ]
        ),
        "tokens": random.randint(0, 2000),
        "input": random_question(),
        "response": random_answer(),
        "_ts": iso_to_unix(random_date(start_date, end_date).isoformat()),
    }
    data.append(record)

with open("test_data.json", "w") as f:
    json.dump(data, f, indent=4)

print("Test data generated and saved to test_data.json")
