import { View, Text } from "react-native"
import { BottomNavigation } from "react-native-paper"
import { useEffect, useState } from "react";
import Loading from "./Loading"
import Login from "./Login"
import Register from "./Register"

const MainScreen = (props) => {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'music', title: 'Favorites', focusedIcon: 'access-point', unfocusedIcon: 'heart-outline' },
        { key: 'albums', title: 'Albums', focusedIcon: 'account-multiple-plus-outline' },
        { key: 'recents', title: 'Recents', focusedIcon: 'history' },
    ]);

    useEffect(() => { console.log('vai') }, [index])

    const renderScene = BottomNavigation.SceneMap({
        music: Loading,
        albums: Register,
        recents: Login,
    });

    return (
        <BottomNavigation
            labeled={false}
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    )
}

export default MainScreen