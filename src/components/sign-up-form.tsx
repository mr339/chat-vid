"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowRight } from "lucide-react";
import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .min(2, "Username must be at least 2 characters"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must not exceed 100 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Please select a gender",
  }),
  agree: z
    .boolean()
    .refine((val) => val === true, "You must agree to the terms"),
  fileHandling: z.enum(["save", "delete"], {
    required_error: "Please select an option for file handling",
  }),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  resetPassword: z.boolean().optional(),
});

export function SignUpFormComponent() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      phone: "",
      gender: undefined,
      agree: false,
      fileHandling: undefined,
      website: "",
      resetPassword: false,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    // Handle form submission logic here
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-full min-w-[500px] max-w-full sm:max-w-[756px] p-4 sm:p-8 md:p-16 bg-white dark:bg-gray-800 flex flex-col justify-start items-start gap-8 border border-gray-200 dark:border-gray-700 rounded-lg"
    >
      <div className="w-full flex flex-col justify-start items-start">
        <h1 className="text-black dark:text-white text-2xl font-semibold font-['Inter'] leading-[38px]">
          Sign up
        </h1>
        <p className="text-black dark:text-gray-300 text-base font-normal font-['Inter'] leading-normal">
          Please provide required info to continue
        </p>
      </div>

      <div className="w-full flex flex-col justify-start items-start gap-4">
        <div className="w-full">
          <Label
            htmlFor="username"
            className="text-gray-950 dark:text-gray-200 text-sm font-medium font-['Inter'] leading-tight"
          >
            User Name <span className="text-[#ee4444]">*</span>
          </Label>
          <Input
            id="username"
            {...form.register("username")}
            placeholder="John Doe"
            className="mt-1 bg-white dark:bg-gray-700 text-black dark:text-white"
          />
          {form.formState.errors.username && (
            <p className="text-red-500 dark:text-red-400 text-sm mt-1">
              {form.formState.errors.username.message}
            </p>
          )}
        </div>

        <div className="w-full">
          <Label
            htmlFor="password"
            className="text-gray-950 dark:text-gray-200 text-sm font-medium font-['Inter'] leading-tight"
          >
            Password <span className="text-[#ee4444]">*</span>
          </Label>
          <Input
            id="password"
            type="password"
            {...form.register("password")}
            placeholder="**********"
            className="mt-1 bg-white dark:bg-gray-700 text-black dark:text-white"
          />
          {form.formState.errors.password && (
            <p className="text-red-500 dark:text-red-400 text-sm mt-1">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>

        <div className="flex items-center gap-4">
          <Controller
            name="resetPassword"
            control={form.control}
            render={({ field }) => (
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
                className="w-11 h-6 bg-gray-900 dark:bg-gray-600"
              />
            )}
          />
          <Label
            htmlFor="reset-password"
            className="text-gray-950 dark:text-gray-200 text-sm font-medium font-['Inter'] leading-tight"
          >
            Reset my password
          </Label>
        </div>

        <div className="w-full">
          <Label
            htmlFor="email"
            className="text-gray-950 dark:text-gray-200 text-sm font-medium font-['Inter'] leading-tight"
          >
            Email Address <span className="text-[#ee4444]">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            {...form.register("email")}
            placeholder="ava.wright@gmail.com"
            className="mt-1 bg-white dark:bg-gray-700 text-black dark:text-white"
          />
          {form.formState.errors.email && (
            <p className="text-red-500 dark:text-red-400 text-sm mt-1">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        <div className="w-full">
          <Label
            htmlFor="phone"
            className="text-gray-950 dark:text-gray-200 text-sm font-medium font-['Inter'] leading-tight"
          >
            Phone number <span className="text-[#ee4444]">*</span>
          </Label>
          <Input
            id="phone"
            {...form.register("phone")}
            placeholder="+977 1234567890"
            className="mt-1 bg-white dark:bg-gray-700 text-black dark:text-white"
          />
          {form.formState.errors.phone && (
            <p className="text-red-500 dark:text-red-400 text-sm mt-1">
              {form.formState.errors.phone.message}
            </p>
          )}
        </div>

        <div className="w-full">
          <Label
            htmlFor="gender"
            className="text-gray-950 dark:text-gray-200 text-sm font-medium font-['Inter'] leading-tight"
          >
            Select gender <span className="text-[#ee4444]">*</span>
          </Label>
          <Controller
            name="gender"
            control={form.control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {form.formState.errors.gender && (
            <p className="text-red-500 dark:text-red-400 text-sm mt-1">
              {form.formState.errors.gender.message}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Controller
            name="agree"
            control={form.control}
            render={({ field }) => (
              <Checkbox
                id="agree"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <Label
            htmlFor="agree"
            className="text-gray-950 dark:text-gray-200 text-sm font-medium font-['Inter'] leading-tight"
          >
            I agree and all
          </Label>
          {form.formState.errors.agree && (
            <p className="text-red-500 dark:text-red-400 text-sm mt-1">
              {form.formState.errors.agree.message}
            </p>
          )}
        </div>

        <Controller
          name="fileHandling"
          control={form.control}
          render={({ field }) => (
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value}
              className="flex flex-col sm:flex-row gap-4 sm:gap-8"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="save" id="save" />
                <Label
                  htmlFor="save"
                  className="text-gray-950 dark:text-gray-200 text-sm font-medium font-['Inter'] leading-tight"
                >
                  Save my File
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="delete" id="delete" />
                <Label
                  htmlFor="delete"
                  className="text-gray-950 dark:text-gray-200 text-sm font-medium font-['Inter'] leading-tight"
                >
                  Delete my all File
                </Label>
              </div>
            </RadioGroup>
          )}
        />
        {form.formState.errors.fileHandling && (
          <p className="text-red-500 dark:text-red-400 text-sm mt-1">
            {form.formState.errors.fileHandling.message}
          </p>
        )}

        <div className="w-full">
          <Label
            htmlFor="website"
            className="text-gray-950 dark:text-gray-200 text-sm font-medium font-['Inter'] leading-tight"
          >
            Website
          </Label>
          <div className="flex mt-1">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 border border-r-0 border-gray-300 dark:border-gray-500 rounded-l-md">
              http://
            </span>
            <Input
              id="website"
              {...form.register("website")}
              placeholder="www.figma.com"
              className="rounded-l-none bg-white dark:bg-gray-700 text-black dark:text-white"
            />
          </div>
          {form.formState.errors.website && (
            <p className="text-red-500 dark:text-red-400 text-sm mt-1">
              {form.formState.errors.website.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full sm:w-auto bg-gray-950 dark:bg-gray-200 text-gray-50 dark:text-gray-900 mt-4 hover:bg-gray-800 dark:hover:bg-gray-300"
        >
          Save and Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
