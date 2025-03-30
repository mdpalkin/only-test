
import { App } from '@/app'
import {createRoot} from 'react-dom/client'

const root = document.getElementById('root')

const container = createRoot(root)

container.render(<App/>)
