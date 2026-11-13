import { NextResponse } from "next/server";
import { db } from "@/db";
import { inquiries } from "@/db/schema";
import { eventTypes } from "@/config/content";

export const dynamic = "force-dynamic";

const clean = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot — real visitors never fill this hidden field
  if (clean(body.website, 100)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, 120);
  const phone = clean(body.phone, 40);
  const eventType = clean(body.eventType, 80);
  const eventDate = clean(body.eventDate, 20);
  const location = clean(body.location, 200);
  const budget = clean(body.budget, 80);
  const message = clean(body.message, 2000);

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = "Please enter your name.";
  if (phone.replace(/\D/g, "").length < 7 || !/^[+\d\s\-().]+$/.test(phone))
    errors.phone = "Please enter a valid phone number.";
  if (!(eventTypes as readonly string[]).includes(eventType))
    errors.eventType = "Please choose an event type.";
  if (eventDate && Number.isNaN(Date.parse(eventDate)))
    errors.eventDate = "Please enter a valid date.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  try {
    await db.insert(inquiries).values({
      name,
      phone,
      eventType,
      eventDate: eventDate || null,
      location: location || null,
      budget: budget || null,
      message: message || null,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to save inquiry", error);
    return NextResponse.json(
      {
        ok: false,
        error:
          "We couldn't save your inquiry right now. Please try again or message us on WhatsApp.",
      },
      { status: 500 },
    );
  }
}
