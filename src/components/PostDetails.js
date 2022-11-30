import {
  View,
  Text,
  SafeAreaView,
  Image,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';

import {COLORS, SHADOWS, SIZES, assets} from '../constants';
import {
  FocusedStatusBar,
  RectButton,
  ChatButton,
  CircleButton,
} from '../components';
import {useNavigation} from '@react-navigation/native';
import {PostTitle} from '../components';
import AntDesign from 'react-native-vector-icons/AntDesign';

const PostDetailsHeader = ({post}) => {
  const navigation = useNavigation();
  const [postData, setPostData] = useState(post);

  return (
    <View style={{width: '100%', height: 373}}>
      <Image
        source={{uri: postData.img}}
        resizeMode="cover"
        style={{width: '100%', height: '100%'}}
      />
      <CircleButton
        imgUrl={assets.left}
        handlePress={() => navigation.goBack()}
        left={15}
        top={StatusBar.currentHeight + 10}
      />

      <TouchableOpacity
        onPress={() => console.log('heart manin')}
        style={{
          width: 40,
          height: 40,
          backgroundColor: COLORS.white,
          position: 'absolute',
          borderRadius: SIZES.extraLarge,
          alignItems: 'center',
          justifyContent: 'center',
          ...SHADOWS.light,
          top: StatusBar.currentHeight + 10,
          right: 10,
        }}>
        <AntDesign name="hearto" size={24} />
      </TouchableOpacity>
    </View>
  );
};

const PostDetails = ({post}) => {
  const [postData, setPostData] = useState(post);

  return (
    <SafeAreaView style={{flex: 1}}>
      <FocusedStatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        transLucent={true}
      />

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          paddingVertical: SIZES.font,
          right: 10,
          left: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <RectButton
          minWidth={170}
          fontSize={SIZES.large}
          {...SHADOWS.dark}
          tel={postData.telefonas}
        />
        <ChatButton minWidth={170} fontSize={SIZES.large} {...SHADOWS.dark} />
      </View>

      <PostDetailsHeader post={postData} />

      <View style={{padding: SIZES.font}}>
        <PostTitle
          title={postData.aprasymas}
          price={postData.kaina}
          city={postData.miestas}
        />
      </View>

      <View style={{padding: SIZES.font}}>
        <Text
          style={{
            fontSize: SIZES.large,
            fontWeight: 'bold',
            color: COLORS.primary,
          }}>
          Aprašymas
        </Text>
        <View style={{marginTop: SIZES.base}}></View>
        <Text
          style={{
            fontSize: SIZES.small,
            color: COLORS.secondary,
            lineHeight: SIZES.large,
          }}>
          {postData.detalusAprasymas}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default PostDetails;
