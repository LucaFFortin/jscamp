import { Footer } from './components/Footer.jsx'
import { Header } from './components/Header.jsx'

import { NotFoundPage } from './pages/404.jsx'
import { HomePage } from './pages/Home.jsx'
import { SearchPage } from './pages/Search.jsx'
import { Route } from './components/Route.jsx'
import { Contact } from './pages/Contact.jsx'

function App() {
  return (
    <>
      <Header/>
      <Route path={"/"} component={HomePage} />
      <Route path={"/search"} component={SearchPage} />
      <Route path={'/404'} component={NotFoundPage}/>
      <Route path={"/contact"} component={Contact} /> 
      <Footer />
    </>
  )
}

export default App
