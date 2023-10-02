const LoadingHouse = () => {
  return (
    <div className="h-full w-full">
      <ul>
        {[...Array(3).keys()].map((i) => (
          <li key={i} className="mt-10 ">
            <div
              className={`shadow mx-2 px-4 py-4 md:h-[330px] animate-pulse`}
              style={{
                animationDelay: `${i * 0.3}s`,
                animationDuration: "1s",
              }}
            >
              <div className="flex flex-col md:flex-row md:space-x-8  ">
                <div className="relative h-[300px] md:min-w-[400px] bg-gray-200"></div>
                <div className="flex flex-col mt-3">
                  <div className="h-12 w-[470px] bg-gray-200"></div>
                  <div className="h-full mt-4 w-[470px] bg-gray-200"></div>
                  <div>
                    <div className="flex flex-col mt-3 md:flex-row md:mt-0 items-center justify-between"></div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LoadingHouse;
