import Form from "./utilities/Form";

export default function SignupForm({
  formData,
  setFormData,
  handleSubmit,
  error,
}) {
  const handleInputChange = (e) => {
    const name = e.target.name;
    setFormData((prev) => ({ ...prev, [name]: e.target.value }));
  };

  return (
    <div className="w-1/2">
      <Form
        onSubmit={handleSubmit}
        title={"Sign Up"}
        error={error?.status === 400 ? error.response_message : false}
      >
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300"
          >
            email address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData["email"]}
            onChange={handleInputChange}
            required
            autoComplete="email"
            className="mt-1 w-full p-2 border border-gray-500 text-white bg-black  focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
          />
        </div>
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-300"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData["username"]}
            onChange={handleInputChange}
            required
            autoComplete="username"
            className="mt-1 w-full p-2 border border-gray-500 text-white bg-black  focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-300"
          >
            password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData["password"]}
            onChange={handleInputChange}
            required
            autoComplete="new-password"
            className="mt-1 w-full p-2 border border-gray-500 text-white bg-black  focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
          />
        </div>
        <div>
          <label
            htmlFor="password2"
            className="block text-sm font-medium text-gray-300"
          >
            Re-type password
          </label>
          <input
            type="password"
            id="password2"
            name="password2"
            value={formData["password2"]}
            onChange={handleInputChange}
            required
            autoComplete="new-password"
            className="mt-1 w-full p-2 border border-gray-500 text-white bg-black  focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
          />
        </div>
      </Form>
    </div>
  );
}
