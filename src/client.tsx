// app/client.tsx
/// <reference types="vinxi/types/client" />
import { hydrateRoot } from 'react-dom/client'
import { StartClient } from '@tanstack/start'
import { createRouter } from './router'

const router = createRouter()

router.load().catch((error) => console.log(error, ":::error handler for server render"))
hydrateRoot(document.getElementById('root')!, <StartClient router={router} />)
