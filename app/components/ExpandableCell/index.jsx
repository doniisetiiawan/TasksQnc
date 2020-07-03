/* eslint-disable react/no-access-state-in-setstate */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  LayoutAnimation,
  Text,
  TouchableHighlight,
  View,
  Platform,
  UIManager,
} from 'react-native';
import styles from './styles';

if (
  Platform.OS === 'android'
  && UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

class ExpandableCell extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    };
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillUpdate = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.Presets.linear,
    );
  };

  _expandCell = () => {
    this.setState({
      expanded: !this.state.expanded,
    });
  };

  render() {
    return (
      <View style={styles.expandableCellContainer}>
        <View>
          <TouchableHighlight
            onPress={() => this._expandCell()}
            underlayColor="#D3D3D3"
          >
            <Text style={styles.visibleContent}>
              {this.props.title}
            </Text>
          </TouchableHighlight>
        </View>
        <View
          style={[
            styles.hiddenContent,
            this.state.expanded ? {} : { maxHeight: 0 },
          ]}
        >
          {this.props.children}
        </View>
      </View>
    );
  }
}

export default ExpandableCell;

ExpandableCell.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};
