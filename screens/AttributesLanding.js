import React from 'react';
import { Text, FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AttributeListItem from '../application/components/AttributeListItem/AttributeListItem';
import styles from './styles';


class AttributesLanding extends React.Component {
  static renderEmpty() {
    return (
      <View style={styles.authorisationContainer}>
        <Text>You have no data :(</Text>
      </View>
    );
  }

  attributeExists() {
    return this.props.attributes.length > 0;
  }

  renderListAttributes() {
    return (
      <View style={styles.signOutcomeBox}>
        <FlatList
          data={this.props.attributes}
          renderItem={attribute => <AttributeListItem attribute={attribute} />}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }

  render() {
    if (!this.attributeExists()) {
      return AttributesLanding.renderEmpty();
    }
    return this.renderListAttributes();
  }
}


AttributesLanding.propTypes = {
  attributes: PropTypes.arrayOf(PropTypes.shape({
    predicate: PropTypes.string.isRequired,
    object: PropTypes.string.isRequired,
  })).isRequired,
};

const mapStateToProps = state => ({
  attributes: state.attributes.list,
});

export default connect(mapStateToProps)(AttributesLanding);
