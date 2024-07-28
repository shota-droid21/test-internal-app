# ベースとなるイメージを指定
FROM node:18

# 作業ディレクトリを設定
WORKDIR /app

# 依存関係のファイルをコピー
COPY frontend/package*.json ./

# 依存関係をインストール
RUN npm install

# ファイルをコピー
# COPY docker/certs/* /etc/ssl/certs/
# COPY docker/nodejs/entrypoint.dev.sh /

# 実行スクリプト
CMD ["npm","run","dev"]
# ENTRYPOINT ["sh", "/entrypoint.dev.sh"]