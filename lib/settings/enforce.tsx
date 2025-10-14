import { isModuleEnabled } from "./check";

interface ModuleGuardProps {
  moduleKey: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export async function ModuleGuard({ 
  moduleKey, 
  children, 
  fallback = null 
}: ModuleGuardProps) {
  const enabled = await isModuleEnabled(moduleKey);
  
  if (!enabled) {
    return fallback;
  }
  
  return <>{children}</>;
}

