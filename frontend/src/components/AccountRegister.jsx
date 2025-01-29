import React from "react";
import InputField from "./InputField";
import { Controller, useForm } from "react-hook-form";
import Button from "./material3/Button";

const ErrorMessage = ({ error }) => {
  return error ? (
    <p className="text-red-error-500 text-sm font-thin">{error.message}</p>
  ) : null;
};

function AccountRegister() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      jurisdiction_wards: [],
      jurisdiction_departments: [],
      first_name: "",
      last_name: "",
      email: "",
      role: "",
      username: "",
      password: "",
      jurisdiction_level: "",
    },
  });

  const availableWards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const availableDepartments = [
    "Health",
    "Education",
    "Finance",
    "Agriculture",
  ];

  const jurisdictionLevel = watch("jurisdiction_level");

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
  };

  return (
    <section className="py-2">
      <header className="p-2">
        <h1 className="m3-title-medium">Register a user</h1>
      </header>
      <main className="px-2">
        <div className="_wrapper w-full p-2 border border-slate-100 rounded-md">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Basic Information Fields */}
            <div className="flex items-center justify-start gap-3 flex-wrap">
              <label className="flex flex-col items-start">
                First Name:
                <InputField
                  type="text"
                  {...register("first_name", {
                    required: "First name is required",
                  })}
                />
                <ErrorMessage error={errors.first_name} />
              </label>
              <label className="flex flex-col items-start">
                Last Name:
                <InputField
                  type="text"
                  {...register("last_name", {
                    required: "Last name is required",
                  })}
                />
                <ErrorMessage error={errors.last_name} />
              </label>
              <label className="flex flex-col items-start">
                Email:
                <InputField
                  type="email"
                  {...register("email", { required: "Email is required" })}
                />
                <ErrorMessage error={errors.email} />
              </label>
            </div>

            {/* Role, Username, and Password */}
            <div className="flex items-center justify-start gap-3 flex-wrap">
              <label className="flex flex-col items-start">
                Role:
                <InputField
                  type="text"
                  {...register("role", { required: "Role is required" })}
                />
                <ErrorMessage error={errors.role} />
              </label>
              <label className="flex flex-col items-start">
                Username:
                <InputField
                  type="text"
                  autoComplete="off"
                  {...register("username", {
                    required: "Username is required",
                  })}
                />
                <ErrorMessage error={errors.username} />
              </label>
              <label className="flex flex-col items-start">
                Password:
                <InputField
                  type="password"
                  autoComplete="off"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                <ErrorMessage error={errors.password} />
              </label>
            </div>

            {/* Jurisdiction Level Selection */}
            <section className="flex flex-col">
              <div className="flex items-center justify-start w-full">
                <p className="pe-3">Jurisdiction Level:</p>
                <div className="flex items-center justify-start gap-3">
                  <label>
                    <InputField
                      type="radio"
                      value="WARD"
                      {...register("jurisdiction_level", {
                        required: "Jurisdiction level is required",
                      })}
                    />{" "}
                    Ward
                  </label>
                  <label>
                    <InputField
                      type="radio"
                      value="DEPARTMENT"
                      {...register("jurisdiction_level")}
                    />{" "}
                    Department
                  </label>
                  <label>
                    <InputField
                      type="radio"
                      value="PALIKA"
                      {...register("jurisdiction_level")}
                    />{" "}
                    Palika
                  </label>
                </div>
              </div>

              {/* Conditional Ward or Department Selection with Validation */}
              {jurisdictionLevel === "WARD" && (
                <section>
                  <div className="flex flex-col gap-2">
                    Select Jurisdiction Wards:
                    <Controller
                      name="jurisdiction_wards"
                      control={control}
                      rules={{
                        validate: (value) =>
                          value.length > 0 || "Please select at least one ward",
                      }}
                      render={({ field }) => (
                        <>
                          {availableWards.map((ward) => (
                            <label
                              key={ward}
                              className="flex items-center gap-1"
                            >
                              <input
                                type="checkbox"
                                value={ward}
                                checked={field.value.includes(ward)}
                                onChange={(e) => {
                                  const updatedWards = e.target.checked
                                    ? [...field.value, ward]
                                    : field.value.filter((w) => w !== ward);
                                  field.onChange(updatedWards);
                                }}
                              />
                              Ward {ward}
                            </label>
                          ))}
                        </>
                      )}
                    />
                    <ErrorMessage error={errors.jurisdiction_wards} />
                  </div>
                </section>
              )}
              <ErrorMessage error={errors.jurisdiction_level} />
            </section>

            <footer className="flex justify-start">
              <Button type="submit">Register</Button>
            </footer>
          </form>
        </div>
      </main>
    </section>
  );
}

export default AccountRegister;
