import { createGlobalStyle, css } from 'styled-components'

export const GlobalStyles = createGlobalStyle(
  ({ theme }) => css`
    body {
      background: ${theme.backBlack};
      font-variant-ligatures: none;
      text-rendering: optimizelegibility;
      -webkit-font-smoothing: antialiased;
      text-decoration-skip-ink: auto;
    }

    header,
    main {
      background: ${theme.white};
    }

    a {
      color: ${theme.black};
    }

    p a,
    li a {
      color: ${theme.black};
      border-bottom: 2px solid ${theme.primary};
      transition: all 0.1s;
    }

    a:hover,
    a:focus {
      text-decoration: none;
      border-bottom: none;
      color: ${theme.primary};
    }

    li {
      list-style-type: none;
    }

    *::selection {
      color: ${theme.primary};
      background: ${theme.backBlack};
    }

    img {
      width: 100%;
      height: auto;
      display: block;
    }
  `,
)
