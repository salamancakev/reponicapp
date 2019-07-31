import { createStackNavigator } from "react-navigation";
import { ClientHomeScreen } from "../pages/ClientHome";
import { MemberHomeScreen } from "../pages/MemberHome";
import { RequestServiceScreen } from "../pages/RequestService";

export const ClientHomeStackNavigator = createStackNavigator({
    ClientHome : ClientHomeScreen
})

export const MemberHomeStackNavigator = createStackNavigator({
    MemberHome : MemberHomeScreen
})

export const RequestServiceStackNavigator = createStackNavigator({
    RequestService : RequestServiceScreen
})