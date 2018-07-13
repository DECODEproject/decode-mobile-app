import React from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class AttributesLanding extends React.Component {
  nonVerifiedAttributeExists() {
    return this.props.attributes.nonVerified.length !== 0;
  }

  render() {
    const renderList = attributes => attributes.map(attribute => (
      <Text key={attribute.name}>{attribute.name}</Text>
    ));

    if (this.nonVerifiedAttributeExists()) {
      return (<div>{renderList(this.props.attributes.nonVerified)}</div>);
    }
    return (<Text>You have no data :(</Text>);
  }
}

AttributesLanding.propTypes = {
  attributes: PropTypes.shape({
    nonVerified: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
};

const mapStateToProps = state => ({
  attributes: state.attributes,
});

export default connect(mapStateToProps)(AttributesLanding);
