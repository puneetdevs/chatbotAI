
export const UseCaseCard = ({ src, title, text }) => {
  return (
    <div className="text-center bg-white px-2 py-2  mb-4 rounded-2xl ">
      {/* <div className="bg-[#E9E7FF] my-2 mx-auto p-2 w-fit rounded-md"> */}
      <img className="mx-auto my-3 h-12 md:h-auto" src={src} />
      {/* </div> */}
      <h4 className="text-base font-semibold text-dark">{title}</h4>
      <p className="text-sm mb-6 md:text-[1.1rem] leading-6 mt-4 ">{text}</p>
    </div>
  );
};
