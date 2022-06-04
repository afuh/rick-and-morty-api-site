import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { ExternalLink } from '../shared'

const Wrapper = styled.article(
  ({ theme }) => css`
    width: 600px;
    height: 220px;
    display: flex;
    overflow: hidden;
    background: #3c3e44;
    border-radius: ${theme.spacing._8};
    margin: ${theme.spacing._12};
    box-shadow: ${theme.shadows.md};

    ${theme.media.phone(css`
      flex-direction: column;
      height: initial;
      width: 100%;
    `)}
  `,
)

const ImgWrapper = styled.div(
  ({ theme, isLoading }) => css`
    flex: 2;
    width: 100%;

    img {
      width: 100%;
      height: 100%;
      margin: 0;
      opacity: ${isLoading ? 0 : 1};
      transition: opacity 0.5s;
      object-position: center;
      object-fit: cover;

      ${theme.media.phone(css`
        height: 300px;
      `)}
    }
  `,
)

const ContentWrapper = styled.div`
  ${({ theme, status, isSmallHeading }) => {
    const statusColor = {
      alive: theme.green,
      dead: theme.red,
      unknown: theme.gray,
    }

    return css`
      flex: 3;
      position: relative;
      padding: ${theme.spacing._12} ${theme.spacing._12};
      color: ${theme.white};
      display: flex;
      flex-direction: column;

      span,
      h2 {
        margin: 0;
        padding: 0;
      }

      h2 {
        font-size: ${theme.spacing[isSmallHeading ? '_20' : '_24']};
      }

      span {
        font-size: 16px;
        font-weight: 500;
      }

      a {
        color: ${theme.whitesmoke};
        ${theme.mixins.hover(css`
          color: ${theme.primary};
          text-decoration: none;
        `)}
      }

      .text-gray {
        color: ${theme.gray};
      }

      .section {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;

        &:first-child {
          justify-content: flex-start;
        }

        &:last-child {
          justify-content: flex-end;
        }
      }

      ${theme.media.phone(css`
        .section + .section {
          margin-top: ${theme.spacing._20};
        }
      `)}

      .status {
        display: flex;
        align-items: center;
        text-transform: capitalize;

        &__icon {
          height: ${theme.spacing._8};
          width: ${theme.spacing._8};
          margin-right: ${theme.spacing.rem(6)};
          background: ${statusColor[status]};
          border-radius: 50%;
        }
      }

      ${theme.media.phone(css`
        pointer-events: none;
      `)}
    `
  }}
`

const Card = ({ image, name, url, status, species, location, episode }) => {
  const [loading, setLoading] = useState(true)
  const headingMaxLength = 23

  return (
    <Wrapper>
      <ImgWrapper isLoading={loading}>
        <img onLoad={() => setLoading(false)} src={image} alt={name} />
      </ImgWrapper>
      <ContentWrapper status={status.toLowerCase()} isSmallHeading={name.length > headingMaxLength}>
        <div className="section">
          <ExternalLink href={url}>
            <h2>{name}</h2>
          </ExternalLink>
          <span className="status">
            <span className="status__icon" /> {status} - {species}
          </span>
        </div>

        <div className="section">
          <span className="text-gray">Last known location:</span>
          <ExternalLink href={location.url}>{location.name}</ExternalLink>
        </div>

        <div className="section">
          <span className="text-gray">First seen in:</span>
          <ExternalLink href={episode.url}>{episode.name}</ExternalLink>
        </div>
      </ContentWrapper>
    </Wrapper>
  )
}

Card.propTypes = {
  image: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  species: PropTypes.string.isRequired,
  location: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  episode: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
}

export default Card
