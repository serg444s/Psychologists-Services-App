import { Hourglass } from "react-loader-spinner";

const Loader = () => {
  return (
    <Hourglass
      visible={true}
      height="80"
      width="80"
      ariaLabel="hourglass-loading"
      wrapperStyle={{}}
      wrapperClass=""
      colors={["#fc832c", "#72a1ed"]}
    />
  );
};

export default Loader;
