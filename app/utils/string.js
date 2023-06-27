import React from 'react';
import {Text, View} from 'react-native';
import {decode} from 'html-entities';

export function removeTags(str) {
  const regex = /(<([^>]+)>)/gi;
  return str.replace(regex, '');
}

export function getPriceText(html) {
  const hidden_regex = /(<del aria-hidden="true">)/i;

  if (hidden_regex.test(html)) {
    const delIndex = html.indexOf('</del>') + 7;
    const hidden_str = html.substr(0, delIndex);

    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{textDecorationLine: 'line-through'}}>
          {decode(removeTags(hidden_str))}
        </Text>
        <Text>{decode(removeTags(html.substr(delIndex)))}</Text>
      </View>
    );
  }
  return decode(removeTags(html));
}

export function removeAmps(str) {
  return str.replace(/&amp;/g, '&');
}
