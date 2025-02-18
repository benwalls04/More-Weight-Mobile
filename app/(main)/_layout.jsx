import { EditProvider } from "@/hooks/EditContext";

export default function MainLayout() {
  return (
    <EditProvider>
      <EditPage />
    </EditProvider>
  )
}