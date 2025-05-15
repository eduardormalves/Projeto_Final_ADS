import { useNavigation } from '@react-navigation/native';

import FontAwesome from '@expo/vector-icons/FontAwesome';

import { StyleSheet, TouchableOpacity } from 'react-native';


export default () => {

    const navigation = useNavigation();


    return (
        <TabArea>
            <TouchableOpacity style={styles.tabItem} onPress={navigation.navigate('Home')}>
                <FontAwesome name="home" size={24} color="black" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.tabItem} onPress={navigation.navigate('Cortes')}>
                <FontAwesome name="calendar-o" size={24} color="black" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.tabItem} onPress={navigation.navigate('Produtos')}>
                <FontAwesome name="shopping-cart" size={24} color="black" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.tabItem} onPress={navigation.navigate('Clientes')}>
                <FontAwesome name="user" size={24} color="black" />
            </TouchableOpacity>
            
            <TabItem onPress={navigation.navigate('ClienteRead')}>
                {user.avatar != '' ?
                    <AvatarIcon source={{uri: user.avatar}} />
                    :
                    <AccountIcon style={{opacity: state.index===4? 1 : 0.5}} width="24" height="24" fill="#FFFFFF" />
                }
            </TabItem>
        </TabArea>
    );
}

const styles = StyleSheet.create({
    tabArea: {
        height: '60px',
        backgroundColor: '#4EADBE',
        flexDirection: 'row',
    },
    tabItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabItemCenter: {
        width: '70px',
        height: '70px',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: '35px',
        border: '3px solid #4EADBE',
        marginTop: '-20px',
    },
    avatarIcon: {
        width: '24px',
        height: '24px',
        borderRadius: '12px',
    },
})