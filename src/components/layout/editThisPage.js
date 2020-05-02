import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { GoPencil as EditIcon } from 'react-icons/go'

import config from '../../../config/siteConfig'
import { ExternalLink } from '../shared'

const Wrapper = styled.div.attrs({
  id: 'edit-wrapper'
})`
  ${({ theme }) => css`
    ${theme.mixins.flex({ x: 'flex-end' })}

    margin: 40px auto 0 ;
    max-width: 1220px;
    border-top: 1px solid ${theme.lightgray};
  `}
`

const Link = styled(ExternalLink).attrs(({ to }) => ({
  className: 'edit-page',
  href: `${config.github.site}/blob/develop/src/pages${to}.mdx`
}))`
  ${({ theme }) => css`
    ${theme.mixins.flex}
    font-size: ${theme.spacing._12};
    padding: ${theme.spacing._20} 0;
    font-weight: 200;

    span {
      margin-left: 0.5rem
    }
  `}
`

const Icon = styled(EditIcon)`
  font-size: ${({ theme }) => theme.spacing._16};
`

const EditThisPage = ({ page }) => (
  <Wrapper>
    <Link to={page}>
      <Icon />
      <span>edit this page</span>
    </Link>
  </Wrapper>
)

EditThisPage.propTypes = {
  page: PropTypes.string.isRequired
}

export default EditThisPage
