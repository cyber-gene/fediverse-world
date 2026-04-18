# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## コマンド

```bash
# 開発サーバー起動 (http://localhost:3000)
npm run dev

# プロダクションビルド
npm run build

# 静的サイト生成
npm run generate

# プロダクションプレビュー
npm run preview
```

テストフレームワークは導入されていない。

## コミット規約

Netlify CI でPRごとにデプロイプレビューが生成される。ドキュメントのみの変更（`CLAUDE.md`、`README.md` など）はデプロイ不要なので、コミットメッセージに `[ci skip]` プレフィックスを付ける。

```
[ci skip] Update CLAUDE.md
```

## コードフォーマット

Prettier を使用（`.prettierrc` 参照）:
- セミコロンあり
- シングルクォート
- インデント幅 2
- trailing comma: es5

## アーキテクチャ

Nuxt 3 の SPA（`ssr: false`）。ページルーティングなし — `app.vue` が単一のエントリーポイント。Netlify にデプロイ（`nitro.preset: 'netlify'`）。

### コンポーネント構成

`app.vue` がルートで、以下の3つのコンポーネントを直接マウントする:

- **`Background.vue`** — Canvas API で星が飛び交うアニメーション背景（z-index: -1 で固定配置）
- **`TopSection.vue`** — タイプライターエフェクトでテキストを表示するヒーローセクション
- **`AboutFediverse.vue`** — Fediverse の説明コンテンツ

### スクロールアニメーション

`app.vue` の `onMounted` で `IntersectionObserver` を設定し、`.section` クラスを持つ要素がビューポートに50%以上入ると `.active` クラスを付与して opacity/transform のトランジションを起動する。新しいセクションを追加する場合は `.section` クラスを付けること（グローバルスタイルに定義済み）。

### モジュール

- `@nuxtjs/google-fonts` — Noto Sans・JetBrains Mono を読み込み
- `nuxt-mdi` — Material Design Icons を提供
