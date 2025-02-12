import React, { useState , useEffect } from 'react'
import styled, { css } from 'styled-components'
import { Spinner } from '../shared'
import Card from './characterCard'
import { useSiteMeta } from '../../utils/hooks'
import { useRickAndMortyStats } from '../../utils/hooks'

const Wrapper = styled.section(
  ({ theme }) => css`
    // ${theme.mixins.flex}
    padding: ${theme.spacing.rem(40)} 0;
    background: #272b33;
    min-height: calc(50vh - ${theme.navHeight}px);
    ${theme.media.phone(css`
      padding: ${theme.spacing._24};
    `)}
  `,
)

const Inner = styled.div(
  ({ theme }) => css`
    ${theme.mixins.flex}
    flex-wrap: wrap;
    max-width: 1920px;
  `,
)

const Flex = styled.h1(
  ({ theme }) => css`
    z-index: 1;
    display: flex;
    justify-content: center;
    margin: 0 0.75rem;
    max-width: 1920px;
    ${theme.media.phone(css`
      justify-content: space-between;
      margin: 0rem;
    `)}
  `,
)

const Select = styled.select(
  ({ theme }) => css`
    border: 1px solid rgb(255, 152, 0);
    border-radius: 8px;
    padding: 6px;
    width: 230px;
    margin: 0.75rem;
    color: #f5f5f5;
    background: rgb(60, 62, 68);
    font-size: ${theme.spacing.rem(16)};
    ${theme.media.phone(css`
      font-size: ${theme.spacing.rem(14)};
      width: 100%;
    `)}
  `,
)


 
const Showcase = () => {
  const [state, setState] = useState({
    status: 'all',
    gender: 'all',
    data:[],
    loading:false,
    filteredData:[]
  })
  const getRandomNums = ({ max, total }) => {
    const arr = []
    const randomNum = () => Math.floor(Math.random() * max + 1)
  
    if (total === 1) {
      return randomNum()
    }
  
    while (arr.length < total) {
      const num = randomNum()
      if (arr.indexOf(num) > -1) {
        continue
      }
      arr[arr.length] = num
    }
    return arr
  }
  
  const graphqlQuery = () => ({
    query: `
      query {
  characters(page: 1) { # Start with page 1
    info {
      next
    }
    results {
      id
      name
      status
      gender
      species
      image
      episode {
        name
        id
      }
      location {
        name
        id
      }
    }
  }
}
    `,
    variables: {  },
  })
  
 const { siteUrl } = useSiteMeta()
  const {
    characters: { info },
  } = useRickAndMortyStats()

  const fetchFromAPI = async ({status=state.status , gender=state.gender}) => {
    const res = await fetch(`${siteUrl}/graphql`, {
      method: 'POST',
      body: JSON.stringify(graphqlQuery(getRandomNums({ max: info.count, total:20 }))),
      headers: {
        'content-type': 'application/json',
      },
    }).catch(() => {
      setLoading(false)
    })
    if (res && res.ok) {
      const { data } = await res.json()
      let filteredCharacters   = JSON.parse(JSON.stringify(data.characters.results))
      if(status!=="all"){
        filteredCharacters=  filteredCharacters.filter((char) =>char.status===status)
      }
      if(gender!=="all"){
        filteredCharacters=  filteredCharacters.filter((char) =>char.gender===gender)
      }
      const characters = filteredCharacters.map((item) => ({
        ...item,
        url: `${siteUrl}/api/character/${item.id}`,
        episode: {
          name: item.episode[0].name,
          url: `${siteUrl}/api/episode/${item.episode[0].id}`,
        },
        location: {
          name: item.location.name,
          url: `${siteUrl}/api/location/${item.location.id}`,
        },
      }))
      //sessionStorage.setItem(CACHE_KEY, JSON.stringify(characters))
      setState((prev)=>({...prev, data:data.characters.results, filteredData:characters, status, gender}))
    }
  } 



  useEffect(()=>{
    fetchFromAPI({})
        return()=>{
    console.log("showcase unmounted")
  }
   }   ,[])

  return (
    <Wrapper>
      <Flex>
        <Select  name="status" id="status" onChange={() => fetchFromAPI({status:document.getElementById('status').value})}>
          <option value="all">All</option>
          <option value="Alive">Alive</option>
          <option value="Unknown">Unknown</option>
          <option value="Dead">Dead</option>
        </Select>
        <Select name="gender" id="gender" onChange={() => fetchFromAPI({gender:document.getElementById('gender').value})}>
         <option value="all">All</option>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
          <option value="Genderless">Genderless</option>
          <option value="Unknown">Unknown</option>
        </Select>
      </Flex>
      <Inner>{state.loading ? <Spinner /> : state.filteredData.map((char) => <Card key={char.id} {...char} />)}</Inner>
    </Wrapper>
  )
}

export default Showcase
