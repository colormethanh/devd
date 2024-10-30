import Form from "./Form";

export default function SignupForm({ formData, setFormData, handleSubmit }) {
  const handleInputChange = (e) => {
    const name = e.target.name;
    setFormData((prev) => ({ ...prev, [name]: e.target.value }));
  };

  return (
    <Form onSubmit={handleSubmit} title={"Sign Up"}>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          email address
        </label>
        <input
          type="text"
          id="email"
          name="email"
          value={formData["email"]}
          onChange={handleInputChange}
          required
          className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
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
          className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
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
          className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label
          htmlFor="password2"
          className="block text-sm font-medium text-gray-700"
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
          className="mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </Form>
  );
}
