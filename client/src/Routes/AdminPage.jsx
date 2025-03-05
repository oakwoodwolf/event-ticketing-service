import { Admin, Resource } from "react-admin";
import React, { Component } from "react";
import { Layout } from "../Layout";
import { dataProvider } from "../providers/DataProvider";
import { UserList } from "../components/UserList";
import { EventList } from "../components/EventList";
import { BookingList } from "../components/BookingList";
class AdminPage extends Component {
  render() {
    return (
      <Admin basename="/admin" dataProvider={dataProvider} layout={Layout}>
        <Resource name="users" list={UserList} />
        <Resource name="events" list={EventList} />
        <Resource name="bookings" list={BookingList} />
      </Admin>
    );
  }
}
export default AdminPage;