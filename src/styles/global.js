import { css } from "styled-components"
import { hover, size } from 'styles/utils'

export const theme = {
  orange: '#FF9800',
  black: '#333',
  backBlack: '#202329',
  gray: '#9E9E9E',
  whitesmoke: "#f5f5f5",
  lightgray: '#d8d8d8',
  shadow: '0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08)'
}

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

  img {
    ${size("100%", "auto")}
    display: block;
  }
`
