import { Admin, ListGuesser, Resource } from "react-admin";
import { Layout } from "./Layout";
import { dataProvider } from "./DataProvider";
import { UserList } from "./components/UserList";
import { EventList } from "./components/EventList";
import { BookingList } from "./components/BookingList";
export const App = () => <Admin dataProvider={dataProvider} layout={Layout}>
    <Resource name="users" list={UserList}/>
    <Resource name="events" list={EventList} />
    <Resource name="bookings" list={BookingList} />
</Admin>;
