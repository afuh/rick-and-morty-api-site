import styled, { css } from 'styled-components'

const Caption = styled.span(
  ({ theme }) => css`
    margin: ${theme.spacing._4} ${theme.spacing._8};
    font-size: ${theme.spacing._12};

    text-transform: uppercase;
    text-align: center;
    font-weight: 300;
  `,
)

export default Caption
