import { requireAnyRole } from "@/lib/auth"
import DocumentStudio from "@/components/documents/DocumentStudio"

export const dynamic = "force-dynamic"

export default async function AdminDocumentsPage() {
  await requireAnyRole(["admin", "client", "employee", "vendor"])

  return <DocumentStudio />
}
