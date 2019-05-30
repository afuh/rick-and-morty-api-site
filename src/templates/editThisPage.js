import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { GoPencil as EditIcon } from "react-icons/go"

import config from "../../config/siteConfig"
import { flex, rem } from '../styles/utils'

const Wrapper = styled.div.attrs({
  id: "edit-wrapper" // to query it in the Sidebar
})`
  ${flex({ x: 'flex-end' })}

  margin: 40px auto 0 ;
  max-width: 1220px;
  border-top: 1px solid ${({ theme }) => theme.lightgray};
`

const Anchor = styled.a.attrs(({ to }) => ({
  className: 'edit-page', // for test
  href: `${config.github.site}/blob/develop/src/pages${to.slice(0, -1)}.md`
}))`

  ${flex}
  font-size: ${rem(14)};
  font-weight: 200;
  padding: ${rem(20)};

  span {
    margin-left: 0.5rem
  }
`

const Icon = styled(EditIcon)`
  font-size: ${rem(20)};
`

const EditThisPage = ({ page }) => (
  <Wrapper>
    <Anchor to={page}>
      <Icon />
      <span>edit this page</span>
    </Anchor>
  </Wrapper>
)

EditThisPage.propTypes = {
  page: PropTypes.string.isRequired
}

export default EditThisPage
