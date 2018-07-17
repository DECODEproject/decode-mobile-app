import React from 'react';
import { Text, FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AttributeListItem from '../application/components/AttributeListItem/AttributeListItem';
import styles from './styles';


class AttributesLanding extends React.Component {
  static renderEmpty() {
    return (
      <View style={styles.attributesLandingContainer}>
        <Text>You have no data :(</Text>
      </View>
    );
  }

  attributeExists() {
    return this.props.attributes.length > 0;
  }

  renderListAttributes() {
    return (
      <View style={styles.attributesLandingContainer}>
        <FlatList
          data={this.props.attributes}
          renderItem={attribute => <AttributeListItem attribute={attribute} />}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }

  render() {
    return this.attributeExists() ? this.renderListAttributes() : AttributesLanding.renderEmpty();
  }
}

AttributesLanding.propTypes = {
  attributes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = state => ({
  attributes: state.attributes.list,
});

export default connect(mapStateToProps)(AttributesLanding);
