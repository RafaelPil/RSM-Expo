import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  Pressable,
  View,
  Text,
  SafeAreaView,
  useWindowDimensions,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import {
  useUserData,
  useSignOut,
  useAuthenticated,
  useUserId,
} from "@nhost/react";
import HeaderComponent from "../components/HeaderComponent";
import { FocusedStatusBar } from "../components";
import { COLORS, SIZES } from "../constants";
import { useForm } from "react-hook-form";
import CustomInput from "../components/CustomInput";
import * as ImagePicker from "expo-image-picker";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../../firebaseConfig";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { gql, useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";

initializeApp(firebaseConfig);

const MUTATUION_EDIT_PROFILE = gql`
  mutation editUser(
    $userName: String!
    $userId: uuid!
    $profileImage: String!
  ) {
    updateUser(
      _set: { displayName: $userName, avatarUrl: $profileImage }
      pk_columns: { id: $userId }
    ) {
      displayName
    }
  }
`;

export default function TabTwoScreen() {
  const [imageUri, setImageUri] = useState("");
  const [userName, setUserName] = useState("");
  const navigation = useNavigation();

  const userId = useUserId();

  const { control, handleSubmit, watch } = useForm();

  const { height, width } = useWindowDimensions();
  const user = useUserData();
  const { signOut } = useSignOut();
  const isAuthenticated = useAuthenticated();

  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);

  const [mutation_Edit_Profile] = useMutation(MUTATUION_EDIT_PROFILE);

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
        "profileAvatar/" + new Date().getTime() + ".jpg"
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

  const logout = async () => {
    await signOut();
  };

  const onEditPressed = async (data) => {
    const { userName } = data;
    try {
      await mutation_Edit_Profile({
        variables: {
          userId: userId,
          userName: userName,
          profileImage: imageUri,
        },
      });
      navigation.navigate("Pagrindinis");
      setUserName("");
    } catch (e) {
      Alert.alert(e, "Serverio klaida");
    }
  };

  console.log(user.avatarUrl);

  if (isAuthenticated) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <FocusedStatusBar
          barStyle="dark-content"
          backgroundColor="#00AEEF"
          transLucent={true}
        />
        <HeaderComponent headerTitle={"Profilis"} />
        <View style={styles.container}>
          <View>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.avatar} />
            ) : (
              <Image source={{ uri: user?.avatarUrl }} style={styles.avatar} />
            )}
            {/* <Image source={{ uri: imageUri }} style={styles.avatar} /> */}
            <Pressable style={styles.plusContainer} onPress={() => pickImage()}>
              <AntDesign name="pluscircle" size={22} color={COLORS.primary} />
            </Pressable>
          </View>

          <Text style={styles.name}>{user?.displayName}</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.text}>Redaguoti vardą</Text>
            <CustomInput
              name="userName"
              placeholder=""
              control={control}
              rules={{
                required: "Įveskite varda",
                minLength: {
                  value: 3,
                  message: "Vardas turi būti ne mažiau kaip 3 simboliai",
                },
                maxLength: {
                  value: 24,
                  message: "Vardas turi būti ne daugiau kaip 24 simboliai",
                },
              }}
            />
          </View>
          <View style={{ marginTop: "auto" }}>
            <Pressable
              style={[styles.btnContainer, { width: width - 70 }]}
              onPress={handleSubmit(onEditPressed)}
            >
              <Text style={{ fontSize: 14, color: "#fff" }}>
                {/* {isLoading ? "Krauna..." : "Išsaugoti"} */}
                Išsaugoti
              </Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View>
      <Text>Ne Autorizuotas</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  avatar: {
    width: 100,
    aspectRatio: 1,
    borderRadius: 50,
  },
  plusContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    borderWidth: 1,
    borderColor: COLORS.white,
    borderRadius: 100,
  },
  name: {
    fontWeight: "700",
    fontSize: 16,
    marginVertical: 10,
    color: "#474747",
    lineHeight: 24,
  },
  inputContainer: {
    width: "100%",
    marginTop: 35,
  },
  text: {
    marginLeft: 20,
    color: "#474747",
    fontSize: SIZES.font,
    fontWeight: "400",
  },
  btnContainer: {
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    height: 45,
    borderRadius: 20,
  },
});
