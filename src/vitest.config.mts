import { defineConfig } from 'vitest/config'

// テストするのは lib/ の関数だけ。画面を描画しないので環境は node にする。
export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    environment: 'node',
    include: ['lib/**/*.test.ts'],
  },
})
