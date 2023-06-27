import {Modal, StyleSheet, Text, View} from 'react-native';
import {COLOR_BLACK_900, themes} from '../constants/colors';
import I18n from '../i18n';
import Button from './Button';
import React from 'react';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 343,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
    color: COLOR_BLACK_900,
  },
  modalSubTitle: {
    marginTop: 20,
    fontSize: 16,
    lineHeight: 20,
    color: COLOR_BLACK_900,
  },
  actionContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

const RemoveAddressModal = React.memo(
  ({theme, showRemoveConfirm, onRemove, onCancel}) => {
    return (
      <Modal transparent onDismiss={onCancel} visible={showRemoveConfirm}>
        <View
          style={[
            styles.modalContainer,
            {backgroundColor: themes[theme].modalBackground},
          ]}
        >
          <View
            style={[
              styles.modalContent,
              {backgroundColor: themes[theme].focusedBackground},
            ]}
          >
            <Text style={styles.modalTitle}>{I18n.t('Remove_address')}</Text>
            <Text style={styles.modalSubTitle}>
              {I18n.t('Remove_address_caption')}
            </Text>
            <Text style={styles.actionContainer}>
              <Button
                style={styles.actionBtn}
                title={I18n.t('No')}
                type="white"
                size="X"
                onPress={onCancel}
                theme={theme}
              />
              <Button
                style={styles.actionBtn}
                title={I18n.t('Yes')}
                type="primary"
                size="X"
                onPress={onRemove}
                theme={theme}
              />
            </Text>
          </View>
        </View>
      </Modal>
    );
  },
);

export default RemoveAddressModal;
