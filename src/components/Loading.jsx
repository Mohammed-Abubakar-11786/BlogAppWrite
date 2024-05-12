function Loading() {
  return (
    <div className="flex flex-col items-center my-10">
      {" "}
      <div className="animate-spin rounded-full w-20 h-20 border-l-4 borfer-r-4 border-orange-500"></div>{" "}
      <div className="font-bold text-orange-500 mt-3">Loading...</div>
    </div>
  );
}

export default Loading;
