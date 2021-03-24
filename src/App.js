import { Box, Container, makeStyles } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, listPosts } from "./actions/postActions";
import Post from "./components/post";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  post: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  statisticsGrid: {
    order: 0,
    textAlign: "center"
  },
  postGrid: {
    order: 1
  },
  statisticsContainer: {
    backgroundColor: "#CCC", 
    padding: "5px 5px", 
    borderRadius: "20px", 
    border: "5px solid orange"
  },
  wordFrequencyText: {
    color: "orange", 
    fontSize: "20px"
  }
}));

function App() {
  const classes = useStyles();
  let wordFrequency= {}; //could be moved to redux store because looks like global state almost.
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.post);
  const { loading, error, posts } = postList;

  useEffect(() => {
    dispatch(listPosts());
  }, [dispatch])

  const incrementWordFrequencyMap = (title, body) => {
    let dict = wordFrequency;
    const titleWords = title.trim().split(/\s+/);
    const bodyWords = body.trim().split(/\s+/);
    let words = titleWords.concat(bodyWords);
    words.forEach((w) => {
      if(dict[w] !== undefined) {
        dict[w] += 1;
      } else {
        dict[w] = 1;
      }
    });
    wordFrequency = dict;
  }

  const decrementWordFrequencyMap = (title, body) => {
    let dict = wordFrequency;
    const titleWords = title.trim().split(/\s+/);
    const bodyWords = body.trim().split(/\s+/);
    let words = titleWords.concat(bodyWords);
    words.forEach((w) => {
      if(dict[w] !== 1) {
        delete dict[w];
      } else if(dict[w] !== undefined){
        dict[w] -= 1;
      }
    });
    wordFrequency = dict;
  }

  const findTopFive = (wordsMap) => {
    let sortedWords = Object.keys(wordsMap).sort((a, b) => wordsMap[b] - wordsMap[a]);
    let topFiveWords = sortedWords.slice(0, 5);
    let res = [];
    topFiveWords.forEach((word) => {
      let wordObj = {word: word, freq: wordsMap[word]};
      res.push(wordObj);
    });
    return res;
  }

  const deletePostHandler = (id, title, body) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deletePost(id));
      decrementWordFrequencyMap(title, body);
    }
  }

  if(error) {
    return (
      <h1>Error occured: {error}</h1>
    );
  }

  if(loading) {
    return(
      <h1>Loading...</h1>
    );   
  }
  return (
    <div className="App">
      <Grid container spacing={3}>
        {
          posts.map(post => {
            incrementWordFrequencyMap(post.title, post.body);
            return (
              <Grid item xs={3} key={post.id} className={classes.postGrid}>
                    <Post className={classes.post} {...post} deletePostHandler={deletePostHandler} />
              </Grid>     
            );
          })
        }

        <Grid item xs={12} className={classes.statisticsGrid}>
          <Container maxWidth="sm" className={classes.statisticsContainer}>
            <h2>Top Five Words</h2>
            {
            findTopFive(wordFrequency).map(wordObj => {
                return (
                  <p className={classes.wordFrequencyText}>{wordObj.word} - {wordObj.freq}</p>
                );
              })
            }
          </Container>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
