import { Admin, Resource } from "react-admin";
import React, { Component } from "react";
import UserIcon from "@mui/icons-material/Group";
import { Layout } from "../Layout";
import { dataProvider } from "../providers/DataProvider";
import { UserCreate, UserEdit, UserList, UserShow } from "../components/Users";
import { EventCreate, EventEdit, EventList, EventShow } from "../components/Events";
import { BookingCreate, BookingEdit, BookingList, BookingShow } from "../components/Bookings";
class AdminPage extends Component {
  render() {
    return (
      <Admin basename="/admin"  dataProvider={dataProvider} layout={Layout}>
        <Resource name="users" icon={UserIcon} list={UserList} show={UserShow} edit={UserEdit} create={UserCreate}/>
        <Resource name="events" list={EventList} show={EventShow} edit={EventEdit} create={EventCreate}/>
        <Resource name="bookings" list={BookingList} show={BookingShow} edit={BookingEdit} create={BookingCreate}/>
      </Admin>
    );
  }
}
export default AdminPage;