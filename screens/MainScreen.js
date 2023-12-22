import { View, Text } from "react-native"
import { BottomNavigation } from "react-native-paper"
import { useEffect, useState } from "react";
import Chat from './mainscreen/Chat'
import Complain from './mainscreen/Complain'
import Home from './mainscreen/Home'
import Order from './mainscreen/Order'
import Reconciliation from './mainscreen/Reconciliation'
import User from './mainscreen/User'

const MainScreen = ({ navigation }) => {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'Home', title: 'Trang chủ', focusedIcon: 'home', unfocusedIcon: 'home-outline' },
        { key: 'Order', title: 'Đơn hàng', focusedIcon: 'tag', unfocusedIcon: 'tag-outline' },
        { key: 'Chat', title: 'Chat', focusedIcon: 'message', unfocusedIcon: 'message-outline' },
        { key: 'Reconciliation', title: 'Đối soát', focusedIcon: 'credit-card', unfocusedIcon: 'credit-card-outline' },
        { key: 'Complain', title: 'Khiếu nại', focusedIcon: 'alert', unfocusedIcon: 'alert-outline' },
        { key: 'User', title: 'Cá nhân', focusedIcon: 'account', unfocusedIcon: 'account-outline' },
    ]);



    const renderScene = BottomNavigation.SceneMap({
        Home: Home,
        Order: () => <Order navigation={navigation} />,
        Chat: Chat,
        Reconciliation: Reconciliation,
        Complain: Complain,
        User: () => <User navigation={navigation} />
    });

    return (
        <BottomNavigation
            barStyle={{ backgroundColor: 'white', paddingTop: '5', borderTopColor: '#E8E8E8', borderTopWidth: 1 }}
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    )
}

export default MainScreen