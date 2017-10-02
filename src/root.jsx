import React from 'react';
import ReactDOM from 'react-dom';
import Pubsub from 'pubsub-js'
import { Router, IndexRoute, Link, Route, hashHistory } from 'react-router'

import Header from './components/header.jsx';
import Player from './pages/Player.jsx';
import MusicList from './pages/MusicList.jsx';

import { MUSIC_LIST } from './config/musicList.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      musicList: MUSIC_LIST,
      currentMusicItem: MUSIC_LIST[0]
    }
  };
  playMusic(musicItem) {
    $('#player').jPlayer('setMedia', {
      mp3: musicItem.file
    }).jPlayer('play')
    this.setState({
      currentMusicItem: musicItem
    })

  };
  playNext(type = "next") {
    let cur = this.state.musicList.indexOf(this.state.currentMusicItem);
    let newIdx;
    if(type === "next") {
      newIdx = (cur + 1) % this.state.musicList.length
    }else {
      newIdx = (cur - 1 + this.state.musicList.length) % this.state.musicList.length
    }
    this.setState({
      currentMusicItem: this.state.musicList[newIdx]
    })
    if(this.state.musicList.length>0) {
      this.playMusic(this.state.currentMusicItem)
    }
  };
  componentDidMount() {
    $('#player').jPlayer({
      supplied: 'mp3',
      wmode: 'window'
    });

    this.playMusic(this.state.currentMusicItem);

    $('#player').bind($.jPlayer.event.ended, (e) => {
      this.playNext()
    })

    Pubsub.subscribe('PLAY_MUSIC', (msg, musicItem) => {
      this.playMusic(musicItem)
    });
    Pubsub.subscribe('DELETE_MUSIC', (msg, musicItem) => {
      this.setState({
        musicList: this.state.musicList.filter(item => {
          return item !== musicItem
        })
      })
      if(this.state.currentMusicItem === musicItem) {
        this.playNext()
      }
      
      if(!(this.state.musicList.length>0)) {
        $('#player').jPlayer('pause')
      }

      // console.log(111)
    });
    Pubsub.subscribe('PLAY_NEXT', (msg, type) => {
      this.playNext(type)
    });
  };
  componentWillUnMount() {
    Pubsub.unsubscribe('PLAY_MUSIC')
    Pubsub.unsubscribe('DELETE_MUSIC')
    Pubsub.unsubscribe('PLAY_NEXT')
    $('#player').unbind($.jPlayer.event.ended)
  };
  render() {
    return (
      <div >
        <Header />
        <div id="player"></div>
        {/* <Player currentMusicItem={ this.state.currentMusicItem }/> */}
        {/* <MusicList currentMusicItem={this.state.currentMusicItem} musicList={this.state.musicList} /> */}
        {React.cloneElement(this.props.children, this.state)}
      </div >
    )
  }
}

class Root extends React.Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Player}></IndexRoute>
          <Route path="/list" component={MusicList}></Route>
        </Route>
      </Router>
    )
  }
}

ReactDOM.render(
  <Root />,
  document.getElementById('kk')
);