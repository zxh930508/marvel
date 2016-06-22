/**
* @flow
*/

'use strict';
var React = require('react');
var StyleSheet = require('StyleSheet');
var Animated = require('Animated');
var Image = require('Image');
var Text = require('Text');
var {connect} = require('react-redux');
var View = require('View');

class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anim : new Animated.Value(0),
    };
  }

  componentDidMount() {
    Animated.timing(this.state.anim, {toValue:3000, duration:3000}).start();
  }

  render() {
    return (
      <Animated.Image style={[styles.container, this.fadeIn(0, 0)]}
        source={require('./img/splash-background.jpg')}>
        <View style={{flex:1}}/>
        <View>
          <Animated.Image style={[styles.marvellogo, this.fadeIn(2500, 20)]}
          source={require('./img/marvel-logo.png')}/>
          <Animated.Text style={[styles.marvelinfo,this.fadeIn(2500, 20)]}>
          Data provided by Marvel. © 2014 Marvel.
          </Animated.Text>
        </View>
      </Animated.Image>
    );
  }

  fadeIn(delay, from=0) {
    const {anim} = this.state;
    return {
      opacity: anim.interpolate({
        inputRange:[delay, Math.min(delay + 500, 3000)],
        outputRange:[0, 1],
        extrapolate:'clamp',
      }),

      transform: [{
        translateY: anim.interpolate({
          inputRange:[delay, Math.min(delay+500, 3000)],
          outputRange:[from, 0],
          extrapolate:'clamp',
        }),
      }],
    };
  }
}

var styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'transparent',
    width: undefined,
    height: undefined,
    flexDirection: 'column',
  },

  marvellogo: {
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  marvelinfo: {
    marginBottom: 24,
    fontSize: 12,
    color: '#032250',
    textAlign: 'center',
  },
});

module.exports = connect()(SplashScreen);
