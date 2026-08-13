import prisma from "@/lib/prisma";

export async function getSiteSettings() {
  const settings = await prisma.siteSetting.findMany();
  const settingsMap = settings.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, string>);

  // Default values if not present
  const defaults = {
    contact_office_location: "123 Tech Avenue, Suite 400<br/>London, E1 6AN, United Kingdom",
    contact_email_1: "support@airecruit.com",
    contact_email_2: "hello@airecruit.com",
    contact_phone_1: "+44 20 7123 4567",
    contact_phone_2: "+44 79 1234 5678",
  };

  return { ...defaults, ...settingsMap };
}
