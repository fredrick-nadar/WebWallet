export const formatKey = (key) => {
  return key.length > 64 ? `${key.slice(0, 32)}...${key.slice(-32)}` : key;
};

export const validateInput = (input) => {
  return input && input.trim() !== '';
};