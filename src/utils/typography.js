import Typography from 'typography'
import defaultGithub from 'typography-theme-github'

import theme from '../styles/theme'

const github = {
  ...defaultGithub,
  baseFontSize: '18px',
  headerWeight: 800,
  overrideThemeStyles: ({ rhythm }) => ({
    'h2,h3': {
      marginTop: rhythm(1.5),
    },
    'h1,h2': {
      borderBottom: 'none',
    },
    blockquote: {
      borderLeft: '6px solid' + theme.primary,
      background: theme.primary + '47',
      paddingTop: rhythm(1 / 2),
      paddingBottom: rhythm(1 / 2),
    },
    table: {
      marginBottom: rhythm(2),
    },
  }),
}

const typography = new Typography(github)

export default typography
