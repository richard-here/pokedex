import { useEffect, useState } from 'react';
import {
  CardContent, Card, Box, Chip, Grid, CardActionArea, Stack, Typography, useTheme, CircularProgress,
  Pagination,
} from '@mui/material';
import { toTitleCase } from '../utils/index';
import getDetailedPokemonList from '../data/api';
import PokemonDialog from '../components/PokemonDialog';

export default function HomePage() {
  const theme = useTheme();
  const backgroundColors = {
    ...theme.pokemonBackgrounds,
  };
  const [pokemons, setPokemons] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogData, setDialogData] = useState({ open: false, data: {} });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handleDialogClose = () => {
    setDialogData({ open: false, data: {} });
  };

  const handlePaginationChange = (_, value) => {
    setIsLoading(true);
    setPage(value);
  };

  useEffect(() => {
    getDetailedPokemonList({ offset: (page - 1) * 24, limit: 24 }).then((data) => {
      setTotalPages(Math.ceil(data.count / 24));
      setIsLoading(false);
      setPokemons(data.data);
    });
  }, [page]);

  if (isLoading) {
    return (
      <Stack sx={{ pt: 5 }} alignItems="center">
        <CircularProgress />
      </Stack>
    );
  }

  if (pokemons === null && !isLoading) {
    return <Typography sx={{ textAlign: 'center' }}>Error loading, please reload page</Typography>;
  }

  return (
    <Box sx={{
      flexGrow: 1,
    }}
    >
      <Grid
        container
        spacing={{ xss: 2, xs: 2, md: 3 }}
        columns={{
          xss: 4, xs: 4, sm: 9, md: 12, lg: 18,
        }}
        alignItems="stretch"
        direction="row"
      >
        {pokemons.map((pokemon) => (
          <Grid item xss={4} xs={2} sm={3} md={3} lg={3} key={pokemon.id} sx={{ height: 175 }}>
            <Card sx={{ borderRadius: 5, height: '100%' }}>
              <CardActionArea
                sx={{
                  height: '100%',
                  color: '#FFFFFF',
                  backgroundColor: backgroundColors[pokemon.color],
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'start',
                }}
                onClick={() => { setDialogData({ open: true, data: pokemon }); }}
              >
                <CardContent>
                  <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="flex-end">
                    <Box sx={{ zIndex: 1 }}>
                      <Typography variant="h2" gutterBottom paragraph sx={{ fontSize: 22, fontWeight: 'bold', mb: 1 }}>{toTitleCase(pokemon.name)}</Typography>
                      {pokemon.types.map((type) => (
                        <Box key={type.type.name} sx={{ mb: 0.5, p: 0 }}>
                          <Chip label={toTitleCase(type.type.name)} sx={{ color: '#FFFFFF', backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
                          <br />
                        </Box>
                      ))}
                    </Box>
                    <Box
                      component="img"
                      sx={{
                        height: 1, bottom: -20, right: -20, position: 'absolute', zIndex: 0,
                      }}
                      src={pokemon.pictureUrl}
                      alt={pokemon.name}
                    />
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      <PokemonDialog
        open={dialogData.open}
        handleClose={handleDialogClose}
        data={dialogData.data}
      />
      <Pagination page={page} onChange={handlePaginationChange} sx={{ pt: 5, justifyContent: 'center', display: 'flex' }} count={totalPages} siblingCount={0} shape="rounded" variant="outlined" color="primary" />
    </Box>
  );
}
