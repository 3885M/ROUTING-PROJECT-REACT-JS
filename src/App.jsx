import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import Header from './Components/Header'
import View from './Components/View'
import Edit from './Components/Edit'
import "./style.css"

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path='/' element={
              <div className="animate-fade-in">
                <Home />
              </div>
            }/>
            <Route path='/view' element={
              <div className="animate-fade-in">
                <View />
              </div>
            }/>
            <Route path='/edit/:index' element={
              <div className="animate-fade-in">
                <Edit />
              </div>
            }/>
          </Routes>
        </main>
        <footer className="bg-gray-800 border-t border-gray-700 py-4 text-center text-gray-400 text-sm">
          <div className="container mx-auto px-4">
            <p>© {new Date().getFullYear()} Employee Management System. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App;

