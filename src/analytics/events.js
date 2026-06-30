export const analyticsEvents = [
  { id: "home_hero_diagnostico", area: "home", intent: "conversion", destination: "contato" },
  { id: "home_hero_metodo", area: "home", intent: "education", destination: "paes-consultoria" },
  { id: "home_final_diagnostico", area: "home", intent: "conversion", destination: "contato" },
];

export function trackEvent(eventId, payload = {}) {
  return { eventId, payload, tracked: false, reason: "noop-provider" };
}
