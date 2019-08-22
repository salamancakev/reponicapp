import { createStackNavigator } from "react-navigation";
import  ClientHomeScreen  from "../pages/ClientHome";
import MemberHomeScreen  from "../pages/MemberHome";
import { RequestServiceScreen } from "../pages/RequestService";
import {CheckServicesScreen} from '../pages/CheckServices'
import { PaymentMethodScreen } from "../pages/PaymentMethod";
import { HistoryScreen } from "../pages/History";
import JobListScreen from "../pages/JobList";
import  JobDetailsScreen  from "../pages/JobDetails";
import  ChatScreen  from "../components/Chat";
import  ChatListScreen  from "../pages/ChatList";

export const ClientHomeStackNavigator = createStackNavigator({
    ClientHome : ClientHomeScreen
})

export const MemberHomeStackNavigator = createStackNavigator({
    MemberHome : MemberHomeScreen
})

export const RequestServiceStackNavigator = createStackNavigator({
    RequestService : RequestServiceScreen
})

export const CheckServiceStackNavigator = createStackNavigator({
    CheckServicesScreen : CheckServicesScreen
})

export const PaymentMethodStackNavigator = createStackNavigator({
    PaymentMethod : PaymentMethodScreen
})

export const HistoryStackNavigator = createStackNavigator({
    History : HistoryScreen
})

export const JobListStackNavigator = createStackNavigator({
    JobList : JobListScreen,
    JobDetails : JobDetailsScreen
})
export const ChatStackNavigator = createStackNavigator({
    ChatList : ChatListScreen,
    Chat : ChatScreen
})
