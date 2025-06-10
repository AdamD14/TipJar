import React from 'react'
import ReactDOM from 'react-dom/client'
import CreatorProfilePage from './CreatorProfilePage.tsx'
import './index.css' // Stworzymy ten plik w następnym kroku

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CreatorProfilePage />
  </React.StrictMode>,
)
