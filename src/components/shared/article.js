import styled, { css } from 'styled-components'

const Article = styled.article`
  ${({ theme }) => css`
    padding: 0 ${theme.spacing._24};
    max-width: ${theme.contentWidth}px;
    margin: 0 auto;
    margin-bottom: ${theme.navHeight}px;
  `}
`

export default Article
