import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS, SHADOWS, SIZES} from '../constants';

const MyPostComponent = ({data}) => {
  const navigation = useNavigation();
  const width = useWindowDimensions().width;

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
    <View style={[styles.container, {width: width}]}>
      <View style={styles.innerContainer}>
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
          <AntDesign
            name="hearto"
            size={24}
            color={likeState ? 'red' : 'grey'}
          />
        </TouchableOpacity>
        {/* Image */}
        <Pressable onPress={toDetails}>
          <Image style={styles.image} source={{uri: data.img}} />
        </Pressable>

        <View style={{flex: 1, marginHorizontal: 10}}>
          {/* Bed & Bedroom */}
          <Text style={styles.bedrooms}>{data.aprasymas}</Text>

          {/* Type & Description */}
          <Text style={styles.description} numberOfLines={2}>
            {data.miestas}
          </Text>

          <Text style={styles.newPrice}>€{data.kaina}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 120,
    padding: 5,
  },
  innerContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  image: {
    height: '100%',
    aspectRatio: 1,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  bedrooms: {
    marginVertical: 10,
    color: '#5b5b5b',
  },
  description: {
    fontSize: 15,
  },
  newPrice: {
    fontWeight: 'bold',
    color: 'black',
  },
  totalPrice: {
    color: '#5b5b5b',
    textDecorationLine: 'underline',
  },
});

export default MyPostComponent;
