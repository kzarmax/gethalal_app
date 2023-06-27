import TextInput from './TextInput';
import I18n from '../i18n';
import {CardField} from '@stripe/stripe-react-native';
import {COLOR_BLACK_900, COLOR_GRAY_100} from '../constants/colors';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import images from '../assets/images';
import Button from './Button';
import React, {useState} from 'react';

const styles = StyleSheet.create({
  cardDetailContainer: {},
  checkContainer: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  defaultCheckIcon: {
    padding: 4,
    width: 26,
    height: 26,
    resizeMode: 'contain',
  },
  defaultText: {
    marginLeft: 12,
    color: COLOR_BLACK_900,
    fontSize: 14,
    lineHeight: 18,
  },
  actionContainer: {
    marginTop: 16,
    marginBottom: 32,
  },
  submitBtn: {},
});

export default React.memo(({billingName, onSave, theme}) => {
  const [isDefaultCard, setDefaultCard] = useState(false);
  const [name, setName] = useState(billingName);
  const [cardDetail, setCardDetail] = useState({});

  return (
    <View style={styles.cardDetailContainer}>
      <TextInput
        defaultValue={name}
        placeholder={I18n.t('Enter_your_name')}
        returnKeyType="next"
        keyboardType="default"
        textContentType="oneTimeCode"
        onChangeText={value => setName(value)}
        theme={theme}
      />
      <CardField
        postalCodeEnabled={false}
        placeholder={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={{
          backgroundColor: COLOR_GRAY_100,
          borderRadius: 8,
          textColor: '#000000',
        }}
        style={{
          width: '100%',
          height: 52,
          marginTop: 16,
        }}
        onCardChange={cardDetails => {
          setCardDetail(cardDetails);
        }}
      />
      <TouchableOpacity
        onPress={() => setDefaultCard(!isDefaultCard)}
        style={styles.checkContainer}
      >
        <Image
          source={isDefaultCard ? images.icon_check : images.icon_uncheck}
          style={styles.defaultCheckIcon}
        />
        <Text style={styles.defaultText}>
          {I18n.t('Save_card_for_default')}
        </Text>
      </TouchableOpacity>
      <View style={styles.actionContainer}>
        <Button
          style={styles.submitBtn}
          title={I18n.t('Save')}
          type="primary"
          size="W"
          onPress={() =>
            onSave({name: name, card: cardDetail, is_default: isDefaultCard})
          }
          theme={theme}
        />
      </View>
    </View>
  );
});
