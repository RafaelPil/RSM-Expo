import {
  FlatList,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import {dummyPosts} from '../constants';
import SavedPostComponent from '../components/SavedPostComponent';
import HeaderComponent from '../components/HeaderComponent';

const SavedPostScreen = ({isLiked}) => {
  const [data, setData] = useState(dummyPosts);
  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => <SavedPostComponent data={item} />}
        ListHeaderComponent={<HeaderComponent headerTitle={'Įsiminti seklbimai'} />}
      />
    </SafeAreaView>
  );
};

export default SavedPostScreen;
