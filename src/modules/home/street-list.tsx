import React, { useEffect, useState, forwardRef, useMemo } from 'react';
import { List, ListItem, ListItemText, makeStyles, Paper, Card, Typography, CardContent, Box } from '@material-ui/core';
import { Feature, FeatureCollection } from 'geojson';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  fixedBox: {
    position: 'absolute',
    overflow: 'hidden',
    top: 0,
    left: 0,
    bottom: 0,
    width: '224px',
    zIndex: 1000,
  },
  listBox: {
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  paper: {
    zIndex: 1000,
  },
});

const ListItemLink = (props: { feature: Feature; selected: boolean }) => {
  const { feature, selected } = props;

  const CustomLink = useMemo(
    () => forwardRef<HTMLAnchorElement>((linkProps, ref) => <Link ref={ref} to={`/?street=${feature.id}`} {...linkProps} />),
    [feature]
  );

  return (
    <li>
      <ListItem button selected={selected} component={CustomLink}>
        <ListItemText primary={feature?.properties?.displayName} />
      </ListItem>
    </li>
  );
};

export interface StreetListProps {
  mapData: any;
  streetId?: string;
}

export const StreetList = (props: StreetListProps) => {
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const classes = useStyles();
  const featureCollection = props.mapData as FeatureCollection;

  useEffect(() => {
    setSelectedFeature(featureCollection.features.find(feature => feature.id === props.streetId) || null);
  }, [featureCollection.features, props.streetId]);

  return (
    <Box className={classes.fixedBox} display="flex" flexDirection="column" flexWrap="nowrap" justifyContent="flex-start" m={2}>
      <Box className={classes.listBox} flexGrow={1} flexShrink={1}>
        <Paper className={classes.paper} variant="outlined">
          <List>
            {featureCollection.features
              .filter(feature => feature?.properties?.displayName)
              .map(feature => (
                <ListItemLink key={feature.id} feature={feature} selected={selectedFeature?.id === feature.id} />
              ))}
          </List>
        </Paper>
      </Box>
      {selectedFeature && (
        <Box>
          <Card variant="outlined">
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {selectedFeature?.properties?.displayName}
              </Typography>
              <Typography variant="body1" component="p">
                {selectedFeature?.properties?.description}
              </Typography>
              <Typography color="textSecondary" variant="body2" component="p">
                {selectedFeature?.properties?.source} ({selectedFeature?.properties?.date})
              </Typography>
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
};

export default StreetList;
