import {
  Box, LinearProgress,
  Dialog, Slide, Stack, Typography, useTheme, Chip, Tabs, Tab,
} from '@mui/material';
import PropTypes from 'prop-types';
import { forwardRef, useState } from 'react';
import { padNumber, toTitleCase } from '../utils/index';

// eslint-disable-next-line react/jsx-props-no-spreading
const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const labelStyle = {
  fontWeight: 'bold',
  color: '#686868',
  width: '40%',
  minWidth: '40%',
  mr: 2,
};

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;
  return (
    value === index && (
      <Box role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} sx={{ pt: 4, ...other.sx }}>
        <Typography>{children}</Typography>
      </Box>
    )
  );
}

TabPanel.defaultProps = {
  children: null,
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function PokemonDialog({ open, handleClose, data }) {
  const theme = useTheme();
  const backgroundColors = {
    ...theme.pokemonBackgrounds,
  };
  const [tabValue, setTabValue] = useState(0);
  const handleChange = (_, newValue) => {
    setTabValue(newValue);
  };

  if (data && Object.keys(data).length === 0) {
    return null;
  }

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      PaperProps={{
        style: {
          maxWidth: '400px',
          width: '100%',
          backgroundColor: backgroundColors[data.color],
          borderRadius: 20,
          height: '100%',
        },
      }}
    >
      <Stack sx={{ height: '100%' }}>
        <Stack
          sx={{
            p: 4, color: '#FFFFFF', height: '40%', position: 'relative',
          }}
          spacing={2}
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Stack flex={1} direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h1" gutterBottom paragraph sx={{ fontSize: 36, fontWeight: 'bold', mb: 1 }}>{toTitleCase(data.name)}</Typography>
              {data.types.map((type) => (
                <Chip key={type.type.name} label={toTitleCase(type.type.name)} sx={{ color: '#FFFFFF', backgroundColor: 'rgba(255, 255, 255, 0.2)', mr: 0.5 }} />
              ))}
            </Box>
            <Box>
              <Typography variant="h2" sx={{ fontSize: 22, fontWeight: 'bold' }}>{ `#${padNumber(data.id, 4)}` }</Typography>
            </Box>
          </Stack>
          <Box
            component="img"
            sx={{
              height: 0.8, left: '50%', bottom: 0, position: 'absolute', zIndex: 1, transform: 'translate(-50%, 30%)',
            }}
            src={data.pictureUrl}
            alt={data.name}
          />
        </Stack>
        <Box
          sx={{
            p: 4,
            backgroundColor: '#FFFFFF',
            borderRadius: 5,
            overflowY: 'clip',
          }}
          flex={1}
          height="40%"
        >
          <Box height="48px">
            <Tabs value={tabValue} onChange={handleChange} variant="scrollable" sx={{ zIndex: 2, position: 'relative' }}>
              <Tab label="About" />
              <Tab label="Base Stats" />
              <Tab label="Moves" />
            </Tabs>
          </Box>
          <TabPanel sx={{ height: '80%', overflowY: 'auto', pt: 5 }} value={tabValue} index={0}>
            <Stack>
              <Stack direction="row" sx={{ pb: 2 }}>
                <Typography sx={{ ...labelStyle }}>Species</Typography>
                <Typography>{ toTitleCase(data.species.name) }</Typography>
              </Stack>
              <Stack direction="row" sx={{ pb: 2 }}>
                <Typography sx={{ ...labelStyle }}>Weight</Typography>
                <Typography>{ `${data.weight}kg` }</Typography>
              </Stack>
              <Stack direction="row" sx={{ pb: 2 }}>
                <Typography sx={{ ...labelStyle }}>Abilities</Typography>
                <Typography>{ data.abilities.map((ability) => toTitleCase(ability.ability.name)).join(', ') }</Typography>
              </Stack>
            </Stack>
          </TabPanel>
          <TabPanel sx={{ height: '80%', overflowY: 'auto', pt: 5 }} value={tabValue} index={1}>
            <Stack>
              {data.stats.map((stat) => (
                <Stack key={stat.stat.name} direction="row" sx={{ pb: 2 }} alignItems="center">
                  <Typography sx={{ ...labelStyle }}>{ toTitleCase(stat.stat.name) }</Typography>
                  <Typography sx={{ minWidth: '18px', width: '18px', mr: 2 }}>{stat.base_stat}</Typography>
                  <Box flex={1}>
                    <LinearProgress variant="determinate" value={(parseInt(stat.base_stat, 10) * 100) / 200} />
                  </Box>
                </Stack>
              ))}
            </Stack>
          </TabPanel>
          <TabPanel sx={{ height: '80%', overflowY: 'auto', pt: 5 }} value={tabValue} index={2}>
            {data.moves.map((move) => (
              <Chip
                key={move.move.name}
                label={toTitleCase(move.move.name)}
                sx={{ mb: 0.5, mr: 0.5 }}
              />
            ))}
          </TabPanel>
        </Box>
      </Stack>
    </Dialog>
  );
}

PokemonDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
};

export default PokemonDialog;
