import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { GoPencil as EditIcon } from 'react-icons/go'

import { ExternalLink } from '../shared'
import { useSiteMeta } from '../../utils/hooks'

const Wrapper = styled.div(
  ({ theme }) => css`
    ${theme.mixins.flex({ x: 'flex-end' })}
    border-top: 1px solid ${theme.lightgray};
    padding: 0 ${theme.spacing._24};
  `,
)

const Link = styled(ExternalLink)(
  ({ theme }) => css`
    ${theme.mixins.flex}

    font-size: ${theme.spacing._12};
    padding: ${theme.spacing._20} 0;

    span {
      margin-left: 0.5rem;
    }
  `,
)

const Icon = styled(EditIcon)`
  font-size: ${({ theme }) => theme.spacing._16};
`

const EditThisPage = ({ pathToGithub }) => {
  const { github } = useSiteMeta()
  const url = `${github.site}/blob/develop/src/pages${pathToGithub}`

  return (
    <Wrapper id="edit-wrapper">
      <Link href={url} className="edit-page">
        <Icon />
        <span>edit this page</span>
      </Link>
    </Wrapper>
  )
}

EditThisPage.propTypes = {
  pathToGithub: PropTypes.string.isRequired,
}

export default EditThisPage
