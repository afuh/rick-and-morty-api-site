import { createGlobalStyle } from "styled-components"

export const theme = {
  orange: '#FF9800',
  black: '#333',
  backBlack: '#202329',
  gray: '#9E9E9E',
  whitesmoke: "#f5f5f5",
  lightgray: '#d8d8d8',
  shadow: '0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08)',
  navHeight: 80
}

export const GlobalStyles = createGlobalStyle`
  a {
    color: ${p => p.theme.black};
  }

  p a,
  li a {
    color: ${p => p.theme.black};
    border-bottom: 1px solid rgb(255, 152, 0);
    transition: all .1s;
  }

  a:hover,
  a:focus {
    text-decoration: none;
    color: ${p => p.theme.orange};
  }

  li {
    list-style-type: none;
  }

  *::selection {
    color: ${p => p.theme.orange};
    background: ${p => p.theme.backBlack};
  }

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`
