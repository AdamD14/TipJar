"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Rocket, ChevronRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "@/components/ui/buttons/Button";
import Input from "@/components/ui/forms/Input";
import { useToast } from "@/components/ui/notifications/Toast";
import { useCreateProduct } from "@/lib/api/premiumContent";
import { PRODUCT_TYPE_META, ProductType } from "@/types/premiumContent";
import { createProductSchema } from "./schemas";
import ProductTypeSelector from "./ProductTypeSelector";
import DisplayCategoryPicker from "./DisplayCategoryPicker";
import CourseModulesEditorV2 from "./content/CourseModulesEditorV2";
import LiveSessionSchedulerV2 from "./content/LiveSessionSchedulerV2";
import GenericContentUploadV2 from "./content/GenericContentUploadV2";

type ProductWizardData = z.infer<typeof createProductSchema>;

const STEPS = [
  { id: "type", label: "Type", description: "What are you selling?" },
  { id: "details", label: "Details", description: "Title, description & content" },
  { id: "access", label: "Access", description: "Pricing & access model" },
  { id: "delivery", label: "Delivery", description: "How fans receive it" },
  { id: "storefront", label: "Storefront", description: "Category & preview" },
] as const;

type StepId = (typeof STEPS)[number]["id"];

interface ProductCreateWizardV2Props {
  onPublished?: (productId: string) => void;
}

function getStepButtonClassName(index: number, currentStepIndex: number): string {
  const base = "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-heading font-medium transition-colors";
  if (index === currentStepIndex) {
    return base + " bg-teal-900/30 text-teal-400 border border-teal-400/40";
  }
  if (index < currentStepIndex) {
    return base + " bg-white/5 text-white/60 hover:bg-white/10";
  }
  return base + " bg-white/5 text-white/30 cursor-not-allowed";
}

function getStepIndicatorClassName(index: number, currentStepIndex: number): string {
  const base = "flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold";
  if (index === currentStepIndex) {
    return base + " bg-teal-400 text-teal-900";
  }
  if (index < currentStepIndex) {
    return base + " bg-green-500 text-white";
  }
  return base + " bg-white/10 text-white/30";
}

function getConnectorClassName(index: number, currentStepIndex: number): string {
  const base = "flex-1 h-0.5 rounded";
  return base + (index < currentStepIndex ? " bg-teal-400/40" : " bg-white/10");
}

export default function ProductCreateWizardV2({ onPublished }: ProductCreateWizardV2Props) {
  const router = useRouter();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors, isValid, dirtyFields },
  } = useForm<ProductWizardData>({
    resolver: zodResolver(createProductSchema) as any,
    mode: "onChange",
    defaultValues: {
      type: "gallery",
      currency: "USDC",
      accessModel: "one-time",
      delivery: "instant",
      status: "draft",
    },
  });

  const { mutateAsync, isPending: isCreating } = useCreateProduct();
  const toast = useToast();

  const watchedType = watch("type");
  const watchedAccessModel = watch("accessModel");
  const watchedDelivery = watch("delivery");

  const currentStep = STEPS[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === STEPS.length - 1;

  const goToStep = (index: number) => {
    setCurrentStepIndex(index);
  };

  const nextStep = async () => {
    const stepId = STEPS[currentStepIndex].id;
    const isStepValid = await trigger(stepId as keyof ProductWizardData);
    if (isStepValid && currentStepIndex < STEPS.length - 1) {
      goToStep(currentStepIndex + 1);
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      goToStep(currentStepIndex - 1);
    }
  };

  const onSubmit = async (data: ProductWizardData) => {
    setIsSubmitting(true);
    try {
      const created = await mutateAsync(data);
      toast.push({ type: "success", text: `${created.title} published.` });
      onPublished?.(created.id);
      router.push(`../${created.id}`);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to create product.";
      toast.push({ type: "error", text: message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep.id) {
      case "type":
        return (
          <div className="space-y-8">
            <ProductTypeSelector
              value={watchedType}
              onSelect={(type) => setValue("type", type, { shouldValidate: true })}
              error={errors.type?.message}
            />
          </div>
        );

      case "details":
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 ml-1">
                Title
              </label>
              <Input
                {...register("title")}
                placeholder="Product title"
                aria-invalid={!!errors.title}
                aria-describedby={errors.title ? "title-error" : undefined}
              />
              {errors.title && (
                <p id="title-error" className="text-xs text-red-400" role="alert">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 ml-1">
                Description (optional)
              </label>
              <textarea
                {...register("description")}
                rows={4}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/20 resize-none"
                placeholder="Describe what fans will get..."
                aria-invalid={!!errors.description}
                aria-describedby={errors.description ? "description-error" : undefined}
              />
              {errors.description && (
                <p id="description-error" className="text-xs text-red-400" role="alert">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="h-px bg-white/5" />

            {watchedType === "course" && (
              <CourseModulesEditorV2
                modules={watch("modules") ?? []}
                onChange={(modules) => setValue("modules", modules, { shouldValidate: true })}
                error={errors.modules?.message}
              />
            )}

            {watchedType === "live-session" && (
              <LiveSessionSchedulerV2
                value={watch("liveSession") ?? { scheduledAt: "", durationMinutes: 60 }}
                onChange={(liveSession) => setValue("liveSession", liveSession, { shouldValidate: true })}
                error={errors.liveSession?.message}
              />
            )}

            {!["course", "live-session"].includes(watchedType) && (
              <GenericContentUploadV2
                type={watchedType as Exclude<ProductType, "course" | "live-session">}
                files={watch("files") ?? []}
                onChange={(files) => setValue("files" as any, files)}
                error={errors.files ? String(errors.files.message) : undefined}
              />
            )}
          </div>
        );

      case "access":
        return (
          <div className="space-y-6">
            <fieldset className="space-y-2">
              <legend className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 ml-1">
                Access model
              </legend>
              <div className="space-y-2" role="radiogroup" aria-label="Access model">
                {(["one-time", "tier-included", "add-on"] as const).map((model) => (
                  <label
                    key={model}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl border transition-colors cursor-pointer ${
                      watchedAccessModel === model
                        ? "border-gold-400 bg-gold-400/5"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  >
                    <input
                      type="radio"
                      {...register("accessModel")}
                      value={model}
                      className="sr-only"
                      aria-describedby={`${model}-hint`}
                    />
                    <span className="flex-1">
                      <span className="block text-sm font-heading font-medium text-text-ds-primary">
                        {model === "one-time" ? "One-time purchase" : model === "tier-included" ? "Included in a tier" : "Paid add-on for subscribers"}
                      </span>
                      <span id={`${model}-hint`} className="block text-xs text-white/40 mt-0.5">
                        {model === "one-time" ? "Fan pays once, owns it forever" : model === "tier-included" ? "No separate price — bundled into subscription" : "Discounted price for active tier members"}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
              {errors.accessModel && (
                <p className="text-xs text-red-400" role="alert">{errors.accessModel.message}</p>
              )}
            </fieldset>

            {watchedAccessModel !== "tier-included" && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 ml-1">
                    Price ({watch("currency")})
                  </label>
                  <Input
                    type="text"
                    inputMode="numeric"
                    {...register("price", { valueAsNumber: true })}
                    placeholder="0"
                    className="tnum"
                    aria-invalid={!!errors.price}
                    aria-describedby={errors.price ? "price-error" : undefined}
                  />
                  {errors.price && (
                    <p id="price-error" className="text-xs text-red-400" role="alert">
                      {errors.price.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 ml-1">
                    Currency
                  </label>
                  <Input {...register("currency")} disabled className="bg-white/5" />
                </div>
              </div>
            )}
          </div>
        );

      case "delivery":
        return (
          <div className="space-y-6">
            <fieldset className="space-y-2">
              <legend className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 ml-1">
                Delivery method
              </legend>
              <div className="flex gap-2" role="radiogroup" aria-label="Delivery method">
                {(["instant", "scheduled-drop", "booking"] as const).map((method) => (
                  <label
                    key={method}
                    className={`flex-1 px-3 py-2.5 rounded-lg text-xs font-heading font-medium transition-colors text-center cursor-pointer ${
                      watchedDelivery === method
                        ? "bg-teal-700 text-white border border-teal-500/40"
                        : "bg-white/5 text-white/50 border border-white/10 hover:bg-white/10"
                    }`}
                  >
                    <input
                      type="radio"
                      {...register("delivery")}
                      value={method}
                      className="sr-only"
                    />
                    {method === "instant" ? "Instant" : method === "scheduled-drop" ? "Scheduled drop" : "Booking / Live"}
                  </label>
                ))}
              </div>
              {errors.delivery && (
                <p className="text-xs text-red-400" role="alert">{errors.delivery.message}</p>
              )}
            </fieldset>

            {watchedDelivery === "scheduled-drop" && (
              <div className="space-y-2">
                <label className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white/30 ml-1">
                  Release date & time
                </label>
                <Input
                  type="datetime-local"
                  {...register("scheduledAt")}
                  min={new Date().toISOString().slice(0, 16)}
                  aria-invalid={!!errors.scheduledAt}
                  aria-describedby={errors.scheduledAt ? "scheduledAt-error" : undefined}
                />
                {errors.scheduledAt && (
                  <p id="scheduledAt-error" className="text-xs text-red-400" role="alert">
                    {errors.scheduledAt.message}
                  </p>
                )}
              </div>
            )}
          </div>
        );

      case "storefront":
        return (
          <div className="space-y-6">
            <DisplayCategoryPicker
              value={watch("displayCategory")}
              onChange={(value) => setValue("displayCategory", value)}
            />
            <div className="pt-4 border-t border-white/10">
              <ProductPreviewCard data={watch()} />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full mt-8">
      <div className="max-w-5xl mx-auto">
        <nav
          className="flex items-center gap-2 mb-8"
          aria-label="Wizard progress"
          role="tablist"
        >
          {STEPS.map((step, index) => (
            <React.Fragment key={step.id}>
              <button
                role="tab"
                aria-selected={index === currentStepIndex}
                aria-controls={"panel-" + step.id}
                id={"tab-" + step.id}
                onClick={() => goToStep(index)}
                disabled={index > currentStepIndex && !dirtyFields[STEPS[currentStepIndex]?.id as keyof ProductWizardData]}
                className={getStepButtonClassName(index, currentStepIndex)}
              >
                <span className={getStepIndicatorClassName(index, currentStepIndex)}>
                  {index < currentStepIndex ? <ChevronRight size={10} /> : index + 1}
                </span>
                <span>{step.label}</span>
              </button>
              {index < STEPS.length - 1 && (
                <div className={getConnectorClassName(index, currentStepIndex)} />
              )}
            </React.Fragment>
          ))}
        </nav>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div
            id={"panel-" + currentStep.id}
            role="tabpanel"
            aria-labelledby={"tab-" + currentStep.id}
            className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 space-y-8 shadow-2xl"
          >
            {renderStepContent()}
          </div>

          <div className="flex items-center justify-between max-w-5xl mx-auto pt-4 mt-6 border-t border-teal-700/20">
            {!isFirstStep && (
              <button
                type="button"
                onClick={prevStep}
                className="flex items-center gap-2 text-sm text-text-ds-tertiary hover:text-white transition-colors"
                disabled={isSubmitting || isCreating}
              >
                <ArrowLeft size={16} />
                Back
              </button>
            )}

            {isLastStep ? (
              <Button
                variant="primary"
                size="lg"
                loading={isSubmitting || isCreating}
                type="submit"
                leftIcon={!isSubmitting && !isCreating ? <Rocket size={18} /> : undefined}
                disabled={!isValid || isSubmitting || isCreating}
              >
                Publish product
              </Button>
            ) : (
              <Button
                variant="primary"
                size="lg"
                onClick={nextStep}
                type="button"
                disabled={isSubmitting || isCreating}
                rightIcon={<ChevronRight size={18} />}
              >
                Continue
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

function ProductPreviewCard({ data }: { data: Partial<ProductWizardData> }) {
  const type = data.type ?? "gallery";
  const meta = PRODUCT_TYPE_META[type];
  const priceLabel =
    data.accessModel === "tier-included"
      ? "Included in tier"
      : data.price
      ? "$" + data.price.toLocaleString() + " " + (data.currency ?? "USDC")
      : "—";

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-teal-900 to-teal-800 border border-teal-500/20 rounded-xl p-6 shadow-2 backdrop-blur-md">
      <p className="text-[10px] font-heading font-bold text-teal-500/40 uppercase tracking-widest mb-1">
        {meta.label}
        {data.displayCategory ? " · " + data.displayCategory : ""}
      </p>
      <h3 className="text-xl font-heading font-bold text-text-ds-primary tracking-tight leading-tight">
        {data.title || "Untitled product"}
      </h3>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-teal-500/40 uppercase tracking-widest">
          {data.delivery === "scheduled-drop"
            ? "Drops soon"
            : data.delivery === "booking"
            ? "Live / booked"
            : "Instant access"}
        </span>
        <span className="text-lg font-heading font-bold text-gold-400 tnum">
          {priceLabel}
        </span>
      </div>
    </div>
  );
}