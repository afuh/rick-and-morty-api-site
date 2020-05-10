/* eslint react/prop-types: 0 max-len: 0 */
import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const Svg = styled.svg`
  height: 20px;
  width: 20px;
  fill: ${({ theme }) => theme.black};
  transition: transform 0.5s ease;
`

const ButtonWrapper = styled.button`
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 9999;
  border-radius: 50%;
  height: 60px;
  width: 60px;
  margin: 20px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 20px;
  user-select: none;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme }) => css`
    background: ${theme.primary};
    border: 1px solid ${theme.primary};
  `}
`

const Icon = ({ ...rest }) => (
  <Svg viewBox='0 0 459 459' {...rest}>
    <path d='M459.319,229.668c0,22.201-17.992,40.193-40.205,40.193H269.85v149.271c0,22.207-17.998,40.199-40.196,40.193
      c-11.101,0-21.149-4.492-28.416-11.763c-7.276-7.281-11.774-17.324-11.769-28.419l-0.006-149.288H40.181
      c-11.094,0-21.134-4.492-28.416-11.774c-7.264-7.264-11.759-17.312-11.759-28.413C0,207.471,17.992,189.475,40.202,189.475h149.267
      V40.202C189.469,17.998,207.471,0,229.671,0c22.192,0.006,40.178,17.986,40.19,40.187v149.288h149.282
      C441.339,189.487,459.308,207.471,459.319,229.668z'/>
  </Svg>
)


const Button = ({ onClick, isOpen }) => (
  <ButtonWrapper onClick={onClick}>
    <Icon css={`transform: rotate(${isOpen ? '45deg' : 0})`} />
  </ButtonWrapper>
)

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired
}

export default Button
