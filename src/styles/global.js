import { createGlobalStyle, css } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  ${({ theme }) => css`
    body {
      background: ${theme.backBlack};
      font-variant-ligatures: none;
      text-rendering: optimizelegibility;
      -webkit-font-smoothing: antialiased;
      text-decoration-skip-ink: auto;
    }

    header, main {
      background: #fff;
    }

    a {
      color: ${theme.black};
    }

    p a,
    li a {
      color: ${theme.black};
      border-bottom: 2px solid ${theme.primary};
      transition: all .1s;
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
  `}
`

const schema = {
  property: '#ff7d87',
  numeric: '#f08d49',
  string: '#7ec699',
  punctuation: '#abb2bf',
  inline: {
    back: '#1b1f230d',
    color: '#476582'
  }
}

export const prismCSS = css`
  code {
    font-family: Menlo,Monaco,Consolas,"Courier New",monospace;
    line-height: 1.4rem
  }

  code[class*="language-"],
  pre[class*="language-"] {
  	color: ${p => p.theme.whitesmoke};
  	background: none;
  	text-align: left;
  	white-space: pre;
  	word-spacing: normal;
  	word-break: normal;
  	word-wrap: normal;
  	line-height: 1.5;
  	tab-size: 4;
  	hyphens: none;
  }

  /* Code blocks */
  pre[class*="language-"] {
    background: ${p => p.theme.backBlack};
  	padding: 1em;
  	margin: .5em 0 1em;
  	overflow: auto;
  	border-radius: 6px;
    box-shadow: ${p => p.theme.shadow};
  }

  /* Inline code */
  p > code[class*="language-"],
  li > code[class*="language-"] {
    background: ${schema.inline.back};
    color: ${schema.inline.color};
    padding: 0.25rem 0.5rem;
    border-radius: 3px;
    white-space: normal;
  }

  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
  	color: slategray;
  }

  .namespace {
  	opacity: .7;
  }

  .token.property,
  .token.tag,
  .token.constant,
  .token.symbol,
  .token.deleted {
    color: ${schema.property};
  }

  .token.boolean,
  .token.number {
  	color: ${schema.numeric};
  }

  .token.selector,
  .token.attr-name,
  .token.string,
  .token.char,
  .token.builtin,
  .token.inserted {
  	color: ${schema.string};
  }

  .token.operator,
  .token.punctuation,
  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string,
  .token.variable {
  	color: ${schema.punctuation};
  }

  .token.atrule,
  .token.attr-value,
  .token.function {
  	color: #e6db74;
  }

  .token.keyword {
  	color: #66d9ef;
  }

  .token.regex,
  .token.important {
  	color: #fd971f;
  }

  .token.important,
  .token.bold {
  	font-weight: bold;
  }
  .token.italic {
  	font-style: italic;
  }

  .token.entity {
  	cursor: help;
  }
`
