import React from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes, css } from 'styled-components'

import Logo from '../../assets/svg/icon.svg'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const fadeIn = keyframes`
  0% {
      opacity: 0;
  }

  50% {
      opacity: 0;
  }

  100% {
      opacity: 1;
  }
`

const Rotate = styled.div(
  ({ theme, color, size, fadeInTime }) => css`
    animation: ${fadeIn} ${fadeInTime}s, ${rotate} 2s linear infinite;
    width: ${size};
    height: ${size};

    svg {
      width: 100%;
      height: 100%;
      fill: ${theme[color] || theme.black};
    }
  `,
)

const Spinner = ({ ...props }) => {
  return (
    <Rotate {...props}>
      <Logo />
    </Rotate>
  )
}

export default Spinner

Spinner.prototypes = {
  color: PropTypes.oneOf(['dark', 'light']),
  size: PropTypes.string,
  fadeIn: PropTypes.number,
}

Spinner.defaultProps = {
  size: '30px',
  color: 'primary',
  fadeInTime: 1,
}
