import { useRouter } from "next/router";

import VehicleDetails from "../../components/hangar/VehicleDetails";

function HangarVehiclePage(props) {
  const router = useRouter();
  const { vehicleId } = router.query;
  return <VehicleDetails vehicleId={vehicleId} />;
}

export default HangarVehiclePage;
