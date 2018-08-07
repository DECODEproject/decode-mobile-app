import React from 'react';
import { Text, FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import AttributeListItem from '../application/components/AttributeListItem/AttributeListItem';
import Button from '../application/components/Button/Button';
import { goToNewAttributes } from '../application/redux/actions/navigation';
import styles from './styles';
import i18n from '../i18n';


class AttributesLanding extends React.Component {
  attributeExists() {
    return this.props.attributes.size > 0;
  }

  renderListAttributes() {
    return (
      <FlatList
        data={[...this.props.attributes.values()]}
        renderItem={attribute => <AttributeListItem attribute={attribute} />}
        keyExtractor={item => item.predicate}
      />
    );
  }

  renderEmpty() {
    return (
      <Text>{this.props.t('nodata')}</Text>
    );
  }

  render() {
    const listComponent = this.attributeExists()
      ? this.renderListAttributes()
      : this.renderEmpty();

    return (
      <View style={styles.attributesManagementContainer}>
        {listComponent}
        <Button
          name={this.props.t('add')}
          onPress={() => this.props.goToNewAttributes()}
        />
      </View>
    );
  }
}

AttributesLanding.propTypes = {
  attributes: PropTypes.instanceOf(Map).isRequired,
  goToNewAttributes: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  attributes: state.attributes.list,
});

const mapDispatchToProps = dispatch => ({
  goToNewAttributes: () => dispatch(goToNewAttributes()),
});

export default translate('attributesLanding', { i18n })(connect(mapStateToProps, mapDispatchToProps)(AttributesLanding));
