#コンテナ起動高速化の方向性決定

## 背景/検討目的

性能試験にてコンテナ起動高速化が必要になる場合に備え、コンテナ起動高速化の手法を検討する（コンテナ軽量化。 Java native compile， スケーリング自作など）。

現状は下記の理由でコンテナ起動に時間がかかっている。

- SOCI 適用時に spring actuator の healthcheck 起動が遅くなり、ALB に組み込まれるまでに時間がかかる
- 実際にスケーリングされるには 2mn ほどかかる（aN's contaner ansaghts による clouduetch への cpu データ push に時間がかかるた
  め）

## 完了条件

コンテナ起動高速化の手法を整理し、各手法（コンテナ軽量化、 spring actuator healthcheck 高速化、スケーリング高速化）の比較を行う（実施容易性、実現性など）、また結果を conf1uence に記載する

※java spring actuator healthcheck について：java に手を加え起動高速化をする場合、方式調査、比較（native compile など）、Jb と共存できるか、各方式の java 改修コストを調査する

※スケーリングについて：aws 上の個別実装（lambda, stepfunctions などの組み合わせ）にて対処できないか調査する

## 検討内容

主に以下の観点で各方式の検討を調べる
・どれくらい高速化できるか
・jib と共存できるか
・ecs との共存ができるか

- **native compile**

  - Spring Boot を Graalv の native イメージとしてビルドする
  - jib とは別のビルド方式の為、共存は困難
  - ecs で使用可能
  - ビルドイメージには軽量パックを使用することも可能
  - build.gradle で有効化を定義する
  - どれくらい高速化されたか検証/比較している記事あり

- **Lazy Initialization**

  - jb と共存可能
  - ecs ではできると想定
  - ビーンや重い依存関係がある場合に効果的アプリケーションの起動時間が短縮される
  - ビルド時のメモリ使用量や CPU 負荷を階で軽減でき、サーバリソースの効率的な利用が可能
  - そのビーンが初めて初めてアクセスされた際に、遅延が発生する可能性があり
  - 遅延初期化のオーバヘッドがあるため、パフォーマンスが重視されるアプリケーションで特定の操作が遅くなる可能性がある
  - ビーン単位で遅延有効かする場合はアプリの改修範囲が広くなる

- **Layered jar**

  - jib と共存は可能
  - build.gradle で有効化を定義する
  - Layered JAR は Spring Boot アプリケーションの JAR ファイルを複数のレイヤーに分割してビルドし、特にコンテナ環境のビルドやデプロイを効率化するための機能
  - アプリケーションの依存関係が変更されない限り、再ビルド時にアプリケーションコードのみのレイヤーが更新される為、高速でビルド可能

- **JVM 最適化**
- jib と共存は可能
- アプリの改修範囲が広い

## 用語

- **native compile(GraalVM)**

  - GraalVM は、Java バイトコードを含むさまざまな言語（JavaScript、Ruby、Python、R など）をサポートする高性能なユニバーサル仮想マシン。Java 等のネイティブイメージ機能が使用できる。
  - native compile とは GraalVM を使うことで、Java アプリケーションをネイティブコードにコンパイルし、JVM なしで実行可能なバイナリを生成する。

- **Lazy initialization とは**

  - 通常 Spring Boot アプリケーションは起動時にすべてのビーンを初期化するが、Lazy Initialization を有効にすると、ピーンの初期化はそのビーンが実際に使われるタイミングまで遅延させることができる

- **Layered jar とは**

  - Layered JAR とは Spring Boot アプリケーションの JAR ファイルを複数のレイヤーに分割してビルドし、特にコンテナ環境のビルドやデプロイを効率化するための機能

- **JVM 最適化**
  - Spring Boot の JVM 最適化とは、Java Virtual Machine（JVM）の設定を調整することで、Spring Boot アプリケーションのパフォーマンスや効率性を向上させることを指します。JVM は、Spring Boot アプリケーションの実行環境であり、適切な設定を行うことで、起動時間の短縮やメモリ使用量の削減、ガベージコレクション（GC）の改善などを実現できます。

## 参考サイト

- https://spring.pleiades.io/spring-boot/reference/packaging/native-image/
- https://qiita.com/RyoNakagawa2/items/cOb29955cb7f1bfd7c75
- [aws.amazon.com/jp/b1ogs/news/optimize-your-spring-boot-application-for-aws-fargate/](https://aws.amazon.com/jp/blogs/news/optimize-your-spring-boot-application-for-aws-fargate/)
