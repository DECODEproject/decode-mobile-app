import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '../application/components/Button/Button';
import { goToPinSetup } from '../application/redux/actions/navigation';
import styles from './styles';


const Walkthrough = props => (
  <View style={styles.walkthroughContainer}>
    <View>
      <Text>Walkthrough</Text>
    </View>
    <View style={{ flexDirection: 'row' }}>
      <Button
        name="Continue"
        onPress={() => props.goToPinSetup()}
        style={{
          width: 150,
          alignItems: 'center',
        }}
      />
    </View>
  </View>
);


Walkthrough.propTypes = {
  goToPinSetup: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  goToPinSetup: () => dispatch(goToPinSetup()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Walkthrough);
