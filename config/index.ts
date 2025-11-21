/**
 * this file export all the configuration related files
 * like metadata, theme, font etc
 * @module config
 */
export * from "./about-metadata"
export * from "./projects-metadata"
export * from "./root-metadata"
export * from "./services-metadata"
export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@example.com"
export const CONTACT_PHONE =
  process.env.NEXT_PUBLIC_CONTACT_PHONE || "+1234567890"
