"use server";

import prisma from "@/lib/prisma";

export async function getContactInfo() {
  const settings = await prisma.siteSetting.findMany({
    where: {
      key: {
        in: ["contact_email", "contact_phone", "contact_address"]
      }
    }
  });
  
  const info = {
    email: "support@airecruit.co.uk",
    phone: "+44 20 7946 0958",
    address: "London, United Kingdom"
  };
  
  settings.forEach(s => {
    if (s.key === "contact_email") info.email = s.value;
    if (s.key === "contact_phone") info.phone = s.value;
    if (s.key === "contact_address") info.address = s.value;
  });
  
  return info;
}
