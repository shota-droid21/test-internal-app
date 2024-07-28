# ベースイメージとして公式のPythonイメージを使用
FROM python:3.9-slim

# 作業ディレクトリを設定
WORKDIR /app

# 依存関係をコピーし、インストール
COPY backend/requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# アプリケーションコードをコピー
# COPY . .

# コンテナが起動する際に実行するコマンドを指定
CMD ["python", "app.py"]