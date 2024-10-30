import { ContractsList } from "@/components/contracts/ContractsList"

export default function ContractsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Contracts</h1>
        <p className="text-muted-foreground">
          Manage your performance contracts and agreements
        </p>
      </div>
      <ContractsList />
    </div>
  )
} 