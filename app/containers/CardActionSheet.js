import React from 'react';
import PropTypes from 'prop-types';
import {Image, StyleSheet, View} from 'react-native';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import images from '../assets/images';
import CardInput from './CardInput';
import {themes} from '../constants/colors';

const styles = StyleSheet.create({
  actionContainer: {
    padding: 16,
  },
  initLogos: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    marginHorizontal: 12,
    width: 52,
    height: 32,
    resizeMode: 'contain',
  },
});

const CARD_ACTION_SHEET_HEIGHT = 324;

const CardActionSheet = ({
  sheetRef,
  hideActionSheet,
  billingName,
  onSaveCard,
  theme,
}) => (
  <BottomSheet
    draggable={true}
    hasDraggableIcon
    ref={sheetRef}
    sheetBackgroundColor={themes[theme].focusedBackground}
    height={CARD_ACTION_SHEET_HEIGHT}
  >
    <View style={styles.actionContainer}>
      <View style={styles.initLogos}>
        <Image source={images.visa_card_logo} style={styles.logoIcon} />
        <Image source={images.master_card_logo} style={styles.logoIcon} />
        <Image source={images.american_express_logo} style={styles.logoIcon} />
      </View>
      <CardInput
        billingName={billingName}
        onSave={card => {
          hideActionSheet();
          onSaveCard(card);
        }}
        theme={theme}
      />
    </View>
  </BottomSheet>
);

CardActionSheet.propTypes = {
  sheetRef: PropTypes.func.isRequired,
  hideActionSheet: PropTypes.func,
  onSaveCard: PropTypes.func,
  theme: PropTypes.string,
};

export default CardActionSheet;
