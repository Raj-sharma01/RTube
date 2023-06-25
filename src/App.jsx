import Body from "./components/Body"
import Header from "./components/Header"
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Error from "./components/Error"
import MainContent from "./components/MainContent"
import VideoPage from "./components/VideoPage"
import SearchResult from "./components/SearchResult"
import { Provider } from 'react-redux'
import Store from "./utils/Store"
import ChannelPage from "./components/ChannelPage"
import PlaylistPage from "./components/PlaylistPage"

function App() {

  return (
    <>
    
    <Provider store={Store}>
      <Header />
      {/* <RouterProvider router={myRouter} /> */}
      <Outlet/>
      </Provider>
    </>
  )
}
 

export const myRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [ 
      {
        path:'/',
        element:<Body/>,
        children:[
          {
            path: '/',
            element: <MainContent />
          },
          {
            path: 'watch/v/:videoId',
            element: <VideoPage />
          },
          {
            path:'result/:searchQuery',
            element:<SearchResult/>
          },
          {
            path:'channel/:channelId',
            element:<ChannelPage/>
          },
          {
            path:'playlist/:playlistId',
            element:<PlaylistPage/>
          }
        ]
      },
 
    ]
  }
])

export default App
