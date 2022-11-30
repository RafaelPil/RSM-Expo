import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import {COLORS, SIZES, SHADOWS, assets} from '../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';

export const CircleButton = ({imgUrl, handlePress, ...props}) => {
  return (
    <TouchableOpacity
      style={{
        width: 40,
        height: 40,
        backgroundColor: COLORS.white,
        position: 'absolute',
        borderRadius: SIZES.extraLarge,
        alignItems: 'center',
        justifyContent: 'center',
        ...SHADOWS.light,
        ...props,
      }}
      onPress={handlePress}>
      <Image
        source={imgUrl}
        resizeMode="contain"
        style={{width: 24, height: 24}}
      />
    </TouchableOpacity>
  );
};

export const RectButton = ({
  minWidth,
  fontSize,
  handlePress,
  tel,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.extraLarge,
        minWidth: minWidth,
        padding: SIZES.small,
        ...props,
      }}
      onPress={handlePress}>
      <Text
        style={{
          fontSize: fontSize,
          color: COLORS.white,
          textAlign: 'center',
          fontWeight: '500',
        }}>
        {tel}
      </Text>
    </TouchableOpacity>
  );
};

export const ChatButton = ({
  minWidth,
  fontSize,
  handlePress,
  tel,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.extraLarge,
        minWidth: minWidth,
        padding: SIZES.small,
        ...props,
      }}
      onPress={handlePress}>
      <Text
        style={{
          fontSize: fontSize,
          color: COLORS.white,
          textAlign: 'center',
          fontWeight: '500',
        }}>
        Pokalbis
      </Text>
    </TouchableOpacity>
  );
};
