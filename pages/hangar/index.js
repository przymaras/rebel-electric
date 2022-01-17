import Hangar from "../../components/hangar/Hangar";

function HangarPage(props) {
  return <Hangar vehicles={props.vehicles} />;
}

export async function getServerSideProps() {
  let vehicles = { vehicles: [] };
  const url = `${process.env.API_URL}/vehicles/`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(res.ok);
    vehicles = { ...data };
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      vehicles,
    },
  };
}

export default HangarPage;
