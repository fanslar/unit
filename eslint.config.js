// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    type: 'lib',
    pnpm: true,
  },
  {
    rules: {
      // 解决 style/indent 和 style/indent-binary-ops 冲突
      'style/indent-binary-ops': 'off',
    },
  },
)
