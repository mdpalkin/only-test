
import {createRoot} from 'react-dom/client'
import { App } from '@/app/app'

const root = document.getElementById('root')

const container = createRoot(root)

container.render(<App/>)
