import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, dummyPosts, SHADOWS, SIZES } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderComponent from "../components/HeaderComponent";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import { gql, useMutation } from "@apollo/client";
import { useUserId } from "@nhost/react";
import firebaseConfig from "../../firebaseConfig";
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { FocusedStatusBar } from "../components";
import { useForm } from "react-hook-form";
import CustomInput from "../components/CustomInput";

initializeApp(firebaseConfig);

const MUTATION_ADD_POST = gql`
  mutation AddPost(
    $userId: uuid!
    $city: String!
    $description: String!
    $image: String!
    $price: String!
    $title: String!
    $date: timestamptz!
  ) {
    insert_Post_one(
      object: {
        userId: $userId
        city: $city
        description: $description
        image: $image
        price: $price
        title: $title
        date: $date
      }
    ) {
      city
      description
      id
      image
      price
      title
      userId
      date
    }
  }
`;

const AddPost = () => {
  const navigation = useNavigation();
  const [data, setData] = useState(dummyPosts);
  const userId = useUserId();

  const { control, handleSubmit, watch } = useForm();

  // setting timestampz time
  const now = new Date();
  const timestamp = now.toISOString();
  // console.log(timestamp);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [imageUri, setImageUri] = useState("");

  const { height, width } = useWindowDimensions();

  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);

  const [mutation_addPost] = useMutation(MUTATION_ADD_POST);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      const storage = getStorage();
      const storageRef = ref(
        storage,
        "images/" + new Date().getTime() + ".jpg"
      );
      const response = await fetch(result.uri);
      const blob = await response.blob();

      // Upload the image to Firebase Storage
      const uploadTask = uploadBytesResumable(storageRef, blob);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.log("Error uploading image:", error);
        },
        () => {
          // Get the download URL of the uploaded image
          getDownloadURL(storageRef).then((url) => {
            console.log("Image URL:", url);
            setImageUri(url);
          });
        }
      );
    }
  };

  if (hasGalleryPermission === false) {
    return <Text>No access to Internal Storage</Text>;
  }

  const addNewPost = async (data) => {
    const { description, city, price, title } = data;
    try {
      await mutation_addPost({
        variables: {
          userId: userId,
          city: city,
          description: description,
          price: price,
          image: imageUri,
          title: title,
          date: timestamp,
        },
      });
      navigation.navigate("Pagrindinis");
      setTitle("");
      setPrice("");
      setCity("");
      setDescription("");
      setImageUri("");
    } catch (e) {
      Alert.alert(e, "Serverio klaida");
    }
  };

  return (
    <ScrollView>
      <FocusedStatusBar
        barStyle="dark-content"
        backgroundColor="#00AEEF"
        transLucent={true}
      />
      <HeaderComponent headerTitle={"Pridėti paslaugą"} />
      <View>
        {/* <TextInput
            placeholder="Aprasymas"
            value={title.toString()}
            onChangeText={(text) => setTitle(text)}
          /> */}
        <Text style={styles.text}>Pavadinimas</Text>
        <CustomInput
          name="title"
          placeholder=""
          control={control}
          multilineInput={true}
          rules={{
            required: "Įveskite pavadinima",
            minLength: {
              value: 3,
              message: "Turi būti ne mažiau nei 3 raides",
            },
            maxLength: {
              value: 24,
              message: "Ne daugiau kaip 24 raidžiu",
            },
          }}
        />

        <Text style={styles.text}>Kaina</Text>
        <CustomInput
          name="price"
          placeholder=""
          control={control}
          keyboardType="numeric"
          rules={{
            required: "Įveskite kaina",
            minLength: {
              value: 1,
              message: "Nurodykite kaina",
            },
            maxLength: {
              value: 7,
              message: "Nurodykite kaina",
            },
          }}
        />

        <Text style={styles.text}>Miestas</Text>
        <CustomInput
          name="city"
          placeholder=""
          control={control}
          rules={{
            required: "Įveskite miesta",
            minLength: {
              value: 3,
              message: "Nurodykite miesta",
            },
            maxLength: {
              value: 24,
              message: "Tokio nera",
            },
          }}
        />

        <Text style={styles.text}>Išsamus aprašymas</Text>
        <CustomInput
          name="description"
          placeholder=""
          control={control}
          heightInput={80}
          multilineInput={true}
          rules={{
            required: "Įveskite aprašyma",
            minLength: {
              value: 10,
              message: "Turi būti ne mažiau nei 10 raidžiu",
            },
            maxLength: {
              value: 1000,
              message: "Ne daugiau kaip 1000 raidžiu",
            },
          }}
        />

        <Text style={styles.text}>Pridėti nuotrauką</Text>
        <View style={styles.imageContainer}>
          <View
            style={{
              width: "100%",
              height: 190,
              borderRadius: SIZES.font,
            }}
          >
            {imageUri && (
              <Image
                source={{ uri: imageUri }}
                resizeMode="cover"
                style={{
                  width: "100%",
                  height: "100%",
                  borderTopLeftRadius: SIZES.font,
                  borderTopRightRadius: SIZES.font,
                  borderRadius: SIZES.font,
                }}
              />
            )}
          </View>

          <Pressable
            onPress={() => pickImage()}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: SIZES.font,
            }}
          >
            {/* <MaterialIcons name="add-a-photo" size={50} color={COLORS.gray} /> */}
            <Image
              source={require("../../assets/icons/addimg.png")}
              style={{
                width: 70,
                height: 80,
              }}
            />
          </Pressable>
        </View>

        <Pressable
          style={styles.btnContainer}
          onPress={handleSubmit(addNewPost)}
        >
          <Text style={styles.btnText}>ĮDĖTI SKELBIMĄ</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",

    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 10,

    paddingHorizontal: 10,
    marginBottom: 20,
    height: 40,
  },
  btnContainer: {
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    height: 45,
    borderRadius: 20,
    margin: 20,
    marginBottom: 20,
  },
  headerModal: {},
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.4,
  },
  panelTitle: {
    fontSize: 22,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    height: 40,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginLeft: 20,
    color: "#474747",
    fontSize: SIZES.font,
    fontWeight: "400",
    marginTop: 10,
  },
  imageContainer: {
    backgroundColor: "#eee",
    borderRadius: SIZES.font,
    marginHorizontal: 20,
    // ...SHADOWS.dark,
    marginTop: 5,
  },
  btnText: {
    fontSize: 14,
    color: COLORS.white,
    fontWeight: "500",
  },
});

export default AddPost;
