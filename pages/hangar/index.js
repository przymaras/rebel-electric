import Hangar from "../../components/hangar/Hangar";

function HangarPage(props) {
  return <Hangar hangarData={props.hangarData} />;
}

export async function getServerSideProps() {
  let hangarData = { vehicles: [] };
  const url = `${process.env.API_URL}/vehicles/`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(res.ok);
    hangarData = { ...data };
  } catch (err) {
    console.log(err);
  }

  return {
    props: {
      hangarData,
    },
  };
}

export default HangarPage;
