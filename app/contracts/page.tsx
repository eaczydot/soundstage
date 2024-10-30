import { ContractsList } from "@/components/contracts/ContractsList"

export default function ContractsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contracts</h1>
          <p className="text-muted-foreground">
            Manage and track your performance contracts
          </p>
        </div>
      </div>
      <ContractsList />
    </div>
  )
} 