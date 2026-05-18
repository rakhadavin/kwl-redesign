import { useFieldArray } from "react-hook-form";

const CreateDetailKuesionerForms = ({
  register,
  errors,
  control,
  handleSubmit,
  onSubmit,
  handleBack,
  handleClose,
  selectedTemplate,
  create,
}: any) => {
  const {
    fields: questionFields,
    append: appendQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    control,
    name: "questions",
  });

  const handleAddQuestion = () => {
    appendQuestion({
      number: questionFields.length + 1, // Auto-increment question number
      question_text: "",
      time_limit: 60,
      score: 10,
      ...(selectedTemplate !== "Open Ended" && {
        choices: [
          { choice_text: "", is_correct: false },
          { choice_text: "", is_correct: false },
        ],
      }),
      ...(selectedTemplate === "Multiple Choice" && {
        correct_choice: "0",
      }),
    });
  };

  const addInitialQuestion = () => {
    if (questionFields.length === 0) {
      handleAddQuestion();
    }
  };

  return (
    <div>
      {/* <button
        type="button"
        onClick={handleBack}
        className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
      >
        ← Back
      </button> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          {/* Title */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-semibold mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              {...register("title", {
                required: {
                  value: true,
                  message: "Title is required",
                },
                maxLength: {
                  value: 100,
                  message: "Max length is 100 characters",
                },
              })}
              type="text"
              placeholder="Enter kuesioner title..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">
                {errors.title?.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-semibold mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              {...register("description", {
                maxLength: {
                  value: 500,
                  message: "Max length is 500 characters",
                },
              })}
              placeholder="Add a description for your kuesioner..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">
                {errors.description?.message}
              </p>
            )}
          </div>

          {/* Questions Section */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-semibold">
                Questions <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                onClick={handleAddQuestion}
                className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 flex items-center gap-1"
              >
                <span>+</span> Add Question
              </button>
            </div>

            {questionFields.length === 0 && (
              <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <p className="text-gray-500 mb-3">No questions added yet</p>
                <button
                  type="button"
                  onClick={addInitialQuestion}
                  className="text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Add Your First Question
                </button>
              </div>
            )}

            {/* Render Questions */}
            {questionFields.map((field, questionIndex) => (
              <QuestionItem
                key={field.id}
                questionIndex={questionIndex}
                register={register}
                control={control}
                errors={errors}
                removeQuestion={removeQuestion}
                selectedTemplate={selectedTemplate}
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition-colors flex items-center gap-2"
            >
              {`${create ? "Buat" : "Edit"} Kuesioner`}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

// Question Item Component
const QuestionItem = ({
  questionIndex,
  register,
  control,
  errors,
  removeQuestion,
  selectedTemplate,
}: any) => {
  // Manage choices for this question
  const {
    fields: choiceFields,
    append: appendChoice,
    remove: removeChoice,
  } = useFieldArray({
    control,
    name: `questions.${questionIndex}.choices`,
  });

  const handleAddChoice = () => {
    appendChoice({ choice_text: "", is_correct: false });
  };

  return (
    <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-semibold text-sm text-gray-700">
          Question {questionIndex + 1}
        </h4>
        <button
          type="button"
          onClick={() => removeQuestion(questionIndex)}
          className="text-red-500 hover:text-red-700 text-sm"
        >
          ✕ Remove
        </button>
      </div>

      {/* Question Text */}
      <div className="mb-3">
        {/* Hidden input for question number */}
        <input
          {...register(`questions.${questionIndex}.number`)}
          type="hidden"
          value={questionIndex + 1}
        />

        <label className="block text-xs font-semibold mb-1">
          Question Text <span className="text-red-500">*</span>
        </label>
        <input
          {...register(`questions.${questionIndex}.question_text`, {
            required: "Question text is required",
          })}
          type="text"
          placeholder="Enter your question..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        {errors?.questions?.[questionIndex]?.questionText && (
          <p className="text-red-500 text-xs mt-1">
            {errors.questions[questionIndex].questionText.message}
          </p>
        )}
      </div>

      {selectedTemplate === "Multiple Choice" && (
        <div
          className={`grid ${
            selectedTemplate === "Multiple Choice"
              ? "grid-cols-2"
              : "grid-cols-1"
          } gap-3 mb-3`}
        >
          {/* Time Limit */}
          <div>
            <label className="block text-xs font-semibold mb-1">
              Time Limit (seconds)
            </label>
            <input
              {...register(`questions.${questionIndex}.time_limit`, {
                valueAsNumber: true,
                min: { value: 1, message: "Min 1 second" },
              })}
              type="number"
              placeholder="60"
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            {errors?.questions?.[questionIndex]?.timeLimit && (
              <p className="text-red-500 text-xs mt-1">
                {errors.questions[questionIndex].timeLimit.message}
              </p>
            )}
          </div>

          {/* Score */}
          {selectedTemplate === "Multiple Choice" && (
            <div>
              <label className="block text-xs font-semibold mb-1">Score</label>
              <input
                {...register(`questions.${questionIndex}.score`, {
                  valueAsNumber: true,
                  min: { value: 0, message: "Min 0" },
                })}
                type="number"
                placeholder="10"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              {errors?.questions?.[questionIndex]?.score && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.questions[questionIndex].score.message}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Choices Section - Only for Multiple Choice */}
      {(selectedTemplate === "Multiple Choice" ||
        selectedTemplate === "Polling") && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-semibold">
              Answer Choices <span className="text-red-500">*</span>
            </label>
            <button
              type="button"
              onClick={handleAddChoice}
              className="text-xs text-blue-600 hover:text-blue-700"
            >
              + Add Choice
            </button>
          </div>

          {choiceFields.map((choice, choiceIndex) => (
            <div key={choice.id} className="flex gap-2 mb-2">
              <input
                {...register(
                  `questions.${questionIndex}.choices.${choiceIndex}.choice_text`,
                  {
                    required: "Choice text is required",
                  }
                )}
                type="text"
                placeholder={`Choice ${choiceIndex + 1}...`}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />

              {selectedTemplate === "Multiple Choice" && (
                <label className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg bg-white">
                  <input
                    {...register(`questions.${questionIndex}.correct_choice`)}
                    type="radio"
                    value={choiceIndex.toString()}
                    className="w-4 h-4"
                  />
                  <span className="text-xs">Correct</span>
                </label>
              )}

              {choiceFields.length > 2 && (
                <button
                  type="button"
                  onClick={() => removeChoice(choiceIndex)}
                  className="px-2 text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              )}
            </div>
          ))}

          {errors?.questions?.[questionIndex]?.choices && (
            <p className="text-red-500 text-xs mt-1">
              Please fill all choice fields
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default CreateDetailKuesionerForms;
