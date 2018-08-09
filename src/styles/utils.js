import { css } from 'styled-components'
import {
  rem as _rem
} from 'polished'

export const rem = (...arg) => _rem(...arg)

export const navHeight = _rem(80)

export const media = {
  lg: inner => css`
    @media (max-width: ${1200 / 16}em) {
      ${inner}
    }
  `,
  md: inner => css`
    @media (max-width: ${992 / 16}em) {
      ${inner}
    }
  `,
  sm: inner => css`
    @media (max-width: ${768 / 16}em) {
      ${inner}
    }
  `,
  xs: inner => css`
    @media (max-width: ${480 / 16}em) {
      ${inner}
    }
  `,
  custom: (n, inner) => css`
    @media (max-width: ${n / 16}em) {
      ${inner}
    }
  `
}

export const mobile = inner => css`
  @media (max-width: ${1000 / 16}em) {
    ${inner}
  }
`

export const phone = inner => css`
  @media (max-width: ${650 / 16}em) {
    ${inner}
  }
`

export const centrate = css`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const flex = inner => css`
  display: flex;
  justify-content: ${inner.x || 'center'};
  align-items: ${inner.y || 'center'};
`

export const hover = inner => css`
  &:hover,
  &:focus {
    ${inner}
  }
`

export const theme = {
  orange: '#FF9800',
  black: '#333',
  backBlack: '#202329',
  lightgray: '#d8d8d8',
  border: '1px solid #f4f5fA',
  shadow: '0 1px 6px 0 #e2e4ed'
}
