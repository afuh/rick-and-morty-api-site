# Rick and Morty API Documentation

## Introduction
This documentation will help you get familiar with the resources of the Rick and Morty API and show you how to make different queries, so that you can get the most out of it.

## GraphQL
Access the GraphQL API [here](https://rickandmortyapi.com/graphql).

Example query:
```graphql
query {
  characters(page: 2, filter: { name: "rick" }) {
    info {
      count
    }
    results {
      name
    }
  }
  location(id: 1) {
    id
  }
  episodesByIds(ids: [1, 2]) {
    id
  }
}
```
New to GraphQL? Check the [docs here](https://graphql.org/learn/).

## REST
Base URL: [https://rickandmortyapi.com/api](https://rickandmortyapi.com/api)

The base URL contains information about all available API resources. All requests are GET requests and responses will return data in JSON.

Endpoints:
- Characters: [https://rickandmortyapi.com/api/character](https://rickandmortyapi.com/api/character)
- Locations: [https://rickandmortyapi.com/api/location](https://rickandmortyapi.com/api/location)
- Episodes: [https://rickandmortyapi.com/api/episode](https://rickandmortyapi.com/api/episode)

## Info and Pagination
The API automatically paginates the responses. You will receive up to 20 documents per page.

Each resource contains an `info` object with the following details:
- `count`: Total number of documents.
- `pages`: Total number of pages.
- `next`: URL to the next page (if it exists).
- `prev`: URL to the previous page (if it exists).

Example response:
```json
{
  "info": {
    "count": 826,
    "pages": 42,
    "next": "https://rickandmortyapi.com/api/character/?page=2",
    "prev": null
  },
  "results": [
    // ...
  ]
}
```
You can access different pages with the `page` parameter. For example, to access page 2, use `?page=2`.

## JavaScript Client
The Rick and Morty API JavaScript client is a fully typed client that gives you access to the API and its features.

### Client Reference
- **Character**: Total of 826 characters sorted by id.

#### Character Schema
- `id`: The id of the character.
- `name`: The name of the character.
- `status`: The status of the character ('Alive', 'Dead', or 'unknown').
- `species`: The species of the character.
- `type`: The type or subspecies of the character.
- `gender`: The gender of the character ('Female', 'Male', 'Genderless', or 'unknown').
- `origin`: Name and link to the character's origin location.
- `location`: Name and link to the character's last known location.
- `image`: Link to the character's image.
- `episode`: List of episodes in which this character appeared.
- `url`: Link to the character's own URL endpoint.
- `created`: Time at which the character was created in the database.

#### Endpoints
- **Get all characters**: [https://rickandmortyapi.com/api/character](https://rickandmortyapi.com/api/character)
- **Get a single character**: [https://rickandmortyapi.com/api/character/2](https://rickandmortyapi.com/api/character/2)
- **Get multiple characters**: [https://rickandmortyapi.com/api/character/1,183](https://rickandmortyapi.com/api/character/1,183)
- **Filter characters**: Add query parameters like `?name=rick&status=alive` to the URL.

## Location
There are a total of 126 locations sorted by id.

### Location Schema
- `id`: The id of the location.
- `name`: The name of the location.
- `type`: The type of the location.
- `dimension`: The dimension in which the location is located.
- `residents`: List of characters who have been last seen in the location.
- `url`: Link to the location's own endpoint.
- `created`: Time at which the location was created in the database.

#### Endpoints
- **Get all locations**: [https://rickandmortyapi.com/api/location](https://rickandmortyapi.com/api/location)
- **Get a single location**: [https://rickandmortyapi.com/api/location/3](https://rickandmortyapi.com/api/location/3)
- **Get multiple locations**: [https://rickandmortyapi.com/api/location/3,21](https://rickandmortyapi.com/api/location/3,21)
- **Filter locations**: Add query parameters like `?name=Earth&type=Planet` to the URL.

## Episode
There are a total of 51 episodes sorted by id.

### Episode Schema
- `id`: The id of the episode.
- `name`: The name of the episode.
- `air_date`: The air date of the episode.
- `episode`: The code of the episode.
- `characters`: List of characters who have been seen in the episode.
- `url`: Link to the episode's own endpoint.
- `created`: Time at which the episode was created in the database.

#### Endpoints
- **Get all episodes**: [https://rickandmortyapi.com/api/episode](https://rickandmortyapi.com/api/episode)
- **Get a single episode**: [https://rickandmortyapi.com/api/episode/28](https://rickandmortyapi.com/api/episode/28)
- **Get multiple episodes**: [https://rickandmortyapi.com/api/episode/10,28](https://rickandmortyapi.com/api/episode/10,28)
- **Filter episodes**: Add query parameters like `?name=Pilot&episode=S01E01` to the URL.

## Libraries
Here you will find a list of community helper libraries to use the Rick and Morty API with your preferred language.

- **Dart**: Rick and Morty API Dart Client by Yash Garg
- **Elixir**: ExShla - The Rick and Morty API Wrapper by l1h3r
- **Go**: The Rick and Morty API Go client by Leopoldo Caballero
- **Java**: Rick and Morty API Java Client by Adriano Rocha
- **.NET**: Rick.Net by BIGDummyHead, RickAndMorty.Net.Api by Carlj28
- **PHP**: Rick and Morty API PHP Client by Nick Been
- **Python**: Python implementation for the Rick and Morty API by Rohan Hazra
- **R**: mortyr by Mike Page
- **Ruby**: The Rick and Morty API Gem by Tommy Spielhoelle
- **Rust**: rick-and-morty crate by dshomoye
- **Swift**: The Rick and Morty API Swift Client by Benjamin Bruch

## Edit This Page
- **Characters**: 826
- **Locations**: 126
- **Episodes**: 51
