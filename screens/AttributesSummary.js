import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, Text, Dimensions, ScrollView } from 'react-native';
import { translate } from 'react-i18next';
import { goToAttributesVerification } from '../application/redux/actions/navigation';
import LinkButton from '../application/components/LinkButton/LinkButton';
import RequesterInfo from '../application/components/RequesterInfo/RequesterInfo';
import PetitionDescription from '../application/components/PetitionDescription/PetitionDescription';
import Logo from '../application/components/ScreenLogo/ScreenLogo';
import openPetitionInBrowser from '../application/utils';
import styles from './styles';
import i18n from '../i18n';

class AttributesSummary extends React.Component {

  render() {
    const { petition, t } = this.props;
    const {height: windowHeight} = Dimensions.get('window');
    return (
      <ScrollView style={styles.petitionSummaryContainer} contentContainerStyle={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: windowHeight,
      }}>
        <Logo/>
        <View style={{ flex: 1, paddingTop: 20}}>
          <PetitionDescription
            title={petition.title}
            description={petition.description}
          />

          <View
            style={{
              marginTop: 10,
              borderBottomColor: '#80979797',
              borderBottomWidth: 1,
            }}
          />

          <RequesterInfo name={petition.requester} />

          <View style={{ paddingBottom: 20 }}>
            <Text style={{ color: '#9B9B9B', fontSize: 14 }}>
              <Text style={{ color: '#D0021B' }}>*</Text> {t('requiredAttributes')}
            </Text>
          </View>

          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
            {
              petition.attributes.mandatory[0].verificationInput ? (
                <React.Fragment>
                  <Text>
                    {t(petition.attributes.mandatory[0].predicate)} <Text style={{ color: '#D0021B' }}>*</Text>
                  </Text>
                  <LinkButton
                    name={t('button')}
                    onPress={() => this.props.goToAttributesVerification()}
                    style={{
                      marginTop: 40,
                      alignSelf: 'center',
                    }}
                  />
                </React.Fragment>
              ) : null
            }
          </View>

          <View style={{
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingBottom: 20,
          }}
          >
            <Text
              style={styles.cancelSigningPetition}
              onPress={() => openPetitionInBrowser(petition.id)}
            >{t('cancel')}
            </Text>
          </View>
        </View>

      </ScrollView>
    );
  }
}

AttributesSummary.propTypes = {
  petition: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    closingDate: PropTypes.string,
    attributes: PropTypes.shape({
      mandatory: PropTypes.arrayOf(PropTypes.shape({
        provenance: PropTypes.shape({
          url: PropTypes.string,
        }),
      })),
    }),
  }),
  goToAttributesVerification: PropTypes.func.isRequired,
  walletId: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

AttributesSummary.defaultProps = {
  petition: undefined,
};

const mapStateToProps = state => ({
  petition: state.petition.petition,
  walletId: state.wallet.id,
});

const mapDispatchToProps = dispatch => ({
  goToAttributesVerification: () => { dispatch(goToAttributesVerification()); },
});

export default translate('attributesSummary', { i18n })(connect(mapStateToProps, mapDispatchToProps)(AttributesSummary));
