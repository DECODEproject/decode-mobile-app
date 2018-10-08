import React from 'react';
import { Dimensions, Image, View } from 'react-native';
import PropTypes from 'prop-types';
import HTML from 'react-native-render-html';
import styles from '../../../screens/styles';
import LinkButton from '../LinkButton/LinkButton';

const fallbackImage = require('../../../assets/images/square-city-red.png');

class PetitionDescription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFullDescription: false,
    };
  }

  renderPartialDescriptionText = () => (
    <View>
      <HTML
        id="description-text"
        style={styles.petitionDescription}
        html={`${this.props.description.slice(0, 100)}&hellip;`}
        imagesMaxWidth={Dimensions.get('window').width}
      />
      <LinkButton
        name="Read more"
        onPress={() => this.setState({ showFullDescription: true })}
      />
    </View>
  );


  renderFullDescriptionText = () => (
    <View>
      <HTML
        id="description-text"
        style={styles.petitionDescription}
        html={this.props.description}
        imagesMaxWidth={Dimensions.get('window').width}
      />
    </View>
  );

  render() {
    return (
      <View>
        <Image
          source={fallbackImage}
          style={{ width: 64, height: 64 }}
        />
        { this.state.showFullDescription ?
            this.renderFullDescriptionText() :
            this.renderPartialDescriptionText() }
      </View>
    );
  }
}

PetitionDescription.propTypes = {
  description: PropTypes.string.isRequired,
};

PetitionDescription.defaultProps = {
};

export default PetitionDescription;
