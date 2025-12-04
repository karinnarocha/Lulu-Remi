"use client";
import { useSearchParams } from "next/navigation";
import ContactForm from "@/components/forms/Contact_form/Contact_form";
import WholesalesForm from "@/components/forms/Wholesales_Form/WholesalesForm";

export default function ContactClient() {
  const params = useSearchParams();
  const formType = params.get("form")?.toLowerCase() || "contact";

  return formType === "wholesale" ? <WholesalesForm /> : <ContactForm />;
}
