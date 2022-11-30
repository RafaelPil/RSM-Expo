import {
  View,
  Text,
  SafeAreaView,
  Image,
  StatusBar,
  FlatList,
} from 'react-native';
import React from 'react';

import {COLORS, SHADOWS, SIZES, assets} from '../constants';
import {
  CircleButton,
  PostCity,
  PostPrice,
  PostTitle,
  FocusedStatusBar,
  RectButton,
  PostDetails,
} from '../components';
import {useRoute} from '@react-navigation/native';
import {dummyPosts} from '../constants';

const DetailsScreen = ({data}) => {
  const route = useRoute();
  //console.log(route.params);
  const post = dummyPosts.find(p => p.id === route.params.postId);

  return (
    <>
      <PostDetails post={post} />
    </>
  );
};

export default DetailsScreen;
