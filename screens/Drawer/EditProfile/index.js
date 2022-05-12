import React, { useEffect, useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/core';
import { UserContext } from '../../../../contexts/UserContext';
import { StyleSheet, Text, View, ScrollView, Alert, TouchableOpacity, Modal } from 'react-native';
import { Avatar } from 'react-native-paper';
import { Snackbar } from 'react-native-paper';
import { firstLetter, formatDate } from '../../../../regex/functionsRegex';
import ProfileInput from '../../../../components/Main/ProfileInput';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectDropdown from 'react-native-select-dropdown'
import { courses } from './cousers';
import SignButton from '../../../../components/Sign/SignButton';
import { updateUser } from '../../../../db/Firestore';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';


const Profile = () => {

    const { state: user } = useContext(UserContext);
    const { dispatch: userDispatch } = useContext(UserContext);

    const [name, setName] = useState(user.fullname);
    const [birth, setBirth] = useState(user.birth);
    const [course, setCourse] = useState(user.course);
    const [avatar, setAvatar] = useState(user.avatar);
    const [perfil, setPerfil] = useState(user.perfil);
    const [date, setDate] = useState(new Date());


    const [open, setOpen] = useState(false)

    const [snackBarInfo, setSnackBarInfo] = useState({ visible: false, color: '', message: '' });

    const navigation = useNavigation();

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setOpen(!open);
        setDate(currentDate);
        setBirth(currentDate);
    }

    const createButtonAlert = () =>
        Alert.alert('Atenção', 'Seus dados serão atualizados!', [{
                text: 'Cancelar',
                onPress: () => {},
                style: 'cancel',
            },
            {
                text: 'Continuar',
                onPress: () => {
                    submitProfile();
                    setTimeout(() => navigation.navigate('Home'), 1000);
                }
            },
        ]);

    const submitProfile = async() => {
        try {
            await updateUser(user.id, name, avatar, course, birth)
            setSnackBarInfo({ visible: true, color: 'green', message: 'Prefil atualizado com sucesso!' });
            setContext(name, avatar, course, birth, perfil)
        } catch {
            setSnackBarInfo({ visible: true, color: 'red', message: 'Algo deu errado!' });
        }
    }

    const setContext = (name, picture, course, birth, perfil) => {

        userDispatch({
            type: 'setAvatar',
            payload: {
                avatar: picture
            }
        });
        userDispatch({
            type: 'setFullname',
            payload: {
                fullname: name
            }
        });
        userDispatch({
            type: 'setCourse',
            payload: {
                course: course
            }
        });
        userDispatch({
            type: 'setBirth',
            payload: {
                birth: birth
            }
        });
        userDispatch({
            type: 'setPerfil',
            payload: {
                perfil: perfil
            }
        })
    }

    const pickImage = async() => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setAvatar(result.uri);
        }
    }

    return ( <
        View >
        <
        ScrollView contentContainerStyle = {
            { flexGrow: 1, alignItems: "center" } } >
        <
        View style = { styles.header } >
        <
        TouchableOpacity onPress = { pickImage }
        style = { styles.photoTouch } >
        <
        MaterialIcons name = "add-photo-alternate"
        size = { 12 }
        color = '#FFFFFF'
        style = { styles.iconEdit }
        /> {
            user.avatar !== '' ?
                <
                Avatar.Image size = { 100 }
            source = {
                { uri: avatar } }
            style = { styles.image }
            />:
            <
            Avatar.Text size = { 100 }
            label = { firstLetter(user.fullname) }
            color = { 'white' }
            style = { styles.image }
            />
        } <
        /TouchableOpacity> <
        Camera style = { styles.camera }
        type = { type } >
        <
        View style = { styles.buttonContainer } >
        <
        TouchableOpacity style = { styles.button }
        onPress = {
            () => {
                setType(
                    type === Camera.Constants.Type.back ?
                    Camera.Constants.Type.front :
                    Camera.Constants.Type.back
                );
            }
        } >
        <
        Text style = { styles.text } > Flip < /Text> <
        /TouchableOpacity> <
        /View> <
        /Camera> <
        /View> <
        View style = { styles.infoArea } >
        <
        ProfileInput editable = { false }
        value = { user.email }
        placeholder = { 'Email' }
        icon = { < MaterialIcons name = "email"
            size = { 24 }
            color = "#09142c" / > }
        /> <
        ProfileInput icon = { < Ionicons name = "person"
            size = { 24 }
            color = "#09142c" / > }
        value = { name }
        onChangeText = {
            (text) => setName(text) }
        placeholder = { 'Nome' }
        /> <
        TouchableOpacity title = "DatePicker"
        onPress = {
            () => setOpen(true) } >
        <
        View style = {
            [styles.inputDateArea] } >
        <
        FontAwesome5 name = "calendar-alt"
        size = { 24 }
        color = "black" / >
        <
        Text style = { styles.inputDate } > { birth ? formatDate(birth) : 'Data de nascimento' } <
        /Text> <
        /View> <
        /TouchableOpacity>

        {
            open && < DateTimePicker value = { date }
            testID = 'DatePicker'
            onChange = { onChange }
            style = { styles.calendar }
            />
        } <
        View style = {
            [styles.inputSelectArea] } >
        <
        FontAwesome5 name = "book"
        size = { 24 }
        color = "black" / >
        <
        SelectDropdown defaultValue = { course ? course : '' }
        buttonStyle = { styles.selectButton }
        buttonTextStyle = { styles.selectButtonText }
        rowTextStyle = {
            { fontSize: 14 } }
        rowStyle = { styles.selectDropdown }
        dropdownStyle = { styles.dropdown }
        data = { courses }
        onSelect = {
            (selectedItem, index) => {
                setCourse(selectedItem)
            }
        }
        buttonTextAfterSelection = {
            (selectedItem, index) => {
                return selectedItem
            }
        }
        rowTextForSelection = {
            (item, index) => {
                return item
            }
        }
        /> <
        /View> <
        SignButton style = { styles.button }
        onPress = {
            () => createButtonAlert() }
        iconName = { 'send' }
        text = { 'ATUALIZAR' }
        /> <
        /View>

        <
        Snackbar wrapperStyle = {
            { top: 0 } }
        visible = { snackBarInfo.visible }
        duration = { 5000 }
        style = {
            { backgroundColor: snackBarInfo.color } }
        onDismiss = {
            () => setSnackBarInfo({ visible: false }) } >
        { snackBarInfo.message } <
        /Snackbar> <
        /ScrollView> <
        /View>
    )
}

export default Profile

const styles = StyleSheet.create({
    header: {
        height: 70,
        width: '100%',
        backgroundColor: '#09142c',
        marginBottom: 10,

    },
    photoTouch: {
        borderRadius: 50,
        top: 15,
        alignSelf: 'center',
        position: 'relative',
    },
    iconEdit: {
        backgroundColor: '#09142c',
        position: 'absolute',
        top: 0,
        right: 6,
        zIndex: 1,
        padding: 3,
        borderRadius: 10,

    },
    image: {
        backgroundColor: '#264F9C',
        alignSelf: 'center',
    },
    infoArea: {
        width: '80%',
        paddingTop: 50,
        alignItems: 'center',
    },
    infoEmail: {
        fontSize: 16,
    },
    inputDateArea: {
        width: '100%',
        height: 50,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#09142c',
    },
    inputDate: {
        width: '100%',
        height: 50,
        textAlign: 'center',
        paddingTop: 15,
    },
    inputSelectArea: {
        height: 50,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        // paddingVertical: 10,
        borderRadius: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#09142c',
    },
    selectButton: {
        backgroundColor: 'white',
        width: '100%',
        height: 40,
        textAlign: 'center',
    },
    selectButtonText: {
        fontSize: 14,
    },
    selectDropdown: {
        padding: 15,
    },
    dropdown: {
        width: 250,
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#09142c',
    },

})