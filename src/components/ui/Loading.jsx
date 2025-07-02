const Loading = () => {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-4">
          <div className="absolute inset-0 border-4 border-primary-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-primary-500 rounded-full animate-spin"></div>
        </div>
        <p className="text-gray-600 font-medium">Loading amazing tutors...</p>
      </div>
    </div>
  );
};

export default Loading;