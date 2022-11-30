import {View, Text, Image, Pressable, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {COLORS, SHADOWS, SIZES, assets} from '../constants';
import {PostCity, PostTitle, PostImg, PostPrice} from './PostInfo';
import AntDesign from 'react-native-vector-icons/AntDesign';

const PostCard = props => {
  const navigation = useNavigation();

  const [data, setData] = useState(props.data);
  const [isLiked, setIsLiked] = useState([]);
  const [likeState, setLikeState] = useState(false);
  const id = data.id;

  const onLikePress = () => {
    if (isLiked.includes(id) && likeState === true) {
      setIsLiked(prev => prev.filter(_id => _id !== id));
      setLikeState(false);
    } else {
      setIsLiked(prev => [...prev, id]);
      setLikeState(true);
    }
  };

  const toDetails = () => {
    navigation.navigate('Details', {postId: data.id});
  };

  return (
    <View
      style={{
        backgroundColor: COLORS.white,
        borderRadius: SIZES.font,
        marginBottom: SIZES.extraLarge,
        margin: SIZES.base,
        ...SHADOWS.dark,
      }}>
      <Pressable onPress={toDetails} style={{width: '100%', height: 250}}>
        <Image
          source={{uri: data.img}}
          resizeMode="cover"
          style={{
            width: '100%',
            height: '100%',
            borderTopLeftRadius: SIZES.font,
            borderTopRightRadius: SIZES.font,
          }}
        />
      </Pressable>
      <TouchableOpacity
        onPress={onLikePress}
        style={{
          width: 40,
          height: 40,
          backgroundColor: COLORS.white,
          position: 'absolute',
          borderRadius: SIZES.extraLarge,
          alignItems: 'center',
          justifyContent: 'center',
          ...SHADOWS.light,
          top: 10,
          right: 10,
        }}>
        <AntDesign name="hearto" size={24} color={likeState ? 'red' : 'grey'} />
      </TouchableOpacity>

      <View style={{width: '100%', padding: SIZES.font}}>
        <PostTitle
          title={data.aprasymas}
          price={data.kaina}
          city={data.miestas}
        />
      </View>
    </View>
  );
};

export default PostCard;
