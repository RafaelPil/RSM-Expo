import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, dummyPosts, SHADOWS, SIZES} from '../constants';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import HeaderComponent from '../components/HeaderComponent';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Animated from 'react-native-reanimated';
import {createRef} from 'react';

const AddPost = () => {
  const navigation = useNavigation();
  const [data, setData] = useState(dummyPosts);

  const {height, width} = useWindowDimensions();

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [city, setCity] = useState('');
  const [longDesc, setLongDesc] = useState('');
  const [imageUri, setImageUri] = useState(
    'https://pub-static.fotor.com/assets/projects/pages/d5bdd0513a0740a8a38752dbc32586d0/fotor-03d1a91a0cec4542927f53c87e0599f6.jpg',
  );

  const bs = createRef();
  const fall = new Animated.Value(1);

  const addPost = () => {
    const newPost = {
      id: Math.random(),
      aprasymas: title,
      detalusAprasymas: longDesc,
      kaina: price,
      miestas: city,
    };
    setData([...data, newPost]);
    navigation.navigate('Pagrindinis');
    setTitle('');
    setPrice('');
    setCity('');
    setLongDesc('');
    setImageUri(
      'https://pub-static.fotor.com/assets/projects/pages/d5bdd0513a0740a8a38752dbc32586d0/fotor-03d1a91a0cec4542927f53c87e0599f6.jpg',
    );
    console.log('Success');
    console.log(title);
  };

  return (
    <SafeAreaView>
      
      <HeaderComponent headerTitle={'Įdėkite skelbimą'} />
      <Animated.View
        style={{
          opacity: Animated.add(0.3, Animated.multiply(fall, 1.0)),
        }}>
        <View style={{margin: 20}}>
          <View style={styles.container}>
            <TextInput
              placeholder="Aprasymas"
              value={title}
              onChangeText={text => setTitle(text)}
            />
          </View>

          <View style={styles.container}>
            <TextInput
              placeholder="Kaina"
              value={price}
              onChangeText={text => setPrice(text)}
            />
          </View>

          <View style={styles.container}>
            <TextInput
              placeholder="Miestas"
              value={city}
              onChangeText={text => setCity(text)}
            />
          </View>
          <View style={styles.container}>
            <TextInput
              placeholder="Issamus aprasymas"
              value={longDesc}
              onChangeText={text => setLongDesc(text)}
            />
          </View>

          <View
            style={{
              backgroundColor: '#eee',
              borderRadius: SIZES.font,
              margin: SIZES.base,
              ...SHADOWS.dark,
            }}>
            <View
              style={{width: '100%', height: 250, borderRadius: SIZES.font}}>
              <Image
                source={{uri: imageUri}}
                resizeMode="cover"
                style={{
                  width: '100%',
                  height: '100%',
                  borderTopLeftRadius: SIZES.font,
                  borderTopRightRadius: SIZES.font,
                  borderRadius: SIZES.font,
                }}
              />
            </View>

            <Pressable
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: SIZES.font,
              }}
              onPress={() => bs.current.snapTo(0)}>
              <MaterialIcons name="add-a-photo" size={50} color={COLORS.gray} />
            </Pressable>
          </View>

          <Pressable
            onPress={addPost}
            style={[styles.btnContainer, {width: width - 40}]}>
            <Text style={{fontSize: 14, color: COLORS.white}}>
              ĮDĖTI SKELBIMĄ
            </Text>
          </Pressable>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',

    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 10,

    paddingHorizontal: 10,
    marginBottom: 20,
    height: 40,
  },
  btnContainer: {
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 10,
    marginTop: 80,
  },
  headerModal: {},
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
    shadowOpacity: 0.4,
  },
  panelTitle: {
    fontSize: 22,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    height: 40,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddPost;
