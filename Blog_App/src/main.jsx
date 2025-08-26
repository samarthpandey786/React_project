import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthLayout, Login} from './components/index.js'
import AddPost from "./pages/AddPost.jsx";
import Signup from "./pages/Singup.jsx";
import EditPost from './pages/EditPost.jsx';
import Post from './pages/Post.jsx';
import AllPosts from './pages/AllPost.jsx'
import Home from './pages/Home.jsx'
import AccountPage from './pages/AccountPage.jsx';
import { Account } from 'appwrite'
import HelpPage from './pages/HelpPage.jsx'
import ContactUsPage from './pages/ContactUsPage.jsx'
import About from './pages/AboutPage.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <Signup />
                </AuthLayout>
            ),
        },
        {
            path: "/all-posts",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AllPosts />
                </AuthLayout>
            ),
        },
        {
            path: "/add-post",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AddPost />
                </AuthLayout>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <EditPost />
                </AuthLayout>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },
        {
            path: "/account_page",
            element: <AccountPage/>
        },
        {
            path: "/help",
            element: <HelpPage/>
        },
        {
            path: "/contact",
            element: <ContactUsPage/>
        },
        {
            path: "/About",
            element: <About/>
        }
    ],
},
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
