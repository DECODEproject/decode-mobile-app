import React from 'react';
import { Text, FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AttributeListItem from '../application/components/AttributeListItem/AttributeListItem';
import Button from '../application/components/Button/Button';
import { goToNewAttributes } from '../application/redux/actions/navigation';
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
    const listComponent = this.attributeExists()
      ? this.renderListAttributes()
      : AttributesLanding.renderEmpty();

    return (
      <View style={styles.attributesManagementContainer}>
        {listComponent}
        <Button
          name="Add attribute"
          onPress={() => this.props.goToNewAttributes()}
        />
      </View>
    );
  }
}

AttributesLanding.propTypes = {
  attributes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  goToNewAttributes: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  attributes: state.attributes.list,
});

const mapDispatchToProps = dispatch => ({
  goToNewAttributes: () => dispatch(goToNewAttributes()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AttributesLanding);
