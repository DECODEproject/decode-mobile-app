import React from 'react';
import { Text, FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AttributeListItem from '../application/components/AttributeListItem/AttributeListItem';
import Button from '../application/components/Button/Button';
import styles from './styles';


class AttributesLanding extends React.Component {
  static renderEmpty() {
    return (
      <Text>You have no data :(</Text>
    );
  }

  attributeExists() {
    return this.props.attributes.length > 0;
  }

  renderListAttributes() {
    return (
      <FlatList
        data={this.props.attributes}
        renderItem={attribute => <AttributeListItem attribute={attribute} />}
        keyExtractor={(item, index) => index}
      />
    );
  }

  render() {
    const listComponent = this.attributeExists() ? this.renderListAttributes() : AttributesLanding.renderEmpty();
    return (
      <View style={styles.attributesLandingContainer}>
        {listComponent}
        <Button name="Add attribute" />
      </View>
    )
  }
}

AttributesLanding.propTypes = {
  attributes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = state => ({
  attributes: state.attributes.list,
});

export default connect(mapStateToProps)(AttributesLanding);
