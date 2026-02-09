"use client";

import * as React from "react";
import { useState, useRef, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import type { ContactSubject } from "@/types/portfolio";
import {
  IconArrowLeft,
  IconArrowRight,
  IconSend,
  IconCheck,
  IconShieldCheck,
} from "@tabler/icons-react";

// ── Zod schemas with regex and refine ────────────────────────────────────────

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const step1Schema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(50, "Name must be at most 50 characters.")
    .refine(
      (val) => val.trim().length > 0,
      "Name cannot be only whitespace."
    ),
  email: z
    .string()
    .regex(emailRegex, "Please enter a valid email address."),
});

const subjectOptions: { value: ContactSubject; label: string }[] = [
  { value: "collaboration", label: "Collaboration" },
  { value: "job-opportunity", label: "Job Opportunity" },
  { value: "freelance", label: "Freelance Work" },
  { value: "question", label: "General Question" },
  { value: "other", label: "Other" },
];

const step2Schema = z.object({
  subject: z.enum(
    ["collaboration", "job-opportunity", "freelance", "question", "other"],
    { message: "Please select a subject." }
  ),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters.")
    .max(500, "Message must be at most 500 characters.")
    .refine(
      (val) => val.trim().split(/\s+/).length >= 3,
      "Message must contain at least 3 words."
    ),
});

const fullSchema = step1Schema.merge(step2Schema);

type FormData = z.infer<typeof fullSchema>;

// ── Custom control: Subject Tag Picker ───────────────────────────────────────

interface SubjectPickerProps {
  value: ContactSubject | undefined;
  onChange: (value: ContactSubject) => void;
}

function SubjectPicker({ value, onChange }: SubjectPickerProps) {
  return (
    <div className="flex flex-wrap gap-2" role="radiogroup">
      {subjectOptions.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={value === option.value}
          onClick={() => onChange(option.value)}
          className="focus:outline-none"
        >
          <Badge
            variant={value === option.value ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary/20 active:scale-95 transition-all px-3 py-1 text-sm"
          >
            {option.label}
          </Badge>
        </button>
      ))}
    </div>
  );
}

// ── Step indicators ──────────────────────────────────────────────────────────

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  const stepLabels = ["Your Info", "Message", "Review"];
  return (
    <div className="flex items-center justify-center gap-2 mb-6">
      {Array.from({ length: totalSteps }, (_, i) => (
        <React.Fragment key={i}>
          <div className="flex items-center gap-2">
            <div
              className={`size-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                i < currentStep
                  ? "bg-primary text-primary-foreground"
                  : i === currentStep
                    ? "bg-primary text-primary-foreground ring-2 ring-primary/30 ring-offset-2 ring-offset-background"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {i < currentStep ? <IconCheck className="size-4" /> : i + 1}
            </div>
            <span className="hidden sm:inline text-xs text-muted-foreground">
              {stepLabels[i]}
            </span>
          </div>
          {i < totalSteps - 1 && (
            <div className={`h-px w-8 sm:w-12 ${i < currentStep ? "bg-primary" : "bg-border"}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// ── Inner form (needs reCAPTCHA context) ─────────────────────────────────────

function ContactFormInner() {
  const [step, setStep] = useState<number>(0);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const form = useForm<FormData>({
    resolver: zodResolver(fullSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: undefined,
      message: "",
    },
    mode: "onTouched",
  });

  const validateStep = useCallback(async (currentStep: number): Promise<boolean> => {
    if (currentStep === 0) {
      return form.trigger(["name", "email"]);
    }
    if (currentStep === 1) {
      return form.trigger(["subject", "message"]);
    }
    return true;
  }, [form]);

  const handleNext = useCallback(async () => {
    const valid = await validateStep(step);
    if (valid) setStep((s) => Math.min(s + 1, 2));
  }, [step, validateStep]);

  const handleBack = useCallback(() => {
    setStep((s) => Math.max(s - 1, 0));
  }, []);

  const onSubmit = useCallback(async (data: FormData) => {
    let token = "";
    if (executeRecaptcha) {
      try {
        token = await executeRecaptcha("contact_form");
      } catch {
        // reCAPTCHA may fail with test keys, continue anyway
      }
    }

    // In production, you'd send this to your API
    console.log("Form submitted:", { ...data, recaptchaToken: token });
    setSubmitted(true);
  }, [executeRecaptcha]);

  if (submitted) {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="text-center py-12">
          <div className="size-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <IconCheck className="size-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
          <p className="text-muted-foreground mb-6">
            Thanks for reaching out. I&apos;ll get back to you soon.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSubmitted(false);
              setStep(0);
              form.reset();
            }}
          >
            Send Another Message
          </Button>
        </CardContent>
      </Card>
    );
  }

  const values = form.getValues();

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Send a Message</CardTitle>
        <CardDescription>
          Fill out the form below and I&apos;ll get back to you as soon as possible.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <StepIndicator currentStep={step} totalSteps={3} />

        <form
          ref={formRef}
          id="contact-form"
          onSubmit={form.handleSubmit(onSubmit)}
          noValidate
        >
          {/* Step 1: Personal Info */}
          {step === 0 && (
            <FieldGroup className="animate-fade-in">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="contact-name">Name</FieldLabel>
                    <Input
                      {...field}
                      id="contact-name"
                      placeholder="Your name"
                      aria-invalid={fieldState.invalid}
                      autoComplete="name"
                    />
                    <FieldDescription>
                      How should I address you?
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="contact-email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="contact-email"
                      type="email"
                      placeholder="you@example.com"
                      aria-invalid={fieldState.invalid}
                      autoComplete="email"
                    />
                    <FieldDescription>
                      I&apos;ll use this to reply to you.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          )}

          {/* Step 2: Message */}
          {step === 1 && (
            <FieldGroup className="animate-fade-in">
              <Controller
                name="subject"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Subject</FieldLabel>
                    <SubjectPicker
                      value={field.value}
                      onChange={field.onChange}
                    />
                    <FieldDescription>
                      What is this about?
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="message"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="contact-message">Message</FieldLabel>
                    <Textarea
                      {...field}
                      id="contact-message"
                      placeholder="Tell me about your project, idea, or question..."
                      rows={5}
                      className="min-h-[120px] resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                    <FieldDescription>
                      {field.value.length}/500 characters
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          )}

          {/* Step 3: Review */}
          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <p className="text-sm text-muted-foreground">
                Please review your information before submitting:
              </p>
              <div className="rounded-lg border border-border p-4 space-y-3 text-sm">
                <div>
                  <span className="font-medium">Name:</span>{" "}
                  <span className="text-muted-foreground">{values.name}</span>
                </div>
                <div>
                  <span className="font-medium">Email:</span>{" "}
                  <span className="text-muted-foreground">{values.email}</span>
                </div>
                <div>
                  <span className="font-medium">Subject:</span>{" "}
                  <Badge variant="secondary" className="ml-1">
                    {subjectOptions.find((o) => o.value === values.subject)?.label ?? values.subject}
                  </Badge>
                </div>
                <div>
                  <span className="font-medium">Message:</span>
                  <p className="text-muted-foreground mt-1 whitespace-pre-wrap">
                    {values.message}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <IconShieldCheck className="size-4 text-primary" />
                Protected by reCAPTCHA
              </div>
            </div>
          )}
        </form>
      </CardContent>

      <CardFooter className="justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={handleBack}
          disabled={step === 0}
        >
          <IconArrowLeft className="size-4 mr-1" />
          Back
        </Button>

        {step < 2 ? (
          <Button type="button" onClick={handleNext}>
            Next
            <IconArrowRight className="size-4 ml-1" />
          </Button>
        ) : (
          <Button type="submit" form="contact-form">
            <IconSend className="size-4 mr-1" />
            Submit
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

// ── Wrapper with reCAPTCHA Provider ──────────────────────────────────────────

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"; // test key

export function ContactSection() {
  return (
    <section id="contact" className="py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Get in Touch
          </h2>
          <div className="mt-2 h-1 w-12 bg-primary rounded-full mx-auto" />
          <p className="mt-4 text-muted-foreground">
            Have a project in mind or just want to chat? Drop me a message!
          </p>
        </div>

        <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
          <ContactFormInner />
        </GoogleReCaptchaProvider>
      </div>
    </section>
  );
}
