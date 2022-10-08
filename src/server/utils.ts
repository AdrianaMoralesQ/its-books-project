// ensures correct methods are used, prevents errors
const defaultMethods = ['GET', 'POST', 'PATCH', 'DELETE'];

export const isValidMethod = (
  method?: string,
  validMethods: string[] = defaultMethods
) => {
  return method ? validMethods.includes(method) : true;
};
