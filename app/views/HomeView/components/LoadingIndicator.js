import React from 'react';
import {View} from 'react-native';
import {themes} from '../../../constants/colors';
import styles from '../styles';

const LoadingIndicator = ({theme}) => (
  <View style={styles.productCategories}>
    {Array.from({length: 9}).map((_, index) => (
      <View style={styles.categoryContainer} key={index}>
        <View
          style={[
            styles.categoryImageContent,
            {backgroundColor: themes[theme].bannerBackground, borderRadius: 8},
          ]}
        >
          <View style={styles.categoryImage} />
        </View>
        <View
          style={[
            styles.categoryText,
            {
              backgroundColor: themes[theme].bannerBackground,
              height: 18,
              width: 60,
              marginTop: 8,
              borderRadius: 8,
            },
          ]}
        />
      </View>
    ))}
  </View>
);

export default LoadingIndicator;
