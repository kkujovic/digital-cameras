import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/sonner'
import { CamerasPage } from '@/components/cameras/CamerasPage'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CamerasPage />
      <Toaster richColors position="bottom-right" />
    </QueryClientProvider>
  )
}
