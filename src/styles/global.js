import { css } from "styled-components"
import { theme, hover } from 'styles/utils'

export default css`
  a {
    color: ${theme.black};
    ${hover(css`
      text-decoration: none;
      color: ${theme.orange};
    `)}
  }

  p a,
  li a {
    color: ${theme.black};
    border-bottom: 1px solid rgb(255, 152, 0);
    transition: all .1s;
  }

  li {
    list-style-type: none;
  }

  *::selection {
    color: ${theme.orange};
    background: ${theme.backBlack};
  }
`
