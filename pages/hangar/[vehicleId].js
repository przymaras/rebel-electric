import { useRouter } from "next/router";

import VehicleDetails from "../../components/hangar/VehicleDetails";

function HangarVehiclePage(props) {
  const router = useRouter();
  const { vehicleId } = router.query;
  return <VehicleDetails vehicleData={props.vehicleData} />;
}

export async function getServerSideProps(context) {
  const vehicleId = context.params.vehicleId;
  let vehicleData = {};
  const url = `${process.env.API_URL}/vehicles/${vehicleId}/`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(res.ok);
    vehicleData = { ...data };
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      vehicleData,
    },
  };
}

export default HangarVehiclePage;
