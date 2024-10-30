import { EquipmentHeader } from "@/components/equipment/EquipmentHeader"
import { EquipmentTabs } from "@/components/equipment/EquipmentTabs"

export default function EquipmentPage() {
  return (
    <div className="flex flex-col gap-6">
      <EquipmentHeader />
      <EquipmentTabs />
    </div>
  )
} 