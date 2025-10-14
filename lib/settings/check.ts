import { prisma } from "@/lib/db/prisma";

export async function isModuleEnabled(moduleKey: string): Promise<boolean> {
  try {
    const setting = await prisma.setting.findUnique({
      where: { key: moduleKey },
    });

    if (!setting) {
      return true; // Default enabled if not found
    }

    return setting.value === "true";
  } catch (error) {
    console.error("Error checking module status:", error);
    return true; // Default to enabled on error
  }
}

export async function getModuleSettings(): Promise<Record<string, boolean>> {
  try {
    const settings = await prisma.setting.findMany({
      where: {
        key: {
          startsWith: "module.",
        },
      },
    });

    const modules: Record<string, boolean> = {};
    settings.forEach((setting) => {
      modules[setting.key] = setting.value === "true";
    });

    return modules;
  } catch (error) {
    console.error("Error fetching module settings:", error);
    return {};
  }
}

export const MODULE_KEYS = {
  CALCULATOR: "module.calculator",
  PRICING: "module.pricing",
  FAQ: "module.faq",
  CONTRACTS: "module.contracts",
  NOTIFICATIONS: "module.notifications",
} as const;

