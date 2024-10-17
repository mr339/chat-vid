# Creating a Form with Validation in React

Follow these steps to create a form component with validation using Shadcn UI, React Hook Form, and Zod.

## Prerequisites

- Shadcn UI (@SHAD_CN)
- React Hook Form (@React Hook Form)
- Zod (@Zod)

## Step-by-Step Guide

1. **Check and Install Required Packages**
   Ensure all required packages are installed.

   [PAUSE HERE] Ask the user which package manager they are using (npm, yarn, or pnpm).

   Based on the user's response, provide the appropriate installation commands:

   For npm:

   ```bash
   # For Shadcn UI
   npx shadcn-ui@latest init
   npx shadcn-ui@latest add form

   # For React Hook Form and Zod
   npm install react-hook-form zod @hookform/resolvers
   ```

   For yarn:

   ```bash
   # For Shadcn UI
   npx shadcn-ui@latest init
   npx shadcn-ui@latest add form

   # For React Hook Form and Zod
   yarn add react-hook-form zod @hookform/resolvers
   ```

   For pnpm:

   ```bash
   # For Shadcn UI
   npx shadcn-ui@latest init
   npx shadcn-ui@latest add form

   # For React Hook Form and Zod
   pnpm add react-hook-form zod @hookform/resolvers
   ```

   [PAUSE HERE] Wait for confirmation that all packages are installed before proceeding.

   Note: The Shadcn UI initialization and form component addition commands are the same for all package managers as they use npx.

2. **Define Zod Schema**
   Create a schema that defines form fields and validation rules:

   ```tsx
   const formSchema = z.object({
     username: z.string().min(2, "Username must be at least 2 characters."),
     email: z.string().email("Please enter a valid email address."),
     age: z.number().min(18, "You must be at least 18 years old."),
   });
   ```

3. **Set Up React Hook Form**
   Use the `useForm` hook with Zod resolver:

   ```tsx
   const form = useForm<z.infer<typeof formSchema>>({
     resolver: zodResolver(formSchema),
     defaultValues: {
       username: "",
       email: "",
       age: 18,
     },
   });
   ```

4. **Handle Form Submission**
   Add a submit handler function:

   ```tsx
   const onSubmit = (values: z.infer<typeof formSchema>) => {
     console.log(values);
     // Handle form submission logic here
   };
   ```

## Best Practices

- Customize the schema based on your specific requirements
- Use appropriate input types (e.g., `type="email"` for email fields)
- Add aria labels and descriptions for accessibility
- Implement loading states and error handling for form submission
- Use Shadcn UI's theming for consistent styling

Remember to adjust fields, validation rules, and submission logic as needed for your use case.

## Creating a Comprehensive Form

Follow these steps to create a form with various input types and validation:

1. **Define Zod Schema**
   Create a schema for all required fields:

   ```tsx
   const formSchema = z.object({
     name: z.string().min(2, "Name must be at least 2 characters."),
     email: z.string().email("Invalid email address."),
     password: z.string().min(8, "Password must be at least 8 characters."),
     role: z.enum(["admin", "user", "guest"], {
       required_error: "Please select a role.",
     }),
     interests: z.array(z.string()).nonempty("Select at least one interest."),
     terms: z.boolean().refine((val) => val, "You must accept the terms."),
     notifications: z.enum(["all", "important", "none"], {
       required_error: "Please choose a notification preference.",
     }),
     subscribed: z.boolean(),
     phone: z.string().regex(/^\d{10}$/, "Invalid phone number."),
   });
   ```

2. **Set Up React Hook Form**
   Initialize the form with the schema:

   ```tsx
   const form = useForm<z.infer<typeof formSchema>>({
     resolver: zodResolver(formSchema),
     defaultValues: {
       name: "",
       email: "",
       password: "",
       role: undefined,
       interests: [],
       terms: false,
       notifications: undefined,
       subscribed: false,
       phone: "",
     },
   });
   ```

3. **Handle Form Submission**
   Add a submit handler function:

   ```tsx
   const onSubmit = (values: z.infer<typeof formSchema>) => {
     console.log(values);
     // Handle form submission logic here
   };
   ```

**IMPORTANT**

- Make sure to pause at step 1 'Check and Install Required Packages [PAUSE HERE] Wait for confirmation that all packages are installed before proceeding.'
- Make sure to pause at step 2 'Define Required Input Fields [PAUSE HERE] Ask the user to list their required input fields with their types. For example:
- Remember to import all necessary components from Shadcn UI and adjust the form fields and validation rules according to your specific requirements.
- Remember to use CheckboxGroup for checkbox with multiple options.
- Remember to adjust the schema and Controller components based on your specific form fields and requirements. If a field is not required, simply mark it as `.optional()` in the Zod schema.
- For fields marked with a red asterisk (`<span className="text-[#ee4444]">*</span>`), use `.min(1, "Field is required")` to ensure that the field is marked as required and will show an appropriate error message if left empty. For other fields, make them optional.