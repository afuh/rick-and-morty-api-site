import styled, { css } from 'styled-components'
import { lighten } from 'polished'
import { Caption as _Caption } from './'

const Button = styled(_Caption)(
  ({ theme, ghost, strong }) => css`
    margin: 0;
    background: ${theme.primary};
    border-radius: ${theme.spacing._8};
    padding: ${theme.spacing._8} ${theme.spacing._16};
    color: ${theme.white};
    font-weight: 700;

    ${theme.mixins.hover(css`
      background: ${lighten(0.1, theme.primary)};
    `)};

    ${strong &&
    css`
      padding: ${theme.spacing._8} ${theme.spacing._32};
      font-weight: 900;
    `}

    ${ghost &&
    css`
      border: 1px solid ${theme.primary};
      background: transparent;
      color: ${theme.black};

      ${theme.mixins.hover(css`
        border: 1px solid transparent;
        background: ${theme.primary};
        color: ${theme.white};
      `)};
    `}

    transition: all 0.1s;
  `,
)

export default Button

Button.defaultProps = {
  ghost: false,
  strong: false,
}
