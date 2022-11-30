import {FlatList, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import HeaderComponent from '../components/HeaderComponent';
import {dummyPosts} from '../constants';
import MyPostComponent from '../components/MyPostComponent';

const MyPostsScreen = () => {
  const [data, setData] = useState(dummyPosts);
  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => <MyPostComponent data={item} />}
        ListHeaderComponent={<HeaderComponent headerTitle={'Mano skelbimai'} />}
      />
    </SafeAreaView>
  );
};

export default MyPostsScreen;
