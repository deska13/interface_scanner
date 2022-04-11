import About from "../pages/About";
import Clients from "../pages/Clients";
import Login from "../pages/Login"
import ClientIdPages from "../pages/ClientIdPages";
import TransportIdPages from "../pages/TransportIdPages";
import OrdersByTransportIdPages from "../pages/OrdersByTransportIdPages";


export const privateRoutes = [
    
]

export const publicRoutes = [
    {path: '/login', component: Login, exact:true},
    {path: '/about', component: About, exact: true},
    {path: '/clients', component: Clients, exact: true},
    {path: '/clients/:id', component: ClientIdPages, exact: true},
    {path: '/transports/:id_transport', component: TransportIdPages, exact: true},
    {path: '/orders/:id_transport', component: OrdersByTransportIdPages, exact: true},
]
