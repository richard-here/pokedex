const BASE_URL = 'https://pokeapi.co/api/v2';

async function fetchGetJson(url, options = {}) {
  return fetch(url, {
    method: 'GET',
    ...options,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
    },
  });
}

async function getPokemonList(options = { offset: 0, limit: 24 }) {
  const url = `${BASE_URL}/pokemon?offset=${options.offset}&limit=${options.limit}`;
  const response = await fetchGetJson(url);
  const responseJson = await response.json();

  if (response.status !== 200) {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson };
}

async function getPokemon(url) {
  const response = await fetchGetJson(url);
  const responseJson = await response.json();

  if (response.status !== 200) {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson };
}

async function getSpecies(url) {
  const response = await fetchGetJson(url);
  const responseJson = await response.json();

  if (response.status !== 200) {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson };
}

async function getDetailedPokemonList(options = { offset: 0, limit: 24 }) {
  const pokemonList = await getPokemonList(options);
  if (pokemonList.error) {
    return null;
  }
  const pokemonUrls = pokemonList.data.results.map((data) => data.url);
  const pokemonDetails = await Promise.all(pokemonUrls.map((url) => getPokemon(url)));
  if (pokemonDetails.some((responseJson) => responseJson.error)) {
    return null;
  }
  const pokemonSpeciesUrls = pokemonDetails.map((data) => data.data.species.url);
  const pokemonSpecies = await Promise.all(pokemonSpeciesUrls.map((url) => getSpecies(url)));
  if (pokemonSpecies.some((responseJson) => responseJson.error)) {
    return null;
  }
  const detailedPokemonList = {
    count: pokemonList.data.count,
    data: pokemonList.data.results.map((_, index) => (
      {
        id: pokemonDetails[index].data.id,
        pictureUrl: pokemonDetails[index].data.sprites.front_default,
        name: pokemonDetails[index].data.name,
        types: pokemonDetails[index].data.types,
        color: pokemonSpecies[index].data.color.name,
        moves: pokemonDetails[index].data.moves,
        abilities: pokemonDetails[index].data.abilities,
        stats: pokemonDetails[index].data.stats,
        species: pokemonDetails[index].data.species,
        weight: pokemonDetails[index].data.weight,
      }
    )),
  };
  return detailedPokemonList;
}

export default getDetailedPokemonList;
