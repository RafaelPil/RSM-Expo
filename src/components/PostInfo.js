import {View, Text} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../constants';
import {FONTS} from '../constants/theme';

export const PostTitle = ({title, price, city}) => {
  return (
    <View>
      <Text
        style={{
          fontSize: SIZES.large,
          color: COLORS.primary,
        }}>
        {title}
      </Text>
      <Text
        style={{
          fontSize: SIZES.medium,
          color: COLORS.primary,
          fontWeight: 'bold',
        }}>
        {price}€/val
      </Text>
      <Text
        style={{
          fontSize: SIZES.font,
          color: COLORS.gray,
        }}>
        {city}
      </Text>
    </View>
  );
};

export const PostPrice = () => {
  return (
    <View>
      <Text>SubInfo</Text>
    </View>
  );
};

export const PostCity = () => {
  return (
    <View>
      <Text>SubInfo</Text>
    </View>
  );
};
