export const getEnvVariable = (key: string): string | null => {
  // @ts-ignore
  return import.meta.env[key] || null;
};

export const isProduction = (): boolean => {
  // @ts-ignore
  return import.meta.env.MODE === "production";
};

export const isDevelopment = (): boolean => {
  // @ts-ignore
  return import.meta.env.MODE === "development";
};
