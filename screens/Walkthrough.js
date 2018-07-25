import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '../application/components/Button/Button';
import { goToPinSetup } from '../application/redux/actions/navigation';


const Walkthrough = props => (
  <View>
    <View>
      <Text>Walkthrough</Text>
    </View>
    <View style={{ flexDirection: 'row' }}>
      <Button
        name="Continue"
        onPress={() => props.goToPinSetup(props.navigation)}
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
  navigation: PropTypes.shape({}).isRequired,
};

const mapStateToProps = ({ navigation }) => ({
  navigation,
});

const mapDispatchToProps = dispatch => ({
  goToPinSetup: (navigation) => {
    dispatch(goToPinSetup(navigation));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Walkthrough);
