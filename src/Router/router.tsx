import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import HomeFeed from '../Pages/HomeFeed/HomeFeed';
import BookDetail from '../Pages/BookDetail/BookDetail';
import SearchView from '../Pages/Search/SearchView';
import TopNavbar from '../Layouts/topNavbar';
import Signup from '../Pages/LoginSignup/Signup';
import Login from '../Pages/LoginSignup/Login';

export default function Router() {
	return (
		<BrowserRouter basename='/'>
			<TopNavbar />

			<Routes>
				<Route path='/' element={<HomeFeed />} />
				<Route path='/signup' element={<Signup />} />
				<Route path='/Login' element={<Login />} />
				<Route path='/search/' element={<Outlet />}>
					<Route path='detail/:bookDetail' element={<BookDetail />} />
					<Route path=':searchView' element={<SearchView />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
