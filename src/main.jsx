import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import BookFinder from './Book/Bookfinder';

createRoot(document.getElementById('root')).render(
  <StrictMode>
<BookFinder />
  </StrictMode>,
)
