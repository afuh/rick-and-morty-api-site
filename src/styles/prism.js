import { css } from 'styled-components'

const schema = {
  property: '#e06c75ff',
  numeric: '#d19a66ff',
  string: '#98c379ff',
  punctuation: '#abb2bf',
  inline: {
    back: '#eaeced',
    color: '#323232'
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
  	margin: .5em 0;
  	overflow: auto;
  	border-radius: 2px;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08)
  }

  /* Inline code */
  p > code[class*="language-"],
  li > code[class*="language-"] {
    background: ${schema.inline.back};
    color: ${schema.inline.color};
    padding: 0.2em 0.4em;
    border-radius: 0;
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
