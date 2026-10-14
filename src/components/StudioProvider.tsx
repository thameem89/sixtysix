"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  type ReactNode,
  type KeyboardEventHandler,
  useId,
} from "react";
import {
  X,
  ArrowUpRight,
  Check,
  LoaderCircle,
  MessageCircle,
} from "lucide-react";
import {
  salonConfig,
  track,
  whatsappUrl,
  earliestAppointmentDate,
} from "@/data/salon";
import { categories, services } from "@/data/services";
import { team } from "@/data/gallery";
import { validateEnquiry, type Enquiry } from "@/data/validation";
type RequestKind = "priority" | "appointment";
const Context = createContext<{
  open: (kind?: RequestKind, service?: string) => void;
}>({ open: () => {} });
export function useStudio() {
  return useContext(Context);
}
export function Modal({
  title,
  children,
  onClose,
  wide = false,
  className = "",
  onKeyDown,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
  wide?: boolean;
  className?: string;
  onKeyDown?: KeyboardEventHandler<HTMLDialogElement>;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    const previous = document.activeElement as HTMLElement;
    d?.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className={`modal ${wide ? "wide" : ""} ${className}`}
      aria-label={title}
      onCancel={onClose}
      onKeyDown={onKeyDown}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button className="close" aria-label="Close dialog" onClick={onClose}>
        <X size={22} />
      </button>
      {children}
    </dialog>
  );
}
function ServiceSelector({
  kind,
  selectedService,
  error,
}: {
  kind: RequestKind;
  selectedService: string;
  error?: string;
}) {
  const [chosen, setChosen] = useState<string[]>(
    selectedService ? [selectedService] : [],
  );
  const options = [
    "Personal consultation",
    ...(kind === "priority"
      ? categories.map((c) => c.name)
      : services.map((s) => s.name)),
  ];
  return (
    <fieldset className="service-selector full">
      <legend>Preferred services</legend>
      <details>
        <summary>
          {chosen.length
            ? `${chosen.length} service${chosen.length > 1 ? "s" : ""} selected`
            : "Choose your services"}
          <span>＋</span>
        </summary>
        <div className="service-options">
          {options.map((name) => (
            <label key={name}>
              <input
                type="checkbox"
                name="services"
                value={name}
                checked={chosen.includes(name)}
                disabled={chosen.length >= 8 && !chosen.includes(name)}
                onChange={(e) =>
                  setChosen((previous) =>
                    e.target.checked
                      ? [...previous, name]
                      : previous.filter((s) => s !== name),
                  )
                }
              />
              <span>{name}</span>
            </label>
          ))}
        </div>
      </details>
      {chosen.length > 0 && (
        <p className="chosen-services">{chosen.join(" · ")}</p>
      )}
      {error && (
        <p className="field-error" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  );
}
export function EnquiryForm({
  kind = "priority",
  selectedService = "",
  onComplete,
}: {
  kind?: RequestKind;
  selectedService?: string;
  onComplete?: () => void;
}) {
  const formId = useId();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");
  async function submit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = {
      ...Object.fromEntries(form),
      kind,
      service: form.getAll("services").map(String).join(", "),
      services: form.getAll("services").map(String),
      consent: form.get("consent") === "on",
    } as Enquiry;
    const validation = validateEnquiry(data, earliestAppointmentDate());
    setErrors(validation);
    if (Object.keys(validation).length) return;
    setState("loading");
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        setErrors(result.errors || {});
        throw new Error(
          result.error || "Please check your details and try again.",
        );
      }
      setMessage(result.message);
      setState("success");
      track(
        kind === "priority"
          ? "priority_list_submitted"
          : "appointment_submitted",
      );
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to send. Please try again.",
      );
      setState("error");
    }
  }
  const input = (
    name: string,
    label: string,
    type = "text",
    required = true,
  ) => (
    <label className="field">
      {label}
      <input
        name={name}
        aria-label={label}
        type={type}
        required={required}
        aria-invalid={!!errors[name]}
        aria-describedby={errors[name] ? `${formId}-${name}-error` : undefined}
        autoComplete={
          name === "name"
            ? "name"
            : name === "mobile"
              ? "tel"
              : name === "email"
                ? "email"
                : "off"
        }
        placeholder={
          name === "name"
            ? "Your full name"
            : name === "mobile"
              ? "+971 50 000 0000"
              : name === "email"
                ? "you@example.com"
                : undefined
        }
        maxLength={name === "name" ? 100 : 254}
      />
      {errors[name] && (
        <span id={`${formId}-${name}-error`} className="field-error">
          {errors[name]}
        </span>
      )}
    </label>
  );
  if (state === "success")
    return (
      <div className="success" role="status">
        <Check size={36} />
        <h3>You’re on our radar.</h3>
        <p>{message}</p>
        {onComplete && (
          <button className="button" onClick={onComplete}>
            Done <Check size={16} />
          </button>
        )}
      </div>
    );
  return (
    <form className="enquiry-form" onSubmit={submit} noValidate>
      <div className="form-grid">
        {input("name", "Full name")}
        {input("mobile", "UAE mobile number", "tel")}
        {input("email", "Email address", "email")}
        <ServiceSelector
          kind={kind}
          selectedService={selectedService}
          error={errors.service}
        />
        {kind === "appointment" && (
          <>
            <label className="field">
              Preferred barber
              <select name="specialist">
                <option>No preference</option>
                {team
                  .filter((t) => t.published)
                  .map((t) => (
                    <option key={t.name}>{t.name}</option>
                  ))}
              </select>
            </label>
            {(salonConfig.bookingEnabled || salonConfig.launchDate) && (
              <>
                <label className="field">
                  Preferred date <span className="optional">(optional)</span>
                  <input
                    type="date"
                    name="date"
                    min={earliestAppointmentDate()}
                  />
                  {errors.date && (
                    <span className="field-error">{errors.date}</span>
                  )}
                </label>
                <label className="field">
                  Preferred time
                  <select name="time">
                    <option value="">No preference</option>
                    <option value="morning">Morning</option>
                    <option value="afternoon">Afternoon</option>
                    <option value="evening">Evening</option>
                  </select>
                </label>
              </>
            )}
          </>
        )}
        <label className="field full">
          Message <span className="optional">(optional)</span>
          <textarea name="notes" maxLength={2000} rows={3} />
          {errors.notes && <span className="field-error">{errors.notes}</span>}
        </label>
      </div>
      <div className="honeypot" aria-hidden="true">
        <label>
          Leave this empty
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label className="consent">
        <input type="checkbox" name="consent" />{" "}
        <span>
          I agree to be contacted about{" "}
          {kind === "priority"
            ? "launch updates and priority access"
            : "this appointment request"}
          . My details will be used only for this purpose.
        </span>
      </label>
      {errors.consent && <p className="field-error">{errors.consent}</p>}
      {state === "error" && (
        <p className="form-error" role="alert">
          {message}
        </p>
      )}
      <button className="button" disabled={state === "loading"} type="submit">
        {state === "loading" ? (
          <>
            Sending <LoaderCircle className="spin" size={17} />
          </>
        ) : (
          <>
            {kind === "priority"
              ? "Join the priority list"
              : "Send appointment request"}{" "}
            <ArrowUpRight size={17} />
          </>
        )}
      </button>
      <p className="form-note">
        {kind === "appointment"
          ? "An enquiry is not a confirmed booking. We’ll contact you to discuss availability."
          : "A little anticipation. No unnecessary emails."}
      </p>
    </form>
  );
}
export function StudioProvider({ children }: { children: ReactNode }) {
  const [request, setRequest] = useState<{
    kind: RequestKind;
    service: string;
  } | null>(null);
  function open(kind: RequestKind = "priority", service = "") {
    setRequest({ kind, service });
    track("appointment_started", { kind, service });
  }
  return (
    <Context.Provider value={{ open }}>
      {children}
      {request && (
        <Modal
          title={
            request.kind === "priority"
              ? "Join the priority list"
              : "Request an appointment"
          }
          onClose={() => setRequest(null)}
        >
          <p className="eyebrow">YOUR NEXT CHAPTER</p>
          <h2>
            {request.kind === "priority"
              ? "Be among the first."
              : salonConfig.bookingEnabled
                ? "Reserve your time."
                : "Your next signature look."}
          </h2>
          <p className="modal-intro">
            {request.kind === "priority"
              ? "Opening announcements, early access and a first look inside SIXTY SIX."
              : salonConfig.bookingEnabled
                ? "Tell us what you have in mind. Our team will be in touch to confirm availability."
                : "Tell us what you have in mind. Our team will be in touch when appointments become available."}
          </p>
          <EnquiryForm
            kind={request.kind}
            selectedService={request.service}
            onComplete={() => setRequest(null)}
          />
        </Modal>
      )}
      <div className="mobile-bar">
        <button
          onClick={() =>
            open(
              salonConfig.bookingEnabled || !salonConfig.priorityListEnabled
                ? "appointment"
                : "priority",
            )
          }
        >
          {salonConfig.bookingEnabled
            ? "Book appointment"
            : "Join priority list"}{" "}
          <ArrowUpRight size={17} />
        </button>
        <WhatsApp iconOnly />
      </div>
    </Context.Provider>
  );
}
export function RequestButton({
  children,
  kind,
  service,
  className = "button",
}: {
  children?: ReactNode;
  kind?: RequestKind;
  service?: string;
  className?: string;
  onKeyDown?: KeyboardEventHandler<HTMLDialogElement>;
}) {
  const { open } = useStudio();
  return (
    <button
      className={className}
      onClick={() =>
        open(
          kind ||
            (salonConfig.bookingEnabled || !salonConfig.priorityListEnabled
              ? "appointment"
              : "priority"),
          service,
        )
      }
    >
      {children || (
        <>
          {salonConfig.bookingEnabled
            ? "Book appointment"
            : "Join priority list"}
          <ArrowUpRight size={17} />
        </>
      )}
    </button>
  );
}
export function WhatsApp({
  service,
  iconOnly = false,
}: {
  service?: string;
  iconOnly?: boolean;
}) {
  const { open } = useStudio();
  const url = whatsappUrl(service);
  return url ? (
    <a
      className="whatsapp"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={iconOnly ? "Enquire on WhatsApp" : undefined}
      onClick={() => track("whatsapp_clicked")}
    >
      <MessageCircle size={19} />
      {!iconOnly && "WhatsApp us"}
    </a>
  ) : (
    <button
      className="whatsapp"
      aria-label={iconOnly ? "Contact the studio" : undefined}
      title="WhatsApp number to be announced. Leave an enquiry."
      onClick={() => open("appointment", service)}
    >
      <MessageCircle size={19} />
      {!iconOnly && "Enquire with us"}
    </button>
  );
}
