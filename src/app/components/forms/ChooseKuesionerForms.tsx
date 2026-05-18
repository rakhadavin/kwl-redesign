const ChooseKuesionerForm = ({ handleSelect }: any) => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => handleSelect("Open Ended")}
          className="border border-gray-200 rounded-lg p-6 text-left hover:border-blue-500 hover:shadow-md transition-all"
        >
          <div className="flex items-start gap-3 mb-2">
            <h4 className="font-semibold text-lg">Open-Ended</h4>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            Free text input for detailed responses
          </p>
        </button>

        <button
          onClick={() => handleSelect("Multiple Choice")}
          disabled
          className="border border-gray-200 rounded-lg p-6 text-left bg-gray-50 cursor-not-allowed opacity-50 transition-all"
        >
          <div className="flex items-start gap-3 mb-2">
            <h4 className="font-semibold text-lg text-gray-400">
              Multiple Choice
            </h4>
          </div>
          <p className="text-sm text-gray-400 mb-3">
            Multiple items that can be checked off (Coming Soon)
          </p>
        </button>

        <button
          onClick={() => handleSelect("Polling")}
          className="border border-gray-200 rounded-lg p-6 text-left hover:border-yellow-500 hover:shadow-md transition-all"
        >
          <div className="flex items-start gap-3 mb-2">
            <h4 className="font-semibold text-lg">Polling</h4>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            Quick polls with simple yes/no or rating options
          </p>
        </button>
      </div>
    </div>
  );
};

export default ChooseKuesionerForm;
