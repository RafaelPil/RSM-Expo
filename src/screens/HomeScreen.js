import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {FocusedStatusBar, HomeHeader, PostCard} from '../components';
import {COLORS, dummyPosts, SHADOWS, SIZES} from '../constants';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const [data, setData] = useState(dummyPosts);

  const navigation = useNavigation();

  const handleSearch = value => {
    if (!value.length) {
      return setData(dummyPosts);
    }

    const filteredData = data.filter(item =>
      item.aprasymas.toLowerCase().includes(value.toLowerCase()),
    );

    if (filteredData.length) {
      setData(filteredData);
    } else {
      setData(dummyPosts);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <FocusedStatusBar backgroundColor={COLORS.primary} />

      <View style={{flex: 1}}>
        <View style={{zIndex: 0}}>
          <FlatList
            data={data}
            keyExtractor={item => item.id}
            renderItem={({item}) => <PostCard data={item} />}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={<HomeHeader onSearch={handleSearch} />}
          />
        </View>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('Messages')}
        style={styles.chatContainer}>
        <View style={styles.chatInContainer}>
          <Entypo name="chat" size={24} color={COLORS.white} />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  chatContainer: {
    width: 60,
    height: 60,
    backgroundColor: COLORS.white,
    position: 'absolute',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.light,
    right: 10,
    bottom: 10,
    borderWidth: 3,
    borderColor: COLORS.gray,
  },
  chatInContainer: {
    backgroundColor: COLORS.primary,
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.light,
  },
});

export default HomeScreen;
