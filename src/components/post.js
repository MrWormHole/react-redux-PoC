import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Avatar, Chip, Grid } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    backgroundColor: "#252525",
    height: "100%"
  },
  title: {
    color: "orange",
    fontFamily: "serif"
  },
  body: {
    color: "white",
    fontFamily: "sans-serif"
  },
  cardActions: {
    justifyContent: "center"
  },
  cardButton: {
    backgroundColor: "#7B1FA2",
    color: "#F0F0F0",
    textAlign: "center",
    padding: "10px 40px",
    '&:hover': {
      backgroundColor: "orange",
    }
  },
  chip: {
    backgroundColor: "transparent",
    color: "#7B1FA2",
    borderColor: "#7B1FA2",
    marginTop: "1rem"
  },
  avatar: {
    backgroundColor: "#7B1FA2",
    color: "#FFF !important"
  }
});

export default function Post({id, userId, title, body, deletePostHandler}) {
    const classes = useStyles();

    const calculateTotalWordCount = () => {
      const titleWords = title.trim().split(/\s+/);
      const bodyWords = body.trim().split(/\s+/);
      return titleWords.length + bodyWords.length;
    }
    
    return (
            <Card className={classes.root}>
              <Grid container direction="row" justify="center" alignItems="center">
                <Chip className={classes.chip}
                    avatar={<Avatar className={classes.avatar}>WC</Avatar>}
                    label={"Word Count:" + calculateTotalWordCount()}
                    variant="outlined"/>
              </Grid>
                
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
                  {title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" className={classes.body}>
                  {body}
                </Typography>
              </CardContent>
          
              <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" className={classes.cardButton} onClick={() => { deletePostHandler(id, title, body); }}>
                  Remove
                </Button>
              </CardActions>
            </Card>        
    );
}