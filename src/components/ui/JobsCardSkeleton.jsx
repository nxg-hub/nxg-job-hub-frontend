const JobsCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow p-5 animate-pulse h-[330px] flex flex-col">
      {/* Employer info */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
        <div className="flex flex-col gap-2">
          <div className="w-24 h-3 bg-gray-200 rounded"></div>
          <div className="w-16 h-3 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Title */}
      <div className="w-40 h-4 bg-gray-200 rounded mb-3"></div>

      {/* Description */}
      <div className="flex flex-col gap-2 mb-3">
        <div className="w-full h-3 bg-gray-200 rounded"></div>
        <div className="w-4/5 h-3 bg-gray-200 rounded"></div>
        <div className="w-3/4 h-3 bg-gray-200 rounded"></div>
      </div>

      {/* Job tags */}
      <div className="flex gap-3 mb-4">
        <div className="w-20 h-4 bg-gray-200 rounded"></div>
        <div className="w-24 h-4 bg-gray-200 rounded"></div>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between">
        <div className="w-16 h-4 bg-gray-200 rounded"></div>
        <div className="w-20 h-8 bg-gray-200 rounded-md"></div>
      </div>
    </div>
  );
};

export default JobsCardSkeleton;
