// app/client.tsx
/// <reference types=vinxi/types/client />
import { hydrateRoot } from 'react-dom/client'
import { StartClient } from '@tanstack/start'
import { createRouter } from './router'

const router = createRouter()

await router.load()
hydrateRoot(document.getElementById('root')!, <StartClient router={router} />)