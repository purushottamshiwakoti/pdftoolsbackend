import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(2, { message: "Password is required" }),
});

export const registerSchema = z.object({
  fullName: z.string().min(2,{message:"Fullname is required"}),
  email: z.string().email(),
  password: z.string().min(6, { message: "Password must be minimum of 6 characters" }),
});

export const pageSchema = z.object({
  title: z.any().nullable(),
  shortDescription: z.optional(z.any()).nullable(),
  longDescription:  z.optional(z.any()).nullable(),
  stepDescription:  z.optional(z.any()).nullable(),
  featuresTitle:  z.optional(z.any()).nullable(),
  longDescriptionTitle:  z.optional(z.any()).nullable(),
});

export const stepSchema = z.object({
  title: z.string().min(3,{message:"Step title is required"}),
 
});

export const featuresSchema = z.object({
  title: z.string().min(3,{message:"Title is required"}),
  description: z.string().min(3,{message:"Description is required"}),
  icon: z.string().min(1,{message:"Icon is required"}),
 
});

