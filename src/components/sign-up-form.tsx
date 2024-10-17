"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  username: z
    .string()
    .min(2, "Username must be at least 2 characters.")
    .min(1, "Username is required."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .min(1, "Password is required."),
  resetPassword: z.boolean(),
  email: z
    .string()
    .email("Invalid email address.")
    .min(1, "Email is required."),
  phone: z
    .string()
    .regex(/^\+?[0-9\s-()]{7,}$/, "Invalid phone number.")
    .min(1, "Phone number is required."),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Please select a gender.",
  }),
  agree: z.boolean().refine((val) => val, "You must agree to the terms."),
  fileOption: z.enum(["save", "delete"], {
    required_error: "Please choose a file option.",
  }),
  website: z.string().url("Invalid URL.").optional(),
});

export function SignUpFormComponent() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      resetPassword: false,
      email: "",
      phone: "",
      gender: undefined,
      agree: false,
      fileOption: undefined,
      website: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    // Handle form submission logic here
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full min-w-[500px] max-w-full sm:max-w-[756px] p-4 sm:p-8 md:p-16 bg-white flex flex-col justify-start items-start gap-8 border border-gray-200 rounded-lg"
      >
        <div className="w-full flex flex-col justify-start items-start">
          <h1 className="text-black text-2xl font-semibold font-['Inter'] leading-[38px]">
            Sign up
          </h1>
          <p className="text-black text-base font-normal font-['Inter'] leading-normal">
            Please provide required info to continue
          </p>
        </div>

        <div className="w-full flex flex-col justify-start items-start gap-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel
                  htmlFor="username"
                  className="text-gray-950 text-sm font-medium font-['Inter'] leading-tight"
                >
                  User Name <span className="text-[#ee4444]">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    id="username"
                    placeholder="John Doe"
                    {...field}
                    className="mt-1"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel
                  htmlFor="password"
                  className="text-gray-950 text-sm font-medium font-['Inter'] leading-tight"
                >
                  Password <span className="text-[#ee4444]">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    id="password"
                    type="password"
                    placeholder="**********"
                    {...field}
                    className="mt-1"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="resetPassword"
            render={({ field }) => (
              <FormItem className="flex items-center gap-4">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="w-11 h-6 bg-gray-900"
                  />
                </FormControl>
                <FormLabel
                  htmlFor="reset-password"
                  className="text-gray-950 text-sm font-medium font-['Inter'] leading-tight"
                >
                  Reset my password
                </FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel
                  htmlFor="email"
                  className="text-gray-950 text-sm font-medium font-['Inter'] leading-tight"
                >
                  Email Address <span className="text-[#ee4444]">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    type="email"
                    placeholder="ava.wright@gmail.com"
                    {...field}
                    className="mt-1"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel
                  htmlFor="phone"
                  className="text-gray-950 text-sm font-medium font-['Inter'] leading-tight"
                >
                  Phone number <span className="text-[#ee4444]">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    id="phone"
                    placeholder="+977 1234567890"
                    {...field}
                    className="mt-1"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel
                  htmlFor="gender"
                  className="text-gray-950 text-sm font-medium font-['Inter'] leading-tight"
                >
                  Select gender <span className="text-[#ee4444]">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full mt-1">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="agree"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    id="agree"
                  />
                </FormControl>
                <FormLabel
                  htmlFor="agree"
                  className="text-gray-950 text-sm font-medium font-['Inter'] leading-tight"
                >
                  I agree and all
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fileOption"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-gray-950 text-sm font-medium font-['Inter'] leading-tight">
                  File Option
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col sm:flex-row gap-4 sm:gap-8"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="save" id="save" />
                      <Label htmlFor="save">Save my File</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="delete" id="delete" />
                      <Label htmlFor="delete">Delete my all File</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel
                  htmlFor="website"
                  className="text-gray-950 text-sm font-medium font-['Inter'] leading-tight"
                >
                  Website
                </FormLabel>
                <FormControl>
                  <div className="flex mt-1">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                      http://
                    </span>
                    <Input
                      id="website"
                      placeholder="www.figma.com"
                      {...field}
                      className="rounded-l-none"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full sm:w-auto bg-gray-950 text-gray-50 mt-4"
          >
            Save and Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </Form>
  );
}
